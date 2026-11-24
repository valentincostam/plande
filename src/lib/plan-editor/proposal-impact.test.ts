import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import { proposalImpact } from './proposal-impact';
import type { ReviewUnitsInput } from './review-units';

const input = (): ReviewUnitsInput => {
	const content = emptyDraftPlanContent();
	content.document.sections = [
		{ id: 'basic', label: 'Básica' },
		{ id: 'advanced', label: 'Avanzada' }
	];
	content.document.items = [
		{
			id: 'algebra',
			seqId: 0,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			tags: ['math'],
			credits: 6,
			placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			placements: [{ id: 'analysis-basic', sectionId: 'basic' }],
			requirements: {
				enroll: {
					type: 'sum',
					selector: { type: 'tag', tag: 'math' },
					metric: 'credits',
					min: 6,
					state: 'passed'
				}
			}
		}
	];
	content.document.requirements.graduation = [
		{
			id: 'degree',
			label: 'Título',
			expr: {
				type: 'count',
				selector: { type: 'section', sectionId: 'basic' },
				min: 2,
				state: 'passed'
			}
		}
	];
	return {
		content,
		identity: { university: 'UN', faculty: 'FC', offer: 'Carrera' },
		sources: [{ id: 'source-a', label: 'Plan', url: 'https://example.edu/plan' }]
	};
};

test('marks a directly edited unit changed while retaining independent units', () => {
	const base = input();
	const candidate = structuredClone(base);
	candidate.content.document.items[0].name = 'Álgebra I';

	const impact = proposalImpact(base, candidate);

	expect(impact.changed.map((unit) => unit.after.key)).toContain('item:algebra');
	expect(impact.unchangedKeys).toContain('source:source-a');
});

test('marks a tag-dependent requirement changed when another item tag changes', () => {
	const base = input();
	const candidate = structuredClone(base);
	candidate.content.document.items[0].tags = ['science'];

	expect(proposalImpact(base, candidate).changed.map((unit) => unit.after.key)).toEqual(
		expect.arrayContaining(['item:algebra', 'item:analysis'])
	);
});

test('retains every key when the review contexts are unchanged', () => {
	const base = input();
	const impact = proposalImpact(base, structuredClone(base));

	expect(impact.added).toEqual([]);
	expect(impact.removed).toEqual([]);
	expect(impact.changed).toEqual([]);
	expect(impact.unchangedKeys).toEqual([
		'identity',
		'source:source-a',
		'item:algebra',
		'item:analysis',
		'graduation:degree'
	]);
});

test('does not reuse matching unavailable units', () => {
	const base = input();
	base.content.unknownRequirements.push({ scope: 'item:algebra:enroll', note: 'Pendiente' });

	const impact = proposalImpact(base, structuredClone(base));

	expect(impact.changed.map((unit) => unit.after.key)).toContain('item:algebra');
	expect(impact.unchangedKeys).not.toContain('item:algebra');
});

test('classifies added and removed review units', () => {
	const base = input();
	const added = structuredClone(base);
	added.content.document.items.push({
		id: 'physics',
		seqId: 2,
		kind: 'course',
		name: 'Física',
		type: 'mandatory',
		placements: [{ id: 'physics-basic', sectionId: 'basic' }]
	});
	const removed = structuredClone(base);
	removed.content.document.items = removed.content.document.items.filter(
		(item) => item.id !== 'analysis'
	);

	expect(proposalImpact(base, added).added.map((unit) => unit.key)).toContain('item:physics');
	expect(proposalImpact(base, removed).removed.map((unit) => unit.key)).toContain('item:analysis');
});

test('marks a sum requirement changed when a selected course credit changes', () => {
	const base = input();
	const candidate = structuredClone(base);
	const algebra = candidate.content.document.items.find((item) => item.id === 'algebra');
	if (!algebra || algebra.kind !== 'course') throw new Error('Expected algebra course fixture.');
	algebra.credits = 5;

	expect(proposalImpact(base, candidate).changed.map((unit) => unit.after.key)).toEqual(
		expect.arrayContaining(['item:algebra', 'item:analysis'])
	);
});

test('marks graduation changed when an item moves out of its selected section', () => {
	const base = input();
	const candidate = structuredClone(base);
	candidate.content.document.items[0].placements[0].sectionId = 'advanced';

	expect(proposalImpact(base, candidate).changed.map((unit) => unit.after.key)).toEqual(
		expect.arrayContaining(['item:algebra', 'graduation:degree'])
	);
});
