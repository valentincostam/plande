import type { StudyPlanData } from '$lib/study-plan-data';

export const unlpFahcePm2003: StudyPlanData = {
	info: {
		degreeName: 'Profesorado de Matemática',
		degreeSlug: 'PM',
		universityName: 'Universidad Nacional de La Plata',
		universitySlug: 'UNLP',
		collegeName: 'Facultad de Humanidades y Ciencias de la Educación',
		collegeSlug: 'FaHCE',
		year: 2003,
		sources: [
			{
				id: 1,
				label: 'Sitio web de la carrera',
				url: 'https://www.fahce.unlp.edu.ar/facultad/secretarias-y-prosecretarias/academica/deptos/ciencias-exactas-y-naturales/carreras/profesorado-de-matematica'
			},
			{
				id: 2,
				label: 'Plan de Estudios (descarga PDF)',
				url: 'https://www.fahce.unlp.edu.ar/facultad/secretarias-y-prosecretarias/academica/deptos/ciencias-exactas-y-naturales/carreras/profesorado-de-matematica/@@edit/++widget++form.widgets.IArchivos.archivos/@@download/0'
			}
		],
		notes: [
			{
				id: 1,
				text: '**Optativas:** Para completar la carrera se deben aprobar **4 materias optativas**: 1 de las Optativas I (Complementos de Análisis, Estructuras Algebraicas, Geometría Diferencial o Probabilidades I), 1 de las Optativas II (Tecnología Educativa, Investigación Educativa II, Introducción a la Filosofía o Sociología de la Educación), 1 idioma latino (Francés, Italiano o Portugués) y 1 idioma germánico (Alemán o Inglés).'
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
		},
		{
			id: 'electivas',
			label: 'Materias Electivas'
		}
	],
	items: [
		{
			id: '1',
			seqId: 1,
			kind: 'course',
			name: 'Álgebra',
			code: '70009',
			type: 'mandatory',
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
			id: '2',
			seqId: 2,
			kind: 'course',
			name: 'Análisis Matemático I',
			code: '7M008',
			type: 'mandatory',
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
			id: '3',
			seqId: 3,
			kind: 'course',
			name: 'Lógica',
			code: 'F0017',
			type: 'mandatory',
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
			id: '4',
			seqId: 4,
			kind: 'course',
			name: 'Geometría Analítica',
			code: 'N0007',
			type: 'mandatory',
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
			id: '5',
			seqId: 5,
			kind: 'course',
			name: 'Geometría',
			code: 'N0008',
			type: 'mandatory',
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
							itemId: '1',
							state: 'taken'
						},
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
						},
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '6',
			seqId: 6,
			kind: 'course',
			name: 'Análisis Matemático II',
			code: '7M010',
			type: 'mandatory',
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '1',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
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
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '7',
			seqId: 7,
			kind: 'course',
			name: 'Fundamentos de la Educación',
			code: 'C0048',
			type: 'mandatory',
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'semestral'
				}
			],
			requirements: {}
		},
		{
			id: '8',
			seqId: 8,
			kind: 'course',
			name: 'Álgebra Lineal',
			code: '70027',
			type: 'mandatory',
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
							itemId: '1',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
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
						},
						{
							type: 'item',
							itemId: '3',
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
			name: 'Psicología y Cultura en el Proceso Educativo',
			code: 'C0050',
			type: 'mandatory',
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
					itemId: '7',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '7',
					state: 'passed'
				}
			}
		},
		{
			id: '10',
			seqId: 10,
			kind: 'course',
			name: 'Matemática III',
			code: '70049',
			type: 'mandatory',
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
							itemId: '6',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '1',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'item',
					itemId: '6',
					state: 'passed'
				}
			}
		},
		{
			id: '11',
			seqId: 11,
			kind: 'course',
			name: 'Matemáticas Especiales',
			code: '70052',
			type: 'mandatory',
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
							itemId: '6',
							state: 'taken'
						},
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
				},
				complete: {
					type: 'item',
					itemId: '6',
					state: 'passed'
				}
			}
		},
		{
			id: '12',
			seqId: 12,
			kind: 'course',
			name: 'Física I',
			code: '70013',
			type: 'mandatory',
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
							itemId: '4',
							state: 'taken'
						},
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
			id: '13',
			seqId: 13,
			kind: 'course',
			name: 'Historia y Política del Sistema Educativo Argentino',
			code: 'C0008',
			type: 'mandatory',
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '9',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '9',
					state: 'passed'
				}
			}
		},
		{
			id: '14',
			seqId: 14,
			kind: 'course',
			name: 'Elementos de Matemática Aplicada',
			code: '70029',
			type: 'mandatory',
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
							itemId: '6',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '8',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '1',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4',
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
							itemId: '8',
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
			name: 'Física II',
			code: '70020',
			type: 'mandatory',
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
							itemId: '12',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '3',
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
			name: 'Astronomía General',
			code: '12001',
			type: 'mandatory',
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'annual'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '12',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
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
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
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
			name: 'Filosofía de las Ciencias',
			code: 'F0006',
			type: 'mandatory',
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
							itemId: '5',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '12',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '13',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '3',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '4',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '7',
							state: 'passed'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '13',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '7',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '18',
			seqId: 18,
			kind: 'course',
			name: 'Didáctica Específica I y Prácticas Docentes en Matemática',
			code: 'N0010',
			type: 'mandatory',
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'annual'
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
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
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
							itemId: '9',
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
						},
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '5',
							state: 'passed'
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
							itemId: '9',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '19',
			seqId: 19,
			kind: 'course',
			name: 'Investigación Operativa I',
			code: '70046',
			type: 'mandatory',
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
							itemId: '8',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '11',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '5',
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
							itemId: '8',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '11',
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
			id: '20',
			seqId: 20,
			kind: 'course',
			name: 'Didáctica Específica II y Prácticas Docentes en Matemática',
			code: 'N0011',
			type: 'mandatory',
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'annual'
				}
			],
			requirements: {
				enroll: {
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
						},
						{
							type: 'item',
							itemId: '13',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '14',
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
							itemId: '13',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '14',
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
			id: '21',
			seqId: 21,
			kind: 'course',
			name: 'Seminario',
			code: 'NB012',
			type: 'mandatory',
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {}
		},
		{
			id: '22',
			seqId: 22,
			kind: 'course',
			name: 'Capacitación en Informática',
			code: 'B0032',
			type: 'mandatory',
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'semestral'
				}
			],
			requirements: {}
		},
		{
			id: '23',
			seqId: 23,
			kind: 'course',
			name: 'Complementos de Análisis',
			code: '70005',
			type: 'optative',
			tags: ['progress-elective', 'optativa-i', 'year-3'],
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
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '11',
					state: 'passed'
				}
			}
		},
		{
			id: '24',
			seqId: 24,
			kind: 'course',
			name: 'Estructuras Algebraicas',
			code: '70048',
			type: 'optative',
			tags: ['progress-elective', 'optativa-i', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '8',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '8',
					state: 'passed'
				}
			}
		},
		{
			id: '25',
			seqId: 25,
			kind: 'course',
			name: 'Geometría Diferencial',
			code: '70054',
			type: 'optative',
			tags: ['progress-elective', 'optativa-i', 'year-3'],
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
							itemId: '5',
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
							itemId: '5',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '6',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '26',
			seqId: 26,
			kind: 'course',
			name: 'Probabilidades I',
			code: '70050',
			type: 'optative',
			tags: ['progress-elective', 'optativa-i', 'year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '10',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '10',
					state: 'passed'
				}
			}
		},
		{
			id: '27',
			seqId: 27,
			kind: 'course',
			name: 'Tecnología Educativa',
			code: '33001',
			type: 'optative',
			tags: ['progress-elective', 'optativa-ii', 'year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'firstSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				}
			}
		},
		{
			id: '28',
			seqId: 28,
			kind: 'course',
			name: 'Investigación Educativa II',
			code: 'C0013',
			type: 'optative',
			tags: ['progress-elective', 'optativa-ii', 'year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				}
			}
		},
		{
			id: '29',
			seqId: 29,
			kind: 'course',
			name: 'Introducción a la Filosofía',
			code: 'F0016',
			type: 'optative',
			tags: ['progress-elective', 'optativa-ii', 'year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				}
			}
		},
		{
			id: '30',
			seqId: 30,
			kind: 'course',
			name: 'Sociología de la Educación',
			code: 'C0011',
			type: 'optative',
			tags: ['progress-elective', 'optativa-ii', 'year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				},
				complete: {
					type: 'item',
					itemId: '13',
					state: 'passed'
				}
			}
		},
		{
			id: '10005',
			seqId: 31,
			kind: 'course',
			name: 'Francés',
			code: 'M0005',
			type: 'optative',
			attributes: ['transversal'],
			tags: ['progress-elective', 'idioma-latino'],
			placements: [
				{
					sectionId: 'electivas',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '10007',
			seqId: 32,
			kind: 'course',
			name: 'Italiano',
			code: 'M0007',
			type: 'optative',
			attributes: ['transversal'],
			tags: ['progress-elective', 'idioma-latino'],
			placements: [
				{
					sectionId: 'electivas',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '10009',
			seqId: 33,
			kind: 'course',
			name: 'Portugués',
			code: 'M0009',
			type: 'optative',
			attributes: ['transversal'],
			tags: ['progress-elective', 'idioma-latino'],
			placements: [
				{
					sectionId: 'electivas',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '10001',
			seqId: 34,
			kind: 'course',
			name: 'Alemán',
			code: 'M0001',
			type: 'optative',
			attributes: ['transversal'],
			tags: ['progress-elective', 'idioma-germanico'],
			placements: [
				{
					sectionId: 'electivas',
					term: 'firstSemester'
				}
			],
			requirements: {}
		},
		{
			id: '10003',
			seqId: 35,
			kind: 'course',
			name: 'Inglés',
			code: 'M0003',
			type: 'optative',
			attributes: ['transversal'],
			tags: ['progress-elective', 'idioma-germanico'],
			placements: [
				{
					sectionId: 'electivas',
					term: 'firstSemester'
				}
			],
			requirements: {}
		}
	],
	requirements: {
		graduation: [
			{
				id: 'mandatory',
				label: 'Materias obligatorias',
				type: 'allMandatory'
			},
			{
				id: 'optativa-i-count',
				label: 'Optativas I requeridas',
				type: 'count',
				selector: {
					type: 'tag',
					tag: 'optativa-i'
				},
				min: 1,
				state: 'passed'
			},
			{
				id: 'optativa-ii-count',
				label: 'Optativas II requeridas',
				type: 'count',
				selector: {
					type: 'tag',
					tag: 'optativa-ii'
				},
				min: 1,
				state: 'passed'
			},
			{
				id: 'idioma-latino-count',
				label: 'Idioma latino requerido',
				type: 'count',
				selector: {
					type: 'tag',
					tag: 'idioma-latino'
				},
				min: 1,
				state: 'passed'
			},
			{
				id: 'idioma-germanico-count',
				label: 'Idioma germánico requerido',
				type: 'count',
				selector: {
					type: 'tag',
					tag: 'idioma-germanico'
				},
				min: 1,
				state: 'passed'
			}
		]
	}
};
