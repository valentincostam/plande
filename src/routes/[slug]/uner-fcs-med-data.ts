import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';

const courses: RawCourse[] = [
	{
		id: 1,
		code: '1.1',
		name: 'Salud Individual',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '1.2',
		name: 'Salud Colectiva',
		hours: undefined,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '2.1',
		name: 'Crecimiento y Desarrollo',
		hours: undefined,
		term: courseTerms.secondSemester,
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
				requiredCourseId: 2,
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
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4,
		code: '2.2',
		name: 'Nutrición',
		hours: undefined,
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
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 5,
		code: '2.3',
		name: 'Sexualidad Género y Reproducción',
		hours: undefined,
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
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: '2.4',
		name: 'Trabajo y Tiempo Libre',
		hours: undefined,
		term: courseTerms.secondSemester,
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
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 7,
		code: '2.5',
		name: 'El Ser Humano y su Medio',
		hours: undefined,
		term: courseTerms.secondSemester,
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
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 8,
		code: '3.2',
		name: 'Inglés I',
		hours: undefined,
		term: courseTerms.annual,
		year: 3,
		requirements: [],
		tag: courseTags.elective
	},
	{
		id: 9,
		code: '3.4',
		name: 'Informática I',
		hours: undefined,
		term: courseTerms.annual,
		year: 3,
		requirements: [],
		tag: courseTags.elective
	},
	{
		id: 10,
		code: '3.1',
		name: 'Injuria',
		hours: undefined,
		term: courseTerms.annual,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 11,
		code: '3.3',
		name: 'Defensa',
		hours: undefined,
		term: courseTerms.annual,
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
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '2.6',
		name: 'Metodología de la Investigación Científica I',
		hours: undefined,
		term: courseTerms.annual,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 13,
		code: '3.5',
		name: 'Electivas',
		hours: undefined,
		term: courseTerms.annual,
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
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 14,
		code: '4.1',
		name: 'Salud Integral del Niño y del Adolescente',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		code: '4.2',
		name: 'Salud Integral del Adulto Joven',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 16,
		code: '4.3',
		name: 'Informática II',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 17,
		code: '4.4',
		name: 'Inglés II',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 18,
		code: '4.5',
		name: 'Electivas',
		hours: undefined,
		term: courseTerms.annual,
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
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.elective
	},
	{
		id: 19,
		code: '4.6',
		name: 'Salud Integral del Adulto Mayor',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20,
		code: '4.8',
		name: 'Salud Integral de la Mujer',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 21,
		code: '4.9',
		name: 'Introducción a las Especialidades Clínico Quirúrgicas',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '4.7',
		name: 'Metodología de la Investigación Científica II',
		hours: undefined,
		term: courseTerms.annual,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 24,
		code: '5.1',
		name: 'Clínica Pediátrica',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 25,
		code: '5.2',
		name: 'Gineco-Obstetricia',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 26,
		code: '5.3',
		name: 'Clínica Quirúrgica',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 27,
		code: '5.4',
		name: 'Clínica Médica',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 28,
		code: '5.5',
		name: 'Medicina Familiar y General',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 29,
		code: '5.6',
		name: 'Emergentología',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 30,
		code: '5.7',
		name: 'Escuela de Salud (ESP)',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 2,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 31,
		code: '5.8',
		name: 'Prácticas Integradas (CISS)',
		hours: undefined,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 24,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
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
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 5,
				requiredCourseId: 28,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 29,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 7,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 10,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 12,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const unerFcsMedData = {
	courses,
	degree: 'Medicina',
	years: 5,
	college: 'UNER FCS',
	studyProgram: 'Plan de Estudios 2022',
	requiredElectiveHours: 0,
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2022 - Resolución Consejo Directivo FCSA Nº 739/2024',
			url: 'http://www.fcs.uner.edu.ar/web/fcs/normativas/RESOLUCION-CD-N-739-2024-FLEXIBILIDAD-MEDICINA.pdf'
		},
		{
			id: 2,
			label: 'Resolución Ministerial Nº 1371/17',
			url: 'http://www.fcs.uner.edu.ar/web/fcs/normativas/MEDICINA2016_REC_VAL_RM_1371_17.pdf'
		}
	]
};
