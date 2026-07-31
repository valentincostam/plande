import type {
	DependentEdge,
	GraduationRequirement,
	ItemState,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector,
	StudyPlanData
} from './study-plan-data';
import { courseStates } from './course-state';
import { evaluateRequirement, type RequirementContext } from './requirement-evaluator';
import { isCoursePlanItem, isMilestonePlanItem, milestoneStates } from './study-plan-data';
import { sortItemsBySeqId } from './study-plan-url-state';

export type SeqIdRegistry = Record<string, number>;

export type PreparePlanOptions = {
	previousSeqIds?: SeqIdRegistry;
};

export type PreparedPlan = {
	plan: StudyPlanData;
	orderedItems: PlanItem[];
	itemsById: Map<string, PlanItem>;
	itemIdsByTag: Map<string, string[]>;
	itemIdsBySection: Map<string, string[]>;
	dependentEdgesByItemId: Map<string, DependentEdge[]>;
};

const dedupeStrings = (values: string[]) => [...new Set(values)];

const pushMapValue = (map: Map<string, Set<string>>, key: string, value: string) => {
	const values = map.get(key) ?? new Set<string>();
	values.add(value);
	map.set(key, values);
};

const visitRequirementExpr = (expr: RequirementExpr, visit: (expr: RequirementExpr) => void) => {
	visit(expr);

	if (expr.type === 'all' || expr.type === 'any' || expr.type === 'countOf') {
		for (const child of expr.rules) {
			visitRequirementExpr(child, visit);
		}
	}
};

const getSelectorTargetIds = (
	selector: Selector,
	items: PlanItem[],
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
		case 'all':
			return items
				.filter(isCoursePlanItem)
				.filter((item) => selector.courseType === undefined || item.type === selector.courseType)
				.map((item) => item.id);
		case 'sections':
			return items
				.filter((item) =>
					item.placements.some(
						(placement) =>
							selector.sectionIds.includes(placement.sectionId) &&
							(selector.term === undefined || placement.term === selector.term)
					)
				)
				.map((item) => item.id);
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
		case 'countOf':
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

const validateReachableTerminalStates = (
	items: PlanItem[],
	itemsById: Map<string, PlanItem>,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>
) => {
	const states = new Map<string, ItemState>(
		items.map((item) => [
			item.id,
			isCoursePlanItem(item) ? courseStates.notTaken : milestoneStates.pending
		])
	);
	const contextItems = (ids: string[]) =>
		ids.flatMap((id) => {
			const item = itemsById.get(id);
			const state = states.get(id);
			return item && state ? [{ item, state }] : [];
		});
	const context: RequirementContext = {
		getItem: (id) => contextItems([id])[0],
		getAllItems: () => contextItems(items.map((item) => item.id)),
		getItemsByTag: (tag) => contextItems(itemIdsByTag.get(tag) ?? []),
		getItemsBySection: (sectionId) => contextItems(itemIdsBySection.get(sectionId) ?? [])
	};

	let changed: boolean;
	do {
		changed = false;
		for (const item of items) {
			if (isCoursePlanItem(item)) {
				if (states.get(item.id) === courseStates.passed) continue;
				if (!evaluateRequirement(item.requirements?.enroll, context, item.id)) continue;
				const nextState = evaluateRequirement(item.requirements?.complete, context, item.id)
					? courseStates.passed
					: courseStates.taken;
				if (states.get(item.id) !== nextState) {
					states.set(item.id, nextState);
					changed = true;
				}
				continue;
			}

			if (
				states.get(item.id) === milestoneStates.pending &&
				evaluateRequirement(item.requirements?.enroll, context, item.id) &&
				evaluateRequirement(item.requirements?.complete, context, item.id)
			) {
				states.set(item.id, milestoneStates.completed);
				changed = true;
			}
		}
	} while (changed);

	const unreachableIds = items
		.filter((item) =>
			isCoursePlanItem(item)
				? states.get(item.id) !== courseStates.passed
				: states.get(item.id) !== milestoneStates.completed
		)
		.map((item) => item.id);

	if (unreachableIds.length > 0) {
		throw new Error(`Unsatisfiable dependency constraints: ${unreachableIds.join(', ')}`);
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

		if (!(item.id in previousSeqIds) && item.seqId <= maxPreviousSeqId) {
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
		case 'all':
			return selector.courseType ? `all(${selector.courseType})` : 'all()';
		case 'sections':
			return `sections(${selector.sectionIds.join(', ')}${selector.term ? `, ${selector.term}` : ''})`;
	}
};

const validateRequirementExpr = (
	items: PlanItem[],
	itemsById: Map<string, PlanItem>,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>,
	sectionIds: Set<string>,
	ownerItem: PlanItem | undefined,
	scope: string,
	expr: RequirementExpr
) => {
	visitRequirementExpr(expr, (node) => {
		switch (node.type) {
			case 'item':
				validateRequirementStateForTarget(itemsById, node.itemId, node.state, scope);
				break;
			case 'all':
			case 'any':
			case 'countOf': {
				if (node.rules.length === 0) {
					throw new Error(`${scope}: ${node.type} requires at least one rule`);
				}
				if (node.type === 'countOf' && node.min > node.rules.length) {
					throw new Error(
						`${scope}: countOf min (${node.min}) exceeds its ${node.rules.length} rules`
					);
				}
				if (node.type === 'countOf' && (!Number.isInteger(node.min) || node.min <= 0)) {
					throw new Error(`${scope}: countOf min must be a positive integer`);
				}
				break;
			}
			case 'count':
			case 'percent':
			case 'sum': {
				const selectedSectionIds =
					node.selector.type === 'section'
						? [node.selector.sectionId]
						: node.selector.type === 'sections'
							? node.selector.sectionIds
							: [];
				for (const sectionId of selectedSectionIds) {
					if (!sectionIds.has(sectionId)) {
						throw new Error(`${scope}: selector references unknown section "${sectionId}"`);
					}
				}
				if (node.type === 'count' && (!Number.isInteger(node.min) || node.min <= 0)) {
					throw new Error(`${scope}: count min must be a positive integer`);
				}
				if (
					node.type === 'percent' &&
					(!Number.isFinite(node.minPercent) || node.minPercent <= 0 || node.minPercent > 100)
				) {
					throw new Error(`${scope}: minPercent must be between 1 and 100`);
				}
				if (node.type === 'sum' && (!Number.isFinite(node.min) || node.min <= 0)) {
					throw new Error(`${scope}: sum min must be a positive finite number`);
				}
				const targets = getSelectorTargetIds(node.selector, items, itemIdsByTag, itemIdsBySection);
				const selectorScope = inferSelectorScope(node.selector);

				if (targets.length === 0) {
					throw new Error(`${scope}: selector ${selectorScope} does not match any items`);
				}
				const availableTargetCount =
					ownerItem && node.selector.type === 'all'
						? targets.filter((targetId) => targetId !== ownerItem.id).length
						: targets.length;
				if (node.type === 'count' && node.min > availableTargetCount) {
					throw new Error(
						`${scope}: count min (${node.min}) exceeds its ${availableTargetCount} matched items`
					);
				}

				for (const targetId of targets) {
					validateRequirementStateForTarget(itemsById, targetId, node.state, scope);
					const target = itemsById.get(targetId);
					if (
						node.type === 'sum' &&
						(!target || !isCoursePlanItem(target) || target[node.metric] === undefined)
					) {
						throw new Error(
							`${scope}: item "${targetId}" is missing metric "${node.metric}" required by sum`
						);
					}
				}

				// 'all' selectors exclude the owner at evaluation time, so a rule
				// like "5 materias regularizadas" is not circular.
				if (ownerItem && node.selector.type !== 'all' && targets.includes(ownerItem.id)) {
					throw new Error(
						`${scope}: selector ${selectorScope} includes the owner item "${ownerItem.id}", creating a circular rule`
					);
				}
				break;
			}
		}
	});
};

const validateGraduationRequirement = (
	items: PlanItem[],
	itemsById: Map<string, PlanItem>,
	itemIdsByTag: Map<string, string[]>,
	itemIdsBySection: Map<string, string[]>,
	sectionIds: Set<string>,
	requirement: GraduationRequirement
) => {
	const scope = `Graduation requirement "${requirement.id}"`;
	let containsSum = false;
	visitRequirementExpr(requirement.expr, (node) => {
		containsSum ||= node.type === 'sum';
	});

	if (containsSum && requirement.weight === undefined) {
		throw new Error(
			`${scope}: sum blocks require an explicit weight (hours/credits units would dominate the degree percentage)`
		);
	}
	if (
		requirement.weight !== undefined &&
		(!Number.isFinite(requirement.weight) || requirement.weight <= 0)
	) {
		throw new Error(`${scope}: weight must be a positive finite number`);
	}

	validateRequirementExpr(
		items,
		itemsById,
		itemIdsByTag,
		itemIdsBySection,
		sectionIds,
		undefined,
		scope,
		requirement.expr
	);
};

export const preparePlan = (
	plan: StudyPlanData,
	{ previousSeqIds = {} }: PreparePlanOptions = {}
): PreparedPlan => {
	const normalizedPlan: StudyPlanData = {
		...plan,
		sections: plan.sections.map((section) => {
			const yearMatch = /^year-(\d+)$/.exec(section.id);
			return {
				...section,
				year: section.year ?? (yearMatch ? Number(yearMatch[1]) : undefined)
			};
		})
	};
	const sectionIds = new Set(normalizedPlan.sections.map((section) => section.id));
	if (sectionIds.size !== plan.sections.length) {
		throw new Error('Duplicate section id');
	}
	const itemsById = new Map<string, PlanItem>();
	const itemsBySeqId = new Map<number, PlanItem>();
	const itemIdSetsByTag = new Map<string, Set<string>>();
	const itemIdSetsBySection = new Map<string, Set<string>>();

	for (const item of plan.items) {
		if (itemsById.has(item.id)) {
			throw new Error(`Duplicate item id: "${item.id}"`);
		}
		if (!Number.isInteger(item.seqId) || item.seqId < 0) {
			throw new Error(`Item "${item.id}" seqId must be a non-negative integer`);
		}
		if (itemsBySeqId.has(item.seqId)) {
			throw new Error(`Duplicate seqId: ${item.seqId}`);
		}
		itemsById.set(item.id, item);
		itemsBySeqId.set(item.seqId, item);
		if (isCoursePlanItem(item) && item.placements.length === 0) {
			throw new Error(`Course "${item.id}" must have a placement`);
		}
		const placementKeys = item.placements.map(
			({ sectionId, term, order }) => `${sectionId}|${term ?? ''}|${order ?? ''}`
		);
		if (new Set(placementKeys).size !== placementKeys.length) {
			throw new Error(`Item "${item.id}" has a duplicate placement`);
		}

		for (const placement of item.placements) {
			if (!sectionIds.has(placement.sectionId)) {
				throw new Error(`Item "${item.id}" references unknown section "${placement.sectionId}"`);
			}
			pushMapValue(itemIdSetsBySection, placement.sectionId, item.id);
		}

		for (const tag of item.tags ?? []) {
			pushMapValue(itemIdSetsByTag, tag, item.id);
		}
	}
	const itemIdsByTag = new Map(
		[...itemIdSetsByTag].map(([tag, itemIds]) => [tag, [...itemIds]])
	);
	const itemIdsBySection = new Map(
		[...itemIdSetsBySection].map(([sectionId, itemIds]) => [sectionId, [...itemIds]])
	);

	validateAppendOnlySeqIds(plan.items, previousSeqIds);

	for (const item of plan.items) {
		if (item.requirements?.enroll) {
			validateRequirementExpr(
				plan.items,
				itemsById,
				itemIdsByTag,
				itemIdsBySection,
				sectionIds,
				item,
				`Item "${item.id}" enroll requirement`,
				item.requirements.enroll
			);
		}

		if (item.requirements?.complete) {
			validateRequirementExpr(
				plan.items,
				itemsById,
				itemIdsByTag,
				itemIdsBySection,
				sectionIds,
				item,
				`Item "${item.id}" complete requirement`,
				item.requirements.complete
			);
		}
	}

	for (const requirement of plan.requirements?.graduation ?? []) {
		validateGraduationRequirement(
			plan.items,
			itemsById,
			itemIdsByTag,
			itemIdsBySection,
			sectionIds,
			requirement
		);
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
				// Alternative edges (inside any/countOf) are not hard dependencies:
				// a mutually-alternative pair is satisfiable, so it is not a cycle.
				if (edge.kind !== 'direct') continue;
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
	validateReachableTerminalStates(plan.items, itemsById, itemIdsByTag, itemIdsBySection);

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
		plan: normalizedPlan,
		orderedItems: sortItemsBySeqId(plan.items),
		itemsById,
		itemIdsByTag,
		itemIdsBySection,
		dependentEdgesByItemId
	};
};
