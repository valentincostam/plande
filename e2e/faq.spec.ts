import { test, expect } from '@playwright/test';

test.describe('Homepage FAQ', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('question toggles expanded state and answer visibility', async ({ page }) => {
		const question = page.getByRole('button', { name: '¿Qué es Plande?' });
		const answer = page.getByText(/Plande es una aplicación web gratuita/i);

		await expect(question).toHaveAttribute('aria-expanded', 'false');
		await expect(answer).not.toBeVisible();

		await question.click();

		await expect(question).toHaveAttribute('aria-expanded', 'true');
		await expect(answer).toBeVisible();

		await question.click();

		await expect(question).toHaveAttribute('aria-expanded', 'false');
		await expect(answer).not.toBeVisible();
	});

	test('opening another question updates expanded states', async ({ page }) => {
		const firstQuestion = page.getByRole('button', { name: '¿Qué es Plande?' });
		const secondQuestion = page.getByRole('button', {
			name: '¿Cómo funcionan los estados de las materias?'
		});

		await firstQuestion.click();
		await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

		await secondQuestion.click();
		await expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
		await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
	});
});
