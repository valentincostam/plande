import { strict as assert } from 'node:assert';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { createServerClient } from '@supabase/ssr';
import { expect, test, type BrowserContext, type Cookie } from '@playwright/test';
import postgres from 'postgres';
import { selectOfferField } from './helpers/draft-editor';

type LocalStatus = {
	API_URL?: unknown;
	PUBLISHABLE_KEY?: unknown;
	ANON_KEY?: unknown;
	SERVICE_ROLE_KEY?: unknown;
	DB_URL?: unknown;
};

type Student = {
	id: string;
	email: string;
	password: string;
};

test.skip(
	process.env.PLANDE_CONTROLLED_COLLABORATION !== '1',
	'Set PLANDE_CONTROLLED_COLLABORATION=1 for local controlled draft tests.'
);

test.use({ trace: 'off', actionTimeout: 5000 });

test('two students merge separate draft edits and retain a stale conflicting alternative', async ({
	browser
}) => {
	const status = spawnSync(
		resolve(process.cwd(), 'node_modules/.bin/supabase'),
		['status', '-o', 'json'],
		{ encoding: 'utf8', stdio: 'pipe' }
	);
	if (status.status !== 0) throw new Error('Start local Supabase before controlled draft tests.');
	const local = JSON.parse(status.stdout) as LocalStatus;
	if (
		local.API_URL !== 'http://127.0.0.1:55421' ||
		(typeof local.PUBLISHABLE_KEY !== 'string' && typeof local.ANON_KEY !== 'string') ||
		typeof local.SERVICE_ROLE_KEY !== 'string' ||
		typeof local.DB_URL !== 'string' ||
		!local.DB_URL.includes('127.0.0.1:55422')
	)
		throw new Error(
			'Controlled draft tests require Supabase at 127.0.0.1:55421 and 127.0.0.1:55422.'
		);

	const apiUrl = local.API_URL;
	const publishableKey = local.PUBLISHABLE_KEY ?? local.ANON_KEY;
	const serviceKey = local.SERVICE_ROLE_KEY;
	const admin = postgres(local.DB_URL, { max: 1, idle_timeout: 5, connect_timeout: 5 });
	const marker = crypto.randomUUID();
	const university = `VAL27 Universidad ${marker}`;
	const faculty = `VAL27 Facultad ${marker}`;
	const offer = `VAL27 Carrera ${marker}`;
	const students: Student[] = [];
	const contexts: BrowserContext[] = [];
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

		await attempt(async () => Promise.all(contexts.map((context) => context.close())));
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
		for (const student of students) {
			await attempt(
				async () =>
					admin`delete from plan_collaboration.student_permissions where subject_id = ${student.id}::uuid`
			);
			await attempt(async () => {
				const response = await fetch(`${apiUrl}/auth/v1/admin/users/${student.id}`, {
					method: 'DELETE',
					headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
				});
				if (!response.ok) throw new Error('Could not remove controlled draft identity.');
			});
		}
		if (errors.length > 0) throw new Error('Controlled draft fixture cleanup failed.');
	};

	const createStudent = async () => {
		const student = {
			id: '',
			email: `val27-${crypto.randomUUID()}@example.test`,
			password: crypto.randomUUID()
		};
		const response = await fetch(`${apiUrl}/auth/v1/admin/users`, {
			method: 'POST',
			headers: {
				apikey: serviceKey,
				Authorization: `Bearer ${serviceKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: student.email,
				password: student.password,
				email_confirm: true
			})
		});
		if (!response.ok) throw new Error('Could not create controlled draft identity.');
		const identity = (await response.json()) as { id?: unknown };
		if (typeof identity.id !== 'string') throw new Error('Controlled draft identity is invalid.');
		student.id = identity.id;
		students.push(student);
		return student;
	};

	const signIn = async (student: Student) => {
		let cookies: Cookie[] = [];
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
			email: student.email,
			password: student.password
		});
		if (signedIn.error || !signedIn.data.session)
			throw new Error('Controlled draft sign-in failed.');
		const context = await browser.newContext();
		await context.addCookies(cookies);
		contexts.push(context);
		return context;
	};

	try {
		const firstStudent = await createStudent();
		const secondStudent = await createStudent();
		const firstContext = await signIn(firstStudent);
		const firstPage = await firstContext.newPage();
		const browserErrors: string[] = [];
		firstPage.on('pageerror', (error) => browserErrors.push(error.message));

		await firstPage.goto('/plans/new');
		await selectOfferField(firstPage, 'Universidad', university);
		await selectOfferField(firstPage, 'Facultad o unidad académica', faculty);
		await selectOfferField(firstPage, 'Carrera', offer);
		await firstPage
			.getByLabel('Año del plan, si figura en la fuente', { exact: true })
			.fill('2036');
		await firstPage.getByRole('button', { name: 'Crear o continuar borrador' }).click();
		await expect(firstPage).toHaveURL(/\/draft\/[0-9a-f-]{36}$/);
		planId = firstPage.url().split('/').at(-1);
		assert.ok(planId, 'Draft creation must return a stable link.');
		await firstPage.getByRole('button', { name: '+ Agregar sección', exact: true }).click();
		await firstPage.getByLabel('Título de sección').fill('Base compartida');
		await firstPage.getByRole('button', { name: '+ Materia', exact: true }).click();
		await firstPage.getByLabel('Nombre de materia').fill('Materia compartida');
		await firstPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();

		const secondContext = await signIn(secondStudent);
		const secondPage = await secondContext.newPage();
		secondPage.on('pageerror', (error) => browserErrors.push(error.message));
		await Promise.all([firstPage.reload(), secondPage.goto(`/draft/${planId}`)]);
		await expect(secondPage.getByLabel('Título de sección')).toHaveValue('Base compartida');

		await firstPage.getByLabel('Título de sección').fill('Sección de la primera estudiante');
		await firstPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();
		await secondPage.getByLabel('Nombre de materia').fill('Materia de la segunda estudiante');
		await secondPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();

		const freshContext = await signIn(firstStudent);
		const freshPage = await freshContext.newPage();
		await freshPage.goto(`/draft/${planId}`);
		await expect(freshPage.getByLabel('Título de sección')).toHaveValue(
			'Sección de la primera estudiante'
		);
		await expect(freshPage.getByLabel('Nombre de materia')).toHaveValue(
			'Materia de la segunda estudiante'
		);

		await Promise.all([firstPage.goto(`/draft/${planId}`), secondPage.goto(`/draft/${planId}`)]);
		await firstPage.getByLabel('Nombre de materia').fill('Nombre de la primera estudiante');
		await firstPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();
		await secondPage.getByLabel('Nombre de materia').fill('Alternativa sin guardar de la segunda');
		await secondPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(secondPage.getByRole('alert')).toHaveText('Otro cambio modificó esta sección.');
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Alternativa sin guardar de la segunda'
		);
		const conflictAlternatives = secondPage.getByRole('region', {
			name: 'Elegí qué nombre conservar',
			exact: true
		});
		await expect(
			conflictAlternatives.getByText('Alternativa sin guardar de la segunda', { exact: true })
		).toBeVisible();
		await expect(
			conflictAlternatives.getByText('Nombre de la primera estudiante', { exact: true })
		).toBeVisible();
		await secondPage.reload();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Alternativa sin guardar de la segunda'
		);
		await expect(
			secondPage
				.getByRole('region', { name: 'Elegí qué nombre conservar', exact: true })
				.getByText('Alternativa sin guardar de la segunda', { exact: true })
		).toBeVisible();
		await expect(
			secondPage
				.getByRole('region', { name: 'Elegí qué nombre conservar', exact: true })
				.getByText('Nombre de la primera estudiante', { exact: true })
		).toBeVisible();
		await secondPage
			.getByRole('button', {
				name: 'Usar mi nombre: Alternativa sin guardar de la segunda',
				exact: true
			})
			.click();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Alternativa sin guardar de la segunda'
		);
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Cambios sin guardar' })
		).toBeVisible();
		await secondPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();
		await secondPage.reload();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Alternativa sin guardar de la segunda'
		);
		await expect(
			secondPage.getByRole('region', { name: 'Elegí qué nombre conservar', exact: true })
		).not.toBeVisible();

		await Promise.all([firstPage.goto(`/draft/${planId}`), secondPage.goto(`/draft/${planId}`)]);
		await firstPage
			.getByRole('button', {
				name: 'Acciones de Alternativa sin guardar de la segunda',
				exact: true
			})
			.click();
		await firstPage.getByRole('menuitem', { name: 'Retirar', exact: true }).click();
		await expect(
			firstPage.getByRole('heading', {
				name: 'Retirar Alternativa sin guardar de la segunda',
				exact: true
			})
		).toBeVisible();
		await firstPage.getByRole('button', { name: 'Eliminar del borrador', exact: true }).click();
		await firstPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(firstPage.getByLabel('Nombre de materia')).not.toBeVisible();
		await secondPage.getByLabel('Nombre de materia').fill('Materia recuperada localmente');
		await secondPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(secondPage.getByRole('alert')).toHaveText('Otro cambio modificó esta sección.');
		await secondPage.reload();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Materia recuperada localmente'
		);
		const deletionRecovery = secondPage.getByRole('region', {
			name: 'Recuperá la materia eliminada',
			exact: true
		});
		await expect(
			deletionRecovery.getByText('Materia recuperada localmente', { exact: true })
		).toBeVisible();
		await deletionRecovery
			.getByRole('button', {
				name: 'Recuperar mi materia: Materia recuperada localmente',
				exact: true
			})
			.click();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Materia recuperada localmente'
		);
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Cambios sin guardar' })
		).toBeVisible();
		await secondPage.getByRole('button', { name: 'Guardar cambios', exact: true }).click();
		await expect(
			secondPage.getByRole('status').filter({ hasText: 'Sin cambios pendientes' })
		).toBeVisible();
		await secondPage.reload();
		await expect(secondPage.getByLabel('Nombre de materia')).toHaveValue(
			'Materia recuperada localmente'
		);
		expect(browserErrors).toEqual([]);
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
