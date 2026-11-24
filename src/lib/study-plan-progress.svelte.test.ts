import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import { calculateStudyPlanSnapshot } from './study-plan-progress';
import { courseTypes } from './course-type';
import { place } from './study-plan-helpers';
import type { StudyPlanData } from './study-plan-data';
import { utnFrcuIsi2023 } from '../routes/[slug]/data/utn-frcu-isi-2023';

describe('shared study plan progress', () => {
	it('matches the page session graduation percentage', () => {
		const states = [courseStates.passed, courseStates.taken, courseStates.inProgress];
		let pagePercentage = 0;
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(utnFrcuIsi2023), {
				initialStates: states,
				strictMode: false
			});
			pagePercentage = session.graduation.percentage;
		});
		cleanup();

		const snapshot = calculateStudyPlanSnapshot(utnFrcuIsi2023, states, []);

		expect(snapshot.graduationPercentage).toBe(pagePercentage);
	});

	it('keeps passed courses and grades after an earlier item is retired', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Plan de prueba',
				degreeSlug: 'prueba',
				universityName: 'Universidad de prueba',
				universitySlug: 'prueba'
			},
			sections: [{ id: 'year-1', label: '1er año', year: 1 }],
			items: [
				{
					id: 'algebra',
					seqId: 1,
					kind: 'course',
					name: 'Álgebra',
					type: courseTypes.mandatory,
					placements: [place.year(1)]
				},
				{
					id: 'programacion',
					seqId: 2,
					kind: 'course',
					name: 'Programación',
					type: courseTypes.mandatory,
					placements: [place.year(1)]
				}
			]
		};

		const snapshot = calculateStudyPlanSnapshot(
			plan,
			[courseStates.passed, courseStates.passed, courseStates.notTaken],
			[4, 8, undefined],
			['retirada', 'algebra', 'programacion']
		);

		expect(snapshot.passedCourses).toBe(1);
		expect(snapshot.average).toBe(8);
	});
});
