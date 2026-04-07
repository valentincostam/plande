import { expect, test } from './fixtures';

test.describe('native native data second pilot plan', () => {
	test('issd-tscdia loads and preserves core interactions on the original UI', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/issd-tscdia', { waitUntil: 'networkidle' });

		await expect(studyPlan.getYearSection(1)).toBeVisible();
		await expect(studyPlan.getAvailableCoursesSection()).toBeVisible();

		await studyPlan.setCourseState('Programación 1', 'Aprobada');
		await expect(studyPlan.getCourseStateControl('Programación 1')).toHaveAccessibleName(
			'Estado de Programación 1: Aprobada'
		);

		await studyPlan.getCourseButton('Programación 2').click();
		const details = await studyPlan.getCourseDetailsPanel('Programación 2');
		await expect(details).toContainText('Programación 1 de 1er año debe estar al menos Regular');
		await expect(details).toContainText('Programación 1 de 1er año debe estar Aprobada');

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
	});
});
