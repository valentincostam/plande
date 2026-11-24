import type { CourseType } from '$lib/course-type';
import type { RequirementExpr, Section } from '$lib/study-plan-data';
import type { DraftPlanContent, DraftPlanDocument, EditorItem } from './draft-plan-content';

const unique = (values: string[], label: string) => {
	if (new Set(values).size !== values.length) throw new Error(`${label} must be unique.`);
};

const assertStructure = (document: DraftPlanDocument) => {
	unique(
		document.sections.map((section) => section.id),
		'Section IDs'
	);
	unique(
		document.items.map((item) => item.id),
		'Item IDs'
	);
	unique(
		document.items.map((item) => String(item.seqId)),
		'Sequence IDs'
	);
	unique(
		document.items.flatMap((item) => item.placements.map((placement) => placement.id)),
		'Placement IDs'
	);
	const sectionIds = new Set(document.sections.map((section) => section.id));
	for (const item of document.items) {
		for (const placement of item.placements) {
			if (!sectionIds.has(placement.sectionId))
				throw new Error('Every placement needs an existing section.');
		}
		unique(
			item.placements.map((placement) =>
				JSON.stringify([placement.sectionId, placement.term ?? null, placement.order ?? null])
			),
			'Placement tuples'
		);
	}
};

const withDocument = (content: DraftPlanContent, document: DraftPlanDocument): DraftPlanContent => {
	assertStructure(document);
	return { ...content, document };
};

const unknownScope = (itemId: string, requirement: 'enroll' | 'complete') =>
	`item:${itemId}:${requirement}`;

export type ItemReferenceDiagnostic = { scope: string };

export class ReferencedItemError extends Error {
	constructor(
		readonly itemId: string,
		readonly references: ItemReferenceDiagnostic[]
	) {
		super('Move or update requirements that reference this item first.');
	}
}

const expressionReferencesItem = (expression: RequirementExpr, itemId: string): boolean => {
	if (expression.type === 'item') return expression.itemId === itemId;
	if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf')
		return expression.rules.some((rule) => expressionReferencesItem(rule, itemId));
	return expression.selector.type === 'items' && expression.selector.itemIds.includes(itemId);
};

const expressionReferencesSection = (expression: RequirementExpr, sectionId: string): boolean => {
	if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf')
		return expression.rules.some((rule) => expressionReferencesSection(rule, sectionId));
	return (
		(expression.type === 'count' || expression.type === 'percent' || expression.type === 'sum') &&
		(expression.selector.type === 'section'
			? expression.selector.sectionId === sectionId
			: expression.selector.type === 'sections' &&
				expression.selector.sectionIds.includes(sectionId))
	);
};

const expressionHasMissingSection = (
	expression: RequirementExpr,
	sectionIds: Set<string>
): boolean => {
	if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf')
		return expression.rules.some((rule) => expressionHasMissingSection(rule, sectionIds));
	if (expression.type !== 'count' && expression.type !== 'percent' && expression.type !== 'sum')
		return false;
	return expression.selector.type === 'section'
		? !sectionIds.has(expression.selector.sectionId)
		: expression.selector.type === 'sections' &&
				expression.selector.sectionIds.some((sectionId) => !sectionIds.has(sectionId));
};

const requirementReferences = (
	content: DraftPlanContent,
	matches: (expression: RequirementExpr) => boolean
): ItemReferenceDiagnostic[] => {
	const references: ItemReferenceDiagnostic[] = [];
	for (const item of content.document.items) {
		for (const scope of ['enroll', 'complete'] as const) {
			const expression = item.requirements?.[scope];
			if (expression && matches(expression)) references.push({ scope: `item:${item.id}:${scope}` });
		}
	}
	for (const rule of content.document.requirements.graduation ?? []) {
		if (rule.expr && matches(rule.expr)) references.push({ scope: `graduation:${rule.id}` });
	}
	return references;
};

export const findItemReferences = (
	content: DraftPlanContent,
	itemId: string
): ItemReferenceDiagnostic[] =>
	requirementReferences(content, (expression) => expressionReferencesItem(expression, itemId));

export const findSectionReferences = (
	content: DraftPlanContent,
	sectionId: string
): ItemReferenceDiagnostic[] =>
	requirementReferences(content, (expression) =>
		expressionReferencesSection(expression, sectionId)
	);

export const findMissingSectionReferences = (
	content: DraftPlanContent,
	sectionIds: Set<string>
): ItemReferenceDiagnostic[] =>
	requirementReferences(content, (expression) =>
		expressionHasMissingSection(expression, sectionIds)
	);

const withUnknownRequirements = (
	content: DraftPlanContent,
	scopes: Array<{ scope: string; note: string }>
): DraftPlanContent => ({
	...content,
	unknownRequirements: [...content.unknownRequirements, ...scopes]
});

export const itemsInSection = (document: DraftPlanDocument, sectionId: string) =>
	document.items
		.filter((item) => item.placements.some((placement) => placement.sectionId === sectionId))
		.toSorted((left, right) => {
			const leftOrder =
				left.placements.find((placement) => placement.sectionId === sectionId)?.order ?? 0;
			const rightOrder =
				right.placements.find((placement) => placement.sectionId === sectionId)?.order ?? 0;
			return leftOrder - rightOrder || left.seqId - right.seqId;
		});

export const reorderSection = (
	content: DraftPlanContent,
	sectionId: string,
	targetIndex: number
) => {
	const sections = [...content.document.sections];
	const sourceIndex = sections.findIndex((section) => section.id === sectionId);
	if (sourceIndex < 0) return content;
	const [section] = sections.splice(sourceIndex, 1);
	sections.splice(Math.max(0, Math.min(targetIndex, sections.length)), 0, section);
	return withDocument(content, { ...content.document, sections });
};

export const moveItem = (
	content: DraftPlanContent,
	itemId: string,
	fromSectionId: string | null,
	toSectionId: string | null,
	targetIndex: number
) => {
	const moving = content.document.items.find((item) => item.id === itemId);
	if (!moving || (toSectionId === null && moving.kind !== 'milestone')) return content;
	if (fromSectionId === null && toSectionId === null) {
		const unplaced = content.document.items.filter(
			(item) => item.kind === 'milestone' && item.placements.length === 0
		);
		const sourceIndex = unplaced.findIndex((item) => item.id === itemId);
		if (sourceIndex < 0) return content;
		const [selected] = unplaced.splice(sourceIndex, 1);
		unplaced.splice(Math.max(0, Math.min(targetIndex, unplaced.length)), 0, selected);
		const queue = [...unplaced];
		return withDocument(content, {
			...content.document,
			items: content.document.items.map((item) =>
				item.kind === 'milestone' && item.placements.length === 0 ? queue.shift()! : item
			)
		});
	}
	if (
		fromSectionId !== toSectionId &&
		toSectionId !== null &&
		moving.placements.some((placement) => placement.sectionId === toSectionId)
	)
		return content;

	let placementId =
		fromSectionId === null
			? null
			: (moving.placements.find((placement) => placement.sectionId === fromSectionId)?.id ?? null);
	if (fromSectionId !== null && placementId === null) return content;

	let items = content.document.items.map((item) => ({
		...item,
		placements: item.placements.map((placement) => ({ ...placement }))
	}));
	const nextMoving = items.find((item) => item.id === itemId)!;
	if (toSectionId === null) {
		nextMoving.placements = nextMoving.placements.filter(
			(placement) => placement.id !== placementId
		);
	} else if (placementId === null) {
		placementId = crypto.randomUUID();
		nextMoving.placements.push({ id: placementId, sectionId: toSectionId });
	} else {
		const placement = nextMoving.placements.find((candidate) => candidate.id === placementId)!;
		placement.sectionId = toSectionId;
	}

	const normalizeSection = (sectionId: string, movingIndex?: number) => {
		const ordered = itemsInSection({ ...content.document, items }, sectionId).filter(
			(item) => movingIndex === undefined || item.id !== itemId
		);
		if (movingIndex !== undefined) {
			ordered.splice(Math.max(0, Math.min(movingIndex, ordered.length)), 0, nextMoving);
		}
		for (const [index, item] of ordered.entries()) {
			const placement = item.placements.find((candidate) => candidate.sectionId === sectionId);
			if (placement) placement.order = index;
		}
	};

	if (fromSectionId !== null && fromSectionId !== toSectionId) normalizeSection(fromSectionId);
	if (toSectionId !== null) normalizeSection(toSectionId, targetIndex);
	items = items.map((item) => (item.id === nextMoving.id ? nextMoving : item));
	return withDocument(content, { ...content.document, items });
};

export const addSection = (content: DraftPlanContent, section: Section) =>
	withDocument(content, { ...content.document, sections: [...content.document.sections, section] });

export const renameSection = (content: DraftPlanContent, sectionId: string, label: string) =>
	withDocument(content, {
		...content.document,
		sections: content.document.sections.map((section) =>
			section.id === sectionId ? { ...section, label } : section
		)
	});

export const addCourse = (
	content: DraftPlanContent,
	item: Omit<Extract<EditorItem, { kind: 'course' }>, 'placements'>,
	sectionId: string
) => {
	const sectionItems = itemsInSection(content.document, sectionId);
	const lastOrder = Math.max(
		sectionItems.length - 1,
		...sectionItems.map(
			(candidate) =>
				candidate.placements.find((placement) => placement.sectionId === sectionId)?.order ?? -1
		)
	);
	const next = withDocument(content, {
		...content.document,
		nextSeqId: Math.max(content.document.nextSeqId, item.seqId + 1),
		items: [
			...content.document.items,
			{ ...item, placements: [{ id: crypto.randomUUID(), sectionId, order: lastOrder + 1 }] }
		]
	});
	return withUnknownRequirements(next, [
		{ scope: unknownScope(item.id, 'enroll'), note: 'Todavía no comprobado.' },
		{ scope: unknownScope(item.id, 'complete'), note: 'Todavía no comprobado.' }
	]);
};

export const addMilestone = (
	content: DraftPlanContent,
	item: Omit<Extract<EditorItem, { kind: 'milestone' }>, 'placements'>,
	sectionId?: string
) => {
	const sectionItems = sectionId ? itemsInSection(content.document, sectionId) : [];
	const lastOrder = Math.max(
		sectionItems.length - 1,
		...sectionItems.map(
			(candidate) =>
				candidate.placements.find((placement) => placement.sectionId === sectionId)?.order ?? -1
		)
	);
	const next = withDocument(content, {
		...content.document,
		nextSeqId: Math.max(content.document.nextSeqId, item.seqId + 1),
		items: [
			...content.document.items,
			{
				...item,
				placements: sectionId ? [{ id: crypto.randomUUID(), sectionId, order: lastOrder + 1 }] : []
			}
		]
	});
	return withUnknownRequirements(next, [
		{ scope: unknownScope(item.id, 'complete'), note: 'Todavía no comprobado.' }
	]);
};

export const patchCourse = (
	content: DraftPlanContent,
	itemId: string,
	patch: Partial<
		Pick<
			Extract<EditorItem, { kind: 'course' }>,
			'name' | 'code' | 'type' | 'hours' | 'totalHours' | 'credits' | 'tags' | 'attributes'
		>
	>
) =>
	withDocument(content, {
		...content.document,
		items: content.document.items.map((item) =>
			item.id === itemId && item.kind === 'course' ? { ...item, ...patch } : item
		)
	});

export const patchItemName = (content: DraftPlanContent, itemId: string, name: string) =>
	withDocument(content, {
		...content.document,
		items: content.document.items.map((item) => (item.id === itemId ? { ...item, name } : item))
	});

export const placeItem = (
	content: DraftPlanContent,
	itemId: string,
	sectionId: string,
	order?: number,
	term?: import('$lib/course-term').CourseTerm
) =>
	withDocument(content, {
		...content.document,
		items: content.document.items.map((item) => {
			if (item.id !== itemId) return item;
			if (
				item.placements.some(
					(placement) =>
						placement.sectionId === sectionId &&
						placement.term === term &&
						placement.order === order
				)
			)
				return item;
			return {
				...item,
				placements: [
					...item.placements,
					{
						id: crypto.randomUUID(),
						sectionId,
						...(order === undefined ? {} : { order }),
						...(term === undefined ? {} : { term })
					}
				]
			};
		})
	});

export const movePlacement = (
	content: DraftPlanContent,
	itemId: string,
	sectionId: string,
	order: number
) =>
	withDocument(content, {
		...content.document,
		items: content.document.items.map((item) =>
			item.id === itemId
				? {
						...item,
						placements: item.placements.map((placement) =>
							placement.sectionId === sectionId ? { ...placement, order } : placement
						)
					}
				: item
		)
	});

export const removeItem = (content: DraftPlanContent, itemId: string) => {
	const references = findItemReferences(content, itemId);
	if (references.length) throw new ReferencedItemError(itemId, references);
	const next = withDocument(content, {
		...content.document,
		items: content.document.items.filter((item) => item.id !== itemId)
	});
	return {
		...next,
		unknownRequirements: next.unknownRequirements.filter(
			({ scope }) => !scope.startsWith(`item:${itemId}:`)
		)
	};
};

export const removeSection = (content: DraftPlanContent, sectionId: string) => {
	const placements = content.document.items.filter((item) =>
		item.placements.some((placement) => placement.sectionId === sectionId)
	);
	if (placements.length > 0) throw new Error('Move or remove the items in this section first.');
	if (findSectionReferences(content, sectionId).length > 0)
		throw new Error('Move or update the requirements that reference this section first.');
	return withDocument(content, {
		...content.document,
		sections: content.document.sections.filter((section) => section.id !== sectionId)
	});
};

export const courseTypeFor = (item: EditorItem): CourseType | undefined =>
	item.kind === 'course' ? item.type : undefined;
