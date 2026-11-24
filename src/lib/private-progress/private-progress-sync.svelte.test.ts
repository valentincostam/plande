import { expect, test, vi } from 'vitest';
import { courseStates } from '$lib/course-state';
import { PlanSession } from '$lib/plan-session.svelte';
import { preparePlan } from '$lib/prepare-plan';
import { createPrivateProgressSync } from './private-progress-sync.svelte';

test.each([true, false])(
	'recovers an unsynced retired record while restoring visible items: %s',
	(restoreItems) => {
		const cleanup = $effect.root(() => {
			const session = new PlanSession(
				preparePlan({
					info: {
						degreeName: 'Prueba',
						degreeSlug: 'prueba',
						universityName: 'Universidad',
						universitySlug: 'universidad'
					},
					sections: [{ id: 'basic', label: 'Básica' }],
					items: [
						{
							id: 'current',
							seqId: 1,
							kind: 'course',
							name: 'Actual',
							type: 'mandatory',
							placements: [{ sectionId: 'basic' }]
						}
					]
				}),
				{ progressItemIds: ['retired', 'current'] }
			);
			const sync = createPrivateProgressSync(session, {});
			const retired = { itemId: 'retired', state: 'passed', grade: 8 };
			sync.restoreCache(
				undefined,
				undefined,
				{ version: 0, items: [retired] },
				undefined,
				undefined,
				restoreItems
			);
			expect(sync.cache.privateProgressLocal.items).toContainEqual(retired);
			expect(session.itemsById.has('retired')).toBe(false);
			if (restoreItems) {
				expect(session.serializeStates()).toBe('a');
				expect(session.serializeGrades()).toEqual([8, undefined]);
			}
			sync.dispose();
		});
		cleanup();
	}
);

test('uses an old URL for known retired records without inventing a record', () => {
	const cleanup = $effect.root(() => {
		const session = new PlanSession(
			preparePlan({
				info: {
					degreeName: 'Prueba',
					degreeSlug: 'prueba',
					universityName: 'Universidad',
					universitySlug: 'universidad'
				},
				sections: [{ id: 'basic', label: 'Básica' }],
				items: [
					{
						id: 'current',
						seqId: 1,
						kind: 'course',
						name: 'Actual',
						type: 'mandatory',
						placements: [{ sectionId: 'basic' }]
					}
				]
			}),
			{
				progressItemIds: ['retired-course', 'retired-milestone', 'current'],
				initialStates: [courseStates.passed, courseStates.passed],
				initialGrades: [undefined, 8]
			}
		);
		const sync = createPrivateProgressSync(session, {});
		sync.restoreCache(
			undefined,
			undefined,
			{
				version: 0,
				items: [
					{ itemId: 'retired-course', state: 'taken', grade: 7 },
					{ itemId: 'retired-milestone', state: 'pending' }
				]
			},
			undefined,
			undefined,
			false
		);

		expect(sync.cache.privateProgressLocal.items).toEqual([
			{ itemId: 'current', state: 'notTaken' },
			{ itemId: 'retired-course', state: 'passed' },
			{ itemId: 'retired-milestone', state: 'completed' }
		]);
		sync.dispose();
	});
	cleanup();
});

test('keeps URL-only retired slots local when the account has no record', async () => {
	const fetchMock = vi
		.fn()
		.mockResolvedValue(
			new Response(JSON.stringify({ progress: { version: 0, items: [] } }), { status: 200 })
		);
	vi.stubGlobal('fetch', fetchMock);
	let sync: ReturnType<typeof createPrivateProgressSync> | undefined;
	let session: PlanSession | undefined;
	const cleanup = $effect.root(() => {
		session = new PlanSession(
			preparePlan({
				info: {
					degreeName: 'Prueba',
					degreeSlug: 'prueba',
					universityName: 'Universidad',
					universitySlug: 'universidad'
				},
				sections: [{ id: 'basic', label: 'Básica' }],
				items: [
					{
						id: 'current',
						seqId: 1,
						kind: 'course',
						name: 'Actual',
						type: 'mandatory',
						placements: [{ sectionId: 'basic' }]
					}
				]
			}),
			{
				progressItemIds: ['retired', 'current'],
				initialStates: [courseStates.passed],
				initialGrades: [8]
			}
		);
		sync = createPrivateProgressSync(session, {
			planId: '11111111-1111-4111-8111-111111111111',
			subject: 'owner'
		});
	});

	try {
		await sync!.hydrate();
		expect(session!.serializeStates()).toBe('a');
		expect(session!.serializeGrades()).toEqual([8, undefined]);
		expect(sync!.cache.privateProgressLocal.items).not.toContainEqual(
			expect.objectContaining({ itemId: 'retired' })
		);
		expect(sync!.status).not.toBe('saved');
	} finally {
		sync?.dispose();
		cleanup();
		vi.unstubAllGlobals();
	}
});

test('syncs URL-only retired slots when published kinds are known', async () => {
	const fetchMock = vi.fn((_: RequestInfo | URL, init?: RequestInit) =>
		Promise.resolve(
			new Response(
				JSON.stringify(
					init?.method === 'POST' ? { version: 0 } : { progress: { version: 0, items: [] } }
				),
				{ status: 200 }
			)
		)
	);
	vi.stubGlobal('fetch', fetchMock);
	let sync: ReturnType<typeof createPrivateProgressSync> | undefined;
	const cleanup = $effect.root(() => {
		const session = new PlanSession(
			preparePlan({
				info: {
					degreeName: 'Prueba',
					degreeSlug: 'prueba',
					universityName: 'Universidad',
					universitySlug: 'universidad'
				},
				sections: [{ id: 'basic', label: 'Básica' }],
				items: [
					{
						id: 'current',
						seqId: 1,
						kind: 'course',
						name: 'Actual',
						type: 'mandatory',
						placements: [{ sectionId: 'basic' }]
					}
				]
			}),
			{
				progressItemIds: ['retired-course', 'retired-milestone', 'current'],
				progressItemKinds: { 'retired-course': 'course', 'retired-milestone': 'milestone' },
				initialStates: [courseStates.passed, courseStates.passed],
				initialGrades: [8, 8]
			}
		);
		sync = createPrivateProgressSync(session, {
			planId: '11111111-1111-4111-8111-111111111111',
			subject: 'owner'
		});
	});

	try {
		await sync!.hydrate();
		sync!.sync();
		await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
		const [, init] = fetchMock.mock.calls[1];
		expect(JSON.parse(String(init?.body)).items).toEqual(
			expect.arrayContaining([
				{ itemId: 'retired-course', state: 'passed', grade: 8 },
				{ itemId: 'retired-milestone', state: 'completed' }
			])
		);
	} finally {
		sync?.dispose();
		cleanup();
		vi.unstubAllGlobals();
	}
});

test('hydrates current progress when metadata names a retired item', async () => {
	vi.stubGlobal(
		'fetch',
		vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					progress: {
						version: 1,
						items: [
							{ itemId: 'retired', state: 'passed', grade: 8 },
							{ itemId: 'current', state: 'passed', grade: 9 }
						]
					}
				}),
				{ status: 200 }
			)
		)
	);
	let sync: ReturnType<typeof createPrivateProgressSync> | undefined;
	let session: PlanSession | undefined;
	const cleanup = $effect.root(() => {
		session = new PlanSession(
			preparePlan({
				info: {
					degreeName: 'Prueba',
					degreeSlug: 'prueba',
					universityName: 'Universidad',
					universitySlug: 'universidad'
				},
				sections: [{ id: 'basic', label: 'Básica' }],
				items: [
					{
						id: 'current',
						seqId: 1,
						kind: 'course',
						name: 'Actual',
						type: 'mandatory',
						placements: [{ sectionId: 'basic' }]
					}
				]
			}),
			{ progressItemIds: ['retired', 'current'], progressItemKinds: { retired: 'course' } }
		);
		sync = createPrivateProgressSync(session, {
			planId: '11111111-1111-4111-8111-111111111111',
			subject: 'owner'
		});
	});

	try {
		await sync!.hydrate();
		expect(sync!.conflicts).toEqual([]);
		expect(session!.itemsById.get('current')).toMatchObject({ state: 'passed', grade: 9 });
	} finally {
		sync?.dispose();
		cleanup();
		vi.unstubAllGlobals();
	}
});
