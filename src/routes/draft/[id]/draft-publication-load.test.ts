// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const readDraft = vi.fn();
const readDraftEditor = vi.fn();
const readPublicationStatus = vi.fn();
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft,
	readDraftEditor,
	readDraftRevision: vi.fn(),
	saveDraftDocument: vi.fn(),
	searchOffers: vi.fn(),
	setDraftYear: vi.fn()
}));
vi.mock('$lib/collaboration/draft-review.server', () => ({ addDraftSource: vi.fn() }));
vi.mock('$lib/collaboration/draft-publication.server', () => ({ readPublicationStatus }));
const { load } = await import('./+page.server');

const event = () =>
	({
		params: { id: 'f085b1d0-77c2-4799-a92a-4a9dcefbca39' },
		locals: {
			supabase: undefined,
			auth: null,
			authValidationFailed: false,
			authCookiesWritten: false,
			correlationId: 'test-correlation-id'
		}
	}) satisfies Partial<Parameters<typeof load>[0]>;

beforeEach(() => vi.clearAllMocks());

test('redirects only a missing draft that is already published', async () => {
	readDraft.mockResolvedValue(null);
	readPublicationStatus.mockResolvedValue({ published: true, canonicalSlug: 'plan-publicado' });
	await expect(load(event() as Parameters<typeof load>[0])).rejects.toMatchObject({
		status: 303,
		location: '/plan-publicado'
	});

	readPublicationStatus.mockResolvedValue(null);
	await expect(load(event() as Parameters<typeof load>[0])).rejects.toMatchObject({ status: 404 });

	readDraft.mockResolvedValue({});
	readDraftEditor.mockResolvedValue({});
	await expect(load(event() as Parameters<typeof load>[0])).resolves.toMatchObject({ draft: {} });
	expect(readPublicationStatus).toHaveBeenCalledTimes(3);
});
