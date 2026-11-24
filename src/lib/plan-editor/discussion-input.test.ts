import { expect, test } from 'vitest';
import { parseDiscussionInput, parseResolutionInput } from './discussion-input';

const valid = {
	requestId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
	reviewRevision: 7,
	discussionRevision: 2,
	kind: 'objection',
	unitKey: 'item:analysis',
	argument: ' Falta una correlativa. ',
	sourceId: '15a17c0a-a75d-49cd-92dd-8c0b6aa06b93',
	locator: ' Página 4 '
};

test('accepts a documented comment or objection with one optional locator', () => {
	expect(parseDiscussionInput(valid)).toEqual({
		success: true,
		data: { ...valid, argument: 'Falta una correlativa.', locator: 'Página 4' }
	});
});

test('accepts canonical PostgreSQL source IDs without RFC version bits', () => {
	const sourceId = 'eaf22563-d584-026e-dd33-123456789abc';

	expect(parseDiscussionInput({ ...valid, sourceId })).toMatchObject({ success: true });
	expect(parseResolutionInput({ ...resolution, sourceId })).toMatchObject({ success: true });
	expect(
		parseDiscussionInput({ ...valid, sourceId: 'eaf22563-d584-026e-dd33-123456789ab' })
	).toMatchObject({
		success: false,
		error: expect.stringMatching(/fuente/i)
	});
});

test('allows a parent only for comments', () => {
	const parentId = '15a17c0a-a75d-49cd-92dd-8c0b6aa06b93';
	expect(parseDiscussionInput({ ...valid, kind: 'comment', parentId })).toMatchObject({
		success: true
	});
	expect(parseDiscussionInput({ ...valid, parentId })).toMatchObject({
		success: false,
		error: expect.stringMatching(/objeción/i)
	});
});

test('rejects invalid revisions and text limits without echoing input', () => {
	const result = parseDiscussionInput({
		...valid,
		reviewRevision: Number.MAX_SAFE_INTEGER + 1,
		argument: 'x'.repeat(8001)
	});

	expect(result).toMatchObject({ success: false, error: expect.stringMatching(/revisión|texto/i) });
	expect(JSON.stringify(result)).not.toContain('x'.repeat(20));
});

test('rejects browser authority fields and other extra keys', () => {
	const result = parseDiscussionInput({
		...valid,
		actor: 'untrusted-subject',
		fingerprint: 'f'.repeat(64)
	});

	expect(result).toMatchObject({ success: false, error: expect.stringMatching(/permitidos/i) });
});

const resolution = {
	requestId: '969adbaf-cc0b-48d1-a5b0-258d45a5f1bf',
	discussionId: '15a17c0a-a75d-49cd-92dd-8c0b6aa06b93',
	reviewRevision: 7,
	discussionRevision: 2,
	action: 'dismiss',
	argument: 'La fuente sí incluye la condición.',
	sourceId: '645f3b62-9223-40ea-9701-bb9737e14c91',
	locator: 'Sección 3',
	newEvidence: ' '
};

test('accepts an ordinary documented resolution with empty new evidence', () => {
	expect(parseResolutionInput(resolution)).toEqual({
		success: true,
		data: { ...resolution, newEvidence: '' }
	});
});

test('requires new evidence only when reopening a discussion', () => {
	expect(parseResolutionInput({ ...resolution, action: 'reopen' })).toMatchObject({
		success: false,
		error: expect.stringMatching(/evidencia/i)
	});
	expect(
		parseResolutionInput({
			...resolution,
			action: 'reopen',
			newEvidence: 'Nueva resolución del consejo.'
		})
	).toMatchObject({ success: true });
});

test('rejects authority fields on resolutions', () => {
	expect(parseResolutionInput({ ...resolution, actor: 'untrusted-subject' })).toMatchObject({
		success: false,
		error: expect.stringMatching(/permitidos/i)
	});
});
