import { createServerClient } from '@supabase/ssr';
import { expect, test, type BrowserContext, type Cookie } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { goto as gotoPlan } from './helpers/study-plan';

test.skip(
	process.env.PLANDE_CONTROLLED_AUTH !== '1',
	'Set PLANDE_CONTROLLED_AUTH=1 for local fixtures.'
);
test.use({ trace: 'off' });

test('private progress restores for its owner and stays isolated by plan and account', async ({
	browser
}) => {
	const status = spawnSync('bunx', ['supabase', 'status', '-o', 'json'], { encoding: 'utf8' });
	if (status.status !== 0) throw new Error('Start local Supabase before testing private progress.');
	const local = JSON.parse(status.stdout) as Record<string, string>;
	const apiUrl = local.API_URL;
	const key = local.PUBLISHABLE_KEY ?? local.ANON_KEY;
	const serviceKey = local.SERVICE_ROLE_KEY;
	if (apiUrl !== 'http://127.0.0.1:55421' || !key || !serviceKey)
		throw new Error('Local controlled credentials are unavailable.');
	const users: Array<{ id: string; email: string; password: string }> = [];
	const contexts: BrowserContext[] = [];
	let cleanupFailed = false;
	const createUser = async () => {
		const email = `val24-${crypto.randomUUID()}@example.test`;
		const password = crypto.randomUUID();
		const response = await fetch(`${apiUrl}/auth/v1/admin/users`, {
			method: 'POST',
			headers: {
				apikey: serviceKey,
				authorization: `Bearer ${serviceKey}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({ email, password, email_confirm: true })
		});
		if (!response.ok) throw new Error('Controlled identity creation failed.');
		const body = await response.json();
		users.push({ id: body.id, email, password });
		return users.at(-1)!;
	};
	const signIn = async (user: (typeof users)[number]) => {
		let cookies: Cookie[] = [];
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
						sameSite: 'Lax'
					}));
				}
			}
		});
		const { error } = await client.auth.signInWithPassword({
			email: user.email,
			password: user.password
		});
		if (error) throw new Error('Controlled sign-in failed.');
		const context = await browser.newContext();
		await context.addCookies(cookies);
		contexts.push(context);
		return context;
	};
	try {
		const first = await createUser();
		const second = await createUser();
		const firstContext = await signIn(first);
		const firstPage = await firstContext.newPage();
		await gotoPlan(firstPage, 'uns-dcs-le-2017');
		const control = firstPage.getByRole('combobox', {
			name: 'Estado de Antropología y Salud: No cursada',
			exact: true
		});
		await control.selectOption({ label: 'Aprobada' });
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		const cleanContext = await signIn(first);
		const cleanPage = await cleanContext.newPage();
		await gotoPlan(cleanPage, 'uns-dcs-le-2017');
		await expect(
			cleanPage.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: Aprobada',
				exact: true
			})
		).toBeVisible();
		await firstPage
			.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: Aprobada',
				exact: true
			})
			.selectOption({ label: 'En curso' });
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await cleanPage
			.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: Aprobada',
				exact: true
			})
			.selectOption({ label: 'Regular' });
		await expect(
			cleanPage.getByRole('heading', { name: 'Elegí qué progreso conservar', exact: true })
		).toBeVisible();
		await cleanPage.reload();
		await expect(
			cleanPage.getByRole('heading', { name: 'Elegí qué progreso conservar', exact: true })
		).toBeVisible();
		await cleanPage
			.getByRole('button', {
				name: 'Usar la cuenta para Antropología y Salud: En curso',
				exact: true
			})
			.click();
		await expect(
			cleanPage.getByRole('heading', { name: 'Elegí qué progreso conservar', exact: true })
		).not.toBeVisible();
		await expect(
			cleanPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		const resolvedContext = await signIn(first);
		const resolvedPage = await resolvedContext.newPage();
		await gotoPlan(resolvedPage, 'uns-dcs-le-2017');
		await expect(
			resolvedPage.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: En curso',
				exact: true
			})
		).toBeVisible();
		await gotoPlan(cleanPage, 'utn-frcu-isi-2023');
		await expect(
			cleanPage.getByRole('heading', { name: /Ingeniería en Sistemas de Información/i })
		).toBeVisible();
		const secondContext = await signIn(second);
		const secondPage = await secondContext.newPage();
		await gotoPlan(secondPage, 'uns-dcs-le-2017');
		await expect(
			secondPage.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: No cursada',
				exact: true
			})
		).toBeVisible();
		await secondPage
			.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: No cursada',
				exact: true
			})
			.selectOption({ label: 'Aprobada' });
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await firstContext.addCookies(await secondContext.cookies());
		await firstPage
			.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: En curso',
				exact: true
			})
			.selectOption({ label: 'Regular' });
		await expect(firstPage.getByRole('alert')).toHaveText(
			'La cuenta cambió en otra pestaña. Recargá para continuar.'
		);
		const switchedPage = await firstContext.newPage();
		await gotoPlan(switchedPage, 'uns-dcs-le-2017');
		await expect(
			switchedPage.getByRole('combobox', {
				name: 'Estado de Antropología y Salud: Aprobada',
				exact: true
			})
		).toBeVisible();
	} finally {
		const closed = await Promise.allSettled(contexts.map((context) => context.close()));
		const removed = await Promise.allSettled(
			users.map(({ id }) =>
				fetch(`${apiUrl}/auth/v1/admin/users/${id}`, {
					method: 'DELETE',
					headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}` }
				})
			)
		);
		if (
			closed.some((result) => result.status === 'rejected') ||
			removed.some((result) => result.status !== 'fulfilled' || !result.value.ok)
		) {
			cleanupFailed = true;
		}
	}
	if (cleanupFailed && test.info().status === test.info().expectedStatus)
		expect(cleanupFailed, 'Controlled fixture cleanup failed.').toBe(false);
});
