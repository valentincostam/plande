
export type StudyPlanSource = {
	id: number;
	label: string;
	url: string;
};

export type StudyPlanNote = {
	id: number;
	text: string;
};

export type StudyPlanMetadata = {
	degreeName: string;
	degreeSlug: string;
	universityName: string;
	universitySlug: string;
	collegeName?: string;
	collegeSlug?: string;
	year?: number;
};

export type StudyPlanCatalogEntry = StudyPlanMetadata & {
	durationYears: number;
	sources: StudyPlanSource[];
	notes?: StudyPlanNote[];
};

export const getStudyPlanSlug = ({
	universitySlug,
	collegeSlug,
	degreeSlug
}: StudyPlanMetadata) => {
	return [universitySlug, collegeSlug, degreeSlug].filter(Boolean).join('-').toLowerCase();
};

export const getStudyPlanSlugWithYear = ({
	universitySlug,
	collegeSlug,
	degreeSlug,
	year
}: StudyPlanMetadata) => {
	return [universitySlug, collegeSlug, degreeSlug, year].filter(Boolean).join('-').toLowerCase();
};

export const getFullCollegeName = ({
	collegeName,
	collegeSlug,
	universityName,
	universitySlug
}: StudyPlanMetadata) => {
	if (collegeName) {
		return `${collegeName} (${collegeSlug}) de la ${universityName} (${universitySlug})`;
	}

	return `${universityName} (${universitySlug})`;
};

export type GroupedStudyPlans<T extends StudyPlanMetadata = StudyPlanMetadata> = {
	universityName: string;
	universitySlug: string;
	colleges: {
		collegeName?: string;
		collegeSlug?: string;
		degrees: T[];
	}[];
}[];

export const groupStudyPlansByUniversityAndCollege = <T extends StudyPlanMetadata>(
	studyPlans: T[]
): GroupedStudyPlans<T> => {
	const universityMap = new Map<string, Map<string, T[]>>();

	for (const studyPlan of studyPlans) {
		const universityKey = `${studyPlan.universityName}|${studyPlan.universitySlug}`;
		const collegeKey =
			studyPlan.collegeName && studyPlan.collegeSlug
				? `${studyPlan.collegeName}|${studyPlan.collegeSlug}`
				: '';

		if (!universityMap.has(universityKey)) {
			universityMap.set(universityKey, new Map());
		}

		const collegeMap = universityMap.get(universityKey)!;
		if (!collegeMap.has(collegeKey)) {
			collegeMap.set(collegeKey, []);
		}

		collegeMap.get(collegeKey)!.push(studyPlan);
	}

	const result: GroupedStudyPlans<T> = [];

	for (const [universityKey, collegeMap] of universityMap.entries()) {
		const [universityName, universitySlug] = universityKey.split('|');
		const colleges: GroupedStudyPlans<T>[number]['colleges'] = [];

		for (const [collegeKey, degrees] of collegeMap.entries()) {
			colleges.push({
				collegeName: collegeKey ? collegeKey.split('|')[0] : undefined,
				collegeSlug: collegeKey ? collegeKey.split('|')[1] : undefined,
				degrees
			});
		}

		result.push({
			universityName,
			universitySlug,
			colleges: colleges.sort((a, b) => {
				const aName = a.collegeName || '';
				const bName = b.collegeName || '';
				return aName.localeCompare(bName);
			})
		});
	}

	return result.sort((a, b) => a.universityName.localeCompare(b.universityName));
};
