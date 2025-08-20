import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { CareerData } from '$lib/career-data';

const courses: RawCourse[] = [
	// 1er año
	{
		id: 1,
		name: 'Introducción a la Arquitectura',
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Técnicas de Representación I',
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Sistemas de Representación I',
		term: courseTerms.annual,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Matemática I',
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		name: 'Introducción a la Construcción',
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Arquitectura I',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			// Introducción a la Arquitectura passed
			{
				id: 1,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Técnicas de Representación I inProgress
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.inProgress,
				requiredFor: requiredFor.enroll
			},
			// Introducción a la Arquitectura passed for complete
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 7,
		name: 'Matemática II',
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			// Matemática I taken
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Matemática I passed for complete
			{
				id: 2,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Introducción a la Construcción passed for complete
			{
				id: 2,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Técnicas de Representación I passed for complete
			{
				id: 4,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// Arquitectura I passed for complete
			{
				id: 3,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Técnicas de Representación I passed for complete
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Sistemas de Representación I passed for complete
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Matemática II passed for complete
			{
				id: 4,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Matemática I passed for complete
			{
				id: 3,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 14,
		name: 'Instalaciones I',
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			// Construcciones I taken
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones I passed for complete
			{
				id: 4,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Arquitectura II passed for complete
			{
				id: 7,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 17,
		name: 'Estructuras I',
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			// Matemática III e Introducción a la Física taken
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Matemática III e Introducción a la Física passed for complete
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Computación Gráfica I passed for complete
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Instalaciones I passed for complete
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Historia de la Arquitectura I passed for complete
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Técnicas de Representación II passed for complete
			{
				id: 7,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// Arquitectura III passed for complete
			{
				id: 7,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Técnicas de Representación II passed for complete
			{
				id: 9,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Sistemas de Representación II passed for complete
			{
				id: 10,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		name: 'Estructuras II',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// Matemática II passed
			{
				id: 2,
				requiredCourseId: 7,
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
			// Estructuras I passed for complete
			{
				id: 8,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			// Instalaciones II taken
			{
				id: 4,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Instalaciones II passed for complete
			{
				id: 8,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 27,
		name: 'Historia de la Arquitectura III',
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			// 👉 Este requerimiento es redundante porque para cursar "Historia de la Arquitectura II" ya se requiere "Historia de la Arquitectura I" cursada
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
			},
			// Historia de la Arquitectura II passed for complete
			{
				id: 4,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Computación Gráfica II passed for complete
			{
				id: 7,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Arquitectura IV passed for complete
			{
				id: 9,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		name: 'Estructuras III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// 👉 Este requerimiento es redundante porque para cursar "Estructuras II" ya se requiere "Matemática III e Introducción a la Física" cursada
			// Matemática III e Introducción a la Física passed
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Estructuras II taken
			{
				id: 5,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Estructuras II passed for complete
			{
				id: 10,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 31,
		name: 'Construcciones III',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// Construcciones I passed
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Construcciones II taken
			{
				id: 5,
				requiredCourseId: 26,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones II passed for complete
			{
				id: 10,
				requiredCourseId: 26,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 32,
		name: 'Historia de la Arquitectura IV',
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			// 👉 Este requerimiento es redundante porque para cursar "Historia de la Arquitectura III" ya se requiere "Historia de la Arquitectura II" cursada
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
			},
			// Historia de la Arquitectura III passed for complete
			{
				id: 6,
				requiredCourseId: 27,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Construcciones I passed for complete
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Tecnica de Presentación III passed for complete
			{
				id: 10,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// Arquitectura V passed for complete
			{
				id: 11,
				requiredCourseId: 29,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 35,
		name: 'Dirección y Organización de Obra I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Construcciones III taken
			{
				id: 3,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones III passed for complete
			{
				id: 5,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			// Estructuras III taken
			{
				id: 3,
				requiredCourseId: 30,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Estructuras III passed for complete
			{
				id: 9,
				requiredCourseId: 30,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 37,
		name: 'Instalaciones III',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Instalaciones II passed
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Construcciones III taken
			{
				id: 4,
				requiredCourseId: 31,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Construcciones III passed for complete
			{
				id: 10,
				requiredCourseId: 31,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 38,
		name: 'Historia Política, Social y Económica de la Arquitectura Argentina I',
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			// Historia de la Arquitectura IV taken
			{
				id: 3,
				requiredCourseId: 32,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Historia de la Arquitectura IV passed for complete
			{
				id: 7,
				requiredCourseId: 32,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Historia de la Arquitectura II passed for complete
			{
				id: 3,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Tecnicas de Representacion III passed for complete
			{
				id: 6,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Arquitectura VI passed for complete
			{
				id: 11,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Arquitectura VI passed for complete
			{
				id: 2,
				requiredCourseId: 34,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Dirección y Organización de Obra I passed for complete
			{
				id: 4,
				requiredCourseId: 35,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 44,
		name: 'Estructuras V',
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
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
			},
			// Estructuras IV passed for complete
			{
				id: 13,
				requiredCourseId: 36,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Instalaciones III passed for complete
			{
				id: 20,
				requiredCourseId: 37,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			// Historia Política, Social y Económica de la Arquitectura Argentina I taken
			{
				id: 3,
				requiredCourseId: 38,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Historia Política, Social y Económica de la Arquitectura Argentina I passed for complete
			{
				id: 8,
				requiredCourseId: 38,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Instalaciones III passed for complete
			{
				id: 15,
				requiredCourseId: 37,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			},
			// Arquitectura VII passed for complete
			{
				id: 1,
				requiredCourseId: 41,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
			{
				id: 18,
				requiredCourseId: 18,
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
				id: 24,
				requiredCourseId: 24,
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
			},
			// All passed for complete
			{
				id: 64,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 67,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 70,
				requiredCourseId: 24,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 79,
				requiredCourseId: 33,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 85,
				requiredCourseId: 39,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 87,
				requiredCourseId: 41,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 88,
				requiredCourseId: 42,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 89,
				requiredCourseId: 43,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 90,
				requiredCourseId: 44,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 91,
				requiredCourseId: 45,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 92,
				requiredCourseId: 46,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const ucuFauArqData: CareerData = {
	courses,
	degree: 'Arquitectura',
	years: 5,
	college: 'UCU FAU',
	studyProgram: 'Plan de Estudios 2007',
	progress: {
		type: 'mandatory-plus-one-elective',
		requiredElectiveCount: 1
	},
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
			text: 'Para cursar **Proyecto Final**, deberás tener al menos una materia optativa _aprobada_, o bien, **Gestión Ambiental** _cursada_.'
		},
		{
			id: 2,
			text: 'Para rendir **Proyecto Final**, deberás tener al menos una materia optativa _aprobada_.'
		},
		{
			id: 3,
			text: 'Se omiten requisitos redundantes. Por ejemplo, **Introducción a la Arquitectura** (1<sup>er</sup> año) _aprobada_ no se exige para rendir **Arquitectura II** (2<sup>do</sup> año) porque ya es requisito para rendir **Arquitectura I** (1<sup>er</sup> año), que también debe estar _aprobada_ para rendir **Arquitectura II**.'
		}
	]
};
