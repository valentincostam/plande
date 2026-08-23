export const planMemoryStorageKey = 'plande-plan-memory';

export type PlanMemory = {
	version: 1;
	recentPlanSlugs: string[];
};

const emptyPlanMemory = (): PlanMemory => ({
	version: 1,
	recentPlanSlugs: []
});

export function readPlanMemory(): PlanMemory {
	try {
		const stored = localStorage.getItem(planMemoryStorageKey);
		if (!stored) return emptyPlanMemory();

		const parsed = JSON.parse(stored);
		if (parsed?.version !== 1 || !Array.isArray(parsed.recentPlanSlugs)) {
			return emptyPlanMemory();
		}

		return {
			version: 1,
			recentPlanSlugs: parsed.recentPlanSlugs.filter(
				(slug: unknown): slug is string => typeof slug === 'string'
			)
		};
	} catch {
		return emptyPlanMemory();
	}
}

export function writePlanMemory(memory: PlanMemory): boolean {
	try {
		localStorage.setItem(planMemoryStorageKey, JSON.stringify(memory));
		return true;
	} catch {
		// Persistence is an enhancement; the app remains usable without it.
		return false;
	}
}

export function markPlanUsed(slug: string): boolean {
	const memory = readPlanMemory();
	const next = {
		...memory,
		recentPlanSlugs: [slug, ...memory.recentPlanSlugs.filter((recent) => recent !== slug)].slice(
			0,
			3
		)
	};
	return writePlanMemory(next);
}

export function removeRecentPlan(slug: string): boolean {
	const memory = readPlanMemory();
	return writePlanMemory({
		...memory,
		recentPlanSlugs: memory.recentPlanSlugs.filter((recent) => recent !== slug)
	});
}
