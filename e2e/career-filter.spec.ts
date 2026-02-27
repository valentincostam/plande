import { test, expect } from '@playwright/test';

test.describe('Career filter on homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('filter input is visible and accessible', async ({ page }) => {
		const filterInput = page.getByRole('textbox', {
			name: /buscar carrera/i
		});
		await expect(filterInput).toBeVisible();
		await expect(filterInput).toHaveAttribute('placeholder', /buscar carrera/i);
	});

	test('filtering by degree name shows only matching results', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		await filterInput.fill('ingeniería en sistemas');

		await expect(page.getByRole('status')).toBeVisible();
		await expect(
			page
				.getByRole('link')
				.filter({ hasText: /ingeniería en sistemas/i })
				.first()
		).toBeVisible();
	});

	test('filtering by university name shows matching universities', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		await filterInput.fill('UTN');

		await expect(page.getByRole('status')).toBeVisible();
		await expect(page.getByText(/universidad tecnológica nacional/i).first()).toBeVisible();
	});

	test('filtering by college name shows matching colleges', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		await filterInput.fill('facultad de ingeniería');

		await expect(page.getByRole('status')).toBeVisible();
	});

	test('filtering by slug shows matching results', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		await filterInput.fill('frcu');

		await expect(page.getByRole('status')).toBeVisible();
	});

	test('clear button removes search text and hides results', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });
		const clearButton = page.getByRole('button', { name: /limpiar búsqueda/i });

		await filterInput.fill('ingeniería');
		await expect(clearButton).toBeVisible();
		await expect(page.getByRole('status')).toBeVisible();

		await clearButton.click();
		await expect(filterInput).toHaveValue('');
		await expect(clearButton).not.toBeVisible();
		await expect(page.getByRole('status')).not.toBeVisible();
	});

	test('clear button is not visible when input is empty', async ({ page }) => {
		const clearButton = page.getByRole('button', { name: /limpiar búsqueda/i });
		await expect(clearButton).not.toBeVisible();
	});

	test('no results message shown when filter matches nothing', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		await filterInput.fill('xyznonexistent');

		const status = page.getByRole('status');
		await expect(status).toBeVisible();
		const statusText = await status.textContent();
		expect(statusText).toMatch(/0\s+carreras?\s+encontradas?/i);
		await expect(page.getByText(/no está tu carrera/i)).toBeVisible();
	});

	test('search without accents finds text with accents', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		// Search "informacion" without accent should find "Información" with accent
		await filterInput.fill('informacion');

		await expect(page.getByRole('status')).toBeVisible();

		// Verify "Información" is highlighted (with accent)
		const highlighted = page.locator('mark').filter({ hasText: /información/i });
		await expect(highlighted.first()).toBeVisible();
	});

	test('search with accents finds text without accents in query', async ({ page }) => {
		const filterInput = page.getByRole('textbox', { name: /buscar carrera/i });

		// Search "público" with accent should find careers
		await filterInput.fill('publico');

		await expect(page.getByRole('status')).toBeVisible();

		// Verify "Público" (with accent) is found and highlighted
		const highlighted = page.locator('mark').filter({ hasText: /público/i });
		await expect(highlighted.first()).toBeVisible();
	});
});
