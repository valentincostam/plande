export const courseTags = {
	elective: 'elective',
	integrative: 'integrative'
} as const;

export type CourseTag = (typeof courseTags)[keyof typeof courseTags];

export const courseTagLabels = {
	[courseTags.elective]: 'Electiva',
	[courseTags.integrative]: 'Integradora'
} as const;
