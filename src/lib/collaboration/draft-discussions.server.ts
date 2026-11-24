import { createHash } from 'node:crypto';
import { getCollaborationDatabase } from './collaboration.server';
import { draftReview } from './draft-review.server';
import { reviewUnits } from '$lib/plan-editor/review-units';
import type { DiscussionInput, ResolutionInput } from '$lib/plan-editor/discussion-input';

type DiscussionSource = { id: string; label: string; url: string };
export type DiscussionEntry = {
	id: string;
	kind: 'comment' | 'objection';
	parentId: string | null;
	unitKey: string;
	argument: string;
	source: DiscussionSource;
	locator: string;
	status: 'comment' | 'pending' | 'confirmed' | 'dismissed' | 'corrected';
	reviewRevision: number;
	createdAt: string;
	isOwn: boolean;
	events: {
		action: 'confirm' | 'dismiss' | 'reopen' | 'correct';
		argument: string;
		source: DiscussionSource;
		locator: string;
		newEvidence: string;
		reviewRevision: number;
		createdAt: string;
	}[];
};

export const readDraftDiscussions = async (planId: string, actor: string | null) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<
		Array<{
			discussion_revision: string | number;
			pending_count: number;
			entries: DiscussionEntry[];
		}>
	>`
		select * from plan_collaboration.read_draft_discussions(${planId}::uuid,${actor}::uuid)`;
	if (!row) throw new Error('Draft unavailable.');
	const revision = Number(row.discussion_revision);
	if (!Number.isSafeInteger(revision) || revision < 0)
		throw new Error('Invalid discussion revision.');
	return { revision, pendingCount: row.pending_count, entries: row.entries };
};

const currentUnitFingerprint = async (
	planId: string,
	actor: string,
	revision: number,
	key: string
) => {
	const { state } = await draftReview(planId, actor);
	if (state.revision !== revision) return null;
	const unit = reviewUnits({
		content: state.content,
		identity: state.identity,
		sources: state.sources
	}).units.find((unit) => unit.key === key);
	return unit
		? createHash('sha256')
				.update(unit.fingerprint ?? JSON.stringify(unit.context))
				.digest('hex')
		: null;
};

export const addDraftDiscussion = async (planId: string, actor: string, input: DiscussionInput) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const fingerprint = await currentUnitFingerprint(
		planId,
		actor,
		input.reviewRevision,
		input.unitKey
	);
	const [result] = await sql<
		Array<{
			discussion_id: string | null;
			disposition: 'created' | 'existing' | 'version_conflict';
		}>
	>`
		select * from plan_collaboration.add_draft_discussion(${planId}::uuid,${input.reviewRevision},${input.discussionRevision},
		${input.requestId}::uuid,${input.kind},${input.unitKey},${fingerprint},${input.argument},${input.sourceId}::uuid,${input.locator},${actor}::uuid,${input.parentId ?? null}::uuid)`;
	if (!result) throw new Error('Discussion was not saved.');
	return result;
};

export const resolveDraftObjection = async (
	planId: string,
	actor: string,
	input: ResolutionInput
) => {
	const sql = getCollaborationDatabase();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const discussions = await readDraftDiscussions(planId, actor);
	const objection = discussions.entries.find(
		(entry) => entry.id === input.discussionId && entry.kind === 'objection'
	);
	if (!objection) throw new Error('Objection unavailable.');
	const fingerprint = await currentUnitFingerprint(
		planId,
		actor,
		input.reviewRevision,
		objection.unitKey
	);
	const [result] = await sql<
		Array<{
			status: DiscussionEntry['status'];
			disposition: 'changed' | 'existing' | 'version_conflict';
		}>
	>`
		select * from plan_collaboration.resolve_draft_objection(${planId}::uuid,${input.discussionId}::uuid,${input.reviewRevision},${input.discussionRevision},
		${input.requestId}::uuid,${input.action},${input.argument},${input.sourceId}::uuid,${input.locator},${input.newEvidence},${fingerprint},${actor}::uuid)`;
	if (!result) throw new Error('Conclusion was not saved.');
	return result;
};
