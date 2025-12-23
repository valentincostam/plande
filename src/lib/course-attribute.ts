export const courseAttributes = {
	transversal: 'transversal',
	integrative: 'integrative',
	mandatoryFinalExam: 'mandatoryFinalExam',
	contraSemester: 'contraSemester'
} as const;

export type CourseAttribute = (typeof courseAttributes)[keyof typeof courseAttributes];

export const courseAttributeLabels = {
	[courseAttributes.transversal]: 'Transversal',
	[courseAttributes.integrative]: 'Integradora',
	[courseAttributes.mandatoryFinalExam]: 'Final Obligatorio',
	[courseAttributes.contraSemester]: 'Contra Cuatrimestral'
} as const;

export const isTransversal = (attributes: CourseAttribute[]): boolean =>
	attributes.includes(courseAttributes.transversal);
