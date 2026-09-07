import { redirect } from '@sveltejs/kit';
import { logAuthEvent } from '$lib/auth/auth-log.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const startedAt = Date.now();
	if (!locals.supabase) {
		logAuthEvent('sign-out', 'unavailable', startedAt, locals.correlationId);
		redirect(303, '/?auth=sign-out-failed');
	}

	let error;
	try {
		({ error } = await locals.supabase.auth.signOut());
	} catch {
		logAuthEvent('sign-out', 'unavailable', startedAt, locals.correlationId);
		redirect(303, '/?auth=sign-out-failed');
	}
	if (error) {
		logAuthEvent('sign-out', 'failure', startedAt, locals.correlationId);
		redirect(303, '/?auth=sign-out-failed');
	}
	logAuthEvent('sign-out', 'success', startedAt, locals.correlationId);
	redirect(303, '/');
};
