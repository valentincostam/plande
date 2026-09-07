import { allStudyPlans } from '../src/routes/[slug]/data/all-study-plans';
import { studyPlanDataToCatalogEntry } from '../src/lib/study-plan-catalog';
import { getStudyPlanDataSlugWithYear } from '../src/lib/study-plan-data';
import { studyPlanAliases } from '../src/routes/[slug]/data/study-plan-loaders';
import identities from '../supabase/static-plan-identities.json';
import { requireLocalSupabaseUrl } from './local-supabase-url';

const url = requireLocalSupabaseUrl(process.env.SUPABASE_URL);
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!key) throw new Error('Run bun run supabase:seed against the local stack.');

for (const plan of allStudyPlans) {
	const canonicalSlug = getStudyPlanDataSlugWithYear(plan);
	const identity = identities[canonicalSlug as keyof typeof identities];
	if (!identity) throw new Error(`Missing fixed identity for ${canonicalSlug}.`);
	const aliases = studyPlanAliases
		.filter((alias) => alias.canonicalSlug === canonicalSlug)
		.map((alias) => alias.slug);
	const response = await fetch(`${url}/rest/v1/rpc/seed_static_study_plan`, {
		method: 'POST',
		headers: {
			apikey: key,
			Authorization: `Bearer ${key}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			seed_plan_id: identity.planId,
			seed_snapshot_id: identity.snapshotId,
			seed_canonical_slug: canonicalSlug,
			seed_document: plan,
			seed_catalog: studyPlanDataToCatalogEntry(plan),
			seed_aliases: aliases
		})
	});
	if (!response.ok) throw new Error(`Could not seed ${canonicalSlug}: ${await response.text()}`);
}
