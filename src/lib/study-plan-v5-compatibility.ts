export type ItemCompatibilitySnapshot = {
	id: string;
	state: string;
	isEnabled: boolean;
	canPass: boolean;
	directDependents: string[];
	totalDependents: number;
};

export type PlanCompatibilitySnapshot = {
	slug: string;
	items: ItemCompatibilitySnapshot[];
	availableItemIds: string[];
	progressPercentage: number;
	encodedCourseStates: string;
};

export type CompatibilityDiff = {
	path: string;
	legacy: unknown;
	next: unknown;
};

export const compareCompatibilitySnapshots = (
	legacy: PlanCompatibilitySnapshot,
	next: PlanCompatibilitySnapshot
) => {
	const diffs: CompatibilityDiff[] = [];

	if (legacy.slug !== next.slug) {
		diffs.push({ path: 'slug', legacy: legacy.slug, next: next.slug });
	}

	if (legacy.progressPercentage !== next.progressPercentage) {
		diffs.push({
			path: 'progressPercentage',
			legacy: legacy.progressPercentage,
			next: next.progressPercentage
		});
	}

	if (legacy.encodedCourseStates !== next.encodedCourseStates) {
		diffs.push({
			path: 'encodedCourseStates',
			legacy: legacy.encodedCourseStates,
			next: next.encodedCourseStates
		});
	}

	const allItemIds = new Set([
		...legacy.items.map((item) => item.id),
		...next.items.map((item) => item.id)
	]);

	for (const itemId of allItemIds) {
		const legacyItem = legacy.items.find((item) => item.id === itemId);
		const nextItem = next.items.find((item) => item.id === itemId);

		if (!legacyItem || !nextItem) {
			diffs.push({ path: `items.${itemId}`, legacy: legacyItem, next: nextItem });
			continue;
		}

		if (legacyItem.state !== nextItem.state) {
			diffs.push({ path: `items.${itemId}.state`, legacy: legacyItem.state, next: nextItem.state });
		}

		if (legacyItem.isEnabled !== nextItem.isEnabled) {
			diffs.push({
				path: `items.${itemId}.isEnabled`,
				legacy: legacyItem.isEnabled,
				next: nextItem.isEnabled
			});
		}

		if (legacyItem.canPass !== nextItem.canPass) {
			diffs.push({
				path: `items.${itemId}.canPass`,
				legacy: legacyItem.canPass,
				next: nextItem.canPass
			});
		}

		if (legacyItem.totalDependents !== nextItem.totalDependents) {
			diffs.push({
				path: `items.${itemId}.totalDependents`,
				legacy: legacyItem.totalDependents,
				next: nextItem.totalDependents
			});
		}

		const legacyDirect = [...legacyItem.directDependents].sort();
		const nextDirect = [...nextItem.directDependents].sort();
		if (legacyDirect.join('|') !== nextDirect.join('|')) {
			diffs.push({
				path: `items.${itemId}.directDependents`,
				legacy: legacyDirect,
				next: nextDirect
			});
		}
	}

	const legacyAvailable = [...legacy.availableItemIds].sort();
	const nextAvailable = [...next.availableItemIds].sort();
	if (legacyAvailable.join('|') !== nextAvailable.join('|')) {
		diffs.push({ path: 'availableItemIds', legacy: legacyAvailable, next: nextAvailable });
	}

	return diffs;
};
