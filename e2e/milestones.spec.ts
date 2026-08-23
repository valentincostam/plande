import { test, expect } from './fixtures';
import type { Locator } from '@playwright/test';

const getPillColors = (locator: Locator) =>
	locator.evaluate((element) => {
		const styles = getComputedStyle(element);
		return { background: styles.backgroundColor, foreground: styles.color };
	});

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
		const milestoneDetails = page.getByRole('region', {
			name: 'Detalles de Examen de Suficiencia de Inglés E'
		});
		await expect(milestoneDetails.getByText('Requisitos para completarlo:')).toBeVisible();
		await expect(
			milestoneDetails.getByText('Materias que desbloquea', { exact: true })
		).toBeVisible();
		const unlockedCourseLink = milestoneDetails.getByRole('link', {
			name: 'Educación en el Cuidado de la Salud'
		});
		await expect(unlockedCourseLink).toBeVisible();
		const unlockedCourse = milestoneDetails
			.getByRole('list', { name: 'Materias que desbloquea' })
			.getByRole('listitem')
			.filter({ hasText: 'Educación en el Cuidado de la Salud' });
		await expect(unlockedCourse).toContainText(/necesita este hito.*Completado.*rendir/);

		const courseButton = studyPlan.getCourseButton('Educación en el Cuidado de la Salud');
		await courseButton.click();
		const panel = await studyPlan.getCourseDetailsPanel('Educación en el Cuidado de la Salud');
		await expect(
			panel.getByRole('link', { name: 'Examen de Suficiencia de Inglés E' })
		).toBeVisible();
		await expect(panel.getByText('Completado', { exact: true })).toBeVisible();
		await expect(panel.getByText('Pendiente', { exact: true })).toBeVisible();

		const milestoneState = page.getByRole('combobox', {
			name: 'Estado de Examen de Suficiencia de Inglés E: Pendiente',
			exact: true
		});
		await milestoneState.selectOption({ label: 'Completado' });

		await expect(
			page.getByRole('combobox', {
				name: 'Estado de Examen de Suficiencia de Inglés E: Completado',
				exact: true
			})
		).toBeVisible();

		await expect(panel.getByText('Completado', { exact: true })).toBeVisible();
		await expect(panel.getByText('Pendiente', { exact: true })).toHaveCount(0);
	});

	test('UNS intermediate title requires the complete first cycle and two electives', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('uns-dcs-le-2017');

		const stateSelect = page.getByRole('combobox', {
			name: 'Estado de Título intermedio: Enfermero/a: Pendiente',
			exact: true
		});
		await expect(stateSelect).toBeDisabled();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Aprobadas');
		await studyPlan.setYearState(3, 'Aprobadas');
		await studyPlan.setCourseState(
			'Abordaje Cualitativo de la Investigación en Salud',
			'No cursada'
		);
		await studyPlan.setCourseState('Gestión en Servicios de Salud', 'No cursada');
		await studyPlan.setCourseState('Herramientas Informáticas E', 'No cursada');

		await expect(stateSelect).toBeDisabled();
		await studyPlan.setCourseState('Abordaje Cualitativo de la Investigación en Salud', 'Aprobada');
		await expect(stateSelect).toBeEnabled();
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
		await expect(
			panel.getByRole('link', { name: 'Prueba de Suficiencia de Inglés' })
		).toBeVisible();
		await expect(panel.getByText('Completado', { exact: true })).toBeVisible();
		await expect(panel.getByText('Pendiente', { exact: true })).toBeVisible();

		const milestoneState = page.getByRole('combobox', {
			name: 'Estado de Prueba de Suficiencia de Inglés: Pendiente',
			exact: true
		});
		await milestoneState.selectOption({ label: 'Completado' });

		await expect(
			page.getByRole('combobox', {
				name: 'Estado de Prueba de Suficiencia de Inglés: Completado',
				exact: true
			})
		).toBeVisible();

		await expect(panel.getByText('Completado', { exact: true })).toBeVisible();
		await expect(panel.getByText('Pendiente', { exact: true })).toHaveCount(0);
	});

	test('milestone requirement pills match equivalent course-state pills in both themes', async ({
		page,
		studyPlan
	}) => {
		for (const theme of ['light', 'dark']) {
			await studyPlan.goto('unlp-fi-iem-2018');
			await page.evaluate((value) => localStorage.setItem('theme', value), theme);
			await page.reload({ waitUntil: 'load' });
			await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'false');

			await studyPlan.getCourseButton('Dispositivos e Instalaciones Eléctricas II').click();
			const panel = await studyPlan.getCourseDetailsPanel(
				'Dispositivos e Instalaciones Eléctricas II'
			);

			await expect
				.poll(() => getPillColors(panel.getByText('Pendiente', { exact: true })))
				.toEqual(await getPillColors(panel.getByText('No cursada', { exact: true })));
			await expect
				.poll(() => getPillColors(panel.getByText('Completado', { exact: true })))
				.toEqual(await getPillColors(panel.getByText('Aprobada', { exact: true })));
		}
	});

	test('UNLaM intermediate title milestone unlocks after passing first three years', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('unlam-dce-lci');

		const stateSelect = page.getByRole('combobox', {
			name: 'Estado de Título intermedio: Técnico Universitario en Comercio Internacional: Pendiente',
			exact: true
		});
		await expect(stateSelect).toBeDisabled();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Aprobadas');
		await studyPlan.setYearState(3, 'Aprobadas');

		await expect(stateSelect).toBeEnabled();
		await stateSelect.selectOption({ label: 'Completado' });

		await expect(
			page.getByRole('combobox', {
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

		const stateSelect = page.getByRole('combobox', {
			name: 'Estado de Título intermedio: Asistente Psicopedagógico: Pendiente',
			exact: true
		});
		await expect(stateSelect).toBeDisabled();

		await studyPlan.setYearState(1, 'Aprobadas');
		await studyPlan.setYearState(2, 'Aprobadas');
		await studyPlan.setYearState(3, 'Aprobadas');

		await expect(stateSelect).toBeEnabled();
		await stateSelect.selectOption({ label: 'Completado' });

		await expect(
			page.getByRole('combobox', {
				name: 'Estado de Título intermedio: Asistente Psicopedagógico: Completado',
				exact: true
			})
		).toBeVisible();
	});
});
