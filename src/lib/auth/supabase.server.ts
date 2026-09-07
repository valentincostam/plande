import { env } from '$env/dynamic/private';
import { createServerClient } from '@supabase/ssr';
import type { RequestEvent } from '@sveltejs/kit';

const getConfiguration = () => {
	const url = env.SUPABASE_URL?.replace(/\/$/, '');
	const key = env.SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_ANON_KEY;

	return url && key ? { url, key } : undefined;
};

export const createSupabaseServerClient = (event: RequestEvent) => {
	const configuration = getConfiguration();
	if (!configuration) return undefined;

	return createServerClient(configuration.url, configuration.key, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet, headers) => {
				event.locals.authCookiesWritten = true;
				for (const { name, value, options } of cookiesToSet) {
					event.cookies.set(name, value, { ...options, path: '/' });
				}

				if (Object.keys(headers).length > 0) event.setHeaders(headers);
			}
		}
	});
};
