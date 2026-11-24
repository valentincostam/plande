import { courseStates, type CourseState } from './course-state';
import { preparePlan } from './prepare-plan';
import { evaluateGraduation, type RequirementContext } from './requirement-evaluator';
import {
	isCoursePlanItem,
	milestoneStates,
	type ItemState,
	type StudyPlanData
} from './study-plan-data';
import { comparableCourseStateToItemState, progressItemPositions } from './study-plan-url-state';

export type StudyPlanSnapshot = {
	graduationPercentage: number;
	stateDistribution: Record<CourseState, number>;
	passedCourses: number;
	totalCourses: number;
	passedYears: number;
	totalYears: number;
	average?: number;
};

export const calculateStudyPlanSnapshot = (
	plan: StudyPlanData,
	initialStates: CourseState[],
	grades: (number | undefined)[],
	progressItemIds?: readonly string[]
): StudyPlanSnapshot => {
	const prepared = preparePlan(plan);
	const positions = progressItemPositions(prepared.orderedItems, progressItemIds);
	const states = new Map<string, ItemState>(
		prepared.orderedItems.map((item) => [
			item.id,
			comparableCourseStateToItemState(item, initialStates[positions.get(item.id)!])
		])
	);
	const contextItems = (ids: string[]) =>
		ids.flatMap((id) => {
			const item = prepared.itemsById.get(id);
			const state = states.get(id);
			return item && state ? [{ item, state }] : [];
		});
	const context: RequirementContext = {
		getItem: (id) => contextItems([id])[0],
		getAllItems: () => contextItems(prepared.orderedItems.map((item) => item.id)),
		getItemsByTag: (tag) => contextItems(prepared.itemIdsByTag.get(tag) ?? []),
		getItemsBySection: (sectionId) => contextItems(prepared.itemIdsBySection.get(sectionId) ?? [])
	};
	const courses = prepared.orderedItems.flatMap((item) =>
		isCoursePlanItem(item)
			? [
					{
						item,
						state: states.get(item.id) as CourseState,
						grade: grades[positions.get(item.id)!]
					}
				]
			: []
	);
	const stateDistribution = {
		[courseStates.notTaken]: courses.filter(({ state }) => state === courseStates.notTaken).length,
		[courseStates.inProgress]: courses.filter(({ state }) => state === courseStates.inProgress)
			.length,
		[courseStates.taken]: courses.filter(({ state }) => state === courseStates.taken).length,
		[courseStates.passed]: courses.filter(({ state }) => state === courseStates.passed).length
	};
	const yearSections = prepared.plan.sections.filter((section) => section.year !== undefined);
	const passedYears = yearSections.filter((section) => {
		const ids = prepared.itemIdsBySection.get(section.id) ?? [];
		return (
			ids.length > 0 &&
			ids.every((id) => {
				const item = prepared.itemsById.get(id)!;
				return isCoursePlanItem(item)
					? states.get(id) === courseStates.passed
					: states.get(id) === milestoneStates.completed;
			})
		);
	}).length;
	const coursesWithGrades = courses.filter(
		({ state, grade }) => state === courseStates.passed && grade !== undefined
	);
	const graduation = evaluateGraduation(prepared.plan.requirements?.graduation ?? [], context);

	return {
		graduationPercentage: graduation.percentage,
		stateDistribution,
		passedCourses: stateDistribution.passed,
		totalCourses: courses.length,
		passedYears,
		totalYears: yearSections.length,
		average:
			coursesWithGrades.length === 0
				? undefined
				: coursesWithGrades.reduce((total, { grade }) => total + grade!, 0) /
					coursesWithGrades.length
	};
};
