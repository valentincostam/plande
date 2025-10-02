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
		name: 'Bases Biológicas y Neurológicas del Comportamiento',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: 'H0003',
		name: 'Historia de la Psicología',
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
		id: 4,
		code: 'H0004',
		name: 'Teorías Psicológicas Contemporáneas',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
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
		id: 205,
		code: 'H0205',
		name: 'Antropología',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 13,
		code: 'H0013',
		name: 'Psicología de la Personalidad',
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
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
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
		id: 208,
		code: 'H0208',
		name: 'Cultura y Subjetividad',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
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
		id: 209,
		code: 'H0209',
		name: 'Lenguaje y Comunicación',
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
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
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
	{
		id: 239,
		code: 'H0239',
		name: 'Psicoanálisis: Escuela Francesa',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 236,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 209,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Second Year - Second Semester
	{
		id: 238,
		code: 'H0238',
		name: 'Psicopatología II',
		hours: undefined,
		term: courseTerms.secondSemester,
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
		id: 236,
		code: 'H0236',
		name: 'Fundamentos del Psicoanálisis II',
		hours: undefined,
		term: courseTerms.secondSemester,
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
				id: 1,
				requiredCourseId: 206,
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

	// Third Year - First Semester
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
		]
	},
	{
		id: 241,
		code: 'H0241',
		name: 'Abordajes Actuales en Psicopatología',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 14,
		code: 'H0014',
		name: 'Técnicas de Abordaje e Intervención en Crisis',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 243,
		code: 'H0243',
		name: 'Observación y Práctica Profesional: Abordaje Socio-educacional',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
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
				requiredCourseId: 204,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 205,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 208,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 255,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 239,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 207,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 23,
		code: 'H0023',
		name: 'Psicología Organizacional',
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
		id: 91,
		name: 'Materia Electiva I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 3,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
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
				requiredCourseId: 204,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 205,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 208,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 255,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 239,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 238,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 207,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Third Year - Second Semester
	{
		id: 240,
		code: 'H0240',
		name: 'Intervenciones en Psicoanálisis',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 239,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 242,
		code: 'H0242',
		name: 'Modelos y Estrategias de Intervención en Psicopatología',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 241,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 244,
		code: 'H0244',
		name: 'Observación y Práctica Profesional II: Abordaje Socio-comunitario',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 243,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 19,
		code: 'H0019',
		name: 'Evaluación y Técnicas Psicológicas III',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
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
		id: 22,
		code: 'H0022',
		name: 'Psicología Jurídica',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 205,
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
				requiredCourseId: 208,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Fourth Year - First Semester
	{
		id: 211,
		code: 'H0211',
		name: 'Métodos y Técnicas Psicoterapéuticas I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 242,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 29,
		code: 'H0029',
		name: 'Psicología Clínica de Niños y Adolescentes',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 242,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 213,
		code: 'H0213',
		name: 'Psicología Preventiva y Salud Comunitaria I',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 242,
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
		term: courseTerms.firstSemester,
		year: 4,
		requirements: []
	},
	{
		id: 35,
		code: 'H0035',
		name: 'Psicoterapia Familiar',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 242,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 245,
		code: 'H0245',
		name: 'Observación y Práctica Profesional III: Clínica',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 244,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Fourth Year - Second Semester
	{
		id: 246,
		code: 'H0246',
		name: 'Observación y Práctica Profesional IV: Institucional y Jurídica',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 245,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 232,
		code: 'H0232',
		name: 'Práctica Profesional Supervisada I',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 240,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 210,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 211,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 213,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 256,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 245,
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
		id: 214,
		code: 'H0214',
		name: 'Psicología Preventiva y Salud Comunitaria II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 213,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 30,
		code: 'H0030',
		name: 'Psicología Clínica de Adultos',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 212,
		code: 'H0212',
		name: 'Métodos y Técnicas Psicoterapéuticas II',
		hours: undefined,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 211,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// Fifth Year
	{
		id: 257,
		code: 'H0257',
		name: 'Trabajo Integrador Final',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 246,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 232,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 214,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 212,
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
			{
				id: 1,
				requiredCourseId: 232,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 92,
		name: 'Materia Electiva II',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 240,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 244,
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
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 210,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const udemmLpData: CareerData = {
	courses,
	degree: 'Licenciatura en Psicología',
	years: 5,
	college: 'UDEMM',
	studyProgram: 'Plan de Estudios',
	progress: {
		type: 'mandatory-plus-one-elective',
		requiredElectiveCount: 2
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicologia/'
		},
		{
			id: 2,
			label: 'Correlatividades',
			url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicologia/correlatividades-licenciatura-en-psicologia/'
		}
	],
	notes: [
		{
			id: 1,
			text: 'El plan de estudios incluye dos materias electivas: una en 3º año y otra en 5º año.'
		},
		{
			id: 2,
			text: 'Los cursos **Intervenciones en Psicoanálisis** y **Modelos y Estrategias de Intervención en Psicopatología** tienen examen final obligatorio.'
		},
		{
			id: 3,
			text: 'La carrera otorga el título intermedio de **Acompañante Terapéutico**.'
		},
		{
			id: 4,
			text: `Las opciones de materias electivas de 3<sup>er</sup> año son:
        \n - **Psicopedagogía en Educación Especial I** (H0043)
        \n - **Investigación de Mercados** (H0220)
        \n - **Psicología de la Tercera Edad** (H0222)
      `
		},
		{
			id: 5,
			text: `Las opciones de materias electivas de 5<sup>to</sup> año son:
        \n - **Comunicación** (H0218)
        \n - **Género, Sexualidad y Subjetividad** (H0258)
        \n - **Publicidad y Promoción** (H0219)
        \n - **Psicología de las Nuevas Tecnologías** (H0259)
        \n - **Introducción a la Psicología del Deporte** (H0225)
        \n - **Comportamiento del Consumidor** (H0221)
      `
		},
		{
			id: 6,
			text: 'Se simplificaron las correlatividades eliminando requisitos redundantes para facilitar la lectura del plan, especialmente en materias con requisitos como "Todo 1º A 2º año".'
		}
	]
};
