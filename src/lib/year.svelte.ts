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

export const createYears = (years: number, courses: Course[]) => {
	return Array.from({ length: years }, (_, index) => {
		return new Year({
			year: index + 1,
			courses: courses.filter((course) => course.year === index + 1),
			state: courseStates.notTaken
		});
	});
};
