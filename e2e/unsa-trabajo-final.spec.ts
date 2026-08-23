import { test, expect } from './fixtures';

test.describe('UNSa Trabajo Final requirements', () => {
	test('shows human-readable global requirements for Trabajo Final', async ({ studyPlan }) => {
		await studyPlan.goto('unsa-fce-lf-2005');

		const courseButton = studyPlan.getCourseButton('Trabajo Final');
		await courseButton.click();

		const panel = await studyPlan.getCourseDetailsPanel('Trabajo Final');
		await expect(panel.getByText('Requisitos para cursar', { exact: true })).toBeVisible();
		const percentRequirement = panel.getByText(/80% de las materias del plan/);
		expect((await percentRequirement.innerText()).replaceAll('\u00a0', ' ')).toBe(
			'80% de las materias del plan deben estar Aprobadas pero ninguna lo está (0 de 32 y faltan 26)'
		);
		await expect(
			panel.getByText('Todas las materias restantes de la carrera aprobadas', { exact: true })
		).toBeVisible();
		expect(
			(await panel.getByText(/24 materias obligatorias/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('24 materias obligatorias deben estar Aprobadas pero ninguna lo está (faltan 24)');
		expect(
			(await panel.getByText(/2 materias optativas/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('2 materias optativas deben estar Aprobadas pero ninguna lo está (faltan 2)');
		await expect(panel.getByText('(0 de 24)', { exact: true })).not.toBeVisible();
		await expect(
			panel.getByRole('link', { name: 'Introducción a los Circuitos Eléctricos' })
		).not.toBeVisible();
	});

	test('Trabajo Final unlocks only after reaching 80 percent approved courses', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unsa-fce-lf-2005');

		await expect(studyPlan.getCourseButton('Trabajo Final')).toContainText('Bloqueada');
		const courseButton = studyPlan.getCourseButton('Trabajo Final');

		const firstTwentyFiveCourses = [
			'Introducción a la Matemática',
			'Introducción a la Física',
			'Elementos de Fisicoquímica',
			'Álgebra Lineal y Geometría Analítica',
			'Análisis Matemático I',
			'Introducción a los Circuitos Eléctricos',
			'Análisis Matemático II',
			'Física I',
			'Laboratorio I',
			'Análisis Matemático III',
			'Física II',
			'Laboratorio II',
			'Inglés',
			'Mecánica',
			'Termodinámica I',
			'Física Moderna I',
			'Electromagnetismo',
			'Física Moderna II',
			'Laboratorio de Componentes y Mediciones',
			'Mecánica Cuántica',
			'Mecánica de Fluidos',
			'Óptica I',
			'Mecánica Estadística',
			'Transferencia de Calor y Materia',
			'Astrofísica General'
		];

		for (const courseName of firstTwentyFiveCourses) {
			await studyPlan.setCourseState(courseName, 'Aprobada');
		}

		await courseButton.click();
		let panel = await studyPlan.getCourseDetailsPanel('Trabajo Final');
		expect(
			(await panel.getByText(/80% de las materias del plan/).innerText()).replaceAll('\u00a0', ' ')
		).toBe(
			'80% de las materias del plan deben estar Aprobadas pero solo el 78% lo está (25 de 32 y falta 1)'
		);
		await expect(studyPlan.getCourseButton('Trabajo Final')).toContainText('Bloqueada');

		await studyPlan.setCourseState('Mecánica Cuántica II', 'Aprobada');

		await expect(page.getByRole('combobox', { name: /^Estado de Trabajo Final:/ })).toBeVisible();

		await courseButton.click();
		panel = await studyPlan.getCourseDetailsPanel('Trabajo Final');
		expect(
			(await panel.getByText(/80% de las materias del plan/).innerText()).replaceAll('\u00a0', ' ')
		).toBe('80% de las materias del plan deben estar Aprobadas');
	});
});
