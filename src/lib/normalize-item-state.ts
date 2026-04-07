import { courseStates, type CourseState } from './course-state';
import type { ItemState, PlanItem } from './study-plan-data';
import { milestoneStates } from './study-plan-data';

export type ItemFacts = {
	isEnabled?: boolean;
	canPass?: boolean;
	canComplete?: boolean;
};

const normalizeCourseState = (
	current: CourseState,
	{ isEnabled = true, canPass = true }: ItemFacts
): CourseState => {
	if (!isEnabled && current !== courseStates.notTaken) {
		return courseStates.notTaken;
	}

	if (!canPass && current === courseStates.passed) {
		return courseStates.notTaken;
	}

	return current;
};

const normalizeMilestoneState = (
	current: (typeof milestoneStates)[keyof typeof milestoneStates],
	{ canComplete = true }: ItemFacts
) => {
	if (!canComplete && current === milestoneStates.completed) {
		return milestoneStates.pending;
	}

	return current;
};

export const normalizeItemState = (
	item: PlanItem,
	current: ItemState,
	facts: ItemFacts
): ItemState => {
	if (item.kind === 'course') {
		return normalizeCourseState(current as CourseState, facts);
	}

	return normalizeMilestoneState(
		current as (typeof milestoneStates)[keyof typeof milestoneStates],
		facts
	);
};
