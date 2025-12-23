import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';

import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// NIVEL I (Year 1)
	{
		id: 951190,
		code: '951190',
		name: 'Integración I',
		hours: 3,
		term: courseTerms.annual,
		year: 1,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: []
	},
	{
		id: 951604,
		code: '951604',
		name: 'Ingeniería y Sociedad',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 950701,
		code: '950701',
		name: 'Álgebra y Geometría Analítica',
		hours: 10,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 950702,
		code: '950702',
		name: 'Análisis Matemático I',
		hours: 10,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 950703,
		code: '950703',
		name: 'Análisis Matemático II',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950701,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950702,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950701,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951407,
		code: '951407',
		name: 'Química General',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 951601,
		code: '951601',
		name: 'Sistemas de Representación',
		hours: 3,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 951199,
		code: '951199',
		name: 'Fundamentos de Informática',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// NIVEL II (Year 2)
	{
		id: 951191,
		code: '951191',
		name: 'Integración II',
		hours: 3,
		term: courseTerms.annual,
		year: 2,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 951190,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950702,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951407,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951190,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 950704,
		code: '950704',
		name: 'Probabilidad y Estadística',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950701,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950702,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950701,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951122,
		code: '951122',
		name: 'Química Inorgánica',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951407,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 950605,
		code: '950605',
		name: 'Física I',
		hours: 10,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 950606,
		code: '950606',
		name: 'Física II',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950702,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950605,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951123,
		code: '951123',
		name: 'Química Orgánica',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951407,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951602,
		code: '951602',
		name: 'Inglés I',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 951198,
		code: '951198',
		name: 'Matemática Superior Aplicada',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950703,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950701,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// NIVEL III (Year 3)
	{
		id: 951192,
		code: '951192',
		name: 'Integración III',
		hours: 3,
		term: courseTerms.annual,
		year: 3,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 950703,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951191,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951190,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 951199,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951125,
		code: '951125',
		name: 'Termodinámica',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950703,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950701,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 950309,
		code: '950309',
		name: 'Economía',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951191,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951604,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 950310,
		code: '950310',
		name: 'Legislación',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951191,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951604,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951127,
		code: '951127',
		name: 'Mecánica Eléctrica Industrial',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951128,
		code: '951128',
		name: 'Fisicoquímica',
		hours: 8,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951125,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951125,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951129,
		code: '951129',
		name: 'Fenómenos del Transporte',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951125,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951125,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951130,
		code: '951130',
		name: 'Química Analítica',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951603,
		code: '951603',
		name: 'Inglés II',
		hours: 4,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951602,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// NIVEL IV (Year 4)
	{
		id: 951131,
		code: '951131',
		name: 'Integración IV',
		hours: 3,
		term: courseTerms.annual,
		year: 4,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 951192,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951127,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 951602,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 951601,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 951127,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951132,
		code: '951132',
		name: 'Operaciones Unitarias I',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951133,
		code: '951133',
		name: 'Tecnología de la Energía Térmica',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951193,
		code: '951193',
		name: 'Biotecnología',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951128,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951123,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951128,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951135,
		code: '951135',
		name: 'Operaciones Unitarias II',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951128,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951128,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951194,
		code: '951194',
		name: 'Ingeniería de las Reacciones Químicas',
		hours: 10,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951128,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951128,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951197,
		code: '951197',
		name: 'Organización Industrial',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// NIVEL V (Year 5)
	{
		id: 951196,
		code: '951196',
		name: 'Integración V - Proyecto Final',
		hours: 6,
		term: courseTerms.annual,
		year: 5,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.integrative],
		requirements: [
			{
				id: 1,
				requiredCourseId: 951131,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951194,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951127,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 951603,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 951138,
		code: '951138',
		name: 'Control Automático de Procesos',
		hours: 8,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951198,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951133,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951129,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951198,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 951133,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 951147,
		code: '951147',
		name: 'Control Estadístico de Procesos',
		hours: 4,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951128,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950704,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951128,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Práctica Profesional Supervisada
	{
		id: 951699,
		code: '951699',
		name: 'Práctica Profesional Supervisada',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951192,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951127,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951129,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951191,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 951602,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 951601,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 951131,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 951194,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 951603,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// TRANSVERSAL COURSES (Electives)
	{
		id: 1,
		code: '951170',
		name: 'Gestión de la Calidad',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951604,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951190,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951604,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951190,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 2,
		code: '951159',
		name: 'Cálculo por Elementos Finitos',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951198,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951198,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3,
		code: '951179',
		name: 'Química Analítica Aplicada',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951130,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4,
		code: '951171',
		name: 'Seguridad e Higiene Laboral',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951190,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950605,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951190,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 950605,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 5,
		code: '951168',
		name: 'Introducción a la Ciencia e Ingeniería de los Materiales Metálicos',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950703,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: '951163',
		name: 'Materiales Cerámicos',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950703,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951122,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950703,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951122,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 7,
		code: '951180',
		name: 'Radioquímica y Aplicaciones Nucleares',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951407,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 950702,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 8,
		code: '951172',
		name: 'Electrónica para Ing. Química',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 9,
		code: '951154',
		name: 'Electrónica para Ing. Química II',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950606,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950606,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		code: '951178',
		name: 'Ing. de las Instalaciones',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951127,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951127,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '951660',
		name: 'Inglés Comunicacional I',
		hours: 6,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951603,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951603,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '951661',
		name: 'Inglés Comunicacional II',
		hours: 6,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951603,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951603,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951603,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: '952567',
		name: 'Tecnología y Gestión de la Energía',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951127,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951125,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951127,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951125,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '952566',
		name: 'Innovación y Emprendedorismo',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951197,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951197,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '951177',
		name: 'Diseño de Equipos',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951135,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951194,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951135,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951194,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '951183',
		name: 'Alimentos de Origen Animal',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 17,
		code: '951182',
		name: 'Alimentos de Origen Vegetal',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: '951181',
		name: 'Evaluación de Impacto Ambiental y Sustentabilidad',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '951176',
		name: 'Ingeniería y Factibilidad Ambiental',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		code: '951104',
		name: 'Ingeniería Ambiental y Sustentabilidad',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 950310,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 950309,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 951135,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 951192,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 950310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 950309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 951135,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '951185',
		name: 'Biotecnología Ambiental',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		code: '951186',
		name: 'Tratamiento Fisicoquímico de Efluentes',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951130,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951128,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951130,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 951128,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '951187',
		name: 'Reactores Biológicos',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951193,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951194,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951135,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 951193,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 951194,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 951135,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '951102',
		name: 'Reactores Nucleares',
		hours: 5,
		term: courseTerms.unknown,
		attributes: [courseAttributes.transversal],
		type: courseTypes.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 951132,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 951133,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 951132,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 951133,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const utnFrbaIq1995: StudyPlan = {
	courses,
	degreeName: 'Ingeniería Química',
	degreeSlug: 'IQ',
	universityName: 'Universidad Tecnológica Nacional',
	universitySlug: 'UTN',
	collegeName: 'Facultad Regional Buenos Aires',
	collegeSlug: 'FRBA',
	durationYears: 5,
	year: 1995,
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 44
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 1995',
			url: 'https://frba.utn.edu.ar/quimica/plan-estudios-95-adecuado/'
		},
		{
			id: 2,
			label: 'Correlativas de Plan de Estudios 1995',
			url: 'https://frba.utn.edu.ar/quimica/correlativas-plan-estudios-95-adecuado/'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para rendir **Proyecto Final (Integración V)**, es necesario aprobar todas las materias del Plan de Estudios.'
		},
		{
			id: 2,
			text: '**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura un año académico).'
		},
		{
			id: 3,
			text: 'Debes aprobar **44 horas de cursado cuatrimestral** (o 22 horas de cursado anual) de materias electivas para cumplir con los requisitos del plan. Las electivas pueden cursarse en cualquier momento durante la carrera, siempre que se cumplan sus correlatividades (requisitos previos).'
		},

		{
			id: 4,
			text: 'Se omiten requisitos redundantes. Por ejemplo, **Análisis Matemático II** de 1<sup>er</sup> año _regular_ no se exige para cursar **Fisicoquímica** de 3<sup>er</sup> año porque ya es requisito para cursar **Termodinámica** de 3<sup>er</sup> año, que también debe estar _regular_ para rendir **Fisicoquímica**.'
		}
	]
};
