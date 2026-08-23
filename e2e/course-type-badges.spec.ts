import { test, expect } from './fixtures';

test.describe('Course type badges', () => {
	test('dedicated elective and optative sections do not repeat their type on every course', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlp-fi-iem-2018');

		const humanisticSection = page.locator('#electiva-humanistica');
		await expect(humanisticSection).toBeVisible();
		await expect(
			humanisticSection.getByRole('button', { name: /^Historia Social de la Tecnología/ })
		).toBeVisible();
		await expect(humanisticSection.getByText('Electiva', { exact: true })).toHaveCount(0);

		const optativeSection = page.locator('#optativas');
		await expect(optativeSection).toBeVisible();
		await expect(
			optativeSection.getByRole('button', { name: /^Tecnología de Unión de Materiales/ })
		).toBeVisible();
		await expect(optativeSection.getByText('Optativa', { exact: true })).toHaveCount(0);
	});

	test('mixed sections keep course type badges where they add information', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unsa-fce-lf-2005');

		const fifthYear = page.getByRole('region', { name: /5to Año/i });
		await expect(
			fifthYear.getByRole('button', { name: /^Física Computacional/ }).getByText('Optativa')
		).toBeVisible();
	});
});
