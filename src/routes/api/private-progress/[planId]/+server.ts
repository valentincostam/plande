import {
	assertPrivateProgressPlanId,
	parsePrivateProgress,
	parsePrivateProgressSave,
	privateProgressSave,
	privateProgressAccountHeader
} from '$lib/private-progress/private-progress-contract';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const privateHeaders = { 'cache-control': 'private, no-store' };

const unavailable = (status: number) =>
	json({ error: 'El progreso privado no está disponible.' }, { status, headers: privateHeaders });

const progressResponse = (body: unknown, status = 200) =>
	json(body, { status, headers: privateHeaders });

export const GET: RequestHandler = async ({ request, locals, params }) => {
	if (!locals.auth || request.headers.get(privateProgressAccountHeader) !== locals.auth.subject)
		return unavailable(401);
	if (!locals.supabase) return unavailable(503);

	try {
		const planId = assertPrivateProgressPlanId(params.planId);
		const { data: parent, error: parentError } = await locals.supabase
			.from('private_plan_progress')
			.select('version,private_progress_items(item_id,state,grade)')
			.eq('plan_id', planId)
			.maybeSingle();
		if (parentError) return unavailable(503);
		if (!parent) return progressResponse({ progress: null });
		const progress = parsePrivateProgress({
			version: parent.version,
			items: (parent.private_progress_items ?? []).map((item) => ({
				itemId: item.item_id,
				state: item.state,
				...(item.grade === null ? {} : { grade: item.grade })
			}))
		});
		return progressResponse({ progress });
	} catch {
		return unavailable(400);
	}
};

export const POST: RequestHandler = async ({ request, locals, params }) => {
	if (!locals.auth || request.headers.get(privateProgressAccountHeader) !== locals.auth.subject)
		return unavailable(401);
	if (!locals.supabase) return unavailable(503);

	try {
		const planId = assertPrivateProgressPlanId(params.planId);
		const save = parsePrivateProgressSave(await request.json());
		const { data, error } = await locals.supabase.rpc(privateProgressSave, {
			p_plan_id: planId,
			p_expected_version: save.expectedVersion,
			p_items: save.items
		});
		if (error?.code === 'P0001') return unavailable(409);
		if (error) return unavailable(503);
		const response = Array.isArray(data) ? data[0] : undefined;
		if (!response || typeof response.version !== 'number') return unavailable(503);
		return progressResponse({ version: response.version });
	} catch {
		return unavailable(400);
	}
};
