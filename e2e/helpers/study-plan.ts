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

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getCourseStateLabel = async (button: Locator) => {
	const ariaLabel = await button.getAttribute('aria-label');

	if (!ariaLabel) {
		throw new Error('Course state button is missing aria-label');
	}

	const parts = ariaLabel.split(': ');

	if (parts.length < 2) {
		throw new Error(`Unexpected course state label: ${ariaLabel}`);
	}

	return parts.slice(1).join(': ');
};

export const getCourseStateButton = (page: Page, courseName: string): Locator =>
	page.getByRole('button', { name: new RegExp(`^Estado de ${escapeRegex(courseName)}: `) });

export const getCourseButton = (page: Page, courseName: string): Locator =>
	page.getByRole('button', { name: new RegExp(`^${escapeRegex(courseName)}(?:,|$)`) });

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
	const button = getCourseStateButton(page, courseName);

	for (let attempt = 0; attempt < 4; attempt++) {
		if ((await getCourseStateLabel(button)) === state) {
			return;
		}

		await button.click();
	}

	throw new Error(`Could not set "${courseName}" to "${state}" by cycling its state button`);
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
	page.getByRole('button', { name: 'Copiar link para compartir' });

export const getDiagramDownloadButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Descargar imagen PNG' });

export const getDiagramViewButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Diagrama' });

export const getListViewButton = (page: Page): Locator =>
	page.getByRole('button', { name: 'Lista' });

export const getDiagramRegion = (page: Page): Locator =>
	page.getByRole('region', { name: 'Diagrama de correlatividades' });

export const getDiagramCourseNode = (page: Page, courseName: string): Locator =>
	getDiagramRegion(page).getByRole('group', {
		name: new RegExp(`^${escapeRegex(courseName)}(?:,|$)`)
	});

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

export const gotoSimple = (page: Page, slug = 'utn-frcu-isi') =>
	page.goto(`/${slug}/simple`, { waitUntil: 'networkidle' });

export const gotoSimpleWithState = (
	page: Page,
	slug: string,
	stateParam: string,
	gradeParam?: string
) => {
	const params = new URLSearchParams();
	params.set('s', stateParam);
	if (gradeParam) params.set('n', gradeParam);
	return page.goto(`/${slug}/simple?${params}`, { waitUntil: 'networkidle' });
};

export const getFullViewLink = (page: Page): Locator =>
	page.getByRole('link', { name: /Ver versión completa/ });

export const getSimpleViewLink = (page: Page): Locator =>
	page.getByRole('link', { name: /Ver versión simple/ });
