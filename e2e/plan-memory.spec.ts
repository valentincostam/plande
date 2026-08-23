import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Remembered study plans', () => {
	test('always keeps the root as the home entry', async ({ page }) => {
		await page.addInitScript(() => {
			localStorage.setItem(
				'plande-plan-memory',
				JSON.stringify({
					version: 1,
					recentPlanSlugs: ['utn-frcu-isi-2023']
				})
			);
		});

		await page.goto('/', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL('/');
		await expect(page.getByRole('textbox', { name: /buscar carrera/i })).toBeVisible();

		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();
		await expect(page).toHaveURL('/');
	});

	test('keeps the plan header focused on navigation and views', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');

		const header = page.getByRole('banner');
		await expect(header.getByRole('link', { name: 'Plande', exact: true })).toBeVisible();
		await expect(header.getByRole('button')).toHaveCount(2);
	});

	test('slides recent plans out before showing a separate centered summary', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		await expect(page.getByRole('textbox', { name: /buscar carrera/i })).toBeVisible();
		const header = page.getByRole('banner');
		const headerPosition = await header.boundingBox();
		const quickAccess = page.getByRole('region', { name: 'Últimos planes visitados' });
		await expect(
			quickAccess.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeVisible();
		const title = quickAccess.getByRole('heading', { name: 'Últimos planes visitados' });
		const collapseButton = quickAccess.getByRole('button', {
			name: 'Colapsar últimos planes visitados'
		});
		await expect(collapseButton).toHaveCSS('cursor', 'pointer');

		const panelPosition = await quickAccess.boundingBox();
		expect(panelPosition).not.toBeNull();
		expect(panelPosition!.y + panelPosition!.height).toBeGreaterThan(
			page.viewportSize()!.height - 24
		);
		const pageHeightWithPanel = await page.evaluate(() => document.documentElement.scrollHeight);

		await title.click();
		await expect
			.poll(() => quickAccess.evaluate((panel) => panel.getAnimations({ subtree: true }).length))
			.toBeGreaterThan(0);
		await expect(quickAccess).toBeVisible();
		await expect(quickAccess.getByText('ISI ・ UTN FRCU')).toBeVisible();
		await expect(quickAccess.getByText('・ 2%')).toBeVisible();
		await expect(
			quickAccess.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeHidden();
		await expect(quickAccess.getByRole('link')).toHaveCount(0);
		const compactButton = quickAccess.getByRole('button', {
			name: 'Expandir últimos planes visitados'
		});
		const compactDonut = compactButton.getByRole('img', {
			name: /Ingeniería en Sistemas de Información: 2% completado/
		});
		await expect(compactDonut).toBeVisible();
		await expect(compactDonut).toHaveText('');
		await quickAccess.evaluate((panel) =>
			Promise.all(panel.getAnimations({ subtree: true }).map((animation) => animation.finished))
		);
		const compactPosition = await compactButton.boundingBox();
		const compactLabel = compactButton.getByText('ISI ・ UTN FRCU');
		expect(await compactLabel.evaluate((label) => label.scrollWidth <= label.clientWidth)).toBe(
			true
		);
		expect(
			Math.abs(compactPosition!.x + compactPosition!.width / 2 - page.viewportSize()!.width / 2)
		).toBeLessThanOrEqual(1);
		expect(await header.boundingBox()).toEqual(headerPosition);
		expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(
			pageHeightWithPanel
		);

		await compactButton.click({ position: { x: 8, y: compactPosition!.height / 2 } });
		await expect(
			quickAccess.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeVisible();

		await title.click();
		await expect(compactButton).toBeVisible();
		await page.reload({ waitUntil: 'networkidle' });
		await expect(compactButton).toBeVisible();
		await expect(
			quickAccess.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeHidden();

		const persistedCompactPosition = await compactButton.boundingBox();
		await compactButton.click({
			position: { x: 8, y: persistedCompactPosition!.height / 2 }
		});
		await expect(
			quickAccess.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeVisible();

		await page.reload({ waitUntil: 'networkidle' });
		await expect(
			page
				.getByRole('region', { name: 'Últimos planes visitados' })
				.getByRole('group', { name: 'Último plan usado' })
		).toBeVisible();
	});

	test('collapses without movement when reduced motion is preferred', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.addInitScript(() => {
			localStorage.setItem(
				'plande-plan-memory',
				JSON.stringify({ version: 1, recentPlanSlugs: ['utn-frcu-isi-2023'] })
			);
		});

		await page.goto('/', { waitUntil: 'networkidle' });
		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		await recentPlans.getByRole('button', { name: 'Colapsar últimos planes visitados' }).click();

		await expect(
			recentPlans.getByRole('button', { name: 'Expandir últimos planes visitados' })
		).toBeVisible();
		await expect
			.poll(() => recentPlans.evaluate((panel) => panel.getAnimations({ subtree: true }).length))
			.toBe(0);
	});

	test('keeps the recent plans panel and collapse action within mobile thumb reach', async ({
		page,
		studyPlan
	}) => {
		await page.setViewportSize({ width: 320, height: 568 });
		for (const slug of ['utn-frcu-isi-2023', 'utn-frcu-ic-2023', 'utn-frcu-ie-2023']) {
			await studyPlan.goto(slug);
			await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		}
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		await expect(recentPlans).toBeVisible();
		await expect(
			recentPlans.getByRole('button', { name: /^Quitar .* de últimos planes visitados$/ })
		).toHaveCount(0);
		const panelPosition = await recentPlans.boundingBox();
		expect(panelPosition!.x).toBeGreaterThanOrEqual(12);
		expect(panelPosition!.x + panelPosition!.width).toBeLessThanOrEqual(308);
		expect(panelPosition!.y + panelPosition!.height).toBeGreaterThan(544);

		const closePosition = await recentPlans
			.getByRole('button', { name: 'Colapsar últimos planes visitados' })
			.boundingBox();
		expect(closePosition!.width).toBeGreaterThanOrEqual(43.5);
		expect(closePosition!.height).toBeGreaterThanOrEqual(43.5);

		await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
		await expect
			.poll(() =>
				page.evaluate(
					() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
				)
			)
			.toBe(true);
		const footerPosition = await page.getByRole('contentinfo').boundingBox();
		const panelAtPageEnd = await recentPlans.boundingBox();
		expect(footerPosition!.y + footerPosition!.height).toBeLessThanOrEqual(panelAtPageEnd!.y);
	});

	test('highlights the latest plan and shows two smaller previous plans with state donuts', async ({
		page,
		studyPlan
	}) => {
		for (const slug of [
			'utn-frcu-ic-2023',
			'utn-frcu-ie-2023',
			'utn-frba-iq-1995',
			'utn-frc-isi-2023'
		]) {
			await studyPlan.goto(slug);
			await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		}

		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		await expect(recentPlans.getByRole('link')).toHaveCount(3);
		await expect(
			recentPlans.getByRole('button', { name: /mostrar|ocultar otros planes/i })
		).toHaveCount(0);
		await expect(recentPlans).not.toContainText('Ingeniería Civil');

		const latestPlan = recentPlans.getByRole('group', { name: 'Último plan usado' });
		const previousPlans = recentPlans.getByRole('group', { name: 'Planes usados anteriormente' });
		await expect(latestPlan).toContainText('Ingeniería en Sistemas de Información');
		await expect(latestPlan).toContainText('UTN FRC');
		await expect(latestPlan).not.toContainText('UTN · FRC');
		await expect(previousPlans).toContainText('Ingeniería Química');
		await expect(previousPlans).toContainText('Ingeniería Electromecánica');
		const latestLink = latestPlan.getByRole('link', {
			name: 'Continuar con Ingeniería en Sistemas de Información',
			exact: true
		});
		await recentPlans.evaluate((panel) =>
			Promise.all(panel.getAnimations({ subtree: true }).map((animation) => animation.finished))
		);
		const latestPlanBox = await latestPlan.boundingBox();
		const latestLinkBox = await latestLink.boundingBox();
		expect(latestLinkBox!.x).toBe(latestPlanBox!.x);
		expect(latestLinkBox!.y).toBe(latestPlanBox!.y);
		expect(latestLinkBox!.width).toBe(latestPlanBox!.width);
		expect(latestLinkBox!.height).toBe(latestPlanBox!.height);

		const latestDonut = latestPlan.getByRole('img', {
			name: /Ingeniería en Sistemas de Información: \d+% completado.*1 aprobada/
		});
		await expect(latestDonut).toBeVisible();
		await expect(recentPlans.getByRole('img')).toHaveCount(3);

		const previousDonut = previousPlans
			.getByRole('link', { name: 'Continuar con Ingeniería Química', exact: true })
			.getByRole('img');
		const latestSize = await latestDonut.boundingBox();
		const previousSize = await previousDonut.boundingBox();
		expect(latestSize!.width).toBeGreaterThan(previousSize!.width);
	});

	test('removes one recent plan without deleting its saved progress', async ({
		page,
		studyPlan
	}) => {
		for (const slug of ['utn-frcu-isi-2023', 'utn-frcu-ie-2023']) {
			await studyPlan.goto(slug);
			await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		}

		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		const planLink = recentPlans.getByRole('link', {
			name: 'Continuar con Ingeniería Electromecánica',
			exact: true
		});
		const removeButton = recentPlans.getByRole('button', {
			name: 'Quitar Ingeniería Electromecánica de últimos planes visitados',
			exact: true
		});

		await planLink.hover();
		await expect(removeButton).toHaveCSS('cursor', 'pointer');
		const removeButtonBox = await removeButton.boundingBox();
		expect(removeButtonBox!.width).toBeGreaterThanOrEqual(43.5);
		expect(removeButtonBox!.height).toBeGreaterThanOrEqual(43.5);
		await removeButton.click();

		await expect(recentPlans).not.toContainText('Ingeniería Electromecánica');
		await page.reload({ waitUntil: 'networkidle' });
		await expect(recentPlans).not.toContainText('Ingeniería Electromecánica');

		await studyPlan.goto('utn-frcu-ie-2023');
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
	});

	test('does not treat a casual plan visit as recent usage', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await studyPlan.goto('utn-frcu-ic-2023');
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		await expect(recentPlans.getByRole('link')).toHaveCount(1);
		await expect(recentPlans).toContainText('Ingeniería en Sistemas de Información');
		await expect(recentPlans).not.toContainText('Ingeniería Civil');
	});

	test('has readable recent plans in dark theme', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.evaluate(() => localStorage.setItem('theme', 'dark'));
		await page.goto('/', { waitUntil: 'networkidle' });

		await expect(page.getByRole('button', { name: 'Tema: Oscuro', exact: true })).toBeVisible();
		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		await expect(
			recentPlans.getByRole('group', { name: 'Panel de últimos planes visitados' })
		).toBeVisible();
		const results = await new AxeBuilder({ page })
			.include('[aria-labelledby="recent-plans-heading"]')
			.withRules('color-contrast')
			.analyze();
		expect(results.violations).toEqual([]);
	});
});

test.describe('Shared progress conflicts', () => {
	test('does not interrupt when URL and local progress are identical', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		const ownUrl = page.url();

		await page.goto(ownUrl, { waitUntil: 'networkidle' });

		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
	});

	test('does not treat display preferences as a progress conflict', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		const sharedViewUrl = new URL(page.url());
		sharedViewUrl.searchParams.set('c', 'si');

		await page.goto(sharedViewUrl.toString(), { waitUntil: 'networkidle' });

		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();
		await expect(studyPlan.getShowCodesToggle()).toBeChecked();
	});

	test('keeps shared progress temporary and lets the user restore local progress', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		await expect(conflict).toContainText('El link y este dispositivo tienen progresos distintos');
		await expect(conflict).toContainText('2 materias tienen estados distintos.');
		await expect(conflict).toContainText(
			'Estás editando el progreso del link; lo guardado no cambia.'
		);
		await expect(conflict.getByRole('button', { name: /Usar progreso del link/ })).toBeVisible();
		await expect(conflict.getByText('Tu progreso guardado')).toBeVisible();
		await expect(conflict.getByText('Viendo ahora', { exact: true })).toBeVisible();
		await expect(conflict.getByText('Los puntos muestran los estados guardados.')).toBeVisible();
		const algebraState = studyPlan.getCourseStateControl('Álgebra y Geometría Analítica');
		await expect(algebraState).toHaveAccessibleName(
			'Estado de Álgebra y Geometría Analítica: Regular'
		);

		const localStateIndicators = page.getByRole('img', {
			name: /^Guardado en este dispositivo:/
		});
		const individualStateControls = page.getByRole('combobox', { name: /^Estado de / });
		const blockedStatePills = page.getByText('Bloqueada', { exact: true });
		await expect(localStateIndicators).toHaveCount(
			(await individualStateControls.count()) + (await blockedStatePills.count())
		);

		const algebraLocalState = page.getByRole('img', {
			name: 'Guardado en este dispositivo: Aprobada',
			exact: true
		});
		await expect(algebraLocalState).toBeVisible();
		const indicatorPosition = await algebraLocalState.boundingBox();
		const stateControlPosition = await algebraState.boundingBox();
		expect(
			Math.abs(indicatorPosition!.y + indicatorPosition!.height / 2 - stateControlPosition!.y)
		).toBeLessThanOrEqual(1);
		expect(
			Math.abs(
				indicatorPosition!.x +
					indicatorPosition!.width / 2 -
					(stateControlPosition!.x + stateControlPosition!.width)
			)
		).toBeLessThanOrEqual(1);
		const indicatorColors = await algebraLocalState.evaluate((indicator) => {
			const row = indicator.closest('li');
			return {
				background: getComputedStyle(indicator).backgroundColor,
				border: getComputedStyle(indicator).borderTopColor,
				row: row ? getComputedStyle(row).backgroundColor : ''
			};
		});
		expect(indicatorColors.border).toBe(indicatorColors.row);
		expect(indicatorColors.background).not.toBe(indicatorColors.border);

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(
			page
				.getByRole('group', { name: 'Álgebra y Geometría Analítica', exact: true })
				.getByRole('img', {
					name: 'Guardado en este dispositivo: Aprobada',
					exact: true
				})
		).toBeVisible();

		await conflict
			.getByRole('button', { name: /Usar progreso guardado en este dispositivo/ })
			.click();

		await expect(conflict).not.toBeVisible();
		await expect(localStateIndicators).toHaveCount(0);
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
	});

	test('shows saved-state indicators on courses blocked by link progress', async ({ page }) => {
		await page.goto('/utn-frcu-isi-2023?s=a46', { waitUntil: 'networkidle' });
		await page.goto('/utn-frcu-isi-2023?s=a6', { waitUntil: 'networkidle' });

		const blockedCourse = page.getByRole('listitem').filter({
			has: page.getByRole('button', {
				name: 'Sintaxis y Semántica de los Lenguajes, 8 horas, bloqueada por correlativas',
				exact: true
			})
		});
		await expect(blockedCourse).toContainText('Bloqueada');
		const blockedPill = blockedCourse.getByText('Bloqueada', { exact: true });
		const savedStateIndicator = blockedCourse.getByRole('img', {
			name: 'Guardado en este dispositivo: Aprobada',
			exact: true
		});
		await expect(savedStateIndicator).toBeVisible();
		const [pillBox, indicatorBox] = await Promise.all([
			blockedPill.boundingBox(),
			savedStateIndicator.boundingBox()
		]);
		expect(
			Math.abs(indicatorBox!.x + indicatorBox!.width / 2 - (pillBox!.x + pillBox!.width))
		).toBeLessThanOrEqual(1);
		expect(Math.abs(indicatorBox!.y + indicatorBox!.height / 2 - pillBox!.y)).toBeLessThanOrEqual(
			1
		);

		await page.getByRole('button', { name: 'Diagrama' }).click();
		await expect(
			page
				.getByRole('group', { name: 'Sintaxis y Semántica de los Lenguajes', exact: true })
				.getByRole('img', {
					name: 'Guardado en este dispositivo: Aprobada',
					exact: true
				})
		).toBeVisible();
	});

	test('stops asking when link progress becomes equal to saved progress', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		await expect(conflict).toBeVisible();

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.setCourseState('Análisis Matemático I', 'No cursada');

		await expect(conflict).not.toBeVisible();
		await expect(page.getByRole('img', { name: /^Guardado en este dispositivo:/ })).toHaveCount(0);
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Aprobada');
	});

	test('explains a conflict caused only by strict mode', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		const sharedUrl = new URL(page.url());
		sharedUrl.searchParams.set('r', 'no');

		await page.goto(sharedUrl.toString(), { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		await expect(conflict).toContainText('El link y este dispositivo tienen progresos distintos');
		await expect(conflict).toContainText('El modo estricto es distinto.');
		await expect(conflict).toContainText(
			'Estás editando el progreso del link; lo guardado no cambia.'
		);
		await expect(conflict.getByText('Viendo ahora', { exact: true })).toBeVisible();
	});

	test('slides progress choices into a separate compact comparison and expands them again', async ({
		page,
		studyPlan
	}) => {
		await page.setViewportSize({ width: 320, height: 568 });
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		const chooser = page.getByRole('region', { name: 'Elegir progreso' });
		const expandedPanel = chooser.getByRole('group', {
			name: 'Opciones de progreso expandidas'
		});
		await expect(expandedPanel.getByRole('img')).toHaveCount(2);
		await expect(expandedPanel.getByText('Usar', { exact: true })).toHaveCount(0);
		await expect(expandedPanel).not.toContainText('Modo estricto');
		await expect(expandedPanel.getByRole('button', { name: /^Usar progreso del link:/ })).toHaveCSS(
			'cursor',
			'pointer'
		);
		await expect(
			expandedPanel.getByRole('button', {
				name: /^Usar progreso guardado en este dispositivo:/
			})
		).toHaveCSS('cursor', 'pointer');
		await expect(expandedPanel).toContainText(
			'El link y este dispositivo tienen progresos distintos'
		);

		const panelMessage = expandedPanel.getByText(/materias tienen estados distintos\./);
		const conflictDetail = expandedPanel.getByText(
			'Estás editando el progreso del link; lo guardado no cambia.',
			{ exact: true }
		);
		const progressChoices = expandedPanel.getByRole('group', { name: 'Progresos disponibles' });
		const [messageBox, detailBox, choicesBox] = await Promise.all([
			panelMessage.boundingBox(),
			conflictDetail.boundingBox(),
			progressChoices.boundingBox()
		]);
		expect(Math.abs(messageBox!.y - detailBox!.y)).toBeLessThanOrEqual(1);
		expect(detailBox!.y).toBeLessThan(choicesBox!.y);
		await expect(expandedPanel).toContainText('regulares');
		await expect(expandedPanel.getByText('Viendo ahora', { exact: true })).toBeVisible();
		await expect(expandedPanel).not.toContainText('Más avanzado');
		await expect(expandedPanel).toContainText('Los puntos muestran los estados guardados.');
		expect(await expandedPanel.evaluate((panel) => panel.scrollWidth <= panel.clientWidth)).toBe(
			true
		);

		await expandedPanel.getByRole('heading', { name: 'Elegir progreso' }).click();
		await expect
			.poll(() => chooser.evaluate((panel) => panel.getAnimations({ subtree: true }).length))
			.toBeGreaterThan(0);

		const compactComparison = chooser.getByRole('button', {
			name: 'Expandir opciones de progreso'
		});
		await expect(compactComparison).toBeVisible();
		await expect(compactComparison.getByText('Link', { exact: true })).toBeVisible();
		await expect(compactComparison).toContainText('Guardado');
		await expect(compactComparison).not.toContainText('·');
		await expect(compactComparison.getByRole('img')).toHaveCount(2);
		await expect(expandedPanel).toBeHidden();

		const compactPosition = await compactComparison.boundingBox();
		expect(compactPosition!.width).toBeLessThanOrEqual(296);
		expect(compactPosition!.height).toBeGreaterThanOrEqual(44);

		await page.reload({ waitUntil: 'networkidle' });
		await expect(compactComparison).toBeVisible();
		await expect(expandedPanel).toBeHidden();
		const persistedCompactPosition = await compactComparison.boundingBox();
		await compactComparison.click({
			position: { x: 8, y: persistedCompactPosition!.height / 2 }
		});
		await expect(expandedPanel).toBeVisible();

		await page.reload({ waitUntil: 'networkidle' });
		await expect(expandedPanel).toBeVisible();
		await expect(compactComparison).toBeHidden();

		await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
		await expect
			.poll(() =>
				page.evaluate(
					() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
				)
			)
			.toBe(true);
		const footerPosition = await page.getByRole('contentinfo').boundingBox();
		const panelPosition = await expandedPanel.boundingBox();
		expect(footerPosition!.y + footerPosition!.height).toBeLessThanOrEqual(panelPosition!.y);
	});

	test('adopts a received link when the device has no progress without marking it recent', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();
		await expect(page.getByRole('img', { name: /^Guardado en este dispositivo:/ })).toHaveCount(0);
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Regular');

		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Regular');
		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();

		await page.goto('/', { waitUntil: 'networkidle' });
		await expect(page.getByRole('region', { name: 'Últimos planes visitados' })).not.toBeVisible();

		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();
		await expect(
			page
				.getByRole('region', { name: 'Últimos planes visitados' })
				.getByRole('link', { name: /Continuar con Ingeniería en Sistemas de Información/ })
		).toBeVisible();
	});

	test('compares progress and replaces local progress only after confirmation', async ({
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		const localProgress = conflict.getByRole('article').filter({ hasText: 'Tu progreso guardado' });
		await expect(localProgress).toContainText('2%');
		await expect(localProgress).toContainText('1 aprobada, 0 regulares y 0 en curso');
		await expect(localProgress.getByText('Viendo ahora', { exact: true })).not.toBeVisible();
		await expect(
			conflict
				.getByRole('article')
				.filter({ hasText: 'Progreso del link' })
				.getByText('Viendo ahora', { exact: true })
		).toBeVisible();

		await conflict.getByRole('button', { name: /Usar progreso del link/ }).click();
		await expect(conflict).not.toBeVisible();

		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: Regular');
	});

	test('preserves the strict mode required by shared progress', async ({
		browser,
		page,
		studyPlan
	}) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		const senderContext = await browser.newContext();
		const senderPage = await senderContext.newPage();
		await senderPage.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await senderPage.getByRole('checkbox', { name: /modo estricto/i }).click();
		await senderPage
			.getByRole('combobox', { name: /^Estado de Análisis Matemático II:/ })
			.press('a');
		const sharedUrl = senderPage.url();
		await senderContext.close();

		await page.goto(sharedUrl, { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		const sharedProgress = conflict.getByRole('article').filter({ hasText: 'Progreso del link' });
		const localProgress = conflict.getByRole('article').filter({ hasText: 'Tu progreso guardado' });
		await expect(sharedProgress).not.toContainText('Modo estricto');
		await expect(localProgress).not.toContainText('Modo estricto');
		await expect(studyPlan.getStrictModeToggle()).not.toBeChecked();
		await expect(studyPlan.getCourseStateControl('Análisis Matemático II')).toHaveAccessibleName(
			'Estado de Análisis Matemático II: Aprobada'
		);

		await sharedProgress.getByRole('button', { name: /Usar progreso del link/ }).click();
		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await expect(studyPlan.getStrictModeToggle()).not.toBeChecked();
		await expect(studyPlan.getCourseStateControl('Análisis Matemático II')).toHaveAccessibleName(
			'Estado de Análisis Matemático II: Aprobada'
		);
	});

	test('detects a conflict when only grades differ', async ({ browser, page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await studyPlan.getCourseButton('Álgebra y Geometría Analítica').click();
		await studyPlan.setGrade(8);

		const senderContext = await browser.newContext();
		const senderPage = await senderContext.newPage();
		await senderPage.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await senderPage
			.getByRole('combobox', { name: /^Estado de Álgebra y Geometría Analítica:/ })
			.press('a');
		await senderPage.getByRole('button', { name: /^Álgebra y Geometría Analítica(?:,|$)/ }).click();
		await senderPage.getByRole('spinbutton').fill('10');
		await senderPage.getByRole('spinbutton').blur();
		const sharedUrl = senderPage.url();
		await senderContext.close();

		await page.goto(sharedUrl, { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		await expect(conflict).toBeVisible();
		await expect(conflict.getByRole('article').filter({ hasText: '1 nota' })).toHaveCount(2);
		await conflict.getByRole('button', { name: /Usar progreso del link/ }).click();

		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await studyPlan.getCourseButton('Álgebra y Geometría Analítica').click();
		await expect(page.getByRole('spinbutton')).toHaveValue('10');
	});

	test('has readable progress choices in dark theme', async ({ page, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.evaluate(() => localStorage.setItem('theme', 'dark'));
		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });

		await expect(page.getByRole('button', { name: 'Tema: Oscuro', exact: true })).toBeVisible();
		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		await expect(
			conflict.getByRole('group', { name: 'Opciones de progreso expandidas' })
		).toBeVisible();
		const results = await new AxeBuilder({ page })
			.include('[aria-label="Elegir progreso"]')
			.withRules('color-contrast')
			.analyze();
		expect(results.violations).toEqual([]);
	});
});

test.describe('Storage edge cases', () => {
	test('keeps the same plan synchronized across open tabs', async ({ context, studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
		const otherPage = await context.newPage();
		await otherPage.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });

		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');

		await expect(
			otherPage.getByRole('combobox', {
				name: 'Estado de Álgebra y Geometría Analítica: Aprobada',
				exact: true
			})
		).toBeVisible();
	});

	test('stays usable and reports when browser storage is unavailable', async ({ page }) => {
		await page.addInitScript(() => {
			const fail = () => {
				throw new DOMException('Storage unavailable', 'QuotaExceededError');
			};
			Storage.prototype.getItem = fail;
			Storage.prototype.setItem = fail;
			Storage.prototype.removeItem = fail;
		});

		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });
		await expect(
			page.getByRole('heading', { name: 'Ingeniería en Sistemas de Información' })
		).toBeVisible();
		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();
		await expect(page.getByRole('alert')).toContainText(
			'No pudimos guardar los cambios en este dispositivo'
		);

		await page
			.getByRole('combobox', { name: /^Estado de Álgebra y Geometría Analítica:/ })
			.press('a');
		await expect(page.getByRole('alert')).toContainText(
			'No pudimos guardar los cambios en este dispositivo'
		);

		await page.goto('/', { waitUntil: 'networkidle' });
		await expect(page.getByRole('textbox', { name: /buscar carrera/i })).toBeVisible();
	});

	test('defaults malformed panel preferences to expanded', async ({ page, studyPlan }) => {
		await page.addInitScript(() => {
			localStorage.setItem('plande-panel-recent-plans', 'not-a-preference');
			localStorage.setItem('plande-panel-shared-progress', 'not-a-preference');
		});

		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();
		await expect(
			page
				.getByRole('region', { name: 'Últimos planes visitados' })
				.getByRole('group', { name: 'Último plan usado' })
		).toBeVisible();

		await page.goto('/utn-frcu-isi-2023?s=nrn3r', { waitUntil: 'networkidle' });
		await expect(
			page
				.getByRole('region', { name: 'Elegir progreso' })
				.getByRole('group', { name: 'Opciones de progreso expandidas' })
		).toBeVisible();
	});

	test('ignores a recent plan that no longer exists', async ({ page }) => {
		await page.addInitScript(() => {
			localStorage.setItem(
				'plande-plan-memory',
				JSON.stringify({
					version: 1,
					recentPlanSlugs: ['plan-que-ya-no-existe']
				})
			);
		});

		await page.goto('/', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL('/');
		await expect(page.getByRole('textbox', { name: /buscar carrera/i })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Últimos planes visitados' })).toHaveCount(0);
	});

	test('ignores malformed remembered plans and progress', async ({ page, studyPlan }) => {
		await page.addInitScript(() => {
			localStorage.setItem('plande-plan-memory', '{not valid json');
			localStorage.setItem('plande-utn-frcu-isi-2023', '{also broken');
		});

		await page.goto('/', { waitUntil: 'networkidle' });
		await expect(page.getByRole('textbox', { name: /buscar carrera/i })).toBeVisible();

		await page.goto('/utn-frcu-isi-2023', { waitUntil: 'networkidle' });
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: No cursada');
		await expect(page.getByRole('region', { name: 'Elegir progreso' })).not.toBeVisible();
	});

	test('treats malformed progress parameters as empty instead of crashing', async ({
		page,
		studyPlan
	}) => {
		await page.goto('/utn-frcu-isi-2023?s=zzz&n=zzz', { waitUntil: 'networkidle' });

		await expect(
			page.getByRole('heading', { name: 'Ingeniería en Sistemas de Información' })
		).toBeVisible();
		await expect(
			studyPlan.getCourseStateControl('Álgebra y Geometría Analítica')
		).toHaveAccessibleName('Estado de Álgebra y Geometría Analítica: No cursada');
	});
});
