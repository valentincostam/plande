import { fail, redirect } from '@sveltejs/kit';
import { logAuthEvent } from '$lib/auth/auth-log.server';
import type { Actions, PageServerLoad } from './$types';

const unavailable = () => fail(503, { error: 'No se pudo iniciar sesión. Intentá de nuevo.' });

export const load: PageServerLoad = ({ locals, url }) => {
	if (locals.auth) redirect(303, '/');
	return { callbackFailed: url.searchParams.get('error') === 'callback' };
};

export const actions: Actions = {
	google: async ({ locals, url }) => {
		const startedAt = Date.now();
		if (!locals.supabase) {
			logAuthEvent('sign-in', 'unavailable', startedAt, locals.correlationId);
			return unavailable();
		}

		let data;
		let error;
		try {
			({ data, error } = await locals.supabase.auth.signInWithOAuth({
				provider: 'google',
				options: { redirectTo: new URL('/auth/callback', url.origin).toString() }
			}));
		} catch {
			logAuthEvent('sign-in', 'unavailable', startedAt, locals.correlationId);
			return unavailable();
		}
		if (error || !data?.url) {
			logAuthEvent('sign-in', 'failure', startedAt, locals.correlationId);
			return unavailable();
		}
		logAuthEvent('sign-in', 'success', startedAt, locals.correlationId);
		redirect(303, data.url);
	}
};
