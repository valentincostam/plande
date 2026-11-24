import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import {
	readRequirementField,
	replaceRequirementField,
	type RequirementValue
} from './requirement-field';

test('sets and reads an enrollment leaf requirement without changing completion or its unknown marker', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'analysis',
		seqId: 0,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [],
		requirements: {
			complete: { type: 'item', itemId: 'algebra', state: 'passed' }
		}
	});
	content.unknownRequirements.push({
		scope: 'item:analysis:complete',
		note: 'Falta confirmar la aprobación.'
	});
	const value: RequirementValue = {
		kind: 'expression',
		expression: { type: 'item', itemId: 'physics', state: 'taken' }
	};

	const result = replaceRequirementField(content, 'analysis', 'enroll', value);

	expect(readRequirementField(result, 'analysis', 'enroll')).toEqual(value);
	expect(result.document.items[0]?.requirements).toEqual({
		enroll: { type: 'item', itemId: 'physics', state: 'taken' },
		complete: { type: 'item', itemId: 'algebra', state: 'passed' }
	});
	expect(result.unknownRequirements).toEqual([
		{ scope: 'item:analysis:complete', note: 'Falta confirmar la aprobación.' }
	]);
});

test('replaces an expression with no requirement and removes its unknown marker only', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'analysis',
		seqId: 0,
		kind: 'course',
		name: 'Análisis',
		type: 'mandatory',
		placements: [],
		requirements: {
			enroll: { type: 'item', itemId: 'algebra', state: 'passed' },
			complete: { type: 'item', itemId: 'physics', state: 'passed' }
		}
	});
	content.unknownRequirements.push(
		{ scope: 'item:analysis:enroll', note: 'No debería quedar.' },
		{ scope: 'item:analysis:complete', note: 'Conservá esto.' }
	);

	const result = replaceRequirementField(content, 'analysis', 'enroll', { kind: 'none' });

	expect(readRequirementField(result, 'analysis', 'enroll')).toEqual({ kind: 'none' });
	expect(result.document.items[0]?.requirements).toEqual({
		complete: { type: 'item', itemId: 'physics', state: 'passed' }
	});
	expect(result.unknownRequirements).toEqual([
		{ scope: 'item:analysis:complete', note: 'Conservá esto.' }
	]);
});

test('sets one unknown requirement marker and removes the native expression', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'thesis',
		seqId: 0,
		kind: 'milestone',
		name: 'Tesis',
		placements: [],
		requirements: { complete: { type: 'item', itemId: 'seminar', state: 'passed' } }
	});
	content.unknownRequirements.push(
		{ scope: 'item:thesis:complete', note: 'Nota anterior.' },
		{ scope: 'item:other:complete', note: 'No tocar.' }
	);

	const result = replaceRequirementField(content, 'thesis', 'complete', {
		kind: 'unknown',
		note: 'Confirmar el requisito de tesis.'
	});

	expect(readRequirementField(result, 'thesis', 'complete')).toEqual({
		kind: 'unknown',
		note: 'Confirmar el requisito de tesis.'
	});
	expect(result.document.items[0]?.requirements).toBeUndefined();
	expect(result.unknownRequirements).toEqual([
		{ scope: 'item:other:complete', note: 'No tocar.' },
		{ scope: 'item:thesis:complete', note: 'Confirmar el requisito de tesis.' }
	]);
});

test('preserves a complex expression exactly and an identical retry changes nothing', () => {
	const content = emptyDraftPlanContent();
	content.document.items.push({
		id: 'capstone',
		seqId: 0,
		kind: 'course',
		name: 'Proyecto final',
		type: 'mandatory',
		placements: []
	});
	const value: RequirementValue = {
		kind: 'expression',
		expression: {
			type: 'all',
			label: 'Regla completa',
			rules: [
				{
					type: 'any',
					rules: [
						{ type: 'item', itemId: 'analysis', state: 'passed' },
						{
							type: 'countOf',
							min: 1,
							rules: [{ type: 'item', itemId: 'algebra', state: 'taken' }]
						}
					]
				},
				{
					type: 'percent',
					selector: { type: 'sections', sectionIds: ['advanced'], term: 'annual' },
					minPercent: 75,
					state: 'passed'
				},
				{
					type: 'sum',
					selector: { type: 'tag', tag: 'elective' },
					metric: 'credits',
					min: 12,
					state: 'passed'
				},
				{
					type: 'count',
					selector: { type: 'all', courseType: 'mandatory' },
					min: 3,
					state: 'completed'
				}
			]
		}
	};

	const first = replaceRequirementField(content, 'capstone', 'complete', value);
	const retried = replaceRequirementField(first, 'capstone', 'complete', value);

	expect(readRequirementField(first, 'capstone', 'complete')).toEqual(value);
	expect(retried).toEqual(first);
});
