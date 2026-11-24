import { createHash } from 'node:crypto';
import { getCollaborationDatabase } from './collaboration.server';
import { parseDraftPlanContent, type DraftPlanContent } from '$lib/plan-editor/draft-plan-content';
import { reviewUnits, type ReviewIdentity, type ReviewSource } from '$lib/plan-editor/review-units';
import { completeDraftStructure } from '$lib/plan-editor/graduation-field';
import { preparePlan } from '$lib/prepare-plan';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';

type ReviewCommand =
	| { type: 'check'; revision: number; key: string; sourcesOpened: boolean }
	| { type: 'approve'; revision: number };

export type DraftReviewState = {
	content: DraftPlanContent;
	identity: ReviewIdentity;
	revision: number;
	isCoauthor: boolean;
	authorshipKnown: boolean;
	approved: boolean;
	sources: ReviewSource[];
	units: { key: string; checked: boolean; available: boolean }[];
	ready: boolean;
};

const technicallyReady = (content: DraftPlanContent) => {
	if (
		!content.document.items.length ||
		content.unknownRequirements.length ||
		content.unsupportedContent.length
	)
		return false;
	try {
		const structure = completeDraftStructure(content);
		if (!structure) return false;
		preparePlan(structure);
		return true;
	} catch {
		return false;
	}
};

export const addDraftSource = async (
	planId: string,
	revision: number,
	label: string,
	url: string,
	actor: string
) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<Array<{ disposition: 'added' | 'unchanged' | 'version_conflict' }>>`
		select * from plan_collaboration.add_draft_source(${planId}::uuid,${revision},${label},${url},${actor}::uuid)`;
	if (!row || !['added', 'unchanged', 'version_conflict'].includes(row.disposition))
		throw new Error('Invalid source result.');
	return row.disposition;
};

export const draftReview = async (
	planId: string,
	actor: string,
	command?: ReviewCommand
): Promise<{
	state: DraftReviewState;
	result: 'read' | 'saved' | 'approved' | 'stale' | 'ineligible' | 'incomplete';
}> => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	return sql.begin(async (transaction) => {
		const [locked] = await transaction<
			Array<{
				review_revision: string | number;
				is_coauthor: boolean;
				authorship_known: boolean;
				checks: { key: string; fingerprint: string }[];
				sources: ReviewSource[];
				approved_revision: string | number | null;
			}>
		>`select * from plan_collaboration.lock_draft_review(${planId}::uuid,${actor}::uuid)`;
		const [draft] = await transaction<
			Array<{
				university_name: string;
				faculty_name: string;
				offer_name: string;
				campus: string | null;
				modality: string | null;
				plan_year: number | null;
				content: unknown;
			}>
		>`select * from plan_collaboration.read_draft(${planId}::uuid)`;
		if (!locked || !draft) throw new Error('Draft unavailable.');
		const [activeProposal] = await transaction<Array<{ source_snapshot_id: string }>>`
			select * from plan_collaboration.read_active_proposal(${planId}::uuid,${actor}::uuid)`;
		let notes: ReviewIdentity['notes'];
		if (activeProposal) {
			const [source] = await transaction<Array<{ source_document: unknown }>>`
				select * from plan_collaboration.read_proposal_source(
					${planId}::uuid,${activeProposal.source_snapshot_id}::uuid)`;
			const document = studyPlanDocumentSchema.safeParse(source?.source_document);
			if (!document.success) throw new Error('Published proposal source is invalid.');
			notes = document.data.info.notes;
		}
		const revision = Number(locked.review_revision);
		if (!Number.isSafeInteger(revision) || revision < 0)
			throw new Error('Invalid review revision.');
		const content = parseDraftPlanContent(draft.content);
		const identity: ReviewIdentity = {
			university: draft.university_name,
			faculty: draft.faculty_name,
			offer: draft.offer_name,
			...(draft.plan_year === null ? {} : { year: draft.plan_year }),
			...(draft.campus === null ? {} : { campus: draft.campus }),
			...(draft.modality === null ? {} : { modality: draft.modality }),
			...(notes?.length ? { notes } : {})
		};
		const units = reviewUnits({ content, identity, sources: locked.sources }).units.map((unit) => ({
			key: unit.key,
			fingerprint:
				unit.fingerprint === undefined
					? undefined
					: createHash('sha256').update(unit.fingerprint).digest('hex')
		}));
		const state: DraftReviewState = {
			content,
			identity,
			revision,
			isCoauthor: locked.is_coauthor,
			authorshipKnown: locked.authorship_known,
			approved: locked.approved_revision !== null && Number(locked.approved_revision) === revision,
			sources: locked.sources,
			units: units.map((unit) => ({
				key: unit.key,
				available: unit.fingerprint !== undefined,
				checked:
					unit.fingerprint !== undefined &&
					locked.checks.some(
						(check) => check.key === unit.key && check.fingerprint === unit.fingerprint
					)
			})),
			ready:
				technicallyReady(content) &&
				locked.sources.length > 0 &&
				units.every((unit) => unit.fingerprint !== undefined)
		};
		if (!command) return { state, result: 'read' };
		if (command.revision !== revision) return { state, result: 'stale' };
		if (state.isCoauthor) return { state, result: 'ineligible' };
		if (command.type === 'check') {
			const unit = units.find((unit) => unit.key === command.key);
			if (!unit?.fingerprint || !command.sourcesOpened || !state.sources.length)
				return { state, result: 'incomplete' };
			await transaction`select plan_collaboration.record_draft_check(${planId}::uuid,${revision},${unit.key},${unit.fingerprint},true,${actor}::uuid)`;
			state.units = state.units.map((value) =>
				value.key === unit.key ? { ...value, checked: true } : value
			);
			return { state, result: 'saved' };
		}
		if (!state.authorshipKnown || !state.ready || !state.units.every((unit) => unit.checked))
			return { state, result: 'incomplete' };
		const manifest = units.map((unit) => ({ key: unit.key, fingerprint: unit.fingerprint! }));
		await transaction`select plan_collaboration.approve_draft_review(${planId}::uuid,${revision},${transaction.json(manifest)},${actor}::uuid)`;
		return { state: { ...state, approved: true }, result: 'approved' };
	});
};
