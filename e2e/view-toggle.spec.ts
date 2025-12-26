import { test, expect } from './fixtures';

test.describe('View toggle (Lista/Diagrama)', () => {
	test.beforeEach(async ({ studyPlan }) => {
		await studyPlan.goto('utn-frcu-isi-2023');
	});

	test('defaults to list view with Lista button pressed', async ({ page }) => {
		const listaButton = page.getByRole('button', { name: 'Lista' });
		const diagramaButton = page.getByRole('button', { name: 'Diagrama' });

		// Lista should be pressed by default
		await expect(listaButton).toHaveAttribute('aria-pressed', 'true');
		await expect(diagramaButton).toHaveAttribute('aria-pressed', 'false');

		// List content should be visible (years with courses)
		await expect(page.getByRole('heading', { name: /1.* Año/ })).toBeVisible();
	});

	test('clicking Diagrama switches to diagram view', async ({ page }) => {
		const listaButton = page.getByRole('button', { name: 'Lista' });
		const diagramaButton = page.getByRole('button', { name: 'Diagrama' });

		await diagramaButton.click();

		// Diagrama should now be pressed
		await expect(diagramaButton).toHaveAttribute('aria-pressed', 'true');
		await expect(listaButton).toHaveAttribute('aria-pressed', 'false');

		// Year headings should not be visible in diagram view
		await expect(page.getByRole('heading', { name: /1.* Año/ })).not.toBeVisible();

		// Diagram region should be visible
		await expect(page.getByRole('region', { name: 'Diagrama de correlatividades' })).toBeVisible();
	});

	test('clicking Lista switches back to list view', async ({ page }) => {
		const listaButton = page.getByRole('button', { name: 'Lista' });
		const diagramaButton = page.getByRole('button', { name: 'Diagrama' });

		// Switch to diagram first
		await diagramaButton.click();
		await expect(page.getByRole('heading', { name: /1.* Año/ })).not.toBeVisible();

		// Switch back to list
		await listaButton.click();

		// Lista should be pressed again
		await expect(listaButton).toHaveAttribute('aria-pressed', 'true');
		await expect(diagramaButton).toHaveAttribute('aria-pressed', 'false');

		// List content should be visible again
		await expect(page.getByRole('heading', { name: /1.* Año/ })).toBeVisible();
	});

	test('view toggle group has accessible label', async ({ page }) => {
		const viewGroup = page.getByRole('group', { name: 'Modo de vista' });
		await expect(viewGroup).toBeVisible();
	});
});
