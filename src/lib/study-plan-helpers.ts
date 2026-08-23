import type {
	GraduationRequirement,
	Placement,
	RequirementExpr,
	RequirementState,
	RequirementMetric,
	Selector
} from './study-plan-data';
import { getSectionIdForYear } from './study-plan-data';
import type { CourseTerm } from './course-term';
import { courseTypes, type CourseType } from './course-type';

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
	section: (sectionId: string): Selector => ({ type: 'section', sectionId }),
	all: (courseType?: CourseType): Selector => ({ type: 'all', courseType }),
	sections: (sectionIds: string[], term?: CourseTerm): Selector => ({
		type: 'sections',
		sectionIds,
		term
	})
};

export const req = {
	item: (itemId: string, state: RequirementState): RequirementExpr => ({
		type: 'item',
		itemId,
		state
	}),
	all: (...rules: RequirementExpr[]): RequirementExpr => ({ type: 'all', rules }),
	any: (...rules: RequirementExpr[]): RequirementExpr => ({ type: 'any', rules }),
	// Every item matched by the selector must meet the state ("todo 1er año aprobado")
	every: (selector: Selector, state: RequirementState): RequirementExpr => ({
		type: 'percent',
		selector,
		minPercent: 100,
		state
	}),
	countOf: (rules: RequirementExpr[], min: number): RequirementExpr => ({
		type: 'countOf',
		rules,
		min
	}),
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
		metric: RequirementMetric,
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
		metric: RequirementMetric,
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
		metric: RequirementMetric,
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

// Graduation blocks are plain RequirementExprs with a label and a weight.
// weight defaults to the block's totalUnits, except for sum blocks where it
// is required (hour/credit units would otherwise dominate the degree percentage).
export const grad = {
	block: (
		id: string,
		label: string,
		expr: RequirementExpr,
		weight?: number
	): GraduationRequirement => ({ id, label, expr, weight }),
	allMandatory: (id: string, label: string, weight?: number): GraduationRequirement => ({
		id,
		label,
		expr: req.every(select.all(courseTypes.mandatory), 'passed'),
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
		expr: req.item(itemId, state),
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
		expr: req.count(selector, min, state),
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
		expr: req.countTag(tag, min, state),
		weight
	}),
	sum: (
		id: string,
		label: string,
		selector: Selector,
		metric: RequirementMetric,
		min: number,
		state: 'passed' | 'completed',
		weight: number
	): GraduationRequirement => ({
		id,
		label,
		expr: req.sum(selector, metric, min, state),
		weight
	}),
	sumTag: (
		id: string,
		label: string,
		tag: string,
		metric: RequirementMetric,
		min: number,
		state: 'passed' | 'completed',
		weight: number
	): GraduationRequirement => ({
		id,
		label,
		expr: req.sumTag(tag, metric, min, state),
		weight
	})
};
