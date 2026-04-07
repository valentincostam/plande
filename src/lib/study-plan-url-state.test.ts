import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import {
	decodeCourseItemStates,
	decodeMilestoneStates,
	encodeCourseItemStates,
	encodeMilestoneStates
} from './study-plan-url-state';
import { milestoneStates } from './study-plan-data';

describe('study-plan-url-state', () => {
	it('encodes and decodes course item states', () => {
		const encoded = encodeCourseItemStates([
			courseStates.taken,
			courseStates.passed,
			courseStates.notTaken
		]);

		expect(decodeCourseItemStates(encoded)).toEqual([courseStates.taken, courseStates.passed]);
	});

	it('encodes and decodes milestone states', () => {
		const encoded = encodeMilestoneStates([
			milestoneStates.completed,
			milestoneStates.pending,
			milestoneStates.completed
		]);

		expect(decodeMilestoneStates(encoded)).toEqual([
			milestoneStates.completed,
			milestoneStates.pending,
			milestoneStates.completed
		]);
	});
});
