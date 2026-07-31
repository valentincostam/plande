import { describe, expect, it } from 'vitest';
import type { PlanItem, StudyPlanData } from '$lib/study-plan-data';
import { getStudyPlanDataSlugWithYear } from '$lib/study-plan-data';
import { ucaeceLp2023 } from './ucaece-lp-2023';
import { uccuyoFdcsAb2018 } from './uccuyo-fdcs-ab-2018';
import { umEsenLrp2023 } from './um-esen-lrp-2023';
import { unlamDcsLn2011 } from './unlam-dcs-ln-2011';
import { unpsjbFiIf } from './unpsjb-fi-if';
import { utnFrcIsi2023 } from './utn-frc-isi-2023';

const item = (plan: StudyPlanData, id: string): PlanItem => {
	const match = plan.items.find((candidate) => candidate.id === id);
	if (!match) throw new Error(`Missing item ${id}`);
	return match;
};

describe('main study plan sync', () => {
	it.each([
		[uccuyoFdcsAb2018, 'uccuyo-fdcs-ab-2018', 44],
		[umEsenLrp2023, 'um-esen-lrp-2023', 51],
		[unlamDcsLn2011, 'unlam-dcs-ln-2011', 44],
		[unpsjbFiIf, 'unpsjb-fi-if', 47]
	] as const)('registers the complete native plan for %s', (plan, slug, itemCount) => {
		expect(getStudyPlanDataSlugWithYear(plan)).toBe(slug);
		expect(plan.items).toHaveLength(itemCount);
	});

	it('ports UCAECE corrections without changing historical seqIds', () => {
		expect(item(ucaeceLp2023, '2')).toMatchObject({
			seqId: 2,
			name: 'Historia de la Psicología'
		});
		expect(item(ucaeceLp2023, '4')).toMatchObject({ seqId: 4, name: 'Sociología' });
		expect(item(ucaeceLp2023, '15').requirements).toEqual({
			enroll: {
				type: 'all',
				rules: [
					{ type: 'item', itemId: '8', state: 'taken' },
					{ type: 'item', itemId: '6', state: 'taken' }
				]
			},
			complete: {
				type: 'all',
				rules: [
					{ type: 'item', itemId: '8', state: 'passed' },
					{ type: 'item', itemId: '6', state: 'passed' }
				]
			}
		});
	});

	it('ports UTN FRC hours and prerequisite corrections', () => {
		expect(item(utnFrcIsi2023, '15').requirements?.enroll).toEqual({
			type: 'item',
			itemId: '7',
			state: 'taken'
		});
		expect(item(utnFrcIsi2023, '18')).toMatchObject({ hours: 6 });
		expect(item(utnFrcIsi2023, '19')).toMatchObject({ hours: 8 });
		expect(item(utnFrcIsi2023, '20')).toMatchObject({ hours: 8 });
		expect(item(utnFrcIsi2023, '22')).toMatchObject({ hours: 6 });
		expect(item(utnFrcIsi2023, '91')).toMatchObject({ hours: 8 });
		expect(item(utnFrcIsi2023, '98')).toMatchObject({
			name: 'Arquitectura de Software',
			placements: [{ sectionId: 'year-4', term: 'firstSemester' }]
		});
	});
});
