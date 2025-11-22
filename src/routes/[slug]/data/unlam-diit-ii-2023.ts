import { courseStates } from '$lib/course-state';
import { courseTags } from '$lib/course-tag';
import { courseTerms } from '$lib/course-term';
import { TRANSVERSAL_YEAR } from '$lib/course.svelte';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════
	// YEAR 1
	// ═══════════════════════════════════════════════════════════

	// Year 1 - First Semester
	{
		id: 3621,
		code: '3621',
		name: 'Matemática Discreta',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3622,
		code: '3622',
		name: 'Análisis Matemático I',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3623,
		code: '3623',
		name: 'Programación Inicial',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3624,
		code: '3624',
		name: 'Introducción a los Sistemas de Información',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3625,
		code: '3625',
		name: 'Sistemas de Numeración',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3626,
		code: '3626',
		name: 'Principios de Calidad de Software',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 1,
		requirements: []
	},

	// Year 1 - Second Semester
	{
		id: 3627,
		code: '3627',
		name: 'Álgebra y Geometría Analítica I',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},
	{
		id: 3628,
		code: '3628',
		name: 'Física I',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3622,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3622,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3629,
		code: '3629',
		name: 'Programación Estructurada Básica',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3623,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3623,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3630,
		code: '3630',
		name: 'Introducción a la Gestión de Requisitos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3624,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3624,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3631,
		code: '3631',
		name: 'Fundamentos de Sistemas Embebidos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3625,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3625,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3632,
		code: '3632',
		name: 'Introducción a Proyectos Informáticos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 1,
		requirements: []
	},

	// ═══════════════════════════════════════════════════════════
	// YEAR 2
	// ═══════════════════════════════════════════════════════════

	// Year 2 - First Semester
	{
		id: 3633,
		code: '3633',
		name: 'Análisis Matemático II',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3622,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3622,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3634,
		code: '3634',
		name: 'Física II',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3635,
		code: '3635',
		name: 'Tópicos de Programación',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3621,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3621,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3636,
		code: '3636',
		name: 'Bases de Datos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3621,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3621,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3637,
		code: '3637',
		name: 'Análisis de Sistemas',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3638,
		code: '3638',
		name: 'Arquitectura de Computadoras',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3676,
		code: '3676',
		name: 'Responsabilidad Social Universitaria',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3626,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3626,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Year 2 - Second Semester
	{
		id: 3639,
		code: '3639',
		name: 'Análisis Matemático III',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3640,
		code: '3640',
		name: 'Algoritmos y Estructuras de Datos',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3641,
		code: '3641',
		name: 'Bases de Datos Aplicada',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3642,
		code: '3642',
		name: 'Principios de Diseño de Sistemas',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3637,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3637,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3626,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3626,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3643,
		code: '3643',
		name: 'Redes de Computadoras',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3644,
		code: '3644',
		name: 'Gestión de las Organizaciones',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3680,
		code: '3680',
		name: 'Taller de Integración',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 2,
		tag: courseTags.optative,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 3632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 3632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 3630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 3630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 3626,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 3626,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 3625,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 3625,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 3624,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 3624,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 3623,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 3623,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 3621,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 3621,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// YEAR 3
	// ═══════════════════════════════════════════════════════════

	// Year 3 - First Semester
	{
		id: 3645,
		code: '3645',
		name: 'Álgebra y Geometría Analítica II',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3627,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3627,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3646,
		code: '3646',
		name: 'Paradigmas de Programación',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3647,
		code: '3647',
		name: 'Requisitos Avanzados',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3648,
		code: '3648',
		name: 'Diseño de Software',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3649,
		code: '3649',
		name: 'Sistemas Operativos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3650,
		code: '3650',
		name: 'Seguridad de la Información',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3675,
		code: '3675',
		name: 'Práctica Profesional Supervisada',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Year 3 - Second Semester
	{
		id: 3651,
		code: '3651',
		name: 'Probabilidad y Estadística',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3621,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3621,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3652,
		code: '3652',
		name: 'Programación Avanzada',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3653,
		code: '3653',
		name: 'Arquitecturas de Sistemas Software',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3654,
		code: '3654',
		name: 'Virtualización de Hardware',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3655,
		code: '3655',
		name: 'Auditoría y Legislación',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// YEAR 4
	// ═══════════════════════════════════════════════════════════

	// Year 4 - First Semester
	{
		id: 3656,
		code: '3656',
		name: 'Estadística Aplicada',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3657,
		code: '3657',
		name: 'Autómatas y Gramática',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3658,
		code: '3658',
		name: 'Programación Concurrente',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3659,
		code: '3659',
		name: 'Gestión Aplicada al Desarrollo de Software I',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3660,
		code: '3660',
		name: 'Sistemas Operativos Avanzados',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3661,
		code: '3661',
		name: 'Gestión de Proyectos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Year 4 - Second Semester
	{
		id: 3662,
		code: '3662',
		name: 'Matemática Aplicada',
		hours: 6,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3663,
		code: '3663',
		name: 'Lenguajes y Compiladores',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3657,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3657,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3664,
		code: '3664',
		name: 'Inteligencia Artificial',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3665,
		code: '3665',
		name: 'Gestión Aplicada al Desarrollo de Software II',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3659,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3659,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3666,
		code: '3666',
		name: 'Seguridad Aplicada y Forensia',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3655,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3655,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3667,
		code: '3667',
		name: 'Gestión de la Calidad en Procesos de Sistemas',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// YEAR 5
	// ═══════════════════════════════════════════════════════════

	// Year 5 - First Semester
	{
		id: 3668,
		code: '3668',
		name: 'Inteligencia Artificial Aplicada',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3664,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3664,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3656,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3656,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3669,
		code: '3669',
		name: 'Innovación y Emprendedorismo',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3670,
		code: '3670',
		name: 'Ciencia de Datos',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3664,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3664,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3656,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3656,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3671,
		code: '3671',
		name: 'Proyecto Final de Carrera',
		hours: 4,
		term: courseTerms.annual,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3667,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3667,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3660,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3660,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 3659,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 3659,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 3656,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 3656,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3677,
		code: '3677',
		name: 'Lenguaje Orientado a Negocios',
		hours: 4,
		term: courseTerms.firstSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3658,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3658,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 3663,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 3663,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Year 5 - Second Semester
	{
		id: 3678,
		code: '3678',
		name: 'Tecnologías en Seguridad',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3662,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3662,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3666,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3666,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 3679,
		code: '3679',
		name: 'Visión Artificial',
		hours: 4,
		term: courseTerms.secondSemester,
		year: 5,
		tag: courseTags.elective,
		requirements: [
			{
				id: 1,
				requiredCourseId: 3664,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3664,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 3665,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 3665,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// TRANSVERSAL COURSES
	// ═══════════════════════════════════════════════════════════

	// English Levels
	{
		id: 901,
		code: '901',
		name: 'Inglés Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
		requirements: []
	},
	{
		id: 902,
		code: '902',
		name: 'Inglés Nivel II',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
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
		id: 903,
		code: '903',
		name: 'Inglés Nivel III',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
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
		id: 904,
		code: '904',
		name: 'Inglés Nivel IV',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
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
	},

	// Computational Levels
	{
		id: 911,
		code: '911',
		name: 'Computacional Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
		requirements: []
	},
	{
		id: 912,
		code: '912',
		name: 'Computacional Nivel II',
		hours: 4,
		term: courseTerms.semestral,
		year: TRANSVERSAL_YEAR,
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
	}
];

export const unlamDiitII2023: StudyPlan = {
	courses,
	degreeName: 'Ingeniería Informática',
	degreeSlug: 'II',
	universityName: 'Universidad Nacional de La Matanza',
	universitySlug: 'UNLaM',
	collegeName: 'Departamento de Ingeniería e Investigaciones Tecnológicas',
	collegeSlug: 'DIIT',
	durationYears: 5,
	year: 2023,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://ingenieria.unlam.edu.ar/index.php?seccion=3&idArticulo=565'
		}
	],
	notes: []
};
