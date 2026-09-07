import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => ({
	auth: locals.auth,
	authEnabled: Boolean(locals.supabase),
	authUnavailable: locals.authValidationFailed,
	signOutFailed: false
});
