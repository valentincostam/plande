import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { DegreeData } from '$lib/degree-data';

const courses: RawCourse[] = [
	// PRIMER AÑO - 1° Cuatrimestre
	{
		id: 1,
		code: '1',
		name: 'Álgebra',
		hours: 9,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '2',
		name: 'Informática I',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '3',
		name: 'Química',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '4',
		name: 'Organización Industrial I',
		hours: 6,
		term: courseTerms.annual,
		year: 1,
		tag: courseTags.integrative,
		requirements: []
	},

	// PRIMER AÑO - Anual
	{
		id: 99,
		code: 'I1',
		name: 'Inglés I',
		hours: 2,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},

	// PRIMER AÑO - 2° Cuatrimestre
	{
		id: 5,
		code: '5',
		name: 'Economía General',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		code: '6',
		name: 'Física',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		code: '7',
		name: 'Análisis Matemático',
		hours: 9,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// SEGUNDO AÑO - 1° Cuatrimestre
	{
		id: 10,
		code: '10',
		name: 'Conocimiento de Materiales',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 3,
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
		id: 11,
		code: '11',
		name: 'Costos',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '12',
		name: 'Informática II',
		hours: 6,
		term: courseTerms.firstSemester,
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
		id: 13,
		code: '13',
		name: 'Organización Industrial II',
		hours: 6,
		term: courseTerms.annual,
		year: 2,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		code: '14',
		name: 'Probabilidad y Estadística',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 98,
		code: 'I2',
		name: 'Inglés II',
		hours: 2,
		term: courseTerms.annual,
		year: 2,
		requirements: []
	},
	{
		id: 97,
		code: 'DA',
		name: 'Diseño Asistido por Computadora',
		hours: 2,
		term: courseTerms.firstSemester,
		year: 2,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// SEGUNDO AÑO - 2° Cuatrimestre
	{
		id: 15,
		code: '15',
		name: 'Comercialización',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 14,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '16',
		name: 'Estudio del Trabajo',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 17,
		code: '17',
		name: 'Procesos Industriales',
		hours: 6,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 3,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: '18',
		name: 'Investigación Operativa',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 2,
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
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// TERCER AÑO - 1° Cuatrimestre
	{
		id: 19,
		code: '19',
		name: 'Economía de la Empresa',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		code: '20',
		name: 'Organización Industrial III',
		hours: 6,
		term: courseTerms.annual,
		year: 3,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 99,
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
				requiredCourseId: 5,
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
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '21',
		name: 'Legislación',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: []
	},
	{
		id: 22,
		code: '22',
		name: 'Sistemas y Métodos Administrativos',
		hours: 6,
		term: courseTerms.firstSemester,
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
				requiredCourseId: 13,
				requiredState: courseStates.taken,
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
				requiredCourseId: 5,
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
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '23',
		name: 'Planificación y Control de la Producción',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '24',
		name: 'Ingeniería de Calidad',
		hours: 5,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 17,
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
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// TERCER AÑO - 2° Cuatrimestre
	{
		id: 25,
		code: '25',
		name: 'Análisis de Estados Contables',
		hours: 9,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '26',
		name: 'Seguridad, Higiene e Ingeniería Ambiental',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 4,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// CUARTO AÑO - 1° Cuatrimestre
	{
		id: 27,
		code: '27',
		name: 'Comercio Exterior',
		hours: 6,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		code: '28',
		name: 'Evaluación de Proyecto',
		hours: 9,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 98,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 16,
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
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// CUARTO AÑO - 2° Cuatrimestre
	{
		id: 29,
		code: '29',
		name: 'Gestión de PyMES',
		hours: 9,
		term: courseTerms.firstSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 23,
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
		id: 30,
		code: '30',
		name: 'Proyecto Final',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		tag: courseTags.integrative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// All courses required to complete Proyecto Final
			{
				id: 8,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 96,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 14,
				requiredCourseId: 97,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// CUARTO AÑO - 2° Cuatrimestre
	{
		id: 31,
		code: '31',
		name: 'Relaciones Industriales',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 32,
		code: '32',
		name: 'Control de Gestión',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 33,
		code: '33',
		name: 'Flujo de Insumos y Productos',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 23,
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
		id: 34,
		code: '34',
		name: 'Seminario de Planeamiento Estratégico',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 23,
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
		id: 35,
		code: '35',
		name: 'Emprendedorismo',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
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
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 23,
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
		id: 36,
		code: '36',
		name: 'Gestión de la Responsabilidad en las Organizaciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 22,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// PRÁCTICA SUPERVISADA
	{
		id: 96,
		name: 'Práctica Profesional Supervisada',
		hours: 6,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
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
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 17,
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
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const utnFrcuLoiData: DegreeData = {
	courses,
	degree: 'Licenciatura en Organización Industrial',
	years: 4,
	college: 'UTN FRCU',
	studyProgram: 'Plan de Estudios 1995',
	progress: {
		type: 'mandatory-plus-elective-hours',
		requiredElectiveHours: 21
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://www.frcu.utn.edu.ar/images/Loi/PlanDeEstudio/PLAN-LOIOficial.pdf'
		},
		{
			id: 2,
			label: 'Ordenanza N° 1156 - Modifica Diseño Curricular',
			url: 'https://www.frgp.utn.edu.ar/public/files/CSU_ORD_0_1156_LOI.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para rendir **Proyecto Final**, es necesario aprobar todas las asignaturas del Plan de Estudios.'
		},

		{
			id: 2,
			text: '**Práctica Profesional Supervisada** no es una materia pero fue agregada como tal porque es requisito para egresarse. Tiene una carga horaria de 6 horas semanales, obtenido de dividir las 200 horas totales exigidas entre 32 semanas (lo que dura año académico).'
		},
		{
			id: 3,
			text: 'Se omiten requisitos redundantes. Por ejemplo, **Costos** de 2<sup>do</sup> año _aprobada_ no se exige para cursar **Evaluación de Proyecto** de 4<sup>to</sup> año porque ya es requisito para cursar **Planificación y Control de la Producción** de 3<sup>er</sup> año, que debe estar _regular_ para cursar **Evaluación de Proyecto**.'
		}
	]
};
