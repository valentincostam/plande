import { expect, test } from '@playwright/test';
import { allStudyPlans } from '../src/routes/[slug]/data/all-study-plans';
import { getStudyPlanDataSlugWithYear } from '../src/lib/study-plan-data';

const slugs = allStudyPlans.map((plan) => getStudyPlanDataSlugWithYear(plan));

test.describe('full catalog smoke', () => {
	for (const slug of slugs) {
		test(`${slug} loads without visible runtime failures`, async ({ page }) => {
			const pageErrors: string[] = [];
			const consoleErrors: string[] = [];

			page.on('pageerror', (error) => {
				pageErrors.push(error.message);
			});

			page.on('console', (message) => {
				if (message.type() === 'error') {
					consoleErrors.push(message.text());
				}
			});

			await page.goto(`/${slug}`, { waitUntil: 'load' });

			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			await expect(page.getByRole('button', { name: 'Lista' })).toBeVisible();
			await expect(page.getByRole('button', { name: 'Diagrama' })).toBeVisible();
			await expect(page.getByRole('button', { name: /Copiar link para compartir/i })).toBeVisible();

			const regionCount = await page.getByRole('region').count();
			expect(regionCount).toBeGreaterThan(0);

			await expect(page.locator('vite-error-overlay')).toHaveCount(0);
			expect(pageErrors).toEqual([]);
			expect(consoleErrors).toEqual([]);
		});
	}
});
