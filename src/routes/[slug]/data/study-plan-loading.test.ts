import { describe, expect, it } from 'vitest';
import { getStudyPlanDataSlugWithYear } from '$lib/study-plan-data';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import { allStudyPlans } from './all-study-plans';
import { studyPlanCatalog } from './study-plan-catalog';
import { getCanonicalStudyPlanSlug, loadStudyPlan, studyPlanSlugs } from './study-plan-loaders';
import { createSupabaseStudyPlanReader, parseStudyPlanDocument } from './study-plan-reader.server';

describe('lightweight study plan loading', () => {
	it('preserves every native static document through runtime parsing', () => {
		for (const plan of allStudyPlans) {
			const document: unknown = JSON.parse(JSON.stringify(plan));
			expect(parseStudyPlanDocument(document)).toEqual(document);
		}
	});

	it('rejects course-only fields on a milestone', () => {
		const malformed = {
			info: {
				degreeName: 'Test',
				degreeSlug: 'test',
				universityName: 'Test',
				universitySlug: 'test'
			},
			sections: [],
			items: [
				{
					id: 'milestone',
					seqId: 0,
					name: 'Milestone',
					kind: 'milestone',
					placements: [],
					type: 'mandatory'
				}
			]
		};
		expect(() => parseStudyPlanDocument(malformed)).toThrow(
			'Supabase returned an invalid study plan document.'
		);
	});

	it('rejects a course whose required type is missing', () => {
		const malformed = {
			info: {
				degreeName: 'Test',
				degreeSlug: 'test',
				universityName: 'Test',
				universitySlug: 'test'
			},
			sections: [{ id: 'core', label: 'Core' }],
			items: [
				{
					id: 'course',
					seqId: 0,
					name: 'Course',
					kind: 'course',
					placements: [{ sectionId: 'core' }]
				}
			]
		};

		expect(() => parseStudyPlanDocument(malformed)).toThrow(
			'Supabase returned an invalid study plan document.'
		);
	});

	it('rejects a Supabase document before it reaches the native engine when its shape is invalid', () => {
		expect(() => parseStudyPlanDocument({ info: {}, sections: [], items: {} })).toThrow(
			'Supabase returned an invalid study plan document.'
		);
	});

	it('rejects an invalid nested Supabase requirement', () => {
		const plan = structuredClone(allStudyPlans[0]);
		plan.items[0].requirements = {
			enroll: { type: 'item', itemId: plan.items[1].id, state: 'not-a-state' as never }
		};

		expect(() => parseStudyPlanDocument(plan)).toThrow(
			'Supabase returned an invalid study plan document.'
		);
	});

	it('keeps a missing Supabase plan missing instead of loading the static module', async () => {
		const reader = createSupabaseStudyPlanReader(async () => []);

		await expect(reader.loadPlan('uns-dcs-le-2017')).resolves.toBeUndefined();
	});

	it('loads stable progress positions with the same published document', async () => {
		const document = allStudyPlans[0];
		const order = [
			'retired-item',
			...[...document.items].sort((a, b) => a.seqId - b.seqId).map((item) => item.id)
		];
		const reader = createSupabaseStudyPlanReader(async () => [
			{
				document,
				progress_item_order: order,
				snapshot_id: 'a965723c-9bc9-4283-8c40-3120f5ce8bcb',
				progress_item_kinds: Object.fromEntries([
					['retired-item', 'course'],
					...document.items.map((item) => [item.id, item.kind])
				])
			}
		]);
		await expect(reader.loadPlanWithProgress('plan')).resolves.toMatchObject({
			document,
			progressItemIds: order,
			progressItemKinds: expect.objectContaining({ 'retired-item': 'course' }),
			snapshotId: 'a965723c-9bc9-4283-8c40-3120f5ce8bcb'
		});
		const invalid = createSupabaseStudyPlanReader(async () => [
			{ document, progress_item_order: ['retired-item'] }
		]);
		await expect(invalid.loadPlanWithProgress('plan')).rejects.toThrow('Progress positions');
		for (const kinds of [
			{},
			{
				...Object.fromEntries(document.items.map((item) => [item.id, item.kind])),
				'retired-item': null
			}
		]) {
			const invalidKinds = createSupabaseStudyPlanReader(async () => [
				{ document, progress_item_order: order, progress_item_kinds: kinds }
			]);
			await expect(invalidKinds.loadPlanWithProgress('plan')).rejects.toThrow();
		}
	});

	it('keeps one lightweight entry per plan', () => {
		expect(studyPlanCatalog).toHaveLength(47);
		expect(studyPlanSlugs).toHaveLength(47);
		expect(studyPlanCatalog.every((entry) => !('items' in entry))).toBe(true);
		expect(studyPlanCatalog.map(({ sources: _, notes: __, ...entry }) => entry)).toEqual(
			allStudyPlans
				.map(studyPlanDataToCatalogEntry)
				.sort((a, b) =>
					getStudyPlanDataSlugWithYear({ info: a, sections: [], items: [] }).localeCompare(
						getStudyPlanDataSlugWithYear({ info: b, sections: [], items: [] })
					)
				)
				.map(({ sources: _, notes: __, ...entry }) => entry)
		);
	});

	it('loads only the requested canonical plan module', async () => {
		const plan = await loadStudyPlan('uns-dcs-le-2017');

		expect(plan && getStudyPlanDataSlugWithYear(plan)).toBe('uns-dcs-le-2017');
	});

	it('resolves short slugs to the newest plan', () => {
		expect(getCanonicalStudyPlanSlug('utn-frba-isi')).toBe('utn-frba-isi-2023');
	});

	it('keeps enough UNLP optative total hours to satisfy its 128-hour requirement', async () => {
		const plan = await loadStudyPlan('unlp-fi-iem-2018');
		const optatives = plan?.items.filter(
			(item) => item.kind === 'course' && item.tags?.includes('optativas')
		);

		expect(optatives).toHaveLength(22);
		expect(
			optatives?.every((item) => item.kind === 'course' && item.totalHours !== undefined)
		).toBe(true);
		expect(
			optatives?.reduce(
				(total, item) => total + (item.kind === 'course' ? (item.totalHours ?? 0) : 0),
				0
			)
		).toBe(1728);
	});
});
