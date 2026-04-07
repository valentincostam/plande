import { expect, test } from './fixtures';

test.describe('native native data cross-year pilot plan', () => {
	test('utn-frcu-ic-2023 loads and preserves cross-year rendering on the original UI', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-ic-2023', { waitUntil: 'networkidle' });

		await expect(studyPlan.getYearSection(5)).toBeVisible();
		await expect(studyPlan.getYearSection(6)).toBeVisible();
		await expect(studyPlan.getAvailableCoursesSection()).toBeVisible();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');

		const year6Section = studyPlan.getYearSection(6);
		await expect(
			year6Section.getByRole('button', { name: /^Proyecto Final(?:,|$)/ })
		).toBeVisible();

		const projectButton = year6Section.getByRole('button', { name: /^Proyecto Final(?:,|$)/ });
		await projectButton.click();
		const panelId = await projectButton.getAttribute('aria-controls');
		expect(panelId).toBeTruthy();
		const details = page.locator(`#${panelId}`);
		await expect(details).toContainText(
			'Instalaciones Sanitarias y de Gas de 4to año debe estar al menos Regular'
		);

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
		await expect(studyPlan.getDiagramCourseNode('Proyecto Final')).toBeVisible();
	});
});
