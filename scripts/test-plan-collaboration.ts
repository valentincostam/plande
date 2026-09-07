import { strict as assert } from 'node:assert';
import postgres from 'postgres';
import identities from '../supabase/static-plan-identities.json';
import type { DraftSource } from '../src/lib/collaboration/draft-envelope';
import { requireLocalSupabaseUrl } from './local-supabase-url';

type LocalStatus = {
	API_URL?: unknown;
	SERVICE_ROLE_KEY?: unknown;
	DB_URL?: unknown;
};

type DraftResult = {
	plan_id: string | null;
	disposition: 'created' | 'existing' | 'identity_ambiguous';
	plan_year: number | null;
};

const status = Bun.spawnSync(['bunx', 'supabase', 'status', '-o', 'json'], {
	stdout: 'pipe',
	stderr: 'pipe'
});
if (status.exitCode !== 0)
	throw new Error('Start the local Supabase stack before collaboration tests.');
const local = JSON.parse(new TextDecoder().decode(status.stdout)) as LocalStatus;
const apiUrl = requireLocalSupabaseUrl(local.API_URL);
if (typeof local.SERVICE_ROLE_KEY !== 'string' || typeof local.DB_URL !== 'string')
	throw new Error('Local collaboration tests need local setup credentials.');
if (!process.env.COLLABORATION_DATABASE_URL)
	throw new Error('Root must provide the local restricted collaboration URL in memory.');

const admin = postgres(local.DB_URL, { max: 1, idle_timeout: 5, connect_timeout: 5 });
const collaboration = postgres(process.env.COLLABORATION_DATABASE_URL, {
	max: 2,
	idle_timeout: 5,
	connect_timeout: 5
});
const runId = crypto.randomUUID();
const createdPlanIds = new Set<string>();
const createdActorIds: string[] = [];
const pendingOperations: Promise<unknown>[] = [];

const track = <Value>(operation: Promise<Value>) => {
	pendingOperations.push(operation);
	return operation;
};

const expectRejected = async (operation: Promise<unknown>, message: string) => {
	let rejected = false;
	try {
		await operation;
	} catch {
		rejected = true;
	}
	assert.equal(rejected, true, message);
};

const createActor = async () => {
	const response = await fetch(`${apiUrl}/auth/v1/admin/users`, {
		method: 'POST',
		headers: {
			apikey: local.SERVICE_ROLE_KEY as string,
			Authorization: `Bearer ${local.SERVICE_ROLE_KEY as string}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: `plan-collaboration-${crypto.randomUUID()}@example.test`,
			password: crypto.randomUUID(),
			email_confirm: true
		})
	});
	if (!response.ok) throw new Error('Could not create a controlled collaboration actor.');
	const body = (await response.json()) as { id?: unknown };
	if (typeof body.id !== 'string') throw new Error('Controlled collaboration actor is invalid.');
	createdActorIds.push(body.id);
	return body.id;
};

const createOrFind = async (
	actor: string,
	year: number | null,
	suffix: string,
	sources: DraftSource[] = []
) => {
	const [result] = await collaboration<DraftResult[]>`
		select * from plan_collaboration.create_or_find_draft(
			${`Universidad de prueba ${runId}`},
			${`Facultad de prueba ${runId}`},
			${`Oferta de prueba ${suffix}`},
			${null}, ${null}, ${year}, ${collaboration.json(sources)}, ${actor}::uuid
		)`;
	if (!result) throw new Error('Create draft returned no result.');
	if (result.plan_id) createdPlanIds.add(result.plan_id);
	return result;
};

const cleanup = async () => {
	const failures: unknown[] = [];
	const attempt = async (operation: () => Promise<unknown>) => {
		try {
			await operation();
		} catch (error) {
			failures.push(error);
		}
	};
	if (createdPlanIds.size > 0) {
		const planIds = [...createdPlanIds];
		await attempt(
			async () =>
				admin`delete from plan_collaboration.draft_sources where plan_id = any(${planIds}::uuid[])`
		);
		await attempt(
			async () =>
				admin`delete from plan_collaboration.draft_envelopes where plan_id = any(${planIds}::uuid[])`
		);
		await attempt(
			async () =>
				admin`delete from plan_collaboration.plan_offer_identity where plan_id = any(${planIds}::uuid[])`
		);
		await attempt(
			async () => admin`delete from public.study_plans where id = any(${planIds}::uuid[])`
		);
		await attempt(
			async () =>
				admin`delete from plan_collaboration.academic_offers where university_name = ${`Universidad de prueba ${runId}`}`
		);
	}
	for (const actorId of createdActorIds) {
		await attempt(
			async () =>
				admin`delete from plan_collaboration.student_permissions where subject_id = ${actorId}::uuid`
		);
		await attempt(async () => {
			const response = await fetch(`${apiUrl}/auth/v1/admin/users/${actorId}`, {
				method: 'DELETE',
				headers: {
					apikey: local.SERVICE_ROLE_KEY as string,
					Authorization: `Bearer ${local.SERVICE_ROLE_KEY as string}`
				}
			});
			if (!response.ok) throw new Error('Could not remove a controlled collaboration actor.');
		});
	}
	if (failures.length > 0) throw new Error('Scoped collaboration fixture cleanup failed.');
};

let failure: unknown;
try {
	const fixedPlanIds = Object.values(identities).map(({ planId }) => planId);
	const [seedAudit] = await admin<[{ mapped: number; fixed: number }]>`
		select
			(select count(*)::integer from plan_collaboration.plan_offer_identity) as mapped,
			(select count(*)::integer from plan_collaboration.plan_offer_identity where plan_id = any(${fixedPlanIds}::uuid[])) as fixed
	`;
	assert.deepEqual(
		seedAudit,
		{ mapped: 47, fixed: 47 },
		'All fixed plans need one offer identity.'
	);
	const [seedMismatch] = await admin<[{ count: number }]>`
		select count(*)::integer as count
		from plan_collaboration.plan_offer_identity identity
		join plan_collaboration.academic_offers offer on offer.id = identity.offer_id
		join public.study_plans plan on plan.id = identity.plan_id
		join public.study_plan_snapshots snapshot on snapshot.id = plan.published_snapshot_id
		where offer.university_name is distinct from snapshot.document->'info'->>'universityName'
			or offer.faculty_name is distinct from nullif(snapshot.document->'info'->>'collegeName', '')
			or offer.offer_name is distinct from snapshot.document->'info'->>'degreeName'
			or identity.plan_year is distinct from nullif(snapshot.document->'info'->>'year', '')::integer
	`;
	assert.equal(seedMismatch.count, 0, 'Seeded offer identity must preserve native plan metadata.');

	const actor = await createActor();
	const peer = await createActor();
	const concurrent = await Promise.all([
		track(createOrFind(actor, 2026, 'concurrent')),
		track(createOrFind(peer, 2026, 'concurrent'))
	]);
	assert.equal(
		concurrent[0].plan_id,
		concurrent[1].plan_id,
		'Concurrent known-year creates must converge.'
	);
	assert.deepEqual(
		new Set(concurrent.map((result) => result.disposition)),
		new Set(['created', 'existing']),
		'Concurrent known-year creates need created/existing results.'
	);

	const nullYear = await Promise.all([
		track(createOrFind(actor, null, 'unknown-year')),
		track(createOrFind(peer, null, 'unknown-year'))
	]);
	assert.equal(
		nullYear[0].plan_id,
		nullYear[1].plan_id,
		'Concurrent unknown-year creates must converge.'
	);
	const nullPlanId = nullYear[0].plan_id;
	assert.ok(nullPlanId, 'Unknown-year fixture needs a plan identity.');
	const knownForCollision = await track(createOrFind(peer, 2031, 'unknown-year'));
	assert.ok(knownForCollision.plan_id, 'Known-year collision fixture needs a plan identity.');
	const [collision] = await collaboration<
		Array<{ plan_id: string; disposition: string; conflicting_plan_id: string | null }>
	>`select * from plan_collaboration.set_draft_year(${nullPlanId}::uuid, ${2031}, ${actor}::uuid)`;
	assert.equal(
		collision.disposition,
		'year_conflict',
		'A completed year collision must be recoverable.'
	);
	const [afterCollision] = await collaboration<[{ plan_year: number | null }]>`
		select plan_year from plan_collaboration.read_draft(${nullPlanId}::uuid)
	`;
	assert.equal(
		afterCollision.plan_year,
		null,
		'A collision must not modify the unknown-year draft.'
	);

	const known = await track(createOrFind(actor, 2032, 'known-year'));
	assert.ok(known.plan_id, 'Known-year fixture needs a plan identity.');
	let knownChange: { disposition: string } | undefined;
	let knownChangeRejected = false;
	try {
		[knownChange] = await collaboration<Array<{ disposition: string }>>`
			select disposition from plan_collaboration.set_draft_year(${known.plan_id}::uuid, ${2033}, ${actor}::uuid)
		`;
	} catch {
		knownChangeRejected = true;
	}
	if (!knownChangeRejected)
		assert.notEqual(knownChange?.disposition, 'updated', 'A known plan year cannot change.');
	const [knownAfter] = await collaboration<[{ plan_year: number | null }]>`
		select plan_year from plan_collaboration.read_draft(${known.plan_id}::uuid)
	`;
	assert.equal(knownAfter.plan_year, 2032, 'A known plan year must remain unchanged.');

	const normalizedOffer = `Cóncurrente ${runId}`;
	const sourceFixture: DraftSource[] = [
		{ label: 'Documento compartido', url: 'https://drive.google.com/example' }
	];
	const sourcePlan = await track(createOrFind(actor, 2034, normalizedOffer, sourceFixture));
	assert.ok(sourcePlan.plan_id, 'Source fixture needs a plan identity.');
	const sourceRepeat = await track(createOrFind(peer, 2034, normalizedOffer, []));
	assert.equal(
		sourceRepeat.plan_id,
		sourcePlan.plan_id,
		'Existing drafts keep their stable identity.'
	);
	const [sourceRead] = await collaboration<[{ sources: DraftSource[] }]>`
		select sources from plan_collaboration.read_draft(${sourcePlan.plan_id}::uuid)
	`;
	assert.deepEqual(sourceRead.sources, sourceFixture, 'Existing sources must not be overwritten.');
	const normalized = await collaboration<DraftResult[]>`
		select * from plan_collaboration.create_or_find_draft(
			${`  UNIVERSIDAD   DE PRUEBA ${runId}  `}, ${` facultad   de prueba ${runId} `},
			${`  OFERTA  DE PRUEBA CONCURRENTE ${runId} `}, ${null}, ${null}, ${2034}, ${collaboration.json([])}, ${actor}::uuid
		)`;
	assert.equal(
		normalized[0]?.plan_id,
		sourcePlan.plan_id,
		'Case, accents, and repeated spaces must match one offer.'
	);

	await expectRejected(
		track(
			createOrFind(actor, 2040, 'malformed-source', [{ label: '', url: 'https://example.test' }])
		),
		'Malformed sources must reject.'
	);
	await expectRejected(
		track(createOrFind(crypto.randomUUID(), 2041, 'unknown-actor')),
		'Unknown actors must reject.'
	);
	await admin`insert into plan_collaboration.student_permissions(subject_id, contributions_enabled) values (${peer}::uuid, false) on conflict (subject_id) do update set contributions_enabled = false`;
	await expectRejected(
		track(createOrFind(peer, 2042, 'disabled-actor')),
		'Disabled actors must reject.'
	);

	const [publicSearch] = await admin.begin(async (transaction) => {
		await transaction.unsafe('set local role anon');
		return transaction<Array<{ count: number }>>`
			select count(*)::integer as count from plan_collaboration.search_offers(${`Universidad de prueba ${runId}`})
		`;
	});
	assert.ok(publicSearch.count > 0, 'Anonymous users can search shared offers.');
	const [publicDraft] = await admin.begin(async (transaction) => {
		await transaction.unsafe('set local role authenticated');
		return transaction<Array<{ count: number }>>`
			select count(*)::integer as count from plan_collaboration.read_draft(${nullPlanId}::uuid)
		`;
	});
	assert.equal(publicDraft.count, 1, 'Shared draft links are readable without contributor status.');
	for (const role of ['anon', 'authenticated'] as const) {
		await expectRejected(
			admin.begin(async (transaction) => {
				await transaction.unsafe(`set local role ${role}`);
				return transaction`select * from plan_collaboration.create_or_find_draft('x', 'y', 'z', null, null, null, '[]'::jsonb, ${actor}::uuid)`;
			}),
			`${role} must not execute collaboration mutators.`
		);
	}
	await expectRejected(
		collaboration`select * from public.private_plan_progress limit 1`,
		'The collaboration role must not read private progress.'
	);

	console.log(
		'Collaboration SQL checks passed: seed mapping, creation races, year protections, actor gates, public reads, and role isolation.'
	);
} catch (error) {
	failure = error;
}
try {
	await Promise.allSettled(pendingOperations);
	await cleanup();
} catch (cleanupError) {
	if (!failure) failure = cleanupError;
} finally {
	await Promise.allSettled([collaboration.end({ timeout: 5 }), admin.end({ timeout: 5 })]);
}
if (failure) throw failure;
