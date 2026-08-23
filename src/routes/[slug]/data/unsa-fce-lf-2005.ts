import type { StudyPlanData } from '$lib/study-plan-data';

export const unsaFceLf2005: StudyPlanData = {
	info: {
		degreeName: 'Licenciatura en Física',
		degreeSlug: 'LF',
		universityName: 'Universidad Nacional de Salta',
		universitySlug: 'UNSa',
		collegeName: 'Facultad de Ciencias Exactas',
		collegeSlug: 'FCE',
		year: 2005,
		sources: [
			{
				id: 1,
				label: 'Plan de Estudios',
				url: 'https://exactas.unsa.edu.ar/carreras/info/6'
			},
			{
				id: 2,
				label: 'Res. Ministerial N° 478/04 - C.S. Nº585/17, 661/04 - RESCD-EXA N°646/17, 328/04',
				url: 'https://bo.unsa.edu.ar/cs/R2017/R-CS-2017-0585.pdf'
			}
		],
		notes: [
			{
				id: 1,
				text: 'Para cursar el **Trabajo Final**, se requiere regular algunas materias dependiendo del trabajo propuesto y haber aprobado el 80% de las materias. Para rendir el **Trabajo Final**, se deben tener aprobadas todas las materias restantes de la carrera.'
			},
			{
				id: 3,
				text: 'Se omiten requisitos redundantes. Por ejemplo, **Introducción a la Matemática** no se exige para cursar **Laboratorio I** porque ya es requisito para cursar **Álgebra Lineal y Geometría Analítica**, que también es necesaria para cursar **Laboratorio I**.'
			}
		]
	},
	sections: [
		{
			id: 'year-1',
			label: '1er Año'
		},
		{
			id: 'year-2',
			label: '2do Año'
		},
		{
			id: 'year-3',
			label: '3er Año'
		},
		{
			id: 'year-4',
			label: '4to Año'
		},
		{
			id: 'year-5',
			label: '5to Año'
		}
	],
	items: [
		{
			id: '1',
			seqId: 1,
			kind: 'course',
			name: 'Introducción a la Matemática',
			code: '1',
			type: 'mandatory',
			hours: 10,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '2',
			seqId: 2,
			kind: 'course',
			name: 'Introducción a la Física',
			code: '2',
			type: 'mandatory',
			hours: 9,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '3',
			seqId: 3,
			kind: 'course',
			name: 'Elementos de Fisicoquímica',
			code: '3',
			type: 'mandatory',
			hours: 6,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '4',
			seqId: 4,
			kind: 'course',
			name: 'Álgebra Lineal y Geometría Analítica',
			code: '4',
			type: 'mandatory',
			hours: 10,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '1',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '1',
					state: 'passed'
				}
			}
		},
		{
			id: '5',
			seqId: 5,
			kind: 'course',
			name: 'Análisis Matemático I',
			code: '5',
			type: 'mandatory',
			hours: 10,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '1',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '1',
					state: 'passed'
				}
			}
		},
		{
			id: '6',
			seqId: 6,
			kind: 'course',
			name: 'Introducción a los Circuitos Eléctricos',
			code: '6',
			type: 'mandatory',
			hours: 6,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2',
					state: 'passed'
				}
			}
		},
		{
			id: '7',
			seqId: 7,
			kind: 'course',
			name: 'Análisis Matemático II',
			code: '7',
			type: 'mandatory',
			hours: 10,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '4',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '1',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '8',
			seqId: 8,
			kind: 'course',
			name: 'Física I',
			code: '8',
			type: 'mandatory',
			hours: 10,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '9',
			seqId: 9,
			kind: 'course',
			name: 'Laboratorio I',
			code: '9',
			type: 'mandatory',
			hours: 6,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '10',
			seqId: 10,
			kind: 'course',
			name: 'Análisis Matemático III',
			code: '10',
			type: 'mandatory',
			hours: 10,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '7',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '7',
					state: 'passed'
				}
			}
		},
		{
			id: '11',
			seqId: 11,
			kind: 'course',
			name: 'Física II',
			code: '11',
			type: 'mandatory',
			hours: 10,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '7',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '7',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '12',
			seqId: 12,
			kind: 'course',
			name: 'Laboratorio II',
			code: '12',
			type: 'mandatory',
			hours: 6,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '9',
					state: 'taken'
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '9',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '13',
			seqId: 13,
			kind: 'course',
			name: 'Inglés',
			code: '13',
			type: 'mandatory',
			hours: 6,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'secondSemester'
				}
			],
			requirements: {}
		},
		{
			id: '14',
			seqId: 14,
			kind: 'course',
			name: 'Mecánica',
			code: '14',
			type: 'mandatory',
			hours: 9,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '10',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '7',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '13',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '10',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '15',
			seqId: 15,
			kind: 'course',
			name: 'Termodinámica I',
			code: '15',
			type: 'mandatory',
			hours: 9,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '8',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '7',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '13',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '16',
			seqId: 16,
			kind: 'course',
			name: 'Física Moderna I',
			code: '16',
			type: 'mandatory',
			hours: 8,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '11',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '13',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '17',
			seqId: 17,
			kind: 'course',
			name: 'Electromagnetismo',
			code: '17',
			type: 'mandatory',
			hours: 9,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '14',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '14',
					state: 'passed'
				}
			}
		},
		{
			id: '18',
			seqId: 18,
			kind: 'course',
			name: 'Física Moderna II',
			code: '18',
			type: 'mandatory',
			hours: 8,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '16',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '16',
					state: 'passed'
				}
			}
		},
		{
			id: '19',
			seqId: 19,
			kind: 'course',
			name: 'Laboratorio de Componentes y Mediciones',
			code: '19',
			type: 'mandatory',
			hours: 9,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '11',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '11',
					state: 'passed'
				}
			}
		},
		{
			id: '20',
			seqId: 20,
			kind: 'course',
			name: 'Mecánica Cuántica',
			code: '20',
			type: 'mandatory',
			hours: 10,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '16',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '17',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '16',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '17',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '21',
			seqId: 21,
			kind: 'course',
			name: 'Mecánica de Fluidos',
			code: '21',
			type: 'mandatory',
			hours: 9,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '10',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '10',
					state: 'passed'
				}
			}
		},
		{
			id: '22',
			seqId: 22,
			kind: 'course',
			name: 'Óptica I',
			code: '22',
			type: 'mandatory',
			hours: 8,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '10',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '10',
					state: 'passed'
				}
			}
		},
		{
			id: '23',
			seqId: 23,
			kind: 'course',
			name: 'Mecánica Estadística',
			code: '23',
			type: 'mandatory',
			hours: 9,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '15',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '10',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '15',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '24',
			seqId: 24,
			kind: 'course',
			name: 'Transferencia de Calor y Materia',
			code: '24',
			type: 'mandatory',
			hours: 9,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '15',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '21',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '15',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '21',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '90',
			seqId: 25,
			kind: 'course',
			name: 'Astrofísica General',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '91',
			seqId: 26,
			kind: 'course',
			name: 'Mecánica Cuántica II',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20',
					state: 'passed'
				}
			}
		},
		{
			id: '92',
			seqId: 27,
			kind: 'course',
			name: 'Física Experimental I',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '10',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '93',
			seqId: 28,
			kind: 'course',
			name: 'Introducción a la Estadística del no Equilibrio y sus Aplicaciones',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '94',
			seqId: 29,
			kind: 'course',
			name: 'Introducción al Análisis de Series temporales con Machine Learning',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '95',
			seqId: 30,
			kind: 'course',
			name: 'Complemento de Electromagnetismo',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '17',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '18',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '10',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '17',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '18',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '96',
			seqId: 31,
			kind: 'course',
			name: 'Física Computacional',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '97',
			seqId: 32,
			kind: 'course',
			name: 'Física Ambiental',
			type: 'optative',
			tags: ['progress-elective', 'year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '11',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '15',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '15',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '26',
			seqId: 33,
			kind: 'course',
			name: 'Trabajo Final',
			code: '26',
			type: 'mandatory',
			hours: 10,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'percent',
					selector: {
						type: 'items',
						itemIds: [
							'1',
							'2',
							'3',
							'4',
							'5',
							'6',
							'7',
							'8',
							'9',
							'10',
							'11',
							'12',
							'13',
							'14',
							'15',
							'16',
							'17',
							'18',
							'19',
							'20',
							'21',
							'22',
							'23',
							'24',
							'90',
							'91',
							'92',
							'93',
							'94',
							'95',
							'96',
							'97'
						]
					},
					minPercent: 80,
					state: 'passed',
					label: '80% de las materias aprobadas'
				},
				complete: {
					type: 'all',
					label: 'Todas las materias restantes de la carrera aprobadas',
					rules: [
						{
							type: 'count',
							selector: {
								type: 'items',
								itemIds: [
									'1',
									'2',
									'3',
									'4',
									'5',
									'6',
									'7',
									'8',
									'9',
									'10',
									'11',
									'12',
									'13',
									'14',
									'15',
									'16',
									'17',
									'18',
									'19',
									'20',
									'21',
									'22',
									'23',
									'24'
								]
							},
							min: 24,
							state: 'passed'
						},
						{
							type: 'count',
							selector: {
								type: 'tag',
								tag: 'progress-elective'
							},
							min: 2,
							state: 'passed'
						}
					]
				}
			}
		}
	],
	requirements: {
		graduation: [
			{
				"id": "mandatory",
				"label": "Materias obligatorias",
				"expr": {
					"type": "percent",
					"selector": {
						"type": "all",
						"courseType": "mandatory"
					},
					"minPercent": 100,
					"state": "passed"
				}
			},
			{
				"id": "elective-count",
				"label": "Materias electivas requeridas",
				"expr": {
					"type": "count",
					"selector": {
						"type": "tag",
						"tag": "progress-elective"
					},
					"min": 2,
					"state": "passed"
				}
			}
		]
	}
};
