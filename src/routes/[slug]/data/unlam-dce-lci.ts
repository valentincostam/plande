import type { StudyPlanData } from '$lib/study-plan-data';

export const unlamDceLci: StudyPlanData = {
	info: {
		degreeName: 'Licenciatura en Comercio Internacional',
		degreeSlug: 'LCI',
		universityName: 'Universidad Nacional de La Matanza',
		universitySlug: 'UNLaM',
		collegeName: 'Departamento de Ciencias Económicas',
		collegeSlug: 'DCE',
		sources: [
			{
				id: 1,
				label: 'Plan de Estudios (Web)',
				url: 'https://economicas.unlam.edu.ar/index.php?seccion=3&idArticulo=112'
			},
			{
				id: 2,
				label: 'Plan de Estudios (PDF)',
				url: 'https://economicas.unlam.edu.ar/descargas/112_LICENCIATURAENCOMERCIOINTERNACIONAL.pdf'
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
			id: '2400',
			seqId: 1,
			kind: 'course',
			name: 'Matemática I',
			code: '2400',
			type: 'mandatory',
			hours: 8,
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
			id: '2401',
			seqId: 2,
			kind: 'course',
			name: 'Contabilidad Básica',
			code: '2401',
			type: 'mandatory',
			hours: 8,
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
			id: '2402',
			seqId: 3,
			kind: 'course',
			name: 'Derecho Público',
			code: '2402',
			type: 'mandatory',
			hours: 4,
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
			id: '2403',
			seqId: 4,
			kind: 'course',
			name: 'Introducción al Conocimiento Científico',
			code: '2403',
			type: 'mandatory',
			hours: 4,
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
			id: '2404',
			seqId: 5,
			kind: 'course',
			name: 'Historia Económica Social y Contemporánea',
			code: '2404',
			type: 'mandatory',
			hours: 4,
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
			id: '2405',
			seqId: 6,
			kind: 'course',
			name: 'Administración General',
			code: '2405',
			type: 'mandatory',
			hours: 8,
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
			id: '901',
			seqId: 7,
			kind: 'course',
			name: 'Inglés I',
			code: '901',
			type: 'mandatory',
			hours: 4,
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
			id: '2407',
			seqId: 8,
			kind: 'course',
			name: 'Estadística',
			code: '2407',
			type: 'mandatory',
			hours: 8,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2400',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2400',
					state: 'passed'
				}
			}
		},
		{
			id: '2411',
			seqId: 9,
			kind: 'course',
			name: 'Economía General',
			code: '2411',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2400',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2404',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2400',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2404',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2440',
			seqId: 10,
			kind: 'course',
			name: 'Derecho Civil y Comercial',
			code: '2440',
			type: 'mandatory',
			hours: 6,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2402',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2402',
					state: 'passed'
				}
			}
		},
		{
			id: '2441',
			seqId: 11,
			kind: 'course',
			name: 'Introducción al Comercio Internacional',
			code: '2441',
			type: 'mandatory',
			hours: 6,
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
			id: '2416',
			seqId: 12,
			kind: 'course',
			name: 'Macroeconomía',
			code: '2416',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2400',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2411',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2400',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2411',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2443',
			seqId: 13,
			kind: 'course',
			name: 'Legislación Aduanera',
			code: '2443',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2440',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2441',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2440',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2441',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '902',
			seqId: 14,
			kind: 'course',
			name: 'Inglés II',
			code: '902',
			type: 'mandatory',
			hours: 4,
			tags: ['year-2'],
			placements: [
				{
					sectionId: 'year-2',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '901',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '901',
					state: 'passed'
				}
			}
		},
		{
			id: '911',
			seqId: 15,
			kind: 'course',
			name: 'Computación I',
			code: '911',
			type: 'mandatory',
			hours: 4,
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
			id: '2439',
			seqId: 16,
			kind: 'course',
			name: 'Geografía Económica',
			code: '2439',
			type: 'mandatory',
			hours: 6,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {}
		},
		{
			id: '2444',
			seqId: 17,
			kind: 'course',
			name: 'Operatoria del Comercio Internacional',
			code: '2444',
			type: 'mandatory',
			hours: 6,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2443',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2443',
					state: 'passed'
				}
			}
		},
		{
			id: '2445',
			seqId: 18,
			kind: 'course',
			name: 'Valoración y Clasificación Arancelaria',
			code: '2445',
			type: 'mandatory',
			hours: 4,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2443',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2443',
					state: 'passed'
				}
			}
		},
		{
			id: '2446',
			seqId: 19,
			kind: 'course',
			name: 'Costos y Elementos de Finanzas',
			code: '2446',
			type: 'mandatory',
			hours: 6,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2401',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2401',
					state: 'passed'
				}
			}
		},
		{
			id: '2448',
			seqId: 20,
			kind: 'course',
			name: 'Práctica Aduanera',
			code: '2448',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2444',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2445',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2444',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2445',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2449',
			seqId: 21,
			kind: 'course',
			name: 'Logística Internacional',
			code: '2449',
			type: 'mandatory',
			hours: 4,
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
							itemId: '2439',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2444',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2439',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2444',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2450',
			seqId: 22,
			kind: 'course',
			name: 'Régimen Financiero del Comercio Internacional',
			code: '2450',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2441',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2441',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '912',
			seqId: 23,
			kind: 'course',
			name: 'Computación II',
			code: '912',
			type: 'mandatory',
			hours: 4,
			tags: ['year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '911',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '911',
					state: 'passed'
				}
			}
		},
		{
			id: '2451',
			seqId: 24,
			kind: 'course',
			name: 'Comercialización',
			code: '2451',
			type: 'mandatory',
			hours: 6,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2405',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2407',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2441',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2405',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2407',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2441',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2452',
			seqId: 25,
			kind: 'course',
			name: 'Investigación de Mercados',
			code: '2452',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2403',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2407',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2439',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2403',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2407',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2439',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2453',
			seqId: 26,
			kind: 'course',
			name: 'Integración Económica',
			code: '2453',
			type: 'mandatory',
			hours: 6,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2441',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2416',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2441',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2416',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2454',
			seqId: 27,
			kind: 'course',
			name: 'Planeamiento y Evaluación de Proyectos',
			code: '2454',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2407',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2444',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2407',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2444',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2455',
			seqId: 28,
			kind: 'course',
			name: 'Taller de Gestión Operativa del Comercio Internacional',
			code: '2455',
			type: 'mandatory',
			hours: 6,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2444',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2445',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2454',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2444',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2445',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2446',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2454',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2456',
			seqId: 29,
			kind: 'course',
			name: 'Economía Internacional',
			code: '2456',
			type: 'mandatory',
			hours: 6,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '2453',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2453',
					state: 'passed'
				}
			}
		},
		{
			id: '903',
			seqId: 30,
			kind: 'course',
			name: 'Inglés III',
			code: '903',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '902',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '902',
					state: 'passed'
				}
			}
		},
		{
			id: '904',
			seqId: 31,
			kind: 'course',
			name: 'Inglés IV',
			code: '904',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '903',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '903',
					state: 'passed'
				}
			}
		},
		{
			id: '2461',
			seqId: 32,
			kind: 'course',
			name: 'Inglés Técnico I',
			code: '2461',
			type: 'mandatory',
			hours: 4,
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'semestral'
				}
			],
			requirements: {
				enroll: {
					type: 'item',
					itemId: '903',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '903',
					state: 'passed'
				}
			}
		},
		{
			id: '2457',
			seqId: 33,
			kind: 'course',
			name: 'Relaciones Económicas Internacionales',
			code: '2457',
			type: 'mandatory',
			hours: 4,
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
					itemId: '2456',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2456',
					state: 'passed'
				}
			}
		},
		{
			id: '2458',
			seqId: 34,
			kind: 'course',
			name: 'Práctica Profesional',
			code: '2458',
			type: 'mandatory',
			hours: 8,
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
							itemId: '2452',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2455',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2452',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2455',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2459',
			seqId: 35,
			kind: 'course',
			name: 'Derecho Internacional',
			code: '2459',
			type: 'mandatory',
			hours: 6,
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
							itemId: '2443',
							state: 'taken'
						},
						{
							type: 'item',
							itemId: '2453',
							state: 'taken'
						}
					]
				},
				complete: {
					type: 'all',
					rules: [
						{
							type: 'item',
							itemId: '2443',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '2453',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '2462',
			seqId: 36,
			kind: 'course',
			name: 'Inglés Técnico II',
			code: '2462',
			type: 'mandatory',
			hours: 4,
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
					itemId: '2461',
					state: 'taken'
				},
				complete: {
					type: 'item',
					itemId: '2461',
					state: 'passed'
				}
			}
		},
		{
			id: 'titulo-intermedio-tu-comercio-internacional',
			seqId: 37,
			kind: 'milestone',
			name: 'Título intermedio: Técnico Universitario en Comercio Internacional',
			placements: [],
			requirements: {
				complete: {
					type: 'all',
					rules: [
						{
							type: 'count',
							selector: {
								type: 'section',
								sectionId: 'year-1'
							},
							min: 7,
							state: 'passed'
						},
						{
							type: 'count',
							selector: {
								type: 'section',
								sectionId: 'year-2'
							},
							min: 8,
							state: 'passed'
						},
						{
							type: 'count',
							selector: {
								type: 'section',
								sectionId: 'year-3'
							},
							min: 8,
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
			}
		]
	}
};
