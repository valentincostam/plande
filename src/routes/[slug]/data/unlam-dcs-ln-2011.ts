import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	{
		id: 1533,
		code: '01533',
		name: 'Educación para la Salud',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1534,
		code: '01534',
		name: 'Introducción al Pensamiento Científico I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1535,
		code: '01535',
		name: 'Biofísica',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1536,
		code: '01536',
		name: 'Psicosociales',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1537,
		code: '01537',
		name: 'Embriología y Desarrollo',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1538,
		code: '01538',
		name: 'Nutrición del Niño y Adolescente Sano',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1530,
		code: '01530',
		name: 'Anatomía Descriptiva y Topográfica I',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1531,
		code: '01531',
		name: 'Bioquímica',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1532,
		code: '01532',
		name: 'Nutrición Normal',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 901,
		code: '00901',
		name: 'Inglés Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 911,
		code: '00911',
		name: 'Computación Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1541,
		code: '01541',
		name: 'Psicología Social e Institucional',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1542,
		code: '01542',
		name: 'Epidemiología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1543,
		code: '01543',
		name: 'Bromatología y Tecnología de los Alimentos',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1544,
		code: '01544',
		name: 'Atención Primaria para la Salud',
		hours: 8,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1545,
		code: '01545',
		name: 'Administración, Organización y Gestión de Servicios',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1541,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1541,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1539,
		code: '01539',
		name: 'Fisiología',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1540,
		code: '01540',
		name: 'Técnicas y Manejo de Alimentos',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1535,
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
		type: courseTypes.mandatory,
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
		id: 912,
		code: '00912',
		name: 'Computación Nivel II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
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
		id: 1549,
		code: '01549',
		name: 'Microbiología',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1550,
		code: '01550',
		name: 'Farmacología General',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1551,
		code: '01551',
		name: 'Fisiopatología y Dietoterapia del Niño y del Adolescente',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1552,
		code: '01552',
		name: 'Antropología, Cultura y Nutrición',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1553,
		code: '01553',
		name: 'Toxicología de los Alimentos',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1546,
		code: '01546',
		name: 'Técnica Dietoterápica',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1547,
		code: '01547',
		name: 'Fisiopatología y Dietoterapia del Adulto',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1548,
		code: '01548',
		name: 'Atención Comunitaria I',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1555,
		code: '01555',
		name: 'Atención Comunitaria II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1556,
		code: '01556',
		name: 'Metodología de la Investigación I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1557,
		code: '01557',
		name: 'Soporte Nutricional',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1558,
		code: '01558',
		name: 'Historia Argentina y Latinoamericana de las Ciencias de la Salud',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1559,
		code: '01559',
		name: 'Deontología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1560,
		code: '01560',
		name: 'Política y Evaluación en Nutrición',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1561,
		code: '01561',
		name: 'Economía, Comercialización y Distribución de Alimentos',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1562,
		code: '01562',
		name: 'Técnicas Pedagógicas en Nutrición',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1563,
		code: '01563',
		name: 'Nutrición y Deporte',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1564,
		code: '01564',
		name: 'Marketing, Investigación y Desarrollo de Alimentos',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1565,
		code: '01565',
		name: 'Bioética y Ética Profesional',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1559,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1559,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1554,
		code: '01554',
		name: 'Administración en Servicios de Alimentación',
		hours: 5,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 903,
		code: '00903',
		name: 'Inglés Nivel III',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
		id: 1566,
		code: '01566',
		name: 'Práctica Profesional en Servicios de Alimentación',
		hours: 25,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1541,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1541,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 25,
				requiredCourseId: 1542,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 26,
				requiredCourseId: 1542,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 27,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 28,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 29,
				requiredCourseId: 1544,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 30,
				requiredCourseId: 1544,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 31,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 32,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 33,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 34,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 35,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 36,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 37,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 38,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 39,
				requiredCourseId: 1549,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 40,
				requiredCourseId: 1549,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 41,
				requiredCourseId: 1550,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 42,
				requiredCourseId: 1550,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1567,
		code: '01567',
		name: 'Práctica Profesional en Nutrición Clínica',
		hours: 25,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1530,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1530,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1531,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1531,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1532,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1532,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1533,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1533,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1534,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1534,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1535,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1535,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1536,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1536,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1537,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1537,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1538,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1538,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1539,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1539,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1540,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1540,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1541,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1541,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 25,
				requiredCourseId: 1542,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 26,
				requiredCourseId: 1542,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 27,
				requiredCourseId: 1543,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 28,
				requiredCourseId: 1543,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 29,
				requiredCourseId: 1544,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 30,
				requiredCourseId: 1544,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 31,
				requiredCourseId: 1545,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 32,
				requiredCourseId: 1545,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 33,
				requiredCourseId: 1546,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 34,
				requiredCourseId: 1546,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 35,
				requiredCourseId: 1547,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 36,
				requiredCourseId: 1547,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 37,
				requiredCourseId: 1548,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 38,
				requiredCourseId: 1548,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 39,
				requiredCourseId: 1549,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 40,
				requiredCourseId: 1549,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 41,
				requiredCourseId: 1550,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 42,
				requiredCourseId: 1550,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 43,
				requiredCourseId: 1551,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 44,
				requiredCourseId: 1551,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 45,
				requiredCourseId: 1552,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 46,
				requiredCourseId: 1552,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 47,
				requiredCourseId: 1553,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 48,
				requiredCourseId: 1553,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 49,
				requiredCourseId: 1554,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 50,
				requiredCourseId: 1554,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 51,
				requiredCourseId: 1555,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 52,
				requiredCourseId: 1555,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 53,
				requiredCourseId: 1556,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 54,
				requiredCourseId: 1556,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 55,
				requiredCourseId: 1557,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 56,
				requiredCourseId: 1557,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 57,
				requiredCourseId: 1558,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 58,
				requiredCourseId: 1558,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 59,
				requiredCourseId: 1559,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 60,
				requiredCourseId: 1559,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 61,
				requiredCourseId: 1560,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 62,
				requiredCourseId: 1560,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 63,
				requiredCourseId: 1561,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 64,
				requiredCourseId: 1561,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 65,
				requiredCourseId: 1562,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 66,
				requiredCourseId: 1562,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 67,
				requiredCourseId: 1563,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 68,
				requiredCourseId: 1563,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 69,
				requiredCourseId: 1564,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 70,
				requiredCourseId: 1564,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 71,
				requiredCourseId: 1565,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 72,
				requiredCourseId: 1565,
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
		type: courseTypes.mandatory,
		year: 5,
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
	}
];

export const unlamDcsLn2011: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Nutrición',
	degreeSlug: 'LN',
	universityName: 'Universidad Nacional de La Matanza',
	universitySlug: 'UNLaM',
	collegeName: 'Departamento de Ciencias de la Salud',
	collegeSlug: 'DCS',
	durationYears: 5,
	year: 2011,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{ id: 1, label: 'Oferta académica', url: 'https://www.unlam.edu.ar/academicas/nutricion/' },
		{
			id: 2,
			label: 'Plan de Estudios (PDF)',
			url: 'https://www.unlam.edu.ar/wp-content/uploads/2024/06/Licenciatura-en-Nutricion-PLAN-DE-ESTUDIOS.pdf'
		}
	]
};
