import { describe, expect, it } from 'vitest';
import { tick } from 'svelte';
import { courseStates } from './course-state';
import { PlanSession } from './plan-session.svelte';
import { preparePlan } from './prepare-plan';
import { courseTypes } from './course-type';
import { place, req } from './study-plan-helpers';
import { milestoneStates, type StudyPlanData } from './study-plan-data';

const revisedPlan: StudyPlanData = {
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
			placements: [place.year(1)]
		},
		{
			id: 'b',
			seqId: 2,
			kind: 'course',
			name: 'B',
			type: courseTypes.mandatory,
			placements: [place.year(1)],
			requirements: {
				enroll: req.item('a', 'taken'),
				complete: req.item('a', 'passed')
			}
		},
		{
			id: 'milestone',
			seqId: 3,
			kind: 'milestone',
			name: 'Milestone',
			placements: [],
			requirements: { complete: req.item('a', 'passed') }
		}
	]
};

describe('PlanSession', () => {
	it('keeps recorded course grades and milestone completion after requirements are revised', async () => {
		let session: PlanSession | undefined;
		const cleanup = $effect.root(() => {
			session = new PlanSession(preparePlan(revisedPlan), {
				initialStates: [courseStates.notTaken, courseStates.passed, courseStates.passed],
				initialGrades: [undefined, 8, undefined]
			});
		});
		await tick();

		const course = session!.itemsById.get('b')!;
		const milestone = session!.itemsById.get('milestone')!;
		expect(course.state).toBe(courseStates.passed);
		expect(course.grade).toBe(8);
		expect(course.isEnabled).toBe(false);
		expect(milestone.state).toBe(milestoneStates.completed);
		expect(milestone.canComplete).toBe(false);
		cleanup();
	});

	it('rejects a new state that does not meet strict requirements', () => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(revisedPlan));
			const course = session.itemsById.get('b')!;

			course.setState(courseStates.taken);

			expect(course.state).toBe(courseStates.notTaken);
		});
		cleanup();
	});

	it('rejects a new course completion that does not meet strict requirements', () => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(revisedPlan));
			const prerequisite = session.itemsById.get('a')!;
			const course = session.itemsById.get('b')!;
			prerequisite.setState(courseStates.taken);
			course.setState(courseStates.taken);

			expect(course.setState(courseStates.passed)).toBe(false);
			expect(course.state).toBe(courseStates.taken);
		});
		cleanup();
	});

	it('rejects a new milestone completion that does not meet strict requirements', () => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(revisedPlan));
			const milestone = session.itemsById.get('milestone')!;

			expect(milestone.setState(milestoneStates.completed)).toBe(false);
			expect(milestone.state).toBe(milestoneStates.pending);
		});
		cleanup();
	});

	it('allows new course and milestone completions when strict mode is disabled', () => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(revisedPlan), { strictMode: false });

			expect(session.itemsById.get('b')!.setState(courseStates.passed)).toBe(true);
			expect(session.itemsById.get('milestone')!.setState(milestoneStates.completed)).toBe(true);
		});
		cleanup();
	});

	it('restores recorded course and milestone completion from serialized history', async () => {
		let session: PlanSession | undefined;
		const cleanup = $effect.root(() => {
			session = new PlanSession(preparePlan(revisedPlan), {
				initialGrades: [undefined, 8, undefined]
			});
			session.applySerializedStates('naa');
		});
		await tick();

		const course = session!.itemsById.get('b')!;
		const milestone = session!.itemsById.get('milestone')!;
		expect(course.state).toBe(courseStates.passed);
		expect(course.grade).toBe(8);
		expect(course.isEnabled).toBe(false);
		expect(milestone.state).toBe(milestoneStates.completed);
		expect(milestone.canComplete).toBe(false);
		cleanup();
	});

	it('keeps prior states and grades when bulk completion misses an outside prerequisite', async () => {
		let session: PlanSession | undefined;
		const cleanup = $effect.root(() => {
			session = new PlanSession(preparePlan(revisedPlan), {
				initialStates: [courseStates.notTaken, courseStates.taken],
				initialGrades: [undefined, 8]
			});

			expect(session.setCourseStates(['b'], courseStates.passed)).toBe(false);
		});
		await tick();

		expect(session!.itemsById.get('a')!.state).toBe(courseStates.notTaken);
		expect(session!.itemsById.get('b')!.state).toBe(courseStates.taken);
		expect(session!.itemsById.get('b')!.grade).toBe(8);
		cleanup();
	});

	it('passes a selected group with internal requirements regardless of item order', () => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(preparePlan(revisedPlan));

			expect(session.setCourseStates(['b', 'a'], courseStates.passed)).toBe(true);
			expect(session.itemsById.get('a')!.state).toBe(courseStates.passed);
			expect(session.itemsById.get('b')!.state).toBe(courseStates.passed);
		});
		cleanup();
	});
});
