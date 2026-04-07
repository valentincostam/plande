import { expect, test } from './fixtures';

test.describe('native data engine settings on original UI', () => {
	test('show codes toggle still affects visible course labels', async ({ page, studyPlan }) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		const showCodesToggle = studyPlan.getShowCodesToggle();
		await expect(showCodesToggle).not.toBeChecked();
		await showCodesToggle.click();

		await expect(studyPlan.getCourseButton('Álgebra y Geometría Analítica')).toContainText('1.');
		await expect(page).not.toHaveURL(/engine=/);
	});

	test('reset button clears progress on the native data default route', async ({ page, studyPlan }) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await expect(page.getByText('Aprobada (1)')).toBeVisible();

		page.on('dialog', (dialog) => dialog.accept());
		await studyPlan.getResetProgressButton().click();

		await expect(page.getByText('No cursada (46)')).toBeVisible();
		await expect(page).not.toHaveURL(/engine=/);
	});
});
