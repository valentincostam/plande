export const courseTags = {
	elective: 'elective',
	integrative: 'integrative',
	optative: 'optative',
	mandatoryFinalExam: 'mandatoryFinalExam'
} as const;

export type CourseTag = (typeof courseTags)[keyof typeof courseTags];

export const courseTagLabels = {
	[courseTags.elective]: 'Electiva',
	[courseTags.integrative]: 'Integradora',
	[courseTags.optative]: 'Optativa',
	[courseTags.mandatoryFinalExam]: 'Final Obligatorio'
} as const;
