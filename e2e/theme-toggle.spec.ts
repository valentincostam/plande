import { test, expect, type Page } from '@playwright/test';

test.describe('Theme toggle', () => {
	const themePreferenceLabels = {
		system: 'Sistema',
		light: 'Claro',
		dark: 'Oscuro'
	} as const;

	const getThemeButton = (page: Page) => page.getByRole('button', { name: /^Tema: / });

	const getThemePreference = async (page: Page) => {
		const button = getThemeButton(page);
		const ariaLabel = await button.getAttribute('aria-label');

		switch (ariaLabel) {
			case `Tema: ${themePreferenceLabels.system}`:
				return 'system';
			case `Tema: ${themePreferenceLabels.light}`:
				return 'light';
			case `Tema: ${themePreferenceLabels.dark}`:
				return 'dark';
			default:
				throw new Error(`Unexpected theme button label: ${ariaLabel}`);
		}
	};

	const setThemePreference = async (page: Page, themePreference: 'system' | 'light' | 'dark') => {
		const button = getThemeButton(page);
		let currentThemePreference = await getThemePreference(page);

		for (let attempt = 0; attempt < 3 && currentThemePreference !== themePreference; attempt++) {
			const previousThemePreference = currentThemePreference;
			await button.click();
			await expect.poll(() => getThemePreference(page)).not.toBe(previousThemePreference);
			currentThemePreference = await getThemePreference(page);
		}

		expect(currentThemePreference).toBe(themePreference);
	};

	test('defaults to system preference', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload({ waitUntil: 'networkidle' });

		const themeButton = getThemeButton(page);
		await expect(themeButton).toHaveAccessibleName('Tema: Sistema');
		const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
		expect(savedTheme).toBeNull();
	});

	test('persists dark theme selection', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload({ waitUntil: 'networkidle' });

		const themeButton = getThemeButton(page);
		await setThemePreference(page, 'dark');

		await expect(themeButton).toHaveAccessibleName('Tema: Oscuro');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

		await page.reload({ waitUntil: 'networkidle' });
		await expect(getThemeButton(page)).toHaveAccessibleName('Tema: Oscuro');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
	});

	test('system option clears saved theme', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.evaluate(() => localStorage.removeItem('theme'));
		await page.reload({ waitUntil: 'networkidle' });

		const themeButton = getThemeButton(page);
		await setThemePreference(page, 'dark');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

		await setThemePreference(page, 'system');
		await expect(themeButton).toHaveAccessibleName('Tema: Sistema');
		await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
	});
});
