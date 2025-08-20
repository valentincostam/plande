import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import type { RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
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
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Sistemas de Representación',
		hours: 6,
		term: courseTerms.secondSemester,
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
	{
		id: 5,
		name: 'Física I',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Representación Gráfica',
		hours: 6,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		name: 'Ingeniería Electromecánica',
		hours: 2,
		term: courseTerms.annual,
		year: 1,
		requirements: [],
		tag: courseTags.integrative
	},
	{
		id: 8,
		name: 'Análisis Matemático II',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 2, requiredState: courseStates.taken }
		]
	},
	{
		id: 9,
		name: 'Probabilidad y Estadística',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 2, requiredState: courseStates.taken }
		]
	},
	{
		id: 10,
		name: 'Física II',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [{ id: 1, requiredCourseId: 5, requiredState: courseStates.taken }]
	},
	{
		id: 11,
		name: 'Programación en Computación',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [{ id: 1, requiredCourseId: 2, requiredState: courseStates.taken }]
	},
	{
		id: 12,
		name: 'Conocimiento de Materiales',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [{ id: 1, requiredCourseId: 3, requiredState: courseStates.taken }]
	},
	{
		id: 13,
		name: 'Estabilidad',
		hours: 6,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 2, requiredState: courseStates.taken }
		]
	},
	{
		id: 14,
		name: 'Ingeniería Electromecánica II',
		hours: 2,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 7, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 8, requiredState: courseStates.taken },
			{ id: 3, requiredCourseId: 9, requiredState: courseStates.taken }
		],
		tag: courseTags.integrative
	},
	{
		id: 15,
		name: 'Tecnología Mecánica',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 6, requiredState: courseStates.taken }]
	},
	{
		id: 16,
		name: 'Matemática para Ingeniería Electromecánica',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 8, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 9, requiredState: courseStates.taken }
		]
	},
	{
		id: 17,
		name: 'Mecánica y Mecánisms',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 15, requiredState: courseStates.taken }]
	},
	{
		id: 18,
		name: 'Higiene y Seguridad Industrial',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 12, requiredState: courseStates.taken }]
	},
	{
		id: 19,
		name: 'Electrotecnia',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 14, requiredState: courseStates.taken }]
	},
	{
		id: 20,
		name: 'Termodinámica Técnica',
		hours: 4,
		term: courseTerms.annual,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 15, requiredState: courseStates.taken }]
	},
	{
		id: 21,
		name: 'Ingeniería Electromecánica III',
		hours: 3,
		term: courseTerms.annual,
		year: 3,
		requirements: [{ id: 1, requiredCourseId: 14, requiredState: courseStates.taken }],
		tag: courseTags.integrative
	},
	{
		id: 22,
		name: 'Máquinas Térmicas',
		hours: 10,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 20, requiredState: courseStates.taken }]
	},
	{
		id: 23,
		name: 'Máquinas Eléctricas',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 19, requiredState: courseStates.taken }]
	},
	{
		id: 24,
		name: 'Economía Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 11, requiredState: courseStates.taken }]
	},
	{
		id: 25,
		name: 'Diseño y Fabricación Asistido por Computadora',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 11, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 26,
		name: 'Ingeniería de Superficies',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 12, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 27,
		name: 'Legislación',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 16, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 24, requiredState: courseStates.taken }
		]
	},
	{
		id: 28,
		name: 'Elementos de Máquinas',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 17, requiredState: courseStates.taken },
			{ id: 2, requiredCourseId: 23, requiredState: courseStates.taken }
		],
		tag: courseTags.integrative
	},
	{
		id: 29,
		name: 'Máquinas de los Fluidos y Máquinas',
		hours: 5,
		term: courseTerms.annual,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 20, requiredState: courseStates.taken }]
	},
	{
		id: 30,
		name: 'Máquinas y Equipos de Transporte',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 22, requiredState: courseStates.taken }]
	},
	{
		id: 31,
		name: 'Gestión y Mantenimiento Electromecánico',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [{ id: 1, requiredCourseId: 23, requiredState: courseStates.taken }]
	},
	{
		id: 32,
		name: 'Organización Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 24, requiredState: courseStates.taken }]
	},
	{
		id: 33,
		name: 'Automatización y Control Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 23, requiredState: courseStates.taken }]
	},
	{
		id: 34,
		name: 'Introducción al Proyecto de Instalaciones',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 23, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 35,
		name: 'Electrónica de Potencia',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 23, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 36,
		name: 'Instalaciones Térmicas y Mecánicas',
		hours: 10,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 22, requiredState: courseStates.taken }]
	},
	{
		id: 37,
		name: 'Centrales y Sistemas de Transmisión',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 23, requiredState: courseStates.taken }]
	},
	{
		id: 38,
		name: 'Automatismos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 33, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 39,
		name: 'Emprendendorismo',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 32, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 40,
		name: 'Introducción a la Investigación Científica',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 32, requiredState: courseStates.taken }]
	},
	{
		id: 41,
		name: 'Instalaciones Industriales Regionales',
		hours: 6,
		term: courseTerms.annual,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 36, requiredState: courseStates.taken }],
		tag: courseTags.elective
	},
	{
		id: 42,
		name: 'Oleohidráulica y Neumática',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 29, requiredState: courseStates.taken }]
	},
	{
		id: 43,
		name: 'Redes de Distribución de Instalaciones Eléctricas',
		hours: 5,
		term: courseTerms.annual,
		year: 5,
		requirements: [{ id: 1, requiredCourseId: 37, requiredState: courseStates.taken }]
	},
	{
		id: 44,
		name: 'Proyecto Final',
		hours: 3,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 28, requiredState: courseStates.passed },
			{ id: 2, requiredCourseId: 33, requiredState: courseStates.passed },
			{ id: 3, requiredCourseId: 36, requiredState: courseStates.passed },
			{ id: 4, requiredCourseId: 37, requiredState: courseStates.passed }
		],
		tag: courseTags.integrative
	}
];

export const utnFrcuIeData: CareerData = {
	courses,
	degree: 'Ingeniería Electromecánica',
	years: 5,
	college: 'UTN FRCU',
	studyProgram: 'Plan de Estudios 2023',
	progress: {
		type: 'mandatory-only'
	},
	sources: [],
	notes: []
};
