import { redirect } from '@sveltejs/kit';
import { logAuthEvent } from '$lib/auth/auth-log.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const startedAt = Date.now();
	const code = url.searchParams.get('code');
	if (!code || !locals.supabase) {
		logAuthEvent(
			'callback',
			locals.supabase ? 'failure' : 'unavailable',
			startedAt,
			locals.correlationId
		);
		redirect(303, '/auth/sign-in?error=callback');
	}

	let error;
	try {
		({ error } = await locals.supabase.auth.exchangeCodeForSession(code));
	} catch {
		logAuthEvent('callback', 'unavailable', startedAt, locals.correlationId);
		redirect(303, '/auth/sign-in?error=callback');
	}
	if (error) {
		logAuthEvent('callback', 'failure', startedAt, locals.correlationId);
		redirect(303, '/auth/sign-in?error=callback');
	}
	logAuthEvent('callback', 'success', startedAt, locals.correlationId);
	redirect(303, '/');
};
