import { strict as assert } from 'node:assert';
import { allStudyPlans } from '../src/routes/[slug]/data/all-study-plans';
import { getStudyPlanDataSlugWithYear } from '../src/lib/study-plan-data';
import { studyPlanDataToCatalogEntry } from '../src/lib/study-plan-catalog';
import { studyPlanAliases } from '../src/routes/[slug]/data/study-plan-loaders';
import identities from '../supabase/static-plan-identities.json';
import { requireLocalSupabaseUrl } from './local-supabase-url';

const url = requireLocalSupabaseUrl(process.env.SUPABASE_URL);
const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const setupKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!key || !setupKey) throw new Error('Run bun run test:supabase against the local stack.');

const request = (path: string, init: RequestInit = {}, privileged = false) =>
	fetch(`${url}/rest/v1/${path}`, {
		...init,
		headers: {
			apikey: privileged ? setupKey : key,
			...(privileged ? { Authorization: `Bearer ${setupKey}` } : {}),
			...init.headers
		}
	});
const read = async (path: string) => {
	const response = await request(path);
	assert.equal(response.status, 200, `Public read failed: ${path}`);
	return response.json();
};
const json = (method: string, body: unknown): RequestInit => ({
	method,
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(body)
});
const denied = async (path: string, init?: RequestInit) => {
	const response = await request(path, init);
	assert.ok([401, 403].includes(response.status), `Expected authorization denial: ${path}`);
	assert.equal((await response.json()).code, '42501', `Wrong denial reason: ${path}`);
};

const catalog = await read('study_plan_catalog?select=canonical_slug,catalog&order=canonical_slug');
assert.equal(catalog.length, 47);
assert.equal(allStudyPlans.length, 47);
for (const original of allStudyPlans) {
	const slug = getStudyPlanDataSlugWithYear(original);
	const identity = identities[slug as keyof typeof identities];
	assert.ok(identity, `Missing identity: ${slug}`);
	const rows = await read(`study_plan_published?slug=eq.${slug}&select=document`);
	assert.equal(rows.length, 1, `Missing or duplicated plan: ${slug}`);
	assert.deepEqual(
		rows[0].document,
		JSON.parse(JSON.stringify(original)),
		`Native document parity: ${slug}`
	);
	assert.deepEqual(
		catalog.find((entry: { canonical_slug: string }) => entry.canonical_slug === slug)?.catalog,
		JSON.parse(JSON.stringify(studyPlanDataToCatalogEntry(original))),
		`Metadata parity: ${slug}`
	);
	const plan = await read(
		`study_plans?id=eq.${identity.planId}&select=id,published_snapshot_id,canonical_slug`
	);
	assert.deepEqual(plan, [
		{ id: identity.planId, published_snapshot_id: identity.snapshotId, canonical_slug: slug }
	]);
}
for (const alias of studyPlanAliases) {
	const rows = await read(`study_plan_published?slug=eq.${alias.slug}&select=document`);
	const canonical = await read(
		`study_plan_published?slug=eq.${alias.canonicalSlug}&select=document`
	);
	assert.deepEqual(rows, canonical, `Alias parity: ${alias.slug}`);
}

const hiddenPlanId = '00000000-0000-4000-8000-000000000100';
const hiddenSnapshotId = '00000000-0000-4000-8000-000000000101';
const hiddenSlug = 'plande-local-private-test-fixture';
const fixture = async (table: string, body: unknown) => {
	const response = await request(
		table,
		{
			...json('POST', body),
			headers: { 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates' }
		},
		true
	);
	assert.ok(response.ok, `Cannot install local publication-filter fixture: ${table}`);
};
await fixture('study_plans', {
	id: hiddenPlanId,
	canonical_slug: hiddenSlug,
	published_snapshot_id: null
});
await fixture('study_plan_snapshots', {
	id: hiddenSnapshotId,
	plan_id: hiddenPlanId,
	document: { privateMarker: 'unpublished-local-fixture' },
	catalog: {}
});
assert.deepEqual(await read(`study_plans?id=eq.${hiddenPlanId}&select=id`), []);
assert.deepEqual(
	await read(`study_plan_snapshots?id=eq.${hiddenSnapshotId}&select=document,catalog`),
	[]
);
assert.deepEqual(await read(`study_plan_published?slug=eq.${hiddenSlug}&select=document`), []);
await denied('study_plans?select=created_at');
await denied('study_plan_snapshots?select=created_at');
await denied(
	'study_plans',
	json('POST', {
		id: '00000000-0000-4000-8000-000000000001',
		canonical_slug: 'forbidden',
		published_snapshot_id: null
	})
);
await denied(
	`study_plans?id=eq.${hiddenPlanId}`,
	json('PATCH', { canonical_slug: 'forbidden-change' })
);
await denied(`study_plans?id=eq.${hiddenPlanId}`, { method: 'DELETE' });

const original = allStudyPlans[0];
const slug = getStudyPlanDataSlugWithYear(original);
const identity = identities[slug as keyof typeof identities];
const seedBody = {
	seed_plan_id: identity.planId,
	seed_snapshot_id: identity.snapshotId,
	seed_canonical_slug: slug,
	seed_document: original,
	seed_catalog: studyPlanDataToCatalogEntry(original),
	seed_aliases: studyPlanAliases
		.filter((alias) => alias.canonicalSlug === slug)
		.map((alias) => alias.slug)
};
await denied('rpc/seed_static_study_plan', json('POST', seedBody));
const changedSeed = await request(
	'rpc/seed_static_study_plan',
	json('POST', {
		...seedBody,
		seed_document: {
			...original,
			info: { ...original.info, degreeName: 'Forbidden seed replacement' }
		}
	}),
	true
);
assert.equal(changedSeed.ok, false, 'A changed seed must not replace an immutable baseline.');
assert.equal((await changedSeed.json()).code, 'P0001');
const privateUsers = await fetch(`${url}/auth/v1/admin/users`, { headers: { apikey: key } });
assert.ok(
	[401, 403].includes(privateUsers.status),
	'Anonymous clients must not read private Auth users.'
);
console.log(
	'Public API parity: 47 documents, fixed identities, catalog and aliases. RLS, minimal columns, private reads, writes, RPC and changed-seed rejection passed.'
);
