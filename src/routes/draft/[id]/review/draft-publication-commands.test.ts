// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const publishDraft = vi.fn();
const readPublicationStatus = vi.fn();
const readDraft = vi.fn();
const readDraftEditor = vi.fn();
const readDraftDiscussions = vi.fn();
const readProposalComparison = vi.fn();
vi.mock('$lib/collaboration/plan-proposal.server', () => ({ readProposalComparison }));
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft,
	readDraftEditor
}));
vi.mock('$lib/collaboration/draft-review.server', () => ({ draftReview: vi.fn() }));
vi.mock('$lib/collaboration/draft-discussions.server', () => ({ readDraftDiscussions }));
vi.mock('$lib/collaboration/draft-publication.server', () => ({
	publishDraft,
	readPublicationStatus
}));
const { actions, load } = await import('./+page.server');

const invoke = (event: object) =>
	(actions as Record<string, (event: object) => unknown>).publish(event);

const event = () => {
	const form = new FormData();
	form.set('subject', 'verified-subject');
	form.set('requestId', '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf');
	form.set('reviewRevision', '7');
	form.set('discussionRevision', '2');
	return {
		request: new Request('http://localhost/draft/example/review?/publish', {
			method: 'POST',
			body: form
		}),
		params: { id: 'f085b1d0-77c2-4799-a92a-4a9dcefbca39' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.review>>[0];
};

beforeEach(() => vi.clearAllMocks());

const loadEvent = () =>
	({
		params: { id: 'f085b1d0-77c2-4799-a92a-4a9dcefbca39' },
		locals: {
			supabase: undefined,
			auth: null,
			authValidationFailed: false,
			authCookiesWritten: false,
			correlationId: 'test-correlation-id'
		},
		url: new URL('http://localhost/draft/example/review'),
		setHeaders: vi.fn()
	}) satisfies Partial<Parameters<typeof load>[0]>;
const invokeLoad = (event: ReturnType<typeof loadEvent>) =>
	load(event as unknown as Parameters<typeof load>[0]);

test('shows proposal context to anonymous readers without granting review state', async () => {
	readDraft.mockResolvedValue({ sources: [{ label: 'Fuente', url: 'https://example.edu/plan' }] });
	readDraftEditor.mockResolvedValue({ content: {} });
	readDraftDiscussions.mockResolvedValue({ entries: [] });
	readPublicationStatus.mockResolvedValue({ published: true, canonicalSlug: 'plan-publicado' });
	readProposalComparison.mockResolvedValue({
		argument: 'Corregir correlativa.',
		before: {},
		proposedNotes: [{ id: 1, text: 'Nota' }]
	});
	await expect(invokeLoad(loadEvent())).resolves.toMatchObject({
		review: null,
		subject: null,
		proposal: { argument: 'Corregir correlativa.', proposedNotes: [{ id: 1, text: 'Nota' }] }
	});
	expect(readProposalComparison).toHaveBeenCalledWith(loadEvent().params.id, null, [
		{ id: 'public-source-0', label: 'Fuente', url: 'https://example.edu/plan' }
	]);
});

test('rejects anonymous and changed-account publication commands before the boundary', async () => {
	const anonymous = event();
	anonymous.locals.auth = null;
	await expect(invoke(anonymous)).resolves.toMatchObject({ status: 401 });

	const changed = event();
	changed.locals.auth = { subject: 'another-account' };
	await expect(invoke(changed)).resolves.toMatchObject({ status: 409 });
	expect(publishDraft).not.toHaveBeenCalled();
});

test('rejects malformed publication input before the boundary', async () => {
	const command = event();
	const form = await command.request.formData();
	form.set('discussionRevision', '2.5');
	command.request = new Request('http://localhost/draft/example/review?/publish', {
		method: 'POST',
		body: form
	});

	await expect(invoke(command)).resolves.toMatchObject({ status: 400 });
	expect(publishDraft).not.toHaveBeenCalled();
});

test('uses the local actor and returns a conservative conflict', async () => {
	publishDraft.mockResolvedValue({ disposition: 'version_conflict', blockers: [] });
	const command = event();
	const form = await command.request.formData();
	form.set('actor', 'untrusted-subject');
	command.request = new Request('http://localhost/draft/example/review?/publish', {
		method: 'POST',
		body: form
	});

	await expect(invoke(command)).resolves.toMatchObject({ status: 409 });
	expect(publishDraft).toHaveBeenCalledWith(
		'f085b1d0-77c2-4799-a92a-4a9dcefbca39',
		'verified-subject',
		{
			requestId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
			reviewRevision: 7,
			discussionRevision: 2
		}
	);
});

test('shows blocked publication and redirects published or existing plans', async () => {
	publishDraft.mockResolvedValue({ disposition: 'blocked', blockers: ['reviews_missing'] });
	await expect(invoke(event())).resolves.toMatchObject({
		status: 400,
		data: { error: expect.any(String) }
	});

	publishDraft.mockResolvedValue({
		disposition: 'published',
		canonicalSlug: 'plan-publicado',
		blockers: []
	});
	await expect(invoke(event())).rejects.toMatchObject({ status: 303, location: '/plan-publicado' });

	publishDraft.mockResolvedValue({
		disposition: 'existing',
		canonicalSlug: 'plan-publicado',
		blockers: []
	});
	await expect(invoke(event())).rejects.toMatchObject({ status: 303, location: '/plan-publicado' });
});

test('redirects only a missing draft that is already published', async () => {
	readDraft.mockResolvedValue(null);
	readPublicationStatus.mockResolvedValue({ published: true, canonicalSlug: 'plan-publicado' });
	await expect(invokeLoad(loadEvent())).rejects.toMatchObject({
		status: 303,
		location: '/plan-publicado'
	});

	readPublicationStatus.mockResolvedValue(null);
	await expect(invokeLoad(loadEvent())).rejects.toMatchObject({
		status: 404
	});

	readDraft.mockResolvedValue({});
	readDraftEditor.mockResolvedValue({});
	readDraftDiscussions.mockResolvedValue({ entries: [] });
	await expect(invokeLoad(loadEvent())).resolves.toMatchObject({
		draft: {}
	});
	expect(readPublicationStatus).toHaveBeenCalledTimes(3);
});
