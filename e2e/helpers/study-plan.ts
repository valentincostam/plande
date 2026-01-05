import type { Page, Locator } from '@playwright/test';

const getOrdinalWord = (year: number): string => {
	const ordinals: Record<number, string> = {
		1: 'primer',
		2: 'segundo',
		3: 'tercer',
		4: 'cuarto',
		5: 'quinto',
		6: 'sexto',
		7: 'séptimo',
		8: 'octavo',
		9: 'noveno',
		10: 'décimo'
	};
	return ordinals[year] ?? `${year}°`;
};

export const goto = (page: Page, slug = 'utn-frcu-isi') =>
	page.goto(`/${slug}`, { waitUntil: 'networkidle' });

export const getCourseSelect = (page: Page, courseName: string): Locator =>
	page.getByRole('combobox', { name: `Estado de ${courseName}`, exact: true });

export const getCourseButton = (page: Page, courseName: string): Locator =>
	page.getByRole('button', { name: new RegExp(courseName) });

export const getAvailableCoursesSection = (page: Page): Locator =>
	page.locator('section', { has: page.getByRole('heading', { name: 'Qué podés cursar' }) });

export const getStrictModeToggle = (page: Page): Locator =>
	page.getByRole('checkbox', { name: /modo estricto/i });

export const getShowCodesToggle = (page: Page): Locator =>
	page.getByRole('checkbox', { name: /mostrar identificadores/i });

export const getResetProgressButton = (page: Page): Locator =>
	page.getByRole('button', { name: /reiniciar progreso/i });

export const getCourseDetailsPanel = async (page: Page, courseName: string): Promise<Locator> => {
	const button = getCourseButton(page, courseName);
	const panelId = await button.getAttribute('aria-controls');
	if (!panelId) throw new Error(`Course button for "${courseName}" has no aria-controls`);
	return page.locator(`#${panelId}`);
};

export const setCourseState = async (page: Page, courseName: string, state: string) => {
	const select = getCourseSelect(page, courseName);
	await select.click();
	await select.selectOption({ label: state });
};

export const getYearSection = (page: Page, year: number): Locator =>
	page.getByRole('region', { name: new RegExp(`${getOrdinalWord(year)} Año`, 'i') });

export const getYearBulkSelect = (page: Page, year: number): Locator =>
	page.getByRole('combobox', { name: `Cambiar estado de todas las materias de ${year}° año` });

export const setYearState = async (page: Page, year: number, state: string) => {
	const select = getYearBulkSelect(page, year);
	await select.click();
	await select.selectOption({ label: state });
};

export const gotoWithState = (page: Page, slug: string, stateParam: string) =>
	page.goto(`/${slug}?s=${stateParam}`, { waitUntil: 'networkidle' });

export const getDegreeProgressBar = (page: Page): Locator => page.getByRole('progressbar');

export const getStatByLabel = (page: Page, labelPattern: string | RegExp): Locator =>
	page.getByRole('listitem').filter({ hasText: labelPattern });

export const setGrade = async (page: Page, grade: number) => {
	const gradeInput = page.getByRole('spinbutton');
	await gradeInput.fill(grade.toString());
	await gradeInput.blur();
};

export const getExportButton = (page: Page, format: 'CSV' | 'JSON' | 'TOON'): Locator =>
	page.getByRole('button', { name: `Descargar ${format}` });

export const getShareButton = (page: Page): Locator =>
	page.getByRole('button', { name: /Compartir plan de estudios/ });

export const getCopyLinkButton = (page: Page): Locator =>
	page.getByRole('button', { name: /Copiar link/ });

export const getDiagramDownloadButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Descargar imagen PNG' });

export const getDiagramViewButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Diagrama' });

export const getListViewButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Lista' });

export const getDiagramRegion = (page: Page): Locator =>
	page.getByRole('region', { name: 'Diagrama de correlatividades' });

export const getFullscreenButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Pantalla completa' });

export const getExitFullscreenButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Salir de pantalla completa (Esc)' });

export const getBodyOverflow = (page: Page): Promise<string> =>
	page.evaluate(() => document.body.style.overflow);

export const getPriorityCoursesSection = (page: Page): Locator =>
	page.getByRole('region', { name: /orden de prioridad/i });

export const getPriorityCoursesTable = (page: Page): Locator =>
	getPriorityCoursesSection(page).getByRole('table');
