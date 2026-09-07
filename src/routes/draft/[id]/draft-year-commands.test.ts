// @vitest-environment node
import { expect, test, vi } from 'vitest';

const setDraftYear = vi.fn();
const searchOffers = vi.fn();

vi.mock('$lib/collaboration/collaboration.server', () => ({
	collaborationUnavailable: () => false,
	readDraft: () => undefined,
	searchOffers,
	setDraftYear
}));

const { actions } = await import('./+page.server');

const commandEvent = (year: string) => {
	const form = new FormData();
	form.set('year', year);
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
