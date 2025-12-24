import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// PRIMER AÑO
	// ═══════════════════════════════════════════════════════════════════════════

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 1
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 1,
		code: 'N1',
		name: 'Análisis I',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 102,
		code: 'CB02',
		name: 'Ciencia, Tecnología y Sociedad',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 103,
		code: 'CB03',
		name: 'Química General',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 104,
		code: 'CB04',
		name: 'Biología I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 2
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 2,
		code: 'N2',
		name: 'Introducción a la Biotecnología',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 104,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 102,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 102,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 106,
		code: 'CB06',
		name: 'Álgebra y Geometría Analítica',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 107,
		code: 'CB07',
		name: 'Biología II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 103,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 104,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 108,
		code: 'CB08',
		name: 'Química Inorgánica',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
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
				requiredCourseId: 103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 103,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// SEGUNDO AÑO
	// ═══════════════════════════════════════════════════════════════════════════

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 3
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 112,
		code: 'CB12',
		name: 'Química Orgánica',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 108,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 108,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		code: 'N10',
		name: 'Análisis II',
		hours: 8,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 110,
		code: 'CB10',
		name: 'Física I',
		hours: 8,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 4
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 3,
		code: 'N3',
		name: 'Física II',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
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
				requiredCourseId: 110,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 110,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 111,
		code: 'CB11',
		name: 'Biología III',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 114,
		code: 'CB14',
		name: 'Estadística Aplicada',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4,
		code: 'N4',
		name: 'Química Biológica I',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 112,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 112,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// TERCER AÑO
	// ═══════════════════════════════════════════════════════════════════════════

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 5
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 116,
		code: 'CB16',
		name: 'Fisicoquímica',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 108,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 108,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 117,
		code: 'CB17',
		name: 'Genética General',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 114,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 114,
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
			}
		]
	},
	{
		id: 5,
		code: 'N5',
		name: 'Química Biológica II',
		hours: 8,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 119,
		code: 'CB19',
		name: 'Biología IV',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 112,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 112,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 6
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 11,
		code: 'N11',
		name: 'Microbiología',
		hours: 12,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 117,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 117,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 122,
		code: 'CB22',
		name: 'Biología Celular',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 111,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 111,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 7,
		code: 'N7',
		name: 'Introducción a la Bioinformática',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 114,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 114,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 107,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 107,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// CUARTO AÑO
	// ═══════════════════════════════════════════════════════════════════════════

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 7
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 123,
		code: 'CB23',
		name: 'Inmunología Básica',
		hours: 4,
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
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 117,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 117,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: 'N12',
		name: 'Genética Molecular',
		hours: 14,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 117,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 117,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 11,
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
				requiredCourseId: 122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: 'N6',
		name: 'Química Analítica',
		hours: 6.5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 112,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 112,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 114,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 114,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 116,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 116,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 8
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 157,
		code: '00157',
		name: 'Inmunología Molecular',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 123,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 123,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 12,
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
		id: 162,
		code: '00162',
		name: 'Biotecnología Animal',
		hours: 8,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 155,
		code: '00155',
		name: 'Bioquímica de Proteínas',
		hours: 8,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 116,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 116,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// QUINTO AÑO
	// ═══════════════════════════════════════════════════════════════════════════

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 9
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 159,
		code: '00159',
		name: 'Biotecnología Vegetal',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 119,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 119,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 7,
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
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 8,
		code: 'N8',
		name: 'Bioprocesos',
		hours: 9,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
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
				requiredCourseId: 116,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 116,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: 'N13',
		name: 'Métodos de Análisis de Biomoléculas',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
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
			},
			{
				id: 3,
				requiredCourseId: 157,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 157,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 7,
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

	// ─────────────────────────────────────────────────────────────────────────────
	// Cuatrimestre 10
	// ─────────────────────────────────────────────────────────────────────────────
	{
		id: 9,
		code: 'N9',
		name: 'Proyectos Biotecnológicos',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
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
				requiredCourseId: 159,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 159,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 162,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 162,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const unsamEbynLb: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Biotecnología',
	degreeSlug: 'LB',
	universityName: 'Universidad Nacional de San Martín',
	universitySlug: 'UNSAM',
	collegeName: 'Escuela de Bio y Nanotecnologías',
	collegeSlug: 'EByN',
	durationYears: 5,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios (Web)',
			url: 'https://www.unsam.edu.ar/escuelas/ebyn/233/ebyn/biotecnologia'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para cursar asignaturas del **7° cuatrimestre o posteriores** (4<sup>to</sup> año en adelante), se debe haber aprobado un examen de suficiencia de idioma **inglés escrito**, consistente en la lectura y comprensión de textos científicos.'
		}
	]
};
