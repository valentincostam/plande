// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';
import { emptyDraftPlanContent } from '$lib/plan-editor/draft-plan-content';

const readDraftEditor = vi.fn();
const saveDraftDocument = vi.fn();
vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft: vi.fn(),
	readDraftRevision: vi.fn(),
	searchOffers: vi.fn(),
	setDraftYear: vi.fn(),
	readDraftEditor,
	saveDraftDocument
}));
const { actions } = await import('./+page.server');

const event = () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'basic', label: 'Básica' });
	const form = new FormData();
	form.set('json', JSON.stringify(content));
	form.set('baseVersion', '0');
	form.set('editorSubject', 'verified-subject');
	form.set('actor', 'untrusted-subject');
	return {
		request: new Request('http://localhost/draft/example?/importDraft', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.importDraft>>[0];
};

beforeEach(() => {
	vi.clearAllMocks();
	readDraftEditor.mockResolvedValue({ content: emptyDraftPlanContent(), version: 0 });
});

test('preserves a concurrent edit instead of rebasing an import', async () => {
	saveDraftDocument.mockResolvedValue({ disposition: 'version_conflict' });
	await expect(actions.importDraft(event())).resolves.toMatchObject({
		status: 409,
		data: { error: expect.stringContaining('No importamos') }
	});
	expect(saveDraftDocument).toHaveBeenCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		0,
		expect.any(Object),
		'verified-subject'
	);
});

test('rejects a nonempty draft without replacing its content', async () => {
	const content = emptyDraftPlanContent();
	content.document.sections.push({ id: 'someone-elses-section', label: 'Trabajo existente' });
	readDraftEditor.mockResolvedValue({ content, version: 0 });
	await expect(actions.importDraft(event())).resolves.toMatchObject({ status: 409 });
	expect(saveDraftDocument).not.toHaveBeenCalled();
});

test('rejects an account switch before reading or importing the draft', async () => {
	const command = event();
	command.locals.auth = { subject: 'another-account' };
	await expect(actions.importDraft(command)).resolves.toMatchObject({ status: 409 });
	expect(readDraftEditor).not.toHaveBeenCalled();
	expect(saveDraftDocument).not.toHaveBeenCalled();
});

test('rejects anonymous imports without accessing draft storage', async () => {
	const command = event();
	command.locals.auth = null;
	await expect(actions.importDraft(command)).resolves.toMatchObject({ status: 401 });
	expect(readDraftEditor).not.toHaveBeenCalled();
	expect(saveDraftDocument).not.toHaveBeenCalled();
});

test('bounds a request body even without a content length header', async () => {
	const command = event();
	command.request = new Request('http://localhost/draft/example?/importDraft', {
		method: 'POST',
		body: 'x'.repeat(2 * 1024 * 1024 + 1)
	});
	await expect(actions.importDraft(command)).resolves.toMatchObject({ status: 413 });
	expect(readDraftEditor).not.toHaveBeenCalled();
	expect(saveDraftDocument).not.toHaveBeenCalled();
});
