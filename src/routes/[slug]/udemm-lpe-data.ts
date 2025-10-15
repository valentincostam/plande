import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
	// First Year - First Semester
	{
		id: 200,
		code: 'H0200',
		name: 'Psicología General I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: 'H0002',
		name: 'Bases Biológicas y Neurológicas',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 308,
		code: 'H0308',
		name: 'Historia Educacional',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 202,
		code: 'H0202',
		name: 'Epistemología y Lógica',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 203,
		code: 'H0203',
		name: 'Filosofía',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 9,
		code: 'H0009',
		name: 'Fundamentos de Sociología',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 254,
		code: 'H0254',
		name: 'Inglés I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},

	// First Year - Second Semester
	{
		id: 201,
		code: 'H0201',
		name: 'Psicología General II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 200,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 12,
		code: 'H0012',
		name: 'Neuropsicología',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 204,
		code: 'H0204',
		name: 'Metodología de las Ciencias',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 202,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 21,
		code: 'H0021',
		name: 'Psicosociología Educacional',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 308,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 205,
		code: 'H0205',
		name: 'Antropología',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// Second Year - First Semester
	{
		id: 235,
		code: 'H0235',
		name: 'Fundamentos del Psicoanálisis I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
			// Note: H0013 (Psicología de la Personalidad) referenced in web but missing from curriculum
		]
	},
	{
		id: 206,
		code: 'H0206',
		name: 'Psicología del Desarrollo I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 309,
		code: 'H0309',
		name: 'Psicopedagogía Cognitiva I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 10,
		code: 'H0010',
		name: 'Psicología Social',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 237,
		code: 'H0237',
		name: 'Psicopatología I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
			// Note: H0013 (Psicología de la Personalidad) referenced in web but missing from curriculum
		]
	},
	{
		id: 255,
		code: 'H0255',
		name: 'Inglés II',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 254,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Second Year - Second Semester
	{
		id: 236,
		code: 'H0236',
		name: 'Fundamentos del Psicoanálisis II',
		hours: undefined,
		term: courseTerms.secondSemester,
		tag: courseTags.mandatoryFinalExam,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 235,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 310,
		code: 'H0310',
		name: 'Psicopedagogía Cognitiva II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 309,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 238,
		code: 'H0238',
		name: 'Psicopatología II',
		hours: undefined,
		term: courseTerms.secondSemester,
		tag: courseTags.mandatoryFinalExam,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 237,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 207,
		code: 'H0207',
		name: 'Psicología del Desarrollo II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 20,
		code: 'H0020',
		name: 'Dinámica de Grupos',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		code: 'H0015',
		name: 'Evaluación y Técnicas Psicológicas I',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 2,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Third Year - First Semester
	{
		id: 42,
		code: 'H0042',
		name: 'Diagnóstico Psicopedagógico I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		code: 'H0018',
		name: 'Evaluación y Técnicas Psicológicas II',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 236,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
			// Note: H0011 referenced in web but missing from curriculum
		]
	},
	{
		id: 45,
		code: 'H0045',
		name: 'Didáctica I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 311,
		code: 'H0311',
		name: 'Psicopedagogía Institucional y Organizacional',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 247,
		code: 'H0247',
		name: 'Trabajo en Instituciones I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Todo 1º y 2º año - simplified to key courses
			{
				id: 6,
				requiredCourseId: 203,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 204,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 205,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 255,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 19,
				requiredCourseId: 236,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 310,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 21,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 207,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 23,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Third Year - Second Semester
	{
		id: 46,
		code: 'H0046',
		name: 'Didáctica II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 45,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 56,
		code: 'H0056',
		name: 'Psicomotricidad',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 43,
		code: 'H0043',
		name: 'Psicopedagogía en Educación Especial I',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 207,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 1,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 210,
		code: 'H0210',
		name: 'Ética y Deontología Profesional',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 203,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 248,
		code: 'H0248',
		name: 'Trabajo en Instituciones II',
		hours: undefined,
		term: courseTerms.secondSemester,
		tag: courseTags.mandatoryFinalExam,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 247,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 50,
		code: 'H0050',
		name: 'Diagnóstico Psicopedagógico II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 91,
		name: 'Materia Electiva I',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		tag: courseTags.elective,
		requirements: []
	},

	// Fourth Year - First Semester
	{
		id: 302,
		code: 'H0302',
		name: 'Clínica Psicopedagógica I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 248,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
			// Note: H0049 referenced in web but missing from curriculum
		]
	},
	{
		id: 52,
		code: 'H0052',
		name: 'Observación y Práctica Profesional',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Note: H0049 referenced in web but missing from curriculum
			{
				id: 2,
				requiredCourseId: 248,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 33,
		code: 'H0033',
		name: 'Orientación Vocacional y Ocupacional',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 249,
		code: 'H0249',
		name: 'Pre-Residencia I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 248,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 260,
		code: 'H0260',
		name: 'Pre-Residencia II',
		hours: undefined,
		term: courseTerms.secondSemester,
		tag: courseTags.mandatoryFinalExam,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 249,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 55,
		code: 'H0055',
		name: 'Psicopedagogía en Educación Especial II',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Fourth Year - Second Semester
	{
		id: 303,
		code: 'H0303',
		name: 'Seminario y Trabajo de Integración Final I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Todo 3º año - simplified to key courses
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 311,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 46,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 56,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 210,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 248,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 50,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 91,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 53,
		code: 'H0053',
		name: 'Tratamiento Psicopedagógico',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 304,
		code: 'H0304',
		name: 'Clínica Psicopedagógica II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 302,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 305,
		code: 'H0305',
		name: 'Seminario y Trabajo de Integración Final II',
		hours: undefined,
		term: courseTerms.secondSemester,
		tag: courseTags.mandatoryFinalExam,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 303,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 302,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 52,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 53,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 55,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 249,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 92,
		name: 'Materia Electiva II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			// All the courses from Fourth Year - First Semester
			{
				id: 1,
				requiredCourseId: 302,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 303,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 52,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 53,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 55,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 249,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 256,
		code: 'H0256',
		name: 'Computación',
		hours: undefined,
		term: courseTerms.secondSemester, // Default to second semester as not specified
		year: 4,
		requirements: []
	},

	// Fifth Year (as mentioned in web data)
	{
		id: 93,
		name: 'Materia Electiva III',
		hours: undefined,
		term: courseTerms.firstSemester, // Default to first semester as not specified
		year: 5,
		tag: courseTags.elective,
		requirements: [
			// Todo 1º, 2º y 3º año - simplified to key courses
			{
				id: 26,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 28,
				requiredCourseId: 311,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 30,
				requiredCourseId: 46,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 31,
				requiredCourseId: 56,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 32,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 33,
				requiredCourseId: 210,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 34,
				requiredCourseId: 248,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 35,
				requiredCourseId: 50,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 36,
				requiredCourseId: 91,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 257,
		code: 'H0257',
		name: 'Trabajo Integrador Final',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// 1º a 4º año - simplified to key courses
			{
				id: 39,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 41,
				requiredCourseId: 260,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 45,
				requiredCourseId: 304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 46,
				requiredCourseId: 305,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 47,
				requiredCourseId: 92,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 48,
				requiredCourseId: 256,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 233,
		code: 'H0233',
		name: 'Práctica Profesional Supervisada II',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Note: H0232 referenced in web but missing from curriculum
		]
	}
];

export const udemmLpeData: CareerData = {
	courses,
	degree: 'Licenciatura en Psicopedagogía',
	years: 4,
	college: 'UdeMM',
	studyProgram: 'Plan de Estudios',
	progress: {
		type: 'mandatory-plus-one-elective',
		requiredElectiveCount: 2
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicopedagogia/'
		},
		{
			id: 2,
			label: 'Correlatividades',
			url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicopedagogia/correlatividades-licenciatura-en-psicopedagogia/'
		},
		{
			id: 3,
			label: 'Plan de Estudios (PDF)',
			url: 'https://drive.google.com/file/d/1YBouzWEkKuIJF6gTEPMfW1ezHXYuv_6H/view?usp=sharing'
		}
	],
	notes: [
		{
			id: 1,
			text: 'La carrera otorga el título intermedio de **Asistente Psicopedagógico R.M. N° 995/03** al completar el 3<sup>er</sup> año.'
		},
		{
			id: 2,
			text: 'Para rendir el examen final de **Seminario y Trabajo de Integración Final II** (4<sup>to</sup> año) se debe tener aprobadas todas las asignaturas curriculares, extracurriculares y las electivas correspondientes del plan de estudios.'
		},
		{
			id: 3,
			text: `Opciones de materias electivas de 3<sup>er</sup> año:\
        \n - H0209. **Lenguaje y Comunicación**
        \n - H0014. **Técnicas de Abordaje e Intervención en Crisis**
        \n - H0218. **Comunicación**
        \n - H0306. **Taller de Escritura**
      `
		},
		{
			id: 4,
			text: `Opciones de materias electivas de 4<sup>to</sup> año:\
        \n - H0222. **Psicología de la Tercera Edad**
        \n - H0307. **Psicopedagogía Familiar**
        \n - H0019. **Evaluación y Técnicas Psicológicas III**
        \n - H0022. **Psicología Jurídica**
      `
		},
		{
			id: 5,
			text: 'Se simplificaron las correlatividades eliminando requisitos redundantes para facilitar la lectura del plan, especialmente en materias con requisitos como *"Todo 1º y 2º año"* y *"Todo 3º año"*.'
		},
		{
			id: 6,
			text: '**Cursos faltantes detectados en correlatividades (en la web)**: H0013 (posiblemente "Psicología de la Personalidad"), H0011, H0049, H0232. Estos códigos aparecen en las correlatividades pero no están presentes en el plan de estudios oficial.'
		}
	]
};
