import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// PRIMER AÑO
	{
		id: 1,
		code: '01',
		name: 'Taller de Aprendizaje Científico y Académico',
		hours: 4,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '02',
		name: 'Introducción a la Ciencia Política',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '03',
		name: 'Optativa 1',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '04',
		name: 'Historia Universal Contemporánea',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '05',
		name: 'Principios de Economía',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '06',
		name: 'Optativa 2',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '07',
		name: 'Teoría y Metodología de la Investigación Social',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	// SEGUNDO AÑO
	{
		id: 8,
		code: '08',
		name: 'Teoría Política I',
		hours: 8,
		term: courseTerms.semestral,
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
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 9,
		code: '09',
		name: 'Historia General Americana Contemporánea',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: []
	},
	{
		id: 10,
		code: '10',
		name: 'Metodología Cuantitativa 1',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '11',
		name: 'Sociología del Estado y Políticas Públicas',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '12',
		name: 'Historia Argentina General I',
		hours: 6,
		term: courseTerms.semestral,
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
		id: 13,
		code: '13',
		name: 'Geografía Política',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 4,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// TERCER AÑO
	{
		id: 14,
		code: '14',
		name: 'Teoría Política II',
		hours: 8,
		term: courseTerms.semestral,
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
				requiredCourseId: 8,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Historia Argentina General II',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Metodología Cuantitativa 2',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 7,
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
		id: 17,
		code: '17',
		name: 'Sistemas Políticos Comparados',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 8,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: '18',
		name: 'Opinión Pública',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 7,
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
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Derecho Político',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 8,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// CUARTO AÑO
	{
		id: 20,
		code: '20',
		name: 'Partidos Políticos y Sistemas Electorales',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 14,
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
				requiredCourseId: 8,
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
		id: 21,
		code: '21',
		name: 'Optativa 3: Administración Pública Comparada',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		code: '22',
		name: 'Metodología Cualitativa',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
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
				requiredCourseId: 7,
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
		id: 23,
		code: '23',
		name: 'Análisis del Discurso y Comunicación Política',
		hours: 6,
		term: courseTerms.semestral,
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
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
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
		id: 24,
		code: '24',
		name: 'Optativa 4: Política Internacional Contemporánea',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
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
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		code: '25',
		name: 'Estructura Social Argentina',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Política Exterior Argentina',
		hours: undefined,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// QUINTO AÑO
	{
		id: 27,
		code: '27',
		name: 'Seminario I',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
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
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 14,
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
		name: 'Seminario II',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
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
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 14,
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
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 14,
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
	{
		id: 30,
		code: '30',
		name: 'Práctica Profesional',
		hours: 8,
		term: courseTerms.semestral,
		year: 5,
		requirements: []
	},
	{
		id: 31,
		code: '31',
		name: 'Tesis de Licenciatura',
		hours: undefined,
		term: courseTerms.semestral,
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
		}
	],
	notes: [
		{
			id: 1,
			text: 'Las **Optativas 1 y 2** (1<sup>er</sup> año) son asignaturas extradepartamentales a elección del estudiante.'
		}
	]
};
