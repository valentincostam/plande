import { courseStates, isCourseStateGreaterOrEqual } from './course-state';
import { courseTypes } from './course-type';
import type {
	GraduationRequirement,
	ItemState,
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector
} from './study-plan-data';
import { isCoursePlanItem, milestoneStates, type CoursePlanItem } from './study-plan-data';

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

export const resolveSelector = (
	selector: Selector,
	context: RequirementContext
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
	}
};

export const evaluateRequirement = (
	expr: RequirementExpr | undefined,
	context: RequirementContext
): boolean => {
	if (!expr) return true;

	switch (expr.type) {
		case 'item': {
			const match = context.getItem(expr.itemId);
			return match ? meetsRequirementState(match.item, match.state, expr.state) : false;
		}
		case 'all':
			return expr.rules.every((rule) => evaluateRequirement(rule, context));
		case 'any':
			return expr.rules.some((rule) => evaluateRequirement(rule, context));
		case 'count': {
			const items = resolveSelector(expr.selector, context);
			const metCount = items.filter((item) =>
				meetsRequirementState(item.item, item.state, expr.state)
			).length;
			return metCount >= expr.min;
		}
		case 'percent': {
			const items = resolveSelector(expr.selector, context);
			if (items.length === 0) return false;
			const metCount = items.filter((item) =>
				meetsRequirementState(item.item, item.state, expr.state)
			).length;
			return (metCount / items.length) * 100 >= expr.minPercent;
		}
		case 'sum': {
			const items = resolveSelector(expr.selector, context);
			const sum = items.reduce((total, item) => {
				if (!meetsRequirementState(item.item, item.state, expr.state)) return total;
				return total + (item.item[expr.metric] ?? 0);
			}, 0);
			return sum >= expr.min;
		}
	}
};

const inferGraduationWeight = (
	requirement: GraduationRequirement,
	context: RequirementContext,
	mandatoryCourses: CoursePlanItem[]
) => {
	if (requirement.weight !== undefined) return requirement.weight;

	switch (requirement.type) {
		case 'allMandatory':
			return mandatoryCourses.length;
		case 'item':
			return 1;
		case 'count':
			return requirement.min;
		case 'sum':
			return requirement.min;
	}
};

export const evaluateGraduation = (
	requirements: GraduationRequirement[] = [],
	context: RequirementContext
): GraduationProgress => {
	const allItems = uniqByItemId(context.getAllItems());
	const mandatoryCourses = allItems
		.map(({ item }) => item)
		.filter(
			(item): item is CoursePlanItem =>
				isCoursePlanItem(item) && item.type === courseTypes.mandatory
		);

	const blocks = requirements.map<GraduationRequirementResult>((requirement) => {
		switch (requirement.type) {
			case 'allMandatory': {
				const completedUnits = mandatoryCourses.filter((course) => {
					const current = context.getItem(course.id);
					return current ? meetsRequirementState(course, current.state, 'passed') : false;
				}).length;
				const totalUnits = mandatoryCourses.length;
				const weight = inferGraduationWeight(requirement, context, mandatoryCourses);
				const progress = totalUnits === 0 ? 0 : completedUnits / totalUnits;
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
			}
			case 'item': {
				const current = context.getItem(requirement.itemId);
				const met = current
					? meetsRequirementState(current.item, current.state, requirement.state)
					: false;
				const weight = inferGraduationWeight(requirement, context, mandatoryCourses);
				return {
					id: requirement.id,
					label: requirement.label,
					completedUnits: met ? 1 : 0,
					totalUnits: 1,
					weight,
					weightedCompletedUnits: met ? weight : 0,
					weightedTotalUnits: weight,
					progress: met ? 1 : 0
				};
			}
			case 'count': {
				const items = resolveSelector(requirement.selector, context);
				const completedUnits = Math.min(
					items.filter((item) => meetsRequirementState(item.item, item.state, requirement.state))
						.length,
					requirement.min
				);
				const totalUnits = requirement.min;
				const weight = inferGraduationWeight(requirement, context, mandatoryCourses);
				const progress = totalUnits === 0 ? 0 : completedUnits / totalUnits;
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
			}
			case 'sum': {
				const items = resolveSelector(requirement.selector, context);
				const completedUnits = Math.min(
					items.reduce((total, item) => {
						if (!meetsRequirementState(item.item, item.state, requirement.state)) return total;
						return total + (item.item[requirement.metric] ?? 0);
					}, 0),
					requirement.min
				);
				const totalUnits = requirement.min;
				const weight = inferGraduationWeight(requirement, context, mandatoryCourses);
				const progress = totalUnits === 0 ? 0 : completedUnits / totalUnits;
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
			}
		}
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
