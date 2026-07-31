import type { StudyPlanCatalogEntry } from './study-plan';
import {
	getStudyPlanDataSlug,
	getStudyPlanDataSlugWithYear,
	type StudyPlanData
} from './study-plan-data';

const getDurationYears = (plan: StudyPlanData) =>
	plan.sections.reduce((max, section) => {
		const match = section.year ?? Number(/^year-(\d+)$/.exec(section.id)?.[1]);
		return Number.isFinite(match) ? Math.max(max, match) : max;
	}, 0);

export const getDurationYearsFromPlanData = getDurationYears;

export const studyPlanDataToCatalogEntry = (plan: StudyPlanData): StudyPlanCatalogEntry => ({
	degreeName: plan.info.degreeName,
	degreeSlug: plan.info.degreeSlug,
	universityName: plan.info.universityName,
	universitySlug: plan.info.universitySlug,
	collegeName: plan.info.collegeName,
	collegeSlug: plan.info.collegeSlug,
	durationYears: getDurationYears(plan),
	year: plan.info.year,
	sources: plan.info.sources ?? [],
	notes: plan.info.notes
});

export const buildStudyPlanCatalogMaps = <T extends StudyPlanData>(plans: T[]) => {
	const slugWithYearMap: Record<string, T> = Object.fromEntries(
		plans.map((plan) => [getStudyPlanDataSlugWithYear(plan), plan])
	);

	const slugMap: Record<string, T> = plans
		.toSorted((a, b) => (b.info.year ?? 0) - (a.info.year ?? 0))
		.reduce(
			(acc, plan) => {
				const slug = getStudyPlanDataSlug(plan);
				if (!(slug in acc)) {
					acc[slug] = plan;
				}
				return acc;
			},
			{} as Record<string, T>
		);

	return { slugMap, slugWithYearMap };
};
