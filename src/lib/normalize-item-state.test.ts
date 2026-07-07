import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { normalizeItemState } from './normalize-item-state';
import { milestoneStates, type PlanItem } from './study-plan-data';

const courseItem: PlanItem = {
	id: 'algebra',
	seqId: 1,
	kind: 'course',
	name: 'Algebra',
	type: 'mandatory',
	placements: []
};

const milestoneItem: PlanItem = {
	id: 'ingles-e',
	seqId: 99,
	kind: 'milestone',
	name: 'Ingles E',
	placements: []
};

describe('normalizeItemState', () => {
	it('resets an invalid course to notTaken when enroll requirements fail', () => {
		expect(
			normalizeItemState(courseItem, courseStates.taken, { isEnabled: false, canComplete: true })
		).toBe(courseStates.notTaken);
	});

	it('resets a passed course to notTaken when completion requirements fail', () => {
		expect(
			normalizeItemState(courseItem, courseStates.passed, { isEnabled: true, canComplete: false })
		).toBe(courseStates.notTaken);
	});

	it('keeps a non-passed course even when completion requirements fail', () => {
		expect(
			normalizeItemState(courseItem, courseStates.taken, { isEnabled: true, canComplete: false })
		).toBe(courseStates.taken);
	});

	it('keeps a valid course state unchanged', () => {
		expect(
			normalizeItemState(courseItem, courseStates.taken, { isEnabled: true, canComplete: true })
		).toBe(courseStates.taken);
	});

	it('resets a completed milestone to pending when completion requirements fail', () => {
		expect(
			normalizeItemState(milestoneItem, milestoneStates.completed, { canComplete: false })
		).toBe(milestoneStates.pending);
	});
});
