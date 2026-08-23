import type { StudyPlanData } from '$lib/study-plan-data';

export const unsDcsLe2017: StudyPlanData = {
	info: {
		degreeName: 'Licenciatura en Enfermería',
		degreeSlug: 'LE',
		universityName: 'Universidad Nacional del Sur',
		universitySlug: 'UNS',
		collegeName: 'Departamento de Ciencias de la Salud',
		collegeSlug: 'DCS',
		year: 2017,
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
			id: '20084',
			seqId: 1,
			kind: 'course',
			name: 'Enfermería en Salud Colectiva y Familiar I',
			code: '20084',
			type: 'mandatory',
			hours: 6,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'annual'
				}
			],
			requirements: {}
		},
		{
			id: '1093',
			seqId: 2,
			kind: 'course',
			name: 'Estructura y Función del Cuerpo Humano',
			code: '1093',
			type: 'mandatory',
			hours: 4,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'annual'
				}
			],
			requirements: {}
		},
		{
			id: '20083',
			seqId: 3,
			kind: 'course',
			name: 'Fundamentos del Cuidado',
			code: '20083',
			type: 'mandatory',
			hours: 5.25,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'semestral'
				}
			],
			requirements: {}
		},
		{
			id: '20085',
			seqId: 4,
			kind: 'course',
			name: 'Fundamentos del Cuidado Enfermero',
			code: '20085',
			type: 'mandatory',
			hours: 11,
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20083',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '20083',
					state: 'passed'
				}
			}
		},
		{
			id: '4511',
			seqId: 5,
			kind: 'course',
			name: 'Antropología y Salud',
			code: '4511',
			type: 'mandatory',
			hours: 4,
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
			id: '4843',
			seqId: 6,
			kind: 'course',
			name: 'Psicología Social y Comunitaria',
			code: '4843',
			type: 'mandatory',
			hours: 4,
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
					itemId: '4511',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '4511',
					state: 'passed'
				}
			}
		},
		{
			id: '20086',
			seqId: 7,
			kind: 'course',
			name: 'Enfermería en Salud Colectiva y Familiar II',
			code: '20086',
			type: 'mandatory',
			hours: 10,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'annual'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1093',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20083',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20084',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4511',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1093',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20083',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4511',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '4526',
			seqId: 8,
			kind: 'course',
			name: 'Bioética E',
			code: '4526',
			type: 'mandatory',
			hours: 4,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20083',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20083',
					state: 'passed'
				}
			}
		},
		{
			id: '1293',
			seqId: 9,
			kind: 'course',
			name: 'Microbiología y Parasitología',
			code: '1293',
			type: 'mandatory',
			hours: 4,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '1093',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '1093',
					state: 'passed'
				}
			}
		},
		{
			id: '1362',
			seqId: 10,
			kind: 'course',
			name: 'Principios de Farmacología',
			code: '1362',
			type: 'mandatory',
			hours: 3,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '1093',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '1093',
					state: 'passed'
				}
			}
		},
		{
			id: '4842',
			seqId: 11,
			kind: 'course',
			name: 'Psicología del Desarrollo',
			code: '4842',
			type: 'mandatory',
			hours: 4,
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
							itemId: '4511',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '4511',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20087',
			seqId: 12,
			kind: 'course',
			name: 'Enfermería en Salud Mental',
			code: '20087',
			type: 'mandatory',
			hours: 6.375,
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
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '1129',
			seqId: 13,
			kind: 'course',
			name: 'Farmacología y Toxicología',
			code: '1129',
			type: 'mandatory',
			hours: 3,
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
							itemId: '1093',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1093',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20021',
			seqId: 14,
			kind: 'course',
			name: 'Nutrición',
			code: '20021',
			type: 'mandatory',
			hours: 4,
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
					itemId: '1093',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '1093',
					state: 'passed'
				}
			}
		},
		{
			id: '20088',
			seqId: 15,
			kind: 'course',
			name: 'Enfermería en Salud Colectiva y Familiar III',
			code: '20088',
			type: 'mandatory',
			hours: 22.75,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1129',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '1293',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20021',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1129',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1293',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20021',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20095',
			seqId: 16,
			kind: 'course',
			name: 'Práctica Integrada I',
			code: '20095',
			type: 'mandatory',
			hours: 12,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1129',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1293',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20021',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20028',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20087',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20088',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20089',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2155',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4526',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1129',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1293',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '1362',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20021',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20028',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20087',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20088',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20089',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2155',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4526',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4842',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20089',
			seqId: 17,
			kind: 'course',
			name: 'Epidemiología en Relación al Proceso Atención-Cuidado',
			code: '20089',
			type: 'mandatory',
			hours: 4,
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
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20087',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20087',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2155',
			seqId: 18,
			kind: 'course',
			name: 'Gestión y Administración de Servicios Hospitalarios y Comunitarios',
			code: '2155',
			type: 'mandatory',
			hours: 3.1875,
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
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20085',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4843',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20028',
			seqId: 19,
			kind: 'course',
			name: 'Metodología de la Investigación en Salud',
			code: '20028',
			type: 'mandatory',
			hours: 3.1875,
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
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20084',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20086',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20100',
			seqId: 20,
			kind: 'course',
			name: 'Trabajo Transdisciplinario en el Campo de la Salud Mental',
			code: '20100',
			type: 'elective',
			hours: 3,
			tags: ['progress-elective', 'third-year-second-semester-elective', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20087',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '20087',
					state: 'taken'
				}
			}
		},
		{
			id: '20101',
			seqId: 21,
			kind: 'course',
			name: 'Abordaje Cualitativo de la Investigación en Salud',
			code: '20101',
			type: 'elective',
			hours: 3,
			tags: ['progress-elective', 'third-year-second-semester-elective', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20028',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '20028',
					state: 'taken'
				}
			}
		},
		{
			id: '2158',
			seqId: 22,
			kind: 'course',
			name: 'Gestión en Servicios de Salud',
			code: '2158',
			type: 'elective',
			hours: 3,
			tags: ['progress-elective', 'third-year-second-semester-elective', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2155',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2155',
					state: 'taken'
				}
			}
		},
		{
			id: '7677',
			seqId: 23,
			kind: 'course',
			name: 'Herramientas Informáticas E',
			code: '7677',
			type: 'elective',
			hours: 3,
			tags: ['progress-elective', 'third-year-second-semester-elective', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20084',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20084',
					state: 'passed'
				}
			}
		},
		{
			id: '20090',
			seqId: 24,
			kind: 'course',
			name: 'Enfermería Familiar en Cuidados Críticos',
			code: '20090',
			type: 'mandatory',
			hours: 8,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'annual'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				}
			}
		},
		{
			id: '20099',
			seqId: 25,
			kind: 'course',
			name: 'Enfermería en Salud Colectiva y Familiar IV',
			code: '20099',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				}
			}
		},
		{
			id: '20091',
			seqId: 26,
			kind: 'course',
			name: 'Problemáticas Ético Legales en Enfermería',
			code: '20091',
			type: 'mandatory',
			hours: 5.625,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				}
			}
		},
		{
			id: '2366',
			seqId: 27,
			kind: 'course',
			name: 'Sociología S',
			code: '2366',
			type: 'mandatory',
			hours: 5,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				}
			}
		},
		{
			id: '5914',
			seqId: 28,
			kind: 'course',
			name: 'Bioestadística E',
			code: '5914',
			type: 'mandatory',
			hours: 4,
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
							itemId: '20028',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20089',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20028',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20089',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '20098',
			seqId: 29,
			kind: 'course',
			name: 'Conocimiento Enfermero',
			code: '20098',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '20095',
					state: 'passed'
				}
			}
		},
		{
			id: '4546',
			seqId: 30,
			kind: 'course',
			name: 'Epistemología y Metodología de la Investigación',
			code: '4546',
			type: 'mandatory',
			hours: 7,
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
							itemId: '20095',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20095',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '4586',
			seqId: 31,
			kind: 'milestone',
			name: 'Examen de Suficiencia de Inglés E',
			code: '4586',
			placements: [],
			requirements: {}
		},
		{
			id: '20093',
			seqId: 32,
			kind: 'course',
			name: 'Educación en el Cuidado de la Salud',
			code: '20093',
			type: 'mandatory',
			hours: 5,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20098',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20098',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'taken'
						},
						{ type: 'item', itemId: '4586', state: 'completed' }
					]
				}
			}
		},
		{
			id: '20094',
			seqId: 33,
			kind: 'course',
			name: 'Gestión y Organización de los Servicios de Enfermería Hospitalarios y Comunitarios',
			code: '20094',
			type: 'mandatory',
			hours: 12.9375,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20090',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20091',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20090',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20091',
							state: 'passed'
						},
						{ type: 'item', itemId: '4586', state: 'completed' }
					]
				}
			}
		},
		{
			id: '20031',
			seqId: 34,
			kind: 'course',
			name: 'Salud Mental',
			code: '20031',
			type: 'mandatory',
			hours: 3.75,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '20099',
					state: 'taken'
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20099',
							state: 'taken'
						},
						{ type: 'item', itemId: '4586', state: 'completed' }
					]
				}
			}
		},
		{
			id: '20092',
			seqId: 35,
			kind: 'course',
			name: 'Taller de Investigación en Enfermería',
			code: '20092',
			type: 'mandatory',
			hours: 11.5,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20090',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4546',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20090',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4546',
							state: 'passed'
						},
						{ type: 'item', itemId: '4586', state: 'completed' }
					]
				}
			}
		},
		{
			id: '20096',
			seqId: 36,
			kind: 'course',
			name: 'Práctica Integrada II',
			code: '20096',
			type: 'mandatory',
			hours: 8.125,
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20031',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20090',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20091',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20092',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20093',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20094',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '20098',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4546',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '20031',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20090',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20091',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20092',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20093',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20094',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20098',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20099',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4546',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4586',
							state: 'completed'
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
				"label": "Materias electivas requeridas de 3er año",
				"expr": {
					"type": "count",
					"selector": {
						"type": "tag",
						"tag": "third-year-second-semester-elective"
					},
					"min": 2,
					"state": "passed"
				}
			}
		]
	}
};
