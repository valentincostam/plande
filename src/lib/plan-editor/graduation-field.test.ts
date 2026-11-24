import { expect, test } from 'vitest';
import { emptyDraftPlanContent } from './draft-plan-content';
import { readGraduationRequirement, replaceGraduationRequirement } from './graduation-field';

test('treats a graduation block without an expression as unknown and replaces only that field', () => {
	const content = emptyDraftPlanContent();
	content.document.requirements.graduation = [
		{ id: 'degree', label: 'Título', weight: 3 },
		{
			id: 'practice',
			label: 'Práctica',
			expr: { type: 'item', itemId: 'internship', state: 'completed' }
		}
	];
	content.unknownRequirements.push({ scope: 'graduation:degree', note: 'Confirmar condición.' });

	const result = replaceGraduationRequirement(content, 'degree', {
		kind: 'expression',
		expression: { type: 'item', itemId: 'thesis', state: 'completed' }
	});

	expect(readGraduationRequirement(content, 'degree')).toEqual({
		kind: 'unknown',
		note: 'Confirmar condición.'
	});
	expect(readGraduationRequirement(result, 'degree')).toEqual({
		kind: 'expression',
		expression: { type: 'item', itemId: 'thesis', state: 'completed' }
	});
	expect(result.document.requirements.graduation).toEqual([
		{
			id: 'degree',
			label: 'Título',
			weight: 3,
			expr: { type: 'item', itemId: 'thesis', state: 'completed' }
		},
		content.document.requirements.graduation[1]
	]);
	expect(result.unknownRequirements).toEqual([]);
});

test('keeps graduation missing expressions unknown when no marker exists', () => {
	const content = emptyDraftPlanContent();
	content.document.requirements.graduation = [{ id: 'degree', label: 'Título' }];

	expect(readGraduationRequirement(content, 'degree')).toEqual({
		kind: 'unknown',
		note: 'Todavía no comprobado.'
	});
});
