import type { CourseState } from './course-state';
import { getContext, setContext } from 'svelte';

type SharedProgressComparisonContext = {
	getLocalCourseState: (courseId: number) => CourseState | undefined;
};

const sharedProgressComparisonKey = Symbol('shared-progress-comparison');

export function setSharedProgressComparisonContext(context: SharedProgressComparisonContext) {
	setContext(sharedProgressComparisonKey, context);
}

export function getSharedProgressComparisonContext() {
	return getContext<SharedProgressComparisonContext | undefined>(sharedProgressComparisonKey);
}
