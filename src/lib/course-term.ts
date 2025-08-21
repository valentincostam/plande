export const courseTerms = {
	annual: 'annual',
	firstSemester: 'firstSemester',
	secondSemester: 'secondSemester',
	semestral: 'semestral'
} as const;

export type CourseTerm = (typeof courseTerms)[keyof typeof courseTerms];

export const courseTermLabels = {
	[courseTerms.annual]: 'Anual',
	[courseTerms.firstSemester]: 'Primer cuatrimestre',
	[courseTerms.secondSemester]: 'Segundo cuatrimestre',
	[courseTerms.semestral]: 'Cuatrimestral'
} as const;
