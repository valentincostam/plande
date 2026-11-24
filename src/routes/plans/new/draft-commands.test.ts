// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';

const createOrFindDraft = vi.fn();

beforeEach(() => createOrFindDraft.mockReset());

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
	sourceLabel: 'Centro de estudiantes',
	sourceUrl: 'https://drive.google.com/example',
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

	await actions.create(commandEvent({ ...validForm, sourceLabel: '', sourceUrl: '' }));
	expect(createOrFindDraft).toHaveBeenLastCalledWith(
		expect.objectContaining({ sources: [] }),
		'student-subject'
	);
});

test('create command permits any safe integer year', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: null,
		disposition: 'identity_ambiguous',
		year: null
	});

	await actions.create(commandEvent({ ...validForm, year: '-7' }));
	expect(createOrFindDraft).toHaveBeenLastCalledWith(
		expect.objectContaining({ year: -7 }),
		'student-subject'
	);
});

test('create command returns field errors and posted values', async () => {
	await expect(
		actions.create(commandEvent({ ...validForm, university: '', sourceUrl: 'nota' }))
	).resolves.toMatchObject({
		status: 400,
		data: {
			form: {
				data: expect.objectContaining({ university: '', sourceUrl: 'nota' }),
				errors: expect.objectContaining({
					university: expect.any(Array),
					sourceUrl: expect.any(Array)
				})
			}
		}
	});
	expect(createOrFindDraft).not.toHaveBeenCalled();
});

test('an ambiguous legacy offer returns a recoverable error instead of creating a draft', async () => {
	createOrFindDraft.mockResolvedValue({
		planId: null,
		disposition: 'identity_ambiguous',
		year: null
	});

	await expect(actions.create(commandEvent(validForm))).resolves.toMatchObject({
		status: 409,
		data: {
			form: {
				data: expect.objectContaining({ offer: validForm.offer }),
				errors: { offer: [expect.stringContaining('ofertas parecidas')] }
			}
		}
	});
});
