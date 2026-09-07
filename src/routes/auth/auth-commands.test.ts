// @vitest-environment node
import { afterEach, expect, test, vi } from 'vitest';
import { AuthApiError, createClient, type User } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { GET as callback } from './callback/+server';
import { POST as signOut } from './sign-out/+server';
import { actions } from './sign-in/+page.server';

afterEach(() => vi.restoreAllMocks());

const sensitive =
	'private-email@example.test token-marker cookie-marker s=private-state n=private-grade';
const user: User = {
	id: 'controlled-subject',
	email: 'private-email@example.test',
	app_metadata: {},
	user_metadata: {},
	aud: 'authenticated',
	created_at: '2026-09-07T00:00:00Z'
};

function commandEvent<Route extends '/auth/callback' | '/auth/sign-in' | '/auth/sign-out'>(
	route: Route,
	correlationId = crypto.randomUUID()
) {
	const supabase = createClient('http://127.0.0.1:55421', 'fictitious-test-key', {
		auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
	});
	const locals: App.Locals = {
		supabase,
		auth: null,
		authCookiesWritten: false,
		authValidationFailed: false,
		correlationId
	};
	const event = {
		locals,
		url: new URL(`${route}?code=${encodeURIComponent(sensitive)}`, 'http://127.0.0.1:5174')
	} as RequestEvent<Record<string, never>, Route>;
	return { event, supabase };
}

test('a successful callback returns home and emits one sanitized success event', async () => {
	const { event, supabase } = commandEvent('/auth/callback');
	vi.spyOn(supabase.auth, 'exchangeCodeForSession').mockResolvedValue({
		data: {
			user,
			session: {
				user,
				access_token: sensitive,
				refresh_token: sensitive,
				expires_in: 3600,
				token_type: 'bearer'
			}
		},
		error: null
	});
	const output = vi.spyOn(console, 'info').mockImplementation(() => {});

	await expect(callback(event)).rejects.toMatchObject({ status: 303, location: '/' });
	expect(output.mock.calls).toHaveLength(1);
	expect(JSON.parse(output.mock.calls[0][0])).toEqual({
		operation: 'callback',
		result: 'success',
		durationMs: expect.any(Number),
		version: expect.any(String),
		correlationId: event.locals.correlationId
	});
	expect(JSON.stringify(output.mock.calls)).not.toContain(sensitive);
});

test('Google sign-in preserves its successful redirect instead of returning an unavailable error', async () => {
	const { event, supabase } = commandEvent('/auth/sign-in');
	const destination = 'http://127.0.0.1:55421/auth/v1/authorize?provider=google';
	vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue({
		data: { provider: 'google', url: destination },
		error: null
	});
	const output = vi.spyOn(console, 'info').mockImplementation(() => {});
	await expect(actions.google(event)).rejects.toMatchObject({ status: 303, location: destination });
	expect(output.mock.calls).toHaveLength(1);
	expect(JSON.parse(output.mock.calls[0][0])).toEqual({
		operation: 'sign-in',
		result: 'success',
		durationMs: expect.any(Number),
		version: expect.any(String),
		correlationId: event.locals.correlationId
	});
});

test('a successful sign-out returns to anonymous browsing', async () => {
	const { event, supabase } = commandEvent('/auth/sign-out');
	vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null });
	vi.spyOn(console, 'info').mockImplementation(() => {});
	await expect(signOut(event)).rejects.toMatchObject({ status: 303, location: '/' });
});

test('a failed log transport does not prevent signing out', async () => {
	const { event, supabase } = commandEvent('/auth/sign-out');
	vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null });
	vi.spyOn(console, 'info').mockImplementation(() => {
		throw new Error('Log transport unavailable');
	});
	await expect(signOut(event)).rejects.toMatchObject({ status: 303, location: '/' });
});

test('an unavailable OAuth provider gives a sanitized retryable form error', async () => {
	const { event, supabase } = commandEvent('/auth/sign-in');
	vi.spyOn(supabase.auth, 'signInWithOAuth').mockRejectedValue(new Error(sensitive));
	const output = vi.spyOn(console, 'info').mockImplementation(() => {});
	expect(await actions.google(event)).toMatchObject({
		status: 503,
		data: { error: 'No se pudo iniciar sesión. Intentá de nuevo.' }
	});
	expect(output.mock.calls).toHaveLength(1);
	expect(JSON.parse(output.mock.calls[0][0])).toEqual({
		operation: 'sign-in',
		result: 'unavailable',
		durationMs: expect.any(Number),
		version: expect.any(String),
		correlationId: event.locals.correlationId
	});
});

test.each(['rejected', 'unavailable'] as const)(
	'callback and sign-out recover from %s Auth without logging sensitive error details',
	async (failure) => {
		const first = commandEvent('/auth/callback');
		const second = commandEvent('/auth/sign-out');
		const callbackApi = vi.spyOn(first.supabase.auth, 'exchangeCodeForSession');
		const signOutApi = vi.spyOn(second.supabase.auth, 'signOut');
		if (failure === 'rejected') {
			const error = new AuthApiError(sensitive, 400, 'invalid_credentials');
			callbackApi.mockResolvedValue({ data: { user: null, session: null }, error });
			signOutApi.mockResolvedValue({ error });
		} else {
			callbackApi.mockRejectedValue(new Error(sensitive));
			signOutApi.mockRejectedValue(new Error(sensitive));
		}
		const output = vi.spyOn(console, 'info').mockImplementation(() => {});
		await Promise.all([
			expect(callback(first.event)).rejects.toMatchObject({
				status: 303,
				location: '/auth/sign-in?error=callback'
			}),
			expect(signOut(second.event)).rejects.toMatchObject({
				status: 303,
				location: '/?auth=sign-out-failed'
			})
		]);
		const events = output.mock.calls.map(([line]) => JSON.parse(line));
		expect(events).toHaveLength(2);
		for (const [operation, correlationId] of [
			['callback', first.event.locals.correlationId],
			['sign-out', second.event.locals.correlationId]
		]) {
			expect(events).toContainEqual({
				operation,
				result: failure === 'rejected' ? 'failure' : 'unavailable',
				durationMs: expect.any(Number),
				version: expect.any(String),
				correlationId
			});
		}
		expect(first.event.locals.correlationId).not.toBe(second.event.locals.correlationId);
		expect(events.every((event) => event.durationMs >= 0 && event.version.length > 0)).toBe(true);
		expect(JSON.stringify(events)).not.toContain(sensitive);
	}
);
