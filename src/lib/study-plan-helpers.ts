import type {
	GraduationRequirement,
	Placement,
	RequirementExpr,
	RequirementState,
	Selector
} from './study-plan-data';
import { getSectionIdForYear } from './study-plan-data';
import type { CourseTerm } from './course-term';

export const place = {
	section: (sectionId: string, term?: CourseTerm, order?: number): Placement => ({
		sectionId,
		term,
		order
	}),
	year: (year: number, term?: CourseTerm, order?: number): Placement => ({
		sectionId: getSectionIdForYear(year),
		term,
		order
	})
};

export const select = {
	items: (...itemIds: string[]): Selector => ({ type: 'items', itemIds }),
	tag: (tag: string): Selector => ({ type: 'tag', tag }),
	section: (sectionId: string): Selector => ({ type: 'section', sectionId })
};

export const req = {
	item: (itemId: string, state: RequirementState): RequirementExpr => ({
		type: 'item',
		itemId,
		state
	}),
	all: (...rules: RequirementExpr[]): RequirementExpr => ({ type: 'all', rules }),
	any: (...rules: RequirementExpr[]): RequirementExpr => ({ type: 'any', rules }),
	count: (selector: Selector, min: number, state: RequirementState): RequirementExpr => ({
		type: 'count',
		selector,
		min,
		state
	}),
	countItems: (itemIds: string[], min: number, state: RequirementState): RequirementExpr => ({
		type: 'count',
		selector: select.items(...itemIds),
		min,
		state
	}),
	countTag: (tag: string, min: number, state: RequirementState): RequirementExpr => ({
		type: 'count',
		selector: select.tag(tag),
		min,
		state
	}),
	countSection: (sectionId: string, min: number, state: RequirementState): RequirementExpr => ({
		type: 'count',
		selector: select.section(sectionId),
		min,
		state
	}),
	percent: (selector: Selector, minPercent: number, state: RequirementState): RequirementExpr => ({
		type: 'percent',
		selector,
		minPercent,
		state
	}),
	percentSection: (
		sectionId: string,
		minPercent: number,
		state: RequirementState
	): RequirementExpr => ({
		type: 'percent',
		selector: select.section(sectionId),
		minPercent,
		state
	}),
	sum: (
		selector: Selector,
		metric: 'hours' | 'credits',
		min: number,
		state: RequirementState
	): RequirementExpr => ({
		type: 'sum',
		selector,
		metric,
		min,
		state
	}),
	sumTag: (
		tag: string,
		metric: 'hours' | 'credits',
		min: number,
		state: RequirementState
	): RequirementExpr => ({
		type: 'sum',
		selector: select.tag(tag),
		metric,
		min,
		state
	}),
	sumSection: (
		sectionId: string,
		metric: 'hours' | 'credits',
		min: number,
		state: RequirementState
	): RequirementExpr => ({
		type: 'sum',
		selector: select.section(sectionId),
		metric,
		min,
		state
	})
};

export const grad = {
	allMandatory: (id: string, label: string, weight?: number): GraduationRequirement => ({
		id,
		label,
		type: 'allMandatory',
		weight
	}),
	item: (
		id: string,
		label: string,
		itemId: string,
		state: 'passed' | 'completed',
		weight?: number
	): GraduationRequirement => ({
		id,
		label,
		type: 'item',
		itemId,
		state,
		weight
	}),
	count: (
		id: string,
		label: string,
		selector: Selector,
		min: number,
		state: 'passed' | 'completed',
		weight?: number
	): GraduationRequirement => ({
		id,
		label,
		type: 'count',
		selector,
		min,
		state,
		weight
	}),
	countTag: (
		id: string,
		label: string,
		tag: string,
		min: number,
		state: 'passed' | 'completed',
		weight?: number
	): GraduationRequirement => ({
		id,
		label,
		type: 'count',
		selector: select.tag(tag),
		min,
		state,
		weight
	}),
	sum: (
		id: string,
		label: string,
		selector: Selector,
		metric: 'hours' | 'credits',
		min: number,
		state: 'passed' | 'completed',
		weight?: number
	): GraduationRequirement => ({
		id,
		label,
		type: 'sum',
		selector,
		metric,
		min,
		state,
		weight
	}),
	sumTag: (
		id: string,
		label: string,
		tag: string,
		metric: 'hours' | 'credits',
		min: number,
		state: 'passed' | 'completed',
		weight?: number
	): GraduationRequirement => ({
		id,
		label,
		type: 'sum',
		selector: select.tag(tag),
		metric,
		min,
		state,
		weight
	})
};
