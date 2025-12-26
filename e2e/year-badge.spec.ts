import { test, expect } from './fixtures';

test.describe('Year badge "Aprobado"', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('year badge is not visible when no courses are passed', async ({ studyPlan }) => {
		const yearSection = studyPlan.getYearSection(1);

		// By default, no courses are passed, so badge should not be visible
		await expect(yearSection.getByText('Aprobado', { exact: true })).not.toBeVisible();
	});

	test('year badge is not visible when only some courses are passed', async ({ studyPlan }) => {
		const yearSection = studyPlan.getYearSection(1);

		// Pass only one course - badge should not appear
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await expect(yearSection.getByText('Aprobado', { exact: true })).not.toBeVisible();
	});

	test('year badge appears when all courses in year are passed', async ({ studyPlan }) => {
		const yearSection = studyPlan.getYearSection(1);

		// Use bulk select to pass all courses in year 1
		await studyPlan.setYearState(1, 'Aprobadas');

		// Badge should now be visible
		await expect(yearSection.getByText('Aprobado', { exact: true })).toBeVisible();
	});

	test('year badge disappears when a course state is lowered', async ({ studyPlan }) => {
		const yearSection = studyPlan.getYearSection(1);

		// First, pass all courses in year 1
		await studyPlan.setYearState(1, 'Aprobadas');
		await expect(yearSection.getByText('Aprobado', { exact: true })).toBeVisible();

		// Now lower one course to "Regular"
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');

		// Badge should disappear
		await expect(yearSection.getByText('Aprobado', { exact: true })).not.toBeVisible();
	});

	test('year badge shows masculine form "Aprobado" not "Aprobada"', async ({ studyPlan }) => {
		const yearSection = studyPlan.getYearSection(1);
		// The header contains the year title and the badge
		const yearHeader = yearSection.locator('header');

		// Pass all courses
		await studyPlan.setYearState(1, 'Aprobadas');

		// Should show "Aprobado" (masculine for "año") in the header
		await expect(yearHeader.getByText('Aprobado', { exact: true })).toBeVisible();
		// Should NOT show "Aprobada" (feminine) in the header
		await expect(yearHeader.getByText('Aprobada', { exact: true })).not.toBeVisible();
	});
});
