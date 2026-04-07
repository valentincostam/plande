import { describe, expect, it } from 'vitest';
import { preparePlan } from './prepare-plan';
import type { StudyPlanData } from './study-plan-data';
import { toComparableStudyPlanData } from './study-plan-native-equivalence';
import { allStudyPlans } from '../routes/[slug]/data/all-study-plans';
import { uncaFcaTupazsa } from '../routes/[slug]/data/unca-fca-tupazsa';
import { utnFrcuIc2023 } from '../routes/[slug]/data/utn-frcu-ic-2023';

describe('study-plan-data native catalog', () => {
	it('prepares every native study plan without validation errors', () => {
		for (const plan of allStudyPlans as unknown as StudyPlanData[]) {
			expect(() => preparePlan(plan)).not.toThrow();
		}
	});

	it('normalization keeps sections and items in a stable comparable order', () => {
		const comparable = toComparableStudyPlanData(uncaFcaTupazsa as unknown as StudyPlanData);

		expect(comparable.sections.map((section) => section.id)).toEqual([
			'year-1',
			'year-2',
			'year-3'
		]);
		expect(comparable.items[0]?.id).toBe('1');
		expect(comparable.items.at(-1)?.id).toBe('22');
	});

	it('cross-year native pilot preserves multiple placements for the same item', () => {
		const project = (utnFrcuIc2023 as unknown as StudyPlanData).items.find(
			(item) => item.id === '43'
		);

		expect(project?.placements).toEqual([
			{ sectionId: 'year-5', term: 'secondSemester' },
			{ sectionId: 'year-6', term: 'firstSemester' }
		]);
	});
});
