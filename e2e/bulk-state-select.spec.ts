import { test, expect } from './fixtures';

test.describe('Bulk state select visibility - Years', () => {
	test('year 1 always shows bulk select in strict mode', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		// Year 1 should always show bulk select (no previous year requirement)
		const year1BulkSelect = studyPlan.getYearBulkSelect(1);
		await expect(year1BulkSelect).toBeVisible();
	});

	test('year 2 hides bulk select when year 1 not passed in strict mode', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		// By default, year 1 is not passed, so year 2 bulk select should be hidden
		const year2BulkSelect = studyPlan.getYearBulkSelect(2);
		await expect(year2BulkSelect).not.toBeVisible();
	});

	test('year 2 shows bulk select when year 1 is passed', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		// Pass all courses in year 1
		await studyPlan.setYearState(1, 'Aprobadas');

		// Now year 2 bulk select should be visible
		const year2BulkSelect = studyPlan.getYearBulkSelect(2);
		await expect(year2BulkSelect).toBeVisible();
	});

	test('all years show bulk select when strict mode disabled', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		// Disable strict mode
		const strictModeToggle = studyPlan.getStrictModeToggle();
		await strictModeToggle.click();

		// All years should show bulk select
		await expect(studyPlan.getYearBulkSelect(1)).toBeVisible();
		await expect(studyPlan.getYearBulkSelect(2)).toBeVisible();
		await expect(studyPlan.getYearBulkSelect(3)).toBeVisible();
		await expect(studyPlan.getYearBulkSelect(4)).toBeVisible();
		await expect(studyPlan.getYearBulkSelect(5)).toBeVisible();
	});
});

test.describe('Bulk state select visibility - Terms', () => {
	test('term shows bulk select when all its courses are enabled', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		// Verify all courses in year 1, first semester are enabled (no requirements)
		await expect(studyPlan.getCourseStateButton('Álgebra y Geometría Analítica')).toBeEnabled();
		await expect(studyPlan.getCourseStateButton('Inglés I')).toBeEnabled();
		await expect(studyPlan.getCourseStateButton('Ingeniería y Sociedad')).toBeEnabled();
		await expect(studyPlan.getCourseStateButton('Lógica y Estructuras Discretas')).toBeEnabled();

		// Therefore, the term bulk select is visible
		const year1Section = studyPlan.getYearSection(1);
		const termBulkSelect = year1Section.getByRole('combobox', {
			name: 'Cambiar estado de todas las materias de Primer cuatrimestre'
		});
		await expect(termBulkSelect).toBeVisible();
	});

	test('term hides bulk select when at least one course is blocked', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const year2Section = studyPlan.getYearSection(2);

		// Verify at least one course in year 2, second semester is blocked
		// Paradigmas requires Lógica and Algoritmos; Sistemas Operativos requires Arquitectura
		// Blocked courses show "Bloqueada" badge instead of state select
		const paradigmasButton = studyPlan.getCourseButton('Paradigmas de Programación');
		const sistemasButton = studyPlan.getCourseButton('Sistemas Operativos');
		await expect(paradigmasButton.getByText('Bloqueada')).toBeVisible();
		await expect(sistemasButton.getByText('Bloqueada')).toBeVisible();

		// Therefore, the term bulk select is NOT visible
		const termBulkSelect = year2Section.getByRole('combobox', {
			name: 'Cambiar estado de todas las materias de Segundo cuatrimestre'
		});
		await expect(termBulkSelect).not.toBeVisible();
	});
});

test.describe('Bulk state select functionality', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('selecting "No cursadas" changes all courses in year to not taken', async ({
		studyPlan
	}) => {
		// First set some courses to another state
		await studyPlan.setYearState(1, 'Aprobadas');

		// Verify a course is in passed state
		const algebraStateButton = studyPlan.getCourseStateButton('Álgebra y Geometría Analítica');
		await expect(algebraStateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Aprobada'
		);

		// Change all to "No cursadas"
		await studyPlan.setYearState(1, 'No cursadas');

		// Verify the course changed
		await expect(algebraStateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: No cursada'
		);
	});

	test('selecting "En curso" changes all courses in year to in progress', async ({ studyPlan }) => {
		await studyPlan.setYearState(1, 'En curso');

		const algebraStateButton = studyPlan.getCourseStateButton('Álgebra y Geometría Analítica');
		await expect(algebraStateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: En curso'
		);
	});

	test('selecting "Regulares" changes all courses in year to taken', async ({ studyPlan }) => {
		await studyPlan.setYearState(1, 'Regulares');

		const algebraStateButton = studyPlan.getCourseStateButton('Álgebra y Geometría Analítica');
		await expect(algebraStateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Regular'
		);
	});

	test('selecting "Aprobadas" changes all courses in year to passed', async ({ studyPlan }) => {
		await studyPlan.setYearState(1, 'Aprobadas');

		const algebraStateButton = studyPlan.getCourseStateButton('Álgebra y Geometría Analítica');
		await expect(algebraStateButton).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Aprobada'
		);
	});

	test('select resets to placeholder after selection', async ({ studyPlan }) => {
		const yearBulkSelect = studyPlan.getYearBulkSelect(1);

		await studyPlan.setYearState(1, 'Aprobadas');

		// The select should reset to placeholder
		await expect(yearBulkSelect.getByRole('option', { selected: true })).toHaveText(
			'Cambiar materias a...'
		);
	});
});

test.describe('Bulk state select for year', () => {
	test('"Aprobadas" is enabled when previous year is passed, regardless of individual course canPass', async ({
		studyPlan
	}) => {
		// Use utn-frba-iq-1995 which has completion requirements
		// AM II requires Álgebra and AM I to be "Aprobada" to pass
		await studyPlan.goto('utn-frba-iq-1995');

		// Pass all of year 1 - this should enable year 2 bulk select
		await studyPlan.setYearState(1, 'Aprobadas');

		// Verify year 2 bulk select is visible
		const year2BulkSelect = studyPlan.getYearBulkSelect(2);
		await expect(year2BulkSelect).toBeVisible();

		// The "Aprobadas" option should be ENABLED and selectable
		// Even if some courses in year 2 have requirementsForCompletion that aren't met yet,
		// the bulk select should allow it because when approving sequentially,
		// dependencies within the year will be satisfied
		const aprobadasOption = year2BulkSelect.getByRole('option', { name: 'Aprobadas' });
		await expect(aprobadasOption).toBeEnabled();
	});

	test('bulk select can pass entire year even with internal dependencies', async ({
		studyPlan
	}) => {
		// Use utn-frba-iq-1995 which has completion requirements
		// Física II (year 2, 2nd semester) requires Física I (year 2, 1st semester) as "Aprobada" to complete
		await studyPlan.goto('utn-frba-iq-1995');

		// Pass year 1 to enable year 2
		await studyPlan.setYearState(1, 'Aprobadas');

		// Set year 2 to "Regular" so courses are enrolled but not passed
		// This enables Física II to be cursada (Física I is "Regular")
		await studyPlan.setYearState(2, 'Regulares');

		// Verify Física II cannot pass individually (Física I is "Regular", not "Aprobada")
		const fisica2StateButton = studyPlan.getCourseStateButton('Física II');
		await expect(fisica2StateButton).toHaveAccessibleName('Estado de Física II: Regular');

		// A click skips the invalid passed state and wraps around instead
		await fisica2StateButton.click();
		await expect(fisica2StateButton).toHaveAccessibleName('Estado de Física II: No cursada');

		// Now bulk-pass year 2 - this should work because when approving sequentially,
		// Física I gets approved before Física II, satisfying the dependency
		await studyPlan.setYearState(2, 'Aprobadas');

		// Verify both courses in year 2 are now passed
		const fisica1StateButton = studyPlan.getCourseStateButton('Física I');
		await expect(fisica1StateButton).toHaveAccessibleName('Estado de Física I: Aprobada');
		await expect(fisica2StateButton).toHaveAccessibleName('Estado de Física II: Aprobada');
	});
});
