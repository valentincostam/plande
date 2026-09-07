import { expect, test } from '@playwright/test';

test('anonymous visitor can choose Google sign-in', async ({ page }) => {
	await page.goto('/auth/sign-in');

	await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Continuar con Google' })).toBeEnabled();
});

test('Google sign-in command starts the local OAuth flow', async ({ page }) => {
	await page.route('**/auth/v1/authorize**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'text/html',
			body: '<title>Local Auth</title>'
		});
	});
	await page.goto('/auth/sign-in');
	const [authorizeRequest] = await Promise.all([
		page.waitForRequest((request) => request.url().includes('/auth/v1/authorize')),
		page.getByRole('button', { name: 'Continuar con Google' }).click()
	]);
	expect(authorizeRequest.url()).toContain('/auth/v1/authorize');
});

test('configured pilot shows a sign-in command on the homepage', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Iniciar sesión' }).click();
	await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible();
});

test('session-bearing sign-in response is private and does not render cookie material', async ({
	context,
	page
}) => {
	const cookieValue = 'token-that-must-not-appear-in-the-page';
	await context.addCookies([
		{ name: 'sb-test-auth-token', value: cookieValue, domain: '127.0.0.1', path: '/' }
	]);

	const response = await page.goto('/auth/sign-in');
	expect(response?.headers()['cache-control']).toContain('private');
	expect(response?.headers()['cache-control']).toContain('no-store');
	expect(await response?.text()).not.toContain(cookieValue);
});

test('invalid callback returns a recoverable sign-in error', async ({ page }) => {
	await page.goto('/auth/callback?code=controlled-invalid-code');

	await expect(page.getByRole('alert')).toHaveText(
		'No se pudo completar el inicio de sesión. Intentá de nuevo.'
	);
	await expect(page.getByRole('button', { name: 'Continuar con Google' })).toBeEnabled();
});

test('a failed sign-out shows a recoverable error without blocking anonymous browsing', async ({
	page
}) => {
	await page.goto('/?auth=sign-out-failed');
	await expect(page.getByRole('alert')).toHaveText('No se pudo cerrar sesión. Intentá de nuevo.');
	await expect(page.getByRole('link', { name: 'Iniciar sesión', exact: true })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Plande 🎓', exact: true })).toBeVisible();
});
