import { getStudyPlanSlug, getStudyPlanSlugWithYear, type StudyPlan } from '$lib/study-plan';
import { allStudyPlans } from './data/all-study-plans';

// Map slug with year to study plan (primary)
export const studyPlanSlugWithYearMap: Record<string, StudyPlan> = Object.fromEntries(
	allStudyPlans.map((plan) => [getStudyPlanSlugWithYear(plan), plan])
);

// Map slug without year to most recent study plan (for backwards compatibility)
// When multiple plans share the same base slug, use the one with highest year
export const studyPlanSlugMap: Record<string, StudyPlan> = allStudyPlans
	.toSorted((a, b) => (b.year ?? 0) - (a.year ?? 0))
	.reduce(
		(acc, plan) => {
			const slug = getStudyPlanSlug(plan);
			if (!(slug in acc)) {
				acc[slug] = plan;
			}
			return acc;
		},
		{} as Record<string, StudyPlan>
	);
