// @vitest-environment node
import { expect, test, vi } from 'vitest';

const createOrFindDraft = vi.fn();

vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	createOrFindDraft,
	searchOffers: () => []
}));

const { actions } = await import('./+page.server');

const commandEvent = (values: Record<string, string>, subject = 'student-subject') => {
	const form = new FormData();
	for (const [key, value] of Object.entries(values)) form.set(key, value);
	return {
		request: new Request('http://localhost/plans/new?/create', { method: 'POST', body: form }),
		locals: { auth: { subject } }
	} as Parameters<NonNullable<typeof actions.create>>[0];
};

const validForm = {
	university: 'Universidad Nacional de Entre Ríos',
	faculty: 'Facultad de Ciencias Económicas',
	offer: 'Contador Público',
	campus: '',
	modality: '',
	year: '2026',
	'source-label': 'Centro de estudiantes',
	'source-url': 'https://drive.google.com/example',
	actor: 'browser-controlled-subject'
};

test('create command redirects to the stable draft identity returned by the domain function', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		disposition: 'created',
		year: 2026,
		isDraft: true,
		canonicalSlug: null
	});

	await expect(actions.create(commandEvent(validForm))).rejects.toMatchObject({
		status: 303,
		location: '/draft/969adbaf-cc0b-48d1-a5b0-258d45a5f1bf'
	});
	expect(createOrFindDraft).toHaveBeenCalledWith(
		expect.objectContaining({ year: 2026 }),
		'student-subject'
	);
});

test('existing published plans return to their canonical public URL', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		disposition: 'existing',
		year: 2026,
		isDraft: false,
		canonicalSlug: 'utn-frcu-isi-2023'
	});

	await expect(actions.create(commandEvent(validForm))).rejects.toMatchObject({
		status: 303,
		location: '/utn-frcu-isi-2023'
	});
});

test('create command sends the verified subject, not an actor supplied in the form', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: null,
		disposition: 'identity_ambiguous',
		year: null
	});

	await actions.create(commandEvent(validForm));
	expect(createOrFindDraft).toHaveBeenLastCalledWith(expect.anything(), 'student-subject');
});

test('create command permits an incomplete draft with no source yet', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: null,
		disposition: 'identity_ambiguous',
		year: null
	});

	await actions.create(commandEvent({ ...validForm, 'source-label': '', 'source-url': '' }));
	expect(createOrFindDraft).toHaveBeenLastCalledWith(
		expect.objectContaining({ sources: [] }),
		'student-subject'
	);
});

test('an ambiguous legacy offer returns a recoverable error instead of creating a draft', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: null,
		disposition: 'identity_ambiguous',
		year: null
	});

	await expect(actions.create(commandEvent(validForm))).resolves.toMatchObject({
		status: 409,
		data: { error: expect.stringContaining('ofertas parecidas') }
	});
});
