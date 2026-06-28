import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
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
		name: 'Física I',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Inglés I',
		hours: 2,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Lógica y Estructuras Discretas',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Algoritmos y Estructuras de Datos',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Arquitectura de Computadoras',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
		requirements: []
	},
	{
		id: 8,
		code: '8',
		name: 'Sistemas y Procesos de Negocios',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: []
	},
	{
		id: 9,
		code: '9',
		name: 'Análisis Matemático II',
		hours: 5,
		term: courseTerms.annual,
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
		term: courseTerms.annual,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 11,
		code: '11',
		name: 'Ingeniería y Sociedad',
		hours: 2,
		term: courseTerms.secondSemester,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
		requirements: []
	},
	{
		id: 12,
		code: '12',
		name: 'Inglés II',
		hours: 2,
		term: courseTerms.annual,
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
		id: 13,
		code: '13',
		name: 'Sintaxis y Semántica de los Lenguajes',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.secondSemester,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.annual,
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
		term: courseTerms.firstSemester,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		id: 18,
		code: '18',
		name: 'Economía',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.firstSemester,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.firstSemester,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
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
		id: 22,
		code: '22',
		name: 'Análisis Numérico',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
	{
		id: 24,
		code: '24',
		name: 'Legislación',
		hours: 2,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		id: 26,
		code: '26',
		name: 'Redes de Datos',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
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
		id: 27,
		code: '27',
		name: 'Investigación Operativa',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
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
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
	{
		id: 31,
		code: '31',
		name: 'Inteligencia Artificial',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
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
		id: 32,
		code: '32',
		name: 'Ciencia de Datos',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		id: 33,
		code: '33',
		name: 'Sistemas de Gestión',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
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
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.contraSemester],
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
		id: 91,
		code: '91',
		name: 'Backend de Aplicaciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
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
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 92,
		code: '92',
		name: 'Green Soft',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 93,
		code: '93',
		name: 'Gestión Industrial de la Producción',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 94,
		code: '94',
		name: 'Gestión de la Mejora de los Procesos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 95,
		code: '95',
		name: 'Desarrollo y Operaciones DevOps',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.elective,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 96,
		code: '96',
		name: 'Desarrollo de Aplicaciones con Objetos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 97,
		code: '97',
		name: 'Comunicación Multimedial en el Desarrollo de Sistemas de Información',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
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
	{
		id: 98,
		code: '98',
		name: 'Arquitectura de Software',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.elective,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 100,
		code: '100',
		name: 'Experiencia e Interfaces de Usuario',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		type: courseTypes.elective,
		requirements: []
	},
	{
		id: 101,
		code: '101',
		name: 'Desarrollo con Tecnologías Blockchain',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 102,
		code: '102',
		name: 'Creatividad e Innovación en Ingeniería',
		hours: 4,
		term: courseTerms.semestral,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 103,
		code: '103',
		name: 'Auditoría de SITI',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 104,
		code: '104',
		name: 'Gerenciamiento Estratégico',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 105,
		code: '105',
		name: 'Consultoría en Negocios Digitales',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 106,
		code: '106',
		name: 'Emprendimientos Tecnológicos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 107,
		code: '107',
		name: 'Decisiones en Escenarios Complejos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 108,
		code: '108',
		name: 'Testing de Software',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 109,
		code: '109',
		name: 'Seguridad en el Desarrollo de Software',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 110,
		code: '110',
		name: 'Integración de Aplicaciones en Entorno Web',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 111,
		code: '111',
		name: 'Ingeniería de Software de Fuentes Abiertas/Libres',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
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
		id: 112,
		code: '112',
		name: 'Creatividad y Desarrollo de Entornos Virtuales',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.elective,
		requirements: []
	},
	{
		id: 113,
		code: '113',
		name: 'Habilidades Blandas',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.elective,
		requirements: []
	},
	{
		id: 99,
		code: '99',
		name: 'Práctica Profesional Supervisada',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const utnFrcIsi2023: StudyPlan = {
	courses,
	degreeName: 'Ingeniería en Sistemas de Información',
	degreeSlug: 'ISI',
	universityName: 'Universidad Tecnológica Nacional',
	universitySlug: 'UTN',
	collegeName: 'Facultad Regional Córdoba',
	collegeSlug: 'FRC',
	durationYears: 5,
	year: 2023,
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 40
	},
	sources: [
		{
			id: 1,
			label: 'Ordenanza N° 1877 - Diseño Curricular',
			url: 'https://www.institucional.frc.utn.edu.ar/sistemas/Download/Reglamentos/2023/1877.pdf'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1878 - Régimen de Correlatividades',
			url: 'https://www.institucional.frc.utn.edu.ar/sistemas/Download/Reglamentos/2023/1878.pdf'
		},
		{
			id: 3,
			label: 'Correlatividades Electivas Plan 2023',
			url: 'https://www.institucional.frc.utn.edu.ar/sistemas/Noticias/3B2_275_correlatividades_electivas_plan_2023.pdf'
		},
		{
			id: 4,
			label: 'Información sobre Electivas Ciclo Lectivo 2025',
			url: 'https://www.institucional.frc.utn.edu.ar/sistemas/Areas/noticias/Detalle.asp?2315'
		},
		{
			id: 5,
			label: 'Régimen de Correlatividades Plan 2023 con Electivas',
			url: 'https://drive.google.com/file/d/15ZBqXbfH-aniEsmB4welWVbuiojkNeml/view'
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
			text: '**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura un año académico).'
		},
		{
			id: 4,
			text: 'Las **materias electivas** disponibles para cada nivel se detallan en la documentación oficial. Consultar las fuentes para ver el listado completo de electivas por nivel.'
		},
		{
			id: 5,
			text: '**¿Qué significa "Contra Cuatrimestral"?** Las materias con modalidad Contra Cuatrimestral se cursan en el cuatrimestre indicado pero también pueden cursarse en el cuatrimestre opuesto. Por ejemplo, una materia que se cursa principalmente en el 1<sup>er</sup> cuatrimestre, también se ofrece en el 2<sup>do</sup> cuatrimestre como opción contra-cuatrimestral.'
		}
	]
};
