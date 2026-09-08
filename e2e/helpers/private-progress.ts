import { createServerClient } from '@supabase/ssr';
import type { Browser, BrowserContext, Cookie } from '@playwright/test';
import { spawnSync } from 'node:child_process';

export async function createControlledPrivateProgress(browser: Browser) {
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
	const user = async () => {
		const email = `val25-${crypto.randomUUID()}@example.test`;
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
		const created = await response.json();
		users.push({ id: created.id, email, password });
		return users.at(-1)!;
	};
	const signIn = async (identity: (typeof users)[number]) => {
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
			email: identity.email,
			password: identity.password
		});
		if (error) throw new Error('Controlled sign-in failed.');
		const context = await browser.newContext();
		await context.addCookies(cookies);
		contexts.push(context);
		return context;
	};
	const cleanup = async () => {
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
		)
			throw new Error('Controlled fixture cleanup failed.');
	};
	return { user, signIn, cleanup };
}
