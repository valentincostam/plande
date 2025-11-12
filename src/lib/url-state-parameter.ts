import { encodeCoursesStates, type CourseState } from './course-state';
import { encodeGrades } from './grade-encoding';

export const urlStateParameters = {
	strict: 'r',
	state: 's',
	showCodes: 'c',
	grades: 'n'
} as const;

export const createUrlSearchParams = (
	coursesStates: CourseState[],
	isStrictModeEnabled: boolean,
	showCodes: boolean,
	coursesGrades?: (number | undefined)[]
) => {
	const stateLetters = encodeCoursesStates(coursesStates);

	const urlSearchParams = new URLSearchParams();

	if (stateLetters.length > 0) {
		urlSearchParams.set(urlStateParameters.state, stateLetters);
	}

	if (!isStrictModeEnabled) {
		urlSearchParams.set(urlStateParameters.strict, 'no');
	}

	if (showCodes) {
		urlSearchParams.set(urlStateParameters.showCodes, 'si');
	}

	if (coursesGrades && coursesGrades.length > 0) {
		const gradeLetters = encodeGrades(coursesGrades);
		if (gradeLetters.length > 0) {
			urlSearchParams.set(urlStateParameters.grades, gradeLetters);
		}
	}

	return urlSearchParams;
};
