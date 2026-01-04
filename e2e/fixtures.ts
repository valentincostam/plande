import { test as base, type Locator } from '@playwright/test';
import * as helpers from './helpers/study-plan';

type StudyPlanFixture = {
	studyPlan: {
		goto: (slug?: string) => ReturnType<typeof helpers.goto>;
		gotoWithState: (slug: string, stateParam: string) => ReturnType<typeof helpers.gotoWithState>;
		getCourseSelect: (courseName: string) => Locator;
		getCourseButton: (courseName: string) => Locator;
		getCourseDetailsPanel: (courseName: string) => Promise<Locator>;
		getAvailableCoursesSection: () => Locator;
		getStrictModeToggle: () => Locator;
		getShowCodesToggle: () => Locator;
		getResetProgressButton: () => Locator;
		setCourseState: (courseName: string, state: string) => Promise<void>;
		getYearSection: (year: number) => Locator;
		getYearBulkSelect: (year: number) => Locator;
		setYearState: (year: number, state: string) => Promise<void>;
		getDegreeProgressBar: () => Locator;
		getStatByLabel: (labelPattern: string | RegExp) => Locator;
		setGrade: (grade: number) => Promise<void>;
		getExportButton: (format: 'CSV' | 'JSON' | 'TOON') => Locator;
		getShareButton: () => Locator;
		getCopyLinkButton: () => Locator;
		getDiagramDownloadButton: () => Locator;
		getDiagramViewButton: () => Locator;
		getListViewButton: () => Locator;
		getDiagramRegion: () => Locator;
		getFullscreenButton: () => Locator;
		getExitFullscreenButton: () => Locator;
		getBodyOverflow: () => Promise<string>;
		getPriorityCoursesSection: () => Locator;
		getPriorityCoursesTable: () => Locator;
	};
};

export const test = base.extend<StudyPlanFixture>({
	studyPlan: async ({ page }, use) => {
		await use({
			goto: (slug?: string) => helpers.goto(page, slug),
			gotoWithState: (slug: string, stateParam: string) =>
				helpers.gotoWithState(page, slug, stateParam),
			getCourseSelect: (name: string) => helpers.getCourseSelect(page, name),
			getCourseButton: (name: string) => helpers.getCourseButton(page, name),
			getCourseDetailsPanel: (name: string) => helpers.getCourseDetailsPanel(page, name),
			getAvailableCoursesSection: () => helpers.getAvailableCoursesSection(page),
			getStrictModeToggle: () => helpers.getStrictModeToggle(page),
			getShowCodesToggle: () => helpers.getShowCodesToggle(page),
			getResetProgressButton: () => helpers.getResetProgressButton(page),
			setCourseState: (name: string, state: string) => helpers.setCourseState(page, name, state),
			getYearSection: (year: number) => helpers.getYearSection(page, year),
			getYearBulkSelect: (year: number) => helpers.getYearBulkSelect(page, year),
			setYearState: (year: number, state: string) => helpers.setYearState(page, year, state),
			getDegreeProgressBar: () => helpers.getDegreeProgressBar(page),
			getStatByLabel: (labelPattern: string | RegExp) => helpers.getStatByLabel(page, labelPattern),
			setGrade: (grade: number) => helpers.setGrade(page, grade),
			getExportButton: (format: 'CSV' | 'JSON' | 'TOON') => helpers.getExportButton(page, format),
			getShareButton: () => helpers.getShareButton(page),
			getCopyLinkButton: () => helpers.getCopyLinkButton(page),
			getDiagramDownloadButton: () => helpers.getDiagramDownloadButton(page),
			getDiagramViewButton: () => helpers.getDiagramViewButton(page),
			getListViewButton: () => helpers.getListViewButton(page),
			getDiagramRegion: () => helpers.getDiagramRegion(page),
			getFullscreenButton: () => helpers.getFullscreenButton(page),
			getExitFullscreenButton: () => helpers.getExitFullscreenButton(page),
			getBodyOverflow: () => helpers.getBodyOverflow(page),
			getPriorityCoursesSection: () => helpers.getPriorityCoursesSection(page),
			getPriorityCoursesTable: () => helpers.getPriorityCoursesTable(page)
		});
	}
});

export { expect } from '@playwright/test';
