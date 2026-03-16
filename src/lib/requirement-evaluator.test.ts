import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import {
	evaluateGraduation,
	evaluateRequirement,
	type RequirementContext
} from './requirement-evaluator';
import { grad, place, req } from './study-plan-v5-helpers';
import { milestoneStates, type ItemState, type PlanItem } from './study-plan-v5';

type MockState = {
	item: PlanItem;
	state: ItemState;
};

const createContext = (states: MockState[]): RequirementContext => {
	const byId = new Map(states.map((entry) => [entry.item.id, entry]));

	return {
		getItem: (itemId) => {
			const match = byId.get(itemId);
			return match ? { item: match.item, state: match.state } : undefined;
		},
		getAllItems: () => states.map((entry) => ({ item: entry.item, state: entry.state })),
		getItemsByTag: (tag) =>
			states
				.filter((entry) => entry.item.tags?.includes(tag))
				.map((entry) => ({ item: entry.item, state: entry.state })),
		getItemsBySection: (sectionId) =>
			states
				.filter((entry) =>
					entry.item.placements.some((placement) => placement.sectionId === sectionId)
				)
				.map((entry) => ({ item: entry.item, state: entry.state }))
	};
};

const algebra: PlanItem = {
	id: 'algebra',
	seqId: 1,
	kind: 'course',
	name: 'Algebra',
	type: courseTypes.mandatory,
	hours: 10,
	placements: [place.year(1, courseTerms.firstSemester)]
};

const analisis: PlanItem = {
	id: 'analisis',
	seqId: 2,
	kind: 'course',
	name: 'Analisis',
	type: courseTypes.mandatory,
	hours: 10,
	placements: [place.year(1, courseTerms.firstSemester)]
};

const electivaA: PlanItem = {
	id: 'electiva-a',
	seqId: 3,
	kind: 'course',
	name: 'Electiva A',
	type: courseTypes.elective,
	credits: 6,
	tags: ['electivas', 'idioma-latino'],
	placements: [place.year(3, courseTerms.annual)]
};

const electivaB: PlanItem = {
	id: 'electiva-b',
	seqId: 4,
	kind: 'course',
	name: 'Electiva B',
	type: courseTypes.elective,
	credits: 6,
	tags: ['electivas', 'idioma-germanico'],
	placements: [place.year(3, courseTerms.annual)]
};

const ingles: PlanItem = {
	id: 'ingles-e',
	seqId: 99,
	kind: 'milestone',
	name: 'Ingles E',
	placements: []
};

describe('evaluateRequirement', () => {
	it('supports any inside all', () => {
		const context = createContext([
			{ item: algebra, state: courseStates.taken },
			{ item: analisis, state: courseStates.notTaken }
		]);

		const expression = req.all(
			req.any(req.item('algebra', 'taken'), req.item('analisis', 'taken')),
			req.item('algebra', 'taken')
		);

		expect(evaluateRequirement(expression, context)).toBe(true);
	});

	it('supports count and percent selectors', () => {
		const context = createContext([
			{ item: algebra, state: courseStates.passed },
			{ item: analisis, state: courseStates.passed },
			{ item: electivaA, state: courseStates.notTaken }
		]);

		expect(evaluateRequirement(req.countSection('year-1', 2, 'passed'), context)).toBe(true);
		expect(evaluateRequirement(req.percentSection('year-1', 100, 'passed'), context)).toBe(true);
	});

	it('supports sum by credits and milestone completion', () => {
		const context = createContext([
			{ item: electivaA, state: courseStates.passed },
			{ item: electivaB, state: courseStates.passed },
			{ item: ingles, state: milestoneStates.completed }
		]);

		expect(evaluateRequirement(req.sumTag('electivas', 'credits', 12, 'passed'), context)).toBe(
			true
		);
		expect(evaluateRequirement(req.item('ingles-e', 'completed'), context)).toBe(true);
	});
});

describe('evaluateGraduation', () => {
	it('infers default weights and returns partial progress', () => {
		const context = createContext([
			{ item: algebra, state: courseStates.passed },
			{ item: analisis, state: courseStates.notTaken },
			{ item: electivaA, state: courseStates.passed },
			{ item: electivaB, state: courseStates.notTaken },
			{ item: ingles, state: milestoneStates.pending }
		]);

		const result = evaluateGraduation(
			[
				grad.allMandatory('mandatory', 'Materias obligatorias'),
				grad.countTag('electives', 'Electivas', 'electivas', 2, 'passed'),
				grad.item('english', 'Ingles', 'ingles-e', 'completed')
			],
			context
		);

		// weights inferred as 2 mandatory + 2 elective slots + 1 milestone
		expect(result.totalUnits).toBe(5);
		expect(result.completedUnits).toBeCloseTo(2, 5);
		expect(result.percentage).toBeCloseTo(40, 5);
	});
});
