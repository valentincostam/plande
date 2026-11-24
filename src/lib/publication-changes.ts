type Publication = { snapshotId: string; argument: string | null };

export function publicationChanges<T extends Publication>(
	history: readonly T[],
	previousSnapshotId: unknown,
	loadedSnapshotId: string | undefined
): T[] {
	const current = history.findIndex((entry) => entry.snapshotId === loadedSnapshotId);
	const previous = history.findIndex((entry) => entry.snapshotId === previousSnapshotId);
	if (current < 0 || (previous >= 0 && previous <= current)) return [];
	return history
		.slice(current, previous < 0 ? undefined : previous)
		.filter((entry) => entry.argument);
}
