import { courseStates, type CourseState } from './course-state';
import type { Course } from './course.svelte';

type YearProperties = {
	year: number;
	courses: Course[];
	state: CourseState;
};

export class Year {
	year: number;
	courses: Course[];
	state: CourseState;
	isEnabled = $derived.by(() => this.courses.every((course) => course.isEnabled));
	canPass = $derived.by(() => this.courses.every((course) => course.canPass));

	constructor({ year, courses }: YearProperties) {
		this.year = year;
		this.courses = courses;
		this.state = $derived.by(() => {
			if (this.courses.some((course) => course.state === courseStates.inProgress)) {
				return courseStates.inProgress;
			}

			if (this.courses.some((course) => course.state === courseStates.notTaken)) {
				return courseStates.notTaken;
			}

			if (this.courses.some((course) => course.state === courseStates.taken)) {
				return courseStates.taken;
			}

			if (this.courses.every((course) => course.state === courseStates.taken)) {
				return courseStates.taken;
			}

			if (this.courses.every((course) => course.state === courseStates.passed)) {
				return courseStates.passed;
			}

			return courseStates.notTaken;
		});
	}
}

export const getOrdinalSuperscript = (number: number) => {
	if (number === 1) return 'er';
	if (number === 2) return 'do';
	if (number === 3) return 'er';
	return 'to';
};

export const getOrdinalPrefix = (number: number) => {
	return `${number}${getOrdinalSuperscript(number)}`;
};

export const getOrdinalWord = (number: number) => {
	const ordinals: Record<number, string> = {
		1: 'primer',
		2: 'segundo',
		3: 'tercer',
		4: 'cuarto',
		5: 'quinto',
		6: 'sexto',
		7: 'séptimo',
		8: 'octavo',
		9: 'noveno',
		10: 'décimo'
	};
	return ordinals[number] ?? `${number}°`;
};

// Helper function to get the effective term for a course in a specific year
export const getCourseEffectiveTerm = (course: Course, displayYear?: number) => {
	// If this course has crossYear property and we're showing it in the ending year
	if (course.crossYear && displayYear && course.crossYear.spansToYear === displayYear) {
		return course.crossYear.endsInTerm;
	}
	// Otherwise use the original term
	return course.term;
};

export const createYears = (years: number, courses: Course[]) => {
	return Array.from({ length: years }, (_, index) => {
		const currentYear = index + 1;

		// Filter courses for this year
		const yearCourses = courses.filter((course) => {
			// Regular courses that belong to this year
			if (course.year === currentYear) {
				return true;
			}

			// CrossYear courses that start in a previous year and end in this year
			if (course.crossYear && course.crossYear.spansToYear === currentYear) {
				return true;
			}

			return false;
		});

		return new Year({
			year: currentYear,
			courses: yearCourses,
			state: courseStates.notTaken
		});
	});
};

export const isYearPassed = (year?: Year) => {
	return year ? year.state === courseStates.passed : true;
};
