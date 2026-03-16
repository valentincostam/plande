import type {
	DependentEdge,
	GraduationRequirement,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector,
	Section,
	StudyPlanData
} from './study-plan-v5';
import { isMilestonePlanItem } from './study-plan-v5';

export type SeqIdRegistry = Record<string, number>;

export type PreparePlanOptions = {
	previousSeqIds?: SeqIdRegistry;
};

export type PreparedPlan = {
	plan: StudyPlanData;
	sections: Section[];
	orderedItems: PlanItem[];
	itemsById: Map<string, PlanItem>;
	itemsBySeqId: Map<number, PlanItem>;
	itemIdsByTag: Map<string, string[]>;
	itemIdsBySection: Map<string, string[]>;
	dependentEdges: DependentEdge[];
	dependentEdgesByItemId: Map<string, DependentEdge[]>;
};

const dedupeStrings = (values: string[]) => [...new Set(values)];

const pushMapValue = (map: Map<string, string[]>, key: string, value: string) => {
	map.set(key, dedupeStrings([...(map.get(key) ?? []), value]));
};

const visitRequirementExpr = (
	expr: RequirementExpr,
	visit: (expr: RequirementExpr, path: RequirementExpr[]) => void,
	path: RequirementExpr[] = []
) => {
	visit(expr, path);

	if (expr.type === 'all' || expr.type === 'any') {
		for (const child of expr.rules) {
			visitRequirementExpr(child, visit, [...path, expr]);
		}
	}
};

const getSelectorTargetIds = (
	selector: Selector,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>
) => {
	switch (selector.type) {
		case 'items':
			return selector.itemIds;
		case 'tag':
			return itemIdsByTag.get(selector.tag) ?? [];
		case 'section':
			return itemIdsBySection.get(selector.sectionId) ?? [];
	}
};

const validateRequirementStateForTarget = (
	itemsById: Map<string, PlanItem>,
	itemId: string,
	state: RequirementState,
	scope: string
) => {
	const target = itemsById.get(itemId);
	if (!target) {
		throw new Error(`${scope}: referenced item "${itemId}" does not exist`);
	}

	if (isMilestonePlanItem(target) && state !== 'completed') {
		throw new Error(
			`${scope}: milestone "${itemId}" can only be referenced with state "completed"`
		);
	}
};

const extractDependencyEdges = (
	ownerItemId: string,
	requiredFor: DependentEdge['requiredFor'],
	expr: RequirementExpr,
	currentKind: DependentEdge['kind'] = 'direct'
): DependentEdge[] => {
	switch (expr.type) {
		case 'item':
			return [
				{
					sourceItemId: expr.itemId,
					targetItemId: ownerItemId,
					requiredFor,
					kind: currentKind
				}
			];
		case 'all':
			return expr.rules.flatMap((rule) =>
				extractDependencyEdges(ownerItemId, requiredFor, rule, currentKind)
			);
		case 'any':
			return expr.rules.flatMap((rule) =>
				extractDependencyEdges(ownerItemId, requiredFor, rule, 'alternative')
			);
		case 'count':
		case 'percent':
		case 'sum':
			return [];
	}
};

const detectCycles = (items: PlanItem[], adjacency: Map<string, string[]>) => {
	const visiting = new Set<string>();
	const visited = new Set<string>();

	const dfs = (itemId: string, trail: string[]) => {
		if (visiting.has(itemId)) {
			throw new Error(`Circular dependency detected: ${[...trail, itemId].join(' -> ')}`);
		}
		if (visited.has(itemId)) return;

		visiting.add(itemId);
		for (const neighbor of adjacency.get(itemId) ?? []) {
			dfs(neighbor, [...trail, itemId]);
		}
		visiting.delete(itemId);
		visited.add(itemId);
	};

	for (const item of items) {
		dfs(item.id, []);
	}
};

const validateAppendOnlySeqIds = (items: PlanItem[], previousSeqIds: SeqIdRegistry) => {
	const previousEntries = Object.entries(previousSeqIds);
	if (previousEntries.length === 0) return;

	const currentById = new Map(items.map((item) => [item.id, item.seqId]));
	const previousBySeqId = new Map(previousEntries.map(([id, seqId]) => [seqId, id]));
	const maxPreviousSeqId = Math.max(...previousEntries.map(([, seqId]) => seqId));

	for (const [id, previousSeqId] of previousEntries) {
		const currentSeqId = currentById.get(id);
		if (currentSeqId !== undefined && currentSeqId !== previousSeqId) {
			throw new Error(
				`Item "${id}" changed seqId from ${previousSeqId} to ${currentSeqId}. seqId is append-only.`
			);
		}
	}

	for (const item of items) {
		const previousOwner = previousBySeqId.get(item.seqId);
		if (previousOwner && previousOwner !== item.id) {
			throw new Error(
				`seqId ${item.seqId} already belonged to "${previousOwner}" and cannot be reused by "${item.id}".`
			);
		}

		if (!previousSeqIds[item.id] && item.seqId <= maxPreviousSeqId) {
			throw new Error(
				`New item "${item.id}" uses seqId ${item.seqId}. New seqIds must be greater than ${maxPreviousSeqId}.`
			);
		}
	}
};

const inferSelectorScope = (selector: Selector) => {
	switch (selector.type) {
		case 'items':
			return `items(${selector.itemIds.join(', ')})`;
		case 'tag':
			return `tag(${selector.tag})`;
		case 'section':
			return `section(${selector.sectionId})`;
	}
};

const validateRequirementExpr = (
	itemsById: Map<string, PlanItem>,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>,
	ownerItem: PlanItem,
	scope: string,
	expr: RequirementExpr
) => {
	visitRequirementExpr(expr, (node) => {
		switch (node.type) {
			case 'item':
				validateRequirementStateForTarget(itemsById, node.itemId, node.state, scope);
				break;
			case 'count':
			case 'percent':
			case 'sum': {
				const targets = getSelectorTargetIds(node.selector, itemIdsByTag, itemIdsBySection);
				const selectorScope = inferSelectorScope(node.selector);

				if (targets.length === 0) {
					throw new Error(`${scope}: selector ${selectorScope} does not match any items`);
				}

				for (const targetId of targets) {
					validateRequirementStateForTarget(itemsById, targetId, node.state, scope);
				}

				if (targets.includes(ownerItem.id)) {
					throw new Error(
						`${scope}: selector ${selectorScope} includes the owner item "${ownerItem.id}", creating a circular rule`
					);
				}
				break;
			}
			default:
				break;
		}
	});
};

const validateGraduationRequirement = (
	itemsById: Map<string, PlanItem>,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>,
	requirement: GraduationRequirement
) => {
	const scope = `Graduation requirement "${requirement.id}"`;

	if (requirement.type === 'item') {
		validateRequirementStateForTarget(itemsById, requirement.itemId, requirement.state, scope);
		return;
	}

	if (requirement.type === 'count' || requirement.type === 'sum') {
		const targets = getSelectorTargetIds(requirement.selector, itemIdsByTag, itemIdsBySection);
		if (targets.length === 0) {
			throw new Error(
				`${scope}: selector ${inferSelectorScope(requirement.selector)} does not match any items`
			);
		}
		for (const targetId of targets) {
			validateRequirementStateForTarget(itemsById, targetId, requirement.state, scope);
		}
	}
};

export const preparePlan = (
	plan: StudyPlanData,
	{ previousSeqIds = {} }: PreparePlanOptions = {}
): PreparedPlan => {
	const sectionIds = new Set(plan.sections.map((section) => section.id));
	const itemsById = new Map<string, PlanItem>();
	const itemsBySeqId = new Map<number, PlanItem>();
	const itemIdsByTag = new Map<string, string[]>();
	const itemIdsBySection = new Map<string, string[]>();

	for (const item of plan.items) {
		if (itemsById.has(item.id)) {
			throw new Error(`Duplicate item id: "${item.id}"`);
		}
		if (itemsBySeqId.has(item.seqId)) {
			throw new Error(`Duplicate seqId: ${item.seqId}`);
		}
		itemsById.set(item.id, item);
		itemsBySeqId.set(item.seqId, item);

		for (const placement of item.placements) {
			if (!sectionIds.has(placement.sectionId)) {
				throw new Error(`Item "${item.id}" references unknown section "${placement.sectionId}"`);
			}
			pushMapValue(itemIdsBySection, placement.sectionId, item.id);
		}

		for (const tag of item.tags ?? []) {
			pushMapValue(itemIdsByTag, tag, item.id);
		}
	}

	validateAppendOnlySeqIds(plan.items, previousSeqIds);

	for (const item of plan.items) {
		if (item.requirements?.enroll) {
			validateRequirementExpr(
				itemsById,
				itemIdsByTag,
				itemIdsBySection,
				item,
				`Item "${item.id}" enroll requirement`,
				item.requirements.enroll
			);
		}

		if (item.requirements?.complete) {
			validateRequirementExpr(
				itemsById,
				itemIdsByTag,
				itemIdsBySection,
				item,
				`Item "${item.id}" complete requirement`,
				item.requirements.complete
			);
		}
	}

	for (const requirement of plan.requirements?.graduation ?? []) {
		validateGraduationRequirement(itemsById, itemIdsByTag, itemIdsBySection, requirement);
	}

	const dependencyAdjacency = new Map<string, string[]>();
	const dependentEdges: DependentEdge[] = [];

	for (const item of plan.items) {
		const addDependencies = (
			expr: RequirementExpr | undefined,
			requiredFor: DependentEdge['requiredFor']
		) => {
			if (!expr) return;
			const edges = extractDependencyEdges(item.id, requiredFor, expr);
			for (const edge of edges) {
				dependentEdges.push(edge);
				dependencyAdjacency.set(
					item.id,
					dedupeStrings([...(dependencyAdjacency.get(item.id) ?? []), edge.sourceItemId])
				);
			}
		};

		addDependencies(item.requirements?.enroll, 'enroll');
		addDependencies(item.requirements?.complete, 'complete');
	}

	detectCycles(plan.items, dependencyAdjacency);

	const edgeMap = new Map<string, DependentEdge>();
	for (const edge of dependentEdges) {
		edgeMap.set(`${edge.sourceItemId}|${edge.targetItemId}|${edge.requiredFor}|${edge.kind}`, edge);
	}

	const uniqueEdges = [...edgeMap.values()];
	const dependentEdgesByItemId = new Map<string, DependentEdge[]>();
	for (const edge of uniqueEdges) {
		dependentEdgesByItemId.set(edge.sourceItemId, [
			...(dependentEdgesByItemId.get(edge.sourceItemId) ?? []),
			edge
		]);
	}

	return {
		plan,
		sections: plan.sections,
		orderedItems: [...plan.items].sort((a, b) => a.seqId - b.seqId),
		itemsById,
		itemsBySeqId,
		itemIdsByTag,
		itemIdsBySection,
		dependentEdges: uniqueEdges,
		dependentEdgesByItemId
	};
};
