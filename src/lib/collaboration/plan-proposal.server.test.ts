import { beforeEach, expect, test, vi } from 'vitest';
import type { StudyPlanData } from '$lib/study-plan-data';

const mocks = vi.hoisted(() => {
	const sql = vi.fn();
	return { sql, database: Object.assign(sql, { json: vi.fn((value) => value) }) };
});

vi.mock('./collaboration.server', () => ({ getCollaborationDatabase: () => mocks.database }));

import { openPlanProposal, readProposalComparison } from './plan-proposal.server';

const planId = '11111111-1111-4111-8111-111111111111';
const baseSnapshotId = '22222222-2222-4222-8222-222222222222';
const sourceSnapshotId = '33333333-3333-4333-8333-333333333333';
const requestId = '44444444-4444-4222-8222-222222222222';
const actor = '55555555-5555-4555-8555-555555555555';
const command = {
	baseSnapshotId,
	sourceSnapshotId,
	requestId,
	argument: 'Actualizar correlativas según resolución.'
};

const sourceDocument = (): StudyPlanData => ({
	info: {
		degreeName: 'Licenciatura',
		degreeSlug: 'lic',
		universityName: 'Universidad',
		universitySlug: 'un',
		sources: [{ id: 4, label: 'Resolución', url: 'https://example.edu/plan' }]
	},
	sections: [{ id: 'basic', label: 'Básica', year: 1 }],
	items: [
		{
			id: 'algebra',
			seqId: 2,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			placements: [{ sectionId: 'basic', term: 'annual' }]
		}
	],
	requirements: {}
});

const source = (editorContent: unknown = null, floor: string | number = '8') => ({
	source_document: sourceDocument(),
	expected_base_snapshot_id: baseSnapshotId,
	next_seq_id_floor: floor,
	editor_content: editorContent
});

beforeEach(() => {
	mocks.sql.mockReset();
});

test('compares against the published base, not the historical source of a reversion', async () => {
	mocks.sql
		.mockResolvedValueOnce([
			{
				proposal_round: 2,
				base_snapshot_id: baseSnapshotId,
				source_snapshot_id: sourceSnapshotId,
				argument: 'Restaurar correlativas anteriores.'
			}
		])
		.mockResolvedValueOnce([source()])
		.mockResolvedValueOnce([source()]);
	const comparison = await readProposalComparison(planId, actor, [
		{
			id: 'stable-source',
			label: 'Resolución',
			url: 'https://example.edu/plan'
		}
	]);
	expect(mocks.sql.mock.calls[1]?.slice(1)).toEqual([planId, baseSnapshotId]);
	expect(comparison).toMatchObject({
		argument: 'Restaurar correlativas anteriores.',
		before: {
			identity: { university: 'Universidad', faculty: null, offer: 'Licenciatura' },
			sources: [{ id: 'stable-source', label: 'Resolución' }],
			content: { document: { items: [{ id: 'algebra', seqId: 2 }] } }
		}
	});
});

test('reads public proposal context anonymously, with base before and source notes proposed', async () => {
	const base = sourceDocument();
	base.info.notes = [{ id: 1, text: 'Nota base.' }];
	const proposed = structuredClone(base);
	proposed.info.notes = [{ id: 2, text: 'Nota propuesta.' }];
	proposed.items[0].id = 'historical-course';
	mocks.sql
		.mockResolvedValueOnce([
			{
				proposal_round: 2,
				base_snapshot_id: baseSnapshotId,
				source_snapshot_id: sourceSnapshotId,
				argument: 'Revertir la corrección.'
			}
		])
		.mockResolvedValueOnce([{ ...source(), source_document: base }])
		.mockResolvedValueOnce([{ ...source(), source_document: proposed }]);

	const comparison = await readProposalComparison(planId, null, []);

	expect(mocks.sql.mock.calls[0]?.[0].join('')).toContain('read_public_proposal');
	expect(mocks.sql.mock.calls[0]?.slice(1)).toEqual([planId]);
	expect(mocks.sql.mock.calls[1]?.slice(1)).toEqual([planId, baseSnapshotId]);
	expect(mocks.sql.mock.calls[2]?.slice(1)).toEqual([planId, sourceSnapshotId]);
	expect(comparison).toMatchObject({
		before: { identity: { notes: [{ id: 1, text: 'Nota base.' }] } },
		proposedNotes: [{ id: 2, text: 'Nota propuesta.' }]
	});
	expect(comparison?.publishedItemIds).toEqual(['algebra', 'historical-course']);
});

test('opens native source with stable IDs, metadata and sequence floor', async () => {
	mocks.sql
		.mockResolvedValueOnce([source()])
		.mockResolvedValueOnce([
			{ disposition: 'opened', proposal_round: '4', base_snapshot_id: baseSnapshotId }
		]);

	await expect(openPlanProposal(planId, command, actor)).resolves.toEqual({
		disposition: 'opened',
		proposalRound: 4,
		baseSnapshotId
	});

	expect(mocks.sql.mock.calls[0]?.[0].join('')).toContain('read_proposal_source');
	expect(mocks.sql.mock.calls[1]?.[0].join('')).toContain('open_plan_proposal');
	expect(mocks.sql.mock.calls[1]?.slice(1, 6)).toEqual([
		planId,
		baseSnapshotId,
		sourceSnapshotId,
		requestId,
		command.argument
	]);
	expect(mocks.sql.mock.calls[1]?.[7]).toBe(actor);
	const content = JSON.parse(mocks.sql.mock.calls[1]?.[6] as string);
	expect(content.document).toMatchObject({ nextSeqId: 8, sections: [{ id: 'basic' }] });
	expect(content.document.items).toEqual([
		expect.objectContaining({
			id: 'algebra',
			seqId: 2,
			placements: [{ id: 'published-2-0', sectionId: 'basic', term: 'annual' }]
		})
	]);
});

test('keeps editor placement IDs when source already has editor content', async () => {
	const editor = {
		schemaVersion: 1,
		document: {
			nextSeqId: 3,
			sections: [{ id: 'basic', label: 'Básica', year: 1 }],
			items: [
				{
					id: 'algebra',
					seqId: 2,
					kind: 'course',
					name: 'Álgebra',
					type: 'mandatory',
					placements: [{ id: 'historical-placement', sectionId: 'basic', term: 'annual' }]
				}
			],
			requirements: {}
		},
		unknownRequirements: [],
		unsupportedContent: []
	};
	mocks.sql
		.mockResolvedValueOnce([source(editor, 7)])
		.mockResolvedValueOnce([
			{ disposition: 'existing', proposal_round: 4, base_snapshot_id: baseSnapshotId }
		]);

	await expect(openPlanProposal(planId, command, actor)).resolves.toMatchObject({
		disposition: 'existing',
		proposalRound: 4
	});

	const content = JSON.parse(mocks.sql.mock.calls[1]?.[6] as string);
	expect(content.document.nextSeqId).toBe(7);
	expect(content.document.items[0].placements[0].id).toBe('historical-placement');
});

test.each(['active', 'existing'] as const)('returns SQL %s result', async (disposition) => {
	mocks.sql
		.mockResolvedValueOnce([source()])
		.mockResolvedValueOnce([{ disposition, proposal_round: 4, base_snapshot_id: baseSnapshotId }]);

	await expect(openPlanProposal(planId, command, actor)).resolves.toMatchObject({ disposition });
});

test('returns the current base when SQL rejects an obsolete base', async () => {
	const currentBase = '66666666-6666-4666-8666-666666666666';
	mocks.sql
		.mockResolvedValueOnce([source()])
		.mockResolvedValueOnce([
			{ disposition: 'base_obsolete', proposal_round: null, base_snapshot_id: currentBase }
		]);

	await expect(openPlanProposal(planId, command, actor)).resolves.toEqual({
		disposition: 'base_obsolete',
		baseSnapshotId: currentBase
	});
});
