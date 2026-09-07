import { describe, expect, it } from 'vitest';
import { createPrivateProgressPlanIdLoader } from './plan-identity.server';

describe('createPrivateProgressPlanIdLoader', () => {
	it('reads the stable plan UUID from the published-plan view', async () => {
		const requests: string[] = [];
		const loadPlanId = createPrivateProgressPlanIdLoader(async (path) => {
			requests.push(path);
			return [{ plan_id: '00000000-0000-4000-8000-000000000033' }];
		});

		await expect(loadPlanId('uns-dcs-le-2017')).resolves.toBe(
			'00000000-0000-4000-8000-000000000033'
		);
		expect(requests).toEqual([
			'study_plan_published?slug=eq.uns-dcs-le-2017&select=plan_id&limit=1'
		]);
	});

	it('rejects an invalid response instead of making up a plan identity', async () => {
		const loadPlanId = createPrivateProgressPlanIdLoader(async () => [{ plan_id: 'not-a-uuid' }]);
		await expect(loadPlanId('uns-dcs-le-2017')).rejects.toThrow(
			'Supabase returned an invalid private progress plan identity.'
		);
	});
});
