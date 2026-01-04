import { test, expect } from './fixtures';

test.describe('Diagram - Download Image', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.getDiagramViewButton().click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
	});

	test('download image button is visible in diagram controls', async ({ studyPlan }) => {
		await expect(studyPlan.getDiagramDownloadButton()).toBeVisible();
	});

	test('clicking download button triggers PNG file download', async ({ studyPlan, page }) => {
		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getDiagramDownloadButton().click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toMatch(/^diagrama-.*-correlatividades\.png$/);
	});

	test('downloaded filename contains the plan slug', async ({ studyPlan, page }) => {
		const downloadPromise = page.waitForEvent('download');
		await studyPlan.getDiagramDownloadButton().click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toBe('diagrama-utn-frcu-isi-2023-correlatividades.png');
	});

	test('download button is not visible in list view', async ({ studyPlan }) => {
		await studyPlan.getListViewButton().click();
		await expect(studyPlan.getDiagramDownloadButton()).not.toBeVisible();
	});
});
