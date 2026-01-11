import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// PRIMER AÑO - ANUAL
	{
		id: 20084,
		code: '20084',
		name: 'Enfermería en Salud Colectiva y Familiar I',
		hours: 6, // 192hs totales / 32 semanas
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1093,
		code: '1093',
		name: 'Estructura y Función del Cuerpo Humano',
		hours: 4, // 128hs totales / 32 semanas
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	// PRIMER AÑO - SEMANAL (cuatrimestral sin especificar)
	{
		id: 20083,
		code: '20083',
		name: 'Fundamentos del Cuidado',
		hours: 5.25, // 84hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 20085,
		code: '20085',
		name: 'Fundamentos del Cuidado Enfermero',
		hours: 11, // 176hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{ id: 1, requiredCourseId: 20083, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20083, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// PRIMER AÑO - PRIMER CUATRIMESTRE
	{
		id: 4511,
		code: '4511',
		name: 'Antropología y Salud',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	// PRIMER AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 4843,
		code: '4843',
		name: 'Psicología Social y Comunitaria',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{ id: 1, requiredCourseId: 4511, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 4511, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},

	// SEGUNDO AÑO - ANUAL
	{
		id: 20086,
		code: '20086',
		name: 'Enfermería en Salud Colectiva y Familiar II',
		hours: 10, // 320hs totales / 32 semanas
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1093, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20083, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20084, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20085, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 5, requiredCourseId: 4511, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 6, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 7, requiredCourseId: 20083, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 8, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 9, requiredCourseId: 20085, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 10, requiredCourseId: 4511, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// SEGUNDO AÑO - PRIMER CUATRIMESTRE
	{
		id: 4526,
		code: '4526',
		name: 'Bioética E',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 20083, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20083, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 1293,
		code: '1293',
		name: 'Microbiología y Parasitología',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1093, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 1362,
		code: '1362',
		name: 'Principios de Farmacología',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1093, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 4842,
		code: '4842',
		name: 'Psicología del Desarrollo',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 4511, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 4843, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 4511, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// SEGUNDO AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 20087,
		code: '20087',
		name: 'Enfermería en Salud Mental',
		hours: 6.375, // 102hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 4842, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 5, requiredCourseId: 4842, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 6, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 1129,
		code: '1129',
		name: 'Farmacología y Toxicología',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1362, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 1362, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20021,
		code: '20021',
		name: 'Nutrición',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{ id: 1, requiredCourseId: 1093, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1093, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},

	// TERCER AÑO - SEMANAL
	{
		id: 20088,
		code: '20088',
		name: 'Enfermería en Salud Colectiva y Familiar III',
		hours: 22.75, // 364hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 1129, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1293, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 1362, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20021, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 5, requiredCourseId: 20085, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 6, requiredCourseId: 20086, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 7, requiredCourseId: 4842, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 8, requiredCourseId: 1129, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 9, requiredCourseId: 1293, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 10, requiredCourseId: 1362, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 11, requiredCourseId: 20021, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 12, requiredCourseId: 20085, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 13, requiredCourseId: 20086, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 14, requiredCourseId: 4842, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20095,
		code: '20095',
		name: 'Práctica Integrada I',
		hours: 12, // 192hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 1129, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 1293, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 1362, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20021, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 5, requiredCourseId: 20028, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 6, requiredCourseId: 20086, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 7, requiredCourseId: 20087, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 8, requiredCourseId: 20088, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 9, requiredCourseId: 20089, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 10, requiredCourseId: 2155, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 11, requiredCourseId: 4526, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 12, requiredCourseId: 4842, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 13, requiredCourseId: 1129, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 14, requiredCourseId: 1293, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 15, requiredCourseId: 1362, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 16, requiredCourseId: 20021, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 17, requiredCourseId: 20028, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 18, requiredCourseId: 20086, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 19, requiredCourseId: 20087, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 20, requiredCourseId: 20088, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 21, requiredCourseId: 20089, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 22, requiredCourseId: 2155, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 23, requiredCourseId: 4526, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 24, requiredCourseId: 4842, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// TERCER AÑO - PRIMER CUATRIMESTRE
	{
		id: 20089,
		code: '20089',
		name: 'Epidemiología en Relación al Proceso Atención-Cuidado',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20087, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 5, requiredCourseId: 20087, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 6, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 2155,
		code: '2155',
		name: 'Gestión y Administración de Servicios Hospitalarios y Comunitarios',
		hours: 3.1875, // 51hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20085, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20086, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 5, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 6, requiredCourseId: 20085, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 7, requiredCourseId: 20086, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 8, requiredCourseId: 4843, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20028,
		code: '20028',
		name: 'Metodología de la Investigación en Salud',
		hours: 3.1875, // 51hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20086, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 20086, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// TERCER AÑO - SEGUNDO CUATRIMESTRE (Electivas - se requieren 2 de 4)
	{
		id: 20100,
		code: '20100',
		name: 'Trabajo Transdisciplinario en el Campo de la Salud Mental',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20087, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20087, requiredState: courseStates.taken, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20101,
		code: '20101',
		name: 'Abordaje Cualitativo de la Investigación en Salud',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20028, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20028, requiredState: courseStates.taken, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 2158,
		code: '2158',
		name: 'Gestión en Servicios de Salud',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 2155, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 2155, requiredState: courseStates.taken, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 7677,
		code: '7677',
		name: 'Herramientas Informáticas E',
		hours: 3, // 48hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.elective,
		year: 3,
		requirements: [
			{ id: 1, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20084, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},

	// CUARTO AÑO - ANUAL
	{
		id: 20090,
		code: '20090',
		name: 'Enfermería Familiar en Cuidados Críticos',
		hours: 8, // 256hs totales / 32 semanas
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// CUARTO AÑO - PRIMER CUATRIMESTRE
	{
		id: 20099,
		code: '20099',
		name: 'Enfermería en Salud Colectiva y Familiar IV',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20091,
		code: '20091',
		name: 'Problemáticas Ético Legales en Enfermería',
		hours: 5.625, // 90hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 2366,
		code: '2366',
		name: 'Sociología S',
		hours: 5, // 80hs totales / 16 semanas
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	// CUARTO AÑO - SEGUNDO CUATRIMESTRE
	{
		id: 5914,
		code: '5914',
		name: 'Bioestadística E',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20028, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20089, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20028, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 20089, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20098,
		code: '20098',
		name: 'Conocimiento Enfermero',
		hours: 4, // 64hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 4546,
		code: '4546',
		name: 'Epistemología y Metodología de la Investigación',
		hours: 7, // 112hs totales / 16 semanas
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{ id: 1, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20095, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 20099, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 4586,
		code: '4586',
		name: 'Examen de Suficiencia de Inglés E',
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},

	// QUINTO AÑO - SEMANAL
	{
		id: 20093,
		code: '20093',
		name: 'Educación en el Cuidado de la Salud',
		hours: 5, // 80hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 20098, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20098, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 5, requiredCourseId: 4586, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20094,
		code: '20094',
		name: 'Gestión y Organización de los Servicios de Enfermería Hospitalarios y Comunitarios',
		hours: 12.9375, // 207hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 20090, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20091, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20090, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 4, requiredCourseId: 20091, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 5, requiredCourseId: 4586, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20031,
		code: '20031',
		name: 'Salud Mental',
		hours: 3.75, // 60hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.complete },
			{ id: 3, requiredCourseId: 4586, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20092,
		code: '20092',
		name: 'Taller de Investigación en Enfermería',
		hours: 11.5, // 184hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 20090, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20099, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 4546, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20090, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 5, requiredCourseId: 20099, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 6, requiredCourseId: 4546, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 7, requiredCourseId: 4586, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	},
	{
		id: 20096,
		code: '20096',
		name: 'Práctica Integrada II',
		hours: 8.125, // 130hs totales / 16 semanas
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{ id: 1, requiredCourseId: 20031, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 2, requiredCourseId: 20090, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 3, requiredCourseId: 20091, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 4, requiredCourseId: 20092, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 5, requiredCourseId: 20093, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 6, requiredCourseId: 20094, requiredState: courseStates.taken, requiredFor: requiredFor.enroll },
			{ id: 7, requiredCourseId: 20098, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 8, requiredCourseId: 20099, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 9, requiredCourseId: 4546, requiredState: courseStates.passed, requiredFor: requiredFor.enroll },
			{ id: 10, requiredCourseId: 20031, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 11, requiredCourseId: 20090, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 12, requiredCourseId: 20091, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 13, requiredCourseId: 20092, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 14, requiredCourseId: 20093, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 15, requiredCourseId: 20094, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 16, requiredCourseId: 20098, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 17, requiredCourseId: 20099, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 18, requiredCourseId: 4546, requiredState: courseStates.passed, requiredFor: requiredFor.complete },
			{ id: 19, requiredCourseId: 4586, requiredState: courseStates.passed, requiredFor: requiredFor.complete }
		]
	}
];

export const unsDcsLe2017: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Enfermería',
	degreeSlug: 'LE',
	universityName: 'Universidad Nacional del Sur',
	universitySlug: 'UNS',
	collegeName: 'Departamento de Ciencias de la Salud',
	collegeSlug: 'DCS',
	durationYears: 5,
	year: 2017,
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 2
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudio Lic. en Enfermería 2017 - Versión 3',
			url: 'https://cienciasdelasalud.uns.edu.ar/docs/repositorio/Plan%20de%20Estudio%20Lic%20en%20Enfermer%c3%ada%202017%20-%20Versi%c3%b3n%203.pdf'
		}
	],
	notes: [
		{
			id: 1,
			text: 'El plan otorga el **título intermedio de Enfermero** al completar los requisitos correspondientes.'
		},
		{
			id: 2,
			text: 'Existe un **Curso de Nivelación** para carreras que articulan, con las materias Enfermería en Salud Colectiva y Familiar A (20097) y Fundamentos de los Procesos Biológicos (1183).'
		},
		{
			id: 3,
			text: 'Se deben aprobar **2 de las 4 materias electivas** del segundo cuatrimestre de tercer año para completar la carrera.'
		},
		{
			id: 4,
			text: 'El **Examen de Suficiencia de Inglés E** (4586) es requisito para varias materias de 5to año.'
		}
	]
};
