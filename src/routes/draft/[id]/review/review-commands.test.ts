// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const draftReview = vi.fn();
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft: vi.fn(),
	readDraftEditor: vi.fn()
}));
vi.mock('$lib/collaboration/draft-review.server', () => ({ draftReview }));
const { actions } = await import('./+page.server');

const event = () => {
	const form = new FormData();
	form.set('subject', 'verified-subject');
	form.set('revision', '7');
	form.set('operation', 'check');
	form.set('key', 'item:analysis');
	form.set('sourcesOpened', 'yes');
	return {
		request: new Request('http://localhost/draft/example/review', { method: 'POST', body: form }),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.review>>[0];
};

beforeEach(() => vi.clearAllMocks());

test('rejects anonymous review commands before the review boundary', async () => {
	const command = event();
	command.locals.auth = null;

	await expect(actions.review(command)).resolves.toMatchObject({ status: 401 });
	expect(draftReview).not.toHaveBeenCalled();
});

test('rejects an account switch before the review boundary', async () => {
	const command = event();
	command.locals.auth = { subject: 'another-account' };

	await expect(actions.review(command)).resolves.toMatchObject({ status: 409 });
	expect(draftReview).not.toHaveBeenCalled();
});

test('derives authority from locals instead of browser actor or fingerprint fields', async () => {
	draftReview.mockResolvedValue({ result: 'stale' });
	const command = event();
	const form = await command.request.formData();
	form.set('actor', 'untrusted-subject');
	form.set('fingerprint', 'f'.repeat(64));
	command.request = new Request('http://localhost/draft/example/review', {
		method: 'POST',
		body: form
	});

	await actions.review(command);
	expect(draftReview).toHaveBeenCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		'verified-subject',
		{
			type: 'check',
			revision: 7,
			key: 'item:analysis',
			sourcesOpened: true
		}
	);
});

test('returns a conservative conflict for a stale review', async () => {
	draftReview.mockResolvedValue({ result: 'stale' });

	await expect(actions.review(event())).resolves.toMatchObject({
		status: 409,
		data: { error: expect.stringContaining('conservamos las comprobaciones') }
	});
});
