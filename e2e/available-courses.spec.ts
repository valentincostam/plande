import { test, expect } from './fixtures';

test.describe('Available courses', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto();
	});

	test('courses without prerequisites appear as available initially', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();

		// Algebra has no prerequisites, should appear in "Qué podés cursar"
		await expect(section.getByText('Álgebra y Geometría Analítica')).toBeVisible();

		// AM2 has unmet prerequisites, should NOT appear
		await expect(section.getByText('Análisis Matemático II')).not.toBeVisible();
	});

	test('passing prerequisites adds course to available', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();

		// AM2 is not available initially
		await expect(section.getByText('Análisis Matemático II')).not.toBeVisible();

		// Pass AM2 prerequisites
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Regular');
		await studyPlan.setCourseState('Análisis Matemático I', 'Regular');

		// Now AM2 appears as available
		await expect(section.getByText('Análisis Matemático II')).toBeVisible();
	});

	test('enrolling in course removes it from available', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();

		// Algebra is available
		await expect(section.getByText('Álgebra y Geometría Analítica')).toBeVisible();

		// User sets it to "En curso"
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'En curso');

		// No longer appears in available
		await expect(section.getByText('Álgebra y Geometría Analítica')).not.toBeVisible();
	});

	test('disabling strict mode shows all courses available', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();
		const strictModeToggle = studyPlan.getStrictModeToggle();

		// With strict mode, AM2 is not available
		await expect(section.getByText('Análisis Matemático II')).not.toBeVisible();

		// Disable strict mode
		await strictModeToggle.uncheck();

		// Message indicates all courses are available
		await expect(section.getByText(/todas las materias están disponibles/i)).toBeVisible();
	});

	test('clicking course name in list mode scrolls to course section', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();
		const courseLink = section.getByRole('link', { name: 'Álgebra y Geometría Analítica' });

		await courseLink.click();

		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await expect(courseButton).toBeInViewport();
	});

	test('clicking course name in diagram mode shows course node in viewport', async ({
		studyPlan
	}) => {
		await studyPlan.getDiagramViewButton().click();
		await expect(studyPlan.getDiagramRegion()).toBeVisible();

		const section = studyPlan.getAvailableCoursesSection();
		const courseLink = section.getByRole('link', { name: 'Álgebra y Geometría Analítica' });
		await courseLink.click();

		const courseNode = studyPlan.getDiagramCourseNode('Álgebra y Geometría Analítica');
		await expect(courseNode).toBeInViewport();
	});

	test('course shows unlock count badge with tooltip', async ({ studyPlan }) => {
		const section = studyPlan.getAvailableCoursesSection();
		const algebraItem = section
			.getByRole('listitem')
			.filter({ hasText: 'Álgebra y Geometría Analítica' });
		const unlockBadge = algebraItem.getByLabel(/^Desbloquea \d+ materias?$/);

		await expect(unlockBadge).toBeVisible();
		await expect(unlockBadge).toHaveAttribute('title', /Desbloquea \d+ materias?/);
	});
});
