import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
	{
		id: 8,
		code: '8',
		name: 'Sistemas y Procesos de Negocios',
		hours: 3,
		term: courseTerms.annual,
		year: 1,
		tag: courseTags.integrative,
		requirements: []
	},
	{
		id: 1,
		code: '1',
		name: 'Álgebra y Geometría Analítica',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Inglés I',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '3',
		name: 'Ingeniería y Sociedad',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Lógica y Estructuras Discretas',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Análisis Matemático I',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Algoritmos y Estructuras de Datos',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Arquitectura de Computadoras',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 14,
		code: '14',
		name: 'Análisis Matemático II',
		hours: 5,
		term: courseTerms.annual,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Análisis de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 2,
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
		],
		tag: courseTags.integrative
	},
	{
		id: 9,
		code: '9',
		name: 'Física I',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 11,
		code: '11',
		name: 'Inglés II',
		hours: 4,
		term: courseTerms.firstSemester,
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
	{
		id: 10,
		code: '10',
		name: 'Sintaxis y Semántica de los Lenguajes',
		hours: 8,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 12,
		code: '12',
		name: 'Paradigmas de Programación',
		hours: 8,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 13,
		code: '13',
		name: 'Sistemas Operativos',
		hours: 8,
		term: courseTerms.secondSemester,
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
		name: 'Análisis Numérico',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 1,
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
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 17,
		code: '17',
		name: 'Física II',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		code: '18',
		name: 'Economía',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Bases de Datos',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
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
		hours: 8,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
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
		hours: 8,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 6,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 22,
		code: '22',
		name: 'Probabilidad y Estadística',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 6,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Metodología de la Investigación',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 24,
		code: '24',
		name: 'Emprendedorismo',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 25,
		code: '25',
		name: 'Diseño de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.integrative
	},
	{
		id: 26,
		code: '26',
		name: 'Legislación',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 27,
		code: '27',
		name: 'Redes de Datos',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
		id: 28,
		code: '28',
		name: 'Simulación',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Relaciones Humanas',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 30,
		code: '30',
		name: 'Ingeniería y Calidad de Software',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
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
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 31,
		code: '31',
		name: 'Tecnologías para la Automatización',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
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
		id: 32,
		code: '32',
		name: 'Sistemas Distribuidos',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 33,
		code: '33',
		name: 'Investigación Operativa',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
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
		id: 34,
		code: '34',
		name: 'Administración de Sistemas de Información',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
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
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.integrative
	},
	{
		id: 35,
		code: '35',
		name: 'Inteligencia Artificial',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 16,
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
		id: 36,
		code: '36',
		name: 'Sistemas de Gestión',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 37,
		code: '37',
		name: 'Auditoría de Sistemas de Información',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 38,
		code: '38',
		name: 'Seguridad en los Sistemas de Información',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 34,
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
		id: 39,
		code: '39',
		name: 'Consolidación de Tecnologías de la Información y las Comunicaciones',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 40,
		code: '40',
		name: 'Ciencia de Datos',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 19,
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
		id: 41,
		code: '41',
		name: 'Gestión Gerencial',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 34,
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
		id: 42,
		code: '42',
		name: 'Gestión Avanzada de Datos',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 43,
		code: '43',
		name: 'Desarrollo de Aplicación Cliente-Servidor',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 44,
		code: '44',
		name: 'Modelado y Optimización de Sistemas',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 45,
		code: '45',
		name: 'Proyecto Final',
		hours: 6,
		term: courseTerms.annual,
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
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 11,
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
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.integrative
	},
	{
		id: 99,
		code: '99',
		name: 'Práctica Profesional Supervisada',
		hours: 6,
		term: courseTerms.annual,
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
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
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
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const utnFrcuIsiData: CareerData = {
	courses,
	degree: 'Ingeniería en Sistemas de Información',
	years: 5,
	college: 'UTN FRCU',
	studyProgram: 'Plan de Estudios 2023',
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 40
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2023',
			url: 'https://www.frcu.utn.edu.ar/images/recursos/Grado/Grado/Nuevos/planestudios2023_ingenieriaensistemasdeinformacion_actualizado04082025.pdf'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1877 - Diseño Curricular',
			url: 'https://www.frcu.utn.edu.ar/images/VidaEducativa/PlanCarrerasIngenieria/8.pdf'
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
			text: '**¿Por qué debo aprobar 40 horas de materias electivas para egresarme?** [Leer explicación detallada](/utn-frcu-isi/electivas).'
		},
		{
			id: 4,
			text: '**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura un año académico).'
		},
		{
			id: 5,
			text: 'En **Proyecto Final** de 5<sup>to</sup> año, se omite el requerimiento de **Sintaxis y Semántica de los Lenguajes** de 2<sup>do</sup> año _aprobada_ porque ya es requerido para cursar **Ingeniería y Calidad de Software** de 4<sup>to</sup> año, que se requiere _regular_ por **Proyecto Final**.'
		}
	]
};
