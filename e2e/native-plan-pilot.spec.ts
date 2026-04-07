import { expect, test } from './fixtures';

test.describe('native native data pilot plan', () => {
	test('unca-fca-tupazsa loads and preserves core interactions on the original UI', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/unca-fca-tupazsa', { waitUntil: 'networkidle' });

		await expect(studyPlan.getYearSection(1)).toBeVisible();
		await expect(studyPlan.getAvailableCoursesSection()).toBeVisible();

		await studyPlan.setCourseState('Sistemas Agropecuarios', 'Aprobada');
		await expect(studyPlan.getCourseStateControl('Sistemas Agropecuarios')).toHaveAccessibleName(
			'Estado de Sistemas Agropecuarios: Aprobada'
		);

		await studyPlan.getCourseButton('Seguridad e Higiene Laboral').click();
		const details = await studyPlan.getCourseDetailsPanel('Seguridad e Higiene Laboral');
		await expect(details.getByRole('link', { name: 'Sistemas Agropecuarios' })).toBeVisible();

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();
	});
});
