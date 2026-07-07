import { describe, expect, it } from 'vitest';
import { preparePlan, type SeqIdRegistry } from './prepare-plan';
import { getStudyPlanDataSlugWithYear } from './study-plan-data';
import { allStudyPlans } from '../routes/[slug]/data/all-study-plans';
import registry from '../routes/[slug]/data/seq-id-registry.json';

const registryBySlug = registry as Record<string, SeqIdRegistry>;

// seqIds define the positional meaning of every letter in shared URLs, so
// they are append-only: an existing item may never change or lose its seqId.
// If this test fails after adding items, regenerate the registry with:
// bun scripts/generate-seq-id-registry.ts (and review the diff is append-only).
describe('seqId append-only registry', () => {
	it('covers every plan in the catalog', () => {
		const missing = allStudyPlans
			.map(getStudyPlanDataSlugWithYear)
			.filter((slug) => !(slug in registryBySlug));

		expect(missing).toEqual([]);
	});

	it.each(allStudyPlans.map((plan) => [getStudyPlanDataSlugWithYear(plan), plan] as const))(
		'%s keeps registered seqIds unchanged',
		(slug, plan) => {
			const previousSeqIds = registryBySlug[slug] ?? {};

			expect(() => preparePlan(plan, { previousSeqIds })).not.toThrow();

			for (const [itemId, seqId] of Object.entries(previousSeqIds)) {
				const item = plan.items.find((candidate) => candidate.id === itemId);
				expect(item, `item "${itemId}" was removed from ${slug}; seqIds are append-only`).toBeDefined();
				expect(item?.seqId, `item "${itemId}" changed seqId in ${slug}`).toBe(seqId);
			}
		}
	);
});
