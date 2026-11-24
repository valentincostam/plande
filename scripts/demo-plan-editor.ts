import { chromium, expect } from '@playwright/test';
import { withControlledPublishedPlan } from '../e2e/helpers/controlled-published-plan';

const smoke = process.argv.includes('--smoke');
const inspect = process.argv.includes('--inspect');
process.env.BASE_URL ??= 'http://127.0.0.1:5174';
if (new URL(process.env.BASE_URL).origin !== 'http://127.0.0.1:5174')
	throw new Error('La demostración sólo funciona con la app local en 127.0.0.1:5174.');

const browser = await chromium.launch({
	headless: smoke || inspect,
	args: inspect ? ['--remote-debugging-address=127.0.0.1', '--remote-debugging-port=9223'] : []
});
try {
	await withControlledPublishedPlan(
		browser,
		'Demostración Plande',
		async (fixture) => {
			const page = await fixture.openStudentPage(await fixture.createStudent());
			page.on('pageerror', (error) => console.error(error.stack || error.message));
			await page.setViewportSize({ width: 1440, height: 1000 });
			await page.goto(new URL(`/${fixture.slug}`, process.env.BASE_URL).href);
			await expect(page.getByRole('main')).toHaveAttribute('aria-busy', 'false');
			await page
				.getByText('Proponer corrección', { exact: true })
				.filter({ visible: true })
				.click();
			const form = page.getByRole('form', { name: 'Proponer corrección', exact: true });
			await form
				.getByLabel('Argumento', { exact: true })
				.fill(
					'Plan ficticio para explorar el editor. Los cambios no afectan a ninguna carrera real.'
				);
			await form.getByRole('button', { name: 'Proponer corrección', exact: true }).click();
			await page.waitForURL(/\/draft\/[0-9a-f-]{36}$/);
			await page
				.getByRole('heading', { name: 'Estructura del plan', exact: true })
				.waitFor({ state: 'attached' });
			await page
				.getByRole('button', { name: 'Mostrar detalle de Programación', exact: true })
				.click();
			if (smoke) return;
			console.log(page.url());
			console.log('Editor abierto con una cuenta temporal. Podés editar y guardar.');
			console.log('Cerrá esta pestaña para borrar únicamente los datos de la demostración.');
			console.log('La sesión existe en esta ventana, no en otros navegadores.');
			await new Promise<void>((resolve) => page.once('close', resolve));
		},
		{
			displayIdentity: {
				university: 'Universidad de demostración',
				faculty: 'Facultad de Ingeniería',
				offer: 'Licenciatura en Sistemas'
			},
			items: [
				{ id: 'algebra-demo', name: 'Álgebra' },
				{ id: 'programacion-demo', name: 'Programación' }
			],
			academicContent: {
				sections: [
					{ id: 'base', label: 'Formación básica' },
					{ id: 'profesional', label: 'Formación profesional' }
				],
				items: [
					{
						id: 'algebra-demo',
						seqId: 0,
						name: 'Álgebra',
						kind: 'course',
						type: 'mandatory',
						credits: 6,
						placements: [{ sectionId: 'base', term: 'firstSemester', order: 0 }]
					},
					{
						id: 'programacion-demo',
						seqId: 1,
						name: 'Programación',
						kind: 'course',
						type: 'mandatory',
						credits: 8,
						hours: 6,
						placements: [{ sectionId: 'base', term: 'secondSemester', order: 1 }],
						requirements: {
							enroll: {
								type: 'any',
								rules: [
									{ type: 'item', itemId: 'algebra-demo', state: 'passed' },
									{ type: 'item', itemId: 'ingles-demo', state: 'completed' }
								]
							}
						}
					},
					{
						id: 'sistemas-demo',
						seqId: 2,
						name: 'Diseño y evaluación de sistemas de información para organizaciones',
						kind: 'course',
						type: 'mandatory',
						credits: 6,
						placements: [{ sectionId: 'profesional', order: 0 }],
						requirements: { enroll: { type: 'item', itemId: 'programacion-demo', state: 'passed' } }
					},
					{ id: 'ingles-demo', seqId: 3, name: 'Inglés', kind: 'milestone', placements: [] }
				],
				requirements: {}
			}
		}
	);
	console.log(
		smoke
			? 'Demostración verificada; datos temporales eliminados.'
			: 'Datos de demostración eliminados.'
	);
} finally {
	await browser.close();
}
