export const courseStates = {
	notTaken: 'notTaken',
	inProgress: 'inProgress',
	taken: 'taken',
	passed: 'passed'
} as const;

export type CourseState = (typeof courseStates)[keyof typeof courseStates];

const courseStateHierarchy = {
	[courseStates.notTaken]: 0,
	[courseStates.inProgress]: 1,
	[courseStates.taken]: 2,
	[courseStates.passed]: 3
} as const;

export const isCourseStateGreaterOrEqual = (state1: CourseState, state2: CourseState) => {
	return courseStateHierarchy[state1] >= courseStateHierarchy[state2];
};

export const femenineCourseStateLabels = {
	[courseStates.notTaken]: 'No cursada',
	[courseStates.inProgress]: 'En curso',
	[courseStates.taken]: 'Regular',
	[courseStates.passed]: 'Aprobada'
} as const;

export const masculineCourseStateLabels = {
	[courseStates.notTaken]: 'No cursado',
	[courseStates.inProgress]: 'En curso',
	[courseStates.taken]: 'Regular',
	[courseStates.passed]: 'Aprobado'
} as const;

export const courseStateLabelsInitials = {
	[courseStates.notTaken]: femenineCourseStateLabels[courseStates.notTaken].charAt(0),
	[courseStates.inProgress]: femenineCourseStateLabels[courseStates.inProgress].charAt(0),
	[courseStates.taken]: femenineCourseStateLabels[courseStates.taken].charAt(0),
	[courseStates.passed]: femenineCourseStateLabels[courseStates.passed].charAt(0)
} as const;

export const courseStatesFromInitials = {
	[courseStateLabelsInitials[courseStates.notTaken]]: courseStates.notTaken,
	[courseStateLabelsInitials[courseStates.inProgress]]: courseStates.inProgress,
	[courseStateLabelsInitials[courseStates.taken]]: courseStates.taken,
	[courseStateLabelsInitials[courseStates.passed]]: courseStates.passed
} as const;

export const courseBgColors = {
	[courseStates.notTaken]: 'bg-gray-200',
	[courseStates.inProgress]: 'bg-blue-200',
	[courseStates.taken]: 'bg-amber-200',
	[courseStates.passed]: 'bg-green-200'
} as const;

export const chevronStrokeColors = {
	[courseStates.notTaken]: 'stroke-gray-700',
	[courseStates.inProgress]: 'stroke-blue-700',
	[courseStates.taken]: 'stroke-amber-700',
	[courseStates.passed]: 'stroke-green-700'
} as const;

export const courseNameColors = {
	[courseStates.notTaken]: 'text-gray-950',
	[courseStates.inProgress]: 'text-blue-950',
	[courseStates.taken]: 'text-amber-950',
	[courseStates.passed]: 'text-green-950'
} as const;

export const hoursColors = {
	[courseStates.notTaken]: 'text-gray-500',
	[courseStates.inProgress]: 'text-blue-500',
	[courseStates.taken]: 'text-amber-500',
	[courseStates.passed]: 'text-green-500'
} as const;

const unneededLetterRegex = new RegExp(
	`[${courseStateLabelsInitials[courseStates.notTaken].toLowerCase()}]+$`,
	'i'
);

const trimUnneededCoursesStatesLetters = (coursesStatesLetters: string) => {
	return coursesStatesLetters.replace(unneededLetterRegex, '');
};

const compressCoursesStatesLetters = (input: string) => {
	let compressedStateLetters = '';
	let count = 1;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[i + 1]) {
			count++;
		} else {
			compressedStateLetters += input[i] + (count > 1 ? count : '');
			count = 1;
		}
	}

	return compressedStateLetters;
};

const decompressCoursesStatesLetters = (compressed: string) => {
	let decompressedStateLetters = '';
	let index = 0;

	while (index < compressed.length) {
		const char = compressed[index];
		let countString = '';
		index++;

		while (index < compressed.length && !isNaN(parseInt(compressed[index]))) {
			countString += compressed[index];
			index++;
		}

		const count = countString === '' ? 1 : parseInt(countString);
		decompressedStateLetters += char.repeat(count);
	}

	return decompressedStateLetters;
};

export const decodeCoursesStates = (letters: string) => {
	if (!letters) {
		return [];
	}

	return decompressCoursesStatesLetters(letters)
		.toUpperCase()
		.split('')
		.map((letter) => courseStatesFromInitials[letter]);
};

export const encodeCoursesStates = (states: CourseState[]) => {
	const stateLetters = states
		.map((state) => courseStateLabelsInitials[state].toLowerCase())
		.join('');
	const trimmedStateLetters = trimUnneededCoursesStatesLetters(stateLetters);
	return compressCoursesStatesLetters(trimmedStateLetters);
};
