export const courseAttributes = {
	transversal: 'transversal',
	workshop: 'workshop',
	integrative: 'integrative',
	mandatoryFinalExam: 'mandatoryFinalExam',
	contraSemester: 'contraSemester'
} as const;

export type CourseAttribute = (typeof courseAttributes)[keyof typeof courseAttributes];

export const courseAttributeLabels = {
	[courseAttributes.transversal]: 'Transversal',
	[courseAttributes.workshop]: 'Taller',
	[courseAttributes.integrative]: 'Integradora',
	[courseAttributes.mandatoryFinalExam]: 'Final Obligatorio',
	[courseAttributes.contraSemester]: 'Contra Cuatrimestral'
} as const;

export const isTransversal = (attributes: CourseAttribute[]): boolean =>
	attributes.includes(courseAttributes.transversal);
