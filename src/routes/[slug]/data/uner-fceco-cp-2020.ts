import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// PRIMER AÑO - PRIMER CUATRIMESTRE
	{
		id: 1,
		code: '1.01',
		name: 'Introducción a la Contabilidad',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '1.02',
		name: 'Introducción a la Economía',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '1.03',
		name: 'Instituciones del Derecho I',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '1.04',
		name: 'Filosofía y Conocimiento Científico',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// PRIMER AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 5,
		code: '1.05',
		name: 'Álgebra Aplicada a las Ciencias Económicas',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '1.06',
		name: 'Administración General',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '1.07',
		name: 'Contabilidad I',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 8,
		code: '1.08',
		name: 'Historia Económica y Social',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// SEGUNDO AÑO - PRIMER CUATRIMESTRE
	{
		id: 9,
		code: '2.01',
		name: 'Cálculo Aplicado a las Ciencias Económicas',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 10,
		code: '2.02',
		name: 'Sistemas y Tecnologías',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 11,
		code: '2.03',
		name: 'Instituciones del Derecho II',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 12,
		code: '2.04',
		name: 'Microeconomía',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// SEGUNDO AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 13,
		code: '2.05',
		name: 'Metodología de la Investigación',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 14,
		code: '2.06',
		name: 'Sociedades y Asociaciones',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		code: '2.07',
		name: 'Macroeconomía',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 16,
		code: '2.08',
		name: 'Contabilidad II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// TERCER AÑO - PRIMER CUATRIMESTRE
	{
		id: 17,
		code: '3.01',
		name: 'Estadística',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		code: '3.02',
		name: 'Finanzas Públicas',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 19,
		code: '3.03',
		name: 'Espacio Curricular Flexible I',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 20,
		code: '3.04',
		name: 'Contabilidad III',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// TERCER AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 21,
		code: '3.05',
		name: 'Sistemas de Costos',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 22,
		code: '3.06',
		name: 'Impuestos I',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 23,
		code: '3.07',
		name: 'Cálculo Financiero y Actuarial',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 24,
		code: '3.08',
		name: 'Derecho del Trabajo y la Seguridad Social',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// CUARTO AÑO - PRIMER CUATRIMESTRE
	{
		id: 25,
		code: '4.01',
		name: 'Contabilidad IV',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 26,
		code: '4.02',
		name: 'Concursos',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 27,
		code: '4.03',
		name: 'Costos para la Gestión',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 28,
		code: '4.04',
		name: 'Impuestos II',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// CUARTO AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 29,
		code: '4.05',
		name: 'Auditoría',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 30,
		code: '4.06',
		name: 'Impuestos III',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 31,
		code: '4.07',
		name: 'Gestión del Talento Humano y los Recursos Productivos',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 32,
		code: '4.08',
		name: 'Contabilidad Pública',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// QUINTO AÑO - PRIMER CUATRIMESTRE
	{
		id: 33,
		code: '5.01',
		name: 'Administración Financiera',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 34,
		code: '5.02',
		name: 'Contabilidad V',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 35,
		code: '5.03',
		name: 'Taller de Práctica Profesional de Aplicación Jurídica',
		hours: 4.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 36,
		code: '5.04',
		name: 'Espacio Curricular Flexible II',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// QUINTO AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 37,
		code: '5.05',
		name: 'Taller de Práctica Profesional de Aplicación Administrativo-Contable',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 38,
		code: '5.06',
		name: 'Espacio Curricular Flexible III',
		hours: 4.5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 3° completo = all courses from year 3 (courses 17-24)
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 39,
		code: '5.07',
		name: 'Espacio Curricular Flexible IV',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 3° completo = all courses from year 3 (courses 17-24)
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 40,
		code: '5.08',
		name: 'Práctica Profesional Supervisada',
		hours: 7.14,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 3° completo = all courses from year 3 (courses 17-24)
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const unerFcecoCP2020: StudyPlan = {
	courses,
	degreeName: 'Contador Público',
	degreeSlug: 'CP',
	universityName: 'Universidad Nacional de Entre Ríos',
	universitySlug: 'UNER',
	collegeName: 'Facultad de Ciencias Económicas',
	collegeSlug: 'FCEco',
	durationYears: 5,
	year: 2020,
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2020 (PDF)',
			url: 'https://drive.google.com/file/d/1oXLBYCMpBIxEtgAlLH7cRMffsP4rjS9O/view'
		},
		{
			id: 2,
			label: 'Contador Público - FCEco UNER',
			url: 'https://www.fceco.uner.edu.ar/contador-publico'
		}
	],
	notes: [
		{
			id: 1,
			text: `Materias de los espacios flexibles:
        \n - **Espacio Flexible I:** Comercialización
        \n - **Espacio Flexible II:** Comercio Exterior, Proyectos de Inversión, Economía Regional y Argentina, Comunicación Integral, Práctica Profesional en Derecho Laboral y de la Seguridad Social
        \n - **Espacio Flexible III:** Sistema de Información Gerencial
        \n - **Espacio Flexible IV:** Análisis del Sistema Financiero
      `
		},
		{
			id: 2,
			text: 'Se omiten requisitos redundantes. Por ejemplo, **Contabilidad III** de 3<sup>er</sup> año no se exige para cursar **Auditoría** de 4<sup>to</sup> año porque ya es requisito para cursar **Contabilidad IV** de 4<sup>to</sup> año, que también es necesaria para cursar **Auditoría**.'
		}
	],
	progress: {
		type: 'mandatory-only'
	}
};
