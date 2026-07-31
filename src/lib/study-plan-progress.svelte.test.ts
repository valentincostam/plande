import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import { calculateStudyPlanSnapshot } from './study-plan-progress';
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
});
