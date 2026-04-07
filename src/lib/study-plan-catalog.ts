import type { DegreeProgressConfig } from './degree-progress';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import { createCompatCoursesFromNativePlanSession } from './course-plan-compat.svelte';
import type { GraduationRequirement } from './study-plan-data';
import type { RawCourseRequirement, RawCourse } from './raw-course';
import type { StudyPlan, StudyPlanCatalogEntry } from './study-plan';
import {
	getStudyPlanDataSlug,
	getStudyPlanDataSlugWithYear,
	type StudyPlanData
} from './study-plan-data';

const getDurationYears = (plan: StudyPlanData) =>
	plan.sections.reduce((max, section) => {
		const match = /^year-(\d+)$/.exec(section.id);
		return match ? Math.max(max, Number(match[1])) : max;
	}, 0);

export const getDurationYearsFromPlanData = getDurationYears;

const inferProgressConfig = (
	graduation: GraduationRequirement[] | undefined
): DegreeProgressConfig => {
	const sumRequirement = graduation?.find((requirement) => requirement.type === 'sum');
	const countRequirement = graduation?.find((requirement) => requirement.type === 'count');

	if (sumRequirement?.type === 'sum') {
		return {
			type: 'mandatory-plus-elective-hours',
			requiredElectiveHours: sumRequirement.min
		};
	}

	if (countRequirement?.type === 'count') {
		return {
			type: 'mandatory-plus-elective-count',
			requiredElectiveCount: countRequirement.min
		};
	}

	return { type: 'mandatory-only' };
};

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
	notes: plan.info.notes,
	progress: inferProgressConfig(plan.requirements?.graduation)
});

export const studyPlanDataToStudyPlan = (plan: StudyPlanData): StudyPlan => {
	const session = new PlanSession(preparePlan(plan));
	const compatCourses = createCompatCoursesFromNativePlanSession(plan, session);
	let nextRequirementId = 1;

	const courses: RawCourse[] = compatCourses.map((course) => {
		const requirements: RawCourseRequirement[] = [
			...course.requirementsForEnrollment,
			...course.requirementsForCompletion
		].map((requirement) => ({
			id: nextRequirementId++,
			requiredCourseId: requirement.requiredCourse.id,
			requiredState: requirement.requiredState,
			requiredFor: requirement.requiredFor
		}));

		return {
			id: course.id,
			code: course.code,
			name: course.name,
			year: course.year,
			hours: course.hours,
			term: course.term,
			requirements,
			type: course.type,
			attributes: course.attributes,
			crossYear: course.crossYear
		};
	});

	return {
		...studyPlanDataToCatalogEntry(plan),
		courses
	};
};

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
