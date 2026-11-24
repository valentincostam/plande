import { describe, expect, it } from 'vitest';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import { studyPlanDataToCatalogEntry } from './study-plan-catalog';
import { place } from './study-plan-helpers';
import { getStudyPlanSlug, getStudyPlanSlugWithYear } from './study-plan';
import {
	getStudyPlanDataSlug,
	getStudyPlanDataSlugWithYear,
	type StudyPlanData
} from './study-plan-data';

describe('studyPlanDataToCatalogEntry', () => {
	it('projects lightweight metadata without a legacy progress model', () => {
		const plan: StudyPlanData = {
			info: {
				degreeName: 'Test Degree',
				degreeSlug: 'TD',
				canonicalSlug: 'plan-123',
				universityName: 'Test University',
				universitySlug: 'TU',
				campus: 'Centro',
				modality: 'Presencial'
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
			canonicalSlug: 'plan-123',
			universityName: 'Test University',
			universitySlug: 'TU',
			collegeName: undefined,
			collegeSlug: undefined,
			campus: 'Centro',
			modality: 'Presencial',
			durationYears: 1,
			year: undefined,
			sources: [],
			notes: undefined
		});
	});

	it('uses a canonical slug when present', () => {
		const info = {
			degreeName: 'Test Degree',
			degreeSlug: 'TD',
			canonicalSlug: 'plan-123',
			universityName: 'Test University',
			universitySlug: 'TU'
		};

		expect(getStudyPlanSlug(info)).toBe('plan-123');
		expect(getStudyPlanSlugWithYear(info)).toBe('plan-123');
		expect(getStudyPlanDataSlug({ info, sections: [], items: [] })).toBe('plan-123');
		expect(getStudyPlanDataSlugWithYear({ info, sections: [], items: [] })).toBe('plan-123');
	});
});
