import { encodeCoursesStates, type CourseState } from './course-state';

export const urlStateParameters = {
	strict: 'estricto',
	state: 'estado'
} as const;

export const createUrlSearchParams = (
	coursesStates: CourseState[],
	isStrictModeEnabled: boolean
) => {
	const stateLetters = encodeCoursesStates(coursesStates);

	const urlSearchParams = new URLSearchParams();

	if (stateLetters.length > 0) {
		urlSearchParams.set(urlStateParameters.state, stateLetters);
	}

	if (!isStrictModeEnabled) {
		urlSearchParams.set(urlStateParameters.strict, 'no');
	}

	return urlSearchParams;
};
