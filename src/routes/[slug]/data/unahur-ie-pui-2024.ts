import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { TRANSVERSAL_YEAR } from '$lib/course.svelte';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// Primer año
	{
		id: 1,
		code: '1',
		name: 'Lengua Inglesa I',
		hours: 12,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Gramática Inglesa I',
		hours: 9,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '3',
		name: 'Fonética y Práctica en Laboratorio I',
		hours: 12,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Pedagogía',
		hours: 5,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Lectura, Escritura y Oralidad',
		hours: 4,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Aprendizajes y Prácticas Educativas',
		hours: 5,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Territorio, Sujetos e Instituciones',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	// Segundo año
	{
		id: 8,
		code: '8',
		name: 'Lengua Inglesa II',
		hours: 12,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 9,
		code: '9',
		name: 'Gramática Inglesa II',
		hours: 9,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		code: '10',
		name: 'Fonética y Práctica en Laboratorio II',
		hours: 12,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '11',
		name: 'Didáctica y currículum',
		hours: 5,
		term: courseTerms.semestral,
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
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '12',
		name: 'Educación Sexual Integral',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: []
	},
	{
		id: 13,
		code: '13',
		name: 'Pensamiento Pedagógico Latinoamericano',
		hours: 5,
		term: courseTerms.semestral,
		year: 2,
		requirements: []
	},
	{
		id: 14,
		code: '14',
		name: 'Cultura y Alfabetización Digital en la Universidad',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: []
	},
	{
		id: 15,
		code: '15',
		name: 'Prácticas de la Enseñanza en el Ámbito Socioeducativo',
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
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// Tercer año
	{
		id: 16,
		code: '16',
		name: 'Lengua Inglesa III',
		hours: 8,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 9,
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
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 17,
		code: '17',
		name: 'Fonética y Práctica en Laboratorio III',
		hours: 5,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 9,
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
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 18,
		code: '18',
		name: 'Lingüística',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 9,
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
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Adquisición de la Lengua Materna y Extranjera',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 20,
		code: '20',
		name: 'Didáctica del Inglés para el Nivel Primario',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Historia de la Nación Argentina y sus Proyectos Educativos',
		hours: 5,
		term: courseTerms.semestral,
		year: 3,
		requirements: []
	},
	{
		id: 22,
		code: '22',
		name: 'Didáctica en Contextos de Educación Superior',
		hours: 5,
		term: courseTerms.semestral,
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
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Asignatura UNAHUR',
		hours: 3,
		term: courseTerms.semestral,
		year: 3,
		requirements: []
	},
	{
		id: 24,
		code: '24',
		name: 'Prácticas Docentes en el Nivel Primario',
		hours: 11,
		term: courseTerms.annual,
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
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 8,
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
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// Cuarto año
	{
		id: 25,
		code: '25',
		name: 'Lengua Inglesa IV',
		hours: 8,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Fonética y Práctica en Laboratorio IV',
		hours: 5,
		term: courseTerms.semestral,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 27,
		code: '27',
		name: 'Análisis Contrastivo del Inglés y el Español',
		hours: 5,
		term: courseTerms.semestral,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 28,
		code: '28',
		name: 'Didáctica del Inglés para el Nivel Secundario y Superior',
		hours: 4,
		term: courseTerms.semestral,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Investigación Educativa en Lenguas Extranjeras',
		hours: 4,
		term: courseTerms.semestral,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		code: '30',
		name: 'Estudios Literarios',
		hours: 5,
		term: courseTerms.semestral,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 31,
		code: '31',
		name: 'Tecnología Educativa',
		hours: 4,
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
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 32,
		code: '32',
		name: 'Política Educativa',
		hours: 5,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 33,
		code: '33',
		name: 'Prácticas Docentes en los Niveles Secundario y Superior',
		hours: 11,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// ACA - Actividades Curriculares Acreditables
	{
		id: 34,
		code: 'ACA',
		name: 'Actividades Curriculares Acreditables',
		hours: 20,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
		requirements: []
	}
];

export const unahurIePui2024: StudyPlan = {
	courses,
	degreeName: 'Profesorado Universitario de Inglés',
	degreeSlug: 'PUI',
	universityName: 'Universidad Nacional de Hurlingham',
	universitySlug: 'UNAHUR',
	collegeName: 'Instituto de Educación',
	collegeSlug: 'IE',
	durationYears: 4,
	year: 2024,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Página Web de la Carrera',
			url: 'https://unahur.edu.ar/profesorado-universitario-de-ingles/'
		},
		{
			id: 2,
			label: 'Plan de Estudios (PDF)',
			url: 'https://unahur.edu.ar/wp-content/uploads/2025/09/RCS-384-2024-Profesorado-Universitario-de-Ingles_removed.pdf'
		},
		{
			id: 3,
			label: 'Plan de Correlatividades (PDF)',
			url: 'https://unahur.edu.ar/wp-content/uploads/2025/07/Plan-de-correlatividades-del-Profesorado-Universitario-de-Ingles.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Título intermedio**: Técnico/a Universitario/a en Prácticas Socioeducativas del Idioma Inglés (2 años, 120 créditos). Se obtiene al completar el segundo año más las Actividades Curriculares Acreditables (ACA).'
		},
		{
			id: 2,
			text: '**Ciclos Preparatorios de Inglés (CPI)**: Antes de comenzar la cursada, es obligatorio realizar una entrevista de diagnóstico de nivel. Los cursos 1, 2 y 3 requieren haber completado el CPI Intermedio nivel 6 o nivel intermedio alto 2. Esta es una instancia preparatoria, no una materia del plan.'
		},
		{
			id: 3,
			text: `**Requisitos por cantidad de materias regularizadas** (adicionales a los prerrequisitos específicos mostrados):
				\n - **Educación Sexual Integral** (2<sup>do</sup> año): 5 materias regularizadas
				\n - **Pensamiento Pedagógico Latinoamericano** (2<sup>do</sup> año): 6 materias regularizadas
				\n - **Historia de la Nación Argentina y sus Proyectos Educativos** (3<sup>er</sup> año): 10 materias regularizadas
				\n - **Actividades Curriculares Acreditables (ACA)**: 10 materias regularizadas`
		}
	]
};
