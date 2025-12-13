import { getStudyPlanSlug, getStudyPlanSlugWithYear, type StudyPlan } from '$lib/study-plan';
import { allStudyPlans } from './data/all-study-plans';

export const studyPlanSlugMap: Record<string, StudyPlan> = Object.fromEntries(
	allStudyPlans.map((plan) => [getStudyPlanSlug(plan), plan])
);

export const studyPlanSlugWithYearMap: Record<string, StudyPlan> = Object.fromEntries(
	allStudyPlans.map((plan) => [getStudyPlanSlugWithYear(plan), plan])
);
