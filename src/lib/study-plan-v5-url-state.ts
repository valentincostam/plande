import { decodeCoursesStates, encodeCoursesStates, type CourseState } from './course-state';
import { milestoneStates, type MilestoneState, type PlanItem } from './study-plan-v5';

const milestoneLetters = {
	[milestoneStates.pending]: 'p',
	[milestoneStates.completed]: 'c'
} as const;

const milestoneStatesFromLetters = {
	[milestoneLetters[milestoneStates.pending]]: milestoneStates.pending,
	[milestoneLetters[milestoneStates.completed]]: milestoneStates.completed
} as const;

const trimTrailingPending = (letters: string) => letters.replace(/p+$/i, '');

const compressLetters = (input: string) => {
	let compressed = '';
	let count = 1;

	for (let index = 0; index < input.length; index++) {
		if (input[index] === input[index + 1]) {
			count++;
			continue;
		}

		compressed += input[index] + (count > 1 ? count : '');
		count = 1;
	}

	return compressed;
};

const decompressLetters = (input: string) => {
	let output = '';
	let index = 0;

	while (index < input.length) {
		const char = input[index];
		let countText = '';
		index++;

		while (index < input.length && !Number.isNaN(Number.parseInt(input[index], 10))) {
			countText += input[index];
			index++;
		}

		const count = countText === '' ? 1 : Number.parseInt(countText, 10);
		output += char.repeat(count);
	}

	return output;
};

export const sortItemsBySeqId = <T extends Pick<PlanItem, 'seqId'>>(items: T[]) =>
	[...items].sort((a, b) => a.seqId - b.seqId);

export const encodeCourseItemStates = (states: CourseState[]) => encodeCoursesStates(states);

export const decodeCourseItemStates = (encoded: string) => decodeCoursesStates(encoded);

export const encodeMilestoneStates = (states: MilestoneState[]) => {
	const letters = states.map((state) => milestoneLetters[state]).join('');
	return compressLetters(trimTrailingPending(letters));
};

export const decodeMilestoneStates = (encoded: string) => {
	if (!encoded) return [];

	return decompressLetters(encoded)
		.toLowerCase()
		.split('')
		.map((letter) => milestoneStatesFromLetters[letter as keyof typeof milestoneStatesFromLetters]);
};
