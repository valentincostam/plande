import { test as base, type Locator } from '@playwright/test';
import * as helpers from './helpers/study-plan';

type StudyPlanFixture = {
	studyPlan: {
		goto: (slug?: string) => ReturnType<typeof helpers.goto>;
		getCourseSelect: (courseName: string) => Locator;
		getCourseButton: (courseName: string) => Locator;
		getCourseDetailsPanel: (courseName: string) => Promise<Locator>;
		getAvailableCoursesSection: () => Locator;
		getStrictModeToggle: () => Locator;
		setCourseState: (courseName: string, state: string) => Promise<void>;
		getYearSection: (year: number) => Locator;
		getYearBulkSelect: (year: number) => Locator;
		setYearState: (year: number, state: string) => Promise<void>;
	};
};

export const test = base.extend<StudyPlanFixture>({
	studyPlan: async ({ page }, use) => {
		await use({
			goto: (slug?: string) => helpers.goto(page, slug),
			getCourseSelect: (name: string) => helpers.getCourseSelect(page, name),
			getCourseButton: (name: string) => helpers.getCourseButton(page, name),
			getCourseDetailsPanel: (name: string) => helpers.getCourseDetailsPanel(page, name),
			getAvailableCoursesSection: () => helpers.getAvailableCoursesSection(page),
			getStrictModeToggle: () => helpers.getStrictModeToggle(page),
			setCourseState: (name: string, state: string) => helpers.setCourseState(page, name, state),
			getYearSection: (year: number) => helpers.getYearSection(page, year),
			getYearBulkSelect: (year: number) => helpers.getYearBulkSelect(page, year),
			setYearState: (year: number, state: string) => helpers.setYearState(page, year, state)
		});
	}
});

export { expect } from '@playwright/test';
