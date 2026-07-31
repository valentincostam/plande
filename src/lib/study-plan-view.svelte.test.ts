import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { courseTypes } from './course-type';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import { req } from './study-plan-helpers';
import type { StudyPlanData } from './study-plan-data';
import { buildStudyPlanView } from './study-plan-view';

describe('study plan view reactivity', () => {
	it('keeps structural identities while reactive leaves update', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Test',
				degreeSlug: 'test',
				universityName: 'Test',
				universitySlug: 'test'
			},
			sections: [{ id: 'year-1', label: '1er Año' }],
			items: [
				{
					id: 'a',
					seqId: 1,
					kind: 'course',
					name: 'A',
					type: courseTypes.mandatory,
					placements: [{ sectionId: 'year-1' }]
				},
				{
					id: 'b',
					seqId: 2,
					kind: 'course',
					name: 'B',
					type: courseTypes.mandatory,
					placements: [{ sectionId: 'year-1' }],
					requirements: { enroll: req.item('a', 'taken') }
				}
			]
		};

		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(plan), { strictMode: false });
			const view = buildStudyPlanView(session);
			const section = view.sections[0];
			const item = section.terms[0].items.find((entry) => entry.item.def.id === 'b')!;
			const node = item.requirementTreeForEnrollment[0];

			expect(node.met).toBe(false);
			session.itemsById.get('a')!.state = courseStates.taken;
			expect(node.met).toBe(true);
			expect(view.sections[0]).toBe(section);
		});
		cleanup();
	});

	it('reuses selector context arrays while exposing current states', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Test',
				degreeSlug: 'test',
				universityName: 'Test',
				universitySlug: 'test'
			},
			sections: [{ id: 'year-1', label: '1er Año' }],
			items: [
				{
					id: 'a',
					seqId: 1,
					kind: 'course',
					name: 'A',
					type: courseTypes.mandatory,
					tags: ['base'],
					placements: [{ sectionId: 'year-1' }]
				}
			]
		};

		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(plan), { strictMode: false });
			const first = session.context.getItemsByTag('base');
			const second = session.context.getItemsByTag('base');

			expect(second).toBe(first);
			session.itemsById.get('a')!.state = courseStates.passed;
			expect(first[0].state).toBe(courseStates.passed);
		});
		cleanup();
	});
});
