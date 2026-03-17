import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { createCourses } from './course.svelte';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import type { RawCourse, RequiredFor } from './raw-course';
import { requiredFor } from './raw-course';
import type { StudyPlan } from './study-plan';
import {
	buildLegacyCompatibilitySnapshot,
	buildV5CompatibilitySnapshot
} from './study-plan-v5-compatibility-snapshots';
import { compareCompatibilitySnapshots } from './study-plan-v5-compatibility';
import {
	adaptLegacyStudyPlanToV5,
	createLegacyCompatiblePlanSession
} from './study-plan-v5-legacy-adapter';

const createRequirement = (
	requiredCourseId: number,
	requiredState: (typeof courseStates)[keyof typeof courseStates],
	requiredForValue: RequiredFor,
	id: number
) => ({
	id,
	requiredCourseId,
	requiredState,
	requiredFor: requiredForValue
});

const courses: RawCourse[] = [
	{
		id: 1,
		code: '1',
		name: 'Álgebra',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Física I',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 1,
		type: courseTypes.mandatory,
		requirements: [createRequirement(1, courseStates.taken, requiredFor.enroll, 1)]
	},
	{
		id: 3,
		code: '3',
		name: 'Electiva A',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.elective,
		requirements: []
	}
];

const studyPlan: StudyPlan = {
	courses,
	degreeName: 'Plan Test',
	degreeSlug: 'PT',
	universityName: 'Universidad Test',
	universitySlug: 'UT',
	durationYears: 2,
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 1
	},
	sources: [{ id: 1, label: 'Test', url: 'https://example.com' }]
};

describe('study-plan-v5 legacy adapter', () => {
	it('adapts legacy plans preserving seqIds and requirements', () => {
		const adapted = adaptLegacyStudyPlanToV5(studyPlan);

		expect(adapted.items.map((item) => item.seqId)).toEqual([1, 2, 3]);
		expect(adapted.items[1]?.requirements?.enroll).toEqual({
			type: 'item',
			itemId: '1',
			state: 'taken'
		});
		expect(adapted.requirements?.graduation).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ type: 'allMandatory' }),
				expect.objectContaining({ type: 'count', min: 1 })
			])
		);
	});

	it('matches legacy observable behavior for supported cases', () => {
		const legacyCourses = createCourses(
			studyPlan.courses,
			[courseStates.passed, courseStates.notTaken, courseStates.passed],
			() => true,
			[]
		);

		const legacySnapshot = buildLegacyCompatibilitySnapshot(
			'plan-test',
			legacyCourses,
			studyPlan.progress
		);
		const nextSession = createLegacyCompatiblePlanSession(studyPlan, {
			initialCourseStates: [courseStates.passed, courseStates.notTaken, courseStates.passed],
			strictMode: true
		});
		const nextSnapshot = buildV5CompatibilitySnapshot('plan-test', nextSession);

		expect(compareCompatibilitySnapshots(legacySnapshot, nextSnapshot)).toEqual([]);
	});
});
