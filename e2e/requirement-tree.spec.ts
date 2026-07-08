import { expect, test } from './fixtures';

test.describe('Requirement rendering and multi-placement stats', () => {
	test('multi-placement course counts once in stats', async ({ page, studyPlan }) => {
		// utn-frcu-ic-2023 has 50 courses; Proyecto Final is placed in both
		// 5th and 6th year but must count once.
		await studyPlan.goto('utn-frcu-ic-2023');

		const passedStat = studyPlan.getStatByLabel(/^Materias aprobadas/);
		await expect(passedStat).toContainText('50');
		await expect(passedStat).not.toContainText('51');
		await expect(
			page.getByRole('region', { name: 'Diagrama de correlatividades' })
		).toHaveCount(0);
	});

	test('quantitative milestone requirements read as sentences, not raw selectors', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlam-dce-lci');

		await page
			.getByRole('button', {
				name: 'Título intermedio: Técnico Universitario en Comercio Internacional',
				exact: true
			})
			.click();

		await expect(page.getByText('Requisitos para completarlo')).toBeVisible();
		await expect(page.getByText(/materias aprobadas/i).first()).toBeVisible();
		await expect(page.getByText(/items de section/i)).toHaveCount(0);
	});
});
