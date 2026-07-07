import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import {
	comparableCourseStateToItemState,
	decodeItemStates,
	encodeItemStates,
	itemStateToComparableCourseState
} from './study-plan-url-state';
import { milestoneStates, type PlanItem } from './study-plan-data';

const course = (id: string, seqId: number): PlanItem => ({
	id,
	seqId,
	kind: 'course',
	name: id,
	type: 'mandatory',
	placements: []
});

const milestone = (id: string, seqId: number): PlanItem => ({
	id,
	seqId,
	kind: 'milestone',
	name: id,
	placements: []
});

describe('study-plan-url-state', () => {
	it('encodes courses and milestones as one stream ordered by seqId', () => {
		const encoded = encodeItemStates([
			{ def: milestone('m', 2), state: milestoneStates.completed },
			{ def: course('b', 3), state: courseStates.notTaken },
			{ def: course('a', 1), state: courseStates.taken }
		]);

		// seqId order: a(taken='r'), m(completed->passed='a'), b(notTaken trimmed)
		expect(decodeItemStates(encoded)).toEqual([courseStates.taken, courseStates.passed]);
	});

	it('round-trips through the comparable course-state projection', () => {
		const m = milestone('m', 1);
		const c = course('c', 2);

		expect(
			comparableCourseStateToItemState(
				m,
				itemStateToComparableCourseState(m, milestoneStates.completed)
			)
		).toBe(milestoneStates.completed);
		expect(
			comparableCourseStateToItemState(
				m,
				itemStateToComparableCourseState(m, milestoneStates.pending)
			)
		).toBe(milestoneStates.pending);
		expect(
			comparableCourseStateToItemState(c, itemStateToComparableCourseState(c, courseStates.passed))
		).toBe(courseStates.passed);
	});

	it('maps legacy course letters onto milestone states when decoding', () => {
		const m = milestone('m', 1);

		// A URL created when the item was still a course may carry any state
		expect(comparableCourseStateToItemState(m, courseStates.passed)).toBe(
			milestoneStates.completed
		);
		expect(comparableCourseStateToItemState(m, courseStates.taken)).toBe(milestoneStates.pending);
		expect(comparableCourseStateToItemState(m, courseStates.inProgress)).toBe(
			milestoneStates.pending
		);
		expect(comparableCourseStateToItemState(m, undefined)).toBe(milestoneStates.pending);
	});
});
