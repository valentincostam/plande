import { expect, test } from './fixtures';

test.describe('native native data elective-hours pilot plan', () => {
	test('utn-frcu-isi-2023 loads and preserves core interactions on the original UI', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await expect(studyPlan.getYearSection(1)).toBeVisible();
		await expect(studyPlan.getAvailableCoursesSection()).toBeVisible();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');

		await studyPlan.getCourseButton('Análisis Matemático II').click();
		const details = await studyPlan.getCourseDetailsPanel('Análisis Matemático II');
		await expect(details).toContainText(
			'Álgebra y Geometría Analítica de 1er año debe estar al menos Regular'
		);

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
	});
});
