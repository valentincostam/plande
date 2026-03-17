import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	{
		id: 1,
		code: '1',
		name: 'Derecho Penal I',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2,
		code: '2',
		name: 'Nociones Elementales del Derecho Privado',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3,
		code: '3',
		name: 'Introducción a la Filosofía',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Teoría General del Derecho',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		code: '5',
		name: 'Oratoria y Análisis Crítico de Textos Jurídicos',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Sociología',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Derecho Comercial - Títulos de Crédito',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
		id: 8,
		code: '8',
		name: 'Derecho de las Obligaciones',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
		code: '9',
		name: 'Derecho de Daños',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
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
		id: 10,
		code: '10',
		name: 'Derecho Penal II',
		hours: 4,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '11',
		name: 'Conformación Histórico-Política del Estado Argentino',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 12,
		code: '12',
		name: 'Nociones de Ciencias Políticas',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
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
		id: 13,
		code: '13',
		name: 'Razonamiento Jurídico Aplicado',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
		id: 14,
		code: '14',
		name: 'Teología I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '15',
		name: 'Contratos Civiles y Comerciales I',
		hours: 5,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Contratos Civiles y Comerciales II',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 17,
		code: '17',
		name: 'Derecho Comercial - Análisis Económico del Derecho',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: '18',
		name: 'Derecho Constitucional',
		hours: 5,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '19',
		name: 'Personas Jurídicas Civiles y Comerciales',
		hours: 6,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		code: '20',
		name: 'Derecho Procesal Penal',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Introducción a las Ciencias Económicas',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		code: '22',
		name: 'Filosofía del Derecho',
		hours: 5,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Historia Comparada del Derecho',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '24',
		name: 'Teología II',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		code: '25',
		name: 'Derechos Humanos',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Derecho Comercial - Concursos y Quiebras',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 27,
		code: '27',
		name: 'Derecho Internacional Público y Derecho de la Integración',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		code: '28',
		name: 'Derecho Laboral',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: '29',
		name: 'Derecho de la Seguridad Social',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 30,
		code: '30',
		name: 'Derecho Procesal Civil y Comercial I',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 31,
		code: '31',
		name: 'Doctrina Social de la Iglesia',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 32,
		code: '32',
		name: 'Derechos Reales',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 33,
		code: '33',
		name: 'Optativa I',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 34,
		code: '34',
		name: 'Derecho Administrativo',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 35,
		code: '35',
		name: 'Derecho de Familia',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 36,
		code: '36',
		name: 'Derecho de los Recursos Naturales y Protección del Medio Ambiente',
		hours: 5,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 37,
		code: '37',
		name: 'Derecho del Consumidor y del Usuario',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 38,
		code: '38',
		name: 'Derecho Internacional Privado',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 39,
		code: '39',
		name: 'Derecho Sucesorio',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 35,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 40,
		code: '40',
		name: 'Finanzas Públicas y Derecho Tributario',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 41,
		code: '41',
		name: 'Optativa II',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 42,
		code: '42',
		name: 'Derecho Procesal Civil y Comercial II',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 43,
		code: '43',
		name: 'Ética Profesional',
		hours: 3,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 44,
		code: '44',
		name: 'Metodología de la Investigación',
		hours: 3,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const uccuyoFdcsAb2018: StudyPlan = {
	courses,
	degreeName: 'Abogacía',
	degreeSlug: 'AB',
	universityName: 'Universidad Católica de Cuyo',
	universitySlug: 'UCCuyo',
	collegeName: 'Facultad de Derecho y Ciencias Sociales',
	collegeSlug: 'FDCS',
	durationYears: 5,
	year: 2018,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Tabla de correlatividades 2021 - Abogacía Plan 2018 (Sede San Luis)',
			url: 'https://drive.google.com/file/d/1SdCGKb0X76Jio6FCHXiJV78BdTHzkd_G/view'
		},
		{
			id: 2,
			label: 'Plan de Estudios 2018 - Abogacía',
			url: 'https://derecho.uccuyosl.edu.ar/wp-content/uploads/2026/02/PlandeEstudio2018_Abogacia.pdf'
		},
		{
			id: 3,
			label: 'Resolución N° 0526-CS-2018',
			url: 'https://derecho.uccuyosl.edu.ar/wp-content/uploads/2026/02/RESOLUCION_N0526.pdf'
		}
	],
	notes: []
};
