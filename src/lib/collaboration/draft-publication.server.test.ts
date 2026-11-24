import { createHash } from 'node:crypto';
import { beforeEach, expect, test, vi } from 'vitest';
import { emptyDraftPlanContent } from '$lib/plan-editor/draft-plan-content';
import { reviewUnits } from '$lib/plan-editor/review-units';

const mocks = vi.hoisted(() => {
	const sql = vi.fn();
	return {
		sql,
		database: Object.assign(sql, { begin: vi.fn(), json: vi.fn((value) => value) }),
		loadCatalog: vi.fn()
	};
});

vi.mock('./collaboration.server', () => ({ getCollaborationDatabase: () => mocks.database }));
vi.mock('../../routes/[slug]/data/study-plan-reader.server', () => ({
	studyPlanReader: { loadCatalog: mocks.loadCatalog }
}));

import { publishDraft } from './draft-publication.server';

const planId = '11111111-1111-4111-8111-111111111111';
const requestId = '22222222-2222-4222-8222-222222222222';
const actor = '33333333-3333-4333-8333-333333333333';
const command = { requestId, reviewRevision: 3, discussionRevision: 5 };
const source = { id: 'source-uuid', label: 'Resolución', url: 'https://example.edu/plan' };

const content = () => {
	const draft = emptyDraftPlanContent();
	draft.document.sections = [{ id: 'basic', label: 'Básica', year: 1 }];
	draft.document.items = [
		{
			id: 'algebra',
			seqId: 4,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			credits: 6,
			tags: ['math'],
			placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 5,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ id: 'analysis-basic', sectionId: 'basic' }],
			requirements: { enroll: { type: 'item', itemId: 'algebra', state: 'passed' } }
		}
	];
	draft.document.nextSeqId = 6;
	return draft;
};

const publishedBase = () => ({
	info: {
		degreeName: 'Licenciatura',
		degreeSlug: 'licenciatura-historica',
		canonicalSlug: 'plan-publicado',
		universityName: 'Universidad',
		universitySlug: 'universidad-historica',
		collegeName: 'Facultad',
		collegeSlug: 'facultad-historica',
		year: 2024,
		notes: [{ id: 1, text: 'Mantener nota institucional.' }]
	},
	sections: [{ id: 'basic', label: 'Básica', year: 1 }],
	items: [
		{
			id: 'algebra',
			seqId: 4,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			credits: 6,
			tags: ['math'],
			placements: [{ sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 5,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ sectionId: 'basic' }],
			requirements: { enroll: { type: 'item', itemId: 'algebra', state: 'passed' } }
		}
	],
	requirements: {}
});

beforeEach(() => {
	mocks.sql.mockReset();
	mocks.database.begin.mockReset();
	mocks.database.json.mockClear();
	mocks.loadCatalog.mockReset();
	mocks.database.begin.mockImplementation(async (callback) => callback(mocks.database));
	mocks.loadCatalog.mockResolvedValue([]);
});

test('uses restricted published-result retry before reading a closed draft', async () => {
	mocks.sql.mockResolvedValueOnce([{ snapshot_id: 'snapshot', canonical_slug: 'plan-111' }]);

	await expect(publishDraft(planId, actor, command)).resolves.toEqual({
		disposition: 'existing',
		canonicalSlug: 'plan-111',
		blockers: []
	});

	expect(mocks.sql).toHaveBeenCalledTimes(1);
	expect(mocks.sql.mock.calls[0]?.[0].join('')).toContain('read_published_draft_result');
	expect(mocks.sql.mock.calls[0]?.slice(1)).toEqual([
		planId,
		requestId,
		command.reviewRevision,
		command.discussionRevision,
		actor
	]);
});

test('does not treat another closed proposal publication as this request success', async () => {
	mocks.sql.mockImplementation(async (strings: TemplateStringsArray) => {
		const statement = strings.join('');
		if (statement.includes('read_published_draft_result')) return [];
		if (statement.includes('read_active_proposal')) return [];
		if (statement.includes('read_publication_status'))
			return [
				{
					published: true,
					canonical_slug: 'plan-publicado',
					snapshot_id: 'another-snapshot',
					published_at: '2026-09-08T12:00:00.000Z'
				}
			];
		throw new Error(`Unexpected query: ${statement}`);
	});

	await expect(publishDraft(planId, actor, command)).resolves.toEqual({
		disposition: 'version_conflict',
		blockers: []
	});
	expect(mocks.database.begin).not.toHaveBeenCalled();
});

test('builds a candidate without inventing a nullable faculty', async () => {
	const draftContent = content();
	mocks.sql.mockImplementation(async (strings: TemplateStringsArray) => {
		const statement = strings.join('');
		if (statement.includes('read_published_draft_result')) return [];
		if (statement.includes('read_active_proposal')) return [];
		if (statement.includes('read_publication_status'))
			return [
				{ published: false, canonical_slug: 'plan-111', snapshot_id: null, published_at: null }
			];
		if (statement.includes('lock_draft_review')) return [{ review_revision: 3, sources: [source] }];
		if (statement.includes('read_draft('))
			return [
				{
					university_name: 'Universidad',
					faculty_name: null,
					offer_name: 'Licenciatura',
					campus: null,
					modality: null,
					plan_year: null,
					content: draftContent
				}
			];
		if (statement.includes('read_draft_discussions')) return [{ discussion_revision: 5 }];
		if (statement.includes('publish_draft'))
			return [{ disposition: 'published', canonical_slug: 'plan-111', blockers: [] }];
		throw new Error(`Unexpected query: ${statement}`);
	});

	await expect(publishDraft(planId, actor, command)).resolves.toMatchObject({
		disposition: 'published',
		canonicalSlug: 'plan-111'
	});

	const publish = mocks.sql.mock.calls.find(([strings]) =>
		strings.join('').includes('publish_draft')
	);
	const document = publish?.[6] as { info: Record<string, unknown> };
	const manifest = publish?.[8] as { key: string; fingerprint: string }[];
	const identity = reviewUnits({
		content: draftContent,
		identity: { university: 'Universidad', faculty: null, offer: 'Licenciatura' },
		sources: [source]
	}).units.find((unit) => unit.key === 'identity');

	expect(document.info).not.toHaveProperty('collegeName');
	expect(manifest).toContainEqual({
		key: 'identity',
		fingerprint: createHash('sha256')
			.update(identity?.fingerprint ?? '')
			.digest('hex')
	});
});

test('publishes an active proposal from native identity without replacing its notes or slugs', async () => {
	const draftContent = content();
	mocks.sql.mockImplementation(async (strings: TemplateStringsArray) => {
		const statement = strings.join('');
		if (statement.includes('read_published_draft_result')) return [];
		if (statement.includes('read_active_proposal'))
			return [
				{
					proposal_round: 2,
					base_snapshot_id: '66666666-6666-4666-8666-666666666666',
					source_snapshot_id: '77777777-7777-4777-8777-777777777777',
					argument: 'Corregir correlativas.'
				}
			];
		if (statement.includes('read_proposal_source')) return [{ source_document: publishedBase() }];
		if (statement.includes('read_publication_status'))
			return [
				{
					published: true,
					canonical_slug: 'plan-publicado',
					snapshot_id: 'base',
					published_at: null
				}
			];
		if (statement.includes('lock_draft_review')) return [{ review_revision: 3, sources: [source] }];
		if (statement.includes('read_draft('))
			return [
				{
					university_name: 'Universidad',
					faculty_name: 'Facultad',
					offer_name: 'Licenciatura',
					campus: null,
					modality: null,
					plan_year: 2024,
					content: draftContent
				}
			];
		if (statement.includes('read_draft_discussions')) return [{ discussion_revision: 5 }];
		if (statement.includes('publish_draft'))
			return [{ disposition: 'published', canonical_slug: 'plan-publicado', blockers: [] }];
		throw new Error(`Unexpected query: ${statement}`);
	});

	await expect(publishDraft(planId, actor, command)).resolves.toMatchObject({
		disposition: 'published',
		canonicalSlug: 'plan-publicado'
	});

	const publish = mocks.sql.mock.calls.find(([strings]) =>
		strings.join('').includes('publish_draft')
	);
	const document = publish?.[6] as { info: Record<string, unknown> };
	const manifest = publish?.[8] as { key: string; fingerprint: string }[];
	const identity = reviewUnits({
		content: draftContent,
		identity: {
			university: 'Universidad',
			faculty: 'Facultad',
			offer: 'Licenciatura',
			year: 2024,
			notes: [{ id: 1, text: 'Mantener nota institucional.' }]
		},
		sources: [source]
	}).units.find((unit) => unit.key === 'identity');
	expect(document.info).toMatchObject({
		degreeSlug: 'licenciatura-historica',
		universitySlug: 'universidad-historica',
		collegeSlug: 'facultad-historica',
		canonicalSlug: 'plan-publicado',
		notes: [{ id: 1, text: 'Mantener nota institucional.' }]
	});
	expect(manifest).toContainEqual({
		key: 'identity',
		fingerprint: createHash('sha256')
			.update(identity?.fingerprint ?? '')
			.digest('hex')
	});
});

test('returns base_obsolete from proposal publication', async () => {
	const draftContent = content();
	mocks.sql.mockImplementation(async (strings: TemplateStringsArray) => {
		const statement = strings.join('');
		if (statement.includes('read_published_draft_result')) return [];
		if (statement.includes('read_active_proposal'))
			return [
				{
					proposal_round: 2,
					base_snapshot_id: '66666666-6666-4666-8666-666666666666',
					source_snapshot_id: '77777777-7777-4777-8777-777777777777',
					argument: 'Corregir correlativas.'
				}
			];
		if (statement.includes('read_proposal_source')) return [{ source_document: publishedBase() }];
		if (statement.includes('read_publication_status'))
			return [
				{
					published: true,
					canonical_slug: 'plan-publicado',
					snapshot_id: 'base',
					published_at: null
				}
			];
		if (statement.includes('lock_draft_review')) return [{ review_revision: 3, sources: [source] }];
		if (statement.includes('read_draft('))
			return [
				{
					university_name: 'Universidad',
					faculty_name: 'Facultad',
					offer_name: 'Licenciatura',
					campus: null,
					modality: null,
					plan_year: 2024,
					content: draftContent
				}
			];
		if (statement.includes('read_draft_discussions')) return [{ discussion_revision: 5 }];
		if (statement.includes('publish_draft'))
			return [{ disposition: 'base_obsolete', canonical_slug: 'plan-publicado', blockers: [] }];
		throw new Error(`Unexpected query: ${statement}`);
	});

	await expect(publishDraft(planId, actor, command)).resolves.toEqual({
		disposition: 'base_obsolete',
		canonicalSlug: 'plan-publicado',
		blockers: []
	});
});
