import { describe, it, expect } from 'vitest';
import { calculateDegreeProgress, type DegreeProgressConfig } from './degree-progress';
import { courseStates, type CourseState } from './course-state';
import { courseTypes, type CourseType } from './course-type';
import type { Course } from './course.svelte';

// Helper to create minimal mock courses for testing
const createMockCourse = (
	state: CourseState,
	type: CourseType = courseTypes.mandatory,
	hours?: number
): Course =>
	({
		state,
		type,
		hours,
		attributes: []
	}) as unknown as Course;

describe('calculateDegreeProgress', () => {
	describe('mandatory-only', () => {
		const config: DegreeProgressConfig = { type: 'mandatory-only' };

		it('returns 0% when no courses passed', () => {
			const courses = [
				createMockCourse(courseStates.notTaken),
				createMockCourse(courseStates.inProgress),
				createMockCourse(courseStates.taken)
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(0);
			expect(result.totalUnits).toBe(3);
			expect(result.percentage).toBe(0);
		});

		it('returns 100% when all courses passed', () => {
			const courses = [
				createMockCourse(courseStates.passed),
				createMockCourse(courseStates.passed)
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(2);
			expect(result.totalUnits).toBe(2);
			expect(result.percentage).toBe(100);
		});

		it('ignores elective courses', () => {
			const courses = [
				createMockCourse(courseStates.passed), // mandatory
				createMockCourse(courseStates.passed, courseTypes.elective), // elective - ignored
				createMockCourse(courseStates.notTaken) // mandatory
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(1);
			expect(result.totalUnits).toBe(2);
			expect(result.percentage).toBe(50);
		});

		it('ignores optative courses', () => {
			const courses = [
				createMockCourse(courseStates.passed),
				createMockCourse(courseStates.passed, courseTypes.optative)
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(1);
			expect(result.totalUnits).toBe(1);
			expect(result.percentage).toBe(100);
		});
	});

	describe('mandatory-plus-elective-count', () => {
		const config: DegreeProgressConfig = {
			type: 'mandatory-plus-elective-count',
			requiredElectiveCount: 3
		};

		it('counts up to required electives', () => {
			const courses = [
				createMockCourse(courseStates.passed),
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.notTaken, courseTypes.elective)
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(3); // 1 mandatory + 2 electives
			expect(result.totalUnits).toBe(4); // 1 mandatory + 3 required electives
		});

		it('caps electives at required count', () => {
			const courses = [
				createMockCourse(courseStates.passed),
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.passed, courseTypes.elective) // 4th - not counted
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.completedUnits).toBe(4); // 1 mandatory + 3 electives (capped)
			expect(result.totalUnits).toBe(4);
			expect(result.percentage).toBe(100);
		});
	});

	describe('mandatory-plus-elective-hours', () => {
		const config: DegreeProgressConfig = {
			type: 'mandatory-plus-elective-hours',
			requiredElectiveHours: 40
		};

		it('weights mandatory and elective progress', () => {
			const courses = [
				createMockCourse(courseStates.passed, courseTypes.mandatory, 10), // mandatory
				createMockCourse(courseStates.passed, courseTypes.mandatory, 10), // mandatory
				createMockCourse(courseStates.notTaken, courseTypes.mandatory, 10), // mandatory
				createMockCourse(courseStates.notTaken, courseTypes.mandatory, 10), // mandatory
				createMockCourse(courseStates.passed, courseTypes.elective, 20) // elective 20hs
			];

			const result = calculateDegreeProgress(courses, config);

			// 4 mandatory + 10 elective units (40hs / 4) = 14 total
			expect(result.totalUnits).toBe(14);
			// 50% mandatory progress * 4/14 + 50% elective progress * 10/14
			expect(result.percentage).toBeGreaterThan(0);
			expect(result.percentage).toBeLessThan(100);
		});

		it('returns 100% when all mandatory passed and elective hours met', () => {
			const courses = [
				createMockCourse(courseStates.passed, courseTypes.mandatory, 10),
				createMockCourse(courseStates.passed, courseTypes.mandatory, 10),
				createMockCourse(courseStates.passed, courseTypes.elective, 40)
			];

			const result = calculateDegreeProgress(courses, config);

			expect(result.percentage).toBe(100);
		});

		it('caps elective hours at required amount', () => {
			const courses = [
				createMockCourse(courseStates.passed, courseTypes.mandatory, 10),
				createMockCourse(courseStates.passed, courseTypes.elective, 100) // more than needed
			];

			const result = calculateDegreeProgress(courses, config);

			// Should cap at 40 hours of electives
			expect(result.percentage).toBe(100);
		});
	});

	describe('edge cases', () => {
		it('handles empty course array', () => {
			const result = calculateDegreeProgress([], { type: 'mandatory-only' });

			expect(result.completedUnits).toBe(0);
			expect(result.totalUnits).toBe(0);
			expect(result.percentage).toBe(0);
		});

		it('handles all elective courses with mandatory-only config', () => {
			const courses = [
				createMockCourse(courseStates.passed, courseTypes.elective),
				createMockCourse(courseStates.passed, courseTypes.optative)
			];

			const result = calculateDegreeProgress(courses, { type: 'mandatory-only' });

			expect(result.totalUnits).toBe(0);
			expect(result.percentage).toBe(0);
		});
	});
});
