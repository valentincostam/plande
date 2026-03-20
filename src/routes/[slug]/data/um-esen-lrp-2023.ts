import { courseAttributes } from '$lib/course-attribute';
import { courseStates } from '$lib/course-state';
import { courseTerms } from '$lib/course-term';
import { courseTypes } from '$lib/course-type';
import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// Primer año
	{
		id: 661,
		code: '661',
		name: 'Relaciones Públicas I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 689,
		code: '689',
		name: 'Funciones y Competencias de las Relaciones Públicas',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 636,
		code: '636',
		name: 'Teoría y Medios de Comunicación Social',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 690,
		code: '690',
		name: 'Filosofía y Lógica Aplicada',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 691,
		code: '691',
		name: 'Teoría y Práctica de la Producción de Textos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 680,
		code: '680',
		name: 'Medios de Comunicación I: Gráficos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: [
			{
				id: 1,
				requiredCourseId: 636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 624,
		code: '624',
		name: 'Psicología General',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 20501,
		code: '20501',
		name: 'Inglés I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 666,
		code: '666',
		name: 'Oratoria',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 631,
		code: '631',
		name: 'Administración de las Organizaciones',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 4185,
		code: '4185',
		name: 'Taller de Informática Aplicada al Diseño Publicitario',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},

	// Segundo año
	{
		id: 687,
		code: '687',
		name: 'Relaciones Públicas II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 689,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 689,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 710,
		code: '710',
		name: 'Derecho de las Comunicaciones',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 682,
		code: '682',
		name: 'Medios de Comunicación II: Radio, TV, Cine e Internet',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 680,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 680,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 692,
		code: '692',
		name: 'Sociología y Estudio de la Opinión Pública',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 680,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 680,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20502,
		code: '20502',
		name: 'Inglés II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20501,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20501,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 683,
		code: '683',
		name: 'Planificación de Campañas de Relaciones Públicas',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 689,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 689,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 633,
		code: '633',
		name: 'Estadística Social',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 667,
		code: '667',
		name: 'Públicos Internos y Externos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 689,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 689,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 629,
		code: '629',
		name: 'Psicología Social',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 624,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 624,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 671,
		code: '671',
		name: 'Imagen Institucional',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 689,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 689,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 626,
		code: '626',
		name: 'Economía',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},

	// Tercer año
	{
		id: 669,
		code: '669',
		name: 'Asuntos Públicos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 687,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 687,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10229,
		code: '10229',
		name: 'Comercialización Estratégica',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 683,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 687,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 687,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 684,
		code: '684',
		name: 'Comunicación en Casos de Crisis',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 667,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 691,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 667,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 691,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 639,
		code: '639',
		name: 'Dinámica de Grupos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 642,
		code: '642',
		name: 'Psicosociología de las Organizaciones',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 692,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 692,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 693,
		code: '693',
		name: 'Periodismo y Redacción Periodística',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 691,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 691,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 668,
		code: '668',
		name: 'Protocolo y Ceremonial',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 693,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 693,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4198,
		code: '4198',
		name: 'Técnicas de Promoción y Activación de Marca',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 10229,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 10229,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10411,
		code: '10411',
		name: 'Investigación de Mercado',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 667,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 667,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 20503,
		code: '20503',
		name: 'Inglés III',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			{
				id: 1,
				requiredCourseId: 20502,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20502,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Cuarto año
	{
		id: 913,
		code: '913',
		name: 'Ética y Deontología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 690,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 690,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 694,
		code: '694',
		name: 'Gestión en Redes Sociales',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 693,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 693,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 695,
		code: '695',
		name: 'Costos y Presupuesto',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 626,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 626,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4195,
		code: '4195',
		name: 'Estrategia y Planificación de Medios Publicitarios',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 682,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 682,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 696,
		code: '696',
		name: 'Sostenibilidad y Responsabilidad Social Empresaria Aplicada',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 10111,
		code: '10111',
		name: 'Gerencia y Liderazgo',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 4190,
		code: '4190',
		name: 'Taller de Publicidad Digital y Contenidos Interactivos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 693,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 683,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 693,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 697,
		code: '697',
		name: 'Taller Práctico Final de Relaciones Públicas',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			{
				id: 1,
				requiredCourseId: 669,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 4195,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 3,
				requiredCourseId: 669,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 4,
				requiredCourseId: 4195,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},

	// Electivas
	{
		id: 4187,
		code: '4187',
		name: 'Taller de Fotografía Publicitaria',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 4188,
		code: '4188',
		name: 'Taller de Publicidad Radial',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 4189,
		code: '4189',
		name: 'Taller de Publicidad Gráfica',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10550,
		code: '10550',
		name: 'Capital Humano',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 759,
		code: '759',
		name: 'Atracción de Talento',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 4186,
		code: '4186',
		name: 'Semiótica Publicitaria',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 10147,
		code: '10147',
		name: 'Técnicas Gerenciales de Negociación',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 735,
		code: '735',
		name: 'Italiano Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 741,
		code: '741',
		name: 'Portugués Nivel I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 911,
		code: '911',
		name: 'Creatividad e Innovación',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 20504,
		code: '20504',
		name: 'Inglés IV',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.elective,
		attributes: [courseAttributes.transversal],
		requirements: [
			{
				id: 1,
				requiredCourseId: 20503,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 20503,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const umEsenLrp2023: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Relaciones Públicas',
	degreeSlug: 'LRP',
	universityName: 'Universidad de Morón',
	universitySlug: 'UM',
	collegeName: 'Escuela Superior de Economía y Negocios',
	collegeSlug: 'ESEN',
	durationYears: 4,
	year: 2023,
	progress: {
		type: 'mandatory-plus-elective-count',
		requiredElectiveCount: 2
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios 2023',
			url: 'https://venialaum.unimoron.edu.ar/carreras/escuela-superior-de-economia-y-negocios/de-grado/licenciatura-en-relaciones-publicas/2023?e=4&c=14'
		}
	],
	notes: [
		{
			id: 1,
			text: 'La carrera otorga el título intermedio de **Analista en Relaciones Públicas** al completar el 2<sup>do</sup> año.'
		},
		{
			id: 2,
			text: 'Para completar la carrera se deben aprobar **2 asignaturas electivas** de la lista disponible, equivalentes a **12 créditos**.'
		},
		{
			id: 3,
			text: 'Se corrige un probable error tipográfico del sitio oficial en **Investigación de Mercado (10411)**: la correlativa publicada como **663(A)** se interpreta como **Estadística Social (633)**, ya que no existe una materia 663 en el plan.'
		}
	]
};
