import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
	// Year 1 - First Semester
	{
		id: 1,
		name: 'Álgebra y Geometría Analítica',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Análisis Matemático I',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Sistemas de Representación',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Química General',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// Year 1 - Second Semester
	{
		id: 5,
		name: 'Ingeniería y Sociedad',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Física I',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		name: 'Representación Gráfica',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// Year 1 - Annual
	{
		id: 8,
		name: 'Ingeniería Electromecánica I',
		hours: 2,
		term: courseTerms.annual,
		year: 1,
		tag: courseTags.integrative,
		requirements: []
	},

	// Year 2 - First Semester
	{
		id: 9,
		name: 'Análisis Matemático II',
		hours: 10,
		term: courseTerms.firstSemester,
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
		name: 'Probabilidad y Estadística',
		hours: 6,
		term: courseTerms.firstSemester,
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
		id: 11,
		name: 'Física II',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
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

	// Year 2 - Second Semester
	{
		id: 12,
		name: 'Programación en Computación',
		hours: 6,
		term: courseTerms.secondSemester,
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
		id: 13,
		name: 'Conocimiento de Materiales',
		hours: 8,
		term: courseTerms.secondSemester,
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
		name: 'Estabilidad',
		hours: 6,
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
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 2 - Annual
	{
		id: 15,
		name: 'Inglés I',
		hours: 2,
		term: courseTerms.annual,
		year: 2,
		requirements: []
	},
	{
		id: 16,
		name: 'Ingeniería Electromecánica II',
		hours: 2,
		term: courseTerms.annual,
		year: 2,
		tag: courseTags.integrative,
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
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 3 - First Semester
	{
		id: 17,
		name: 'Tecnología Mecánica',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		name: 'Matemática para Ingeniería Electromecánica',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
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

	// Year 3 - Second Semester
	{
		id: 19,
		name: 'Mecánica y Mecanismos',
		hours: 8,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 9,
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
		id: 20,
		name: 'Higiene y Seguridad Industrial',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
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
		id: 21,
		name: 'Electrotecnia',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
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

	// Year 3 - Annual
	{
		id: 22,
		name: 'Inglés II',
		hours: 2,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 23,
		name: 'Termodinámica Técnica',
		hours: 4,
		term: courseTerms.annual,
		year: 3,
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
		id: 24,
		name: 'Ingeniería Electromecánica III',
		hours: 3,
		term: courseTerms.annual,
		year: 3,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 4 - First Semester
	{
		id: 25,
		name: 'Máquinas Térmicas',
		hours: 10,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 26,
		name: 'Mediciones Eléctricas',
		hours: 8,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 27,
		name: 'Electrónica Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
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
		name: 'Economía',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 4 - Second Semester
	{
		id: 29,
		name: 'Diseño y Fabricación Asistido por Computadora',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
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
		id: 30,
		name: 'Ingeniería de Superficies',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 31,
		name: 'Legislación',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 4 - Annual
	{
		id: 32,
		name: 'Elementos de Máquinas',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 33,
		name: 'Máquinas Eléctricas',
		hours: 5,
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
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 34,
		name: 'Mecánica de los Fluidos y Máquinas Fluidodinámicas',
		hours: 5,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
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
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 35,
		name: 'Máquinas y Equipos de Transporte',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
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
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 36,
		name: 'Gestión y Mantenimiento Electromecánico',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
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
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 5 - First Semester
	{
		id: 37,
		name: 'Organización Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 38,
		name: 'Automatización y Control Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 39,
		name: 'Introducción al Proyecto de Instalaciones Industriales',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
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
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 40,
		name: 'Electrónica de Potencia',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
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
			}
		]
	},
	{
		id: 41,
		name: 'Instalaciones Térmicas y Mecánicas',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 42,
		name: 'Centrales y Sistemas de Transmisión',
		hours: 10,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 5 - Second Semester
	{
		id: 43,
		name: 'Automatismos',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 38,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 40,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 44,
		name: 'Emprendedorismo',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 37,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 45,
		name: 'Introducción a la Investigación Científica',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 46,
		name: 'Instalaciones Industriales Regionales',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 39,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 47,
		name: 'Oleohidráulica y Neumática',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 34,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 48,
		name: 'Redes de Distribución e Instalaciones Eléctricas',
		hours: 5,
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
				requiredCourseId: 33,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Year 5 - Annual (Final Project)
	{
		id: 49,
		name: 'Proyecto Final',
		hours: 3,
		term: courseTerms.annual,
		year: 5,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const utnFrcuIeData: CareerData = {
	courses,
	degree: 'Ingeniería Electromecánica',
	years: 5,
	college: 'UTN FRCU',
	studyProgram: 'Plan de Estudios 2023',
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 20
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://www.frcu.utn.edu.ar/images/recursos/Grado/Grado/2025/PlanEstudios2023_IngenieriaElectromecanica_Actualizado.pdf'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1851 - Diseño Curricular',
			url: 'https://www.frcu.utn.edu.ar/images/VidaEducativa/PlanCarrerasIngenieria/5.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas del Plan de Estudios.'
		},
		{
			id: 2,
			text: 'Para iniciar y acreditar la **Práctica Profesional Supervisada** (200 horas), es necesario cumplir con los requisitos para cursar **Proyecto Final**.'
		},
		{
			id: 3,
			text: '**¿Por qué debo aprobar 40 horas de materias electivas para egresarme?** [Leer explicación detallada](/utn-frcu-isi/electivas).'
		},
		{
			id: 4,
			text: '**Práctica Profesional Supervisada** tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas por la materia entre 32 semanas (lo que dura año académico). La carga horaria real varía de acuerdo a cómo realice la práctica cada estudiante.'
		}
	]
};
