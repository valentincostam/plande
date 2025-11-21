import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════
	// AÑO 1
	// ═══════════════════════════════════════════════════════════
	{
		id: 2302,
		code: '02302',
		name: 'Derecho Político',
		hours: 4,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2340,
		code: '02340',
		name: 'Introducción al Estudio del Derecho',
		hours: 4,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2341,
		code: '02341',
		name: 'Historia y Evolución de las Instituciones del Derecho',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 901,
		code: '00901',
		name: 'Inglés Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2304,
		code: '02304',
		name: 'Derecho Constitucional I',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2302,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2302,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2340,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2340,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2306,
		code: '02306',
		name: 'Filosofía del Derecho',
		hours: 2,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2309,
		code: '02309',
		name: 'Economía Política',
		hours: 2,
		term: courseTerms.semestral,
		year: 1,
		requirements: []
	},
	{
		id: 2342,
		code: '02342',
		name: 'Derecho Civil y Comercial I (Parte General)',
		hours: 6,
		term: courseTerms.semestral,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2340,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2340,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2341,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2341,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 2
	// ═══════════════════════════════════════════════════════════
	{
		id: 911,
		code: '00911',
		name: 'Computación Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: []
	},
	{
		id: 2305,
		code: '02305',
		name: 'Sociología',
		hours: 2,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2306,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2306,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2314,
		code: '02314',
		name: 'Derecho Constitucional II',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2333,
		code: '02333',
		name: 'Derecho Público: Provincial y Municipal',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2343,
		code: '02343',
		name: 'Derecho Civil y Comercial II (Obligaciones Civiles y Comerciales)',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2342,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2342,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 902,
		code: '00902',
		name: 'Inglés Nivel II',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 901,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 901,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2307,
		code: '02307',
		name: 'Derecho Penal I',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2318,
		code: '02318',
		name: 'Derecho Administrativo I',
		hours: 4,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2344,
		code: '02344',
		name: 'Derecho Civil y Comercial III (Contratos Civiles y Comerciales)',
		hours: 6,
		term: courseTerms.semestral,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2343,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2343,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 3
	// ═══════════════════════════════════════════════════════════
	{
		id: 912,
		code: '00912',
		name: 'Computación Nivel II',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 911,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 911,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2311,
		code: '02311',
		name: 'Derecho Penal II',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2307,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2307,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2345,
		code: '02345',
		name: 'Derecho Civil y Comercial IV (Derechos Reales y Garantías)',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2344,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2344,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2346,
		code: '02346',
		name: 'Derecho Empresario I (Sociedades Comerciales y Concursos)',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2344,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2344,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2316,
		code: '02316',
		name: 'Derecho Procesal I',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2314,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2314,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2311,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2311,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2327,
		code: '02327',
		name: 'Derecho Administrativo II',
		hours: 4,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2318,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2318,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2347,
		code: '02347',
		name: 'Derecho Civil y Comercial V (Derecho de Familia y Sucesiones)',
		hours: 6,
		term: courseTerms.semestral,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2345,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2345,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 4
	// ═══════════════════════════════════════════════════════════
	{
		id: 903,
		code: '00903',
		name: 'Inglés Nivel III',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 902,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 902,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2323,
		code: '02323',
		name: 'Derecho Procesal II',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2316,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2316,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2347,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2347,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2324,
		code: '02324',
		name: 'Derecho Internacional Público',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2314,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2314,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2348,
		code: '02348',
		name: 'Derecho del Trabajo y la Seguridad Social',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2344,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2344,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 904,
		code: '00904',
		name: 'Inglés Nivel IV',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 903,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 903,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2312,
		code: '02312',
		name: 'Finanzas y Derecho Tributario',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2319,
		code: '02319',
		name: 'Política Económica',
		hours: 2,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2338,
		code: '02338',
		name: 'Taller de Retórica y Oratoria Forense',
		hours: 4,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2349,
		code: '02349',
		name: 'Derecho Empresario II (Títulos Valores, Concursos y Quiebras)',
		hours: 6,
		term: courseTerms.semestral,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2348,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2348,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2346,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2346,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 5
	// ═══════════════════════════════════════════════════════════
	{
		id: 2325,
		code: '02325',
		name: 'Metodología de la Investigación Jurídica',
		hours: 2,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2349,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2349,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2347,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2347,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2306,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 2306,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2328,
		code: '02328',
		name: 'Derecho Ambiental y de los Recursos Naturales',
		hours: 4,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2314,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2314,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2334,
		code: '02334',
		name: 'Seminario de Resolución Adecuada de Controversias',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2335,
		code: '02335',
		name: 'Práctica Profesional I',
		hours: 8,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2327,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2327,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2348,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 2348,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2329,
		code: '02329',
		name: 'Derecho Internacional Privado',
		hours: 6,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2349,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2349,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2336,
		code: '02336',
		name: 'Práctica Profesional II',
		hours: 8,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2335,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2335,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2337,
		code: '02337',
		name: 'Seminario de Derecho de los Consumidores',
		hours: 4,
		term: courseTerms.semestral,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2346,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2346,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 2327,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2327,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2323,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 2323,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const unlamDdcpAb2018: StudyPlan = {
	courses,
	degreeName: 'Abogacía',
	degreeSlug: 'AB',
	universityName: 'Universidad Nacional de La Matanza',
	universitySlug: 'UNLaM',
	collegeName: 'Departamento de Derecho y Ciencia Política',
	collegeSlug: 'DDCP',
	durationYears: 5,
	year: 2018,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2018',
			url: 'https://www.unlam.edu.ar/wp-content/uploads/2024/08/Abogacia-PLAN-DE-ESTUDIOS.pdf'
		}
	]
};
