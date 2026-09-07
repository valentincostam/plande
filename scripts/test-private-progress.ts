import { strict as assert } from 'node:assert';
import identities from '../supabase/static-plan-identities.json';
import { requireLocalSupabaseUrl } from './local-supabase-url';

const url = requireLocalSupabaseUrl(process.env.SUPABASE_URL);
const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!key || !serviceKey) throw new Error('Run against local Supabase test credentials.');
const planId = identities['uns-dcs-le-2017'].planId;
const users: Array<{ id: string; email: string; password: string }> = [];
let cleanupFailed = false;
const headers = (token?: string) => ({
	apikey: key,
	...(token ? { authorization: `Bearer ${token}` } : {}),
	'content-type': 'application/json'
});
const api = (path: string, init: RequestInit = {}, token?: string) =>
	fetch(`${url}/rest/v1/${path}`, { ...init, headers: { ...headers(token), ...init.headers } });
const create = async () => {
	const email = `val24-api-${crypto.randomUUID()}@example.test`;
	const password = crypto.randomUUID();
	const response = await fetch(`${url}/auth/v1/admin/users`, {
		method: 'POST',
		headers: {
			apikey: serviceKey,
			authorization: `Bearer ${serviceKey}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ email, password, email_confirm: true })
	});
	if (!response.ok) throw new Error('Controlled user creation failed.');
	const body = await response.json();
	users.push({ id: body.id, email, password });
	return users.at(-1)!;
};
const token = async (user: (typeof users)[number]) => {
	const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({ email: user.email, password: user.password })
	});
	if (!response.ok) throw new Error('Controlled sign-in failed.');
	return (await response.json()).access_token as string;
};
const rpc = (accessToken: string, expected: number | null, items: unknown) =>
	api(
		'rpc/private_progress_save',
		{
			method: 'POST',
			body: JSON.stringify({ p_plan_id: planId, p_expected_version: expected, p_items: items })
		},
		accessToken
	);
try {
	const first = await create(),
		second = await create();
	const a = await token(first),
		b = await token(second);
	const documentResponse = await api(
		`study_plan_published?slug=eq.uns-dcs-le-2017&select=document`
	);
	assert.equal(documentResponse.status, 200);
	const [published] = await documentResponse.json();
	const course = published.document.items.find((item: { kind: string }) => item.kind === 'course');
	const milestone = published.document.items.find(
		(item: { kind: string }) => item.kind === 'milestone'
	);
	assert.ok(course, 'Published fixture needs a course.');
	const item = [{ itemId: course.id, state: 'passed', grade: 8 }];
	assert.equal((await rpc(a, -1, item)).status, 200);
	assert.equal((await rpc(a, 0, item)).status, 200);
	assert.notEqual((await rpc(a, 0, item)).status, 200);
	assert.notEqual((await rpc(a, null, item)).status, 200);
	assert.notEqual((await rpc(a, 1, [{ itemId: 'unknown', state: 'passed' }])).status, 200);
	assert.notEqual(
		(await rpc(a, 1, [{ itemId: course.id, state: 'passed', grade: 3 }])).status,
		200
	);
	if (milestone)
		assert.notEqual(
			(await rpc(a, 1, [{ itemId: milestone.id, state: 'completed', grade: 8 }])).status,
			200
		);
	const own = await api(
		`private_plan_progress?plan_id=eq.${planId}&select=version,private_progress_items(item_id,state,grade)`,
		{},
		a
	);
	assert.equal(own.status, 200);
	assert.deepEqual(await own.json(), [
		{ version: 1, private_progress_items: [{ item_id: course.id, state: 'passed', grade: 8 }] }
	]);
	const other = await api(`private_plan_progress?plan_id=eq.${planId}&select=version`, {}, b);
	assert.equal(other.status, 200);
	assert.deepEqual(await other.json(), []);
	assert.notEqual(
		(await api(`private_plan_progress?plan_id=eq.${planId}&select=version`)).status,
		200
	);
	assert.notEqual(
		(
			await api('rpc/private_progress_save', {
				method: 'POST',
				body: JSON.stringify({ p_plan_id: planId, p_expected_version: -1, p_items: item })
			})
		).status,
		200
	);
	assert.ok(
		(
			await api(
				'private_plan_progress',
				{ method: 'POST', body: JSON.stringify({ plan_id: planId, owner_id: first.id }) },
				a
			)
		).status >= 400
	);
	assert.ok(
		(
			await api(
				'private_progress_items',
				{
					method: 'POST',
					body: JSON.stringify({
						plan_id: planId,
						owner_id: first.id,
						item_id: course.id,
						item_kind: 'course',
						state: 'passed'
					})
				},
				a
			)
		).status >= 400
	);
	assert.ok(
		(
			await api(
				`private_plan_progress?plan_id=eq.${planId}`,
				{ method: 'PATCH', body: JSON.stringify({ version: 999 }) },
				a
			)
		).status >= 400
	);
	const unchanged = await api(`private_plan_progress?plan_id=eq.${planId}&select=version`, {}, a);
	assert.deepEqual(await unchanged.json(), [{ version: 1 }]);
	console.log(
		'Private progress API: owner versioning, stale/null/unknown rejection and direct-write denial passed.'
	);
} finally {
	const cleanup = await Promise.allSettled(
		users.map(({ id }) =>
			fetch(`${url}/auth/v1/admin/users/${id}`, {
				method: 'DELETE',
				headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}` }
			})
		)
	);
	cleanupFailed = cleanup.some((result) => result.status !== 'fulfilled' || !result.value.ok);
}
if (cleanupFailed) throw new Error('Controlled identity cleanup failed.');
