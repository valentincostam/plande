import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// Year 1
	{
		id: 437101,
		code: '101',
		name: 'Análisis Matemático I',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437102,
		code: '102',
		name: 'Física I',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437103,
		code: '103',
		name: 'Derechos Humanos y Tecnología',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437104,
		code: '104',
		name: 'Fundamentos de Informática',
		hours: 2,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437105,
		code: '105',
		name: 'Fundamentos de Programación',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437106,
		code: '106',
		name: 'Álgebra',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437107,
		code: '107',
		name: 'Sistemas de Representación',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437108,
		code: '108',
		name: 'Química',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 437109,
		code: '109',
		name: 'Metodologías de Programación',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437105,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437110,
		code: '110',
		name: 'Inglés I',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	// Year 2
	{
		id: 437211,
		code: '211',
		name: 'Análisis Matemático II',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437212,
		code: '212',
		name: 'Física II',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437213,
		code: '213',
		name: 'Sistemas Digitales',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437214,
		code: '214',
		name: 'Inglés II',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437110,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437215,
		code: '215',
		name: 'Arquitectura de Computadoras',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437216,
		code: '216',
		name: 'Electrónica Básica',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437108,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437217,
		code: '217',
		name: 'Teoría de Circuitos',
		hours: 5,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437218,
		code: '218',
		name: 'Microprocesadores y Microcontroladores',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437213,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437219,
		code: '219',
		name: 'Instrumentos y Mediciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437220,
		code: '220',
		name: 'Probabilidades y Procesos Aleatorios',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	// Year 3
	{
		id: 437321,
		code: '321',
		name: 'Cálculo Superior',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437322,
		code: '322',
		name: 'Campos y Ondas',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437323,
		code: '323',
		name: 'Análisis de Circuitos',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437217,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437324,
		code: '324',
		name: 'Sistemas Operativos',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437109,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437215,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437325,
		code: '325',
		name: 'Electrónica de Comunicaciones',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437216,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437326,
		code: '326',
		name: 'Señales y Sistemas',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437321,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437327,
		code: '327',
		name: 'Transmisión y Propagación de Ondas',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437322,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437328,
		code: '328',
		name: 'Instrumentos y Mediciones en Telecomunicaciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437219,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437329,
		code: '329',
		name: 'Bases de Datos',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437109,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437215,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437330,
		code: '330',
		name: 'Teoría de la Comunicación',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437220,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	// Year 4
	{
		id: 437431,
		code: '431',
		name: 'Procesamiento de Señales',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437326,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437432,
		code: '432',
		name: 'Ingeniería del Software',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437109,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437219,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437433,
		code: '433',
		name: 'Sistemas de Sonido e Imagen',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437322,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437325,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437434,
		code: '434',
		name: 'Comunicaciones Ópticas y Satelitales',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437322,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437325,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437435,
		code: '435',
		name: 'Ingeniería Legal',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437436,
		code: '436',
		name: 'Comunicaciones Móviles',
		hours: 5,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437327,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437330,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437437,
		code: '437',
		name: 'Telecomunicaciones y Redes',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437327,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437330,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437438,
		code: '438',
		name: 'Redes de Datos',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437219,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437327,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 437330,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437439,
		code: '439',
		name: 'Diseño de Sistemas Digitales',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437109,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437218,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437440,
		code: '440',
		name: 'Optativa I',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	// Year 5
	{
		id: 437541,
		code: '541',
		name: 'Laboratorio de Interconexión de Redes',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437438,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437542,
		code: '542',
		name: 'Desarrollo de Aplicaciones Distribuidas',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437329,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437432,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437543,
		code: '543',
		name: 'Servicios de Telecomunicaciones y Redes',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437437,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437438,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437544,
		code: '544',
		name: 'Higiene, Seguridad y Medioambiente',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437435,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437545,
		code: '545',
		name: 'Proyecto Final',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Prerequisites: 431 a 440 (all year 4 courses)
			{
				id: 1,
				requiredCourseId: 437431,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437432,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 437433,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 437434,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 437435,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 437436,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 437437,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 437438,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 437439,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 437440,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437546,
		code: '546',
		name: 'Economía y Mercados Tecnológicos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437435,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437547,
		code: '547',
		name: 'Metodología de la Investigación',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437433,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 437434,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 437436,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 437437,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 437438,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437548,
		code: '548',
		name: 'Diseño de Redes y Sistemas de Telecomunicaciones',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437431,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437434,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 437436,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 437437,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 437438,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 437439,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437549,
		code: '549',
		name: 'Administración y Gestión de Organizaciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 437435,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 437550,
		code: '550',
		name: 'Optativa II',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: []
	},
	{
		id: 437599,
		code: 'PPS',
		name: 'Práctica Profesional Supervisada',
		hours: 12.5,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			// Prerequisites: 4º año aprobado (all year 4 courses passed)
			{
				id: 1,
				requiredCourseId: 437431,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 437432,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 437433,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 437434,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 437435,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 437436,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 437437,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 437438,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 437439,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 437440,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const uaderFcytIt: StudyPlan = {
	courses,
	degreeName: 'Ingeniería en Telecomunicaciones',
	degreeSlug: 'IT',
	durationYears: 5,
	universityName: 'Universidad Autónoma de Entre Ríos',
	universitySlug: 'UADER',
	collegeName: 'Facultad de Ciencia y Tecnología',
	collegeSlug: 'FCyT',
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://fcytcdelu.uader.edu.ar/telecomunicaciones'
		}
	],
	notes: [
		{
			id: 1,
			text: `Las materias optativas de 4<sup>to</sup> año son:
        \n - **Sistemas de Posicionamiento Global**
        \n - **Sistemas RADAR**
      `
		},
		{
			id: 2,
			text: `Las materias optativas de 5<sup>to</sup> año son:
        \n - **Redes Inalámbricas**
        \n - **Seguridad en Redes**
      `
		},

		{
			id: 3,
			text: 'En la materia **Teoría de Circuitos** de 2<sup>do</sup> año, se omite el requerimiento de **Análisis Matemático I** de 1<sup>er</sup> año _regular_ porque ya es requerido por **Física II** de 2<sup>do</sup> año, que también es requerido por **Teoría de Circuitos**.'
		}
	]
};
