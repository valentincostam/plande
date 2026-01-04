import { test, expect } from './fixtures';

test.describe('Diagram fullscreen mode', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
	});

	test('entering fullscreen hides body scrollbar', async ({ studyPlan }) => {
		expect(await studyPlan.getBodyOverflow()).toBe('');

		await studyPlan.getFullscreenButton().click();

		await expect(studyPlan.getExitFullscreenButton()).toBeVisible();
		expect(await studyPlan.getBodyOverflow()).toBe('hidden');
	});

	test('pressing Escape exits fullscreen and restores scrollbar', async ({ studyPlan, page }) => {
		await studyPlan.getFullscreenButton().click();
		await expect(studyPlan.getExitFullscreenButton()).toBeVisible();
		expect(await studyPlan.getBodyOverflow()).toBe('hidden');

		await page.keyboard.press('Escape');

		await expect(studyPlan.getFullscreenButton()).toBeVisible();
		expect(await studyPlan.getBodyOverflow()).toBe('');
	});

	test('clicking exit button restores scrollbar', async ({ studyPlan }) => {
		await studyPlan.getFullscreenButton().click();
		expect(await studyPlan.getBodyOverflow()).toBe('hidden');

		await studyPlan.getExitFullscreenButton().click();

		await expect(studyPlan.getFullscreenButton()).toBeVisible();
		expect(await studyPlan.getBodyOverflow()).toBe('');
	});
});
