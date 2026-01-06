import { test, expect } from './fixtures';

test.describe('Priority courses section', () => {
	test('shows section with title and description', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		await expect(section).toBeVisible();
		await expect(section.getByRole('heading', { name: /orden de prioridad/i })).toBeVisible();
		await expect(section.getByText(/conviene priorizarlas/i)).toBeVisible();
	});

	test('shows table with correct columns', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		await expect(table).toBeVisible();

		await expect(table.getByRole('columnheader', { name: '#' })).toBeVisible();
		await expect(table.getByRole('columnheader', { name: 'Materia', exact: true })).toBeVisible();
		await expect(table.getByRole('columnheader', { name: /cantidad de materias/i })).toBeVisible();
	});

	test('courses are sorted by dependent count (descending)', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const rows = table.getByRole('row');

		const firstRowUnlocks = await rows.nth(1).getByRole('cell').last().textContent();
		const secondRowUnlocks = await rows.nth(2).getByRole('cell').last().textContent();

		const first = parseInt(firstRowUnlocks ?? '0');
		const second = parseInt(secondRowUnlocks ?? '0');

		expect(first).toBeGreaterThanOrEqual(second);
	});

	test('includes courses with 0 dependents', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const rows = table.getByRole('row');
		const rowCount = await rows.count();

		let hasZeroDependents = false;
		for (let i = 1; i < rowCount; i++) {
			const unlocks = await rows.nth(i).getByRole('cell').last().textContent();
			const count = parseInt(unlocks ?? '0');
			if (count === 0) {
				hasZeroDependents = true;
				break;
			}
		}

		expect(hasZeroDependents).toBe(true);
	});

	test('table order is static and does not change when course state changes', async ({
		studyPlan
	}) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const firstCourseNameBefore = await table
			.getByRole('row')
			.nth(1)
			.getByRole('link')
			.textContent();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const firstCourseNameAfter = await table
			.getByRole('row')
			.nth(1)
			.getByRole('link')
			.textContent();
		expect(firstCourseNameAfter).toBe(firstCourseNameBefore);
	});

	test('shows course state and updates when state changes', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const firstRow = table.getByRole('row').nth(1);

		await expect(firstRow.getByText('No cursada')).toBeVisible();

		const courseName = await firstRow.getByRole('link').textContent();
		await studyPlan.setCourseState(courseName!.trim(), 'Aprobada');

		await expect(firstRow.getByText('Aprobada')).toBeVisible();
	});

	test('shows year with correct superscript format', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const periodCells = table.getByRole('cell').filter({ hasText: /año/i });
		const count = await periodCells.count();

		expect(count).toBeGreaterThan(0);

		const firstPeriodCell = periodCells.first();
		await expect(firstPeriodCell.locator('sup').first()).toBeVisible();
	});

	test('shows course codes when setting is enabled', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const showCodesToggle = studyPlan.getShowCodesToggle();

		await showCodesToggle.check();

		const materiaCells = table.getByRole('row').nth(1).getByRole('cell').nth(1);
		const text = await materiaCells.textContent();

		expect(text).toMatch(/^\d+\./);
	});

	test('clicking course name in list mode scrolls to course section', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const firstCourseLink = table.getByRole('link').first();
		const courseName = await firstCourseLink.textContent();

		await firstCourseLink.click();

		const courseButton = studyPlan.getCourseButton(courseName!.trim()).first();
		await expect(courseButton).toBeInViewport();
	});

	test('clicking course name in diagram mode shows course node in viewport', async ({
		studyPlan
	}) => {
		await studyPlan.goto();

		await studyPlan.getDiagramViewButton().click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();

		const table = studyPlan.getPriorityCoursesTable();
		await table.scrollIntoViewIfNeeded();

		const firstCourseLink = table.getByRole('link').first();
		const courseName = await firstCourseLink.textContent();
		await firstCourseLink.click();

		const diagramRegion = studyPlan.getDiagramRegion();
		const courseNode = diagramRegion.getByText(courseName!.trim()).first();
		await expect(courseNode).toBeInViewport();
	});

	test('hides passed courses when checkbox is unchecked', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		const table = studyPlan.getPriorityCoursesTable();
		const checkbox = section.getByRole('checkbox', { name: /mostrar materias aprobadas/i });

		const firstCourseName = await table.getByRole('row').nth(1).getByRole('link').textContent();
		await studyPlan.setCourseState(firstCourseName!.trim(), 'Aprobada');

		await expect(checkbox).toBeChecked();
		await expect(
			table.getByRole('link', { name: firstCourseName!.trim(), exact: true })
		).toBeVisible();

		await checkbox.uncheck();
		await expect(
			table.getByRole('link', { name: firstCourseName!.trim(), exact: true })
		).not.toBeVisible();
	});

	test('shows elective courses checkbox checked by default', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		const checkbox = section.getByRole('checkbox', { name: /mostrar materias electivas/i });

		await expect(checkbox).toBeVisible();
		await expect(checkbox).toBeChecked();
	});

	test('hides elective courses when checkbox is unchecked', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		const table = studyPlan.getPriorityCoursesTable();
		const checkbox = section.getByRole('checkbox', { name: /mostrar materias electivas/i });

		await expect(table.getByRole('link', { name: 'Emprendedorismo', exact: true })).toBeVisible();

		await checkbox.uncheck();

		await expect(
			table.getByRole('link', { name: 'Emprendedorismo', exact: true })
		).not.toBeVisible();
	});

	test('shows elective courses again when checkbox is re-checked', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		const table = studyPlan.getPriorityCoursesTable();
		const checkbox = section.getByRole('checkbox', { name: /mostrar materias electivas/i });

		await checkbox.uncheck();
		await expect(
			table.getByRole('link', { name: 'Emprendedorismo', exact: true })
		).not.toBeVisible();

		await checkbox.check();
		await expect(table.getByRole('link', { name: 'Emprendedorismo', exact: true })).toBeVisible();
	});

	test('combines filters - hides passed elective when both checkboxes unchecked', async ({
		studyPlan
	}) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		const table = studyPlan.getPriorityCoursesTable();
		const passedCheckbox = section.getByRole('checkbox', { name: /mostrar materias aprobadas/i });
		const electiveCheckbox = section.getByRole('checkbox', { name: /mostrar materias electivas/i });

		await studyPlan.getStrictModeToggle().uncheck();
		await studyPlan.setCourseState('Emprendedorismo', 'Aprobada');
		await expect(table.getByRole('link', { name: 'Emprendedorismo', exact: true })).toBeVisible();

		await passedCheckbox.uncheck();
		await expect(
			table.getByRole('link', { name: 'Emprendedorismo', exact: true })
		).not.toBeVisible();

		await passedCheckbox.check();
		await electiveCheckbox.uncheck();
		await expect(
			table.getByRole('link', { name: 'Emprendedorismo', exact: true })
		).not.toBeVisible();
	});

	test('shows optativas label for plans with optative courses', async ({ studyPlan }) => {
		await studyPlan.goto('unaj-ics-kf');

		const section = studyPlan.getPriorityCoursesSection();
		const checkbox = section.getByRole('checkbox', { name: /mostrar materias optativas/i });

		await expect(checkbox).toBeVisible();
		await expect(checkbox).toBeChecked();
	});
});
