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
		id: 388,
		code: '0388',
		name: 'Sistemas Naturales',
		hours: 6,
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
		id: 1527,
		code: '1527',
		name: 'Química General',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 12,
		code: '0012',
		name: 'Introducción al Conocimiento Científico',
		hours: 4,
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
		id: 390,
		code: '0390',
		name: 'Matemática II',
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
		id: 324,
		code: '0324',
		name: 'Biología General',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 391,
		code: '0391',
		name: 'Principios de Geología',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// SEGUNDO AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 393,
		code: '0393',
		name: 'Estadística y Diseño Experimental',
		hours: 9,
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
		id: 399,
		code: '0399',
		name: 'Física Aplicada',
		hours: 9,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 0390
			{
				id: 1,
				requiredCourseId: 390,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 390,
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
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
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
	{
		id: 397,
		code: '0397',
		name: 'Zoología',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
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
	{
		id: 1903,
		code: '1903',
		name: 'Química Biológica',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Correlativa: 1527
			{
				id: 1,
				requiredCourseId: 1527,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1527,
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
			// Correlativa: 0391
			{
				id: 1,
				requiredCourseId: 391,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 391,
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
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// TERCER AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 404,
		code: '0404',
		name: 'Edafología',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 1527/0391
			{
				id: 1,
				requiredCourseId: 1527,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 391,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 1527,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 391,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 402,
		code: '0402',
		name: 'Ecología',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 0393/0396/0397
			{
				id: 1,
				requiredCourseId: 393,
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
				requiredCourseId: 397,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 393,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 396,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 397,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 403,
		code: '0403',
		name: 'Nutrición Animal',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 0397/1903
			{
				id: 1,
				requiredCourseId: 397,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1903,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 397,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1903,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 392,
		code: '0392',
		name: 'Administración Estratégica',
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
		id: 1904,
		code: '1904',
		name: 'Tecnología de Gestión de las Organizaciones',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativa: 0392
			{
				id: 1,
				requiredCourseId: 392,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 392,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 408,
		code: '0408',
		name: 'Relación Suelo-Planta-Animal',
		hours: 6,
		term: courseTerms.secondSemester,
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
		id: 398,
		code: '0398',
		name: 'Genética',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Correlativas: 0324/0393
			{
				id: 1,
				requiredCourseId: 324,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 393,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 324,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 393,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 394,
		code: '0394',
		name: 'Fundamentos de Limnología y Oceanografía',
		hours: 8,
		term: courseTerms.secondSemester,
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

	// ═══════════════════════════════════════════════════════════
	// CUARTO AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 1905,
		code: '1905',
		name: 'Manejo de Recursos Hídricos',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
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
		id: 1906,
		code: '1906',
		name: 'Manejo de Recursos Bioacuáticos',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Correlativa: 0394
			{
				id: 1,
				requiredCourseId: 394,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 394,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 425,
		code: '0425',
		name: 'Dinámica Poblacional',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
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
		id: 410,
		code: '0410',
		name: 'Manejo de Bosques',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
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
		id: 1907,
		code: '1907',
		name: 'Evaluación y Manejo de Pastizales',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Correlativa: 0408
			{
				id: 1,
				requiredCourseId: 408,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 408,
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
		year: 4,
		requirements: [
			// Correlativa: 1904
			{
				id: 1,
				requiredCourseId: 1904,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1904,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// QUINTO AÑO
	// ═══════════════════════════════════════════════════════════
	{
		id: 424,
		code: '0424',
		name: 'Impacto Ambiental',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
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
		id: 409,
		code: '0409',
		name: 'Manejo de Fauna',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Correlativa: 0425
			{
				id: 1,
				requiredCourseId: 425,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 425,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// MATERIAS OPTATIVAS (se deben cursar 4 de 8)
	// ═══════════════════════════════════════════════════════════
	{
		id: 413,
		code: '0413',
		name: 'Forrajes',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0403/0408
			{
				id: 1,
				requiredCourseId: 403,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 408,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 403,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 408,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 432,
		code: '0432',
		name: 'Forestación y Viveros',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0396/0404
			{
				id: 1,
				requiredCourseId: 396,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 404,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 396,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 404,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 417,
		code: '0417',
		name: 'Producción Ovina',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0403/1907
			{
				id: 1,
				requiredCourseId: 403,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1907,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 403,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1907,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 416,
		code: '0416',
		name: 'Tecnología Pesquera',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 5,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 1903/1906
			{
				id: 1,
				requiredCourseId: 1903,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1906,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 1903,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1906,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 406,
		code: '0406',
		name: 'Acuicultura',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.optative,
		requirements: [
			// Correlativa: 0394
			{
				id: 1,
				requiredCourseId: 394,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 394,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 433,
		code: '0433',
		name: 'Frutihorticultura',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0396/0404
			{
				id: 1,
				requiredCourseId: 396,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 404,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 396,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 404,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 418,
		code: '0418',
		name: 'Producción Bovina',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 5,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0403/1907
			{
				id: 1,
				requiredCourseId: 403,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1907,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 403,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 1907,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1908,
		code: '1908',
		name: 'Energías Renovables',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		type: courseTypes.optative,
		requirements: [
			// Correlativas: 0390/0399
			{
				id: 1,
				requiredCourseId: 390,
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
				requiredCourseId: 390,
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
	}
];

export const unpaUargIrnr: StudyPlan = {
	courses,
	degreeName: 'Ingeniería en Recursos Naturales Renovables',
	degreeSlug: 'IRNR',
	universityName: 'Universidad Nacional de la Patagonia Austral',
	universitySlug: 'UNPA',
	collegeName: 'Unidad Académica Río Gallegos',
	collegeSlug: 'UARG',
	durationYears: 5,
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 4
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://propuestaacademica.unpa.edu.ar/controladores/descargarPlan.php?plan=RN04&nombre=Ingenier%C3%ADa%20en%20Recursos%20Naturales'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Seminario**: Una vez al año, la Universidad ofrecerá un Seminario de 40 hs de duración como mínimo. Los alumnos deberán aprobar un Seminario a lo largo de la Carrera. Sólo podrán cursarlo aquellos alumnos que posean al menos 15 asignaturas del plan de estudios en condición regular.'
		},
		{
			id: 2,
			text: '**Idioma**: El alumno deberá aprobar el Idioma Inglés, con nivel de suficiencia para interpretación de textos, antes de cursar el primer cuatrimestre del 3° año de la Carrera.'
		},
		{
			id: 3,
			text: '**Trabajos de Campo o Práctica Profesional**: Requisito adicional para completar la carrera.'
		}
	]
};
