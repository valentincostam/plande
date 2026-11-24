import { expect, test } from 'vitest';
import type { ItemState } from '$lib/study-plan-data';
import { emptyDraftPlanContent } from './draft-plan-content';
import { previewGraduation } from './graduation-preview';

const completeDraft = () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push(
		{ id: 'basic', label: 'Básica' },
		{ id: 'advanced', label: 'Avanzada' }
	);
	content.document.items.push(
		{
			id: 'algebra',
			seqId: 0,
			kind: 'course',
			name: 'Álgebra',
			type: 'mandatory',
			credits: 2,
			placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
		},
		{
			id: 'analysis',
			seqId: 1,
			kind: 'course',
			name: 'Análisis',
			type: 'mandatory',
			credits: 4,
			placements: [
				{ id: 'analysis-basic', sectionId: 'basic' },
				{ id: 'analysis-advanced', sectionId: 'advanced' }
			]
		},
		{ id: 'thesis', seqId: 2, kind: 'milestone', name: 'Tesis', placements: [] }
	);
	content.document.requirements.graduation = [
		{
			id: 'credits',
			label: 'Créditos base',
			weight: 2,
			expr: {
				type: 'sum',
				selector: { type: 'sections', sectionIds: ['basic', 'advanced'] },
				metric: 'credits',
				min: 6,
				state: 'passed'
			}
		},
		{
			id: 'thesis',
			label: 'Tesis',
			weight: 3,
			expr: {
				type: 'count',
				selector: { type: 'items', itemIds: ['thesis'] },
				min: 1,
				state: 'completed'
			}
		}
	];
	return content;
};

test('previews native weighted sums without counting a multi-placement course twice', () => {
	const content = completeDraft();
	const states: Record<string, ItemState> = {
		algebra: 'passed',
		analysis: 'passed',
		thesis: 'completed'
	};
	const contentBefore = structuredClone(content);
	const statesBefore = structuredClone(states);

	const result = previewGraduation(content, states);

	expect(result).toEqual({
		kind: 'ready',
		progress: {
			completedUnits: 5,
			totalUnits: 5,
			percentage: 100,
			blocks: [
				{
					id: 'credits',
					label: 'Créditos base',
					completedUnits: 6,
					totalUnits: 6,
					weight: 2,
					weightedCompletedUnits: 2,
					weightedTotalUnits: 2,
					progress: 1
				},
				{
					id: 'thesis',
					label: 'Tesis',
					completedUnits: 1,
					totalUnits: 1,
					weight: 3,
					weightedCompletedUnits: 3,
					weightedTotalUnits: 3,
					progress: 1
				}
			]
		}
	});
	expect(content).toEqual(contentBefore);
	expect(states).toEqual(statesBefore);
});

test.each(['incomplete', 'unknown', 'invalid'] as const)(
	'does not preview %s graduation content',
	(kind) => {
		const content = completeDraft();
		if (kind === 'incomplete') delete content.document.requirements.graduation?.[0]?.expr;
		if (kind === 'unknown')
			content.unknownRequirements.push({
				scope: 'graduation:credits',
				note: 'Confirmar créditos.'
			});
		if (kind === 'invalid') {
			const expression = content.document.requirements.graduation?.[0]?.expr;
			if (expression?.type === 'sum') expression.min = 0;
		}

		expect(previewGraduation(content, {})).toMatchObject({ kind: 'unavailable' });
	}
);
