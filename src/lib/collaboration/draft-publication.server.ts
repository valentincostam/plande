import { createHash } from 'node:crypto';
import { getCollaborationDatabase } from './collaboration.server';
import { parseDraftPlanContent } from '$lib/plan-editor/draft-plan-content';
import { publicationCandidate } from '$lib/plan-editor/publication-candidate';
import { reviewUnits, type ReviewIdentity, type ReviewSource } from '$lib/plan-editor/review-units';
import { readActiveProposal } from './plan-proposal.server';
import { studyPlanReader } from '../../routes/[slug]/data/study-plan-reader.server';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';
import type { StudyPlanInfo } from '$lib/study-plan-data';

export type PublicationCommand = {
	requestId: string;
	reviewRevision: number;
	discussionRevision: number;
};

export type PublicationResult = {
	disposition: 'published' | 'existing' | 'base_obsolete' | 'version_conflict' | 'blocked';
	canonicalSlug?: string;
	blockers: string[];
};

export const readPublicationStatus = async (planId: string) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<
		Array<{
			published: boolean;
			canonical_slug: string;
			snapshot_id: string | null;
			published_at: string | null;
		}>
	>`select * from plan_collaboration.read_publication_status(${planId}::uuid)`;
	return row
		? {
				published: row.published,
				canonicalSlug: row.canonical_slug,
				snapshotId: row.snapshot_id,
				publishedAt: row.published_at
			}
		: null;
};

export const publishDraft = async (
	planId: string,
	actor: string,
	command: PublicationCommand
): Promise<PublicationResult> => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [published] = await sql<Array<{ snapshot_id: string; canonical_slug: string }>>`
		select * from plan_collaboration.read_published_draft_result(
			${planId}::uuid,${command.requestId}::uuid,${command.reviewRevision},${command.discussionRevision},${actor}::uuid)`;
	if (published)
		return { disposition: 'existing', canonicalSlug: published.canonical_slug, blockers: [] };

	const activeProposal = await readActiveProposal(planId, actor);
	if (!activeProposal && (await readPublicationStatus(planId))?.published)
		return { disposition: 'version_conflict', blockers: [] };
	let sourceInfo:
		| (Pick<StudyPlanInfo, 'degreeSlug' | 'universitySlug' | 'collegeSlug' | 'notes'> & {
				canonicalSlug: string;
		  })
		| undefined;
	if (activeProposal) {
		const [source] = await sql<Array<{ source_document: unknown }>>`
			select * from plan_collaboration.read_proposal_source(
				${planId}::uuid,${activeProposal.sourceSnapshotId}::uuid)`;
		const document = studyPlanDocumentSchema.safeParse(source?.source_document);
		if (!document.success) throw new Error('Published proposal source is invalid.');
		const status = await readPublicationStatus(planId);
		if (!status?.published) throw new Error('Published proposal status is unavailable.');
		sourceInfo = { ...document.data.info, canonicalSlug: status.canonicalSlug };
	}
	const catalog = sourceInfo ? undefined : await studyPlanReader.loadCatalog();
	const snapshot = await sql.begin(async (transaction) => {
		const [locked] = await transaction<
			Array<{
				review_revision: string | number;
				sources: ReviewSource[];
			}>
		>`select * from plan_collaboration.lock_draft_review(${planId}::uuid,${actor}::uuid)`;
		const [draft] = await transaction<
			Array<{
				university_name: string;
				faculty_name: string | null;
				offer_name: string;
				campus: string | null;
				modality: string | null;
				plan_year: number | null;
				content: Record<string, unknown>;
			}>
		>`select * from plan_collaboration.read_draft(${planId}::uuid)`;
		const [discussion] = await transaction<Array<{ discussion_revision: string | number }>>`
			select discussion_revision from plan_collaboration.read_draft_discussions(${planId}::uuid,${actor}::uuid)`;
		if (!locked || !draft || !discussion) throw new Error('Draft unavailable.');
		return { locked, draft, discussion };
	});
	if (
		Number(snapshot.locked.review_revision) !== command.reviewRevision ||
		Number(snapshot.discussion.discussion_revision) !== command.discussionRevision
	)
		return { disposition: 'version_conflict', blockers: [] };

	const draft = snapshot.draft;
	const content = parseDraftPlanContent(draft.content);
	const identity: ReviewIdentity = {
		university: draft.university_name,
		faculty: draft.faculty_name,
		offer: draft.offer_name,
		...(draft.campus === null ? {} : { campus: draft.campus }),
		...(draft.modality === null ? {} : { modality: draft.modality }),
		...(draft.plan_year === null ? {} : { year: draft.plan_year }),
		...(sourceInfo?.notes?.length ? { notes: sourceInfo.notes } : {})
	};
	const normalize = (value: string) => value.trim().toLocaleLowerCase('es-AR');
	const university = catalog?.find(
		(entry) => normalize(entry.universityName) === normalize(identity.university)
	);
	const faculty = catalog?.find(
		(entry) =>
			normalize(entry.universityName) === normalize(identity.university) &&
			entry.collegeName &&
			identity.faculty &&
			normalize(entry.collegeName) === normalize(identity.faculty)
	);
	const candidate = publicationCandidate({
		content,
		identity: {
			...(sourceInfo
				? {
						degreeName: identity.offer,
						degreeSlug: sourceInfo.degreeSlug,
						universityName: identity.university,
						universitySlug: sourceInfo.universitySlug,
						...(identity.faculty === null ? {} : { collegeName: identity.faculty }),
						...(sourceInfo.collegeSlug ? { collegeSlug: sourceInfo.collegeSlug } : {}),
						canonicalSlug: sourceInfo.canonicalSlug,
						...(identity.campus ? { campus: identity.campus } : {}),
						...(identity.modality ? { modality: identity.modality } : {}),
						...(sourceInfo.notes?.length ? { notes: sourceInfo.notes } : {})
					}
				: {
						degreeName: identity.offer,
						degreeSlug: '',
						universityName: identity.university,
						universitySlug: university?.universitySlug ?? '',
						...(identity.faculty === null ? {} : { collegeName: identity.faculty }),
						...(faculty?.collegeSlug ? { collegeSlug: faculty.collegeSlug } : {}),
						canonicalSlug: `plan-${planId}`,
						...(identity.campus ? { campus: identity.campus } : {}),
						...(identity.modality ? { modality: identity.modality } : {})
					}),
			year: draft.plan_year
		},
		sources: snapshot.locked.sources.map((source, index) => ({
			id: index + 1,
			label: source.label,
			url: source.url
		}))
	});
	if (!candidate.ok) return { disposition: 'blocked', blockers: [candidate.reason] };
	const units = reviewUnits({ content, identity, sources: snapshot.locked.sources }).units;
	if (units.some((unit) => unit.fingerprint === undefined))
		return { disposition: 'blocked', blockers: ['content_incomplete'] };
	const manifest = units.map((unit) => ({
		key: unit.key,
		fingerprint: createHash('sha256').update(unit.fingerprint!).digest('hex')
	}));
	const [result] = await sql<
		Array<{
			disposition: PublicationResult['disposition'];
			canonical_slug: string;
			blockers: string[];
		}>
	>`select * from plan_collaboration.publish_draft(
		${planId}::uuid,${command.reviewRevision},${command.discussionRevision},${command.requestId}::uuid,
		${JSON.stringify(draft.content)}::text::jsonb,${sql.json(candidate.plan)},${sql.json(candidate.catalog)},${sql.json(manifest)},${actor}::uuid)`;
	if (
		!result ||
		!['published', 'existing', 'base_obsolete', 'version_conflict', 'blocked'].includes(
			result.disposition
		)
	)
		throw new Error('Invalid publication result.');
	return {
		disposition: result.disposition,
		canonicalSlug: result.canonical_slug,
		blockers: result.blockers
	};
};
