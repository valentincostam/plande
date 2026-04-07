import { expect, test } from './fixtures';

test.describe('native data engine available courses and priority on original UI', () => {
	test('passing prerequisites unlocks a course in the available section', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		const availableSection = studyPlan.getAvailableCoursesSection();
		await expect(availableSection).not.toContainText('Análisis Matemático II');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		await expect(availableSection).toContainText('Análisis Matemático II');
	});

	test('priority section still shows unlock counts and responds to state changes', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		const prioritySection = studyPlan.getPriorityCoursesSection();
		await expect(prioritySection).toContainText('Álgebra y Geometría Analítica');
		await expect(prioritySection).toContainText('Análisis Matemático I');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await expect(prioritySection).toContainText('Aprobada');
	});
});
