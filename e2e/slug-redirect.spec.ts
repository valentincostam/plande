import { test, expect } from './fixtures';

test.describe('Slug redirect to canonical URL with year', () => {
	test('redirects slug without year to most recent plan with year', async ({ page }) => {
		await page.goto('/utn-frba-isi', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL(/\/utn-frba-isi-2023$/);
	});

	test('preserves query params when redirecting', async ({ page }) => {
		await page.goto('/utn-frba-isi?s=a26r5e3&r=no', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL(/\/utn-frba-isi-2023\?s=a26r5e3&r=no$/);
	});

	test('slug with year does not redirect', async ({ page }) => {
		await page.goto('/utn-frba-isi-2023', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL(/\/utn-frba-isi-2023$/);
	});

	test('can access older plan with year in slug', async ({ page }) => {
		await page.goto('/utn-frba-isi-2008', { waitUntil: 'networkidle' });

		await expect(page).toHaveURL(/\/utn-frba-isi-2008$/);

		// Verify it loaded successfully by checking course list section exists
		await expect(page.getByRole('heading', { name: /Qué podés cursar/i })).toBeVisible();
	});

	test('home page links include year in slug', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		const isiLink2008 = page.getByRole('link', {
			name: 'Ingeniería en Sistemas de Información Plan 2008',
			exact: true
		});
		const isiLink2023 = page.getByRole('link', {
			name: 'Ingeniería en Sistemas de Información Plan 2023',
			exact: true
		});

		await expect(isiLink2008).toHaveAttribute('href', '/utn-frba-isi-2008');
		const plan2023Links = await isiLink2023.evaluateAll((links) =>
			links.map((link) => link.getAttribute('href'))
		);
		expect(plan2023Links).toContain('/utn-frba-isi-2023');
	});
});
