import { countAllDependents, type Course } from './course.svelte';
import { calculateDegreeProgress, type DegreeProgressConfig } from './degree-progress';
import type { PlanSession } from './plan-session.svelte';
import { encodeCourseItemStates } from './study-plan-v5-url-state';
import type {
	ItemCompatibilitySnapshot,
	PlanCompatibilitySnapshot
} from './study-plan-v5-compatibility';

const countAllDependentEdges = (session: PlanSession, itemId: string) => {
	const visited = new Set<string>();
	const queue = [itemId];

	while (queue.length > 0) {
		const current = queue.shift()!;
		const item = session.itemsById.get(current);
		if (!item) continue;

		for (const edge of item.dependents.filter((edge) => edge.kind === 'direct')) {
			if (visited.has(edge.targetItemId)) continue;
			visited.add(edge.targetItemId);
			queue.push(edge.targetItemId);
		}
	}

	return visited.size;
};

export const buildLegacyCompatibilitySnapshot = (
	slug: string,
	courses: Course[],
	progress: DegreeProgressConfig
): PlanCompatibilitySnapshot => {
	const items: ItemCompatibilitySnapshot[] = courses.map((course) => ({
		id: course.id.toString(),
		state: course.state,
		isEnabled: course.isEnabled,
		canPass: course.canPass,
		directDependents: course.dependents.map((dependent) => dependent.dependentCourse.id.toString()),
		totalDependents: countAllDependents(course)
	}));

	const availableItemIds = courses
		.filter((course) => course.state === 'notTaken' && course.isEnabled)
		.map((course) => course.id.toString());

	return {
		slug,
		items,
		availableItemIds,
		progressPercentage: calculateDegreeProgress(courses, progress).percentage,
		encodedCourseStates: encodeCourseItemStates(courses.map((course) => course.state))
	};
};

export const buildV5CompatibilitySnapshot = (
	slug: string,
	session: PlanSession
): PlanCompatibilitySnapshot => {
	const items: ItemCompatibilitySnapshot[] = session.getCourseItems().map((item) => ({
		id: item.def.id,
		state: item.state,
		isEnabled: item.isEnabled,
		canPass: item.canPass,
		directDependents: item.dependents
			.filter((edge) => edge.kind === 'direct')
			.map((edge) => edge.targetItemId),
		totalDependents: countAllDependentEdges(session, item.def.id)
	}));

	const availableItemIds = session
		.getCourseItems()
		.filter((item) => item.state === 'notTaken' && item.isEnabled)
		.map((item) => item.def.id);

	return {
		slug,
		items,
		availableItemIds,
		progressPercentage: session.graduation.percentage,
		encodedCourseStates: session.serializeCourseStates()
	};
};
