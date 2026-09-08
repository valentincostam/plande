import { expect, test, type Page } from '@playwright/test';
import { createControlledPrivateProgress } from './helpers/private-progress';
import { goto as gotoPlan } from './helpers/study-plan';

declare global {
	interface Window {
		__plandeFailPrivateCache: boolean;
	}
}

test.skip(
	process.env.PLANDE_CONTROLLED_AUTH !== '1',
	'Set PLANDE_CONTROLLED_AUTH=1 for local fixtures.'
);
test.use({ trace: 'off' });

const stateControl = (page: Page, state: string) =>
	page.getByRole('combobox', { name: `Estado de Antropología y Salud: ${state}`, exact: true });

async function expectRestored(
	fixtures: Awaited<ReturnType<typeof createControlledPrivateProgress>>,
	identity: Awaited<ReturnType<Awaited<ReturnType<typeof createControlledPrivateProgress>>['user']>>
) {
	const clean = await fixtures.signIn(identity);
	const page = await clean.newPage();
	await gotoPlan(page, 'uns-dcs-le-2017');
	await expect(stateControl(page, 'Regular')).toBeVisible();
}

test('keeps an edit made while a save response is in flight', async ({ browser }) => {
	const fixtures = await createControlledPrivateProgress(browser);
	let failure: unknown;
	try {
		const identity = await fixtures.user();
		const context = await fixtures.signIn(identity);
		const page = await context.newPage();
		let release!: () => void;
		const responseHeld = new Promise<void>((resolve) => (release = resolve));
		let intercepted = false;
		await page.route('**/api/private-progress/**', async (route) => {
			if (intercepted || route.request().method() !== 'POST') return route.continue();
			intercepted = true;
			const response = await route.fetch();
			await responseHeld;
			await route.fulfill({ response });
		});
		await gotoPlan(page, 'uns-dcs-le-2017');
		await stateControl(page, 'No cursada').selectOption({ label: 'En curso' });
		await expect(
			page.getByRole('status').filter({ hasText: 'Guardando tu progreso privado…' })
		).toBeVisible();
		await stateControl(page, 'En curso').selectOption({ label: 'Regular' });
		release();
		await expect(
			page.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await expect(stateControl(page, 'Regular')).toBeVisible();
		await expectRestored(fixtures, identity);
	} catch (error) {
		failure = error;
		throw error;
	} finally {
		try {
			await fixtures.cleanup();
		} catch (error) {
			if (!failure) expect(error).toBeUndefined();
		}
	}
});

test('rebases an edit made after an uncertain save when retrying its receipt', async ({
	browser
}) => {
	const fixtures = await createControlledPrivateProgress(browser);
	let failure: unknown;
	try {
		const identity = await fixtures.user();
		const context = await fixtures.signIn(identity);
		const page = await context.newPage();
		let intercepted = false;
		await page.route('**/api/private-progress/**', async (route) => {
			if (intercepted || route.request().method() !== 'POST') return route.continue();
			intercepted = true;
			await route.fetch();
			await route.abort();
		});
		await gotoPlan(page, 'uns-dcs-le-2017');
		await stateControl(page, 'No cursada').selectOption({ label: 'En curso' });
		await expect(
			page.getByRole('alert').filter({ hasText: 'No pudimos guardar tu progreso privado.' })
		).toBeVisible();
		await stateControl(page, 'En curso').selectOption({ label: 'Regular' });
		await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
		await expect(
			page.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await expect(stateControl(page, 'Regular')).toBeVisible();
		await expectRestored(fixtures, identity);
	} catch (error) {
		failure = error;
		throw error;
	} finally {
		try {
			await fixtures.cleanup();
		} catch (error) {
			if (!failure) expect(error).toBeUndefined();
		}
	}
});

test('reopens a stale resolution against the newest server edit', async ({ browser }) => {
	const fixtures = await createControlledPrivateProgress(browser);
	let failure: unknown;
	try {
		const identity = await fixtures.user();
		const firstContext = await fixtures.signIn(identity);
		const firstPage = await firstContext.newPage();
		await gotoPlan(firstPage, 'uns-dcs-le-2017');
		await stateControl(firstPage, 'No cursada').selectOption({ label: 'Aprobada' });
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		const secondContext = await fixtures.signIn(identity);
		const secondPage = await secondContext.newPage();
		await gotoPlan(secondPage, 'uns-dcs-le-2017');
		await stateControl(firstPage, 'Aprobada').selectOption({ label: 'En curso' });
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await stateControl(secondPage, 'Aprobada').selectOption({ label: 'Regular' });
		await expect(
			secondPage.getByRole('heading', { name: 'Elegí qué progreso conservar', exact: true })
		).toBeVisible();
		await stateControl(firstPage, 'En curso').selectOption({ label: 'No cursada' });
		await expect(
			firstPage.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await secondPage
			.getByRole('button', {
				name: 'Conservar este dispositivo para Antropología y Salud: Regular',
				exact: true
			})
			.click();
		await expect(
			secondPage.getByRole('button', {
				name: 'Usar la cuenta para Antropología y Salud: No cursada',
				exact: true
			})
		).toBeVisible();
	} catch (error) {
		failure = error;
		throw error;
	} finally {
		try {
			await fixtures.cleanup();
		} catch (error) {
			if (!failure) expect(error).toBeUndefined();
		}
	}
});

test('does not send a retry until its pending request is stored', async ({ browser }) => {
	const fixtures = await createControlledPrivateProgress(browser);
	let failure: unknown;
	try {
		const identity = await fixtures.user();
		const context = await fixtures.signIn(identity);
		await context.addInitScript(() => {
			let failPrivateCache = true;
			Object.defineProperty(window, '__plandeFailPrivateCache', {
				get: () => failPrivateCache,
				set: (value) => {
					failPrivateCache = Boolean(value);
				}
			});
			const setItem = Storage.prototype.setItem;
			Storage.prototype.setItem = function (key, value) {
				if (window.__plandeFailPrivateCache && key.startsWith('plande-private-'))
					throw new Error('Controlled storage failure');
				return setItem.call(this, key, value);
			};
		});
		const page = await context.newPage();
		await gotoPlan(page, 'uns-dcs-le-2017');
		await stateControl(page, 'No cursada').selectOption({ label: 'Regular' });
		await expect(
			page.getByRole('alert').filter({ hasText: 'No pudimos guardar tu progreso privado.' })
		).toBeVisible();
		await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
		await expect(
			page.getByRole('alert').filter({ hasText: 'No pudimos guardar tu progreso privado.' })
		).toBeVisible();
		await page.evaluate(() => {
			window.__plandeFailPrivateCache = false;
		});
		await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
		await expect(
			page.getByRole('status').filter({ hasText: 'Progreso privado guardado.' })
		).toBeVisible();
		await expectRestored(fixtures, identity);
	} catch (error) {
		failure = error;
		throw error;
	} finally {
		try {
			await fixtures.cleanup();
		} catch (error) {
			if (!failure) expect(error).toBeUndefined();
		}
	}
});
