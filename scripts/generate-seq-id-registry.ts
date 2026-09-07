// Regenerates every derived study-plan index from all-study-plans.ts.
// Run with: bun run registry:seq
// The registry is enforced by src/lib/seq-id-registry.test.ts: renumbering an
// existing seqId fails CI because it would corrupt every shared URL.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { allStudyPlans } from '../src/routes/[slug]/data/all-study-plans';
import { getStudyPlanDataSlug, getStudyPlanDataSlugWithYear } from '../src/lib/study-plan-data';
import { studyPlanDataToCatalogEntry } from '../src/lib/study-plan-catalog';

const dataDirectory = new URL('../src/routes/[slug]/data/', import.meta.url);
const allStudyPlansSource = readFileSync(new URL('all-study-plans.ts', dataDirectory), 'utf8');
const importsByVariable = new Map(
	[...allStudyPlansSource.matchAll(/import \{ (\w+) \} from '\.\/(.+)';/g)].map((match) => [
		match[1],
		match[2]
	])
);

const planBySlug = new Map(allStudyPlans.map((plan) => [getStudyPlanDataSlugWithYear(plan), plan]));
const importBySlug = new Map<string, { variable: string; path: string }>();
const planArraySource = /export const allStudyPlans:[^=]+\s*=\s*\[([\s\S]*?)\];/.exec(
	allStudyPlansSource
)?.[1];
const planVariables = (planArraySource ?? '')
	.split(',')
	.map((variable) => variable.trim())
	.filter(Boolean);

for (const [index, plan] of allStudyPlans.entries()) {
	const variable = planVariables[index];
	const path = variable && importsByVariable.get(variable);
	if (variable && path) importBySlug.set(getStudyPlanDataSlugWithYear(plan), { variable, path });
}

if (importBySlug.size !== planBySlug.size) {
	throw new Error(`Could not map every plan import (${importBySlug.size}/${planBySlug.size})`);
}

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

const registryTarget = new URL('seq-id-registry.json', dataDirectory);
writeFileSync(registryTarget, JSON.stringify(registry, null, '\t') + '\n');

const catalog = allStudyPlans
	.toSorted((a, b) =>
		getStudyPlanDataSlugWithYear(a).localeCompare(getStudyPlanDataSlugWithYear(b))
	)
	.map((plan) => ({ ...studyPlanDataToCatalogEntry(plan), sources: [], notes: undefined }));
const catalogSource = `import type { StudyPlanCatalogEntry } from '$lib/study-plan';

export const studyPlanCatalog: StudyPlanCatalogEntry[] = ${JSON.stringify(catalog, null, '\t')};
`;
const catalogTarget = new URL('study-plan-catalog.ts', dataDirectory);
writeFileSync(catalogTarget, catalogSource);

const loaderEntries = [...planBySlug.keys()].toSorted().map((slug) => {
	const imported = importBySlug.get(slug)!;
	return `\t'${slug}': () => import('./${imported.path}').then((module) => module.${imported.variable})`;
});

const canonicalByShortSlug = new Map<string, string>();
for (const plan of allStudyPlans.toSorted((a, b) => (b.info.year ?? 0) - (a.info.year ?? 0))) {
	const shortSlug = getStudyPlanDataSlug(plan);
	canonicalByShortSlug.set(
		shortSlug,
		canonicalByShortSlug.get(shortSlug) ?? getStudyPlanDataSlugWithYear(plan)
	);
}
const aliasEntries = [...canonicalByShortSlug]
	.filter(([shortSlug, canonicalSlug]) => shortSlug !== canonicalSlug)
	.toSorted(([a], [b]) => a.localeCompare(b))
	.map(([shortSlug, canonicalSlug]) => `\t'${shortSlug}': '${canonicalSlug}'`);

const loadersSource = `import type { StudyPlanData } from '$lib/study-plan-data';

type StudyPlanLoader = () => Promise<StudyPlanData>;

const studyPlanLoaders: Record<string, StudyPlanLoader> = {
${loaderEntries.join(',\n')}
};

export const studyPlanSlugs = Object.keys(studyPlanLoaders);

const canonicalSlugByShortSlug: Record<string, string> = {
${aliasEntries.join(',\n')}
};

export const getCanonicalStudyPlanSlug = (slug: string) =>
\tcanonicalSlugByShortSlug[slug.toLowerCase()] ?? slug.toLowerCase();

export const studyPlanAliases = Object.entries(canonicalSlugByShortSlug).map(
\t([slug, canonicalSlug]) => ({ slug, canonicalSlug })
);

export const loadStudyPlan = async (slug: string) =>
\tstudyPlanLoaders[getCanonicalStudyPlanSlug(slug)]?.();
`;
const loadersTarget = new URL('study-plan-loaders.ts', dataDirectory);
writeFileSync(loadersTarget, loadersSource);

execFileSync(
	'bunx',
	['prettier', '--write', registryTarget.pathname, catalogTarget.pathname, loadersTarget.pathname],
	{
		stdio: 'inherit'
	}
);
console.log(`Wrote registry, catalog and loaders for ${planBySlug.size} plans`);
