import { expect, test } from 'vitest';
import type { StudyPlanData } from '$lib/study-plan-data';
import { publishedPlanDraft } from './published-plan-draft';
import { publicationCandidate } from './publication-candidate';

test('opens a published structure without changing academic identities or sharing mutable data', () => {
	const plan: StudyPlanData = {
		info: {
			degreeName: 'Carrera',
			degreeSlug: 'c',
			universityName: 'Universidad',
			universitySlug: 'u',
			notes: [{ id: 3, text: 'Las equivalencias se tramitan en Secretaría Académica.' }],
			sources: [{ id: 8, label: 'Resolución', url: 'https://example.edu/plan' }]
		},
		sections: [{ id: 'basic', label: 'Formación básica' }],
		items: [
			{
				id: 'algebra',
				seqId: 5,
				kind: 'course',
				type: 'mandatory',
				name: 'Álgebra',
				placements: [{ sectionId: 'basic', order: 2 }]
			},
			{
				id: 'language',
				seqId: 12,
				kind: 'milestone',
				name: 'Idioma',
				placements: [],
				requirements: { complete: { type: 'item', itemId: 'algebra', state: 'passed' } }
			}
		]
	};
	const draft = publishedPlanDraft(plan, 30);
	expect(draft.document.nextSeqId).toBe(30);
	expect(draft.document.items.map(({ id, seqId }) => ({ id, seqId }))).toEqual([
		{ id: 'algebra', seqId: 5 },
		{ id: 'language', seqId: 12 }
	]);
	expect(draft.document.items[0].placements).toEqual([
		{ id: 'published-5-0', sectionId: 'basic', order: 2 }
	]);
	expect(draft.document.items[1].requirements).toEqual(plan.items[1].requirements);
	expect(draft.unknownRequirements).toEqual([]);
	expect(publishedPlanDraft(plan, 0).document.nextSeqId).toBe(13);
	const candidate = publicationCandidate({
		content: draft,
		identity: { ...plan.info, year: plan.info.year ?? null },
		sources: plan.info.sources ?? []
	});
	expect(candidate).toMatchObject({ ok: true, plan });
	draft.document.sections[0].label = 'Otro nombre';
	expect(plan.sections[0].label).toBe('Formación básica');
});
