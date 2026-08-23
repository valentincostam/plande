import { decodeCoursesStates, encodeCoursesStates } from './course-state';
import { encodeGrades } from './grade-encoding';

export type StoredStudyPlan = {
	coursesStates: string;
	grades: (number | undefined)[];
	isStrictModeEnabled: boolean;
	showCodes: boolean;
	useCycleButton: boolean;
	updatedAt?: number;
};

export const getStudyPlanStorageKey = (slug: string) => `plande-${slug}`;

const normalizeGrades = (value: unknown): (number | undefined)[] => {
	if (!Array.isArray(value)) return [];
	return value.map((grade) =>
		typeof grade === 'number' && grade >= 4 && grade <= 10 ? grade : undefined
	);
};

export function parseStoredStudyPlan(value: string | null): StoredStudyPlan | undefined {
	if (!value) return undefined;

	try {
		const parsed = JSON.parse(value);
		if (!parsed || typeof parsed !== 'object') return undefined;

		const encodedStates =
			typeof parsed.coursesStates === 'string'
				? encodeCoursesStates(decodeCoursesStates(parsed.coursesStates))
				: '';

		return {
			coursesStates: encodedStates,
			grades: normalizeGrades(parsed.grades),
			isStrictModeEnabled:
				typeof parsed.isStrictModeEnabled === 'boolean' ? parsed.isStrictModeEnabled : true,
			showCodes: typeof parsed.showCodes === 'boolean' ? parsed.showCodes : false,
			useCycleButton: typeof parsed.useCycleButton === 'boolean' ? parsed.useCycleButton : false,
			updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : undefined
		};
	} catch {
		return undefined;
	}
}

export function readStoredStudyPlan(slug: string): StoredStudyPlan | undefined {
	try {
		return parseStoredStudyPlan(localStorage.getItem(getStudyPlanStorageKey(slug)));
	} catch {
		return undefined;
	}
}

export function writeStoredStudyPlan(slug: string, state: StoredStudyPlan): boolean {
	try {
		localStorage.setItem(getStudyPlanStorageKey(slug), JSON.stringify(state));
		return true;
	} catch {
		return false;
	}
}

export function removeStoredStudyPlan(slug: string): void {
	try {
		localStorage.removeItem(getStudyPlanStorageKey(slug));
	} catch {
		// Persistence is an enhancement; the app remains usable without it.
	}
}

export function hasStoredProgress(state: StoredStudyPlan | undefined): state is StoredStudyPlan {
	return Boolean(
		state && (state.coursesStates.length > 0 || encodeGrades(state.grades).length > 0)
	);
}

export function getProgressSignature(
	coursesStates: string,
	grades: (number | undefined)[],
	isStrictModeEnabled: boolean
): string {
	return JSON.stringify({
		coursesStates: encodeCoursesStates(decodeCoursesStates(coursesStates)),
		grades: encodeGrades(grades),
		isStrictModeEnabled
	});
}

export function getMeaningfulProgressSignature(
	coursesStates: string,
	grades: (number | undefined)[]
): string {
	return JSON.stringify({
		coursesStates: encodeCoursesStates(decodeCoursesStates(coursesStates)),
		grades: encodeGrades(grades)
	});
}
