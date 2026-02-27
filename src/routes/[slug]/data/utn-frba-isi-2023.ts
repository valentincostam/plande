import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// Año 1
	{
		id: 1,
		code: '1',
		name: 'Análisis Matemático I',
		hours: 5,
		term: courseTerms.annualOrSemestral,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Álgebra y Geometría Analítica',
		hours: 5,
		term: courseTerms.annualOrSemestral,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 3,
		code: '3',
		name: 'Física I',
		hours: 5,
		term: courseTerms.annualOrSemestral,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Lógica y Estructuras Discretas',
		hours: 3,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Algoritmos y Estructuras de Datos',
		hours: 5,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Arquitectura de Computadoras',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 8,
		code: '8',
		name: 'Sistemas y Procesos de Negocio',
		hours: 3,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 11,
		code: '11',
		name: 'Ingeniería y Sociedad',
		hours: 2,
		term: courseTerms.semestral,
		year: 1,
		type: courseTypes.mandatory,
		requirements: []
	},
	// Año 2
	{
		id: 9,
		code: '9',
		name: 'Análisis Matemático II',
		hours: 5,
		term: courseTerms.annualOrSemestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
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
			}
		]
	},
	{
		id: 10,
		code: '10',
		name: 'Física II',
		hours: 5,
		term: courseTerms.annualOrSemestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 4,
		code: '4',
		name: 'Inglés I',
		hours: 2,
		term: courseTerms.semestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: []
	},
	{
		id: 13,
		code: '13',
		name: 'Sintaxis y Semántica de los Lenguajes',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 14,
		code: '14',
		name: 'Paradigmas de Programación',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Sistemas Operativos',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Análisis de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 17,
		code: '17',
		name: 'Probabilidad y Estadística',
		hours: 3,
		term: courseTerms.annualOrSemestral,
		year: 2,
		type: courseTypes.mandatory,
		requirements: [
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
			}
		]
	},
	// Año 3
	{
		id: 12,
		code: '12',
		name: 'Inglés II',
		hours: 2,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
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
		id: 18,
		code: '18',
		name: 'Economía',
		hours: 3,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Bases de Datos',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 20,
		code: '20',
		name: 'Desarrollo de Software',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Comunicación de Datos',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Redes de Datos',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 22,
		code: '22',
		name: 'Análisis Numérico',
		hours: 3,
		term: courseTerms.semestral,
		year: 3,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
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
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Diseño de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
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
			}
		]
	},
	// Año 4
	{
		id: 24,
		code: '24',
		name: 'Legislación',
		hours: 2,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 25,
		code: '25',
		name: 'Ingeniería y Calidad de Software',
		hours: 3,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
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
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 27,
		code: '27',
		name: 'Investigación Operativa',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 28,
		code: '28',
		name: 'Simulación',
		hours: 3,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Tecnologías para la Automatización',
		hours: 3,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 32,
		code: '32',
		name: 'Ciencia de Datos',
		hours: 3,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 30,
		code: '30',
		name: 'Administración de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	// Año 5
	{
		id: 31,
		code: '31',
		name: 'Inteligencia Artificial',
		hours: 3,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 33,
		code: '33',
		name: 'Sistemas de Gestión',
		hours: 4,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
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
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 34,
		code: '34',
		name: 'Gestión Gerencial',
		hours: 3,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 35,
		code: '35',
		name: 'Seguridad en los Sistemas de Información',
		hours: 3,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.mandatory,
		requirements: [
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 36,
		code: '36',
		name: 'Proyecto Final',
		hours: 6,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
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
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 99,
		code: '99',
		name: 'Práctica Profesional Supervisada',
		hours: 6,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.mandatory,
		requirements: [
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
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	// Electivas
	{
		id: 100,
		code: 'E1',
		name: 'Administración Estratégica del Capital Humano',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 101,
		code: 'E2',
		name: 'Ciberseguridad',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 102,
		code: 'E3',
		name: 'Comunicación Gráfica y Visual',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 103,
		code: 'E4',
		name: 'Creatividad e Innovación',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 104,
		code: 'E5',
		name: 'Criptografía',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 105,
		code: 'E6',
		name: 'Experiencia de Usuario y Accesibilidad',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 106,
		code: 'E7',
		name: 'Gerenciamiento de Proyectos de Sistemas de Información',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 107,
		code: 'E8',
		name: 'Gestión del Talento Humano',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 108,
		code: 'E9',
		name: 'Ingeniería de Requisitos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 109,
		code: 'E10',
		name: 'Metodología de Investigación Científico-Tecnológica',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 110,
		code: 'E11',
		name: 'Metodología de la Conducción de Equipos de Trabajo',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 111,
		code: 'E12',
		name: 'Patrones Algorítmicos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 112,
		code: 'E13',
		name: 'Procesamiento del Lenguaje Natural',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 113,
		code: 'E14',
		name: 'Química Ambiental',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 114,
		code: 'E15',
		name: 'Técnicas Avanzadas de Programación',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 115,
		code: 'E16',
		name: 'Técnicas de Gráficos por Computadora',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 116,
		code: 'E17',
		name: 'Tecnologías Avanzadas en la Construcción de Software',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 117,
		code: 'E18',
		name: 'Tendencias y Escenarios Tecnológicos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	},
	{
		id: 118,
		code: 'E19',
		name: 'Transformación Digital',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
			}
		]
	}
];

export const utnFrbaIsi2023: StudyPlan = {
	courses,
	degreeName: 'Ingeniería en Sistemas de Información',
	degreeSlug: 'ISI',
	universityName: 'Universidad Tecnológica Nacional',
	universitySlug: 'UTN',
	collegeName: 'Facultad Regional Buenos Aires',
	collegeSlug: 'FRBA',
	durationYears: 5,
	year: 2023,
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 40
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2023',
			url: 'https://frba.utn.edu.ar/sistemas/plan-de-estudios-2023/'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1877',
			url: 'https://frba.utn.edu.ar/wp-content/uploads/2022/12/Ordenanza-1877-Plan-ISI2023.pdf'
		},
		{
			id: 3,
			label: 'Correlatividades',
			url: 'https://frba.utn.edu.ar/wp-content/uploads/2023/11/Correlativas-plan-2023.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas del Plan de Estudios.'
		},
		{
			id: 2,
			text: 'Para iniciar y acreditar la **Práctica Profesional Supervisada**, es necesario cumplir con los requisitos para cursar **Proyecto Final**.'
		},
		{
			id: 3,
			text: '**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre ~32 semanas.'
		}
	]
};
