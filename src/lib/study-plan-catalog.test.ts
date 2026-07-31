import { describe, expect, it } from 'vitest';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import { studyPlanDataToCatalogEntry } from './study-plan-catalog';
import { place } from './study-plan-helpers';
import type { StudyPlanData } from './study-plan-data';

describe('studyPlanDataToCatalogEntry', () => {
	it('projects lightweight metadata without a legacy progress model', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Test Degree',
				degreeSlug: 'TD',
				universityName: 'Test University',
				universitySlug: 'TU'
			},
			sections: [{ id: 'year-1', label: '1er Año' }],
			items: [
				{
					id: 'a',
					seqId: 1,
					kind: 'course',
					name: 'A',
					type: courseTypes.mandatory,
					placements: [place.year(1, courseTerms.firstSemester)]
				}
			]
		};

		expect(studyPlanDataToCatalogEntry(plan)).toEqual({
			degreeName: 'Test Degree',
			degreeSlug: 'TD',
			universityName: 'Test University',
			universitySlug: 'TU',
			collegeName: undefined,
			collegeSlug: undefined,
			durationYears: 1,
			year: undefined,
			sources: [],
			notes: undefined
		});
	});
});
