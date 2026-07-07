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
		expect(prepared.dependentEdges).toEqual([
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
		expect(prepared.dependentEdges[0]?.kind).toBe('alternative');
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
});
