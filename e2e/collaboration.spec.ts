import { strict as assert } from 'node:assert';
import { createServerClient } from '@supabase/ssr';
import { expect, test, type BrowserContext } from '@playwright/test';
import postgres from 'postgres';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

type LocalStatus = {
	API_URL?: unknown;
	PUBLISHABLE_KEY?: unknown;
	ANON_KEY?: unknown;
	SERVICE_ROLE_KEY?: unknown;
	DB_URL?: unknown;
};

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Set PLANDE_CONTROLLED_COLLABORATION=1 after root enables the local collaboration app.'
);

test.use({ trace: 'off' });

test('a student creates an empty-source draft, reuses it, and shares its unreviewed link', async ({
	page,
	context
}) => {
	const status = spawnSync(
		resolve(process.cwd(), 'node_modules/.bin/supabase'),
		['status', '-o', 'json'],
		{
			encoding: 'utf8',
			stdio: 'pipe'
		}
	);
	if (status.status !== 0)
		throw new Error('Start local Supabase before collaboration browser tests.');
	const local = JSON.parse(status.stdout) as LocalStatus;
	if (
		local.API_URL !== 'http://127.0.0.1:55421' ||
		(typeof local.PUBLISHABLE_KEY !== 'string' && typeof local.ANON_KEY !== 'string') ||
		typeof local.SERVICE_ROLE_KEY !== 'string' ||
		typeof local.DB_URL !== 'string'
	)
		throw new Error('Controlled collaboration tests require local credentials.');

	const apiUrl = local.API_URL;
	const publishableKey = local.PUBLISHABLE_KEY ?? local.ANON_KEY;
	const serviceKey = local.SERVICE_ROLE_KEY;
	const admin = postgres(local.DB_URL, { max: 1, idle_timeout: 5, connect_timeout: 5 });
	const marker = crypto.randomUUID();
	const university = `Universidad de prueba ${marker}`;
	const faculty = `Facultad de prueba ${marker}`;
	const offer = `Oferta de prueba ${marker}`;
	const password = crypto.randomUUID();
	let actorId: string | undefined;
	let planId: string | undefined;
	let failure: unknown;

	const removeFixtures = async () => {
		const candidates = planId
			? [planId]
			: (
					await admin<Array<{ plan_id: string }>>`
						select identity.plan_id
						from plan_collaboration.plan_offer_identity identity
						join plan_collaboration.academic_offers offer on offer.id = identity.offer_id
						where offer.university_name = ${university} and identity.is_draft
					`
				).map((row) => row.plan_id);
		const errors: unknown[] = [];
		const attempt = async (operation: () => Promise<unknown>) => {
			try {
				await operation();
			} catch (error) {
				errors.push(error);
			}
		};
		if (candidates.length > 0) {
			await attempt(
				async () =>
					admin`delete from plan_collaboration.draft_sources where plan_id = any(${candidates}::uuid[])`
			);
			await attempt(
				async () =>
					admin`delete from plan_collaboration.draft_envelopes where plan_id = any(${candidates}::uuid[])`
			);
			await attempt(
				async () =>
					admin`delete from plan_collaboration.plan_offer_identity where plan_id = any(${candidates}::uuid[])`
			);
			await attempt(
				async () => admin`delete from public.study_plans where id = any(${candidates}::uuid[])`
			);
			await attempt(
				async () =>
					admin`delete from plan_collaboration.academic_offers where university_name = ${university}`
			);
		}
		if (actorId) {
			await attempt(
				async () =>
					admin`delete from plan_collaboration.student_permissions where subject_id = ${actorId}::uuid`
			);
			await attempt(async () => {
				const response = await fetch(`${apiUrl}/auth/v1/admin/users/${actorId}`, {
					method: 'DELETE',
					headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
				});
				if (!response.ok) throw new Error('Could not remove controlled collaboration identity.');
			});
		}
		if (errors.length > 0) throw new Error('Controlled collaboration fixture cleanup failed.');
	};

	try {
		const response = await fetch(`${apiUrl}/auth/v1/admin/users`, {
			method: 'POST',
			headers: {
				apikey: serviceKey,
				Authorization: `Bearer ${serviceKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: `collaboration-${crypto.randomUUID()}@example.test`,
				password,
				email_confirm: true
			})
		});
		if (!response.ok) throw new Error('Could not create controlled collaboration identity.');
		const identity = (await response.json()) as { id?: unknown; email?: unknown };
		if (typeof identity.id !== 'string' || typeof identity.email !== 'string')
			throw new Error('Controlled collaboration identity is invalid.');
		actorId = identity.id;

		let cookies: Parameters<BrowserContext['addCookies']>[0] = [];
		const auth = createServerClient(apiUrl, publishableKey, {
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
		const signedIn = await auth.auth.signInWithPassword({
			email: identity.email,
			password
		});
		if (signedIn.error || !signedIn.data.session)
			throw new Error('Controlled collaboration sign-in failed.');
		await context.addCookies(cookies);

		const fillIdentity = async () => {
			await page.getByLabel('Universidad', { exact: true }).fill(university);
			await page.getByLabel('Facultad', { exact: true }).fill(faculty);
			await page.getByLabel('Carrera', { exact: true }).fill(offer);
			await page.getByLabel('Año del plan, si figura en la fuente', { exact: true }).fill('2036');
		};
		await page.goto('/plans/new');
		await fillIdentity();
		await page.getByRole('button', { name: 'Crear o continuar borrador' }).click();
		await expect(page).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
		planId = page.url().split('/').at(-1);
		assert.ok(planId, 'Draft creation must return a stable link.');

		await page.goto('/plans/new');
		await fillIdentity();
		await page.getByRole('button', { name: 'Crear o continuar borrador' }).click();
		await expect(page).toHaveURL(new RegExp(`/draft/${planId}$`));

		const anonymous = await context.browser()!.newContext();
		try {
			const anonymousPage = await anonymous.newPage();
			await anonymousPage.goto('/plans/new');
			await expect(anonymousPage.getByRole('link', { name: 'Volver a Plande' })).toBeVisible();
			await expect(anonymousPage.getByRole('link', { name: 'Iniciá sesión' })).toBeVisible();
			await expect(anonymousPage.getByRole('heading', { name: 'Coincidencias' })).not.toBeVisible();
			await anonymousPage.goto(`/draft/${planId}`);
			await expect(anonymousPage.getByRole('status')).toContainText('borrador sin revisión');
			await expect(anonymousPage.getByRole('heading', { name: offer, exact: true })).toBeVisible();
			await expect(
				anonymousPage.getByRole('heading', { name: 'Fuentes para comparar' })
			).toBeVisible();
		} finally {
			await anonymous.close();
		}
	} catch (error) {
		failure = error;
	}
	try {
		await removeFixtures();
	} catch (cleanupError) {
		if (!failure) failure = cleanupError;
	} finally {
		try {
			await admin.end({ timeout: 5 });
		} catch (endError) {
			if (!failure) failure = endError;
		}
	}
	if (failure) throw failure;
});
