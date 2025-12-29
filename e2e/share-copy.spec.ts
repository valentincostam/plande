import { test, expect } from './fixtures';

test.describe('Copy Link Button', () => {
	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	});

	test('copy link button is visible', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await expect(studyPlan.getCopyLinkButton()).toBeVisible();
	});

	test('clicking copy button shows "Copiado" feedback', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.getCopyLinkButton().click();

		await expect(page.getByRole('button', { name: 'Copiado' })).toBeVisible();
	});

	test('copied URL matches current page URL', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.getCopyLinkButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
		const currentUrl = page.url();

		expect(clipboardText).toBe(currentUrl);
	});

	test('copied URL excludes hash fragment', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await page.evaluate(() => {
			window.location.hash = '#some-hash';
		});

		await studyPlan.getCopyLinkButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).not.toContain('#');
	});

	test('copied URL includes state parameter when course is modified', async ({
		studyPlan,
		page
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await studyPlan.getCopyLinkButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).toContain('?s=');
	});
});

test.describe('Share Button', () => {
	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	});

	test('share button is visible', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await expect(studyPlan.getShareButton()).toBeVisible();
	});

	test('clicking share button shows "Link copiado" feedback', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.getShareButton().click();

		await expect(page.getByText('¡Link copiado!')).toBeVisible();
	});

	test('share button copies URL to clipboard', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.getShareButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
		const currentUrl = page.url();

		expect(clipboardText).toBe(currentUrl);
	});

	test('share button copies URL with state when courses are modified', async ({
		studyPlan,
		page
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await studyPlan.getShareButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).toContain('?s=');
	});
});

test.describe('URL State in Shared Links', () => {
	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	});

	test('shared link preserves multiple course states in new browser', async ({
		studyPlan,
		page,
		browser
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		await studyPlan.getCopyLinkButton().click();

		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

		expect(clipboardText).toContain('?s=');

		const newContext = await browser.newContext();
		const newPage = await newContext.newPage();
		await newPage.goto(clipboardText, { waitUntil: 'networkidle' });

		const algebraSelect = newPage.getByRole('combobox', {
			name: 'Estado de Álgebra y Geometría Analítica',
			exact: true
		});
		const analisisSelect = newPage.getByRole('combobox', {
			name: 'Estado de Análisis Matemático I',
			exact: true
		});

		await expect(algebraSelect).toContainText('Aprobada');
		await expect(analisisSelect).toContainText('Regular');

		await newContext.close();
	});
});
