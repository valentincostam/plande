import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// PRIMER AÑO - 1er Cuatrimestre
	{
		id: 1,
		code: '01',
		name: 'Taller de Aprendizaje Científico y Académico',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '02',
		name: 'Introducción a la Ciencia Política',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '03',
		name: 'Introducción a la Sociología',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	// PRIMER AÑO - 2do Cuatrimestre
	{
		id: 4,
		code: '04',
		name: 'Teoría y Metodología de la Investigación Social',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '05',
		name: 'Teoría Política I',
		hours: 8,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: '06',
		name: 'Filosofía',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	// SEGUNDO AÑO - 1er Cuatrimestre
	{
		id: 7,
		code: '07',
		name: 'Metodología Cualitativa',
		hours: 6,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 8,
		code: '08',
		name: 'Teoría Política II',
		hours: 8,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 5,
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
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 9,
		code: '09',
		name: 'Metodología Cuantitativa I',
		hours: 6,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// SEGUNDO AÑO - 2do Cuatrimestre
	{
		id: 10,
		code: '10',
		name: 'Principios de Economía',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 11,
		code: '11',
		name: 'Historia General Americana Contemporánea',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 12,
		code: '12',
		name: 'Derecho Político',
		hours: 6,
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
				requiredCourseId: 5,
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
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// TERCER AÑO - 1er Cuatrimestre
	{
		id: 13,
		code: '13',
		name: 'Geografía Política',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '14',
		name: 'Metodología Cuantitativa II',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Historia Universal Contemporánea',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 16,
		code: '16',
		name: 'Opinión Pública',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
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
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 4,
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
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// TERCER AÑO - 2do Cuatrimestre
	{
		id: 17,
		code: '17',
		name: 'Sistemas Políticos Comparados',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
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
				requiredCourseId: 15,
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
		id: 18,
		code: '18',
		name: 'Historia General Argentina I',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
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
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Sociología del Estado y Políticas Públicas',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// CUARTO AÑO - 1er Cuatrimestre
	{
		id: 20,
		code: '20',
		name: 'Política Exterior Argentina',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Historia Argentina General II',
		hours: 6,
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
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		code: '22',
		name: 'Política Internacional Contemporánea',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
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
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// CUARTO AÑO - 2do Cuatrimestre
	{
		id: 23,
		code: '23',
		name: 'Administración Pública Comparada',
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
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '24',
		name: 'Partidos Políticos y Sistemas Electorales',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		code: '25',
		name: 'Análisis del Discurso y Comunicación Política',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
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
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Estructura Social Argentina',
		hours: 6,
		term: courseTerms.secondSemester,
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
			},
			{
				id: 3,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// QUINTO AÑO - 1er Cuatrimestre
	{
		id: 27,
		code: '27',
		name: 'Seminario 1. Teoría Política Contemporánea',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
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
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		code: '28',
		name: 'Seminario 2. A elección',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
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
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Seminario de Investigación en Ciencia Política',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		code: '30',
		name: 'Práctica Profesional',
		hours: 8,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: []
	},
	{
		id: 31,
		code: '31',
		name: 'Tesis de Licenciatura',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 5,
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
	}
];

export const unmdpFhLcp: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Ciencia Política',
	degreeSlug: 'LCP',
	universityName: 'Universidad Nacional de Mar del Plata',
	universitySlug: 'UNMDP',
	collegeName: 'Facultad de Humanidades',
	collegeSlug: 'FH',
	durationYears: 5,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://humanidades.mdp.edu.ar/departamento-de-ciencia-politica/licenciatura-en-ciencia-politica/'
		},
		{
			id: 2,
			label: 'Estructura de Cursada Recomendada',
			url: 'https://drive.google.com/file/d/1F6Ar-Cd-J22RWTlW11DKKUZK0gZJAsyl/view?usp=sharing'
		}
	],
	notes: [
		{
			id: 1,
			text: 'El **Seminario 2** (5° año) es a elección del estudiante.'
		}
	]
};
