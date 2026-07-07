import type { StudyPlanData } from '$lib/study-plan-data';

export const udemmLpe: StudyPlanData = {
	info: {
		degreeName: 'Licenciatura en Psicopedagogía',
		degreeSlug: 'LPE',
		universityName: 'Universidad de la Marina Mercante',
		universitySlug: 'UdeMM',
		sources: [
			{
				id: 1,
				label: 'Plan de Estudios',
				url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicopedagogia/'
			},
			{
				id: 2,
				label: 'Correlatividades',
				url: 'https://udemm.edu.ar/carreras/licenciatura-en-psicopedagogia/correlatividades-licenciatura-en-psicopedagogia/'
			},
			{
				id: 3,
				label: 'Plan de Estudios (PDF)',
				url: 'https://drive.google.com/file/d/1YBouzWEkKuIJF6gTEPMfW1ezHXYuv_6H/view?usp=sharing'
			}
		],
		notes: [
			{
				id: 1,
				text: 'El título intermedio de **Asistente Psicopedagógico R.M. N° 995/03** se modela como un **hito** que se completa al aprobar todas las materias de 1<sup>er</sup> año, 2<sup>do</sup> año y 3<sup>er</sup> año.'
			},
			{
				id: 2,
				text: 'Para rendir el examen final de **Seminario y Trabajo de Integración Final II** (4<sup>to</sup> año) se debe tener aprobadas todas las asignaturas curriculares, extracurriculares y las electivas correspondientes del plan de estudios.'
			},
			{
				id: 3,
				text: 'Opciones de materias electivas de 3<sup>er</sup> año:        \n - H0209. **Lenguaje y Comunicación**\n        \n - H0014. **Técnicas de Abordaje e Intervención en Crisis**\n        \n - H0218. **Comunicación**\n        \n - H0306. **Taller de Escritura**\n      '
			},
			{
				id: 4,
				text: 'Opciones de materias electivas de 4<sup>to</sup> año:        \n - H0222. **Psicología de la Tercera Edad**\n        \n - H0307. **Psicopedagogía Familiar**\n        \n - H0019. **Evaluación y Técnicas Psicológicas III**\n        \n - H0022. **Psicología Jurídica**\n      '
			},
			{
				id: 5,
				text: 'Se simplificaron las correlatividades eliminando requisitos redundantes para facilitar la lectura del plan, especialmente en materias con requisitos como *"Todo 1º y 2º año"* y *"Todo 3º año"*.'
			},
			{
				id: 6,
				text: '**Cursos faltantes detectados en correlatividades (en la web)**: H0013 (posiblemente "Psicología de la Personalidad"), H0011, H0049, H0232. Estos códigos aparecen en las correlatividades pero no están presentes en el plan de estudios oficial.'
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
			id: '200',
			seqId: 1,
			kind: 'course',
			name: 'Psicología General I',
			code: 'H0200',
			type: 'mandatory',
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
			name: 'Bases Biológicas y Neurológicas',
			code: 'H0002',
			type: 'mandatory',
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
			id: '308',
			seqId: 3,
			kind: 'course',
			name: 'Historia Educacional',
			code: 'H0308',
			type: 'mandatory',
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
			id: '202',
			seqId: 4,
			kind: 'course',
			name: 'Epistemología y Lógica',
			code: 'H0202',
			type: 'mandatory',
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
			id: '203',
			seqId: 5,
			kind: 'course',
			name: 'Filosofía',
			code: 'H0203',
			type: 'mandatory',
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
			id: '9',
			seqId: 6,
			kind: 'course',
			name: 'Fundamentos de Sociología',
			code: 'H0009',
			type: 'mandatory',
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
			id: '254',
			seqId: 7,
			kind: 'course',
			name: 'Inglés I',
			code: 'H0254',
			type: 'mandatory',
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
			id: '201',
			seqId: 8,
			kind: 'course',
			name: 'Psicología General II',
			code: 'H0201',
			type: 'mandatory',
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
					itemId: '200',
					state: 'passed'
				}
			}
		},
		{
			id: '12',
			seqId: 9,
			kind: 'course',
			name: 'Neuropsicología',
			code: 'H0012',
			type: 'mandatory',
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
					state: 'passed'
				}
			}
		},
		{
			id: '204',
			seqId: 10,
			kind: 'course',
			name: 'Metodología de las Ciencias',
			code: 'H0204',
			type: 'mandatory',
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
					itemId: '202',
					state: 'passed'
				}
			}
		},
		{
			id: '21',
			seqId: 11,
			kind: 'course',
			name: 'Psicosociología Educacional',
			code: 'H0021',
			type: 'mandatory',
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
					itemId: '308',
					state: 'passed'
				}
			}
		},
		{
			id: '205',
			seqId: 12,
			kind: 'course',
			name: 'Antropología',
			code: 'H0205',
			type: 'mandatory',
			tags: ['year-1'],
			placements: [
				{
					sectionId: 'year-1',
					term: 'secondSemester'
				}
			],
			requirements: {}
		},
		{
			id: '235',
			seqId: 13,
			kind: 'course',
			name: 'Fundamentos del Psicoanálisis I',
			code: 'H0235',
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
					type: 'item',
					itemId: '201',
					state: 'passed'
				}
			}
		},
		{
			id: '206',
			seqId: 14,
			kind: 'course',
			name: 'Psicología del Desarrollo I',
			code: 'H0206',
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
					type: 'item',
					itemId: '201',
					state: 'passed'
				}
			}
		},
		{
			id: '309',
			seqId: 15,
			kind: 'course',
			name: 'Psicopedagogía Cognitiva I',
			code: 'H0309',
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
					type: 'item',
					itemId: '21',
					state: 'passed'
				}
			}
		},
		{
			id: '10',
			seqId: 16,
			kind: 'course',
			name: 'Psicología Social',
			code: 'H0010',
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
					type: 'item',
					itemId: '9',
					state: 'passed'
				}
			}
		},
		{
			id: '237',
			seqId: 17,
			kind: 'course',
			name: 'Psicopatología I',
			code: 'H0237',
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
					type: 'item',
					itemId: '201',
					state: 'passed'
				}
			}
		},
		{
			id: '255',
			seqId: 18,
			kind: 'course',
			name: 'Inglés II',
			code: 'H0255',
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
					type: 'item',
					itemId: '254',
					state: 'passed'
				}
			}
		},
		{
			id: '236',
			seqId: 19,
			kind: 'course',
			name: 'Fundamentos del Psicoanálisis II',
			code: 'H0236',
			type: 'mandatory',
			attributes: ['mandatoryFinalExam'],
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
					itemId: '235',
					state: 'passed'
				}
			}
		},
		{
			id: '310',
			seqId: 20,
			kind: 'course',
			name: 'Psicopedagogía Cognitiva II',
			code: 'H0310',
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
					itemId: '309',
					state: 'passed'
				}
			}
		},
		{
			id: '238',
			seqId: 21,
			kind: 'course',
			name: 'Psicopatología II',
			code: 'H0238',
			type: 'mandatory',
			attributes: ['mandatoryFinalExam'],
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
					itemId: '237',
					state: 'passed'
				}
			}
		},
		{
			id: '207',
			seqId: 22,
			kind: 'course',
			name: 'Psicología del Desarrollo II',
			code: 'H0207',
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
					itemId: '206',
					state: 'passed'
				}
			}
		},
		{
			id: '20',
			seqId: 23,
			kind: 'course',
			name: 'Dinámica de Grupos',
			code: 'H0020',
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
					itemId: '9',
					state: 'passed'
				}
			}
		},
		{
			id: '15',
			seqId: 24,
			kind: 'course',
			name: 'Evaluación y Técnicas Psicológicas I',
			code: 'H0015',
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
					itemId: '206',
					state: 'passed'
				}
			}
		},
		{
			id: '42',
			seqId: 25,
			kind: 'course',
			name: 'Diagnóstico Psicopedagógico I',
			code: 'H0042',
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
							itemId: '310',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '238',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '18',
			seqId: 26,
			kind: 'course',
			name: 'Evaluación y Técnicas Psicológicas II',
			code: 'H0018',
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
							itemId: '15',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '236',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '45',
			seqId: 27,
			kind: 'course',
			name: 'Didáctica I',
			code: 'H0045',
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
					itemId: '21',
					state: 'passed'
				}
			}
		},
		{
			id: '311',
			seqId: 28,
			kind: 'course',
			name: 'Psicopedagogía Institucional y Organizacional',
			code: 'H0311',
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
					itemId: '20',
					state: 'passed'
				}
			}
		},
		{
			id: '247',
			seqId: 29,
			kind: 'course',
			name: 'Trabajo en Instituciones I',
			code: 'H0247',
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
							itemId: '203',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '12',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '204',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '205',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '10',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '255',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '236',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '310',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '238',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '207',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '20',
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
			id: '46',
			seqId: 30,
			kind: 'course',
			name: 'Didáctica II',
			code: 'H0046',
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
					type: 'item',
					itemId: '45',
					state: 'passed'
				}
			}
		},
		{
			id: '56',
			seqId: 31,
			kind: 'course',
			name: 'Psicomotricidad',
			code: 'H0056',
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
							itemId: '206',
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
			id: '43',
			seqId: 32,
			kind: 'course',
			name: 'Psicopedagogía en Educación Especial I',
			code: 'H0043',
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
							itemId: '207',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '238',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '210',
			seqId: 33,
			kind: 'course',
			name: 'Ética y Deontología Profesional',
			code: 'H0210',
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
					type: 'item',
					itemId: '203',
					state: 'passed'
				}
			}
		},
		{
			id: '248',
			seqId: 34,
			kind: 'course',
			name: 'Trabajo en Instituciones II',
			code: 'H0248',
			type: 'mandatory',
			attributes: ['mandatoryFinalExam'],
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
					itemId: '247',
					state: 'passed'
				}
			}
		},
		{
			id: '50',
			seqId: 35,
			kind: 'course',
			name: 'Diagnóstico Psicopedagógico II',
			code: 'H0050',
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
					type: 'item',
					itemId: '42',
					state: 'passed'
				}
			}
		},
		{
			id: '91',
			seqId: 36,
			kind: 'course',
			name: 'Materia Electiva I',
			type: 'elective',
			tags: ['progress-elective', 'year-3'],
			placements: [
				{
					sectionId: 'year-3',
					term: 'secondSemester'
				}
			],
			requirements: {}
		},
		{
			id: '302',
			seqId: 37,
			kind: 'course',
			name: 'Clínica Psicopedagógica I',
			code: 'H0302',
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
							itemId: '42',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '43',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '248',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '52',
			seqId: 38,
			kind: 'course',
			name: 'Observación y Práctica Profesional',
			code: 'H0052',
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
					type: 'item',
					itemId: '248',
					state: 'passed'
				}
			}
		},
		{
			id: '33',
			seqId: 39,
			kind: 'course',
			name: 'Orientación Vocacional y Ocupacional',
			code: 'H0033',
			type: 'mandatory',
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
					itemId: '18',
					state: 'passed'
				}
			}
		},
		{
			id: '249',
			seqId: 40,
			kind: 'course',
			name: 'Pre-Residencia I',
			code: 'H0249',
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
					type: 'item',
					itemId: '248',
					state: 'passed'
				}
			}
		},
		{
			id: '260',
			seqId: 41,
			kind: 'course',
			name: 'Pre-Residencia II',
			code: 'H0260',
			type: 'mandatory',
			attributes: ['mandatoryFinalExam'],
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
					itemId: '249',
					state: 'passed'
				}
			}
		},
		{
			id: '55',
			seqId: 42,
			kind: 'course',
			name: 'Psicopedagogía en Educación Especial II',
			code: 'H0055',
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
							itemId: '42',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '43',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '303',
			seqId: 43,
			kind: 'course',
			name: 'Seminario y Trabajo de Integración Final I',
			code: 'H0303',
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
							itemId: '18',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '311',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '46',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '56',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '43',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '210',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '248',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '50',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '91',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '53',
			seqId: 44,
			kind: 'course',
			name: 'Tratamiento Psicopedagógico',
			code: 'H0053',
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
							itemId: '18',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '42',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '43',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '304',
			seqId: 45,
			kind: 'course',
			name: 'Clínica Psicopedagógica II',
			code: 'H0304',
			type: 'mandatory',
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
					itemId: '302',
					state: 'passed'
				}
			}
		},
		{
			id: '305',
			seqId: 46,
			kind: 'course',
			name: 'Seminario y Trabajo de Integración Final II',
			code: 'H0305',
			type: 'mandatory',
			attributes: ['mandatoryFinalExam'],
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
							itemId: '303',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '302',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '52',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '53',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '55',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '249',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '92',
			seqId: 47,
			kind: 'course',
			name: 'Materia Electiva II',
			type: 'elective',
			tags: ['progress-elective', 'year-4'],
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
							itemId: '302',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '303',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '52',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '53',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '55',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '249',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '256',
			seqId: 48,
			kind: 'course',
			name: 'Computación',
			code: 'H0256',
			type: 'mandatory',
			tags: ['year-4'],
			placements: [
				{
					sectionId: 'year-4',
					term: 'secondSemester'
				}
			],
			requirements: {}
		},
		{
			id: '257',
			seqId: 49,
			kind: 'course',
			name: 'Trabajo Integrador Final',
			code: 'H0257',
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
							itemId: '33',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '260',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '304',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '305',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '92',
							state: 'passed'
						},
						{
							type: 'item',
							itemId: '256',
							state: 'passed'
						}
					]
				}
			}
		},
		{
			id: '233',
			seqId: 50,
			kind: 'course',
			name: 'Práctica Profesional Supervisada II',
			code: 'H0233',
			type: 'mandatory',
			tags: ['year-5'],
			placements: [
				{
					sectionId: 'year-5',
					term: 'annual'
				}
			],
			requirements: {}
		},
		{
			id: 'titulo-intermedio-asistente-psicopedagogico',
			seqId: 51,
			kind: 'milestone',
			name: 'Título intermedio: Asistente Psicopedagógico',
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
							min: 12,
							state: 'passed'
						},
						{
							type: 'count',
							selector: {
								type: 'section',
								sectionId: 'year-2'
							},
							min: 12,
							state: 'passed'
						},
						{
							type: 'count',
							selector: {
								type: 'section',
								sectionId: 'year-3'
							},
							min: 12,
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
