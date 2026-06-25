import { describe, expect, it } from 'vitest';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import { studyPlanDataToCatalogEntry } from './study-plan-catalog';
import { grad, place } from './study-plan-helpers';
import type { StudyPlanData } from './study-plan-data';

describe('studyPlanDataToCatalogEntry', () => {
	it('sums multiple count graduation blocks into elective progress config', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Test Degree',
				degreeSlug: 'TD',
				universityName: 'Test University',
				universitySlug: 'TU'
			},
			sections: [{ id: 'year-1', label: '1er Ano' }],
			items: [
				{
					id: 'a',
					seqId: 1,
					kind: 'course',
					name: 'A',
					type: courseTypes.mandatory,
					tags: ['group-a'],
					placements: [place.year(1, courseTerms.firstSemester)]
				},
				{
					id: 'b',
					seqId: 2,
					kind: 'course',
					name: 'B',
					type: courseTypes.optative,
					tags: ['group-b'],
					placements: [place.year(1, courseTerms.secondSemester)]
				}
			],
			requirements: {
				graduation: [
					grad.allMandatory('mandatory', 'Materias obligatorias'),
					grad.countTag('group-a', 'Grupo A', 'group-a', 1, 'passed'),
					grad.countTag('group-b', 'Grupo B', 'group-b', 2, 'passed')
				]
			}
		};

		const entry = studyPlanDataToCatalogEntry(plan);

		expect(entry.progress).toEqual({
			type: 'mandatory-plus-elective-count',
			requiredElectiveCount: 3
		});
	});
});
