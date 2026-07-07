import { courseStates, isCourseStateGreaterOrEqual } from './course-state';
import type {
	GraduationRequirement,
	ItemState,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector
} from './study-plan-data';
import { milestoneStates } from './study-plan-data';

export type RequirementContextItem = {
	item: PlanItem;
	state: ItemState;
};

export type RequirementContext = {
	getItem: (itemId: string) => RequirementContextItem | undefined;
	getAllItems: () => RequirementContextItem[];
	getItemsByTag: (tag: string) => RequirementContextItem[];
	getItemsBySection: (sectionId: string) => RequirementContextItem[];
};

export type RequirementProgress = {
	completedUnits: number;
	totalUnits: number;
	met: boolean;
};

export type GraduationRequirementResult = {
	id: string;
	label: string;
	completedUnits: number;
	totalUnits: number;
	weight: number;
	weightedCompletedUnits: number;
	weightedTotalUnits: number;
	progress: number;
};

export type GraduationProgress = {
	completedUnits: number;
	totalUnits: number;
	percentage: number;
	blocks: GraduationRequirementResult[];
};

const uniqByItemId = (items: RequirementContextItem[]) => {
	const map = new Map<string, RequirementContextItem>();
	for (const item of items) {
		if (!map.has(item.item.id)) {
			map.set(item.item.id, item);
		}
	}
	return [...map.values()];
};

export const meetsRequirementState = (
	item: PlanItem,
	currentState: ItemState,
	requiredState: RequirementState
) => {
	if (item.kind === 'milestone') {
		return requiredState === 'completed' && currentState === milestoneStates.completed;
	}

	const state = currentState as (typeof courseStates)[keyof typeof courseStates];

	switch (requiredState) {
		case 'inProgress':
			return isCourseStateGreaterOrEqual(state, courseStates.inProgress);
		case 'taken':
			return isCourseStateGreaterOrEqual(state, courseStates.taken);
		case 'passed':
		case 'completed':
			return state === courseStates.passed;
	}
};

const itemHasPlacementIn = (item: PlanItem, sectionIds: string[], term?: string) =>
	item.placements.some(
		(placement) =>
			sectionIds.includes(placement.sectionId) && (term === undefined || placement.term === term)
	);

export const resolveSelector = (
	selector: Selector,
	context: RequirementContext,
	ownerItemId?: string
): RequirementContextItem[] => {
	switch (selector.type) {
		case 'items':
			return uniqByItemId(
				selector.itemIds
					.map((itemId) => context.getItem(itemId))
					.filter((item): item is RequirementContextItem => item !== undefined)
			);
		case 'tag':
			return uniqByItemId(context.getItemsByTag(selector.tag));
		case 'section':
			return uniqByItemId(context.getItemsBySection(selector.sectionId));
		case 'all':
			return uniqByItemId(
				context
					.getAllItems()
					.filter(({ item }) => item.kind === 'course')
					.filter(
						({ item }) => selector.courseType === undefined || item.type === selector.courseType
					)
					.filter(({ item }) => item.id !== ownerItemId)
			);
		case 'sections':
			return uniqByItemId(
				selector.sectionIds
					.flatMap((sectionId) => context.getItemsBySection(sectionId))
					.filter(({ item }) => itemHasPlacementIn(item, selector.sectionIds, selector.term))
			);
	}
};

// Recursive progress semantics per node type:
// - item: 0/1 or 1/1
// - all: sum of children; met when every child is met
// - any: the closest-to-complete alternative (met children win, then highest
//   ratio, then fewest units); met when some child is met
// - count/countOf: min(#met, min) / min
// - percent: min(#met, requiredCount) / requiredCount with
//   requiredCount = ceil(minPercent% of matched items)
// - sum: min(metric sum over met items, min) / min
export const evaluateProgress = (
	expr: RequirementExpr,
	context: RequirementContext,
	ownerItemId?: string
): RequirementProgress => {
	switch (expr.type) {
		case 'item': {
			const match = context.getItem(expr.itemId);
			const met = match ? meetsRequirementState(match.item, match.state, expr.state) : false;
			return { completedUnits: met ? 1 : 0, totalUnits: 1, met };
		}
		case 'all': {
			const children = expr.rules.map((rule) => evaluateProgress(rule, context, ownerItemId));
			return {
				completedUnits: children.reduce((total, child) => total + child.completedUnits, 0),
				totalUnits: children.reduce((total, child) => total + child.totalUnits, 0),
				met: children.every((child) => child.met)
			};
		}
		case 'any': {
			const children = expr.rules.map((rule) => evaluateProgress(rule, context, ownerItemId));
			const ratio = (child: RequirementProgress) =>
				child.totalUnits === 0 ? (child.met ? 1 : 0) : child.completedUnits / child.totalUnits;
			const best = children.reduce((currentBest, child) => {
				if (child.met !== currentBest.met) return child.met ? child : currentBest;
				if (ratio(child) !== ratio(currentBest)) {
					return ratio(child) > ratio(currentBest) ? child : currentBest;
				}
				return child.totalUnits < currentBest.totalUnits ? child : currentBest;
			});
			return { ...best, met: children.some((child) => child.met) };
		}
		case 'count': {
			const items = resolveSelector(expr.selector, context, ownerItemId);
			const metCount = items.filter((item) =>
				meetsRequirementState(item.item, item.state, expr.state)
			).length;
			return {
				completedUnits: Math.min(metCount, expr.min),
				totalUnits: expr.min,
				met: metCount >= expr.min
			};
		}
		case 'countOf': {
			const metCount = expr.rules.filter(
				(rule) => evaluateProgress(rule, context, ownerItemId).met
			).length;
			return {
				completedUnits: Math.min(metCount, expr.min),
				totalUnits: expr.min,
				met: metCount >= expr.min
			};
		}
		case 'percent': {
			const items = resolveSelector(expr.selector, context, ownerItemId);
			const requiredCount = Math.ceil((expr.minPercent / 100) * items.length);
			const metCount = items.filter((item) =>
				meetsRequirementState(item.item, item.state, expr.state)
			).length;
			if (items.length === 0) {
				return { completedUnits: 0, totalUnits: 0, met: false };
			}
			return {
				completedUnits: Math.min(metCount, requiredCount),
				totalUnits: requiredCount,
				met: metCount >= requiredCount
			};
		}
		case 'sum': {
			const items = resolveSelector(expr.selector, context, ownerItemId);
			const sum = items.reduce((total, item) => {
				if (!meetsRequirementState(item.item, item.state, expr.state)) return total;
				return total + (item.item[expr.metric] ?? 0);
			}, 0);
			return {
				completedUnits: Math.min(sum, expr.min),
				totalUnits: expr.min,
				met: sum >= expr.min
			};
		}
	}
};

export const evaluateRequirement = (
	expr: RequirementExpr | undefined,
	context: RequirementContext,
	ownerItemId?: string
): boolean => {
	if (!expr) return true;
	return evaluateProgress(expr, context, ownerItemId).met;
};

export const evaluateGraduation = (
	requirements: GraduationRequirement[] = [],
	context: RequirementContext
): GraduationProgress => {
	const blocks = requirements.map<GraduationRequirementResult>((requirement) => {
		const { completedUnits, totalUnits, met } = evaluateProgress(requirement.expr, context);
		const progress = totalUnits === 0 ? (met ? 1 : 0) : completedUnits / totalUnits;
		const weight = requirement.weight ?? totalUnits;
		return {
			id: requirement.id,
			label: requirement.label,
			completedUnits,
			totalUnits,
			weight,
			weightedCompletedUnits: progress * weight,
			weightedTotalUnits: weight,
			progress
		};
	});

	const completedUnits = blocks.reduce((total, block) => total + block.weightedCompletedUnits, 0);
	const totalUnits = blocks.reduce((total, block) => total + block.weightedTotalUnits, 0);

	return {
		completedUnits,
		totalUnits,
		percentage: totalUnits === 0 ? 0 : (completedUnits / totalUnits) * 100,
		blocks
	};
};
