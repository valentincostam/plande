import { env } from '$env/dynamic/private';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

export const createPrivateProgressPlanIdLoader =
	(getJson: (path: string) => Promise<unknown>) =>
	async (slug: string): Promise<string | undefined> => {
		const rows = await getJson(
			`study_plan_published?slug=eq.${encodeURIComponent(slug)}&select=plan_id&limit=1`
		);
		if (!Array.isArray(rows) || rows.length > 1) {
			throw new Error('Supabase returned an invalid private progress plan identity.');
		}
		if (rows.length === 0) return undefined;
		const row = rows[0];
		if (!isRecord(row) || typeof row.plan_id !== 'string' || !uuidPattern.test(row.plan_id)) {
			throw new Error('Supabase returned an invalid private progress plan identity.');
		}
		return row.plan_id;
	};

const getJson = async (path: string): Promise<unknown> => {
	const url = env.SUPABASE_URL?.replace(/\/$/, '');
	const key = env.SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_ANON_KEY;
	if (!url || !key) return [];
	const response = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key } });
	if (!response.ok)
		throw new Error(`Supabase private progress plan lookup failed with ${response.status}.`);
	return response.json();
};

export const loadPrivateProgressPlanId = createPrivateProgressPlanIdLoader(getJson);
