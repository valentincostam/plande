import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { normalizeItemState } from './normalize-item-state';
import { milestoneStates, type PlanItem } from './study-plan-v5';

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
			normalizeItemState(courseItem, courseStates.taken, { isEnabled: false, canPass: true })
		).toBe(courseStates.notTaken);
	});

	it('resets a passed course to notTaken when completion requirements fail', () => {
		expect(
			normalizeItemState(courseItem, courseStates.passed, { isEnabled: true, canPass: false })
		).toBe(courseStates.notTaken);
	});

	it('keeps a valid course state unchanged', () => {
		expect(
			normalizeItemState(courseItem, courseStates.taken, { isEnabled: true, canPass: true })
		).toBe(courseStates.taken);
	});

	it('resets a completed milestone to pending when completion requirements fail', () => {
		expect(
			normalizeItemState(milestoneItem, milestoneStates.completed, { canComplete: false })
		).toBe(milestoneStates.pending);
	});
});
