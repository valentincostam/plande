export const courseTypes = {
	mandatory: 'mandatory',
	elective: 'elective',
	optative: 'optative'
} as const;

export type CourseType = (typeof courseTypes)[keyof typeof courseTypes];

export const courseTypeLabels = {
	[courseTypes.mandatory]: 'Obligatoria',
	[courseTypes.elective]: 'Electiva',
	[courseTypes.optative]: 'Optativa'
} as const;

export const isElectiveOrOptative = (type: CourseType): boolean =>
	type === courseTypes.elective || type === courseTypes.optative;
