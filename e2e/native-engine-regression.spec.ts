import { expect, test } from './fixtures';

test.describe('native data engine on original UI', () => {
	test('re-blocks dependent courses when prerequisites are lowered', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		const analisisMatematicoII = studyPlan.getCourseStateControl('Análisis Matemático II');
		await expect(analisisMatematicoII).toBeEnabled();

		await studyPlan.setCourseState('Análisis Matemático II', 'Regular');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'No cursada');

		await expect(studyPlan.getCourseButton('Análisis Matemático II')).toHaveAccessibleName(
			/bloqueada por correlativas/i
		);
		await expect(studyPlan.getCourseButton('Análisis Matemático II')).toContainText('Bloqueada');
	});

	test('persists state in the URL using native data as the default engine', async ({ page, studyPlan }) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await expect(page).toHaveURL(/s=/);

		await page.reload({ waitUntil: 'networkidle' });

		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
		await expect(page).not.toHaveURL(/engine=/);
	});
});
