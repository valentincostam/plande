import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════
	// PRIMER AÑO
	// ═══════════════════════════════════════════════════════════

	// 1° AÑO - PRIMER CUATRIMESTRE
	{
		id: 1,
		name: 'Introducción al Derecho',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Sociología',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Instituciones de Derecho Civil',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Derecho Penal I',
		hours: 4,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		name: 'Historia Constitucional',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},

	// 1° AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 6,
		name: 'Derecho Romano',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		name: 'Derecho Político',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 8,
		name: 'Derecho Constitucional I',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// SEGUNDO AÑO
	// ═══════════════════════════════════════════════════════════

	// 2° AÑO - PRIMER CUATRIMESTRE
	{
		id: 9,
		name: 'Obligaciones Civiles y Comerciales',
		hours: 4,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			// Requiere: Introducción al Derecho, Instituciones de Derecho Civil, Derecho Romano
			{
				id: 1,
				requiredCourseId: 1, // Introducción al Derecho
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
				requiredCourseId: 3, // Instituciones de Derecho Civil
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 6, // Derecho Romano
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		name: 'Derecho Penal II',
		hours: 4,
		term: courseTerms.annual,
		year: 2,
		requirements: [
			// Requiere: Derecho Penal I
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
		id: 11,
		name: 'Derecho Internacional Público',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			// Requiere: Introducción al Derecho
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
			}
		]
	},
	{
		id: 12,
		name: 'Derecho Constitucional II',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			// Requiere: Derecho Constitucional I
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
		id: 13,
		name: 'Optativa I',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},

	// 2° AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 14,
		name: 'Derecho Público Provincial y Municipal',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Requiere: Derecho Constitucional II
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
		id: 15,
		name: 'Economía Política',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},
	{
		id: 16,
		name: 'Optativa II',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// TERCER AÑO
	// ═══════════════════════════════════════════════════════════

	// 3° AÑO - PRIMER CUATRIMESTRE
	{
		id: 17,
		name: 'Contratos Civiles y Comerciales',
		hours: 4,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			// Requiere: Obligaciones Civiles y Comerciales
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		name: 'Derecho Financiero',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Requiere: Economía Política, Derecho Constitucional II
			{
				id: 1,
				requiredCourseId: 15, // Economía Política
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
				requiredCourseId: 12, // Derecho Constitucional II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		name: 'Derecho Procesal I',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Requiere: Derecho Penal II, Derecho Constitucional II
			{
				id: 1,
				requiredCourseId: 10, // Derecho Penal II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 12, // Derecho Constitucional II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		name: 'Derecho Laboral',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Requiere: Derecho Constitucional II
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
		id: 21,
		name: 'Optativa III',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},

	// 3° AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 22,
		name: 'Derecho Tributario',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Requiere: Derecho Financiero
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
		id: 23,
		name: 'Sociedades Comerciales',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Requiere: Contratos Civiles y Comerciales
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		name: 'Práctica Profesional I',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Requiere: Derecho Procesal I
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		name: 'Optativa IV',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// CUARTO AÑO
	// ═══════════════════════════════════════════════════════════

	// 4° AÑO - PRIMER CUATRIMESTRE
	{
		id: 26,
		name: 'Filosofía del Derecho',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Requiere: Sociedades Comerciales, Derecho Penal II, Derecho Político
			{
				id: 1,
				requiredCourseId: 23, // Sociedades Comerciales
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 10, // Derecho Penal II
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
				requiredCourseId: 7, // Derecho Político
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
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
		id: 27,
		name: 'Derechos Reales',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			// Requiere: Contratos Civiles y Comerciales
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		name: 'Concursos y Quiebras',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Requiere: Sociedades Comerciales
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		name: 'Derecho Procesal II',
		hours: 5,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Requiere: Derecho Procesal I, Concursos y Quiebras
			{
				id: 1,
				requiredCourseId: 19, // Derecho Procesal I
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 28, // Concursos y Quiebras
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		name: 'Derecho Administrativo I',
		hours: 4,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			// Requiere: Contratos Civiles y Comerciales, Derecho Constitucional II
			{
				id: 1,
				requiredCourseId: 17, // Contratos Civiles y Comerciales
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 12, // Derecho Constitucional II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// 4° AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 31,
		name: 'Derecho Ambiental',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Requiere: Derechos Reales
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 32,
		name: 'Mediación y Resolución de Conflictos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Requiere: Derecho Procesal II
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
	},
	{
		id: 33,
		name: 'Ética',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Requiere: Filosofía del Derecho
			{
				id: 1,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// QUINTO AÑO
	// ═══════════════════════════════════════════════════════════

	// 5° AÑO - PRIMER CUATRIMESTRE
	{
		id: 34,
		name: 'Derecho de Familia',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Requiere: Derechos Reales
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 35,
		name: 'Derecho de Navegación',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			// Requiere: Concursos y Quiebras
			{
				id: 1,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 36,
		name: 'Derecho de Minería y Energía',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			// Requiere: Derechos Reales, Derecho Administrativo I
			{
				id: 1,
				requiredCourseId: 27, // Derechos Reales
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 30, // Derecho Administrativo I
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 37,
		name: 'Defensa del Consumidor',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			// Requiere: Derecho Administrativo I
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 38,
		name: 'Derecho Administrativo II',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Requiere: Derecho Administrativo I
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// 5° AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 39,
		name: 'Derecho Notarial y Registral',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			// Requiere: Derecho de Familia, Derecho Procesal II
			{
				id: 1,
				requiredCourseId: 34, // Derecho de Familia
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 29, // Derecho Procesal II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 40,
		name: 'Derecho Internacional Privado',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			// Requiere: Derecho de Navegación, Derecho de Familia, Derecho Procesal II
			{
				id: 1,
				requiredCourseId: 35, // Derecho de Navegación
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 34, // Derecho de Familia
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 29, // Derecho Procesal II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 41,
		name: 'Práctica Profesional II',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		requirements: [
			// Requiere: Práctica Profesional I, Derecho Procesal II
			{
				id: 1,
				requiredCourseId: 24, // Práctica Profesional I
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
				requiredCourseId: 29, // Derecho Procesal II
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const udeFdcsAb: StudyPlan = {
	courses,
	degreeName: 'Abogacía',
	degreeSlug: 'Ab',
	universityName: 'Universidad del Este',
	universitySlug: 'UDE',
	collegeName: 'Facultad de Derecho y Ciencias Sociales',
	collegeSlug: 'FDCS',
	durationYears: 5,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Resolución Ministerial N° 663/09',
			url: 'https://www.ude.edu.ar/wp-content/uploads/2022/03/Resoluci%C3%B3n-N%C2%B0663-09.pdf'
		},
		{
			id: 2,
			label: 'Plan de Estudios',
			url: 'https://www.ude.edu.ar/wp-content/uploads/2024/10/Abogacia-Plan-de-estudio.pdf'
		},
		{
			id: 3,
			label: 'Página de la carrera',
			url: 'https://www.ude.edu.ar/facultades/abogacia/'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para obtener el título de Abogado/a, los/as estudiantes deberán acreditar el conocimiento de un (1) idioma extranjero: inglés, en dos (2) niveles, establecidos en su respectivo plan de estudios.'
		}
	]
};
