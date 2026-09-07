export function requireLocalSupabaseUrl(value: unknown): string {
	if (typeof value !== 'string') throw new Error('Local Supabase URL is required.');
	const url = new URL(value);
	if (
		url.protocol !== 'http:' ||
		!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
		url.username ||
		url.password ||
		url.search ||
		url.hash ||
		url.pathname !== '/'
	) {
		throw new Error('Only a local Supabase HTTP origin is allowed.');
	}
	return url.origin;
}
