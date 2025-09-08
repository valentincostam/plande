import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
	{
		id: 340101,
		name: 'Sistemas y Organizaciones',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 340102,
		name: 'Fundamentos de Programación',
		hours: 5,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 340103,
		name: 'Cálculo Diferencial e Integral',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 340104,
		name: 'Lógica y Álgebra',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 340105,
		name: 'Lecto-Comprehensión en Inglés',
		hours: 2,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 340106,
		name: 'Derechos Humanos y Tecnología',
		hours: 1,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 340107,
		name: 'Fundamentos de Computación',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 340208,
		name: 'Ingeniería de Software I',
		hours: 5,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340209,
		name: 'Algoritmos y Estructura de Datos',
		hours: 4,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340210,
		name: 'Programación Orientada a Objetos',
		hours: 5,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340105,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340211,
		name: 'Matemática Discreta',
		hours: 3,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340212,
		name: 'Ecuaciones Diferenciales y Cálculo Multivariado',
		hours: 3,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340213,
		name: 'Arquitectura de Computadoras',
		hours: 3,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340299,
		name: 'Optativa I',
		hours: 1.5,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340105,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340314,
		name: 'Ingeniería de Software II',
		hours: 5,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340208,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340315,
		name: 'Bases de Datos',
		hours: 4,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340316,
		name: 'Sistemas Operativos',
		hours: 4,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340213,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340317,
		name: 'Probabilidad y Estadística',
		hours: 3,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340318,
		name: 'Paradigmas y Lenguajes',
		hours: 2,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340213,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340319,
		name: 'Ética Profesional',
		hours: 1.5,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340208,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340320,
		name: 'Programación Avanzada',
		hours: 2,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340399,
		name: 'Optativa II',
		hours: 1.5,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 2,
				requiredCourseId: 340208,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340321,
		name: 'Taller de Integración',
		hours: 1.5,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340208,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340209,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340210,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 340211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 340212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 340213,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 340299,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 340314,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 340315,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 340316,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 14,
				requiredCourseId: 340317,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 340318,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 16,
				requiredCourseId: 340319,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 340320,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 18,
				requiredCourseId: 340399,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 340422,
		name: 'Inteligencia Artificial',
		hours: 3,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340315,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340317,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340318,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340423,
		name: 'Bases de Datos Avanzadas',
		hours: 5,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340315,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340320,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340424,
		name: 'Comunicaciones y Redes',
		hours: 5,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340316,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340317,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340425,
		name: 'Metodología de la Investigación',
		hours: 3,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340208,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340317,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340426,
		name: 'Investigación Operativa',
		hours: 1.5,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340317,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340427,
		name: 'Optativa III',
		hours: 1.5,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340314,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340315,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340320,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 340321,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340428,
		name: 'Computación Avanzada',
		hours: 1.5,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340315,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340316,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340429,
		name: 'Optativa IV',
		hours: 1.5,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340316,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340318,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340320,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340530,
		name: 'Seguridad y Auditoría',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340319,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340424,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340531,
		name: 'Administración de Recursos',
		hours: 5,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340423,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340424,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340532,
		name: 'Teoría de Computabilidad',
		hours: 5,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340318,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340423,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340424,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340533,
		name: 'Tesina de Grado',
		hours: 5,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Para cursar, Regular 423 - 424 - 425. Para rendir, Aprobadas el resto de 5º
			{
				id: 1,
				requiredCourseId: 340423,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340424,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 340425,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 340530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 340531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 340532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 340534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 340535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 340534,
		name: 'Interfaz Hombre Máquina',
		hours: 2,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340320,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 340428,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 340535,
		name: 'Optativa V',
		hours: 1.5,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 340423,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const uaderFcytLsiData: CareerData = {
	courses,
	degree: 'Licenciatura en Sistemas de Información',
	years: 5,
	college: 'UADER FCyT',
	studyProgram: 'Plan de Estudios 2010',
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2010',
			url: 'https://fcytcdelu.uader.edu.ar/sistemas'
		}
	],
	notes: [
		{
			id: 1,
			text: `En 2025, las materias optativas son:
        \n - Optativa I (2<sup>do</sup> año): **Diseño de Experiencia de Usuario e Interfaz de Usuario**
        \n - Optativa II (3<sup>er</sup> año): **Patrones de Arquitectura de Software**
        \n - Optativa III (4<sup>to</sup> año): **Bases de Datos NoSQL**
        \n - Optativa IV (4<sup>to</sup> año): **Desarrollo y Arquitecturas en Programación Móvil**
        \n - Optativa V (5<sup>to</sup> año): **Gestión de Costos y Financiamiento de Proyectos Tecnológicos**
      `
		},
		{
			id: 2,
			text: 'En la materia **Optativa II** de 3<sup>er</sup> año, se omite el requerimiento de **Lecto-Comprehensión en Inglés** de 1<sup>er</sup> año _regular_ porque ya es requerido por **Programación Orientada a Objetos** de 2<sup>do</sup> año, que también es requerido por **Optativa II**.'
		}
	]
};
