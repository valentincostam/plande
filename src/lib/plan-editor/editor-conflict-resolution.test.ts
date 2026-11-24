import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import { resolveEditorChange } from './editor-conflict-resolution';

test('keeps the local course details when a shared pending cache creates the same course twice', () => {
	const remote = emptyDraftPlanContent();
	remote.document.sections.push({ id: 'basic', label: 'Básica' });
	remote.document.items.push({
		id: 'algebra',
		seqId: 42,
		kind: 'course',
		name: 'Álgebra de la otra pestaña',
		type: 'mandatory',
		code: 'ALG-1',
		requirements: { enroll: { type: 'all', rules: [] } },
		placements: [
			{ id: 'algebra-basic', sectionId: 'basic' },
			{ id: 'algebra-elective', sectionId: 'basic', term: 'secondSemester', order: 2 }
		]
	});
	remote.document.nextSeqId = 43;
	remote.unknownRequirements.push({ scope: 'item:algebra:enroll', note: 'Conservá esto.' });

	const local = structuredClone(remote);
	local.document.items = [
		{
			id: 'algebra',
			seqId: 42,
			kind: 'course',
			name: 'Álgebra local',
			type: 'elective',
			code: 'ALG-1',
			credits: 6,
			tags: ['matemática'],
			requirements: { enroll: { type: 'all', rules: [] } },
			placements: [{ id: 'algebra-basic', sectionId: 'basic', term: 'annual', order: 1 }]
		}
	];

	const patch = {
		op: 'course.create' as const,
		item: {
			id: 'algebra',
			placementId: 'algebra-basic',
			sectionId: 'basic',
			name: 'Álgebra local',
			fields: { type: 'elective' as const, credits: 6, tags: ['matemática'] }
		}
	};
	const resolved = resolveEditorChange(remote, remote, local, patch);

	expect(resolved?.document.items).toEqual([
		expect.objectContaining({
			id: 'algebra',
			seqId: 42,
			kind: 'course',
			name: 'Álgebra local',
			type: 'elective',
			code: 'ALG-1',
			credits: 6,
			tags: ['matemática'],
			requirements: { enroll: { type: 'all', rules: [] } },
			placements: [
				{ id: 'algebra-basic', sectionId: 'basic', term: 'annual', order: 1 },
				{ id: 'algebra-elective', sectionId: 'basic', term: 'secondSemester', order: 2 }
			]
		})
	]);
	expect(resolved?.unknownRequirements).toEqual([
		{ scope: 'item:algebra:enroll', note: 'Conservá esto.' }
	]);
});

test('recovers a locally renamed item after the remote copy deleted it', () => {
	const historical = emptyDraftPlanContent();
	historical.document.sections.push({ id: 'basic', label: 'Básica' });
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
	});
	historical.document.nextSeqId = 5;
	const remote = structuredClone(historical);
	remote.document.items = [];
	const local = structuredClone(historical);
	local.document.items[0].name = 'Materia recuperada localmente';

	const resolved = resolveEditorChange(
		remote,
		remote,
		local,
		{
			op: 'item.rename',
			itemId: 'algebra',
			name: 'Materia recuperada localmente'
		},
		{ version: 3, content: historical }
	);

	expect(resolved?.document.items).toEqual([
		expect.objectContaining({
			id: 'algebra',
			seqId: 4,
			name: 'Materia recuperada localmente'
		})
	]);
});

test('retries a restored section against the original trusted history', () => {
	const historical = emptyDraftPlanContent();
	historical.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	const remote = emptyDraftPlanContent();
	const local = structuredClone(historical);

	const resolved = resolveEditorChange(
		remote,
		remote,
		local,
		{ op: 'section.restore', sectionId: 'advanced', historyVersion: 3 },
		{ version: 3, content: historical }
	);

	expect(resolved?.document.sections).toEqual([{ id: 'advanced', label: 'Avanzada' }]);
});

test('keeps local requirement tree when remote changed same field', () => {
	const remote = emptyDraftPlanContent();
	remote.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [],
		requirements: {
			enroll: { type: 'all', rules: [{ type: 'item', itemId: 'analysis', state: 'passed' }] }
		}
	});
	const merged = structuredClone(remote);
	merged.document.items[0].requirements = {
		enroll: { type: 'any', rules: [{ type: 'item', itemId: 'physics', state: 'taken' }] }
	};
	const local = structuredClone(remote);
	local.document.items[0].requirements = {
		enroll: {
			type: 'countOf',
			min: 1,
			rules: [{ type: 'item', itemId: 'chemistry', state: 'passed' }]
		}
	};

	const resolved = resolveEditorChange(remote, merged, local, {
		op: 'requirement.replace',
		itemId: 'algebra',
		scope: 'enroll',
		value: { kind: 'expression', expression: local.document.items[0].requirements!.enroll! }
	});

	expect(resolved?.document.items[0].requirements?.enroll).toEqual(
		local.document.items[0].requirements.enroll
	);
});

test('keeps local unknown requirement note when remote note changed', () => {
	const remote = emptyDraftPlanContent();
	remote.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	remote.unknownRequirements.push({ scope: 'item:algebra:enroll', note: 'Fuente A.' });
	const merged = structuredClone(remote);
	merged.unknownRequirements[0].note = 'Fuente B.';
	const local = structuredClone(remote);
	local.unknownRequirements[0].note = 'Fuente C.';

	const resolved = resolveEditorChange(remote, merged, local, {
		op: 'requirement.replace',
		itemId: 'algebra',
		scope: 'enroll',
		value: { kind: 'unknown', note: 'Fuente C.' }
	});

	expect(resolved?.unknownRequirements).toEqual([
		{ scope: 'item:algebra:enroll', note: 'Fuente C.' }
	]);
});

test('does not restore a graduation block already removed remotely', () => {
	const local = emptyDraftPlanContent();
	local.document.requirements.graduation = [
		{ id: 'degree', label: 'Título', expr: { type: 'item', itemId: 'thesis', state: 'completed' } }
	];
	const remote = emptyDraftPlanContent();
	const merged = emptyDraftPlanContent();

	expect(
		resolveEditorChange(remote, merged, local, { op: 'graduation.remove', blockId: 'degree' })
	).toBeUndefined();
});

test('applies a local graduation removal after a remote edit', () => {
	const remote = emptyDraftPlanContent();
	remote.document.requirements.graduation = [
		{ id: 'degree', label: 'Título', expr: { type: 'item', itemId: 'thesis', state: 'completed' } }
	];
	remote.unknownRequirements.push({ scope: 'graduation:degree', note: 'Conservar hasta decidir.' });
	const merged = structuredClone(remote);
	merged.document.requirements.graduation![0]!.label = 'Título final';
	const local = structuredClone(remote);
	local.document.requirements.graduation = [];
	local.unknownRequirements = [];

	const resolved = resolveEditorChange(remote, merged, local, {
		op: 'graduation.remove',
		blockId: 'degree'
	});

	expect(resolved?.document.requirements.graduation).toEqual([]);
	expect(resolved?.unknownRequirements).toEqual([]);
});
