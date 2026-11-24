// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const openPlanProposal = vi.fn();
const readActiveProposal = vi.fn();
const loadPrivateProgressPlanId = vi.fn();
vi.mock('$lib/collaboration/plan-proposal.server', () => ({
	openPlanProposal,
	readActiveProposal
}));
vi.mock('$lib/private-progress/plan-identity.server', () => ({ loadPrivateProgressPlanId }));
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false
}));
const { actions } = await import('./+page.server');
const subject = '279312c7-153a-4d57-846d-cc3fef984916';
const planId = 'ee5c2121-f4a7-4a32-85b7-d94c98bf0955';
const snapshotId = '581f17dc-9cfa-4108-8969-d9d085e87546';
const requestId = 'cb07ec38-c853-45ef-8bd2-b2d4f03387b4';
const event = (overrides: Record<string, string> = {}, authenticated = true) => {
	const body = new FormData();
	for (const [key, value] of Object.entries({
		subject,
		requestId,
		baseSnapshotId: snapshotId,
		sourceSnapshotId: snapshotId,
		argument: 'La correlativa difiere de la fuente.',
		...overrides
	}))
		body.set(key, value);
	return {
		params: { slug: 'uns-dcs-le-2017' },
		request: new Request('http://localhost/uns-dcs-le-2017?/propose', { method: 'POST', body }),
		locals: { auth: authenticated ? { subject } : null }
	} as Parameters<typeof actions.propose>[0];
};

beforeEach(() => {
	vi.clearAllMocks();
	loadPrivateProgressPlanId.mockResolvedValue(planId);
	readActiveProposal.mockResolvedValue(null);
});

test('requires a session and rejects a stale account before opening', async () => {
	await expect(actions.propose(event({}, false))).rejects.toMatchObject({ status: 303 });
	await expect(actions.propose(event({ subject: requestId }))).resolves.toMatchObject({
		status: 409
	});
	expect(openPlanProposal).not.toHaveBeenCalled();
});

test('validates argument and snapshot identifiers before persistence', async () => {
	await expect(actions.propose(event({ argument: '  ' }))).resolves.toMatchObject({ status: 400 });
	await expect(actions.propose(event({ baseSnapshotId: 'invalid' }))).resolves.toMatchObject({
		status: 400
	});
	expect(openPlanProposal).not.toHaveBeenCalled();
});

test('opens against the server-resolved plan and verified actor', async () => {
	openPlanProposal.mockResolvedValue({
		disposition: 'opened',
		proposalRound: 1,
		baseSnapshotId: snapshotId
	});
	await expect(
		actions.propose(event({ actor: requestId, planId: requestId }))
	).rejects.toMatchObject({
		status: 303,
		location: `/draft/${planId}`
	});
	expect(openPlanProposal).toHaveBeenCalledWith(
		planId,
		{
			requestId,
			baseSnapshotId: snapshotId,
			sourceSnapshotId: snapshotId,
			argument: 'La correlativa difiere de la fuente.'
		},
		subject
	);
});

test.each(['active', 'base_obsolete'])(
	'preserves the argument on %s without redirect or silent rebase',
	async (disposition) => {
		openPlanProposal.mockResolvedValue({
			disposition,
			proposalRound: 1,
			baseSnapshotId: requestId
		});
		await expect(actions.propose(event())).resolves.toMatchObject({
			status: 409,
			data: {
				form: {
					data: { argument: 'La correlativa difiere de la fuente.', baseSnapshotId: snapshotId }
				}
			}
		});
	}
);
