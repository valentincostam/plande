// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const addDraftDiscussion = vi.fn();
const resolveDraftObjection = vi.fn();
const readDraftDiscussions = vi.fn();
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft: vi.fn(),
	readDraftEditor: vi.fn()
}));
vi.mock('$lib/collaboration/draft-review.server', () => ({ draftReview: vi.fn() }));
vi.mock('$lib/collaboration/draft-discussions.server', () => ({
	addDraftDiscussion,
	resolveDraftObjection,
	readDraftDiscussions
}));
const { actions } = await import('./+page.server');

const invoke = (name: 'discuss' | 'resolveObjection', event: object) =>
	(actions as Record<string, (event: object) => unknown>)[name](event);

const formFor = (name: 'discuss' | 'resolveObjection') => {
	const form = new FormData();
	form.set('subject', 'verified-subject');
	form.set('requestId', '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf');
	form.set('reviewRevision', '7');
	form.set('discussionRevision', '2');
	form.set('argument', 'La fuente indica otra correlativa.');
	form.set('sourceId', '15a17c0a-a75d-49cd-92dd-8c0b6aa06b93');
	form.set('locator', 'Página 4');
	if (name === 'discuss') {
		form.set('kind', 'objection');
		form.set('unitKey', 'item:analysis');
	} else {
		form.set('discussionId', '645f3b62-9223-40ea-9701-bb9737e14c91');
		form.set('action', 'dismiss');
		form.set('newEvidence', '');
	}
	return form;
};

const event = (name: 'discuss' | 'resolveObjection') =>
	({
		request: new Request(`http://localhost/draft/example/review?/${name}`, {
			method: 'POST',
			body: formFor(name)
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	}) as Parameters<NonNullable<typeof actions.discuss>>[0];

beforeEach(() => vi.clearAllMocks());

test('rejects anonymous discussion commands before the database boundary', async () => {
	const command = event('discuss');
	command.locals.auth = null;

	await expect(invoke('discuss', command)).resolves.toMatchObject({ status: 401 });
	expect(addDraftDiscussion).not.toHaveBeenCalled();
	expect(resolveDraftObjection).not.toHaveBeenCalled();
});

test('rejects malformed resolution input before the database boundary', async () => {
	const command = event('resolveObjection');
	const form = await command.request.formData();
	form.set('reviewRevision', 'not-a-revision');
	command.request = new Request('http://localhost/draft/example/review?/resolveObjection', {
		method: 'POST',
		body: form
	});

	await expect(invoke('resolveObjection', command)).resolves.toMatchObject({ status: 400 });
	expect(resolveDraftObjection).not.toHaveBeenCalled();
});

test('derives a discussion actor from locals despite browser spoofing', async () => {
	addDraftDiscussion.mockResolvedValue({ disposition: 'version_conflict' });
	const command = event('discuss');
	const form = await command.request.formData();
	form.set('actor', 'untrusted-subject');
	command.request = new Request('http://localhost/draft/example/review?/discuss', {
		method: 'POST',
		body: form
	});

	await invoke('discuss', command);
	expect(addDraftDiscussion).toHaveBeenCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		'verified-subject',
		expect.objectContaining({ kind: 'objection', unitKey: 'item:analysis' })
	);
});

test('returns a conservative conflict for a stale objection resolution', async () => {
	resolveDraftObjection.mockResolvedValue({ disposition: 'version_conflict' });

	await expect(invoke('resolveObjection', event('resolveObjection'))).resolves.toMatchObject({
		status: 409,
		data: { error: expect.stringMatching(/recargá|conservamos/i) }
	});
});
