import { test, expect } from './fixtures';

test.describe('Stats and Charts - Initial state', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('donut shows 0% progress', async ({ studyPlan }) => {
		const progressBar = studyPlan.getDegreeProgressBar();
		await expect(progressBar).toHaveAttribute('aria-valuenow', '0');
		await expect(progressBar).toContainText('0%');
	});

	test('distribution shows all 46 courses as "No cursada"', async ({ page }) => {
		await expect(page.getByText('46 materias')).toBeVisible();
		await expect(page.getByText('No cursada (46)')).toBeVisible();
		await expect(page.getByText('En curso (0)')).toBeVisible();
		await expect(page.getByText('Regular (0)')).toBeVisible();
		await expect(page.getByText('Aprobada (0)')).toBeVisible();
	});

	test('stats show 0 passed courses and years', async ({ studyPlan }) => {
		const passedCoursesStat = studyPlan.getStatByLabel(/^Materias aprobadas/);
		await expect(passedCoursesStat).toContainText('0 de 46');

		const passedYearsStat = studyPlan.getStatByLabel(/^Años aprobados/);
		await expect(passedYearsStat).toContainText('0 de 5');
	});

	test('yearly progress shows 0 passed for each year', async ({ page }) => {
		const yearlySection = page.getByRole('region', { name: 'Materias aprobadas por año' });

		await expect(yearlySection.getByText('0 de 8', { exact: true })).toBeVisible();
		await expect(yearlySection.getByText('0 de 7', { exact: true })).toBeVisible();
		await expect(yearlySection.getByText('0 de 10', { exact: true })).toBeVisible();
		await expect(yearlySection.getByText('0 de 9', { exact: true })).toBeVisible();
		await expect(yearlySection.getByText('0 de 12', { exact: true })).toBeVisible();
	});

	test('average stat is not visible when no grades exist', async ({ studyPlan }) => {
		const averageStat = studyPlan.getStatByLabel(/^Promedio sin aplazos/);
		await expect(averageStat).not.toBeVisible();
	});
});

test.describe('Stats and Charts - Passing courses', () => {
	test('passing one course updates all metrics', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await expect(page.getByText('Aprobada (0)')).toBeVisible();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await expect(page.getByText('Aprobada (1)')).toBeVisible();
		await expect(page.getByText('No cursada (45)')).toBeVisible();

		const progressBar = studyPlan.getDegreeProgressBar();
		await expect(progressBar).toContainText('%');
		const value = await progressBar.getAttribute('aria-valuenow');
		expect(Number(value)).toBeGreaterThan(0);

		const passedCoursesStat = studyPlan.getStatByLabel(/^Materias aprobadas/);
		await expect(passedCoursesStat).toContainText('1');

		const yearlySection = page.getByRole('region', { name: 'Materias aprobadas por año' });
		await expect(yearlySection.getByText('1 de 8')).toBeVisible();
	});

	test('passing all year 1 courses updates "Años aprobados"', async ({ studyPlan, page }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setYearState(1, 'Aprobadas');

		const passedYearsStat = studyPlan.getStatByLabel(/^Años aprobados/);
		await expect(passedYearsStat).toContainText('1 de 5');

		const yearlySection = page.getByRole('region', { name: 'Materias aprobadas por año' });
		await expect(yearlySection.getByText('8 de 8')).toBeVisible();

		const passedCoursesStat = studyPlan.getStatByLabel(/^Materias aprobadas/);
		await expect(passedCoursesStat).toContainText('8');
	});
});

test.describe('Stats and Charts - Hours tracking', () => {
	test('shows weekly hours when courses are "En curso"', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'En curso');

		const hoursStat = studyPlan.getStatByLabel(/^Horas cátedra semanales en curso/);
		await expect(hoursStat).toContainText('10');
	});
});

test.describe('Stats and Charts - Average grade', () => {
	test('shows average only when grades exist', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const averageStat = studyPlan.getStatByLabel(/^Promedio sin aplazos/);
		await expect(averageStat).not.toBeVisible();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const courseButton = studyPlan.getCourseButton('Álgebra y Geometría Analítica');
		await courseButton.click();

		await studyPlan.setGrade(8);

		await expect(averageStat).toBeVisible();
		await expect(averageStat).toContainText('8');
		await expect(averageStat).toContainText('De 1 materia');
	});

	test('calculates correct average with multiple grades', async ({ studyPlan }) => {
		await studyPlan.gotoWithState('utn-frcu-isi-2023', 'a2');

		await studyPlan.getCourseButton('Sistemas y Procesos de Negocios').click();
		await studyPlan.setGrade(8);
		await studyPlan.getCourseButton('Sistemas y Procesos de Negocios').click();

		await studyPlan.getCourseButton('Álgebra y Geometría Analítica').click();
		const panel = await studyPlan.getCourseDetailsPanel('Álgebra y Geometría Analítica');
		const gradeInput = panel.getByRole('spinbutton', {
			name: 'Nota de aprobación de Álgebra y Geometría Analítica'
		});
		await expect(gradeInput).toBeVisible();
		await gradeInput.fill('10');
		await gradeInput.blur();

		const averageStat = studyPlan.getStatByLabel(/^Promedio sin aplazos/);
		await expect(averageStat).toContainText('9');
		await expect(averageStat).toContainText('De 2 materias');
	});
});

test.describe('Stats and Charts - Elective courses', () => {
	test('shows elective stats and updates when elective passed', async ({ studyPlan }) => {
		await studyPlan.gotoWithState('utn-frcu-isi-2023', 'an21a');

		const electivesStat = studyPlan.getStatByLabel(/^Materias electivas aprobadas/);
		await expect(electivesStat).toContainText('1 de 9');
	});

	test('initial state shows 0 electives passed', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const electivesStat = studyPlan.getStatByLabel(/^Materias electivas aprobadas/);
		await expect(electivesStat).toContainText('0 de 9');
	});

	test('shows elective hours and updates when elective passed', async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const electiveHoursStat = studyPlan.getStatByLabel(/^Horas electivas requeridas/);
		await expect(electiveHoursStat).toContainText('0 de 40');

		await studyPlan.setCourseState('Sistemas y Procesos de Negocios', 'Aprobada');
		await studyPlan.setCourseState('Metodología de la Investigación', 'Aprobada');

		await expect(electiveHoursStat).toContainText('4 de 40');
	});

	test('shows required elective count for count-based plans', async ({ studyPlan }) => {
		await studyPlan.goto('udemm-iem');

		const electivesStat = studyPlan.getStatByLabel(/^Materias electivas requeridas/);
		await expect(electivesStat).toContainText('0 de 1');
		await expect(electivesStat).toContainText('6 electivas disponibles en el plan');

		await studyPlan.setCourseState('Estabilidad II', 'Aprobada');

		await expect(electivesStat).toContainText('1 de 1');
	});

	test('separates UNLP humanistic count from total optative hours', async ({ studyPlan }) => {
		await studyPlan.goto('unlp-fi-iem-2018');

		const humanisticStat = studyPlan.getStatByLabel(/^Electiva humanística requerida/);
		await expect(humanisticStat).toContainText('0 de 1 mat.');

		const optativeHoursStat = studyPlan.getStatByLabel(/^Horas optativas requeridas/);
		await expect(optativeHoursStat).toContainText('0 de 128 hs.');

		await studyPlan.getStrictModeToggle().uncheck();
		await studyPlan.setCourseState(
			'Relaciones Humanas en el Ámbito del Desarrollo de las Ingenierías',
			'Aprobada'
		);
		await expect(optativeHoursStat).toContainText('64 de 128 hs.');

		await studyPlan.setCourseState(
			'Análisis de Falla en Componentes Mecánicos y Piezas de Acero',
			'Aprobada'
		);
		await expect(optativeHoursStat).toContainText('128 de 128 hs.');
	});

	test('sums grouped elective requirements for plans with multiple count blocks', async ({
		studyPlan
	}) => {
		await studyPlan.goto('unlp-fahce-pm-2003');

		const electivesStat = studyPlan.getStatByLabel(/^Materias optativas requeridas aprobadas/);
		await expect(electivesStat).toContainText('0 de 4');
		await expect(electivesStat).toContainText('13 optativas disponibles en el plan');
		await expect(electivesStat).toContainText('Optativas I requeridas');
		await expect(electivesStat).toContainText('Optativas II requeridas');
		await expect(electivesStat).toContainText('Idioma latino requerido');
		await expect(electivesStat).toContainText('Idioma germánico requerido');
	});

	test('shows grouped optative badges on courses in unlp-fahce-pm-2003', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlp-fahce-pm-2003');

		const optativaCourse = page
			.getByRole('listitem')
			.filter({ has: page.getByText('Complementos de Análisis', { exact: true }) });
		await expect(optativaCourse.getByText('Optativa I', { exact: true })).toBeVisible();
		await expect(optativaCourse.getByText('Optativa', { exact: true })).not.toBeVisible();

		const latinLanguageCourse = page
			.getByRole('listitem')
			.filter({ has: page.getByText('Francés', { exact: true }) });
		await expect(latinLanguageCourse.getByText('Idioma latino', { exact: true })).toBeVisible();
		await expect(latinLanguageCourse.getByText('Optativa', { exact: true })).not.toBeVisible();
	});

	test('caps grouped elective progress when several approved courses belong to the same bucket', async ({
		studyPlan
	}) => {
		await studyPlan.goto('unlp-fahce-pm-2003');

		await studyPlan.setCourseState('Francés', 'Aprobada');
		await studyPlan.setCourseState('Italiano', 'Aprobada');
		await studyPlan.setCourseState('Portugués', 'Aprobada');

		const electivesStat = studyPlan.getStatByLabel(/^Materias optativas requeridas aprobadas/);
		await expect(electivesStat).toContainText('1 de 4');
		await expect(electivesStat).toContainText('Idioma latino requerido');
		await expect(electivesStat).toContainText('3 de 1 mat.');
	});
});
