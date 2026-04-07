import { expect, test } from './fixtures';

test.describe('native data engine bulk state select on original UI', () => {
	test('year bulk select still updates all courses and preserves URL state', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await studyPlan.setYearState(1, 'Aprobadas');

		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
		await expect(studyPlan.getCourseStateControl('Análisis Matemático I')).toHaveAccessibleName(
			'Estado de Análisis Matemático I: Aprobada'
		);
		await expect(page).toHaveURL(/s=/);
		await expect(page).not.toHaveURL(/engine=/);
	});
});
