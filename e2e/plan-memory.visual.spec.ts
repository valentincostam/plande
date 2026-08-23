import { test, expect } from './fixtures';

test.describe('Plan memory visual states', () => {
	test('shows recent plans expanded, hovered, collapsed, and in dark theme', async ({
		page,
		studyPlan
	}) => {
		await page.setViewportSize({ width: 768, height: 900 });
		for (const slug of ['utn-frcu-ie-2023', 'utn-frba-iq-1995', 'utn-frcu-isi-2023']) {
			await studyPlan.goto(slug);
			await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		}
		await page.getByRole('banner').getByRole('link', { name: 'Plande', exact: true }).click();

		const recentPlans = page.getByRole('region', { name: 'Últimos planes visitados' });
		const expandedPanel = recentPlans.getByRole('group', {
			name: 'Panel de últimos planes visitados'
		});
		await expect(expandedPanel).toHaveScreenshot('recent-plans-expanded-light.png');

		await recentPlans
			.getByRole('link', { name: 'Continuar con Ingeniería en Sistemas de Información' })
			.hover();
		await expect(expandedPanel).toHaveScreenshot('recent-plans-hover-light.png');

		await recentPlans.getByRole('button', { name: 'Colapsar últimos planes visitados' }).click();
		const compactButton = recentPlans.getByRole('button', {
			name: 'Expandir últimos planes visitados'
		});
		await expect(compactButton).toHaveScreenshot('recent-plans-collapsed-light.png');

		await page.evaluate(() => localStorage.setItem('theme', 'dark'));
		await page.reload({ waitUntil: 'networkidle' });
		await expect(page.getByRole('button', { name: 'Tema: Oscuro', exact: true })).toBeVisible();
		await compactButton.click();
		await page.mouse.move(0, 0);
		await expect(expandedPanel).toHaveScreenshot('recent-plans-expanded-dark.png');
	});

	test('shows a 100 percent progress conflict expanded, collapsed, and in dark theme', async ({
		page,
		studyPlan
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await studyPlan.goto('utn-frcu-isi-2023');
		await studyPlan.setCourseState('Álgebra y Geometría Analítica', 'Aprobada');
		await page.goto('/utn-frcu-isi-2023?s=a46', { waitUntil: 'networkidle' });

		const conflict = page.getByRole('region', { name: 'Elegir progreso' });
		const expandedPanel = conflict.getByRole('group', {
			name: 'Opciones de progreso expandidas'
		});
		await expect(expandedPanel).toHaveScreenshot('progress-conflict-100-expanded-light.png');

		await conflict.getByRole('button', { name: 'Colapsar opciones de progreso' }).click();
		const compactButton = conflict.getByRole('button', {
			name: 'Expandir opciones de progreso'
		});
		await expect(compactButton).toHaveScreenshot('progress-conflict-100-collapsed-light.png');

		await page.evaluate(() => localStorage.setItem('theme', 'dark'));
		await page.reload({ waitUntil: 'networkidle' });
		await expect(page.getByRole('button', { name: 'Tema: Oscuro', exact: true })).toBeVisible();
		await compactButton.click();
		await expect(expandedPanel).toHaveScreenshot('progress-conflict-100-expanded-dark.png');
	});
});
