import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ========== PRIMER AÑO ==========
	{
		id: 1,
		code: '70009',
		name: 'Álgebra',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '7M008',
		name: 'Análisis Matemático I',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: 'F0017',
		name: 'Lógica',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: 'N0007',
		name: 'Geometría Analítica',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// ========== SEGUNDO AÑO ==========
	{
		id: 5,
		code: 'N0008',
		name: 'Geometría',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
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
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: '7M010',
		name: 'Análisis Matemático II',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 7,
		code: 'C0048',
		name: 'Fundamentos de la Educación',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 8,
		code: '70027',
		name: 'Álgebra Lineal',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
		code: 'C0050',
		name: 'Psicología y Cultura en el Proceso Educativo',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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

	// ========== TERCER AÑO ==========
	{
		id: 10,
		code: '70049',
		name: 'Matemática III',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
			},
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '70052',
		name: 'Matemáticas Especiales',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '70013',
		name: 'Física I',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: 'C0008',
		name: 'Historia y Política del Sistema Educativo Argentino',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '70029',
		name: 'Elementos de Matemática Aplicada',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '70020',
		name: 'Física II',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ========== CUARTO AÑO ==========
	{
		id: 16,
		code: '12001',
		name: 'Astronomía General',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 17,
		code: 'F0006',
		name: 'Filosofía de las Ciencias',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: 'N0010',
		name: 'Didáctica Específica I y Prácticas Docentes en Matemática',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
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
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 14,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '70046',
		name: 'Investigación Operativa I',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ========== QUINTO AÑO ==========
	{
		id: 20,
		code: 'N0011',
		name: 'Didáctica Específica II y Prácticas Docentes en Matemática',
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: 'NB012',
		name: 'Seminario',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 22,
		code: 'B0032',
		name: 'Capacitación en Informática',
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},

	// ========== TERCER AÑO - OPTATIVAS ==========
	{
		id: 23,
		code: '70005',
		name: 'Complementos de Análisis',
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
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
		id: 24,
		code: '70048',
		name: 'Estructuras Algebraicas',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
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
		id: 25,
		code: '70054',
		name: 'Geometría Diferencial',
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
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
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '70050',
		name: 'Probabilidades I',
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ========== CUARTO AÑO - OPTATIVAS ==========
	{
		id: 27,
		code: '33001',
		name: 'Tecnología Educativa',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		code: 'C0013',
		name: 'Investigación Educativa II',
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: 'F0016',
		name: 'Introducción a la Filosofía',
		term: courseTerms.semestral,
		type: courseTypes.optative,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		code: 'C0011',
		name: 'Sociología de la Educación',
		term: courseTerms.secondSemester,
		type: courseTypes.optative,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ========== IDIOMAS TRANSVERSALES ==========
	{
		id: 10005,
		code: 'M0005',
		name: 'Francés',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10007,
		code: 'M0007',
		name: 'Italiano',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10009,
		code: 'M0009',
		name: 'Portugués',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10001,
		code: 'M0001',
		name: 'Alemán',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10003,
		code: 'M0003',
		name: 'Inglés',
		term: courseTerms.firstSemester,
		type: courseTypes.optative,
		attributes: [courseAttributes.transversal],
		requirements: []
	}
];

export const unlpFahcePm2003: StudyPlan = {
	courses,
	degreeName: 'Profesorado de Matemática',
	degreeSlug: 'PM',
	universityName: 'Universidad Nacional de La Plata',
	universitySlug: 'UNLP',
	collegeName: 'Facultad de Humanidades y Ciencias de la Educación',
	collegeSlug: 'FaHCE',
	durationYears: 5,
	year: 2003,
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 4
	},
	sources: [
		{
			id: 1,
			label: 'Sitio web de la carrera',
			url: 'https://www.fahce.unlp.edu.ar/facultad/secretarias-y-prosecretarias/academica/deptos/ciencias-exactas-y-naturales/carreras/profesorado-de-matematica'
		},
		{
			id: 2,
			label: 'Plan de Estudios (descarga PDF)',
			url: 'https://www.fahce.unlp.edu.ar/facultad/secretarias-y-prosecretarias/academica/deptos/ciencias-exactas-y-naturales/carreras/profesorado-de-matematica/@@edit/++widget++form.widgets.IArchivos.archivos/@@download/0'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Optativas:** Para completar la carrera se deben aprobar **4 materias optativas**: 1 de las Optativas I (Complementos de Análisis, Estructuras Algebraicas, Geometría Diferencial o Probabilidades I), 1 de las Optativas II (Tecnología Educativa, Investigación Educativa II, Introducción a la Filosofía o Sociología de la Educación), 1 idioma latino (Francés, Italiano o Portugués) y 1 idioma germánico (Alemán o Inglés).'
		}
	]
};
