import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// AÑO 1 (según distribución FRBA)
	// ═══════════════════════════════════════════════════════════════════════════

	// Materias anuales de Año 1
	{
		id: 1,
		code: '1',
		name: 'Análisis Matemático I',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Álgebra y Geometría Analítica',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '3',
		name: 'Matemática Discreta',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Sistemas y Organizaciones',
		hours: 3,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Algoritmos y Estructura de Datos',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Arquitectura de Computadoras',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// Química - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 9,
		code: '9',
		name: 'Química',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// Ingeniería y Sociedad - 2do Cuatrimestre (2hs anual = 4hs semanal)
	{
		id: 22,
		code: '22',
		name: 'Ingeniería y Sociedad',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// AÑO 2 (según distribución FRBA)
	// ═══════════════════════════════════════════════════════════════════════════

	// Materias anuales de Año 2
	{
		id: 7,
		code: '7',
		name: 'Física I',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 10,
		code: '10',
		name: 'Análisis Matemático II',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Cursadas para cursar: 1, 2
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 1, 2
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '12',
		name: 'Análisis de Sistemas',
		hours: 6,
		term: courseTerms.annual,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			// Cursadas para cursar: 4, 5
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 4, 5
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: '13',
		name: 'Sintaxis y Semántica de los Lenguajes',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Cursadas para cursar: 3, 5
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 3, 5
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '14',
		name: 'Paradigmas de Programación',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Cursadas para cursar: 3, 5
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 3, 5
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Sistemas de Representación',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// Inglés I - 1er Cuatrimestre (2hs anual = 4hs semanal)
	{
		id: 8,
		code: '8',
		name: 'Inglés I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// Probabilidad y Estadística - 2do Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 17,
		code: '17',
		name: 'Probabilidad y Estadística',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Cursadas para cursar: 1, 2
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 1, 2
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// AÑO 3 (según distribución FRBA)
	// ═══════════════════════════════════════════════════════════════════════════

	// Diseño de Sistemas - Anual
	{
		id: 18,
		code: '18',
		name: 'Diseño de Sistemas',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			// Cursadas para cursar: 12, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 3, 4, 5
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 14
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Sistemas Operativos - 1er Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 15,
		code: '15',
		name: 'Sistemas Operativos',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 3, 5, 6
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 3, 5, 6
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Física II - 1er Cuatrimestre (5hs anual = 10hs semanal)
	{
		id: 11,
		code: '11',
		name: 'Física II',
		hours: 10,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 1, 7
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 1, 7
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Economía - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 23,
		code: '23',
		name: 'Economía',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 12
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 4, 5
			{
				id: 2,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Gestión de Datos - 2do Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 21,
		code: '21',
		name: 'Gestión de Datos',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 3, 4, 5
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Inglés II - 2do Cuatrimestre (2hs anual = 4hs semanal)
	{
		id: 24,
		code: '24',
		name: 'Inglés II',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Aprobadas para cursar: 8
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Matemática Superior - 2do Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 20,
		code: '20',
		name: 'Matemática Superior',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 10
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 1, 2
			{
				id: 2,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 10
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Legislación - 2do Cuatrimestre (2hs anual = 4hs semanal)
	{
		id: 31,
		code: '31',
		name: 'Legislación',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Cursadas para cursar: 12, 22
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 4, 5
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 22
			{
				id: 5,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// AÑO 4 (según distribución FRBA)
	// ═══════════════════════════════════════════════════════════════════════════

	// Administración de Recursos - Anual
	{
		id: 26,
		code: '26',
		name: 'Administración de Recursos',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			// Cursadas para cursar: 15, 18, 23
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 6, 8, 12, 14
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 15, 18, 23
			{
				id: 8,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Ingeniería de Software - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 29,
		code: '29',
		name: 'Ingeniería de Software',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 17, 18, 21
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 17, 18, 21
			{
				id: 7,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Teoría de Control - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 30,
		code: '30',
		name: 'Teoría de Control',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 9, 20
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 10, 11
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 9, 20
			{
				id: 5,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Comunicaciones - 1er Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 19,
		code: '19',
		name: 'Comunicaciones',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 6, 10, 11
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 1, 2, 7
			{
				id: 4,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 6, 10, 11
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Redes de Información - 2do Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 25,
		code: '25',
		name: 'Redes de Información',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 15, 19
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 3, 5, 6, 10, 11
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 15, 19
			{
				id: 8,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Investigación Operativa - 2do Cuatrimestre (5hs anual = 10hs semanal)
	{
		id: 27,
		code: '27',
		name: 'Investigación Operativa',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 17, 20
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 10
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 17, 20
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Simulación - 2do Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 28,
		code: '28',
		name: 'Simulación',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Cursadas para cursar: 17, 20
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 10
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 17, 20
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// AÑO 5 (según distribución FRBA)
	// ═══════════════════════════════════════════════════════════════════════════

	// Proyecto Final - Anual
	{
		id: 32,
		code: '32',
		name: 'Proyecto Final',
		hours: 6,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			// Cursadas para cursar: 25, 26, 29, 31
			{
				id: 1,
				requiredCourseId: 25,
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
			},
			{
				id: 4,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 15, 16, 17, 18, 19, 21, 22, 23, 24
			{
				id: 5,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: materias obligatorias (sin redundancias)
			// Se omiten requerimientos redundantes que ya están implícitos en la cadena de correlatividades
			// Por ejemplo, Análisis Matemático I (1) no se exige porque ya es requisito para aprobar Análisis Matemático II (10)
			{
				id: 29,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 37,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 38,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 39,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 40,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 41,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 42,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 43,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 44,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Inteligencia Artificial - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 33,
		code: '33',
		name: 'Inteligencia Artificial',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Cursadas para cursar: 27, 28
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 17, 18, 20
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 27, 28
			{
				id: 6,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Administración Gerencial - 1er Cuatrimestre (3hs anual = 6hs semanal)
	{
		id: 34,
		code: '34',
		name: 'Administración Gerencial',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Cursadas para cursar: 26, 27
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 15, 17, 18, 20, 23
			{
				id: 3,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 26, 27
			{
				id: 8,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Sistemas de Gestión - 1er Cuatrimestre (4hs anual = 8hs semanal)
	{
		id: 35,
		code: '35',
		name: 'Sistemas de Gestión',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Cursadas para cursar: 26, 27, 28
			{
				id: 1,
				requiredCourseId: 26,
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
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 15, 17, 18, 20, 23
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 26, 27, 28
			{
				id: 9,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// ELECTIVAS - AÑO 3
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 200,
		name: 'Gestión del Talento Humano',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 201,
		name: 'Metodología de la Investigación Científico – Tecnológica',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 202,
		code: '082031',
		name: 'Ciberseguridad',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 203,
		code: '082065',
		name: 'Técnicas Avanzadas de Programación',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 204,
		code: '082066',
		name: 'Técnicas de Gráficos por Computadoras',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 205,
		code: '082075',
		name: 'Metodología de la Conducción de Equipos de Trabajo',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 206,
		name: 'Creatividad e Innovación',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 207,
		name: 'Procesamiento Lenguaje Natural',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 208,
		name: 'Tendencias y Escenarios Tecnológicos',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 209,
		name: 'Patrones Algorítmicos para Estructuras Avanzadas',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 210,
		name: 'Ingeniería de Requisitos',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 211,
		name: 'Transformación Digital',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 213,
		name: 'Experiencia de Usuario y Accesibilidad',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 12, 13, 14
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// ELECTIVAS - AÑO 4
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 214,
		code: '082073',
		name: 'Tecnologías Avanzadas en la Construcción de Software',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 18, 15, 21
			{
				id: 1,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12, // Análisis de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13, // Sintaxis y Semántica de los Lenguajes
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 14, // Paradigmas de Programación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 18, 15, 21
			{
				id: 7,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 215,
		name: 'Administración Estratégica del Capital Humano',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 18, 15, 21
			{
				id: 1,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12, // Análisis de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13, // Sintaxis y Semántica de los Lenguajes
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 14, // Paradigmas de Programación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 18, 15, 21
			{
				id: 7,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 216,
		name: 'Criptografía',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 18, 15, 21
			{
				id: 1,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12, // Análisis de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13, // Sintaxis y Semántica de los Lenguajes
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 14, // Paradigmas de Programación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 18, 15, 21
			{
				id: 7,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 217,
		code: '082074',
		name: 'Gerenciamiento de Proyectos de Sistemas de Información',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 18, 15, 21
			{
				id: 1,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 12, 13, 14
			{
				id: 4,
				requiredCourseId: 12, // Análisis de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13, // Sintaxis y Semántica de los Lenguajes
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 14, // Paradigmas de Programación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 18, 15, 21
			{
				id: 7,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// ELECTIVAS - AÑO 5
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 218,
		code: '082045',
		name: 'Bioinformática',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 219,
		name: 'Ciberseguridad Industrial',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 220,
		code: '082011',
		name: 'Ciudades Digitales y Gobierno Electrónico',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 221,
		code: '082010',
		name: 'Desarrollo de Aplicaciones para Dispositivos Móviles',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 222,
		name: 'Dirección Estratégica',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 223,
		name: 'Gestión de Empresas Digitales',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 224,
		name: 'Gestión de la Transformación Organizacional',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 225,
		name: 'Arquitecturas de Software Concurrente',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 226,
		name: 'Base de Datos NoSQL',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 227,
		name: 'Plataformas de Virtualización',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 228,
		code: '082017',
		name: 'Inteligencia Artificial Avanzada',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 229,
		name: 'Inteligencia de Negocios',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 230,
		name: 'Sistemas Avanzados de Telecomunicaciones',
		hours: 4,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: []
	},
	{
		id: 231,
		name: 'Economía del Conocimiento',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 232,
		code: '082084',
		name: 'Modelos Organizacionales',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 233,
		code: '082085',
		name: 'Pericias Informáticas',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 234,
		name: 'Procesamiento de Imágenes y Señales',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 235,
		code: '082016',
		name: 'Seguridad en Aplicaciones Web',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 236,
		code: '082088',
		name: 'Sistemas de Costos y Presupuestos',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 237,
		code: '082014',
		name: 'Tecnologías Aplicadas a Soluciones de Datos',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 238,
		code: '082091',
		name: 'Tecnología Avanzada en Redes',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 239,
		code: '082081',
		name: 'Marcos de Referencia de Calidad en TI',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 240,
		code: '082078',
		name: 'Gestión Comercial de Soluciones de Tecnologías de la Información',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 241,
		name: 'Desarrollo de Modelos Analíticos (Machine Learning)',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 242,
		name: 'Neurociencia Aplicada',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			// Cursadas para cursar: 25, 26, 28, 29
			{
				id: 1,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para cursar: 18, 15, 21
			{
				id: 5,
				requiredCourseId: 18, // Diseño de Sistemas
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15, // Sistemas Operativos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21, // Gestión de Datos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Aprobadas para rendir: 25, 26, 28, 29
			{
				id: 8,
				requiredCourseId: 25, // Redes de Información
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26, // Administración de Recursos
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28, // Simulación
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 29, // Ingeniería de Software
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const utnFrbaIsi2008: StudyPlan = {
	courses,
	degreeName: 'Ingeniería en Sistemas de Información',
	degreeSlug: 'ISI',
	universityName: 'Universidad Tecnológica Nacional',
	universitySlug: 'UTN',
	collegeName: 'Facultad Regional Buenos Aires',
	collegeSlug: 'FRBA',
	durationYears: 5,
	year: 2008,
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 44
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios (Web)',
			url: 'https://frba.utn.edu.ar/sistemas/plan-de-estudios/'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1150 - Diseño Curricular (PDF)',
			url: 'https://www.frba.utn.edu.ar/wp-content/uploads/2022/01/1150.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: 'El plan de estudios 2008 (K08) está vigente **hasta 2028 para ingresantes hasta 2022**. A partir de 2023 rige el plan de estudios 2023 (K23).'
		},
		{
			id: 2,
			text: 'Se requieren **44 horas de materias electivas** (de cursado cuatrimestral) para egresarse.'
		},
		{
			id: 3,
			text: 'La carrera incluye una **Práctica Profesional Supervisada** de 200 horas reloj como requisito para egresarse.'
		},
		{
			id: 4,
			text: 'Para rendir el **Proyecto Final** se requiere tener aprobadas **todas** las materias obligatorias.'
		},
		{
			id: 5,
			text: 'Se omiten requisitos redundantes en **Proyecto Final**. Por ejemplo, **Análisis Matemático I** de 1<sup>er</sup> año no se exige explícitamente para rendir porque ya es requisito para aprobar **Análisis Matemático II** de 2<sup>do</sup> año, que sí se requiere aprobada. De esta manera, si se cumple con los requisitos directos (como aprobar Análisis Matemático II), automáticamente se cumple con los requisitos indirectos (como aprobar Análisis Matemático I).'
		}
	]
};
