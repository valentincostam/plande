import { grad, place, req } from '$lib/study-plan-helpers';
import type { StudyPlanData, RequirementExpr } from '$lib/study-plan-data';

const complete = (...itemIds: string[]): RequirementExpr =>
	req.all(...itemIds.map((itemId) => req.item(itemId, 'passed')));

const curriculumCourseIds = [
	'D1001',
	'F1301',
	'M1602',
	'M1608',
	'F1302',
	'F1303',
	'U1901',
	'F1304',
	'F1305',
	'M1603',
	'F1306',
	'F1315',
	'M1604',
	'M1605',
	'A1009',
	'A1052',
	'C1151',
	'F1316',
	'A1050',
	'C1153',
	'E1282',
	'M1614',
	'M1681',
	'P1752',
	'E1286',
	'M1619',
	'M1621',
	'M1628',
	'A1053',
	'E1236',
	'M1613',
	'M1618',
	'M1622',
	'E1240',
	'E1285',
	'M1632',
	'M1643',
	'P1759',
	'M1633',
	'M1636',
	'M1662'
];

const approvedOtherCurriculumCourses = (ownerItemId: string, min: number): RequirementExpr =>
	req.countItems(
		curriculumCourseIds.filter((itemId) => itemId !== ownerItemId),
		min,
		'passed'
	);

const yearTag = (year: number) => [`curriculum-course`, `year-${year}`];

export const unlpFiIem2018: StudyPlanData = {
	info: {
		degreeName: 'Ingeniería Electromecánica',
		degreeSlug: 'IEM',
		universityName: 'Universidad Nacional de La Plata',
		universitySlug: 'UNLP',
		collegeName: 'Facultad de Ingeniería',
		collegeSlug: 'FI',
		year: 2018,
		sources: [
			{
				id: 1,
				label: 'Plan de Estudios 2018',
				url: 'https://www1.ing.unlp.edu.ar/sitio/academica/asignaturas/plan.php?carrera=electromecanica'
			}
		],
		notes: [
			{
				id: 1,
				text: 'La tabla oficial usa la columna **Correlativas para aprobar**. En este plan, las correlativas explícitas de la tabla se modelan como requisitos para **aprobar** la materia, salvo cuando la propia documentación agrega una restricción más específica.'
			},
			{
				id: 2,
				text: 'La **Prueba de Suficiencia de Inglés** se modela como un **hito** independiente. Se recomienda completarla antes del 6° semestre y la documentación oficial exige tenerla completada antes de comenzar el 9° semestre.'
			},
			{
				id: 3,
				text: 'Las **optativas** exigen completar **128 horas totales**. Para poder representar esa regla en el modelo actual, esas horas totales se cargan en `credits` y el egreso las suma con esa métrica.'
			},
			{
				id: 4,
				text: 'Las **Actividades de Formación Complementaria** se modelan como items obligatorios secuenciales (`AFC1` a `AFC5`). La documentación oficial además exige completar **50 puntos** en total entre ellas.'
			},
			{
				id: 5,
				text: 'La **Electiva Humanística** se modela como un requisito de egreso de **1 materia aprobada** dentro de la sección correspondiente.'
			}
		]
	},
	sections: [
		{ id: 'year-1', label: '1er Año' },
		{ id: 'year-2', label: '2do Año' },
		{ id: 'year-3', label: '3er Año' },
		{ id: 'year-4', label: '4to Año' },
		{ id: 'year-5', label: '5to Año' },
		{ id: 'idioma', label: 'Idioma' },
		{ id: 'electiva-humanistica', label: 'Electiva Humanística' },
		{ id: 'optativas', label: 'Optativas' },
		{ id: 'afc', label: 'Actividades de Formación Complementaria' }
	],
	items: [
		{
			id: 'D1001',
			seqId: 1,
			kind: 'course',
			code: 'D1001',
			name: 'Matemática para Ingeniería',
			type: 'mandatory',
			hours: 25,
			tags: yearTag(1),
			placements: [place.year(1, 'firstSemester', 1)]
		},
		{
			id: 'F1301',
			seqId: 2,
			kind: 'course',
			code: 'F1301',
			name: 'Matemática A',
			type: 'mandatory',
			hours: 12,
			tags: yearTag(1),
			placements: [place.year(1, 'firstSemester', 2)],
			requirements: { complete: complete('D1001') }
		},
		{
			id: 'M1602',
			seqId: 3,
			kind: 'course',
			code: 'M1602',
			name: 'Gráfica para Ingeniería',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(1),
			placements: [place.year(1, 'firstSemester', 3)]
		},
		{
			id: 'M1608',
			seqId: 4,
			kind: 'course',
			code: 'M1608',
			name: 'Introducción a la Ingeniería Mecánica y Electromecánica',
			type: 'mandatory',
			hours: 3,
			tags: yearTag(1),
			placements: [place.year(1, 'firstSemester', 4)]
		},
		{
			id: 'F1302',
			seqId: 5,
			kind: 'course',
			code: 'F1302',
			name: 'Matemática B',
			type: 'mandatory',
			hours: 12,
			tags: yearTag(1),
			placements: [place.year(1, 'secondSemester', 1)],
			requirements: { complete: complete('F1301') }
		},
		{
			id: 'F1303',
			seqId: 6,
			kind: 'course',
			code: 'F1303',
			name: 'Física I',
			type: 'mandatory',
			hours: 8,
			tags: yearTag(1),
			placements: [place.year(1, 'secondSemester', 2)],
			requirements: { complete: complete('F1301') }
		},
		{
			id: 'U1901',
			seqId: 7,
			kind: 'course',
			code: 'U1901',
			name: 'Química para Ingeniería',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(1),
			placements: [place.year(1, 'secondSemester', 3)]
		},

		{
			id: 'F1304',
			seqId: 8,
			kind: 'course',
			code: 'F1304',
			name: 'Matemática C',
			type: 'mandatory',
			hours: 9,
			tags: yearTag(2),
			placements: [place.year(2, 'firstSemester', 1)],
			requirements: { complete: complete('F1302') }
		},
		{
			id: 'F1305',
			seqId: 9,
			kind: 'course',
			code: 'F1305',
			name: 'Física II',
			type: 'mandatory',
			hours: 8,
			tags: yearTag(2),
			placements: [place.year(2, 'firstSemester', 2)],
			requirements: { complete: complete('F1302', 'F1303') }
		},
		{
			id: 'M1603',
			seqId: 10,
			kind: 'course',
			code: 'M1603',
			name: 'Materiales',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(2),
			placements: [place.year(2, 'firstSemester', 3)],
			requirements: { complete: complete('U1901') }
		},
		{
			id: 'F1306',
			seqId: 11,
			kind: 'course',
			code: 'F1306',
			name: 'Matemática D',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(2),
			placements: [place.year(2, 'secondSemester', 1)],
			requirements: { complete: complete('F1304') }
		},
		{
			id: 'F1315',
			seqId: 12,
			kind: 'course',
			code: 'F1315',
			name: 'Probabilidades y Estadística',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(2),
			placements: [place.year(2, 'secondSemester', 2)],
			requirements: { complete: complete('F1302') }
		},
		{
			id: 'M1604',
			seqId: 13,
			kind: 'course',
			code: 'M1604',
			name: 'Termodinámica',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(2),
			placements: [place.year(2, 'secondSemester', 3)],
			requirements: { complete: complete('F1302', 'F1303', 'U1901') }
		},
		{
			id: 'M1605',
			seqId: 14,
			kind: 'course',
			code: 'M1605',
			name: 'Tecnología para la Fabricación I',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(2),
			placements: [place.year(2, 'secondSemester', 4)],
			requirements: { complete: complete('M1603') }
		},

		{
			id: 'A1009',
			seqId: 15,
			kind: 'course',
			code: 'A1009',
			name: 'Mecánica Racional',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'firstSemester', 1)],
			requirements: { complete: complete('F1303', 'F1304') }
		},
		{
			id: 'A1052',
			seqId: 16,
			kind: 'course',
			code: 'A1052',
			name: 'Mecánica de los Fluidos',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'firstSemester', 2)],
			requirements: { complete: complete('F1303', 'F1304') }
		},
		{
			id: 'C1151',
			seqId: 17,
			kind: 'course',
			code: 'C1151',
			name: 'Estructuras I',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'firstSemester', 3)],
			requirements: { complete: complete('F1302', 'F1303') }
		},
		{
			id: 'F1316',
			seqId: 18,
			kind: 'course',
			code: 'F1316',
			name: 'Introducción a la Programación y Análisis Numérico',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(3),
			placements: [place.year(3, 'firstSemester', 4)],
			requirements: { complete: complete('F1304') }
		},
		{
			id: 'A1050',
			seqId: 19,
			kind: 'course',
			code: 'A1050',
			name: 'Mecanismos y Elementos de Máquinas',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'secondSemester', 1)],
			requirements: { complete: complete('A1009', 'C1151', 'M1603') }
		},
		{
			id: 'C1153',
			seqId: 20,
			kind: 'course',
			code: 'C1153',
			name: 'Estructuras II',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'secondSemester', 2)],
			requirements: { complete: complete('C1151', 'M1603') }
		},
		{
			id: 'E1282',
			seqId: 21,
			kind: 'course',
			code: 'E1282',
			name: 'Electrotecnia y Electrónica',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(3),
			placements: [place.year(3, 'secondSemester', 3)],
			requirements: { complete: complete('F1304', 'F1305') }
		},
		{
			id: 'M1614',
			seqId: 22,
			kind: 'course',
			code: 'M1614',
			name: 'Fundamentos de Transferencia de Calor y Masa',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(3),
			placements: [place.year(3, 'secondSemester', 4)],
			requirements: { complete: complete('M1604') }
		},
		{
			id: 'M1681',
			seqId: 23,
			kind: 'course',
			code: 'M1681',
			name: 'Higiene, Seguridad y Desarrollo Sustentable',
			type: 'mandatory',
			hours: 3,
			tags: yearTag(3),
			placements: [place.year(3, 'secondSemester', 5)],
			requirements: { complete: complete('U1901') }
		},
		{
			id: 'P1752',
			seqId: 24,
			kind: 'course',
			code: 'P1752',
			name: 'Economía para Ingenieros y Organización Industrial',
			type: 'mandatory',
			hours: 3,
			tags: yearTag(4),
			placements: [place.year(4, 'firstSemester', 5)],
			requirements: { complete: approvedOtherCurriculumCourses('P1752', 15) }
		},

		{
			id: 'E1286',
			seqId: 25,
			kind: 'course',
			code: 'E1286',
			name: 'Máquinas Eléctricas',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(4),
			placements: [place.year(4, 'firstSemester', 1)],
			requirements: { complete: complete('E1282') }
		},
		{
			id: 'M1619',
			seqId: 26,
			kind: 'course',
			code: 'M1619',
			name: 'Mediciones e Instrumental',
			type: 'mandatory',
			hours: 3,
			tags: yearTag(4),
			placements: [place.year(4, 'firstSemester', 2)],
			requirements: { complete: complete('A1052', 'F1315', 'M1604') }
		},
		{
			id: 'M1621',
			seqId: 27,
			kind: 'course',
			code: 'M1621',
			name: 'Tecnología para la Fabricación II',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(4),
			placements: [place.year(4, 'firstSemester', 3)],
			requirements: { complete: complete('M1605') }
		},
		{
			id: 'M1628',
			seqId: 28,
			kind: 'course',
			code: 'M1628',
			name: 'Máquinas Rotativas',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(4),
			placements: [place.year(4, 'firstSemester', 4)],
			requirements: { complete: complete('A1052', 'M1614') }
		},
		{
			id: 'A1053',
			seqId: 29,
			kind: 'course',
			code: 'A1053',
			name: 'Sistemas Hidráulicos y Neumáticos',
			type: 'mandatory',
			hours: 4,
			tags: yearTag(4),
			placements: [place.year(4, 'secondSemester', 1)],
			requirements: { complete: complete('A1052') }
		},
		{
			id: 'E1236',
			seqId: 30,
			kind: 'course',
			code: 'E1236',
			name: 'Dispositivos e Instalaciones Eléctricas I',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(4),
			placements: [place.year(4, 'secondSemester', 2)],
			requirements: { complete: complete('E1286') }
		},
		{
			id: 'M1613',
			seqId: 31,
			kind: 'course',
			code: 'M1613',
			name: 'Dinámica de Sistemas',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(4),
			placements: [place.year(4, 'secondSemester', 3)],
			requirements: { complete: complete('A1052', 'F1316', 'M1604') }
		},
		{
			id: 'M1618',
			seqId: 32,
			kind: 'course',
			code: 'M1618',
			name: 'Máquinas Alternativas',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(4),
			placements: [place.year(4, 'secondSemester', 4)],
			requirements: { complete: complete('A1052', 'M1614') }
		},
		{
			id: 'M1622',
			seqId: 33,
			kind: 'course',
			code: 'M1622',
			name: 'Instalaciones Industriales Frigoríficas y de Vapor',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(4),
			placements: [place.year(4, 'secondSemester', 5)],
			requirements: { complete: complete('M1628') }
		},

		{
			id: 'E1240',
			seqId: 34,
			kind: 'course',
			code: 'E1240',
			name: 'Dispositivos e Instalaciones Eléctricas II',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(5),
			placements: [place.year(5, 'firstSemester', 1)],
			requirements: {
				complete: req.all(req.item('E1236', 'passed'), req.item('M0001', 'completed'))
			}
		},
		{
			id: 'E1285',
			seqId: 35,
			kind: 'course',
			code: 'E1285',
			name: 'Instalaciones de Transmisión y Distribución de Energía Eléctrica',
			type: 'mandatory',
			hours: 6,
			tags: yearTag(5),
			placements: [place.year(5, 'firstSemester', 2)],
			requirements: {
				complete: req.all(req.item('E1236', 'passed'), req.item('M0001', 'completed'))
			}
		},
		{
			id: 'M1632',
			seqId: 36,
			kind: 'course',
			code: 'M1632',
			name: 'Proyecto Integral de Plantas',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(5),
			placements: [place.year(5, 'annual', 3)],
			requirements: {
				complete: req.all(
					req.item('E1236', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1621', 'passed')
				)
			}
		},
		{
			id: 'M1643',
			seqId: 37,
			kind: 'course',
			code: 'M1643',
			name: 'Energías Alternativas',
			type: 'mandatory',
			hours: 4,
			tags: yearTag(5),
			placements: [place.year(5, 'firstSemester', 4)],
			requirements: {
				complete: req.all(
					req.item('E1236', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1614', 'passed')
				)
			}
		},
		{
			id: 'P1759',
			seqId: 38,
			kind: 'course',
			code: 'P1759',
			name: 'Ingeniería Legal y Ejercicio Profesional',
			type: 'mandatory',
			hours: 3,
			tags: yearTag(5),
			placements: [place.year(5, 'firstSemester', 5)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('P1759', 30)
				)
			}
		},
		{
			id: 'M1633',
			seqId: 39,
			kind: 'course',
			code: 'M1633',
			name: 'Mantenimiento de Plantas Industriales',
			type: 'mandatory',
			hours: 5,
			tags: yearTag(5),
			placements: [place.year(5, 'secondSemester', 1)],
			requirements: {
				complete: req.all(
					req.item('E1286', 'passed'),
					req.item('M0001', 'completed'),
					req.item('P1752', 'passed')
				)
			}
		},
		{
			id: 'M1636',
			seqId: 40,
			kind: 'course',
			code: 'M1636',
			name: 'Automatización I',
			type: 'mandatory',
			hours: 4,
			tags: yearTag(5),
			placements: [place.year(5, 'secondSemester', 2)],
			requirements: {
				complete: req.all(
					req.item('A1053', 'passed'),
					req.item('E1286', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1613', 'passed')
				)
			}
		},
		{
			id: 'M1662',
			seqId: 41,
			kind: 'course',
			code: 'M1662',
			name: 'Práctica Profesional Supervisada (Electromecánica)',
			type: 'mandatory',
			hours: 0,
			tags: yearTag(5),
			placements: [place.year(5, 'secondSemester', 3)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('M1662', 34)
				)
			}
		},

		{
			id: 'M0001',
			seqId: 42,
			kind: 'milestone',
			code: 'M0001',
			name: 'Prueba de Suficiencia de Inglés',
			placements: [],
			requirements: {}
		},
		{
			id: 'AFC1',
			seqId: 43,
			kind: 'course',
			code: 'AFC1',
			name: 'Actividades de Formación Complementaria I',
			type: 'mandatory',
			tags: ['afc'],
			placements: [place.section('afc', undefined, 1)],
			requirements: { complete: approvedOtherCurriculumCourses('AFC1', 10) }
		},
		{
			id: 'AFC2',
			seqId: 44,
			kind: 'course',
			code: 'AFC2',
			name: 'Actividades de Formación Complementaria II',
			type: 'mandatory',
			tags: ['afc'],
			placements: [place.section('afc', undefined, 2)],
			requirements: { complete: complete('AFC1') }
		},
		{
			id: 'AFC3',
			seqId: 45,
			kind: 'course',
			code: 'AFC3',
			name: 'Actividades de Formación Complementaria III',
			type: 'mandatory',
			tags: ['afc'],
			placements: [place.section('afc', undefined, 3)],
			requirements: { complete: complete('AFC2') }
		},
		{
			id: 'AFC4',
			seqId: 46,
			kind: 'course',
			code: 'AFC4',
			name: 'Actividades de Formación Complementaria IV',
			type: 'mandatory',
			tags: ['afc'],
			placements: [place.section('afc', undefined, 4)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('AFC3', 'passed'))
			}
		},
		{
			id: 'AFC5',
			seqId: 47,
			kind: 'course',
			code: 'AFC5',
			name: 'Actividades de Formación Complementaria V',
			type: 'mandatory',
			tags: ['afc'],
			placements: [place.section('afc', undefined, 5)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('AFC4', 'passed'))
			}
		},

		{
			id: 'S0012',
			seqId: 48,
			kind: 'course',
			code: 'S0012',
			name: 'Historia Social de la Tecnología y la Ingeniería',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 1)],
			requirements: { complete: approvedOtherCurriculumCourses('S0012', 5) }
		},
		{
			id: 'S0016',
			seqId: 49,
			kind: 'course',
			code: 'S0016',
			name: 'Cuestión Malvinas: Políticas Soberanas',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 2)],
			requirements: { complete: approvedOtherCurriculumCourses('S0016', 5) }
		},
		{
			id: 'S0017',
			seqId: 50,
			kind: 'course',
			code: 'S0017',
			name: 'Educación, Ciencia, Tecnología e Industria',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 3)],
			requirements: { complete: approvedOtherCurriculumCourses('S0017', 5) }
		},
		{
			id: 'S0018',
			seqId: 51,
			kind: 'course',
			code: 'S0018',
			name: 'Idioma Chino Básico',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 4)],
			requirements: { complete: approvedOtherCurriculumCourses('S0018', 5) }
		},
		{
			id: 'S2002',
			seqId: 52,
			kind: 'course',
			code: 'S2002',
			name: 'Gestión de Cooperativas',
			type: 'elective',
			hours: 6,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 5)],
			requirements: { complete: complete('P1752') }
		},
		{
			id: 'S0001',
			seqId: 53,
			kind: 'course',
			code: 'S0001',
			name: 'Humanística A',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 6)],
			requirements: { complete: approvedOtherCurriculumCourses('S0001', 5) }
		},
		{
			id: 'S0002',
			seqId: 54,
			kind: 'course',
			code: 'S0002',
			name: 'Humanística B',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 7)],
			requirements: { complete: approvedOtherCurriculumCourses('S0002', 5) }
		},
		{
			id: 'S0009',
			seqId: 55,
			kind: 'course',
			code: 'S0009',
			name: 'Talleres de Herramientas Humanísticas',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 8)],
			requirements: { complete: approvedOtherCurriculumCourses('S0009', 15) }
		},
		{
			id: 'S0010',
			seqId: 56,
			kind: 'course',
			code: 'S0010',
			name: 'Ingeniería, Comunicación y Educación',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 9)],
			requirements: { complete: approvedOtherCurriculumCourses('S0010', 5) }
		},
		{
			id: 'S0011',
			seqId: 57,
			kind: 'course',
			code: 'S0011',
			name: 'Ingeniería Social',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 10)],
			requirements: { complete: approvedOtherCurriculumCourses('S0011', 5) }
		},
		{
			id: 'S0013',
			seqId: 58,
			kind: 'course',
			code: 'S0013',
			name: 'Empleabilidad y Gestión de la Carrera Profesional en Ingeniería',
			type: 'elective',
			hours: 3,
			tags: ['humanistica'],
			placements: [place.section('electiva-humanistica', undefined, 11)],
			requirements: { complete: approvedOtherCurriculumCourses('S0013', 5) }
		},

		{
			id: 'D1102',
			seqId: 59,
			kind: 'course',
			code: 'D1102',
			name: 'Relaciones Humanas en el Ámbito del Desarrollo de las Ingenierías',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 1)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('D1102', 30)
				)
			}
		},
		{
			id: 'M1634',
			seqId: 60,
			kind: 'course',
			code: 'M1634',
			name: 'Conformado Plástico de Metales y Pulvimetalurgia',
			type: 'optative',
			hours: 6,
			credits: 192,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 2)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1621', 'passed'))
			}
		},
		{
			id: 'M1687',
			seqId: 61,
			kind: 'course',
			code: 'M1687',
			name: 'Análisis de Falla en Componentes Mecánicos y Piezas de Acero',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 3)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1621', 'passed'))
			}
		},
		{
			id: 'A1008',
			seqId: 62,
			kind: 'course',
			code: 'A1008',
			name: 'Estructuras III',
			type: 'optative',
			hours: 6,
			credits: 96,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 4)],
			requirements: {
				complete: req.all(req.item('C1153', 'passed'), req.item('M0001', 'completed'))
			}
		},
		{
			id: 'A1012',
			seqId: 63,
			kind: 'course',
			code: 'A1012',
			name: 'Sistemas Dinámicos',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 5)],
			requirements: {
				complete: req.all(
					req.item('A1008', 'passed'),
					req.item('A1009', 'passed'),
					req.item('F1305', 'passed'),
					req.item('F1315', 'passed'),
					req.item('M0001', 'completed')
				)
			}
		},
		{
			id: 'A1108',
			seqId: 64,
			kind: 'course',
			code: 'A1108',
			name: 'Introducción a la Mecánica de Fluidos Computacional',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 6)],
			requirements: {
				complete: req.all(
					req.item('A1052', 'passed'),
					req.item('F1301', 'passed'),
					req.item('M0001', 'completed')
				)
			}
		},
		{
			id: 'A1109',
			seqId: 65,
			kind: 'course',
			code: 'A1109',
			name: 'Introducción al Método de los Elementos Finitos Aplicados al Análisis Estructural',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 7)],
			requirements: {
				complete: req.all(
					req.item('A1008', 'passed'),
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('A1109', 30)
				)
			}
		},
		{
			id: 'D2003',
			seqId: 66,
			kind: 'course',
			code: 'D2003',
			name: 'Logística Aplicada',
			type: 'optative',
			hours: 3,
			credits: 48,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 8)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('D2003', 30)
				)
			}
		},
		{
			id: 'D2004',
			seqId: 67,
			kind: 'course',
			code: 'D2004',
			name: 'Sustentabilidad y Triple Impacto',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 9)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('D2004', 30)
				)
			}
		},
		{
			id: 'E1238',
			seqId: 68,
			kind: 'course',
			code: 'E1238',
			name: 'Generación de Energía Eléctrica',
			type: 'optative',
			hours: 6,
			credits: 96,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 10)],
			requirements: {
				complete: req.all(
					req.item('E1236', 'passed'),
					req.item('E1286', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1604', 'passed')
				)
			}
		},
		{
			id: 'E1243',
			seqId: 69,
			kind: 'course',
			code: 'E1243',
			name: 'Distribución de la Energía Eléctrica',
			type: 'optative',
			hours: 6,
			credits: 96,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 11)],
			requirements: {
				complete: req.all(req.item('E1240', 'passed'), req.item('M0001', 'completed'))
			}
		},
		{
			id: 'H1510',
			seqId: 70,
			kind: 'course',
			code: 'H1510',
			name: 'Máquinas Hidráulicas',
			type: 'optative',
			hours: 2,
			credits: 32,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 12)],
			requirements: {
				complete: req.all(req.item('A1052', 'passed'), req.item('M0001', 'completed'))
			}
		},
		{
			id: 'M1626',
			seqId: 71,
			kind: 'course',
			code: 'M1626',
			name: 'Tecnología de Unión de Materiales',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 13)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1603', 'passed'))
			}
		},
		{
			id: 'M1627',
			seqId: 72,
			kind: 'course',
			code: 'M1627',
			name: 'Proyecto de Máquinas',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 14)],
			requirements: {
				complete: req.all(
					req.item('F1316', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1621', 'passed')
				)
			}
		},
		{
			id: 'M1637',
			seqId: 73,
			kind: 'course',
			code: 'M1637',
			name: 'Automatización II',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 15)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1636', 'passed'))
			}
		},
		{
			id: 'M1640',
			seqId: 74,
			kind: 'course',
			code: 'M1640',
			name: 'Automotores y Máquinas Agrícolas',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 16)],
			requirements: { complete: complete('A1050', 'M1618') }
		},
		{
			id: 'M1641',
			seqId: 75,
			kind: 'course',
			code: 'M1641',
			name: 'Mantenimiento de Equipos de Transporte',
			type: 'optative',
			hours: 3,
			credits: 48,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 17)],
			requirements: {
				complete: req.all(
					req.item('A1050', 'passed'),
					req.item('E1286', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1604', 'passed'),
					req.item('P1752', 'passed')
				)
			}
		},
		{
			id: 'M1642',
			seqId: 76,
			kind: 'course',
			code: 'M1642',
			name: 'Termoeconomía y Uso Racional de la Energía en Sistemas Térmicos',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 18)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1622', 'passed'))
			}
		},
		{
			id: 'M1646',
			seqId: 77,
			kind: 'course',
			code: 'M1646',
			name: 'Diseño e Ingeniería Asistidos por Computadora',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 19)],
			requirements: {
				complete: req.all(req.item('M0001', 'completed'), req.item('M1627', 'passed'))
			}
		},
		{
			id: 'M1647',
			seqId: 78,
			kind: 'course',
			code: 'M1647',
			name: 'Planificación y Administración de Proyectos y Obras',
			type: 'optative',
			hours: 5,
			credits: 80,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 20)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					req.item('M1632', 'passed'),
					req.item('M1681', 'passed')
				)
			}
		},
		{
			id: 'M1661',
			seqId: 79,
			kind: 'course',
			code: 'M1661',
			name: 'Trabajo Final',
			type: 'optative',
			hours: 8,
			credits: 128,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 21)],
			requirements: {
				complete: req.all(
					req.item('M0001', 'completed'),
					approvedOtherCurriculumCourses('M1661', 30)
				)
			}
		},
		{
			id: 'M1686',
			seqId: 80,
			kind: 'course',
			code: 'M1686',
			name: 'Vehículos y Máquinas Ferroviarias',
			type: 'optative',
			hours: 4,
			credits: 64,
			tags: ['optativas'],
			placements: [place.section('optativas', undefined, 22)],
			requirements: {
				complete: req.all(
					req.item('E1286', 'passed'),
					req.item('M0001', 'completed'),
					req.item('M1604', 'passed')
				)
			}
		}
	],
	requirements: {
		graduation: [
			grad.allMandatory('mandatory', 'Materias obligatorias'),
			grad.countTag('humanistica', 'Electiva humanística requerida', 'humanistica', 1, 'passed'),
			grad.sumTag('optativas', 'Horas optativas requeridas', 'optativas', 'credits', 128, 'passed')
		]
	}
};
