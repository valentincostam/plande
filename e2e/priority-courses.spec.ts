import { test, expect } from './fixtures';

test.describe('Priority courses section', () => {
	test('shows section with title and description', async ({ studyPlan }) => {
		await studyPlan.goto();

		const section = studyPlan.getPriorityCoursesSection();
		await expect(section).toBeVisible();
		await expect(section.getByRole('heading', { name: /orden de prioridad/i })).toBeVisible();
		await expect(section.getByText(/si las aprobás primero/i)).toBeVisible();
	});

	test('shows table with correct columns', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		await expect(table).toBeVisible();

		await expect(table.getByRole('columnheader', { name: '#' })).toBeVisible();
		await expect(table.getByRole('columnheader', { name: 'Materia', exact: true })).toBeVisible();
		await expect(table.getByRole('columnheader', { name: /período/i })).toBeVisible();
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

	test('excludes courses with 1 or fewer dependents', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const rows = table.getByRole('row');
		const rowCount = await rows.count();

		for (let i = 1; i < rowCount; i++) {
			const unlocks = await rows.nth(i).getByRole('cell').last().textContent();
			const count = parseInt(unlocks ?? '0');
			expect(count).toBeGreaterThan(1);
		}
	});

	test('table is static and does not change when course state changes', async ({ studyPlan }) => {
		await studyPlan.goto();

		const table = studyPlan.getPriorityCoursesTable();
		const firstRowBefore = await table.getByRole('row').nth(1).textContent();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const firstRowAfter = await table.getByRole('row').nth(1).textContent();
		expect(firstRowAfter).toBe(firstRowBefore);
	});

	test('shows period with correct superscript format', async ({ studyPlan }) => {
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
});
