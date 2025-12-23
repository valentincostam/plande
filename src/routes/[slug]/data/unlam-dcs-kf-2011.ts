import { courseStates } from '$lib/course-state';
import { courseTypes } from '$lib/course-type';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';

import { requiredFor, type RawCourse } from '$lib/raw-course';
import type { StudyPlan } from '$lib/study-plan';

const courses: RawCourse[] = [
	// FIRST YEAR - Annual
	{
		id: 1627,
		code: '1627',
		name: 'Anatomía descriptiva y topográfica I',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1628,
		code: '1628',
		name: 'Bioquímica',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1629,
		code: '1629',
		name: 'Citología e Histología',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	// FIRST YEAR - Quarterly
	{
		id: 1630,
		code: '1630',
		name: 'Educación para la salud',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1631,
		code: '1631',
		name: 'Introducción al Pensamiento Científico',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1632,
		code: '1632',
		name: 'Biofísica',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1633,
		code: '1633',
		name: 'Psicosiociales',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1634,
		code: '1634',
		name: 'Embriología y desarrollo',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	{
		id: 1635,
		code: '1635',
		name: 'Historia de la Kinesiología',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 1,
		requirements: []
	},
	// SECOND YEAR - Annual
	{
		id: 1636,
		code: '1636',
		name: 'Fisiología',
		hours: 6,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1627,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1627,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// SECOND YEAR - Quarterly
	{
		id: 1637,
		code: '1637',
		name: 'Anatomía descriptiva y topográfica II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1627,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1627,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1638,
		code: '1638',
		name: 'Biomecánica y análisis del movimiento',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1637,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1637,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1639,
		code: '1639',
		name: 'Psicología social e institucional',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 1640,
		code: '1640',
		name: 'Epidemiología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 1641,
		code: '1641',
		name: 'Técnicas y evaluaciones kinésicas I',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1637,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1637,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1642,
		code: '1642',
		name: 'Atención primaria de la salud I',
		hours: 8,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 1643,
		code: '1643',
		name: 'Kinefilaxia',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	{
		id: 1644,
		code: '1644',
		name: 'Administración, organización y gestión de servicios de la salud',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: [
			{
				id: 1,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1645,
		code: '1645',
		name: 'Diagnóstico por imágenes',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 2,
		requirements: []
	},
	// THIRD YEAR - Annual
	{
		id: 1651,
		code: '1651',
		name: 'Atención comunitaria I',
		hours: 4,
		term: courseTerms.annual,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1635 y 1642
			// 1627 a 1635 (rango completo)
			{
				id: 1,
				requiredCourseId: 1627,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1627,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1642 (individual)
			{
				id: 19,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// THIRD YEAR - Quarterly
	{
		id: 1646,
		code: '1646',
		name: 'Técnica y evaluaciones kinésicas II',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1635 y 1637-1641
			// 1627 a 1635 (rango completo)
			{
				id: 1,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1637-1641 (individual)
			{
				id: 15,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1647,
		code: '1647',
		name: 'Kinefisiatría pediátrica y neonatal',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1638 y 1641-1645
			// 1627 a 1638 (rango completo)
			{
				id: 1,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1641-1645 (individual)
			{
				id: 13,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1648,
		code: '1648',
		name: 'Kinefisiatría cardiorrespiratoria',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1638 y 1641-1645
			// 1627 a 1638 (rango completo)
			{
				id: 1,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1641-1645 (individual)
			{
				id: 13,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1649,
		code: '1649',
		name: 'Kinefisiatría Traumato-ortopédica',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1638 y 1641-1645
			// 1627 a 1638 (rango completo)
			{
				id: 1,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1641-1645 (individual)
			{
				id: 13,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1650,
		code: '1650',
		name: 'Prótesis y ortesis',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1635 y 1641
			// 1627 a 1635 (rango completo)
			{
				id: 1,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1641 (individual)
			{
				id: 15,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1652,
		code: '1652',
		name: 'Psicomotricidad y estimulación temprana',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1635 y 1641-1643
			// 1627 a 1635 (rango completo)
			{
				id: 1,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1641-1643 (individual)
			{
				id: 15,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1653,
		code: '1653',
		name: 'Farmacología general',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1636
			// 1627 a 1636 (rango completo)
			{
				id: 1,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1654,
		code: '1654',
		name: 'Fisioterapia I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 3,
		requirements: [
			// 1627 a 1635
			// 1627 a 1635 (rango completo)
			{
				id: 1,
				requiredCourseId: 1627,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1627,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1628,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1628,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1629,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1629,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1630,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1630,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1631,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1631,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1632,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1632,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1633,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1633,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1634,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1634,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1635,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1635,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// FOURTH YEAR - Quarterly
	{
		id: 1655,
		code: '1655',
		name: 'Técnicas y evaluaciones kinésicas III',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1646
			// 1636 a 1646 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1656,
		code: '1656',
		name: 'Atención comunitaria II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1651
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1651 (individual)
			{
				id: 17,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1657,
		code: '1657',
		name: 'Metodología de la investigación',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1658,
		code: '1658',
		name: 'Historia argentina y latinoamericana de las Ciencias de la Salud',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1659,
		code: '1659',
		name: 'Deontología',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1647 a 1649
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1647 a 1649 (rango completo)
			{
				id: 11,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1660,
		code: '1660',
		name: 'Intensivismo',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1647 a 1649
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1647 a 1649 (rango completo)
			{
				id: 11,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1661,
		code: '1661',
		name: 'Fisioterapia II',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1653-1654
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1653-1654 (individual)
			{
				id: 17,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1662,
		code: '1662',
		name: 'Kinefisiatría gerontológica',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1649-1653-1654
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1649-1653-1654 (individual)
			{
				id: 11,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1663,
		code: '1663',
		name: 'Kinefisiatría estética',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645 y 1653-1654
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1653-1654 (individual)
			{
				id: 17,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1664,
		code: '1664',
		name: 'Kinefisiatría neurológica',
		hours: 5,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1646 y 1650
			// 1636 a 1646 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1650 (individual)
			{
				id: 19,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1665,
		code: '1665',
		name: 'Bioética y ética profesional',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 4,
		requirements: [
			// 1636 a 1645
			// 1636 a 1645 (rango completo)
			{
				id: 1,
				requiredCourseId: 1636,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1636,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1638,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1638,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1639,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1639,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1640,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1640,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1641,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1641,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1642,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1642,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1643,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1643,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1644,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1644,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1645,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1645,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// FIFTH YEAR - Quarterly
	{
		id: 1666,
		code: '1666',
		name: 'Kinefisiatría deportiva',
		hours: 6,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654 y 1661
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1661 (individual)
			{
				id: 15,
				requiredCourseId: 1661,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1661,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1667,
		code: '1667',
		name: 'Rehabilitación computacional',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654-0904-0911
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 904-911 (individual)
			{
				id: 19,
				requiredCourseId: 904,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 904,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 911,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 911,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1668,
		code: '1668',
		name: 'Auditoría y Kinesiología legal',
		hours: 3,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1669,
		code: '1669',
		name: 'Kinesiología ocupacional y laboral',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1670,
		code: '1670',
		name: 'Ergonomía',
		hours: 2,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1647,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1647,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1648,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1648,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1649,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1649,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1651,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1651,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1671,
		code: '1671',
		name: 'Kinefisiatría en Cuidados paliativos',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1646 a 1654 y 1656-1659-1660
			// 1646 a 1654 (rango completo)
			{
				id: 1,
				requiredCourseId: 1646,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1646,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1650,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1650,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1652,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1652,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1653,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1653,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1654,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1654,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			// 1656-1659-1660 (individual)
			{
				id: 11,
				requiredCourseId: 1656,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1656,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1659,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1659,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1660,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1660,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 1672,
		code: '1672',
		name: 'Seminario de integración y Práctica profesional',
		hours: 40,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		year: 5,
		requirements: [
			// 1627 a 1670
			// 1627 a 1670 (rango completo)
			{
				id: 1,
				requiredCourseId: 1655,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 1655,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 3,
				requiredCourseId: 1656,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 4,
				requiredCourseId: 1656,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 5,
				requiredCourseId: 1657,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 6,
				requiredCourseId: 1657,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 7,
				requiredCourseId: 1658,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 8,
				requiredCourseId: 1658,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 9,
				requiredCourseId: 1659,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 10,
				requiredCourseId: 1659,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 11,
				requiredCourseId: 1660,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 12,
				requiredCourseId: 1660,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 13,
				requiredCourseId: 1662,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 14,
				requiredCourseId: 1662,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 15,
				requiredCourseId: 1663,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 16,
				requiredCourseId: 1663,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 17,
				requiredCourseId: 1664,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 18,
				requiredCourseId: 1664,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 19,
				requiredCourseId: 1665,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 20,
				requiredCourseId: 1665,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 21,
				requiredCourseId: 1666,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 22,
				requiredCourseId: 1666,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 23,
				requiredCourseId: 1667,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 24,
				requiredCourseId: 1667,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 25,
				requiredCourseId: 1668,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 26,
				requiredCourseId: 1668,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 27,
				requiredCourseId: 1669,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 28,
				requiredCourseId: 1669,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			},
			{
				id: 29,
				requiredCourseId: 1670,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 30,
				requiredCourseId: 1670,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// TRANSVERSAL - English
	{
		id: 901,
		code: '0901',
		name: 'Inglés I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 902,
		code: '0902',
		name: 'Inglés II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: [
			{
				id: 1,
				requiredCourseId: 901,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 901,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 903,
		code: '0903',
		name: 'Inglés III',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: [
			{
				id: 1,
				requiredCourseId: 902,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 902,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	{
		id: 904,
		code: '0904',
		name: 'Inglés IV',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: [
			{
				id: 1,
				requiredCourseId: 903,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 903,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	},
	// TRANSVERSAL - Computing
	{
		id: 911,
		code: '0911',
		name: 'Computación I',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: []
	},
	{
		id: 912,
		code: '0912',
		name: 'Computación II',
		hours: 4,
		term: courseTerms.semestral,
		type: courseTypes.mandatory,
		attributes: [courseAttributes.transversal],
		requirements: [
			{
				id: 1,
				requiredCourseId: 911,
				requiredState: courseStates.taken,
				requiredFor: requiredFor.enroll
			},
			{
				id: 2,
				requiredCourseId: 911,
				requiredState: courseStates.passed,
				requiredFor: requiredFor.complete
			}
		]
	}
];

export const unlamDcsKf2011: StudyPlan = {
	courses,
	degreeName: 'Licenciatura en Kinesiología y Fisiatría',
	degreeSlug: 'KF',
	universityName: 'Universidad Nacional de La Matanza',
	universitySlug: 'UNLaM',
	collegeName: 'Departamento de Ciencias de la Salud',
	collegeSlug: 'DCS',
	durationYears: 5,
	year: 2011,
	progress: {
		type: 'mandatory-only'
	},
	sources: [
		{
			id: 1,
			label: 'Plan de Estudios',
			url: 'https://salud.unlam.edu.ar/index.php?seccion=3&idArticulo=17'
		}
	],
	notes: [
		{
			id: 1,
			text: `Se omiten requisitos redundantes. Por ejemplo, **Anatomía descriptiva y topográfica I** de 1<sup>er</sup> año no se exige para cursar **Biomecánica y análisis del movimiento** de 2<sup>do</sup> año porque ya es requisito para cursar **Anatomía descriptiva y topográfica II** de 2<sup>do</sup> año, que también es necesaria para cursar **Biomecánica y análisis del movimiento**.`
		}
	]
};
