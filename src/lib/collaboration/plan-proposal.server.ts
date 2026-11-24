import { getCollaborationDatabase } from './collaboration.server';
import { parseDraftPlanContent, type DraftPlanContent } from '$lib/plan-editor/draft-plan-content';
import { publishedPlanDraft } from '$lib/plan-editor/published-plan-draft';
import { preparePlan } from '$lib/prepare-plan';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';
import type { ReviewSource, ReviewUnitsInput } from '$lib/plan-editor/review-units';

export type OpenPlanProposalCommand = {
	baseSnapshotId: string;
	sourceSnapshotId: string;
	requestId: string;
	argument: string;
};

export type OpenPlanProposalResult =
	| { disposition: 'opened' | 'existing' | 'active'; proposalRound: number; baseSnapshotId: string }
	| { disposition: 'base_obsolete'; baseSnapshotId: string };

export type PlanHistoryEntry = {
	snapshotId: string;
	publishedAt: string | null;
	isCurrent: boolean;
	argument: string | null;
};

export const readPlanHistory = async (planId: string): Promise<PlanHistoryEntry[]> => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const rows = await sql<
		Array<{
			snapshot_id: unknown;
			published_at: Date | string | null;
			is_current: unknown;
			argument: unknown;
		}>
	>`select * from plan_collaboration.read_plan_history(${planId}::uuid)`;
	return rows.map((row) => {
		if (
			typeof row.is_current !== 'boolean' ||
			(row.argument !== null && typeof row.argument !== 'string')
		)
			throw new Error('Invalid publication history.');
		return {
			snapshotId: parseUuid(row.snapshot_id, 'Invalid publication history.'),
			publishedAt: row.published_at === null ? null : new Date(row.published_at).toISOString(),
			isCurrent: row.is_current,
			argument: row.argument
		};
	});
};

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const parseUuid = (value: unknown, message: string) => {
	if (typeof value !== 'string' || !uuid.test(value)) throw new Error(message);
	return value;
};

const parseSafeInteger = (value: unknown, message: string) => {
	if (typeof value !== 'number' && (typeof value !== 'string' || !/^(0|[1-9]\d*)$/.test(value)))
		throw new Error(message);
	const parsed = Number(value);
	if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(message);
	return parsed;
};

const proposalContent = (sourceDocument: unknown, editorContent: unknown, floor: unknown) => {
	const parsed = studyPlanDocumentSchema.safeParse(sourceDocument);
	if (!parsed.success) throw new Error('Proposal source is invalid.');
	try {
		preparePlan(parsed.data);
	} catch {
		throw new Error('Proposal source is invalid.');
	}
	const nextSeqId = parseSafeInteger(floor, 'Proposal source sequence floor is invalid.');
	const content = editorContent
		? parseDraftPlanContent(editorContent)
		: publishedPlanDraft(parsed.data, nextSeqId);
	return {
		...content,
		document: { ...content.document, nextSeqId: Math.max(content.document.nextSeqId, nextSeqId) }
	} satisfies DraftPlanContent;
};

export const readActiveProposal = async (planId: string, actor: string) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<
		Array<{
			proposal_round: unknown;
			base_snapshot_id: unknown;
			source_snapshot_id: unknown;
			argument: unknown;
		}>
	>`select * from plan_collaboration.read_active_proposal(${planId}::uuid,${actor}::uuid)`;
	if (!row) return null;
	if (typeof row.argument !== 'string') throw new Error('Invalid active proposal.');
	return {
		proposalRound: parseSafeInteger(row.proposal_round, 'Invalid active proposal.'),
		baseSnapshotId: parseUuid(row.base_snapshot_id, 'Invalid active proposal.'),
		sourceSnapshotId: parseUuid(row.source_snapshot_id, 'Invalid active proposal.'),
		argument: row.argument
	};
};

export const readPublicProposal = async (planId: string) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<
		Array<{
			proposal_round: unknown;
			base_snapshot_id: unknown;
			source_snapshot_id: unknown;
			argument: unknown;
		}>
	>`select * from plan_collaboration.read_public_proposal(${planId}::uuid)`;
	if (!row) return null;
	if (typeof row.argument !== 'string') throw new Error('Invalid public proposal.');
	return {
		proposalRound: parseSafeInteger(row.proposal_round, 'Invalid public proposal.'),
		baseSnapshotId: parseUuid(row.base_snapshot_id, 'Invalid public proposal.'),
		sourceSnapshotId: parseUuid(row.source_snapshot_id, 'Invalid public proposal.'),
		argument: row.argument
	};
};

export const readProposalComparison = async (
	planId: string,
	actor: string | null,
	sources: readonly ReviewSource[]
) => {
	const proposal =
		actor === null ? await readPublicProposal(planId) : await readActiveProposal(planId, actor);
	if (!proposal) return null;
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [base] = await sql<
		Array<{
			source_document: unknown;
			editor_content: unknown;
			next_seq_id_floor: unknown;
		}>
	>`select * from plan_collaboration.read_proposal_source(${planId}::uuid,${proposal.baseSnapshotId}::uuid)`;
	if (!base) throw new Error('Proposal base is unavailable.');
	const document = studyPlanDocumentSchema.parse(base.source_document);
	const before: ReviewUnitsInput = {
		content: proposalContent(document, base.editor_content, base.next_seq_id_floor),
		identity: {
			university: document.info.universityName,
			faculty: document.info.collegeName ?? null,
			offer: document.info.degreeName,
			campus: document.info.campus,
			modality: document.info.modality,
			year: document.info.year,
			...(document.info.notes?.length ? { notes: document.info.notes } : {})
		},
		sources: (document.info.sources ?? []).map((source) => ({
			id:
				sources.find((current) => current.label === source.label && current.url === source.url)
					?.id ?? `published-source-${source.id}`,
			label: source.label,
			url: source.url
		}))
	};
	if (proposal.sourceSnapshotId === proposal.baseSnapshotId)
		return {
			...proposal,
			before,
			publishedItemIds: document.items.map((item) => item.id),
			...(document.info.notes?.length ? { proposedNotes: document.info.notes } : {})
		};
	const [source] = await sql<Array<{ source_document: unknown }>>`
		select * from plan_collaboration.read_proposal_source(
			${planId}::uuid,${proposal.sourceSnapshotId}::uuid)`;
	const proposed = studyPlanDocumentSchema.safeParse(source?.source_document);
	if (!proposed.success) throw new Error('Proposal source is unavailable.');
	return {
		...proposal,
		before,
		publishedItemIds: [
			...new Set([...document.items, ...proposed.data.items].map((item) => item.id))
		],
		...(proposed.data.info.notes?.length ? { proposedNotes: proposed.data.info.notes } : {})
	};
};

export const openPlanProposal = async (
	planId: string,
	command: OpenPlanProposalCommand,
	actor: string
): Promise<OpenPlanProposalResult> => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [source] = await sql<
		Array<{
			source_document: unknown;
			expected_base_snapshot_id: unknown;
			next_seq_id_floor: unknown;
			editor_content: unknown;
		}>
	>`select * from plan_collaboration.read_proposal_source(${planId}::uuid,${command.sourceSnapshotId}::uuid)`;
	if (!source) throw new Error('Proposal source is unavailable.');
	parseUuid(source.expected_base_snapshot_id, 'Proposal source is invalid.');
	const content = proposalContent(
		source.source_document,
		source.editor_content,
		source.next_seq_id_floor
	);
	const [result] = await sql<
		Array<{ disposition: unknown; proposal_round: unknown; base_snapshot_id: unknown }>
	>`select * from plan_collaboration.open_plan_proposal(
		${planId}::uuid,${command.baseSnapshotId}::uuid,${command.sourceSnapshotId}::uuid,
		${command.requestId}::uuid,${command.argument},${JSON.stringify(content)}::text::jsonb,${actor}::uuid)`;
	if (!result) throw new Error('Invalid proposal opening result.');
	const baseSnapshotId = parseUuid(result.base_snapshot_id, 'Invalid proposal opening result.');
	if (result.disposition === 'base_obsolete')
		return { disposition: 'base_obsolete', baseSnapshotId };
	if (!['opened', 'existing', 'active'].includes(result.disposition as string))
		throw new Error('Invalid proposal opening result.');
	return {
		disposition: result.disposition as 'opened' | 'existing' | 'active',
		proposalRound: parseSafeInteger(result.proposal_round, 'Invalid proposal opening result.'),
		baseSnapshotId
	};
};
