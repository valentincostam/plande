import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';

const courses: RawCourse[] = [
	// 1er año
	{
		id: 1,
		name: 'Introducción a la Arquitectura',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Técnicas de Representación I',
		hours: 0,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Sistemas de Representación I',
		hours: 0,
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Matemática I',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		name: 'Introducción a la Construcción',
		hours: 0,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Arquitectura I',
		hours: 0,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.inProgress,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 7,
		name: 'Matemática II',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 8,
		name: 'Construcciones I',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// 2do año
	{
		id: 9,
		name: 'Arquitectura II',
		term: courseTerms.firstSemester,
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
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 10,
		name: 'Técnicas de Representación II',
		term: courseTerms.annual,
		year: 2,
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
		id: 11,
		name: 'Sistemas de Representación II',
		term: courseTerms.annual,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 12,
		name: 'Matemática III e Introducción a la Física',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 13,
		name: 'Computación Gráfica I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 14,
		name: 'Instalaciones I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			// Introducción a la Construcción taken
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones I taken
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 15,
		name: 'Historia de la Arquitectura I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: []
	},
	{
		id: 16,
		name: 'Arquitectura III',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Arquitectura II passed
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Técnicas de Representación II inProgress
			{
				id: 2,
				requiredCourseId: 10,
				requiredState: courseStates.inProgress,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 17,
		name: 'Estructuras I',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Matemática I passed
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática II taken
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Matemática III e Introducción a la Física taken
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		name: 'Computación Gráfica II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Computación Gráfica I taken
			{
				id: 1,
				requiredCourseId: 13,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 19,
		name: 'Instalaciones II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Instalaciones I taken
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 20,
		name: 'Historia de la Arquitectura II',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Historia de la Arquitectura I taken
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 21,
		name: 'Metodología de la Investigación',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: []
	},

	// 3er año
	{
		id: 22,
		name: 'Arquitectura IV',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Técnicas de Representación II passed
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Arquitectura III passed
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 23,
		name: 'Técnicas de Representación III',
		term: courseTerms.annual,
		year: 3,
		requirements: [
			// Técnicas de Representación II passed
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 24,
		name: 'Documentación de Obra',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Sistemas de Representación II taken
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 25,
		name: 'Estructuras II',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Matemática I passed
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática II passed
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática III e Introducción a la Física taken
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Estructuras I taken
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 26,
		name: 'Construcciones II',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Introducción a la Construcción passed
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Construcciones I taken
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones I taken
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones II taken
			{
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 27,
		name: 'Historia de la Arquitectura III',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Historia de la Arquitectura I passed
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura II taken
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 28,
		name: 'Computación Gráfica III',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Computación Gráfica II taken
			{
				id: 1,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.optative
	},
	{
		id: 29,
		name: 'Arquitectura V',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Arquitectura IV passed
			{
				id: 1,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Técnicas de Representación III inProgress
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.inProgress,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 30,
		name: 'Estructuras III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Matemática I passed
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática II passed
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática III e Introducción a la Física passed
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras I taken
			{
				id: 4,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Estructuras II taken
			{
				id: 5,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 31,
		name: 'Construcciones III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Introducción a la Construcción passed
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Construcciones I passed
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones I taken
			{
				id: 3,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones II taken
			{
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones II taken
			{
				id: 5,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 32,
		name: 'Historia de la Arquitectura IV',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Historia de la Arquitectura I passed
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura II passed
			{
				id: 2,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura III taken
			{
				id: 3,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 33,
		name: 'Arquitectura Legal y Ética Profesional',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Construcciones I passed
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},

	// 4to año
	{
		id: 34,
		name: 'Arquitectura VI',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Técnicas de Representación III passed
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Arquitectura V passed
			{
				id: 2,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 35,
		name: 'Dirección y Organización de Obra I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Construcciones II taken
			{
				id: 2,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones III taken
			{
				id: 3,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 36,
		name: 'Estructuras IV',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Estructuras I passed
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras II taken
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Estructuras III taken
			{
				id: 3,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 37,
		name: 'Instalaciones III',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Instalaciones I passed
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones II passed
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Construcciones II taken
			{
				id: 3,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones III taken
			{
				id: 4,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 38,
		name: 'Historia Política, Social y Económica de la Arquitectura Argentina I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Historia de la Arquitectura II passed
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura III taken
			{
				id: 2,
				requiredCourseId: 27,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura IV taken
			{
				id: 3,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 39,
		name: 'Patrimonio y Conservación',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Historia de la Arquitectura II taken
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 40,
		name: 'Taller de Creatividad',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Técnicas de Representación III passed
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.optative
	},
	{
		id: 41,
		name: 'Arquitectura VII',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Arquitectura VI passed
			{
				id: 1,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 42,
		name: 'Teoría y Crítica de la Arquitectura y el Urbanismo',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Arquitectura VI passed
			{
				id: 1,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 43,
		name: 'Dirección y Organización de Obra II',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Dirección y Organización de Obra I taken
			{
				id: 1,
				requiredCourseId: 35,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 44,
		name: 'Estructuras V',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Matemática I passed
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática II passed
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Matemática III e Introducción a la Física passed
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras II passed
			{
				id: 4,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras III passed
			{
				id: 5,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras IV taken
			{
				id: 6,
				requiredCourseId: 36,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 45,
		name: 'Infraestructura Urbana',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Instalaciones III taken
			{
				id: 1,
				requiredCourseId: 37,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 46,
		name: 'Historia Política, Social y Económica de la Arquitectura Argentina II',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Historia de la Arquitectura III passed
			{
				id: 1,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura IV taken
			{
				id: 2,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Historia Política, Social y Económica de la Arquitectura Argentina I taken
			{
				id: 3,
				requiredCourseId: 38,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 47,
		name: 'Gestión Ambiental',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			// Instalaciones III taken
			{
				id: 1,
				requiredCourseId: 37,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		],
		tag: courseTags.optative
	},

	// 5to año
	{
		id: 48,
		name: 'Planificación Urbanística',
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// Arquitectura VII passed
			{
				id: 1,
				requiredCourseId: 41,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 49,
		name: 'Práctica Profesional Supervisada',
		term: courseTerms.annual,
		year: 5,
		requirements: []
	},
	{
		id: 50,
		name: 'Proyecto Final',
		term: courseTerms.annual,
		year: 5,
		requirements: [
			// All passed
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},

			{
				id: 5,
				requiredCourseId: 5,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 9,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 11,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 13,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 15,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 17,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 19,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 21,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 23,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 25,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 26,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 27,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 28,
				requiredCourseId: 28,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 29,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 30,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 31,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 32,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 33,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 34,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 35,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 36,
				requiredCourseId: 36,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 37,
				requiredCourseId: 37,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 38,
				requiredCourseId: 38,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 39,
				requiredCourseId: 39,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 40,
				requiredCourseId: 40,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 41,
				requiredCourseId: 41,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 42,
				requiredCourseId: 42,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 43,
				requiredCourseId: 43,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 44,
				requiredCourseId: 44,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 45,
				requiredCourseId: 45,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 46,
				requiredCourseId: 46,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			}
		]
	}
];

export const ucuFauArqData = {
	courses,
	degree: 'Arquitectura',
	years: 5,
	college: 'UCU FAU',
	studyProgram: 'Plan de Estudios 2007',
	hasRequirementsForCompletion: true,
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://ucu.edu.ar/project/arquitecto-a/'
		},
		{
			id: 2,
			label: 'Correlativas para cursar',
			url: 'https://drive.google.com/file/d/1M6FKoKi3z9XypMPOVQdY_1h9lwD_Dwra/view'
		},
		{
			id: 3,
			label: 'Correlativas para rendir',
			url: 'https://drive.google.com/file/d/1ovdo9xZ1tckg38yiMiDbhBsiRnGvfu8d/view'
		}
	],
	notes: [
		{
			id: 1,
			text: 'Para cursar **Proyecto Final**, deberás tener al menos una materia optativa aprobada, o bien, **Gestión Ambiental** cursada.'
		}
	]
};
