import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
	test('defaults to system preference', async ({ page }) => {
		await page.goto('/');
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload();

		const themeSelect = page.getByRole('combobox', { name: 'Tema' });
		await expect(themeSelect).toHaveValue('system');
		const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
		expect(savedTheme).toBeNull();
	});

	test('persists dark theme selection', async ({ page }) => {
		await page.goto('/');
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload();

		const themeSelect = page.getByRole('combobox', { name: 'Tema' });
		await themeSelect.selectOption('dark');

		await expect(themeSelect).toHaveValue('dark');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
		await expect(page.locator('html')).toHaveClass(/dark/);

		await page.reload();
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
		await expect(page.locator('html')).toHaveClass(/dark/);
	});

	test('system option clears saved theme', async ({ page }) => {
		await page.goto('/');
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload();

		const themeSelect = page.getByRole('combobox', { name: 'Tema' });
		await themeSelect.selectOption('dark');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

		await themeSelect.selectOption('system');
		await expect(themeSelect).toHaveValue('system');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
	});
});
