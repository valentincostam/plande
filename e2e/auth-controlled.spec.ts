import { createServerClient } from '@supabase/ssr';
import { expect, test, type BrowserContext } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { goto as gotoPlan, setCourseState } from './helpers/study-plan';

test.skip(
	process.env.PLANDE_CONTROLLED_AUTH !== '1',
	'Set PLANDE_CONTROLLED_AUTH=1 for local Auth fixtures.'
);

test('switching accounts clears the old session and preserves anonymous academic progress', async ({
	page
}) => {
	const status = spawnSync(
		resolve(process.cwd(), 'node_modules/.bin/supabase'),
		['status', '-o', 'json'],
		{ encoding: 'utf8', stdio: 'pipe' }
	);
	if (status.status !== 0) throw new Error('Start local Supabase before testing Auth.');
	const local = JSON.parse(status.stdout) as Record<string, unknown>;
	const apiUrl = local.API_URL;
	const key = local.PUBLISHABLE_KEY ?? local.ANON_KEY;
	const setupKey = local.SERVICE_ROLE_KEY;
	if (
		apiUrl !== 'http://127.0.0.1:55421' ||
		typeof key !== 'string' ||
		typeof setupKey !== 'string'
	)
		throw new Error('Controlled Auth requires local test credentials.');
	const adminHeaders = {
		apikey: setupKey,
		authorization: `Bearer ${setupKey}`,
		'content-type': 'application/json'
	};
	const identities: Array<{ id: string; email: string; password: string }> = [];
	const secrets: string[] = [setupKey];
	const messages: string[] = [];
	const requests: string[] = [];
	page.on('console', (message) => messages.push(message.text()));
	page.on('pageerror', (error) => messages.push(error.message));
	page.on('request', (request) => requests.push(request.url()));
	const assertPrivateValuesAbsent = (text: string) => {
		expect(
			secrets.some((secret) => text.includes(secret)),
			'Private fixture values must not escape'
		).toBe(false);
	};
	const readHome = async (subject: string | null) => {
		const response = await page.goto('/');
		if (!response) throw new Error('Expected a home response.');
		expect(response.status()).toBe(200);
		const html = await response.text();
		assertPrivateValuesAbsent(html);
		for (const identity of identities)
			expect(html.includes(identity.id), 'Only the current verified subject is rendered').toBe(
				identity.id === subject
			);
		if (subject) {
			expect(response.headers()['cache-control']).toContain('private');
			expect(response.headers()['cache-control']).toContain('no-store');
			await expect(page.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible();
		} else {
			await expect(page.getByRole('link', { name: 'Iniciar sesión', exact: true })).toBeVisible();
		}
	};
	const assertSavedProgress = async (state = 'Aprobada') => {
		await gotoPlan(page, 'uns-dcs-le-2017');
		await expect(
			page.getByRole('combobox', {
				name: `Estado de Antropología y Salud: ${state}`,
				exact: true
			})
		).toBeVisible();
	};
	let cleanupFailed = false;
	try {
		for (let index = 0; index < 2; index++) {
			const email = `val23-${crypto.randomUUID()}@example.test`;
			const password = crypto.randomUUID();
			secrets.push(email, password);
			const response = await fetch(`${apiUrl}/auth/v1/admin/users`, {
				method: 'POST',
				headers: adminHeaders,
				body: JSON.stringify({ email, password, email_confirm: true })
			});
			if (!response.ok) throw new Error('Controlled identity creation failed.');
			const identity = await response.json();
			if (typeof identity.id !== 'string')
				throw new Error('Controlled identity response is invalid.');
			identities.push({ id: identity.id, email, password });
		}
		await readHome(null);
		await gotoPlan(page, 'uns-dcs-le-2017');
		await expect(
			page.getByRole('heading', { name: 'Licenciatura en Enfermería', exact: true })
		).toBeVisible();
		await setCourseState(page, 'Antropología y Salud', 'Aprobada');
		await assertSavedProgress();
		for (const identity of identities) {
			let cookies: Parameters<BrowserContext['addCookies']>[0] = [];
			const client = createServerClient(apiUrl, key, {
				cookies: {
					getAll: () => [],
					setAll: (values) => {
						cookies = values.map(({ name, value, options }) => ({
							name,
							value,
							domain: '127.0.0.1',
							path: options.path ?? '/',
							httpOnly: options.httpOnly,
							secure: options.secure,
							sameSite:
								options.sameSite === 'strict' || options.sameSite === true
									? 'Strict'
									: options.sameSite === 'none'
										? 'None'
										: 'Lax'
						}));
					}
				}
			});
			const { data, error } = await client.auth.signInWithPassword({
				email: identity.email,
				password: identity.password
			});
			if (error || !data.session) throw new Error('Controlled sign-in failed.');
			secrets.push(data.session.access_token, data.session.refresh_token);
			await page.context().addCookies(cookies);
			await readHome(identity.id);
			await page.reload();
			await expect(page.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible();
			await assertSavedProgress(identity.id === identities[0].id ? 'Aprobada' : 'No cursada');
			const [signOutResponse] = await Promise.all([
				page.waitForResponse((response) => new URL(response.url()).pathname === '/auth/sign-out'),
				page.getByRole('button', { name: 'Cerrar sesión', exact: true }).click()
			]);
			expect(signOutResponse.status()).toBe(303);
			expect(signOutResponse.headers()['location']).toBe('/');
			expect(signOutResponse.headers()['cache-control']).toContain('no-store');
			await expect(page.getByRole('link', { name: 'Iniciar sesión', exact: true })).toBeVisible();
			await readHome(null);
			await assertSavedProgress();
		}
		assertPrivateValuesAbsent(messages.join('\n'));
		assertPrivateValuesAbsent(requests.join('\n'));
		expect(
			requests.some((url) => /clarity\.ms|vercel-insights|\/_vercel\/insights/.test(url))
		).toBe(false);
	} finally {
		const cleanup = await Promise.allSettled(
			identities.map(async ({ id }) => {
				const response = await fetch(`${apiUrl}/auth/v1/admin/users/${id}`, {
					method: 'DELETE',
					headers: adminHeaders
				});
				if (!response.ok) throw new Error('Controlled identity cleanup failed.');
			})
		);
		cleanupFailed = cleanup.some((result) => result.status === 'rejected');
	}
	if (cleanupFailed) throw new Error('Some controlled identities could not be cleaned up.');
});
