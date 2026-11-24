import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import { changeKey } from './editor-changes';
import { mergeSectionPatches, parseSectionPatches } from './section-patches';

const base = () => ({
	...emptyDraftPlanContent(),
	document: { ...emptyDraftPlanContent().document, sections: [{ id: 'basic', label: 'Básica' }] }
});

test('merges a course creation with a concurrent section rename', () => {
	const initial = base();
	const current = structuredClone(initial);
	current.document.sections[0].label = 'Formación básica';
	const result = mergeSectionPatches(initial, current, [
		{
			op: 'course.create',
			item: { id: 'algebra', placementId: 'algebra-basic', sectionId: 'basic', name: 'Álgebra' }
		}
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0]).toMatchObject({
		id: 'algebra',
		seqId: 0,
		name: 'Álgebra',
		placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
	});
	expect(result.content.unknownRequirements).toHaveLength(2);
});

test('accepts an atomic requirement replacement with an exact native expression', () => {
	const patches = parseSectionPatches([
		{
			op: 'requirement.replace',
			itemId: 'algebra',
			scope: 'enroll',
			value: {
				kind: 'expression',
				expression: {
					type: 'all',
					rules: [
						{ type: 'item', itemId: 'analysis', state: 'passed' },
						{
							type: 'countOf',
							min: 1,
							rules: [{ type: 'item', itemId: 'physics', state: 'taken' }]
						}
					]
				}
			}
		}
	]);

	expect(patches).toEqual([
		expect.objectContaining({
			op: 'requirement.replace',
			itemId: 'algebra',
			scope: 'enroll'
		})
	]);
});

test('rejects a stale reorder of general milestones', () => {
	const initial = base();
	initial.document.items.push(
		{ id: 'language', seqId: 0, kind: 'milestone', name: 'Idioma', placements: [] },
		{ id: 'thesis', seqId: 1, kind: 'milestone', name: 'Tesis', placements: [] },
		{ id: 'practice', seqId: 2, kind: 'milestone', name: 'Práctica', placements: [] }
	);
	const current = structuredClone(initial);
	current.document.items = [
		current.document.items[1],
		current.document.items[0],
		current.document.items[2]
	];

	const result = mergeSectionPatches(initial, current, [
		{ op: 'unplaced.reorder', itemIds: ['language', 'practice', 'thesis'] }
	]);
	expect(result).toMatchObject({ conflicts: ['unplaced:order'] });
});

test('replaces one requirement field without changing another scope', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [],
		requirements: { complete: { type: 'item', itemId: 'analysis', state: 'passed' } }
	});
	initial.unknownRequirements.push({ scope: 'item:algebra:enroll', note: 'Pendiente.' });

	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'requirement.replace',
			itemId: 'algebra',
			scope: 'enroll',
			value: { kind: 'expression', expression: { type: 'item', itemId: 'physics', state: 'taken' } }
		}
	]);

	expect(result).toEqual({
		content: expect.objectContaining({
			document: expect.objectContaining({
				items: [
					expect.objectContaining({
						requirements: {
							enroll: { type: 'item', itemId: 'physics', state: 'taken' },
							complete: { type: 'item', itemId: 'analysis', state: 'passed' }
						}
					})
				]
			}),
			unknownRequirements: []
		})
	});
});

test('retries an identical requirement replacement without changing the document', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	const patch = {
		op: 'requirement.replace' as const,
		itemId: 'algebra',
		scope: 'enroll' as const,
		value: { kind: 'unknown' as const, note: 'Confirmar en la fuente.' }
	};
	const first = mergeSectionPatches(initial, initial, [patch]);
	if ('conflicts' in first) throw new Error('Expected requirement replacement.');
	const retried = mergeSectionPatches(initial, first.content, [patch]);

	expect(retried).toEqual({ content: first.content });
});

test('preserves a quantitative native expression and its selector data through replacement', () => {
	const initial = base();
	initial.document.items.push(
		{
			id: 'capstone',
			seqId: 0,
			kind: 'course',
			name: 'Proyecto final',
			type: 'mandatory',
			placements: [{ id: 'capstone-basic', sectionId: 'basic' }]
		},
		{
			id: 'elective',
			seqId: 1,
			kind: 'course',
			name: 'Electiva',
			type: 'elective',
			credits: 6,
			tags: ['electivas'],
			placements: [{ id: 'elective-basic', sectionId: 'basic', term: 'annual' }]
		}
	);
	const expression = {
		type: 'sum' as const,
		selector: { type: 'tag' as const, tag: 'electivas' },
		metric: 'credits' as const,
		min: 6,
		state: 'passed' as const
	};
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'requirement.replace',
			itemId: 'capstone',
			scope: 'complete',
			value: { kind: 'expression', expression }
		}
	]);

	expect(result.content.document.items[0]?.requirements?.complete).toEqual(expression);
	expect(result.content.document.items[1]).toMatchObject({
		tags: ['electivas'],
		credits: 6,
		placements: [{ id: 'elective-basic', sectionId: 'basic', term: 'annual' }]
	});
});

test('applies a new course requirement in the same patch batch', () => {
	const initial = base();
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'course.create',
			item: { id: 'algebra', placementId: 'algebra-basic', sectionId: 'basic', name: 'Álgebra' }
		},
		{
			op: 'requirement.replace',
			itemId: 'algebra',
			scope: 'enroll',
			value: {
				kind: 'expression',
				expression: { type: 'item', itemId: 'analysis', state: 'passed' }
			}
		}
	]);

	expect(result.content.document.items[0]?.requirements?.enroll).toEqual({
		type: 'item',
		itemId: 'analysis',
		state: 'passed'
	});
	expect('conflicts' in result).toBe(false);
});

test('applies a requirement after restoring its item in the same patch batch', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	const initial = base();
	const result = mergeSectionPatches(
		initial,
		initial,
		[
			{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 },
			{
				op: 'requirement.replace',
				itemId: 'algebra',
				scope: 'complete',
				value: { kind: 'unknown', note: 'Confirmar en la fuente.' }
			}
		],
		new Map([[3, historical]])
	);

	expect(result.content.unknownRequirements).toEqual([
		{ scope: 'item:algebra:complete', note: 'Confirmar en la fuente.' }
	]);
	expect('conflicts' in result).toBe(false);
});

test('reports an unknown note conflict for its whole requirement field', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	initial.unknownRequirements.push({ scope: 'item:algebra:enroll', note: 'Fuente A.' });
	const current = structuredClone(initial);
	current.unknownRequirements[0].note = 'Fuente B.';
	const patch = {
		op: 'requirement.replace' as const,
		itemId: 'algebra',
		scope: 'enroll' as const,
		value: { kind: 'unknown' as const, note: 'Fuente C.' }
	};
	const result = mergeSectionPatches(initial, current, [patch]);

	expect(result).toMatchObject({
		content: { unknownRequirements: [{ scope: 'item:algebra:enroll', note: 'Fuente B.' }] }
	});
	if (!('conflicts' in result)) throw new Error('Expected requirement conflict.');
	expect(result.conflicts).toContain(changeKey(patch));
});

test('creates an elective course with its submitted metadata', () => {
	const initial = base();
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'course.create',
			item: {
				id: 'seminar',
				placementId: 'seminar-basic',
				sectionId: 'basic',
				name: 'Seminario',
				fields: { type: 'elective', credits: 4, tags: ['humanidades'] }
			}
		}
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items).toEqual([
		expect.objectContaining({
			id: 'seminar',
			seqId: 0,
			type: 'elective',
			credits: 4,
			tags: ['humanidades'],
			placements: [{ id: 'seminar-basic', sectionId: 'basic' }]
		})
	]);
	expect(result.content.document.nextSeqId).toBe(1);
	expect(result.content.unknownRequirements.map((entry) => entry.scope)).toEqual([
		'item:seminar:enroll',
		'item:seminar:complete'
	]);
});

test('keeps the document when retrying an identical course creation', () => {
	const initial = base();
	const creation = {
		op: 'course.create' as const,
		item: {
			id: 'seminar',
			placementId: 'seminar-basic',
			sectionId: 'basic',
			name: 'Seminario',
			fields: { type: 'elective' as const, credits: 4, tags: ['humanidades'] }
		}
	};
	const created = mergeSectionPatches(initial, initial, [creation]);
	if (!created.content) throw new Error('Expected course creation.');
	const retried = mergeSectionPatches(initial, created.content, [creation]);
	if (!retried.content) throw new Error('Expected idempotent creation.');
	expect(retried.content).toEqual(created.content);
});

test('patches the placement created by a course creation in the same batch', () => {
	const initial = base();
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'course.create',
			item: {
				id: 'seminar',
				placementId: 'seminar-placement',
				sectionId: 'basic',
				name: 'Seminario'
			}
		},
		{
			op: 'placement.patch',
			itemId: 'seminar',
			placementId: 'seminar-placement',
			patch: { term: 'firstSemester', order: 2 }
		}
	]);
	if (!result.content) throw new Error('Expected compatible batch.');
	expect(result.content.document.items[0].placements).toEqual([
		{ id: 'seminar-placement', sectionId: 'basic', term: 'firstSemester', order: 2 }
	]);
});

test('reorders a section created earlier in the same batch', () => {
	const initial = base();
	initial.document.sections.push({ id: 'final', label: 'Final' });
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'section.create', section: { id: 'advanced', label: 'Avanzada' } },
		{ op: 'section.reorder', sectionId: 'advanced', afterSectionId: 'basic' }
	]);
	if (!result.content) throw new Error('Expected compatible batch.');
	expect(result.content.document.sections.map((section) => section.id)).toEqual([
		'basic',
		'advanced',
		'final'
	]);
});

test('does not treat entities created outside the batch as local creations', () => {
	const initial = base();
	const current = structuredClone(initial);
	current.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	current.document.items.push({
		id: 'seminar',
		seqId: 0,
		kind: 'course',
		name: 'Seminario',
		type: 'mandatory',
		placements: [{ id: 'seminar-placement', sectionId: 'basic' }]
	});
	const result = mergeSectionPatches(initial, current, [
		{
			op: 'placement.patch',
			itemId: 'seminar',
			placementId: 'seminar-placement',
			patch: { order: 2 }
		},
		{ op: 'section.reorder', sectionId: 'advanced', afterSectionId: 'basic' }
	]);
	expect(result).toMatchObject({ conflicts: ['seminar-placement', 'advanced'] });
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items[0].placements[0]).toEqual({
		id: 'seminar-placement',
		sectionId: 'basic'
	});
	expect(result.content.document.sections.map((section) => section.id)).toEqual([
		'basic',
		'advanced'
	]);
});

test('adds a second placement without changing the item sequence or requirements', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 7,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		requirements: { enroll: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
	});
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'placement.create',
			itemId: 'algebra',
			placement: { id: 'first-semester', sectionId: 'basic', term: 'firstSemester', order: 1 }
		}
	]);
	if (!result.content) throw new Error('Expected placement creation.');
	expect(result.content.document.items[0]).toMatchObject({
		seqId: 7,
		requirements: { enroll: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [
			{ id: 'annual', sectionId: 'basic', term: 'annual' },
			{ id: 'first-semester', sectionId: 'basic', term: 'firstSemester', order: 1 }
		]
	});
});

test('keeps native requirement references and reports diagnostics when removing an item', () => {
	const initial = base();
	initial.document.items.push(
		{
			id: 'algebra',
			seqId: 9,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			placements: []
		},
		{
			id: 'analysis',
			seqId: 10,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [],
			requirements: {
				enroll: { type: 'item', itemId: 'algebra', state: 'passed' },
				complete: { type: 'item', itemId: 'algebra', state: 'passed' }
			}
		}
	);
	initial.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título',
			expr: { type: 'item', itemId: 'algebra', state: 'passed' }
		}
	];
	initial.document.nextSeqId = 11;
	const result = mergeSectionPatches(initial, initial, [{ op: 'item.remove', itemId: 'algebra' }]);
	expect(result).toMatchObject({
		conflicts: ['algebra'],
		diagnostics: [
			{ targetId: 'algebra', scope: 'item:analysis:enroll' },
			{ targetId: 'algebra', scope: 'item:analysis:complete' },
			{ targetId: 'algebra', scope: 'graduation:degree' }
		]
	});
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items.map((item) => item.id)).toEqual(['algebra', 'analysis']);
	expect(result.content.document.nextSeqId).toBe(11);
});

test('keeps a concurrent item edit and accepts an already completed removal', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 9,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	initial.document.nextSeqId = 10;
	const edited = structuredClone(initial);
	edited.document.items[0].name = 'Álgebra I';
	const conflicted = mergeSectionPatches(initial, edited, [
		{ op: 'item.remove', itemId: 'algebra' }
	]);
	expect(conflicted).toMatchObject({ conflicts: ['algebra'] });
	if (!conflicted.content) throw new Error('Expected partial merge content.');
	expect(conflicted.content.document.items[0].name).toBe('Álgebra I');

	const removed = structuredClone(initial);
	removed.document.items = [];
	const retried = mergeSectionPatches(initial, removed, [{ op: 'item.remove', itemId: 'algebra' }]);
	if (!retried.content) throw new Error('Expected idempotent removal.');
	expect(retried.content.document.items).toEqual([]);
	expect(retried.content.document.nextSeqId).toBe(10);
});

test('keeps placements and reports diagnostics when removing a section', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
	});
	initial.document.nextSeqId = 5;
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'section.remove', sectionId: 'basic' }
	]);
	expect(result).toMatchObject({
		conflicts: ['basic'],
		diagnostics: [{ targetId: 'basic', scope: 'item:algebra:placement:annual' }]
	});
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.sections).toEqual([{ id: 'basic', label: 'Básica' }]);
	expect(result.content.document.items[0].placements).toEqual([
		{ id: 'annual', sectionId: 'basic', term: 'annual' }
	]);
	expect(result.content.document.nextSeqId).toBe(5);
});

test('keeps an empty section referenced by nested requirement selectors', () => {
	const initial = base();
	initial.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	initial.document.items.push({
		id: 'analysis',
		seqId: 0,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [],
		requirements: {
			enroll: {
				type: 'all',
				rules: [
					{
						type: 'count',
						selector: { type: 'section', sectionId: 'advanced' },
						min: 1,
						state: 'passed'
					},
					{
						type: 'percent',
						selector: { type: 'sections', sectionIds: ['advanced'] },
						minPercent: 50,
						state: 'passed'
					},
					{
						type: 'sum',
						selector: { type: 'section', sectionId: 'advanced' },
						metric: 'credits',
						min: 2,
						state: 'passed'
					}
				]
			}
		}
	});
	initial.document.requirements.graduation = [
		{
			id: 'graduation',
			label: 'Egreso',
			expr: {
				type: 'any',
				rules: [
					{
						type: 'count',
						selector: { type: 'sections', sectionIds: ['advanced'] },
						min: 1,
						state: 'passed'
					}
				]
			}
		}
	];

	const result = mergeSectionPatches(initial, initial, [
		{ op: 'section.remove', sectionId: 'advanced' }
	]);

	expect(result).toMatchObject({
		conflicts: ['advanced'],
		diagnostics: [
			{ targetId: 'advanced', scope: 'item:analysis:enroll' },
			{ targetId: 'advanced', scope: 'graduation:graduation' }
		]
	});
	if (!('conflicts' in result)) throw new Error('Expected selector references to block removal.');
	expect(result.content.document.sections.map((section) => section.id)).toEqual([
		'basic',
		'advanced'
	]);
});

test('moves a section after its stable neighbor', () => {
	const initial = base();
	initial.document.sections.push(
		{ id: 'advanced', label: 'Avanzada' },
		{ id: 'final', label: 'Final' }
	);
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'section.reorder', sectionId: 'final', afterSectionId: null }
	]);
	if (!result.content) throw new Error('Expected section reorder.');
	expect(result.content.document.sections.map((section) => section.id)).toEqual([
		'final',
		'basic',
		'advanced'
	]);
});

test('merges placement changes to different fields', () => {
	const initial = base();
	initial.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'algebra-placement', sectionId: 'basic', term: 'annual', order: 1 }]
	});
	const current = structuredClone(initial);
	current.document.items[0].placements[0].term = 'firstSemester';
	const result = mergeSectionPatches(initial, current, [
		{
			op: 'placement.patch',
			itemId: 'algebra',
			placementId: 'algebra-placement',
			patch: { order: 2 }
		}
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0].placements).toEqual([
		{ id: 'algebra-placement', sectionId: 'basic', term: 'firstSemester', order: 2 }
	]);
});

test('reports a same-field placement conflict without forcing the change', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'algebra-placement', sectionId: 'basic', order: 1 }]
	});
	const current = structuredClone(initial);
	current.document.items[0].placements[0].order = 3;
	const result = mergeSectionPatches(initial, current, [
		{
			op: 'placement.patch',
			itemId: 'algebra',
			placementId: 'algebra-placement',
			patch: { order: 2 }
		}
	]);
	expect(result).toMatchObject({ conflicts: ['algebra-placement:order'] });
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items[0].placements[0].order).toBe(3);
});

test('restores a deleted item from trusted history with its stable sequence and requirements', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		requirements: { enroll: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [{ id: 'algebra-basic', sectionId: 'basic', term: 'annual' }]
	});
	historical.document.items.push({
		id: 'analysis',
		seqId: 5,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: []
	});
	historical.document.nextSeqId = 6;
	historical.unknownRequirements.push({
		scope: 'item:algebra:complete',
		note: 'Verificar correlativas.'
	});
	const current = structuredClone(historical);
	current.document.items = current.document.items.filter((item) => item.id !== 'algebra');

	const result = mergeSectionPatches(
		historical,
		current,
		[
			{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 },
			{ op: 'item.rename', itemId: 'algebra', name: 'Álgebra I' }
		],
		new Map([[3, historical]])
	);

	if ('conflicts' in result)
		throw new Error(`Unexpected conflicts: ${result.conflicts.join(', ')}`);
	expect(result.content.document.items.find((item) => item.id === 'algebra')).toEqual({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra I',
		type: 'mandatory',
		requirements: { enroll: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [{ id: 'algebra-basic', sectionId: 'basic', term: 'annual' }]
	});
	expect(result.content.document.nextSeqId).toBe(6);
	expect(result.content.unknownRequirements).toContainEqual({
		scope: 'item:algebra:complete',
		note: 'Verificar correlativas.'
	});
});

test('applies edits after restoring an item into a rebased document', () => {
	const historical = base();
	historical.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		credits: 4,
		placements: [{ id: 'algebra-basic', sectionId: 'basic', order: 1 }]
	});
	historical.document.nextSeqId = 5;
	const rebased = structuredClone(historical);
	rebased.document.items = [];

	const result = mergeSectionPatches(
		rebased,
		rebased,
		[
			{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 },
			{ op: 'item.rename', itemId: 'algebra', name: 'Álgebra I' },
			{ op: 'course.patch', itemId: 'algebra', patch: { credits: 6 } },
			{
				op: 'placement.patch',
				itemId: 'algebra',
				placementId: 'algebra-basic',
				patch: { order: 2 }
			}
		],
		new Map([[3, historical]])
	);

	if ('conflicts' in result)
		throw new Error(`Unexpected conflicts: ${result.conflicts.join(', ')}`);
	expect(result.content.document.items).toEqual([
		expect.objectContaining({
			id: 'algebra',
			name: 'Álgebra I',
			credits: 6,
			placements: [{ id: 'algebra-basic', sectionId: 'basic', order: 2 }]
		})
	]);
});

test('restores only the deleted section from trusted history', () => {
	const historical = base();
	historical.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	historical.document.items.push({
		id: 'analysis',
		seqId: 1,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [{ id: 'analysis-advanced', sectionId: 'advanced' }]
	});
	const current = structuredClone(historical);
	current.document.sections = current.document.sections.filter(
		(section) => section.id !== 'advanced'
	);
	current.document.items = [];

	const result = mergeSectionPatches(
		historical,
		current,
		[{ op: 'section.restore', sectionId: 'advanced', historyVersion: 3 }],
		new Map([[3, historical]])
	);

	if ('conflicts' in result)
		throw new Error(`Unexpected conflicts: ${result.conflicts.join(', ')}`);
	expect(result.content.document.sections.map((section) => section.id)).toEqual([
		'basic',
		'advanced'
	]);
	expect(result.content.document.items).toEqual([]);
});

test('renames and reorders a section after restoring it into a rebased document', () => {
	const historical = base();
	historical.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	const rebased = structuredClone(historical);
	rebased.document.sections = [{ id: 'basic', label: 'Básica' }];

	const result = mergeSectionPatches(
		rebased,
		rebased,
		[
			{ op: 'section.restore', sectionId: 'advanced', historyVersion: 3 },
			{ op: 'section.rename', sectionId: 'advanced', label: 'Formación avanzada' },
			{ op: 'section.reorder', sectionId: 'advanced', afterSectionId: null }
		],
		new Map([[3, historical]])
	);

	if ('conflicts' in result)
		throw new Error(`Unexpected conflicts: ${result.conflicts.join(', ')}`);
	expect(result.content.document.sections).toEqual([
		{ id: 'advanced', label: 'Formación avanzada' },
		{ id: 'basic', label: 'Básica' }
	]);
});

test('rejects restoration when its historical placement or requirement dependency is missing', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		requirements: { enroll: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
	});
	historical.document.nextSeqId = 5;
	const current = emptyDraftPlanContent();

	const result = mergeSectionPatches(
		historical,
		current,
		[{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 }],
		new Map([[3, historical]])
	);

	expect(result).toMatchObject({ conflicts: ['algebra'] });
	if (!('conflicts' in result)) throw new Error('Expected recovery conflict.');
	expect(result.content.document.items).toEqual([]);
});

test('rejects item restoration when a historical requirement selector names a missing section', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [],
		requirements: {
			enroll: {
				type: 'sum',
				selector: { type: 'sections', sectionIds: ['advanced'] },
				metric: 'credits',
				min: 2,
				state: 'passed'
			}
		}
	});
	const current = base();

	const result = mergeSectionPatches(
		historical,
		current,
		[{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 }],
		new Map([[3, historical]])
	);

	expect(result).toMatchObject({ conflicts: ['algebra'] });
	if (!('conflicts' in result)) throw new Error('Expected restoration conflict.');
	expect(result.content.document.items).toEqual([]);
});

test('reports a conflict instead of replacing a different item with the restored ID', () => {
	const historical = base();
	historical.document.items.push({
		id: 'algebra',
		seqId: 4,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: []
	});
	const current = structuredClone(historical);
	current.document.items[0].name = 'Otro Álgebra';

	const result = mergeSectionPatches(
		historical,
		current,
		[{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 }],
		new Map([[3, historical]])
	);

	expect(result).toMatchObject({ conflicts: ['algebra'] });
});

test('rejects placement creation with a missing section, duplicate tuple, or reused ID', () => {
	const initial = base();
	initial.document.items.push(
		{
			id: 'algebra',
			seqId: 0,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			placements: [{ id: 'annual', sectionId: 'basic', term: 'annual' }]
		},
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: []
		}
	);
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'placement.create',
			itemId: 'algebra',
			placement: { id: 'missing-section', sectionId: 'missing' }
		},
		{
			op: 'placement.create',
			itemId: 'algebra',
			placement: { id: 'duplicate-tuple', sectionId: 'basic', term: 'annual' }
		},
		{
			op: 'placement.create',
			itemId: 'analysis',
			placement: { id: 'annual', sectionId: 'basic', term: 'firstSemester' }
		}
	]);
	expect(result).toMatchObject({
		conflicts: ['missing-section', 'duplicate-tuple', 'annual']
	});
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items[0].placements).toEqual([
		{ id: 'annual', sectionId: 'basic', term: 'annual' }
	]);
});

test('rejects a placement patch that moves into a missing section or duplicate tuple', () => {
	const initial = base();
	initial.document.sections.push({ id: 'advanced', label: 'Avanzada' });
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [
			{ id: 'basic-annual', sectionId: 'basic', term: 'annual' },
			{ id: 'advanced-annual', sectionId: 'advanced', term: 'annual' }
		]
	});
	const result = mergeSectionPatches(initial, initial, [
		{
			op: 'placement.patch',
			itemId: 'algebra',
			placementId: 'advanced-annual',
			patch: { sectionId: 'missing' }
		},
		{
			op: 'placement.patch',
			itemId: 'algebra',
			placementId: 'advanced-annual',
			patch: { sectionId: 'basic' }
		}
	]);
	expect(result).toMatchObject({
		conflicts: ['advanced-annual:sectionId', 'advanced-annual:sectionId']
	});
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items[0].placements[1].sectionId).toBe('advanced');
});

test('removes a placement without changing its item sequence or requirements', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 7,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		requirements: { complete: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [
			{ id: 'annual', sectionId: 'basic', term: 'annual' },
			{ id: 'first-semester', sectionId: 'basic', term: 'firstSemester' }
		]
	});
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'placement.remove', itemId: 'algebra', placementId: 'annual' }
	]);
	if (!result.content) throw new Error('Expected placement removal.');
	expect(result.content.document.items[0]).toMatchObject({
		seqId: 7,
		requirements: { complete: { type: 'item', itemId: 'analysis', state: 'passed' } },
		placements: [{ id: 'first-semester', sectionId: 'basic', term: 'firstSemester' }]
	});
});

test('reports a same-field stale section rename conflict', () => {
	const initial = base();
	const current = structuredClone(initial);
	current.document.sections[0].label = 'Otro nombre';
	expect(
		mergeSectionPatches(initial, current, [
			{ op: 'section.rename', sectionId: 'basic', label: 'Nuevo nombre' }
		])
	).toMatchObject({ conflicts: ['basic'] });
});

test('merges a course rename when another section changed', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'p', sectionId: 'basic' }]
	});
	initial.document.nextSeqId = 1;
	const current = structuredClone(initial);
	current.document.sections[0].label = 'Formación básica';
	const result = mergeSectionPatches(initial, current, [
		{ op: 'course.rename', itemId: 'algebra', name: 'Álgebra I' }
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0].name).toBe('Álgebra I');
});

test('reports a stale course rename conflict', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		placements: [{ id: 'p', sectionId: 'basic' }]
	});
	const current = structuredClone(initial);
	current.document.items[0].name = 'Matemática';
	expect(
		mergeSectionPatches(initial, current, [
			{ op: 'course.rename', itemId: 'algebra', name: 'Álgebra I' }
		])
	).toMatchObject({ conflicts: ['algebra'] });
});

test('merges a general milestone creation with a concurrent section change', () => {
	const initial = base();
	const current = structuredClone(initial);
	current.document.sections[0].label = 'Formación básica';
	const result = mergeSectionPatches(initial, current, [
		{ op: 'milestone.create', item: { id: 'thesis', name: 'Tesis' } }
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0]).toMatchObject({
		id: 'thesis',
		kind: 'milestone',
		seqId: 0,
		placements: []
	});
	expect(result.content.unknownRequirements.map((entry) => entry.scope)).toEqual([
		'item:thesis:complete'
	]);
});

test.each([
	{ id: 'thesis', name: 'Tesis', placementId: 'thesis-basic' },
	{ id: 'thesis', name: 'Tesis', sectionId: 'basic' }
])('rejects a milestone placement without its matching field', (item) => {
	expect(() => parseSectionPatches([{ op: 'milestone.create', item }])).toThrow();
});

test('rejects a duplicate milestone ID', () => {
	const initial = base();
	initial.document.items.push({
		id: 'thesis',
		seqId: 0,
		kind: 'milestone',
		name: 'Tesis',
		placements: []
	});
	expect(
		mergeSectionPatches(initial, initial, [
			{ op: 'milestone.create', item: { id: 'thesis', name: 'Otra' } }
		])
	).toMatchObject({ conflicts: ['thesis'] });
});

test('merges distinct concurrent course fields and clears a metric', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		credits: 6,
		placements: []
	});
	const current = structuredClone(initial);
	current.document.items[0].code = 'MAT-1';
	const result = mergeSectionPatches(initial, current, [
		{ op: 'course.patch', itemId: 'algebra', patch: { credits: null, hours: 90 } }
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0]).toMatchObject({ code: 'MAT-1', hours: 90 });
	expect(result.content.document.items[0]).not.toHaveProperty('credits');
});

test('combines concurrent clears of an optional course field', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		credits: 6,
		placements: []
	});
	const current = structuredClone(initial);
	const course = current.document.items[0];
	if (course.kind !== 'course') throw new Error('Expected course.');
	delete course.credits;
	const result = mergeSectionPatches(initial, current, [
		{ op: 'course.patch', itemId: 'algebra', patch: { credits: null } }
	]);
	if (!result.content) throw new Error('Expected compatible merge.');
	expect(result.content.document.items[0]).not.toHaveProperty('credits');
});

test('creates and edits a graduation block in the same patch batch', () => {
	const initial = base();
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'graduation.create', block: { id: 'degree', label: 'Título' } },
		{ op: 'graduation.patch', blockId: 'degree', patch: { weight: 2 } },
		{
			op: 'graduation.requirement.replace',
			blockId: 'degree',
			value: {
				kind: 'expression',
				expression: { type: 'item', itemId: 'thesis', state: 'completed' }
			}
		}
	]);

	expect(result).toMatchObject({
		content: {
			document: {
				requirements: {
					graduation: [
						{
							id: 'degree',
							label: 'Título',
							weight: 2,
							expr: { type: 'item', itemId: 'thesis', state: 'completed' }
						}
					]
				}
			},
			unknownRequirements: []
		}
	});
});

test('reorders a graduation block created in the same patch batch', () => {
	const initial = base();
	initial.document.requirements.graduation = [
		{ id: 'a', label: 'A', expr: { type: 'item', itemId: 'thesis', state: 'completed' } }
	];
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'graduation.create', block: { id: 'b', label: 'B' } },
		{ op: 'graduation.reorder', blockIds: ['b', 'a'] }
	]);

	expect(result).not.toHaveProperty('conflicts');
	expect(result.content.document.requirements.graduation?.map((block) => block.id)).toEqual([
		'b',
		'a'
	]);
});

test('keeps a concurrent graduation reorder instead of overwriting it', () => {
	const initial = base();
	initial.document.requirements.graduation = [
		{ id: 'a', label: 'A', expr: { type: 'item', itemId: 'a-item', state: 'completed' } },
		{ id: 'b', label: 'B', expr: { type: 'item', itemId: 'b-item', state: 'completed' } },
		{ id: 'c', label: 'C', expr: { type: 'item', itemId: 'c-item', state: 'completed' } }
	];
	const current = structuredClone(initial);
	current.document.requirements.graduation = [
		current.document.requirements.graduation![1]!,
		current.document.requirements.graduation![0]!,
		current.document.requirements.graduation![2]!
	];
	const result = mergeSectionPatches(initial, current, [
		{ op: 'graduation.reorder', blockIds: ['a', 'c', 'b'] }
	]);

	expect(result).toMatchObject({ conflicts: ['graduation:order'] });
	expect(result.content.document.requirements.graduation?.map((block) => block.id)).toEqual([
		'b',
		'a',
		'c'
	]);
});

test('rejects a duplicate graduation reorder without dropping a block', () => {
	const initial = base();
	initial.document.requirements.graduation = [
		{ id: 'a', label: 'A', expr: { type: 'item', itemId: 'thesis', state: 'completed' } },
		{ id: 'b', label: 'B', expr: { type: 'item', itemId: 'practice', state: 'completed' } }
	];
	const result = mergeSectionPatches(initial, initial, [
		{ op: 'graduation.reorder', blockIds: ['a', 'a'] }
	]);

	expect(result).toMatchObject({ conflicts: ['graduation:order'] });
	expect(result.content.document.requirements.graduation?.map((block) => block.id)).toEqual([
		'a',
		'b'
	]);
});

test('keeps a concurrent graduation edit when another editor removes the block', () => {
	const initial = base();
	initial.document.requirements.graduation = [
		{ id: 'degree', label: 'Título', expr: { type: 'item', itemId: 'thesis', state: 'completed' } }
	];
	const current = structuredClone(initial);
	current.document.requirements.graduation![0]!.label = 'Título final';

	const result = mergeSectionPatches(initial, current, [
		{ op: 'graduation.remove', blockId: 'degree' }
	]);

	expect(result).toMatchObject({ conflicts: ['graduation:degree'] });
	expect(result.content.document.requirements.graduation?.[0].label).toBe('Título final');
});

test('reports a divergent course field conflict', () => {
	const initial = base();
	initial.document.items.push({
		id: 'algebra',
		seqId: 0,
		kind: 'course',
		name: 'Álgebra',
		type: 'mandatory',
		credits: 6,
		placements: []
	});
	const current = structuredClone(initial);
	const course = current.document.items[0];
	if (course.kind !== 'course') throw new Error('Expected course.');
	course.credits = 8;
	const result = mergeSectionPatches(initial, current, [
		{ op: 'course.patch', itemId: 'algebra', patch: { credits: 10, hours: 90 } }
	]);
	expect(result).toMatchObject({ conflicts: ['algebra:credits'] });
	if (!result.content) throw new Error('Expected partial merge content.');
	expect(result.content.document.items[0]).toMatchObject({ credits: 8, hours: 90 });
});
