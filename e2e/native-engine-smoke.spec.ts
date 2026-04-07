import { expect, test } from './fixtures';

test('native data engine renders the original list UI and keeps basic interactions working', async ({
	page,
	studyPlan
}) => {
	await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

	await expect(studyPlan.getYearSection(1)).toBeVisible();
	await expect(studyPlan.getAvailableCoursesSection()).toBeVisible();
	await expect(studyPlan.getPriorityCoursesSection()).toBeVisible();

	await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

	await expect(studyPlan.getStatByLabel(/^Materias obligatorias aprobadas/)).toContainText('1');

	await studyPlan.getDiagramViewButton().click();
	await expect(studyPlan.getDiagramRegion()).toBeVisible();
});
