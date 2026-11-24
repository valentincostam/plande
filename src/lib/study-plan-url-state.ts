import { courseStates, decodeCoursesStates, encodeCoursesStates } from './course-state';
import type { CourseState } from './course-state';
import { milestoneStates, type ItemState, type PlanItem } from './study-plan-data';

export const sortItemsBySeqId = <T extends Pick<PlanItem, 'seqId'>>(items: T[]) =>
	[...items].sort((a, b) => a.seqId - b.seqId);

export const progressItemPositions = (
	items: readonly Pick<PlanItem, 'id'>[],
	order: readonly string[] = items.map((item) => item.id)
) => {
	const positions = new Map(order.map((id, index) => [id, index]));
	if (positions.size !== order.length || items.some((item) => !positions.has(item.id)))
		throw new Error('Progress positions must uniquely cover every current item.');
	return positions;
};

// State is serialized as ONE letter stream covering ALL items (courses and
// milestones) ordered by seqId. Milestones project onto the course letters
// (completed <-> passed) so URLs created when an item was still a course keep
// decoding at the same position after it becomes a milestone.
export const itemStateToComparableCourseState = (item: PlanItem, state: ItemState): CourseState => {
	if (item.kind === 'course') {
		return state as CourseState;
	}

	return state === milestoneStates.completed ? courseStates.passed : courseStates.notTaken;
};

export const comparableCourseStateToItemState = (
	item: PlanItem,
	state: CourseState | undefined
): ItemState => {
	if (item.kind === 'course') {
		return state ?? courseStates.notTaken;
	}

	return state === courseStates.passed ? milestoneStates.completed : milestoneStates.pending;
};

export const encodeItemStates = (items: { def: PlanItem; state: ItemState }[]) => {
	const ordered = [...items].sort((a, b) => a.def.seqId - b.def.seqId);
	return encodeCoursesStates(
		ordered.map(({ def, state }) => itemStateToComparableCourseState(def, state))
	);
};

export const decodeItemStates = (encoded: string) => decodeCoursesStates(encoded);
