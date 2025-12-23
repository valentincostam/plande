import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// CICLO INICIAL - Primer Año
	{
		id: 101,
		code: '01-01',
		name: 'Taller de Diseño Gráfico 1',
		hours: 8,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 102,
		code: '01-02',
		name: 'Medios Expresivos',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 103,
		code: '01-03',
		name: 'Tipografía 1',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 104,
		code: '01-04',
		name: 'Historia del Diseño',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 105,
		code: '01-05',
		name: 'Semiótica y Cultura Visual',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 106,
		code: '01-06',
		name: 'Taller de Escritura',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 107,
		code: '01-07',
		name: 'Morfología 1',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 108,
		code: '01-08',
		name: 'Historia del Diseño Gráfico',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 104,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 109,
		code: '01-09',
		name: 'Comunicación',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 105,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// CICLO MEDIO - Segundo Año
	{
		id: 210,
		code: '02-10',
		name: 'Taller de Diseño Gráfico 2',
		hours: 8,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 101,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 211,
		code: '02-11',
		name: 'Morfología 2',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 212,
		code: '02-12',
		name: 'Tipografía 2',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 103,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 213,
		code: '02-13',
		name: 'Tecnología',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 214,
		code: '02-14',
		name: 'Escenarios Contemporáneos de la Comunicación',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 105,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 2,
				requiredCourseId: 109,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 215,
		code: '02-15',
		name: 'Ciudadanía y Diversidad Cultural y Derechos Humanos',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// CICLO MEDIO - Tercer Año
	{
		id: 316,
		code: '03-16',
		name: 'Taller de Diseño Gráfico 3',
		hours: 8,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 210,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 317,
		code: '03-17',
		name: 'Laboratorio de gráfica, sonido y movimiento',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 213,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 318,
		code: '03-18',
		name: 'Tipografía 3',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 212,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 319,
		code: '03-19',
		name: 'Tecnología, Diseño y Sociedad',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 320,
		code: '03-20',
		name: 'Extensión, territorio y organizaciones',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 321,
		code: '03-21',
		name: 'Gestión empresarial y mercadotecnia',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 322,
		code: '03-22',
		name: 'Legislación y práctica profesional',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 323,
		code: '03-23',
		name: 'Espacio Curricular Optativo 1',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 324,
		code: '03-24',
		name: 'Espacio Curricular Optativo 2',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 325,
		code: '03-25',
		name: 'Práctica Social Educativa',
		hours: 2,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 326,
		code: '03-26',
		name: 'Práctica Profesional Supervisada',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},

	// CICLO AVANZADO - Cuarto Año
	{
		id: 427,
		code: '04-27',
		name: 'Taller de Proyecto Final',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 2,
				requiredCourseId: 108,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 211,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 214,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 215,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 316,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 317,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 318,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 319,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 320,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 321,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 322,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 14,
				requiredCourseId: 324,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 428,
		code: '04-28',
		name: 'Diseño Estratégico y Sustentable',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 316,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 429,
		code: '04-29',
		name: 'Teoría y Crítica del Diseño',
		hours: 2,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 2,
				requiredCourseId: 108,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 214,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 430,
		code: '04-30',
		name: 'Laboratorio de multiplataformas y Transmedia',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 317,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 431,
		code: '04-31',
		name: 'Diseño Editorial',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 316,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 2,
				requiredCourseId: 318,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 432,
		code: '04-32',
		name: 'Metodología de la Investigación en Diseño',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 433,
		code: '04-33',
		name: 'Espacio Curricular Optativo 3',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 434,
		code: '04-34',
		name: 'Espacio Curricular Optativo 4',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	}
];

export const unrFapydLdg: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Diseño Gráfico',
	degreeSlug: 'LDG',
	durationYears: 4,
	universityName: 'Universidad Nacional de Rosario',
	universitySlug: 'UNR',
	collegeName: 'Facultad de Arquitectura, Planeamiento y Diseño',
	collegeSlug: 'FAPyD',
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://fapyd.unr.edu.ar/wp-content/uploads/2022/05/220304_LDG_PLAN_DE_ESTUDIOS.pdf'
		}
	],
	notes: []
};
