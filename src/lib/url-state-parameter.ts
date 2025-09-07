import { encodeCoursesStates, type CourseState } from './course-state';

export const urlStateParameters = {
	strict: 'estricto',
	state: 'estado',
	showCodes: 'codigos'
} as const;

export const createUrlSearchParams = (
	coursesStates: CourseState[],
	isStrictModeEnabled: boolean,
	showCodes: boolean
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

	return urlSearchParams;
};
