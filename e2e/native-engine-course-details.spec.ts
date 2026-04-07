import { expect, test } from './fixtures';

test.describe('native data engine course details on original UI', () => {
	test('shows requirements and dependents in the same details UI', async ({ page, studyPlan }) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		const courseButton = studyPlan.getCourseButton('Análisis Matemático II');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		await expect(panel.getByText('Requisitos para cursar y rendir', { exact: true })).toBeVisible();
		await expect(panel.getByRole('link', { name: 'Álgebra y Geometría Analítica' })).toBeVisible();
		await expect(panel.getByRole('link', { name: 'Análisis Matemático I' })).toBeVisible();

		await studyPlan.getCourseButton('Álgebra y Geometría Analítica').click();
		const algebraPanel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		await expect(algebraPanel.getByText('Materias que desbloquea', { exact: true })).toBeVisible();
		await expect(
			algebraPanel.getByText(/Análisis Matemático II.*necesita esta materia/)
		).toBeVisible();
	});
});
