import { createServerClient } from '@supabase/ssr';
import type { Browser, BrowserContext, Cookie, Page } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import postgres from 'postgres';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';

type LocalStatus = {
	API_URL?: unknown;
	PUBLISHABLE_KEY?: unknown;
	ANON_KEY?: unknown;
	SERVICE_ROLE_KEY?: unknown;
	DB_URL?: unknown;
};

export type ControlledStudent = { id: string; email: string; password: string };
export type ControlledPublishedItem = { id: string; name: string };
type ExpectedServerProgress = { itemId: string; state: string; grade: number | null };

type ControlledPublishedPlan = {
	planId: string;
	slug: string;
	originalCourseName: string;
	items: readonly ControlledPublishedItem[];
	createStudent: () => Promise<ControlledStudent>;
	openStudentPage: (student: ControlledStudent) => Promise<Page>;
	openAnonymousPage: () => Promise<Page>;
	snapshotCount: () => Promise<number>;
	assertServerProgress: (
		student: ControlledStudent,
		expected: readonly ExpectedServerProgress[]
	) => Promise<void>;
};

type ControlledPublishedPlanOptions = {
	items?: readonly ControlledPublishedItem[];
	academicContent?: Pick<
		ReturnType<typeof studyPlanDocumentSchema.parse>,
		'sections' | 'items' | 'requirements'
	>;
	displayIdentity?: { university: string; faculty: string; offer: string };
};

export const withControlledPublishedPlan = async (
	browser: Browser,
	name: string,
	run: (fixture: ControlledPublishedPlan) => Promise<void>,
	{
		items = [{ id: 'materia-publicada', name: 'Materia publicada' }],
		academicContent,
		displayIdentity
	}: ControlledPublishedPlanOptions = {}
) => {
	const status = spawnSync(
		resolve(process.cwd(), 'node_modules/.bin/supabase'),
		['status', '-o', 'json'],
		{ encoding: 'utf8', stdio: 'pipe' }
	);
	if (status.status !== 0)
		throw new Error('Start local Supabase before controlled proposal tests.');
	const local = JSON.parse(status.stdout) as LocalStatus;
	if (
		local.API_URL !== 'http://127.0.0.1:55421' ||
		(typeof local.PUBLISHABLE_KEY !== 'string' && typeof local.ANON_KEY !== 'string') ||
		typeof local.SERVICE_ROLE_KEY !== 'string' ||
		typeof local.DB_URL !== 'string' ||
		!local.DB_URL.includes('127.0.0.1:55422')
	)
		throw new Error(
			'Controlled proposal tests require Supabase at 127.0.0.1:55421 and 127.0.0.1:55422.'
		);
	const baseUrl = new URL(process.env.BASE_URL ?? 'http://127.0.0.1:5174');
	if (baseUrl.origin !== 'http://127.0.0.1:5174')
		throw new Error('Controlled proposal tests require BASE_URL http://127.0.0.1:5174.');
	const databaseUrl = new URL(local.DB_URL);
	if (
		databaseUrl.hostname !== '127.0.0.1' ||
		databaseUrl.port !== '55422' ||
		decodeURIComponent(databaseUrl.username) !== 'postgres'
	)
		throw new Error(
			'Controlled proposal tests require the local postgres user at 127.0.0.1:55422.'
		);

	const apiUrl = local.API_URL;
	const publishableKey = local.PUBLISHABLE_KEY ?? local.ANON_KEY;
	const serviceKey = local.SERVICE_ROLE_KEY;
	const admin = postgres(local.DB_URL, { max: 1, idle_timeout: 5, connect_timeout: 5 });
	const marker = crypto.randomUUID();
	const planId = crypto.randomUUID();
	const snapshotId = crypto.randomUUID();
	const offerId = crypto.randomUUID();
	const slug = `val35-propuesta-${marker}`;
	const university = displayIdentity
		? `${displayIdentity.university} · ${marker.slice(0, 6)}`
		: `${name} Universidad ${marker}`;
	const faculty = displayIdentity?.faculty ?? `${name} Facultad ${marker}`;
	const offer = displayIdentity?.offer ?? `${name} Carrera ${marker}`;
	const originalCourseName = items[0]?.name ?? 'Materia publicada';
	const sourceLabel = 'Fuente publicada';
	const sourceUrl = `https://example.test/${marker}`;
	const students: ControlledStudent[] = [];
	const contexts: BrowserContext[] = [];
	const failures: unknown[] = [];

	const document = studyPlanDocumentSchema.parse({
		info: {
			degreeName: offer,
			degreeSlug: `val35-carrera-${marker}`,
			canonicalSlug: slug,
			universityName: university,
			universitySlug: `val35-universidad-${marker}`,
			collegeName: faculty,
			collegeSlug: `val35-facultad-${marker}`,
			year: 2036,
			sources: [{ id: 1, label: sourceLabel, url: sourceUrl }]
		},
		sections: [{ id: 'base', label: 'Formación básica', year: 1 }],
		items: items.map((item, seqId) => ({
			...item,
			seqId,
			kind: 'course' as const,
			type: 'mandatory' as const,
			placements: [{ sectionId: 'base', term: 'firstSemester' as const, order: seqId }]
		})),
		requirements: {},
		...academicContent
	});
	const catalog = studyPlanDataToCatalogEntry(document);

	const removeFixtures = async () => {
		const errors: unknown[] = [];
		const attempt = async (operation: () => Promise<unknown>) => {
			try {
				await operation();
			} catch (error) {
				errors.push(error);
			}
		};

		await attempt(async () => Promise.all(contexts.map((context) => context.close())));
		await attempt(async () =>
			admin.begin(async (sql) => {
				const [fixturePlan] = await sql<Array<{ id: string; canonical_slug: string }>>`
					select id, canonical_slug from public.study_plans
					where id = ${planId}::uuid
				`;
				if (!fixturePlan) return;
				if (fixturePlan.id !== planId || fixturePlan.canonical_slug !== slug)
					throw new Error('Controlled proposal cleanup refused a non-fixture plan.');
				await sql`
					delete from public.private_progress_save_receipts where plan_id = ${planId}::uuid
				`;
				await sql`delete from public.private_progress_items where plan_id = ${planId}::uuid`;
				await sql`delete from public.private_plan_progress where plan_id = ${planId}::uuid`;
				await sql`
					delete from plan_collaboration.draft_discussion_events event
					using plan_collaboration.draft_discussions discussion
					where event.discussion_id = discussion.id and discussion.plan_id = ${planId}::uuid
				`;
				await sql`delete from plan_collaboration.draft_discussions where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_publication_receipts where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.plan_proposals where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_review_checks where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_review_approvals where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_coauthors where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_document_versions where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_placement_identities where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_item_identities where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_sources where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.draft_envelopes where plan_id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.plan_offer_identity where plan_id = ${planId}::uuid`;
				await sql`delete from public.study_plan_aliases where plan_id = ${planId}::uuid`;
				await sql`update public.study_plans set published_snapshot_id = null where id = ${planId}::uuid`;
				await sql`set local session_replication_role = replica`;
				const removedSnapshots = await sql<Array<{ plan_id: string }>>`
					delete from public.study_plan_snapshots where plan_id = ${planId}::uuid returning plan_id
				`;
				await sql`set local session_replication_role = origin`;
				if (
					removedSnapshots.length === 0 ||
					removedSnapshots.some((snapshot) => snapshot.plan_id !== planId)
				)
					throw new Error('Controlled proposal cleanup removed an unexpected snapshot.');
				await sql`delete from public.study_plans where id = ${planId}::uuid`;
				await sql`delete from plan_collaboration.academic_offers where id = ${offerId}::uuid`;
			})
		);
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
				if (!response.ok) throw new Error('Could not remove controlled proposal identity.');
			});
		}
		if (errors.length > 0)
			throw new AggregateError(errors, 'Controlled proposal fixture cleanup failed.');
	};

	const createStudent = async () => {
		const student: ControlledStudent = {
			id: '',
			email: `val35-${crypto.randomUUID()}@example.test`,
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
		if (!response.ok) throw new Error('Could not create controlled proposal identity.');
		const created = (await response.json()) as { id?: unknown };
		if (typeof created.id !== 'string') throw new Error('Controlled proposal identity is invalid.');
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
			throw new Error('Controlled proposal sign-in failed.');
		const context = await browser.newContext();
		await context.addCookies(cookies);
		contexts.push(context);
		return context.newPage();
	};

	const openAnonymousPage = async () => {
		const context = await browser.newContext();
		contexts.push(context);
		return context.newPage();
	};

	const snapshotCount = async () => {
		const [row] = await admin<Array<{ count: string }>>`
			select count(*)::text as count from public.study_plan_snapshots where plan_id = ${planId}::uuid
		`;
		return Number(row?.count);
	};

	const assertServerProgress = async (
		student: ControlledStudent,
		expected: readonly ExpectedServerProgress[]
	) => {
		const actual = await admin<Array<{ item_id: string; state: string; grade: number | null }>>`
			select item_id, state, grade
			from public.private_progress_items
			where owner_id = ${student.id}::uuid and plan_id = ${planId}::uuid
		`;
		const byItemId = new Map(actual.map((item) => [item.item_id, item]));
		if (
			actual.length !== expected.length ||
			expected.some((item) => {
				const saved = byItemId.get(item.itemId);
				return !saved || saved.state !== item.state || saved.grade !== item.grade;
			})
		)
			throw new Error('Controlled proposal server progress did not match its fixture expectation.');
	};

	try {
		await admin.begin(async (sql) => {
			await sql`insert into public.study_plans (id, canonical_slug) values (${planId}::uuid, ${slug})`;
			await sql`
				insert into plan_collaboration.academic_offers(
					id, university_name, faculty_name, offer_name, university_key, faculty_key, offer_key
				) values (
					${offerId}::uuid, ${university}, ${faculty}, ${offer},
					${university.toLowerCase()}, ${faculty.toLowerCase()}, ${offer.toLowerCase()}
				)
			`;
			await sql`
				insert into plan_collaboration.plan_offer_identity(plan_id, offer_id, plan_year, is_draft)
				values (${planId}::uuid, ${offerId}::uuid, 2036, false)
			`;
			await sql`
				insert into public.study_plan_snapshots(id, plan_id, document, catalog)
				values (
					${snapshotId}::uuid, ${planId}::uuid,
					${JSON.stringify(document)}::text::jsonb, ${JSON.stringify(catalog)}::text::jsonb
				)
			`;
			await sql`
				update public.study_plans set published_snapshot_id = ${snapshotId}::uuid where id = ${planId}::uuid
			`;
		});
		await run({
			planId,
			slug,
			originalCourseName,
			items,
			createStudent,
			openStudentPage,
			openAnonymousPage,
			snapshotCount,
			assertServerProgress
		});
	} catch (error) {
		failures.push(error);
	}
	try {
		await removeFixtures();
	} catch (cleanupError) {
		failures.push(cleanupError);
	} finally {
		try {
			await admin.end({ timeout: 5 });
		} catch (endError) {
			failures.push(endError);
		}
	}
	if (failures.length === 1) throw failures[0];
	if (failures.length > 1)
		throw new AggregateError(failures, 'Controlled proposal fixture failed.');
};
