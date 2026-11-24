import { describe, expect, it } from 'vitest';
import { courseStates } from './course-state';
import { milestoneStates } from './study-plan-data';
import { preparePlan } from './prepare-plan';
import { PlanSession } from './plan-session.svelte';
import { decodeItemStates, sortItemsBySeqId } from './study-plan-url-state';
import { decodeGrades, encodeGrades } from './grade-encoding';
import { unsDcsLe2017 } from '../routes/[slug]/data/uns-dcs-le-2017';

// Golden fixture derived from production data on main (commit a29fd3d,
// src/routes/[slug]/data/uns-dcs-le-2017.ts): the exact order of the legacy
// `courses` array, which defined the positional meaning of every letter in
// shared `s=`/`n=` URL params. Item 4586 (English exam) was a course at
// 0-based index 30 on main and is a milestone with seqId 31 on this branch.
const legacyCourseIdOrder = [
	'20084',
	'1093',
	'20083',
	'20085',
	'4511',
	'4843',
	'20086',
	'4526',
	'1293',
	'1362',
	'4842',
	'20087',
	'1129',
	'20021',
	'20088',
	'20095',
	'20089',
	'2155',
	'20028',
	'20100',
	'20101',
	'2158',
	'7677',
	'20090',
	'20099',
	'20091',
	'2366',
	'5914',
	'20098',
	'4546',
	'4586',
	'20093',
	'20094',
	'20031',
	'20092',
	'20096'
];

const inEffectRoot = <T>(run: () => T): T => {
	let result: T;
	const cleanup = $effect.root(() => {
		result = run();
	});
	cleanup();
	return result!;
};

describe('legacy URL compatibility (uns-dcs-le-2017)', () => {
	it('keeps the legacy positional order and appends new items', () => {
		const orderedIds = sortItemsBySeqId(unsDcsLe2017.items).map((item) => item.id);
		expect(orderedIds.slice(0, legacyCourseIdOrder.length)).toEqual(legacyCourseIdOrder);
		expect(orderedIds.slice(legacyCourseIdOrder.length)).toEqual(['titulo-intermedio-enfermero']);
	});

	it('decodes a legacy URL created before item 4586 became a milestone', () => {
		// Legacy letters: indices 0-30 passed ('a' x31), then taken, inProgress,
		// passed, notTaken, taken for the last five courses.
		const legacyLetters = 'a'.repeat(31) + 'reanr';

		const session = inEffectRoot(
			() =>
				new PlanSession(preparePlan(unsDcsLe2017), {
					initialStates: decodeItemStates(legacyLetters),
					strictMode: false
				})
		);

		const stateOf = (id: string) => session.itemsById.get(id)?.state;

		// Index 30 was the English exam course on main; it must land on the
		// milestone (passed -> completed), not shift onto the next course.
		expect(session.itemsById.get('4586')?.def.kind).toBe('milestone');
		expect(stateOf('4586')).toBe(milestoneStates.completed);
		expect(stateOf('4546')).toBe(courseStates.passed);
		expect(stateOf('20093')).toBe(courseStates.taken);
		expect(stateOf('20094')).toBe(courseStates.inProgress);
		expect(stateOf('20031')).toBe(courseStates.passed);
		expect(stateOf('20092')).toBe(courseStates.notTaken);
		expect(stateOf('20096')).toBe(courseStates.taken);
	});

	it('round-trips states through serializeStates/applySerializedStates', () => {
		const { encoded, reapplied } = inEffectRoot(() => {
			const session = new PlanSession(preparePlan(unsDcsLe2017), { strictMode: false });
			session.itemsById.get('20084')!.state = courseStates.passed;
			session.itemsById.get('4586')!.state = milestoneStates.completed;
			session.itemsById.get('20096')!.state = courseStates.taken;

			const serialized = session.serializeStates();

			const other = new PlanSession(preparePlan(unsDcsLe2017), { strictMode: false });
			other.applySerializedStates(serialized);

			return {
				encoded: serialized,
				reapplied: {
					course: other.itemsById.get('20084')?.state,
					milestone: other.itemsById.get('4586')?.state,
					last: other.itemsById.get('20096')?.state,
					untouched: other.itemsById.get('1093')?.state
				}
			};
		});

		expect(encoded.length).toBeGreaterThan(0);
		expect(reapplied.course).toBe(courseStates.passed);
		expect(reapplied.milestone).toBe(milestoneStates.completed);
		expect(reapplied.last).toBe(courseStates.taken);
		expect(reapplied.untouched).toBe(courseStates.notTaken);
	});

	it('aligns grade indices with the legacy full-array positions', () => {
		// Grade letters are indexed like states: over ALL items. A grade at
		// index 31 belonged to course 20093 on main and must still land there.
		const grades: (number | undefined)[] = [];
		grades[0] = 8;
		grades[31] = 10;

		const session = inEffectRoot(
			() =>
				new PlanSession(preparePlan(unsDcsLe2017), {
					initialGrades: grades,
					strictMode: false
				})
		);

		expect(session.itemsById.get('20084')?.grade).toBe(8);
		expect(session.itemsById.get('20093')?.grade).toBe(10);
		expect(session.itemsById.get('4586')?.grade).toBeUndefined();
	});

	it('keeps saved URL progress in stable positions after a course is removed and restored', () => {
		const reopened = inEffectRoot(() => {
			const original = new PlanSession(preparePlan(unsDcsLe2017), { strictMode: false });
			original.itemsById.get('20099')!.state = courseStates.passed;
			original.itemsById.get('20099')!.grade = 8;
			original.itemsById.get('20091')!.state = courseStates.taken;
			original.itemsById.get('20100')!.state = courseStates.passed;
			original.itemsById.get('20100')!.grade = 9;

			const savedStates = original.serializeStates();
			const savedGrades = encodeGrades(
				original.items.map((item) => (item.def.kind === 'course' ? item.grade : undefined))
			);
			const revised = structuredClone(unsDcsLe2017);
			revised.items = revised.items.filter((item) => item.id !== '20100');

			const progressItemIds = original.items.map((item) => item.def.id);
			const revisedSession = new PlanSession(preparePlan(revised), {
				progressItemIds,
				initialStates: decodeItemStates(savedStates),
				initialGrades: decodeGrades(savedGrades),
				strictMode: false
			});
			revisedSession.applyGrades(JSON.parse(JSON.stringify(decodeGrades(savedGrades))));
			expect(revisedSession.itemsById.get('20084')?.grade).toBeUndefined();
			expect(revisedSession.itemsById.get('20099')?.state).toBe(courseStates.passed);
			expect(revisedSession.itemsById.get('20099')?.grade).toBe(8);
			return new PlanSession(preparePlan(unsDcsLe2017), {
				progressItemIds,
				initialStates: decodeItemStates(revisedSession.serializeStates()),
				initialGrades: revisedSession.serializeGrades(),
				strictMode: false
			});
		});

		expect(reopened.itemsById.get('20099')?.state).toBe(courseStates.passed);
		expect(reopened.itemsById.get('20099')?.grade).toBe(8);
		expect(reopened.itemsById.get('20091')?.state).toBe(courseStates.taken);
		expect(reopened.itemsById.get('20100')?.state).toBe(courseStates.passed);
		expect(reopened.itemsById.get('20100')?.grade).toBe(9);
	});
});
