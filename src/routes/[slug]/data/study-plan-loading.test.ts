import { describe, expect, it } from 'vitest';
import { getStudyPlanDataSlugWithYear } from '$lib/study-plan-data';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import { allStudyPlans } from './all-study-plans';
import { studyPlanCatalog } from './study-plan-catalog';
import { getCanonicalStudyPlanSlug, loadStudyPlan, studyPlanSlugs } from './study-plan-loaders';

describe('lightweight study plan loading', () => {
	it('keeps one lightweight entry per plan', () => {
		expect(studyPlanCatalog).toHaveLength(47);
		expect(studyPlanSlugs).toHaveLength(47);
		expect(studyPlanCatalog.every((entry) => !('items' in entry))).toBe(true);
		expect(studyPlanCatalog.map(({ sources: _, notes: __, ...entry }) => entry)).toEqual(
			allStudyPlans
				.map(studyPlanDataToCatalogEntry)
				.sort((a, b) =>
					getStudyPlanDataSlugWithYear({ info: a, sections: [], items: [] }).localeCompare(
						getStudyPlanDataSlugWithYear({ info: b, sections: [], items: [] })
					)
				)
				.map(({ sources: _, notes: __, ...entry }) => entry)
		);
	});

	it('loads only the requested canonical plan module', async () => {
		const plan = await loadStudyPlan('uns-dcs-le-2017');

		expect(plan && getStudyPlanDataSlugWithYear(plan)).toBe('uns-dcs-le-2017');
	});

	it('resolves short slugs to the newest plan', () => {
		expect(getCanonicalStudyPlanSlug('utn-frba-isi')).toBe('utn-frba-isi-2023');
	});

	it('keeps enough UNLP optative total hours to satisfy its 128-hour requirement', async () => {
		const plan = await loadStudyPlan('unlp-fi-iem-2018');
		const optatives = plan?.items.filter(
			(item) => item.kind === 'course' && item.tags?.includes('optativas')
		);

		expect(optatives).toHaveLength(22);
		expect(
			optatives?.every((item) => item.kind === 'course' && item.totalHours !== undefined)
		).toBe(true);
		expect(
			optatives?.reduce(
				(total, item) => total + (item.kind === 'course' ? (item.totalHours ?? 0) : 0),
				0
			)
		).toBe(1728);
	});
});
