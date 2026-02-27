import { test, expect } from './fixtures';

test.describe('Section Anchor Links', () => {
	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	});

	test('section anchor link is visible', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await expect(anchorLink).toBeVisible();
	});

	test('clicking anchor link shows "Link copiado" feedback', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await anchorLink.click();

		await expect(page.getByText('Link copiado')).toBeVisible();
	});

	test('copied URL includes hash fragment', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await anchorLink.click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).toContain('#estadisticas');
	});

	test('copied URL includes state parameters when course is modified', async ({
		studyPlan,
		page
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await anchorLink.click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).toContain('?s=');
		expect(clipboardText).toContain('#estadisticas');
	});

	test('URL hash is updated when clicking anchor link', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await anchorLink.click();

		expect(page.url()).toContain('#estadisticas');
	});

	test('year anchor link copies readable year hash', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frba-isi-2023');

		const yearSection = page.getByRole('region', { name: /quinto Año/i });
		const anchorLink = yearSection.getByRole('link', { name: 'Copiar enlace a 5to año' });

		await anchorLink.click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(decodeURIComponent(clipboardText)).toContain('#5to-año');
	});

	test('hash fragment is preserved after hydration and URL state updates', async ({ page }) => {
		await page.goto('/utn-frba-isi-2023#5to-año', { waitUntil: 'networkidle' });

		await expect.poll(() => page.evaluate(() => window.location.hash)).toBe('#5to-a%C3%B1o');

		const algebraSelect = page.getByRole('combobox', {
			name: 'Estado de Álgebra y Geometría Analítica',
			exact: true
		});
		await algebraSelect.selectOption({ label: 'Aprobada' });

		await expect.poll(() => page.evaluate(() => window.location.hash)).toBe('#5to-a%C3%B1o');
		await expect(page).toHaveURL(/\?s=.*#5to-a%C3%B1o$/);
	});

	test('shared section link preserves course state in new browser', async ({
		studyPlan,
		page,
		browser
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const section = page.getByRole('region', { name: 'Estadísticas' });
		const anchorLink = section.getByRole('link', { name: 'Copiar enlace a Estadísticas' });

		await anchorLink.click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		const newContext = await browser.newContext();
		const newPage = await newContext.newPage();
		await newPage.goto(clipboardText, { waitUntil: 'networkidle' });

		const algebraSelect = newPage.getByRole('combobox', {
			name: 'Estado de Álgebra y Geometría Analítica',
			exact: true
		});

		await expect(algebraSelect).toContainText('Aprobada');

		await newContext.close();
	});
});
