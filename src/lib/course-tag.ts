export const courseTags = {
	elective: 'elective',
	integrative: 'integrative',
	optative: 'optative'
} as const;

export type CourseTag = (typeof courseTags)[keyof typeof courseTags];

export const courseTagLabels = {
	[courseTags.elective]: 'Electiva',
	[courseTags.integrative]: 'Integradora',
	[courseTags.optative]: 'Optativa'
} as const;
