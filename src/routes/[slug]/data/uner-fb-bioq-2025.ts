import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// ═══════════════════════════════════════════════════════════
	// AÑO 1
	// ═══════════════════════════════════════════════════════════
	{
		id: 1,
		code: '1.1.1',
		name: 'Taller de Introducción a las Ciencias Bioquímicas',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		code: '1.2.1',
		name: 'Matemática',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		code: '1.3.1',
		name: 'Química General e Inorgánica',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		code: '1.4.2',
		name: 'Biología',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Regularizada: 1.3.1
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.3.1
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 5,
		code: '1.5.2',
		name: 'Química Orgánica I',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Regularizada: 1.3.1
			{
				id: 1,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.3.1
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 6,
		code: '1.6.2',
		name: 'Física',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			// Regularizada: 1.2.1
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.2.1
			{
				id: 2,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 2
	// ═══════════════════════════════════════════════════════════
	{
		id: 7,
		code: '2.7.1',
		name: 'Anatomía e Histología',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 1.4.2
			{
				id: 1,
				requiredCourseId: 4,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 1.1.1, 1.3.1
			{
				id: 2,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.4.2
			{
				id: 4,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 8,
		code: '2.8.1',
		name: 'Química Orgánica II',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 1.5.2
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 1.3.1
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.2.1, 1.5.2
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
		id: 9,
		code: '2.9.1',
		name: 'Fisicoquímica',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 1.5.2, 1.6.2
			{
				id: 1,
				requiredCourseId: 5,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 1.2.1, 1.3.1
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
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.5.2, 1.6.2
			{
				id: 5,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		code: '2.10.2',
		name: 'Bioquímica Estructural',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 2.7.1, 2.8.1
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 1.4.2, 1.5.2
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
			// Para rendir: 2.7.1, 2.8.1
			{
				id: 5,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		code: '2.11.2',
		name: 'Química Analítica',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 2.8.1, 2.9.1
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 1.5.2, 1.6.2
			{
				id: 3,
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.8.1, 2.9.1
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 12,
		code: '2.12.2',
		name: 'Bioestadística Aplicada al Diseño de Experimentos',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: -- (ninguna)
			// Aprobada para cursar: 1.2.1, 1.4.2
			{
				id: 1,
				requiredCourseId: 2,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 1.1.1
			{
				id: 3,
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		code: '2.13.2',
		name: 'Taller Integrador para la Intervención en el Ámbito Profesional y Social en Salud',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			// Regularizada: 2.7.1, 2.8.1
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: -- (ninguna)
			// Para rendir: 2.7.1, 2.8.1
			{
				id: 3,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 3
	// ═══════════════════════════════════════════════════════════
	{
		id: 14,
		code: '3.14.1',
		name: 'Química Analítica Instrumental',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 2.11.2
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.8.1, 2.9.1
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.11.2
			{
				id: 4,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		code: '3.15.1',
		name: 'Fisiología e Inmunología',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 2.10.2
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.7.1
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.10.2
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		code: '3.16.1',
		name: 'Bioquímica Metabólica',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 2.10.2
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.7.1
			{
				id: 2,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.10.2
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 17,
		code: '3.17.2',
		name: 'Genética y Biotecnología Aplicada',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 2.10.2, 2.11.2
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.8.1
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.10.2, 2.11.2
			{
				id: 4,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 18,
		code: '3.18.2',
		name: 'Microbiología General',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 2.10.2
			{
				id: 1,
				requiredCourseId: 10,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.8.1
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 2.10.2
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 19,
		code: '3.19.2',
		name: 'Fisiopatología',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// Regularizada: 3.15.1, 3.16.1
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.10.2, 2.13.2
			{
				id: 3,
				requiredCourseId: 10,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.15.1, 3.16.1
			{
				id: 5,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 4
	// ═══════════════════════════════════════════════════════════
	{
		id: 20,
		code: '4.20.1',
		name: 'Farmacología',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.15.1, 3.16.1
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.9.1, 2.12.2
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.15.1, 3.16.1
			{
				id: 5,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 21,
		code: '4.21.1',
		name: 'Microbiología Clínica',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.15.1, 3.18.2
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 18,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.16.1
			{
				id: 3,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.15.1, 3.18.2
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		code: '4.22.1',
		name: 'Nutrición y Bromatología',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.15.1, 3.16.1
			{
				id: 1,
				requiredCourseId: 15,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 16,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.11.2
			{
				id: 3,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.15.1, 3.16.1
			{
				id: 4,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		code: '4.23.2',
		name: 'Bioquímica Clínica I',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.19.2
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.15.1, 3.16.1, 3.18.2
			{
				id: 2,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
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
				requiredCourseId: 18,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.19.2
			{
				id: 5,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		code: '4.24.2',
		name: 'Toxicología y Química Legal',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 4.20.1
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.14.1, 3.19.2
			{
				id: 2,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 4.20.1
			{
				id: 4,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		code: '4.25.2',
		name: 'Bioética y Legislación Bioquímica',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.19.2
			{
				id: 1,
				requiredCourseId: 19,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 2.13.2
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.19.2
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		code: '4.26.2',
		name: 'Genética Diagnóstica',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 3.17.2
			{
				id: 1,
				requiredCourseId: 17,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.19.2
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 3.17.2
			{
				id: 3,
				requiredCourseId: 17,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 27,
		code: '4.27.2',
		name: 'Práctica Profesional Supervisada en Bioquímica Clínica',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// Regularizada: 4.20.1, 4.21.1
			{
				id: 1,
				requiredCourseId: 20,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.16.1, 3.17.2, 3.18.2, 3.19.2
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
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 4.20.1, 4.21.1
			{
				id: 7,
				requiredCourseId: 20,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 8,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// ═══════════════════════════════════════════════════════════
	// AÑO 5
	// ═══════════════════════════════════════════════════════════
	{
		id: 28,
		code: '5.28.1',
		name: 'Bioquímica Clínica II',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Regularizada: 4.23.2
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.19.2, 4.21.1
			{
				id: 2,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 21,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 4.23.2
			{
				id: 4,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 29,
		code: '5.29.1',
		name: 'Gestión y Control de Calidad en el Laboratorio Analítico',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Regularizada: 4.23.2, 4.25.2
			{
				id: 1,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 25,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.19.2
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 4.23.2, 4.25.2
			{
				id: 4,
				requiredCourseId: 23,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 25,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 30,
		code: '5.30.1',
		name: 'Epidemiología y Salud Pública',
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// Regularizada: 4.21.1, 4.23.2
			{
				id: 1,
				requiredCourseId: 21,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 23,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			// Aprobada para cursar: 3.19.2, 4.22.1
			{
				id: 3,
				requiredCourseId: 19,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 22,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			// Para rendir: 4.21.1, 4.23.2
			{
				id: 5,
				requiredCourseId: 21,
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
	}
];

export const unerFbBioq2025: StudyPlan = {
	courses,
	degreeName: 'Bioquímica',
	degreeSlug: 'Bioq',
	universityName: 'Universidad Nacional de Entre Ríos',
	universitySlug: 'UNER',
	collegeName: 'Facultad de Bromatología',
	collegeSlug: 'FB',
	durationYears: 5,
	year: 2025,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://www.fb.uner.edu.ar/plan-de-estudios-bioquimica/'
		},
		{
			id: 2,
			label: 'Correlativas',
			url: 'https://drive.google.com/drive/folders/1vF5GjPwIMbH96MjCDhXU-kzcqrBPNEC9'
		}
	]
};
