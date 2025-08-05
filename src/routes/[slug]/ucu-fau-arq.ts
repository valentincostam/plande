import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import type { RawCourse } from '$lib/raw-course';

const courses: RawCourse[] = [
	// 1er año
	{
		id: 1,
		name: 'Introducción a la Arquitectura',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Técnicas de Representación I',
		hours: 0,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Sistemas de Representación I',
		hours: 0,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Matemática I',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Introducción a la Construcción',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		name: 'Arquitectura I',
		hours: 0,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Matemática II',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		name: 'Construcciones I',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// 2do año
	{
		id: 8,
		name: 'Arquitectura II',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 9,
		name: 'Técnicas de Representación II',
		term: courseTerms.annual,
		year: 2,
		requirements: []
	},
	{
		id: 10,
		name: 'Sistemas de Representación II',
		term: courseTerms.annual,
		year: 2,
		requirements: []
	},
	{
		id: 11,
		name: 'Matemática III e Introducción a la Física',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 12,
		name: 'Computación Gráfica I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 13,
		name: 'Instalaciones I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 14,
		name: 'Historia de la Arquitectura I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 15,
		name: 'Arquitectura III',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 16,
		name: 'Estructuras I',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 17,
		name: 'Computación Gráfica II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 18,
		name: 'Instalaciones II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 19,
		name: 'Historia de la Arquitectura II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 20,
		name: 'Metodología de la Investigación',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},

	// 3er año
	{
		id: 21,
		name: 'Arquitectura IV',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 22,
		name: 'Técnicas de Representación III',
		term: courseTerms.annual,
		year: 3,
		requirements: []
	},
	{
		id: 23,
		name: 'Documentación de Obra',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 24,
		name: 'Estructuras II',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 25,
		name: 'Construcciones II',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 26,
		name: 'Historia de la Arquitectura III',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 27,
		name: 'Computación Gráfica III',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [],
		tag: courseTags.optative
	},
	{
		id: 28,
		name: 'Arquitectura V',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},
	{
		id: 29,
		name: 'Estructuras III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},
	{
		id: 30,
		name: 'Construcciones III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},
	{
		id: 31,
		name: 'Historia de la Arquitectura IV',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},
	{
		id: 32,
		name: 'Arquitectura Legal y Ética Profesional',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},

	// 4to año
	{
		id: 33,
		name: 'Arquitectura VI',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 34,
		name: 'Dirección y Organización de Obra I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 35,
		name: 'Estructuras IV',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 36,
		name: 'Instalaciones III',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 37,
		name: 'Historia Política, Social y Económica de la Arquitectura Argentina I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 38,
		name: 'Patrimonio y Conservación',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 39,
		name: 'Taller de Creatividad',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [],
		tag: courseTags.optative
	},
	{
		id: 40,
		name: 'Arquitectura VII',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 41,
		name: 'Teoría y Crítica de la Arquitectura y el Urbanismo',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 42,
		name: 'Dirección y Organización de Obra II',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 43,
		name: 'Estructuras V',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 44,
		name: 'Infraestructura Urbana',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 45,
		name: 'Historia Política, Social y Económica de la Arquitectura Argentina II',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: []
	},
	{
		id: 46,
		name: 'Gestión Ambiental',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [],
		tag: courseTags.optative
	},

	// 5to año
	{
		id: 47,
		name: 'Planificación Urbanística',
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 48,
		name: 'Práctica Profesional Supervisada',
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 49,
		name: 'Proyecto Final',
		term: courseTerms.annual,
		year: 5,
		requirements: []
	}
];

export const ucuFauArqData = {
	courses,
	degree: 'Arquitectura',
	years: 5,
	college: 'UCU FAU',
	studyProgram: 'Plan de Estudios 2007',
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://ucu.edu.ar/project/arquitecto-a/'
		},
		{
			id: 2,
			label: 'Correlativas para cursar',
			url: 'https://drive.google.com/file/d/1M6FKoKi3z9XypMPOVQdY_1h9lwD_Dwra/view'
		},
		{
			id: 3,
			label: 'Correlativas para rendir',
			url: 'https://drive.google.com/file/d/1ovdo9xZ1tckg38yiMiDbhBsiRnGvfu8d/view'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para cursar **Proyecto Final**, deberás tener al menos una materia optativa aprobada, o bien, **Gestión Ambiental** cursada.'
		}
	]
};
