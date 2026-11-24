// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';
import { allStudyPlans } from './data/all-study-plans';

const loadPlanWithProgress = vi.fn();
const loadPrivateProgressPlanId = vi.fn();
const collaborationUnavailable = vi.fn();
const readPublicationStatus = vi.fn();
const readPlanHistory = vi.fn();
const readPublicProposal = vi.fn();
vi.mock('$lib/collaboration/plan-proposal.server', () => ({
	readPlanHistory,
	readPublicProposal,
	openPlanProposal: vi.fn()
}));
vi.mock('./data/study-plan-reader.server', () => ({ studyPlanReader: { loadPlanWithProgress } }));
vi.mock('./data/study-plan-loaders', () => ({ getCanonicalStudyPlanSlug: (slug: string) => slug }));
vi.mock('$lib/private-progress/plan-identity.server', () => ({ loadPrivateProgressPlanId }));
vi.mock('$lib/collaboration/collaboration.server', () => ({ collaborationUnavailable }));
vi.mock('$lib/collaboration/draft-publication.server', () => ({ readPublicationStatus }));
const { load } = await import('./+page.server');

const event = () =>
	({
		params: { slug: 'uns-dcs-le-2017' },
		url: new URL('http://localhost/uns-dcs-le-2017'),
		locals: {
			supabase: undefined,
			auth: null,
			authValidationFailed: false,
			authCookiesWritten: false,
			correlationId: 'test-correlation-id'
		}
	}) satisfies Partial<Parameters<typeof load>[0]>;
const invoke = () => load(event() as unknown as Parameters<typeof load>[0]);

beforeEach(() => {
	vi.clearAllMocks();
	loadPlanWithProgress.mockResolvedValue({
		document: allStudyPlans[0],
		progressItemIds: allStudyPlans[0].items.map((item) => item.id)
	});
	loadPrivateProgressPlanId.mockResolvedValue('f085b1d0-77c2-4799-a92a-4a9dcefbca39');
	collaborationUnavailable.mockReturnValue(false);
	readPlanHistory.mockResolvedValue([]);
	readPublicProposal.mockResolvedValue(null);
});

test('offers corrections from the current snapshot only to an authenticated reader', async () => {
	const snapshotId = '65fd5e92-678f-4887-b2fc-0e787066729c';
	const subject = '418f88d2-764a-4535-8e5d-cd1f5842f18c';
	readPublicationStatus.mockResolvedValue({ published: true, snapshotId, publishedAt: null });
	readPlanHistory.mockResolvedValue([
		{ snapshotId, publishedAt: null, isCurrent: true, argument: null }
	]);
	await expect(invoke()).resolves.toMatchObject({
		proposal: undefined,
		publicationHistory: [{ snapshotId }]
	});
	expect(readPublicProposal).not.toHaveBeenCalled();
	const authenticated = { ...event(), locals: { ...event().locals, auth: { subject } } };
	await expect(load(authenticated as unknown as Parameters<typeof load>[0])).resolves.toMatchObject(
		{
			proposal: {
				active: false,
				form: { data: { subject, baseSnapshotId: snapshotId, sourceSnapshotId: snapshotId } }
			}
		}
	);
});

test('uses the public plan UUID to expose only the first publication time', async () => {
	readPublicationStatus.mockResolvedValue({
		published: true,
		canonicalSlug: 'uns-dcs-le-2017',
		publishedAt: '2026-09-08T12:00:00.000Z'
	});

	await expect(invoke()).resolves.toMatchObject({
		publication: { publishedAt: '2026-09-08T12:00:00.000Z' },
		planId: undefined
	});
	expect(loadPrivateProgressPlanId).toHaveBeenCalledWith('uns-dcs-le-2017');
	expect(readPublicationStatus).toHaveBeenCalledWith('f085b1d0-77c2-4799-a92a-4a9dcefbca39');
});

test('keeps the public plan available when publication metadata fails', async () => {
	readPublicationStatus.mockRejectedValue(new Error('unavailable'));

	await expect(invoke()).resolves.toMatchObject({ publication: undefined });
});

test('does not request publication metadata while collaboration is unavailable', async () => {
	collaborationUnavailable.mockReturnValue(true);

	await expect(invoke()).resolves.toMatchObject({ publication: undefined });
	expect(readPublicationStatus).not.toHaveBeenCalled();
});
