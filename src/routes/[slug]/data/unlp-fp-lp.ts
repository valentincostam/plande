import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse, type RawCourseRequirement } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

type ReqConfig = {
	enrollPassed?: string[];
	enrollTaken?: string[];
	completePassed?: string[];
	completeTaken?: string[];
};

const courses: RawCourse[] = [
	// Primer año
	{
		id: 412,
		code: '412',
		name: 'Psicología I',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 414,
		code: '414',
		name: 'Antropología Cultural y Social',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 415,
		code: '415',
		name: 'Lógica',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 416,
		code: '416',
		name: 'Introducción a la Filosofía',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 411,
		code: '411',
		name: 'Biología Humana',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// Segundo año
	{
		id: 422,
		code: '422',
		name: 'Psicología II',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 421,
		code: '421',
		name: 'Teoría Psicoanalítica',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 425,
		code: '425',
		name: 'Sociología General',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 423,
		code: '423',
		name: 'Psicología Genética',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 424,
		code: '424',
		name: 'Estadística Aplicada a la Psicología',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 426,
		code: '426',
		name: 'Lingüística General',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// Tercer año
	{
		id: 430,
		code: '43A',
		name: 'Neuroanatomía y Neurofisiología',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 434,
		code: '434',
		name: 'Epistemología y Metodología de la Investigación Psicológica',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 433,
		code: '433',
		name: 'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 431,
		code: '431',
		name: 'Corrientes Actuales en Psicología',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 432,
		code: '432',
		name: 'Psicología Evolutiva I',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 435,
		code: '435',
		name: 'Psicología Evolutiva II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},
	{
		id: 436,
		code: '436',
		name: 'Psicología Social',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 3,
		requirements: []
	},

	// Cuarto año
	{
		id: 441,
		code: '441',
		name: 'Psicopatología I',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 444,
		code: '444',
		name: 'Psicología Institucional',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 445,
		code: '445',
		name: 'Seminario de Psicología Experimental',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 443,
		code: '443',
		name: 'Psicopatología II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 442,
		code: '442',
		name: 'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},
	{
		id: 490,
		name: 'Capacitación en Idioma',
		hours: undefined,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 4,
		requirements: []
	},

	// Quinto año
	{
		id: 451,
		code: '451',
		name: 'Psicodiagnóstico',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 452,
		code: '452',
		name: 'Psicología Educacional',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 453,
		code: '453',
		name: 'Psicoterapia I',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 454,
		code: '454',
		name: 'Psicoterapia II',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 455,
		code: '455',
		name: 'Psicología Preventiva',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},
	{
		id: 456,
		name: 'Taller de Producción Textual',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	},

	// Sexto año
	{
		id: 461,
		code: '461',
		name: 'Psicología Clínica de Niños y Adolescentes',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	},
	{
		id: 462,
		code: '462',
		name: 'Psicología Clínica de Adultos y Gerontes',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	},
	{
		id: 465,
		code: '465',
		name: 'Orientación Vocacional',
		hours: 6,
		term: courseTerms.firstSemester,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	},
	{
		id: 463,
		code: '463',
		name: 'Psicología Laboral',
		hours: 6,
		term: courseTerms.secondSemester,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	},
	{
		id: 464,
		code: '464',
		name: 'Psicología Forense',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	},
	{
		id: 510,
		name: 'Trabajo Integrador Final (TIF)',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 6,
		requirements: []
	}
];

const idByName = Object.fromEntries(courses.map((course) => [course.name, course.id]));

const reqsByCourse: Record<string, ReqConfig> = {
	'Psicología II': {
		enrollTaken: ['Psicología I'],
		completePassed: ['Psicología I']
	},
	'Teoría Psicoanalítica': {
		enrollTaken: ['Psicología I'],
		completePassed: ['Psicología I']
	},
	'Sociología General': {
		completePassed: ['Antropología Cultural y Social']
	},
	'Psicología Genética': {
		enrollTaken: ['Psicología I'],
		completePassed: ['Psicología I']
	},
	'Lingüística General': {
		enrollTaken: ['Lógica'],
		completePassed: ['Lógica']
	},
	'Neuroanatomía y Neurofisiología': {
		enrollTaken: ['Biología Humana'],
		completePassed: ['Biología Humana']
	},
	'Epistemología y Metodología de la Investigación Psicológica': {
		enrollPassed: ['Psicología I'],
		enrollTaken: ['Lógica', 'Psicología II', 'Teoría Psicoanalítica'],
		completePassed: ['Lógica', 'Psicología II', 'Teoría Psicoanalítica']
	},
	'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I': {
		enrollPassed: ['Psicología I'],
		enrollTaken: [
			'Lógica',
			'Psicología II',
			'Estadística Aplicada a la Psicología',
			'Teoría Psicoanalítica'
		],
		completePassed: [
			'Estadística Aplicada a la Psicología',
			'Epistemología y Metodología de la Investigación Psicológica'
		]
	},
	'Corrientes Actuales en Psicología': {
		enrollPassed: ['Psicología I', 'Lógica'],
		enrollTaken: ['Psicología II', 'Lingüística General'],
		completePassed: ['Psicología II', 'Lingüística General']
	},
	'Psicología Evolutiva I': {
		enrollPassed: ['Psicología I'],
		enrollTaken: ['Psicología Genética', 'Teoría Psicoanalítica'],
		completePassed: ['Psicología Genética', 'Teoría Psicoanalítica']
	},
	'Psicología Evolutiva II': {
		enrollPassed: ['Psicología I'],
		enrollTaken: ['Psicología Evolutiva I'],
		completePassed: ['Psicología Evolutiva I']
	},
	'Psicología Social': {
		enrollPassed: ['Psicología I', 'Antropología Cultural y Social'],
		enrollTaken: ['Lógica', 'Psicología II', 'Sociología General', 'Teoría Psicoanalítica'],
		completePassed: [
			'Sociología General',
			'Epistemología y Metodología de la Investigación Psicológica'
		]
	},
	'Psicopatología I': {
		enrollPassed: ['Biología Humana', 'Psicología Genética', 'Teoría Psicoanalítica'],
		enrollTaken: ['Neuroanatomía y Neurofisiología', 'Psicología Evolutiva II'],
		completePassed: ['Neuroanatomía y Neurofisiología', 'Psicología Evolutiva II']
	},
	'Psicología Institucional': {
		enrollPassed: [
			'Lógica',
			'Psicología II',
			'Sociología General',
			'Estadística Aplicada a la Psicología'
		],
		enrollTaken: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Psicología Social'
		],
		completePassed: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Psicología Social'
		]
	},
	'Seminario de Psicología Experimental': {
		enrollPassed: [
			'Lógica',
			'Psicología II',
			'Estadística Aplicada a la Psicología',
			'Teoría Psicoanalítica'
		],
		enrollTaken: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I'
		],
		completePassed: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I'
		]
	},
	'Psicopatología II': {
		enrollPassed: ['Biología Humana', 'Psicología Genética', 'Teoría Psicoanalítica'],
		enrollTaken: [
			'Neuroanatomía y Neurofisiología',
			'Psicología Evolutiva I',
			'Psicología Evolutiva II'
		],
		completePassed: ['Psicopatología I']
	},
	'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II': {
		enrollPassed: [
			'Lógica',
			'Psicología II',
			'Estadística Aplicada a la Psicología',
			'Teoría Psicoanalítica'
		],
		enrollTaken: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I'
		],
		completePassed: [
			'Epistemología y Metodología de la Investigación Psicológica',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I'
		]
	},
	Psicodiagnóstico: {
		enrollPassed: [
			'Neuroanatomía y Neurofisiología',
			'Psicología Evolutiva II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I'
		],
		enrollTaken: [
			'Psicopatología I',
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II'
		],
		completePassed: [
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II'
		]
	},
	'Psicología Educacional': {
		enrollPassed: [
			'Neuroanatomía y Neurofisiología',
			'Psicología Evolutiva II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica I',
			'Psicología Social'
		],
		enrollTaken: [
			'Psicopatología I',
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		completePassed: [
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		]
	},
	'Psicoterapia I': {
		enrollPassed: ['Neuroanatomía y Neurofisiología', 'Psicología Evolutiva II'],
		enrollTaken: ['Psicopatología I', 'Psicopatología II'],
		completePassed: ['Psicopatología II']
	},
	'Psicoterapia II': {
		enrollPassed: [
			'Neuroanatomía y Neurofisiología',
			'Psicología Evolutiva II',
			'Psicología Social'
		],
		enrollTaken: ['Psicopatología I', 'Psicopatología II', 'Psicología Institucional'],
		completePassed: ['Psicopatología II', 'Psicología Institucional']
	},
	'Psicología Preventiva': {
		enrollPassed: [
			'Neuroanatomía y Neurofisiología',
			'Psicología Evolutiva II',
			'Psicología Social'
		],
		enrollTaken: ['Psicopatología I', 'Psicopatología II', 'Psicología Institucional'],
		completePassed: ['Psicología Institucional']
	},
	'Taller de Producción Textual': {
		enrollTaken: [
			'Psicopatología I',
			'Psicología Institucional',
			'Seminario de Psicología Experimental',
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II'
		]
	},
	'Psicología Clínica de Niños y Adolescentes': {
		enrollPassed: [
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		enrollTaken: ['Psicodiagnóstico', 'Psicoterapia I', 'Psicoterapia II'],
		completePassed: ['Psicodiagnóstico', 'Psicoterapia I', 'Psicoterapia II']
	},
	'Psicología Clínica de Adultos y Gerontes': {
		enrollPassed: [
			'Psicopatología I',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		enrollTaken: ['Psicodiagnóstico', 'Psicoterapia I', 'Psicoterapia II'],
		completePassed: ['Psicodiagnóstico', 'Psicoterapia I', 'Psicoterapia II']
	},
	'Orientación Vocacional': {
		enrollPassed: [
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		enrollTaken: ['Psicodiagnóstico', 'Psicología Preventiva'],
		completePassed: ['Psicodiagnóstico', 'Psicología Preventiva']
	},
	'Psicología Laboral': {
		enrollPassed: [
			'Psicopatología I',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		enrollTaken: ['Psicodiagnóstico', 'Psicología Preventiva'],
		completePassed: ['Psicodiagnóstico', 'Psicología Preventiva']
	},
	'Psicología Forense': {
		enrollPassed: [
			'Psicopatología II',
			'Fundamentos, Técnicas e Instrumentos de la Exploración Psicológica II',
			'Psicología Institucional'
		],
		enrollTaken: ['Psicodiagnóstico', 'Psicología Preventiva'],
		completePassed: ['Psicodiagnóstico', 'Psicología Preventiva']
	}
};

const toRequirements = ({
	enrollPassed = [],
	enrollTaken = [],
	completePassed = [],
	completeTaken = []
}: ReqConfig): RawCourseRequirement[] => {
	const requirements: RawCourseRequirement[] = [];
	const push = (
		courseNames: string[],
		requiredState: RawCourseRequirement['requiredState'],
		requiredForValue: RawCourseRequirement['requiredFor']
	) => {
		for (const courseName of courseNames) {
			const requiredCourseId = idByName[courseName];
			if (!requiredCourseId) continue;
			requirements.push({
				id: requirements.length + 1,
				requiredCourseId,
				requiredState,
				requiredFor: requiredForValue
			});
		}
	};

	push(enrollPassed, courseStates.passed, requiredFor.enroll);
	push(enrollTaken, courseStates.taken, requiredFor.enroll);
	push(completePassed, courseStates.passed, requiredFor.complete);
	push(completeTaken, courseStates.taken, requiredFor.complete);
	return requirements;
};

for (const course of courses) {
	course.requirements = toRequirements(reqsByCourse[course.name] ?? {});
}

export const unlpFpLp: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Psicología',
	degreeSlug: 'LP',
	universityName: 'Universidad Nacional de La Plata',
	universitySlug: 'UNLP',
	collegeName: 'Facultad de Psicología',
	collegeSlug: 'FP',
	durationYears: 6,
	year: 2012,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios (PDF)',
			url: 'https://wp-psico-admin.psico.unlp.edu.ar/wp-content/uploads/2025/06/plan-de-estudio-Licenciatura.pdf'
		},
		{
			id: 2,
			label: 'Plan de Estudios (web)',
			url: 'https://www.psico.unlp.edu.ar/carreras/licenciatura_en_psicolog%C3%ADa'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Estadística Aplicada a la Psicología (424)**: además de las correlativas, tiene como requisito haber ingresado a la carrera al menos un año antes (o con anterioridad).'
		},
		{
			id: 2,
			text: '**Neuroanatomía y Neurofisiología (43A)**: además de las correlativas, tiene como requisito haber ingresado a la carrera al menos dos años antes (o con anterioridad).'
		},
		{
			id: 3,
			text: '**Capacitación en Idioma**: el plan establece como requisito tener 12 materias con finales rendidos para cursar (pueden rendirse en calidad de libre).'
		},
		{
			id: 4,
			text: '**Taller de Producción Textual**: tiene como requisito contar con cursadas aprobadas de las asignaturas de 4º año.'
		},
		{
			id: 5,
			text: '**Trabajo Integrador Final (TIF)**: tiene como requisito contar con las asignaturas de 4º año aprobadas y con el 50% de las cursadas aprobadas de 5º año (condición porcentual no representada como correlativas de materias individuales).'
		}
	]
};
