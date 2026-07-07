// Regenerates the append-only seqId registry from the current plan data.
// Run with: bun scripts/generate-seq-id-registry.ts
// The registry is enforced by src/lib/seq-id-registry.test.ts: renumbering an
// existing seqId fails CI because it would corrupt every shared URL.
import { writeFileSync } from 'node:fs';
import { allStudyPlans } from '../src/routes/[slug]/data/all-study-plans';
import { getStudyPlanDataSlugWithYear } from '../src/lib/study-plan-data';

const registry = Object.fromEntries(
	allStudyPlans
		.map((plan) => {
			const entries = [...plan.items]
				.sort((a, b) => a.seqId - b.seqId)
				.map((item) => [item.id, item.seqId]);
			return [getStudyPlanDataSlugWithYear(plan), Object.fromEntries(entries)] as const;
		})
		.sort(([a], [b]) => a.localeCompare(b))
);

const target = new URL('../src/routes/[slug]/data/seq-id-registry.json', import.meta.url);
writeFileSync(target, JSON.stringify(registry, null, '\t') + '\n');
console.log(`Wrote ${Object.keys(registry).length} plans to seq-id-registry.json`);
