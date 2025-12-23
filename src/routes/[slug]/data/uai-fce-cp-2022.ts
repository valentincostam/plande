import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// YEAR 1 - PRIMER CUATRIMESTRE
	{
		id: 1,
		code: '01',
		name: 'Administración I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '02',
		name: 'Comercialización',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '03',
		name: 'Contabilidad I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '04',
		name: 'Historia Social y Económica',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '05',
		name: 'Inglés I',
		hours: 2,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// YEAR 1 - SEGUNDO CUATRIMESTRE
	{
		id: 6,
		code: '06',
		name: 'Comercio Internacional',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '07',
		name: 'Principios de Economía',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 8,
		code: '08',
		name: 'Matemática I',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 9,
		code: '09',
		name: 'Administración II',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		code: '10',
		name: 'Informática',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 11,
		code: '11',
		name: 'Inglés II',
		hours: 2,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// YEAR 2 - PRIMER CUATRIMESTRE
	{
		id: 12,
		code: '12',
		name: 'Matemática II',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: '13',
		name: 'Microeconomía',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '14',
		name: 'Contabilidad II',
		hours: 4,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Teoría de las Organizaciones',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Derecho Constitucional y Administrativo',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// YEAR 2 - SEGUNDO CUATRIMESTRE
	{
		id: 17,
		code: '17',
		name: 'Psicología Aplicada',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 18,
		code: '18',
		name: 'Sistemas de Información',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Macroeconomía',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		code: '20',
		name: 'Informática Aplicada',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Problemática del Mundo Actual',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// YEAR 3 - PRIMER CUATRIMESTRE
	{
		id: 22,
		code: '22',
		name: 'Matemática Financiera',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Derecho Civil y Comercial',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '24',
		name: 'Estadística',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		code: '25',
		name: 'Costos I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Estructura y Política Económica Argentina',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},

	// YEAR 3 - SEGUNDO CUATRIMESTRE
	{
		id: 27,
		code: '27',
		name: 'Administración Financiera',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		code: '28',
		name: 'Sociedades',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Análisis de Estados Contables',
		hours: 5,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		code: '30',
		name: 'Seminario en Administración Contable: Taller de Integración',
		hours: 5,
		term: courseTerms.secondSemester,
		year: 3,
		type: courseTypes.mandatory, attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 31,
		code: '31',
		name: 'Costos II',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// YEAR 4 - PRIMER CUATRIMESTRE
	{
		id: 32,
		code: '32',
		name: 'Derecho Laboral y Previsional',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 33,
		code: '33',
		name: 'Evaluación de Proyectos',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 34,
		code: '34',
		name: 'Auditoría',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 35,
		code: '35',
		name: 'Finanzas Públicas y Derecho Tributario',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 36,
		code: '36',
		name: 'Metodología de la Investigación',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// YEAR 4 - SEGUNDO CUATRIMESTRE
	{
		id: 37,
		code: '37',
		name: 'Concursos y Quiebras',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 38,
		code: '38',
		name: 'Impuesto a las Rentas y Patrimonio',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 35,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 39,
		code: '39',
		name: 'Impuesto sobre los Consumos y Procedimiento Tributario',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 35,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 40,
		code: '40',
		name: 'Técnicas Cuantitativas',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 41,
		code: '41',
		name: 'Taller de Trabajo Final',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 36,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 36,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// YEAR 5 - PRIMER CUATRIMESTRE
	{
		id: 42,
		code: '42',
		name: 'Práctica Profesional Impositiva',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 38,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 39,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 38,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 39,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 43,
		code: '43',
		name: 'Práctica Profesional Administrativo-Contable',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 44,
		code: '44',
		name: 'Práctica Profesional Jurídica-Contable',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 37,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 37,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 45,
		code: '45',
		name: 'Práctica Profesional Supervisada',
		hours: 6.25,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Regular para cursar (solo no-redundantes)
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 15,
				requiredCourseId: 35,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 36,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir (solo no-redundantes)
			{
				id: 17,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 18,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 20,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 22,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 24,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 25,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 26,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 27,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 28,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 29,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 30,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 31,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 32,
				requiredCourseId: 36,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 46,
		code: '46',
		name: 'Trabajo Final',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Regular para cursar (solo no-redundantes)
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 40,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 41,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 42,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 15,
				requiredCourseId: 43,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 44,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir (solo no-redundantes)
			{
				id: 17,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 18,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 20,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 22,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 24,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 25,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 26,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 27,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 28,
				requiredCourseId: 40,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 29,
				requiredCourseId: 41,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 30,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 31,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 32,
				requiredCourseId: 44,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 47,
		code: '47',
		name: 'Experiencias Formativas Obligatorias de Carácter Electivo',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	}
];

export const uaiFceCp2022: StudyPlan = {
	courses,
	degreeName: 'Contador Público',
	degreeSlug: 'CP',
	universityName: 'Universidad Abierta Interamericana',
	universitySlug: 'UAI',
	collegeName: 'Facultad de Ciencias Económicas',
	collegeSlug: 'FCE',
	durationYears: 5,
	year: 2022,
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://uai.edu.ar/facultades/ciencias-económicas/contador-público/plandeestudios/'
		}
	],
	notes: [
		{
			id: 1,
			text: 'La carga horaria semanal de las materias es obtenida dividiendo la carga horaria total de la materia entre las 16 semanas que dura un cuatrimestre.'
		},
		{
			id: 2,
			text: 'Se omiten requisitos redundantes. Por ejemplo, **Administración I** de 1<sup>er</sup> año no se exige para cursar **Práctica Profesional Supervisada** de 5<sup>to</sup> año porque ya es requisito para cursar **Administración II** de 1<sup>er</sup> año, que también es necesaria para cursar **Práctica Profesional Supervisada**.'
		}
	],
	progress: {
		type: 'mandatory-only'
	}
};
