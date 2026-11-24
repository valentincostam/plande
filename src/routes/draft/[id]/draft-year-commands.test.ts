// @vitest-environment node
import { expect, test, vi } from 'vitest';
import type { DraftPlanContent } from '$lib/plan-editor/draft-plan-content';

const setDraftYear = vi.fn();
const searchOffers = vi.fn();
const readDraft = vi.fn();
const readDraftEditor = vi.fn();
const readDraftRevision = vi.fn();
const saveDraftDocument = vi.fn();

vi.mock('$lib/collaboration/draft-publication.server', () => ({
	readPublicationStatus: vi.fn().mockResolvedValue(null)
}));

vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft,
	searchOffers,
	setDraftYear,
	readDraftEditor,
	readDraftRevision,
	saveDraftDocument
}));

const { actions, load } = await import('./+page.server');

const commandEvent = (year: string) => {
	const form = new FormData();
	form.set('year', year);
	form.set('editorSubject', 'verified-subject');
	form.set('actor', 'browser-controlled-subject');
	return {
		request: new Request('http://localhost/draft/draft-id?/setYear', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.setYear>>[0];
};

test('year collision leaves the current draft in place and identifies the other plan', async () => {
	searchOffers.mockResolvedValue([
		{
			planId: '76e1b9dc-6f9b-4e94-844e-5542dcbabb00',
			isDraft: false,
			canonicalSlug: 'utn-frcu-isi-2023'
		}
	]);
	setDraftYear.mockResolvedValue({
		disposition: 'year_conflict',
		planId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		conflictingPlanId: '76e1b9dc-6f9b-4e94-844e-5542dcbabb00'
	});

	await expect(actions.setYear(commandEvent('2026'))).resolves.toMatchObject({
		status: 409,
		data: {
			error: expect.stringContaining('No se modificó este borrador.'),
			conflictingHref: '/utn-frcu-isi-2023'
		}
	});
	expect(setDraftYear).toHaveBeenCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		2026,
		'verified-subject'
	);
});

test.each(['', '   '])('rejects a blank year without changing the draft: %j', async (year) => {
	setDraftYear.mockClear();

	await expect(actions.setYear(commandEvent(year))).resolves.toMatchObject({
		status: 400,
		data: { error: 'Indicá un año de plan válido.' }
	});
	expect(setDraftYear).not.toHaveBeenCalled();
});

test('does not attribute a pending year correction to a switched account', async () => {
	setDraftYear.mockClear();
	const event = commandEvent('2026');
	event.locals.auth = { subject: 'another-subject' };
	await expect(actions.setYear(event)).resolves.toMatchObject({ status: 409 });
	expect(setDraftYear).not.toHaveBeenCalled();
});

const sectionCommand = (baseVersion: string | undefined, editorSubject = 'verified-subject') => {
	const form = new FormData();
	if (baseVersion !== undefined) form.set('baseVersion', baseVersion);
	form.set('editorSubject', editorSubject);
	form.set('operation', 'create');
	form.set('sectionId', 'section-id');
	form.set('label', 'Básica');
	return {
		request: new Request('http://localhost/draft/draft-id?/editSections', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.editSections>>[0];
};

test.each([undefined, '', '-1', '1.5', '9007199254740992'])(
	'rejects invalid editor base version before persistence: %j',
	async (version) => {
		readDraftEditor.mockClear();
		readDraftRevision.mockClear();
		saveDraftDocument.mockClear();
		await expect(actions.editSections(sectionCommand(version))).resolves.toMatchObject({
			status: 400,
			data: { error: 'La versión del borrador no es válida.' }
		});
		expect(readDraftEditor).not.toHaveBeenCalled();
		expect(readDraftRevision).not.toHaveBeenCalled();
		expect(saveDraftDocument).not.toHaveBeenCalled();
	}
);

test('rejects a missing or changed editor subject before reading the draft', async () => {
	for (const editorSubject of ['', 'other-subject']) {
		readDraftEditor.mockClear();
		readDraftRevision.mockClear();
		saveDraftDocument.mockClear();
		await expect(actions.editSections(sectionCommand('0', editorSubject))).resolves.toMatchObject({
			status: 409,
			data: {
				error: 'La cuenta cambió en otra pestaña. Recargá para continuar.',
				accountChanged: true
			}
		});
		expect(readDraftEditor).not.toHaveBeenCalled();
		expect(readDraftRevision).not.toHaveBeenCalled();
		expect(saveDraftDocument).not.toHaveBeenCalled();
	}
});

test('accepts zero as an editor base version', async () => {
	readDraftRevision.mockResolvedValue({
		content: {
			schemaVersion: 1,
			document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
			unknownRequirements: [],
			unsupportedContent: []
		}
	});
	readDraftEditor.mockResolvedValue({
		version: 0,
		content: {
			schemaVersion: 1,
			document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
			unknownRequirements: [],
			unsupportedContent: []
		}
	});
	saveDraftDocument.mockResolvedValue({ disposition: 'unchanged' });
	await expect(actions.editSections(sectionCommand('0'))).rejects.toMatchObject({ status: 303 });
	expect(readDraftRevision).toHaveBeenCalled();
});

test('returns the current editor document with a merge conflict', async () => {
	saveDraftDocument.mockClear();
	const baseContent = {
		schemaVersion: 1 as const,
		document: {
			nextSeqId: 0,
			sections: [{ id: 'basic', label: 'Básica' }],
			items: [],
			requirements: {}
		},
		unknownRequirements: [],
		unsupportedContent: []
	};
	const currentContent = structuredClone(baseContent);
	currentContent.document.sections[0].label = 'Formación básica';
	readDraftRevision.mockResolvedValue({ content: baseContent });
	readDraftEditor.mockResolvedValue({ version: 4, content: currentContent });
	const form = new FormData();
	form.set('baseVersion', '3');
	form.set('editorSubject', 'verified-subject');
	form.set(
		'patches',
		JSON.stringify([{ op: 'section.rename', sectionId: 'basic', label: 'Nuevo nombre' }])
	);
	const event = {
		request: new Request('http://localhost/draft/draft-id?/editSections', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.editSections>>[0];

	await expect(actions.editSections(event)).resolves.toMatchObject({
		status: 409,
		data: {
			conflicts: ['basic'],
			editorConflict: { content: currentContent, version: 4 }
		}
	});
	expect(saveDraftDocument).not.toHaveBeenCalled();
});

test('reads the editor again after a save race', async () => {
	readDraftEditor.mockClear();
	const content: DraftPlanContent = {
		schemaVersion: 1 as const,
		document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
		unknownRequirements: [],
		unsupportedContent: []
	};
	const latestContent = structuredClone(content);
	latestContent.document.sections.push({ id: 'basic', label: 'Básica' });
	readDraftRevision.mockResolvedValue({ content });
	readDraftEditor
		.mockResolvedValueOnce({ version: 4, content })
		.mockResolvedValueOnce({ version: 5, content: latestContent });
	saveDraftDocument.mockResolvedValue({ disposition: 'version_conflict' });

	await expect(actions.editSections(sectionCommand('3'))).resolves.toMatchObject({
		status: 409,
		data: { editorConflict: { content: latestContent, version: 5 } }
	});
	expect(readDraftEditor).toHaveBeenCalledTimes(2);
});

test('reads the requested historical revision on the server before restoring an item', async () => {
	const historical: DraftPlanContent = {
		schemaVersion: 1,
		document: {
			nextSeqId: 5,
			sections: [{ id: 'basic', label: 'Básica' }],
			items: [
				{
					id: 'algebra',
					seqId: 4,
					kind: 'course',
					name: 'Álgebra',
					type: 'mandatory',
					placements: [{ id: 'algebra-basic', sectionId: 'basic' }]
				}
			],
			requirements: {}
		},
		unknownRequirements: [],
		unsupportedContent: []
	};
	const current = structuredClone(historical);
	current.document.items = [];
	readDraftRevision.mockImplementation(async (_draftId: string, revision: number) =>
		revision === 3 ? { content: historical } : { content: historical }
	);
	readDraftEditor.mockResolvedValue({ version: 4, content: current });
	saveDraftDocument.mockResolvedValue({ disposition: 'updated' });
	const form = new FormData();
	form.set('baseVersion', '3');
	form.set('editorSubject', 'verified-subject');
	form.set(
		'patches',
		JSON.stringify([
			{ op: 'item.restore', itemId: 'algebra', historyVersion: 3 },
			{ op: 'item.rename', itemId: 'algebra', name: 'Álgebra I' }
		])
	);
	const event = {
		request: new Request('http://localhost/draft/draft-id?/editSections', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.editSections>>[0];

	await expect(actions.editSections(event)).rejects.toMatchObject({ status: 303 });
	expect(readDraftRevision).toHaveBeenCalledWith('969adbaf-cc0b-48d1-a5b0-258d45a5f1bf', 3);
	expect(saveDraftDocument).toHaveBeenCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		4,
		expect.objectContaining({
			document: expect.objectContaining({
				items: [expect.objectContaining({ name: 'Álgebra I', seqId: 4 })]
			})
		}),
		'verified-subject'
	);
});

test('accepts a retry of an already created course', async () => {
	const baseContent: DraftPlanContent = {
		schemaVersion: 1,
		document: {
			nextSeqId: 0,
			sections: [{ id: 'basic', label: 'Básica' }],
			items: [],
			requirements: {}
		},
		unknownRequirements: [],
		unsupportedContent: []
	};
	const currentContent: DraftPlanContent = {
		...structuredClone(baseContent),
		document: {
			...structuredClone(baseContent).document,
			nextSeqId: 1,
			items: [
				{
					id: 'seminar',
					seqId: 0,
					kind: 'course',
					name: 'Seminario',
					type: 'elective',
					credits: 4,
					tags: ['humanidades'],
					placements: [{ id: 'seminar-basic', sectionId: 'basic' }]
				}
			]
		},
		unknownRequirements: [
			{ scope: 'item:seminar:enroll', note: 'Todavía no comprobado.' },
			{ scope: 'item:seminar:complete', note: 'Todavía no comprobado.' }
		]
	};
	readDraftRevision.mockResolvedValue({ content: baseContent });
	readDraftEditor.mockResolvedValue({ version: 4, content: currentContent });
	saveDraftDocument.mockResolvedValue({ disposition: 'unchanged' });
	const form = new FormData();
	form.set('baseVersion', '3');
	form.set('editorSubject', 'verified-subject');
	form.set(
		'patches',
		JSON.stringify([
			{
				op: 'course.create',
				item: {
					id: 'seminar',
					placementId: 'seminar-basic',
					sectionId: 'basic',
					name: 'Seminario',
					fields: { type: 'elective', credits: 4, tags: ['humanidades'] }
				}
			}
		])
	);
	const event = {
		request: new Request('http://localhost/draft/draft-id?/editSections', {
			method: 'POST',
			body: form
		}),
		params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
		locals: { auth: { subject: 'verified-subject' } }
	} as Parameters<NonNullable<typeof actions.editSections>>[0];

	await expect(actions.editSections(event)).rejects.toMatchObject({ status: 303 });
	expect(saveDraftDocument).toHaveBeenLastCalledWith(
		'969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
		4,
		currentContent,
		'verified-subject'
	);
});

test('exposes the authenticated subject for the editor cache key', async () => {
	readDraft.mockResolvedValue({ id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' });
	readDraftEditor.mockResolvedValue({ version: 0, content: {} });

	await expect(
		load({
			params: { id: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf' },
			locals: { auth: { subject: 'verified-subject' } }
		} as Parameters<typeof load>[0])
	).resolves.toMatchObject({ editorSubject: 'verified-subject' });
});
