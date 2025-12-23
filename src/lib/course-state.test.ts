import { describe, it, expect } from 'vitest';
import {
	courseStates,
	isCourseStateGreaterOrEqual,
	encodeCoursesStates,
	decodeCoursesStates
} from './course-state';

describe('isCourseStateGreaterOrEqual', () => {
	it('passed >= all states', () => {
		expect(isCourseStateGreaterOrEqual(courseStates.passed, courseStates.notTaken)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.passed, courseStates.inProgress)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.passed, courseStates.taken)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.passed, courseStates.passed)).toBe(true);
	});

	it('notTaken >= only notTaken', () => {
		expect(isCourseStateGreaterOrEqual(courseStates.notTaken, courseStates.notTaken)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.notTaken, courseStates.inProgress)).toBe(false);
		expect(isCourseStateGreaterOrEqual(courseStates.notTaken, courseStates.taken)).toBe(false);
		expect(isCourseStateGreaterOrEqual(courseStates.notTaken, courseStates.passed)).toBe(false);
	});

	it('taken >= notTaken, inProgress, taken', () => {
		expect(isCourseStateGreaterOrEqual(courseStates.taken, courseStates.notTaken)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.taken, courseStates.inProgress)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.taken, courseStates.taken)).toBe(true);
		expect(isCourseStateGreaterOrEqual(courseStates.taken, courseStates.passed)).toBe(false);
	});
});

describe('encodeCoursesStates', () => {
	it('encodes empty array as empty string', () => {
		expect(encodeCoursesStates([])).toBe('');
	});

	it('encodes single state', () => {
		expect(encodeCoursesStates([courseStates.passed])).toBe('a');
		expect(encodeCoursesStates([courseStates.taken])).toBe('r');
		expect(encodeCoursesStates([courseStates.inProgress])).toBe('e');
	});

	it('trims trailing notTaken states', () => {
		expect(encodeCoursesStates([courseStates.notTaken])).toBe('');
		expect(encodeCoursesStates([courseStates.passed, courseStates.notTaken])).toBe('a');
		expect(
			encodeCoursesStates([courseStates.passed, courseStates.notTaken, courseStates.notTaken])
		).toBe('a');
	});

	it('compresses repeated states', () => {
		expect(
			encodeCoursesStates([courseStates.passed, courseStates.passed, courseStates.passed])
		).toBe('a3');
		expect(
			encodeCoursesStates([
				courseStates.taken,
				courseStates.taken,
				courseStates.passed,
				courseStates.passed
			])
		).toBe('r2a2');
	});

	it('handles mixed states', () => {
		expect(
			encodeCoursesStates([courseStates.notTaken, courseStates.taken, courseStates.passed])
		).toBe('nra');
	});
});

describe('decodeCoursesStates', () => {
	it('decodes empty string as empty array', () => {
		expect(decodeCoursesStates('')).toEqual([]);
	});

	it('decodes single state', () => {
		expect(decodeCoursesStates('a')).toEqual([courseStates.passed]);
		expect(decodeCoursesStates('r')).toEqual([courseStates.taken]);
		expect(decodeCoursesStates('e')).toEqual([courseStates.inProgress]);
		expect(decodeCoursesStates('n')).toEqual([courseStates.notTaken]);
	});

	it('decompresses repeated states', () => {
		expect(decodeCoursesStates('a3')).toEqual([
			courseStates.passed,
			courseStates.passed,
			courseStates.passed
		]);
		expect(decodeCoursesStates('r2a2')).toEqual([
			courseStates.taken,
			courseStates.taken,
			courseStates.passed,
			courseStates.passed
		]);
	});

	it('handles uppercase input', () => {
		expect(decodeCoursesStates('A')).toEqual([courseStates.passed]);
		expect(decodeCoursesStates('NRA')).toEqual([
			courseStates.notTaken,
			courseStates.taken,
			courseStates.passed
		]);
	});
});

describe('encode/decode roundtrip', () => {
	it('decode(encode(states)) === states (without trailing notTaken)', () => {
		const states = [
			courseStates.passed,
			courseStates.taken,
			courseStates.inProgress,
			courseStates.notTaken,
			courseStates.passed
		];
		expect(decodeCoursesStates(encodeCoursesStates(states))).toEqual(states);
	});

	it('handles complex state arrays', () => {
		const states = [
			courseStates.notTaken,
			courseStates.notTaken,
			courseStates.taken,
			courseStates.taken,
			courseStates.taken,
			courseStates.passed,
			courseStates.passed
		];
		expect(decodeCoursesStates(encodeCoursesStates(states))).toEqual(states);
	});
});
