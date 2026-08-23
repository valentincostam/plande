import { expect, test } from './fixtures';

// UNaHur requires N regularized courses (any of the plan) before enrolling in
// some subjects — modeled as count-over-all requirements.
test.describe('Courses gated by a count of regularized courses', () => {
	test('course unlocks after regularizing enough courses anywhere in the plan', async ({
		studyPlan
	}) => {
		await studyPlan.goto('unahur-ie-pui-2024');

		const esiButton = studyPlan.getCourseButton('Educación Sexual Integral');
		const esiStateControl = studyPlan.getCourseStateControl('Educación Sexual Integral');

		// Blocked at start: requires 5 regularized courses
		await expect(esiButton).toHaveAttribute('aria-label', /bloqueada por correlativas/i);
		await expect(esiStateControl).not.toBeVisible();

		await esiButton.click();
		const esiPanel = await studyPlan.getCourseDetailsPanel('Educación Sexual Integral');
		expect(
			(await esiPanel.getByText(/5 materias del plan/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('5 materias del plan deben estar Regulares pero ninguna lo está (faltan 5)');
		await expect(esiPanel.getByText('(0 de 5)', { exact: true })).not.toBeVisible();
		await esiButton.click();

		const firstYearCourses = [
			'Lengua Inglesa I',
			'Gramática Inglesa I',
			'Fonética y Práctica en Laboratorio I',
			'Pedagogía',
			'Lectura, Escritura y Oralidad'
		];

		for (const course of firstYearCourses.slice(0, 4)) {
			await studyPlan.setCourseState(course, 'Regular');
		}

		// Still blocked with 4 of 5
		await expect(esiButton).toHaveAttribute('aria-label', /bloqueada por correlativas/i);
		await esiButton.click();
		expect(
			(await esiPanel.getByText(/5 materias del plan/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('5 materias del plan deben estar Regulares pero solo 4 lo están (falta 1)');
		await esiButton.click();

		await studyPlan.setCourseState(firstYearCourses[4], 'Regular');

		await expect(esiButton).not.toHaveAttribute('aria-label', /bloqueada/i);
		await expect(esiStateControl).toBeVisible();
		await esiButton.click();
		expect(
			(await esiPanel.getByText(/5 materias del plan/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('5 materias del plan deben estar Regulares');
	});
});
