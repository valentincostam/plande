import { createSupabaseServerClient } from '$lib/auth/supabase.server';
import { logAuthEvent } from '$lib/auth/auth-log.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event);
	event.locals.auth = null;
	event.locals.authValidationFailed = false;
	event.locals.authCookiesWritten = false;
	event.locals.correlationId = crypto.randomUUID();
	const hasAuthCookie = event.cookies.getAll().some((cookie) => cookie.name.startsWith('sb-'));

	if (event.locals.supabase) {
		const startedAt = Date.now();
		try {
			const { data, error } = await event.locals.supabase.auth.getClaims();
			const subject = error ? undefined : data?.claims?.sub;
			if (typeof subject === 'string') event.locals.auth = { subject };
			if (error && hasAuthCookie) event.locals.authValidationFailed = true;
			logAuthEvent(
				'session-validation',
				error && hasAuthCookie ? 'failure' : 'success',
				startedAt,
				event.locals.correlationId
			);
		} catch {
			if (hasAuthCookie) event.locals.authValidationFailed = true;
			logAuthEvent('session-validation', 'unavailable', startedAt, event.locals.correlationId);
		}
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});

	if (
		!hasAuthCookie &&
		!event.locals.authCookiesWritten &&
		!event.url.pathname.startsWith('/auth/')
	) {
		return response;
	}

	const headers = new Headers(response.headers);
	headers.set('cache-control', 'private, no-store');
	return new Response(response.body, {
		headers,
		status: response.status,
		statusText: response.statusText
	});
};
