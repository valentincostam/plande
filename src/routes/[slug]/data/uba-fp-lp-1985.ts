import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseTerms } from '$lib/course-term';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	{
		id: 1,
		name: 'Psicoanálisis: Freud',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 2,
		name: 'Procesos Psicológicos Básicos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 3,
		name: 'Psicología Social',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4,
		name: 'Estadística',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 5,
		name: 'Psicología del Aprendizaje',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 6,
		name: 'Neurofisiología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 7,
		name: 'Historia de la Psicología',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
		id: 8,
		name: 'Metodología de la Investigación',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 4,
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
				requiredCourseId: 4,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 9,
		name: 'Teorías y Técnicas de Grupos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 3,
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
				requiredCourseId: 3,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10,
		name: 'Psicología Evolutiva: Niñez',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 5,
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
				requiredCourseId: 5,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 11,
		name: 'Psicología Evolutiva: Adolescencia',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
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
		name: 'Salud Pública y Salud Mental',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 8,
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
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 13,
		name: 'Psicopatología',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 6,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 6,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 11,
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
		id: 14,
		name: 'Teoría y Técnica de Exploración y Diagnóstico Psicológico I',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 15,
		name: 'Teoría y Técnica de Exploración y Diagnóstico Psicológico II',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 14,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 8,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 13,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 8,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 16,
		name: 'Idioma 1',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
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
				requiredCourseId: 1,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 17,
		name: 'Idioma 2',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 16,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			}
		]
	},
	{
		id: 18,
		name: 'Materia Electiva CFG 1',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		year: 3,
		requirements: []
	},
	{
		id: 19,
		name: 'Materia Electiva CFG 2',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		year: 3,
		requirements: []
	},
	{
		id: 20,
		name: 'Psicología, Ética y Derechos Humanos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 7,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 3,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 7,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
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
		id: 21,
		name: 'Psicología Institucional',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 22,
		name: 'Psicología Educacional',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 11,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 9,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 11,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 9,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 23,
		name: 'Psicología del Trabajo',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
				requiredCourseId: 15,
				requiredState: courseStates.taken,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 24,
		name: 'Clínica Psicológica y Psicoterapias: Clínica de Adultos',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
				requiredCourseId: 15,
				requiredState: courseStates.taken,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 25,
		name: 'Psicología Jurídica',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
				requiredCourseId: 15,
				requiredState: courseStates.taken,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 26,
		name: 'Clínica Psicológica y Psicoterapias: Emergencia e Interconsultas',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 13,
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
				requiredCourseId: 15,
				requiredState: courseStates.taken,
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
				requiredCourseId: 14,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 6,
				requiredCourseId: 15,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 27,
		name: 'Práctica Profesional y de Investigación',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			{
				id: 1,
				requiredCourseId: 12,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 12,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 28,
		name: 'Materia Electiva CFP 1',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		year: 5,
		requirements: []
	},
	{
		id: 29,
		name: 'Materia Electiva CFP 2',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		year: 5,
		requirements: []
	},
	{
		id: 30,
		name: 'Materia Electiva CFP 3',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		year: 5,
		requirements: []
	},
	{
		id: 31,
		name: 'Tesis de Licenciatura',
		hours: undefined,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: []
	}
];

export const ubaFpLp1985: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Psicología',
	degreeSlug: 'LP',
	universityName: 'Universidad de Buenos Aires',
	universitySlug: 'UBA',
	collegeName: 'Facultad de Psicología',
	collegeSlug: 'FP',
	durationYears: 5,
	year: 1985,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 1985 - Resolución UBA',
			url: 'https://codigo.rec.uba.ar/libro-xiv-facultad-de-psicologia-titulo-3-licenciatura-en-psicologia/'
		},
		{
			id: 2,
			label: 'Diagrama de correlatividades oficial',
			url: 'https://www.psi.uba.ar/psicologia/plan_estudios_psicologia_2025.png'
		},
		{
			id: 3,
			label: 'EDI Psicología UBA - Información de cátedras y plan',
			url: 'https://edipsicouba.net.ar/uncategorized/psicologia/'
		}
	],
	notes: [
		{
			id: 1,
			text: '**Distribución por años**: El plan oficial no asigna materias a años específicos, solo define ciclos (CBC, CFG, CFP) y correlatividades. La distribución por años en esta herramienta se basa en el análisis de correlatividades, priorizando materias que desbloquean más opciones (ej: Psicopatología desbloquea 5+ materias del CFP) y respetando las restricciones del plan (materias anuales como Psicoanálisis y Psicopatología).'
		},
		{
			id: 2,
			text: '**Flexibilidad**: Podés armar tu propia distribución respetando las correlatividades. Esta es una guía sugerida para completar la carrera en 5 años cursando ~6 materias por año.'
		},
		{
			id: 3,
			text: '**Cursado simultáneo permitido**: Niñez y Adolescencia pueden cursarse en el mismo cuatrimestre. Lo mismo aplica para Psicopatología, TTED I (Psicométricas) y TTED II (Proyectivas).'
		},
		{
			id: 4,
			text: '**Ciclo Básico Común (CBC)**: No incluido en este plan. Son 6 materias previas al ingreso a la Facultad: Pensamiento Científico, Sociedad y Estado, Psicología, Biología, Semiología y Matemáticas.'
		},
		{
			id: 5,
			text: '**Idioma**: Se requiere aprobar Idioma 1 e Idioma 2 (Inglés o Francés). Requisito para inscribirse: tener aprobadas Procesos Psicológicos Básicos y Psicoanálisis: Freud.'
		},
		{
			id: 6,
			text: '**Tesis de Licenciatura**: Obligatoria para estudiantes ingresantes desde 2011 provenientes del CBC (Res. CS 6768/13).'
		},
		{
			id: 7,
			text: '**Materias electivas**: Se requieren 5 electivas en total: 2 del Ciclo de Formación General (CFG) y 3 del Ciclo de Formación Profesional (CFP). Dentro de las 3 electivas del CFP se puede elegir hacer otra Práctica Profesional y de Investigación.'
		},
		{
			id: 8,
			text: '**Práctica Profesional**: Las correlatividades varían según el área elegida (Clínica, Educacional, Justicia, Social-Comunitaria, Trabajo o Investigación). Consultar el plan de estudios oficial para los requisitos específicos de cada área.'
		},
		{
			id: 9,
			text: `**Siglas**:
				\n - **CBC**: Ciclo Básico Común (ingreso a la universidad)
				\n - **CFG**: Ciclo de Formación General
				\n - **CFP**: Ciclo de Formación Profesional`
		},
		{
			id: 10,
			text: `**Materias del CFG** (Ciclo de Formación General):
				\n - Psicoanálisis: Freud
				\n - Procesos Psicológicos Básicos
				\n - Psicología Social
				\n - Estadística
				\n - Psicología del Aprendizaje
				\n - Neurofisiología
				\n - Historia de la Psicología
				\n - Metodología de la Investigación
				\n - Teoría y Técnica de Grupos
				\n - Psicología Evolutiva: Niñez
				\n - Psicología Evolutiva: Adolescencia
				\n - Salud Pública y Salud Mental
				\n - Psicopatología
				\n - TTED I y II
				\n - Idioma 1 y 2
				\n - 2 Electivas CFG`
		},
		{
			id: 11,
			text: `**Materias del CFP** (Ciclo de Formación Profesional):
				\n - Psicología, Ética y Derechos Humanos
				\n - Psicología Institucional
				\n - Psicología Educacional
				\n - Psicología del Trabajo
				\n - Clínica Psicológica y Psicoterapias: Clínica de Adultos
				\n - Psicología Jurídica
				\n - Clínica Psicológica y Psicoterapias: Emergencia e Interconsultas
				\n - Práctica Profesional y de Investigación
				\n - 3 Electivas CFP`
		}
	]
};
