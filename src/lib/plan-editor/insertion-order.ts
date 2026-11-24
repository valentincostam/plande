export type OrderedPlacement = { id: string; order?: number };

export const insertionOrders = (placements: OrderedPlacement[], selectedId: string) => {
	const index = placements.findIndex((placement) => placement.id === selectedId);
	if (index < 0) return undefined;
	const current = placements[index].order;
	const next = placements[index + 1]?.order;
	if (current !== undefined && next !== undefined && next > current)
		return { existing: new Map<string, number>(), inserted: (current + next) / 2 };
	return {
		existing: new Map(placements.map((placement, position) => [placement.id, position])),
		inserted: index + 0.5
	};
};
