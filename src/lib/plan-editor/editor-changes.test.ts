import { expect, test } from 'vitest';
import { emptyDraftPlanContent, type DraftPlanContent } from './draft-plan-content';
import { changeKey, changeValue, choiceKey, editorChanges } from './editor-changes';
import { mergeSectionPatches } from './section-patches';

const base = (): DraftPlanContent => ({
	...emptyDraftPlanContent(),
	document: {
		...emptyDraftPlanContent().document,
		sections: [{ id: 'basic', label: 'Básica' }]
	}
});

const applyEditorChanges = (initial: DraftPlanContent, edited: DraftPlanContent) => {
	const result = mergeSectionPatches(initial, initial, editorChanges(initial, edited));
	if ('conflicts' in result)
		throw new Error(`Unexpected conflicts: ${result.conflicts.join(', ')}`);
	return result.content;
};

test('creates a course with metadata and placement details', () => {
	const initial = base();
	const edited = structuredClone(initial);
	edited.document.items.push({
		id: 'seminar',
		seqId: 99,
		kind: 'course',
		name: 'Seminario',
		type: 'elective',
		code: 'SEM-1',
		credits: 4,
		tags: ['humanidades'],
		attributes: ['workshop'],
		placements: [{ id: 'seminar-basic', sectionId: 'basic', term: 'firstSemester', order: 2 }]
	});

	const result = applyEditorChanges(initial, edited);
	expect(result.document.items).toEqual([
		{
			id: 'seminar',
			seqId: 0,
			kind: 'course',
			name: 'Seminario',
			type: 'elective',
			code: 'SEM-1',
			credits: 4,
			tags: ['humanidades'],
			attributes: ['workshop'],
			placements: [{ id: 'seminar-basic', sectionId: 'basic', term: 'firstSemester', order: 2 }]
		}
	]);
});

test('adds multiple placements to an existing course', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
	});
	const edited = structuredClone(initial);
	edited.document.items[0].placements.push({
		id: 'first-semester',
		sectionId: 'basic',
		term: 'firstSemester',
		order: 1
	});

	const result = applyEditorChanges(initial, edited);
	expect(result.document.items[0].placements).toEqual([
		{ id: 'annual', sectionId: 'basic', term: 'annual' },
		{ id: 'first-semester', sectionId: 'basic', term: 'firstSemester', order: 1 }
	]);
});

test('clears a course metric without changing its other fields', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		hours: 96,
		credits: 6,
		placements: []
	});
	const edited = structuredClone(initial);
	const course = edited.document.items[0];
	if (course.kind !== 'course') throw new Error('Expected course.');
	delete course.credits;

	const result = applyEditorChanges(initial, edited);
	expect(result.document.items[0]).toMatchObject({ hours: 96, type: 'mandatory' });
	expect(result.document.items[0]).not.toHaveProperty('credits');
});

test('removes an item without lowering the sequence highwater mark', () => {
	const initial = base();
	initial.document.nextSeqId = 15;
	initial.document.items.push({
		id: 'algebra',
		seqId: 3,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	const edited = structuredClone(initial);
	edited.document.items = [];

	const result = applyEditorChanges(initial, edited);
	expect(result.document.items).toEqual([]);
	expect(result.document.nextSeqId).toBe(15);
});

test('persists the order of general milestones without changing sequence ids', () => {
	const initial = base();
	initial.document.items.push(
		{ id: 'language', seqId: 2, kind: 'milestone', name: 'Idioma', placements: [] },
		{
			id: 'algebra',
			seqId: 4,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			placements: []
		},
		{ id: 'thesis', seqId: 7, kind: 'milestone', name: 'Tesis', placements: [] }
	);
	const edited = structuredClone(initial);
	edited.document.items = [
		edited.document.items[2],
		edited.document.items[1],
		edited.document.items[0]
	];

	expect(editorChanges(initial, edited)).toContainEqual({
		op: 'unplaced.reorder',
		itemIds: ['thesis', 'language']
	});
	const result = applyEditorChanges(initial, edited);
	expect(result.document.items.map(({ id, seqId }) => ({ id, seqId }))).toEqual([
		{ id: 'thesis', seqId: 7 },
		{ id: 'algebra', seqId: 4 },
		{ id: 'language', seqId: 2 }
	]);
});

test('sends a historical restoration before edits to a locally recovered item', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	const remote = base();
	const local = structuredClone(historical);
	local.document.items[0].name = 'Álgebra I';

	expect(
		editorChanges(remote, local, {
			items: { algebra: { historyVersion: 3, content: historical } },
			sections: {}
		})
	).toEqual([
		{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 },
		{ op: 'item.rename', itemId: 'algebra', name: 'Álgebra I' }
	]);
});

test('emits one atomic patch for a course enrollment requirement expression', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	initial.document.items.push({
		id: 'analysis',
		seqId: 1,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: []
	});
	const edited = structuredClone(initial);
	edited.document.items[0].requirements = {
		enroll: { type: 'item', itemId: 'analysis', state: 'passed' }
	};

	const [patch] = editorChanges(initial, edited);
	expect(patch).toEqual({
		op: 'requirement.replace',
		itemId: 'algebra',
		scope: 'enroll',
		value: {
			kind: 'expression',
			expression: { type: 'item', itemId: 'analysis', state: 'passed' }
		}
	});
	expect(changeKey(patch!)).toBe('item:algebra:requirements:enroll');
	expect(choiceKey(patch!)).toBe('requirement.replace:item:algebra:requirements:enroll');
	expect(changeValue(patch!, edited)).toBe('Análisis aprobada');
});

test('emits a requirement patch when an existing completion expression is removed', () => {
	const initial = base();
	initial.document.items.push({
		id: 'thesis',
		seqId: 0,
		kind: 'milestone',
		name: 'Tesis',
		placements: [],
		requirements: { complete: { type: 'all', rules: [] } }
	});
	const edited = structuredClone(initial);
	delete edited.document.items[0].requirements;

	expect(editorChanges(initial, edited)).toEqual([
		{
			op: 'requirement.replace',
			itemId: 'thesis',
			scope: 'complete',
			value: { kind: 'none' }
		}
	]);
});

test('emits an unknown requirement patch when its note changes', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	initial.unknownRequirements.push({
		scope: 'item:algebra:enroll',
		note: 'Revisar correlativas.'
	});
	const edited = structuredClone(initial);
	edited.unknownRequirements[0].note = 'Confirmar en la fuente.';

	const [patch] = editorChanges(initial, edited);
	expect(patch).toEqual({
		op: 'requirement.replace',
		itemId: 'algebra',
		scope: 'enroll',
		value: { kind: 'unknown', note: 'Confirmar en la fuente.' }
	});
	expect(changeValue(patch!, edited)).toBe('Confirmar en la fuente.');
});

test('describes the requirement value from the alternative content', () => {
	const local = base();
	local.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	local.document.items.push({
		id: 'analysis',
		seqId: 1,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: []
	});
	const patch = {
		op: 'requirement.replace' as const,
		itemId: 'algebra',
		scope: 'enroll' as const,
		value: {
			kind: 'expression' as const,
			expression: { type: 'item' as const, itemId: 'analysis', state: 'passed' as const }
		}
	};
	const remoteNone = structuredClone(local);
	const remoteExpression = structuredClone(local);
	remoteExpression.document.items[0].requirements = {
		enroll: { type: 'item', itemId: 'algebra', state: 'taken' }
	};

	expect(changeValue(patch, remoteNone)).toBe('Sin requisitos');
	expect(changeValue(patch, remoteExpression)).toBe('Álgebra regularizada');
});

test('creates and completes a graduation block in one batch', () => {
	const initial = base();
	const edited = structuredClone(initial);
	edited.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título',
			weight: 2,
			expr: { type: 'item', itemId: 'thesis', state: 'completed' }
		}
	];

	expect(editorChanges(initial, edited)).toEqual([
		{ op: 'graduation.create', block: { id: 'degree', label: 'Título' } },
		{ op: 'graduation.patch', blockId: 'degree', patch: { weight: 2 } },
		{
			op: 'graduation.requirement.replace',
			blockId: 'degree',
			value: {
				kind: 'expression',
				expression: { type: 'item', itemId: 'thesis', state: 'completed' }
			}
		},
		{ op: 'graduation.reorder', blockIds: ['degree'] }
	]);
});

test('retries a saved graduation creation without changing it', () => {
	const initial = base();
	const edited = structuredClone(initial);
	edited.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título',
			weight: 2,
			expr: { type: 'item', itemId: 'thesis', state: 'completed' }
		}
	];
	const patches = editorChanges(initial, edited);
	const first = mergeSectionPatches(initial, initial, patches);
	if ('conflicts' in first) throw new Error('Expected graduation creation.');
	const retry = mergeSectionPatches(initial, first.content, patches);

	expect(retry).toEqual({ content: first.content });
});

test('describes a graduation patch from the supplied content', () => {
	const local = base();
	local.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título local',
			expr: { type: 'item', itemId: 'thesis', state: 'completed' }
		}
	];
	const remote = structuredClone(local);
	remote.document.requirements.graduation![0]!.label = 'Título remoto';
	const patch = {
		op: 'graduation.patch' as const,
		blockId: 'degree',
		patch: { label: 'Título local' }
	};

	expect(changeValue(patch, local)).toBe('Título local');
	expect(changeValue(patch, remote)).toBe('Título remoto');
});

test('renames a course and reorders sections without losing course fields', () => {
	const initial = base();
	initial.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'elective',
		code: 'ALG-1',
		hours: 96,
		credits: 6,
		tags: ['matemática'],
		attributes: ['integrative'],
		placements: [{ id: 'algebra-basic', sectionId: 'basic', term: 'annual' }]
	});
	const edited = structuredClone(initial);
	edited.document.items[0].name = 'Álgebra I';
	edited.document.sections = [edited.document.sections[1], edited.document.sections[0]];

	const result = applyEditorChanges(initial, edited);
	expect(result.document.sections.map((section) => section.id)).toEqual(['advanced', 'basic']);
	expect(result.document.items[0]).toMatchObject({
		name: 'Álgebra I',
		type: 'elective',
		code: 'ALG-1',
		hours: 96,
		credits: 6,
		tags: ['matemática'],
		attributes: ['integrative'],
		placements: [{ id: 'algebra-basic', sectionId: 'basic', term: 'annual' }]
	});
});
