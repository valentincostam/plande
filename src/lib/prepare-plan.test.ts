import { describe, expect, it } from 'vitest';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import { preparePlan } from './prepare-plan';
import { place, req, select } from './study-plan-helpers';
import type { StudyPlanData } from './study-plan-data';

const createBasePlan = (): StudyPlanData => ({
	info: {
		degreeName: 'Test Degree',
		degreeSlug: 'TD',
		universityName: 'Test University',
		universitySlug: 'TU'
	},
	sections: [
		{ id: 'year-1', label: '1er Ano' },
		{ id: 'year-2', label: '2do Ano' }
	],
	items: [
		{
			id: 'a',
			seqId: 1,
			kind: 'course',
			name: 'A',
			type: courseTypes.mandatory,
			placements: [place.year(1, courseTerms.firstSemester)]
		},
		{
			id: 'b',
			seqId: 2,
			kind: 'course',
			name: 'B',
			type: courseTypes.mandatory,
			placements: [place.year(2, courseTerms.firstSemester)],
			requirements: {
				enroll: req.item('a', 'taken')
			}
		}
	]
});

describe('preparePlan', () => {
	it('indexes items and derives dependent edges', () => {
		const prepared = preparePlan(createBasePlan());

		expect(prepared.itemsById.get('a')?.id).toBe('a');
		expect(prepared.itemIdsBySection.get('year-1')).toEqual(['a']);
		expect(prepared.dependentEdgesByItemId.get('a')).toEqual([
			{
				sourceItemId: 'a',
				targetItemId: 'b',
				requiredFor: 'enroll',
				kind: 'direct'
			}
		]);
	});

	it('derives alternative edges from any()', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.any(req.item('a', 'taken'))
		};

		const prepared = preparePlan(plan);
		expect(prepared.dependentEdgesByItemId.get('a')?.[0]?.kind).toBe('alternative');
	});

	it('rejects milestone references with taken/passed states', () => {
		const plan = createBasePlan();
		plan.items.push({
			id: 'ingles',
			seqId: 99,
			kind: 'milestone',
			name: 'Ingles',
			placements: []
		});
		plan.items[1].requirements = {
			enroll: req.item('ingles', 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/milestone/i);
	});

	it('rejects direct cycles between items', () => {
		const plan = createBasePlan();
		plan.items[0].requirements = {
			enroll: req.item('b', 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/Circular dependency/i);
	});

	it('enforces append-only seqIds when a registry is provided', () => {
		const plan = createBasePlan();
		plan.items[0].seqId = 2;

		expect(() =>
			preparePlan(plan, {
				previousSeqIds: { a: 1, b: 2 }
			})
		).toThrow(/Duplicate seqId/i);
	});

	it('accepts an unchanged item registered with seqId 0', () => {
		const plan = createBasePlan();
		plan.items[0].seqId = 0;

		expect(() => preparePlan(plan, { previousSeqIds: { a: 0, b: 2 } })).not.toThrow();
	});

	it('does not treat mutual any() alternatives as a cycle', () => {
		const plan = createBasePlan();
		plan.items.push({
			id: 'c',
			seqId: 3,
			kind: 'course',
			name: 'C',
			type: courseTypes.mandatory,
			placements: [place.year(1, courseTerms.firstSemester)]
		});
		// A needs B-or-C, B needs A-or-C: satisfiable (take C first)
		plan.items[0].requirements = {
			enroll: req.any(req.item('b', 'passed'), req.item('c', 'passed'))
		};
		plan.items[1].requirements = {
			enroll: req.any(req.item('a', 'passed'), req.item('c', 'passed'))
		};

		expect(() => preparePlan(plan)).not.toThrow();
	});

	it('rejects an unsatisfiable cycle hidden behind any() alternatives', () => {
		const plan = createBasePlan();
		plan.items.push({
			id: 'c',
			seqId: 3,
			kind: 'course',
			name: 'C',
			type: courseTypes.mandatory,
			placements: [place.year(1, courseTerms.firstSemester)],
			requirements: { enroll: req.item('a', 'taken') }
		});
		plan.items[0].requirements = {
			enroll: req.any(req.item('b', 'taken'), req.item('c', 'taken'))
		};
		plan.items[1].requirements = {
			enroll: req.item('a', 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/unsatisfiable dependency/i);
	});

	it('allows count over the all selector on the owner item', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.count(select.all(), 1, 'taken')
		};

		expect(() => preparePlan(plan)).not.toThrow();
	});

	it('rejects sum graduation blocks without an explicit weight', () => {
		const plan = createBasePlan();
		plan.items[0].hours = 5;
		plan.requirements = {
			graduation: [
				{
					id: 'hours',
					label: 'Horas',
					expr: req.sum(select.items('a'), 'hours', 5, 'passed')
				}
			]
		};

		expect(() => preparePlan(plan)).toThrow(/weight/i);
	});

	it('rejects countOf with min above its rule count', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.countOf([req.item('a', 'taken')], 2)
		};

		expect(() => preparePlan(plan)).toThrow(/countOf/i);
	});

	it('rejects non-positive count minimums', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.count(select.items('a'), 0, 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/positive integer/i);
	});

	it('rejects percentages outside 1–100', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.percent(select.items('a'), 101, 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/between 1 and 100/i);
	});

	it('rejects sum selectors containing items without the metric', () => {
		const plan = createBasePlan();
		plan.requirements = {
			graduation: [
				{
					id: 'hours',
					label: 'Horas',
					expr: req.sum(select.items('a'), 'hours', 5, 'passed'),
					weight: 1
				}
			]
		};

		expect(() => preparePlan(plan)).toThrow(/missing metric "hours"/i);
	});

	it('rejects duplicate section ids', () => {
		const plan = createBasePlan();
		plan.sections.push({ id: 'year-1', label: 'Duplicada' });

		expect(() => preparePlan(plan)).toThrow(/duplicate section id/i);
	});

	it('rejects every unknown id in a sections selector', () => {
		const plan = createBasePlan();
		plan.items[1].requirements = {
			enroll: req.count(select.sections(['year-1', 'missing']), 1, 'taken')
		};

		expect(() => preparePlan(plan)).toThrow(/unknown section "missing"/i);
	});

	it('rejects unplaced courses', () => {
		const plan = createBasePlan();
		plan.items[0].placements = [];

		expect(() => preparePlan(plan)).toThrow(/course "a" must have a placement/i);
	});

	it('rejects duplicate placements', () => {
		const plan = createBasePlan();
		plan.items[0].placements.push(place.year(1, courseTerms.firstSemester));

		expect(() => preparePlan(plan)).toThrow(/duplicate placement/i);
	});

	it('requires weight when a graduation block contains a nested sum', () => {
		const plan = createBasePlan();
		plan.items[0].hours = 5;
		plan.requirements = {
			graduation: [
				{
					id: 'mixed',
					label: 'Mixto',
					expr: req.all(
						req.sum(select.items('a'), 'hours', 5, 'passed'),
						req.item('b', 'passed')
					)
				}
			]
		};

		expect(() => preparePlan(plan)).toThrow(/weight/i);
	});

	it('rejects count minimums above the matched item count', () => {
		const plan = createBasePlan();
		plan.requirements = {
			graduation: [
				{
					id: 'courses',
					label: 'Materias',
					expr: req.count(select.items('a'), 2, 'passed')
				}
			]
		};

		expect(() => preparePlan(plan)).toThrow(/exceeds its 1 matched items/i);
	});

	it('rejects invalid seqIds', () => {
		const plan = createBasePlan();
		plan.items[0].seqId = -1;

		expect(() => preparePlan(plan)).toThrow(/non-negative integer/i);
	});

	it('rejects non-positive graduation weights', () => {
		const plan = createBasePlan();
		plan.requirements = {
			graduation: [
				{
					id: 'a',
					label: 'A',
					expr: req.item('a', 'passed'),
					weight: 0
				}
			]
		};

		expect(() => preparePlan(plan)).toThrow(/weight must be a positive finite number/i);
	});

	it('derives semantic section years without mutating input', () => {
		const plan = createBasePlan();

		const prepared = preparePlan(plan);

		expect(prepared.plan.sections.map((section) => section.year)).toEqual([1, 2]);
		expect(plan.sections.map((section) => section.year)).toEqual([undefined, undefined]);
	});
});
