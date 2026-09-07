import { expect, test } from '@playwright/test';

test('QA plan reading sends no progress markers to analytics or browser logs', async ({ page }) => {
	test.skip(process.env.PLANDE_QA_READER !== '1', 'Run with the local Supabase QA reader.');
	const stateMarker = 'n3ar2en5a2';
	const gradeMarker = 'n3jn2h';
	const containsMarker = (value: string) =>
		value.includes(stateMarker) || value.includes(gradeMarker);
	const requests: string[] = [];
	const messages: string[] = [];
	page.on('request', (request) => requests.push(request.url()));
	page.on('console', (message) => messages.push(message.text()));
	page.on('pageerror', (error) => messages.push(error.message));

	await page.goto(`/uns-dcs-le-2017?s=${stateMarker}&n=${gradeMarker}`);
	await expect(
		page.getByRole('heading', { name: 'Licenciatura en Enfermería', exact: true })
	).toBeVisible();
	await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'false');
	await page
		.getByRole('combobox', { name: 'Estado de Antropología y Salud: Regular', exact: true })
		.selectOption({ label: 'Aprobada' });
	await expect(
		page.getByRole('combobox', { name: 'Estado de Antropología y Salud: Aprobada', exact: true })
	).toBeVisible();
	await page.waitForLoadState('networkidle');

	const origin = new URL(page.url()).origin;
	const external = requests.filter((request) => new URL(request).origin !== origin);
	expect(external.filter(containsMarker)).toEqual([]);
	expect(
		requests.filter((request) =>
			/clarity\.ms|vercel-insights|\/analytics\/|\/_vercel\/insights/.test(request)
		)
	).toEqual([]);
	expect(messages.filter(containsMarker)).toEqual([]);
});
