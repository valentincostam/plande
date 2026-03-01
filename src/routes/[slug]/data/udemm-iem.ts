import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	{
		id: 1101,
		code: 'I1101',
		name: 'Análisis Matemático I',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1102,
		code: 'I1102',
		name: 'Fundamentos de Programación',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1104,
		code: 'I1104',
		name: 'Sistemas de Representación',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1106,
		code: 'I1106',
		name: 'Metrología',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1103,
		code: 'I1103',
		name: 'Organización de Empresas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 100,
		code: 'I0100',
		name: 'Álgebra y Geometría Analítica',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1101,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 106,
		code: 'I0106',
		name: 'Física I',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1101,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1113,
		code: 'I1113',
		name: 'Diseño Digital',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1104,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1104,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1112,
		code: 'I1112',
		name: 'Química General',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1101,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1201,
		code: 'I1201',
		name: 'Análisis Matemático II A',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1101,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1101,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 100,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 100,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1202,
		code: 'I1202',
		name: 'Física II A',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1203,
		code: 'I1203',
		name: 'Fundamentos de Economía',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 1204,
		code: 'I1204',
		name: 'Estabilidad I',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 100,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 100,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1211,
		code: 'I1211',
		name: 'Análisis Matemático II B',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1201,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1212,
		code: 'I1212',
		name: 'Física II B',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 401,
		code: 'I0401',
		name: 'Seguridad, Higiene y Medio Ambiente',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 346,
		code: 'I0346',
		name: 'Resistencia de Materiales',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1204,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1204,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1201,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1214,
		code: 'I1214',
		name: 'Ingeniería de Materiales I',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1112,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1112,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 484,
		code: 'I0484',
		name: 'Tecnología Mecánica',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 345,
		code: 'I0345',
		name: 'Termodinámica',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1212,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1212,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 328,
		code: 'I0328',
		name: 'Mediciones Eléctricas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1202,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1202,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 206,
		code: 'I0206',
		name: 'Electrotecnia',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1202,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1202,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1305,
		code: 'I1305',
		name: 'Ingeniería de Materiales II',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1214,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1214,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 304,
		code: 'I0304',
		name: 'Probabilidad y Estadística',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 100,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 100,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 472,
		code: 'I0472',
		name: 'Mecánica de los Fluidos',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1201,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1201,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 350,
		code: 'I0350',
		name: 'Máquinas Eléctricas',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 206,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 442,
		code: 'I0442',
		name: 'Mecánica',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 106,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 106,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1211,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1211,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1321,
		code: 'I1321',
		name: 'Fundamentos de Electrónica',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1202,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1202,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1404,
		code: 'I1404',
		name: 'Turbomáquinas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 472,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 472,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1401,
		code: 'I1401',
		name: 'Metodología de la Investigación',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1408,
		code: 'I1408',
		name: 'Máquinas Eléctricas II',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 350,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 350,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1402,
		code: 'I1402',
		name: 'Gestión de la Calidad',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 304,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 304,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1403,
		code: 'I1403',
		name: 'Control Industrial',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1321,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1321,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 443,
		code: 'I0443',
		name: 'Elementos de Máquinas y Mecanismos',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1305,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1305,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 346,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 346,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 442,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 442,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 520,
		code: 'I0520',
		name: 'Máquinas Térmicas',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 345,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 345,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1422,
		code: 'I1422',
		name: 'Mecanismos Hidráulicos y Neumáticos',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 472,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 472,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1415,
		code: 'I1415',
		name: 'Gestión y Evaluación de Proyectos',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1103,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1103,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1522,
		code: 'I1522',
		name: 'Proyecto Electromecánico Integrador',
		hours: undefined,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1404,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1404,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 520,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 520,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1422,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1422,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1501,
		code: 'I1501',
		name: 'Energías Alternativas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1408,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1408,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1502,
		code: 'I1502',
		name: 'Sistemas de Elevación y Transporte',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 443,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 443,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1408,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1408,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1503,
		code: 'I1503',
		name: 'Instalaciones Termomecánicas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 472,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 472,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 345,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 345,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1507,
		code: 'I1507',
		name: 'Instalaciones Eléctricas',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 206,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 206,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1514,
		code: 'I1514',
		name: 'Gestión del Mantenimiento',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1402,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1402,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 538,
		code: 'I0538',
		name: 'Instalaciones Industriales',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1422,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1422,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 520,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 520,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 484,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 484,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 500,
		code: 'I0500',
		name: 'Legislación y Ejercicio Profesional',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 1518,
		code: 'I1518',
		name: 'Redes de Distribución Eléctrica',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1507,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1507,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 555,
		code: 'I0555',
		name: 'Práctica Profesional Supervisada',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1403,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1403,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1415,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1415,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1408,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1408,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1130,
		code: 'I1130',
		name: 'Emprendedorismo I',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1131,
		code: 'I1131',
		name: 'Emprendedorismo II',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 303,
		code: 'I0303',
		name: 'Inglés I',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 446,
		code: 'I0446',
		name: 'Inglés II',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1230,
		code: 'I1230',
		name: 'Comunicación Efectiva I',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1231,
		code: 'I1231',
		name: 'Comunicación Efectiva II',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1330,
		code: 'I1330',
		name: 'Trabajo Colaborativo I',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1332,
		code: 'I1332',
		name: 'Trabajo Colaborativo II',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal, courseAttributes.workshop],
		requirements: []
	},
	{
		id: 1356,
		code: 'I1356',
		name: 'Estabilidad II',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	},
	{
		id: 1409,
		code: 'I1409',
		name: 'Tecnología del Calor',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	},
	{
		id: 501,
		code: 'I0501',
		name: 'Planificación y Control de la Producción',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	},
	{
		id: 536,
		code: 'I0536',
		name: 'Comercialización',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	},
	{
		id: 1218,
		code: 'I1218',
		name: 'Contabilidad y Costos Industriales',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	},
	{
		id: 1326,
		code: 'I1326',
		name: 'Logística Industrial',
		hours: undefined,
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 4,
		requirements: []
	}
];

export const udemmIem: StudyPlan = {
	courses,
	degreeName: 'Ingeniería Electromecánica',
	degreeSlug: 'IEM',
	durationYears: 5,
	universityName: 'Universidad de la Marina Mercante',
	universitySlug: 'UdeMM',
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 1
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://udemm.edu.ar/carreras/ingenieria-electromecanica/#plandeestudios'
		},
		{
			id: 2,
			label: 'Correlatividades',
			url: 'https://udemm.edu.ar/carreras/ingenieria-electromecanica/correlatividades-ingenieria-electromecanica/'
		}
	],
	notes: [
		{
			id: 1,
			text: 'La carrera otorga el título intermedio de **Técnico Universitario en Electromecánica**.'
		},
		{
			id: 2,
			text: 'Se normalizó la correlativa de **Proyecto Electromecánico Integrador** de `I1421` a `I1422` por consistencia con el plan y la tabla de materias.'
		},
		{
			id: 3,
			text: 'Para completar la carrera se requiere aprobar **1 materia electiva** del bloque de electivas de 4<sup>to</sup> año.'
		}
	]
};
