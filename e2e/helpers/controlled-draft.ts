import { createServerClient } from '@supabase/ssr';
import type { Browser, BrowserContext, Cookie, Page } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import postgres from 'postgres';

type LocalStatus = {
	API_URL?: unknown;
	PUBLISHABLE_KEY?: unknown;
	ANON_KEY?: unknown;
	SERVICE_ROLE_KEY?: unknown;
	DB_URL?: unknown;
};

export type ControlledStudent = {
	id: string;
	email: string;
	password: string;
};

type ControlledDraftFixture = {
	identity: { university: string; faculty: string; offer: string };
	createStudent: () => Promise<ControlledStudent>;
	openStudentPage: (student: ControlledStudent) => Promise<Page>;
};

export const withControlledDraft = async (
	browser: Browser,
	name: string,
	run: (fixture: ControlledDraftFixture) => Promise<void>
) => {
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
	const identity = {
		university: `${name} Universidad ${marker}`,
		faculty: `${name} Facultad ${marker}`,
		offer: `${name} Carrera ${marker}`
	};
	const students: ControlledStudent[] = [];
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
						where offer.university_name = ${identity.university} and identity.is_draft
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
					admin`delete from plan_collaboration.academic_offers where university_name = ${identity.university}`
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
		const student: ControlledStudent = {
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
		const created = (await response.json()) as { id?: unknown };
		if (typeof created.id !== 'string') throw new Error('Controlled draft identity is invalid.');
		student.id = created.id;
		students.push(student);
		return student;
	};

	const openStudentPage = async (student: ControlledStudent) => {
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
		return context.newPage();
	};

	try {
		await run({
			identity,
			createStudent,
			openStudentPage: async (student) => {
				const page = await openStudentPage(student);
				page.on('framenavigated', () => {
					if (/\/draft\/[0-9a-f-]{36}$/.test(page.url())) planId = page.url().split('/').at(-1);
				});
				return page;
			}
		});
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
};
