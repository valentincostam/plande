export const urlStateParameters = {
	strict: 'r',
	state: 's',
	showCodes: 'c',
	grades: 'n'
} as const;

export const createUrlSearchParams = (
	stateLetters: string,
	isStrictModeEnabled: boolean,
	showCodes: boolean,
	gradeLetters?: string
) => {
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

	if (gradeLetters && gradeLetters.length > 0) {
		urlSearchParams.set(urlStateParameters.grades, gradeLetters);
	}

	return urlSearchParams;
};
