import { test, expect } from './fixtures';

test.describe('Milestone requirements', () => {
	test('UNS English sufficiency milestone is shown and satisfies course requirements', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		const milestonesSection = page.getByRole('region', { name: /Hitos y requisitos adicionales/i });
		await expect(milestonesSection).toBeVisible();

		await page
			.getByRole('button', { name: 'Examen de Suficiencia de Inglés E', exact: true })
			.click();
		await expect(page.getByText('Requisitos para completarlo:').first()).toBeVisible();

		const courseButton = studyPlan.getCourseButton('Educación en el Cuidado de la Salud');
		await courseButton.click();
		const panel = await studyPlan.getCourseDetailsPanel('Educación en el Cuidado de la Salud');
		const englishRequirement = panel
			.getByRole('link', { name: 'Examen de Suficiencia de Inglés E' })
			.locator('..');
		await expect(englishRequirement).toContainText('debe estar completado');
		await expect(englishRequirement).toContainText('Pendiente');

		await page
			.getByRole('button', {
				name: 'Estado de Examen de Suficiencia de Inglés E: Pendiente',
				exact: true
			})
			.click();

		await expect(
			page.getByRole('button', {
				name: 'Estado de Examen de Suficiencia de Inglés E: Completado',
				exact: true
			})
		).toBeVisible();

		await expect(englishRequirement).toContainText('debe estar completado');
		await expect(englishRequirement).not.toContainText('pero está');
	});

	test('UNLP English sufficiency milestone is shown and used by course requirements', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlp-fi-iem-2018');

		const milestonesSection = page.getByRole('region', { name: /Hitos y requisitos adicionales/i });
		await expect(milestonesSection).toBeVisible();

		const courseButton = studyPlan.getCourseButton('Dispositivos e Instalaciones Eléctricas II');
		await courseButton.click();
		const panel = await studyPlan.getCourseDetailsPanel(
			'Dispositivos e Instalaciones Eléctricas II'
		);
		const englishRequirement = panel
			.getByRole('link', { name: 'Prueba de Suficiencia de Inglés' })
			.locator('..');
		await expect(englishRequirement).toContainText('debe estar completado');
		await expect(englishRequirement).toContainText('Pendiente');

		await page
			.getByRole('button', {
				name: 'Estado de Prueba de Suficiencia de Inglés: Pendiente',
				exact: true
			})
			.click();

		await expect(
			page.getByRole('button', {
				name: 'Estado de Prueba de Suficiencia de Inglés: Completado',
				exact: true
			})
		).toBeVisible();

		await expect(englishRequirement).toContainText('debe estar completado');
		await expect(englishRequirement).not.toContainText('pero está');
	});

	test('UNLaM intermediate title milestone unlocks after passing first three years', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlam-dce-lci');

		const stateButton = page.getByRole('button', {
			name: 'Estado de Título intermedio: Técnico Universitario en Comercio Internacional: Pendiente',
			exact: true
		});
		await expect(stateButton).toBeDisabled();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Aprobadas');
		await studyPlan.setYearState(3, 'Aprobadas');

		await expect(stateButton).toBeEnabled();
		await stateButton.click();

		await expect(
			page.getByRole('button', {
				name: 'Estado de Título intermedio: Técnico Universitario en Comercio Internacional: Completado',
				exact: true
			})
		).toBeVisible();
	});

	test('UdeMM intermediate title milestone unlocks after passing first three years', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('udemm-lpe');

		const stateButton = page.getByRole('button', {
			name: 'Estado de Título intermedio: Asistente Psicopedagógico: Pendiente',
			exact: true
		});
		await expect(stateButton).toBeDisabled();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Aprobadas');
		await studyPlan.setYearState(3, 'Aprobadas');

		await expect(stateButton).toBeEnabled();
		await stateButton.click();

		await expect(
			page.getByRole('button', {
				name: 'Estado de Título intermedio: Asistente Psicopedagógico: Completado',
				exact: true
			})
		).toBeVisible();
	});
});
