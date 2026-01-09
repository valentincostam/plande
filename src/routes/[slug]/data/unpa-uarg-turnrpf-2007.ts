import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';

import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════
	// PRIMER AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 420,
		code: '0420',
		name: 'Química I',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 387,
		code: '0387',
		name: 'Matemática I',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 324,
		code: '0324',
		name: 'Biología General',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 901,
		code: '0901',
		name: 'Análisis y Producción del Discurso',
		hours: 2,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1669,
		code: '1669',
		name: 'Estadística',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Correlativa: 0387
			{
				id: 1,
				requiredCourseId: 387,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 387,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 399,
		code: '0399',
		name: 'Física Aplicada',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Correlativa: 0387
			{
				id: 1,
				requiredCourseId: 387,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 387,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 396,
		code: '0396',
		name: 'Botánica',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Correlativa: 0324
			{
				id: 1,
				requiredCourseId: 324,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 324,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// SEGUNDO AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 1685,
		code: '1685',
		name: 'Agrometeorología',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativas: 0399/1669
			{
				id: 1,
				requiredCourseId: 399,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1669,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 399,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1669,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 400,
		code: '0400',
		name: 'Química II',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 0420
			{
				id: 1,
				requiredCourseId: 420,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 420,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 395,
		code: '0395',
		name: 'Economía General',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 0387
			{
				id: 1,
				requiredCourseId: 387,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 387,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 404,
		code: '0404',
		name: 'Edafología',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativas: 0420/0399
			{
				id: 1,
				requiredCourseId: 420,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 399,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 420,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 399,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1686,
		code: '1686',
		name: 'Manejo de Aguas',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 0404
			{
				id: 1,
				requiredCourseId: 404,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 404,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1752,
		code: '1752',
		name: 'Fisiología Vegetal',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativas: 0400/0396
			{
				id: 1,
				requiredCourseId: 400,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 396,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 400,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 396,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 402,
		code: '0402',
		name: 'Ecología',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 0396
			{
				id: 1,
				requiredCourseId: 396,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 396,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 407,
		code: '0407',
		name: 'Cartografía y Teledetección',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 1669
			{
				id: 1,
				requiredCourseId: 1669,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1669,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// TERCER AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 1753,
		code: '1753',
		name: 'Cultivos Intensivos I',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 0402/1752
			{
				id: 1,
				requiredCourseId: 402,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1752,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 402,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1752,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 424,
		code: '0424',
		name: 'Impacto Ambiental',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 0407/0402
			{
				id: 1,
				requiredCourseId: 407,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 402,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 402,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1705,
		code: '1705',
		name: 'Producción Ovina',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 0402
			{
				id: 1,
				requiredCourseId: 402,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 402,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1709,
		code: '1709',
		name: 'Administración y Comercialización',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 0395
			{
				id: 1,
				requiredCourseId: 395,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 395,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1754,
		code: '1754',
		name: 'Cultivos Intensivos II',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 1753
			{
				id: 1,
				requiredCourseId: 1753,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1753,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 415,
		code: '0415',
		name: 'Formulación de Proyectos',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 1709
			{
				id: 1,
				requiredCourseId: 1709,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1709,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1755,
		code: '1755',
		name: 'Evaluación de Pastizales',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 0407
			{
				id: 1,
				requiredCourseId: 407,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1756,
		code: '1756',
		name: 'Seminario Optativo',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 3,
		requirements: []
	}
];

export const unpaUargTurnrpf2007: StudyPlan = {
	courses,
	degreeName:
		'Tecnicatura Universitaria en Recursos Naturales Renovables (Orientación Producción Frutihortícola)',
	degreeSlug: 'TURNRPF',
	universityName: 'Universidad Nacional de la Patagonia Austral',
	universitySlug: 'UNPA',
	collegeName: 'Unidad Académica Río Gallegos',
	collegeSlug: 'UARG',
	durationYears: 3,
	year: 2007,
	progress: { type: 'mandatory-only' },
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://propuestaacademica.unpa.edu.ar/controladores/descargarPlan.php?plan=RN03&nombre=Tec.%20Univ.%20en%20Rec.%20Nat.%20Renov.%20%28Or.%20Prod.%20Frutihort%C3%ADcola%29'
		},
		{
			id: 2,
			label: 'Resolución RCS 130/2007',
			url: 'https://www.uarg.unpa.edu.ar/apps/digesto/INSTRU_LEGALES/RECT/CS/2007/RCS20070130.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Práctica**: Práctica de Horticultura y Fruticultura requerida para obtener el título.'
		},
		{
			id: 2,
			text: '**Idioma/Ofimática**: Aprobar examen de suficiencia de Idioma Inglés y nivel de Ofimática antes de cursar el 3° año (se ofrecerán cursos extracurriculares opcionales).'
		}
	]
};
