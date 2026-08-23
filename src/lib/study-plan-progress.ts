import { courseStates, decodeCoursesStates, type CourseState } from './course-state';
import { calculateDegreeProgress } from './degree-progress';
import type { StudyPlan } from './study-plan';

export type StudyPlanProgressSummary = {
	percentage: number;
	passed: number;
	inProgress: number;
	graded: number;
	distribution: Record<CourseState, number>;
};

export function summarizeStudyPlanProgress(
	studyPlan: StudyPlan,
	encodedStates: string,
	grades: (number | undefined)[]
): StudyPlanProgressSummary {
	const states = decodeCoursesStates(encodedStates);
	const courses = studyPlan.courses.map((course, index) => ({
		state: (states[index] ?? courseStates.notTaken) as CourseState,
		type: course.type,
		hours: course.hours
	}));
	const progress = calculateDegreeProgress(courses, studyPlan.progress);
	const distribution = {
		[courseStates.notTaken]: courses.filter((course) => course.state === courseStates.notTaken)
			.length,
		[courseStates.inProgress]: courses.filter((course) => course.state === courseStates.inProgress)
			.length,
		[courseStates.taken]: courses.filter((course) => course.state === courseStates.taken).length,
		[courseStates.passed]: courses.filter((course) => course.state === courseStates.passed).length
	};

	return {
		percentage: Math.round(progress.percentage),
		passed: distribution[courseStates.passed],
		inProgress: distribution[courseStates.inProgress],
		graded: grades.filter((grade) => grade !== undefined).length,
		distribution
	};
}
