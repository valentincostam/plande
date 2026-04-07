import type {
	GraduationRequirement,
	PlanItem,
	RequirementExpr,
	Section,
	StudyPlanData,
	StudyPlanInfo
} from './study-plan-data';

export type NativeEquivalenceDiff = {
	path: string;
	adapter: unknown;
	native: unknown;
};

type ComparableStudyPlanData = {
	info: Pick<
		StudyPlanInfo,
		| 'degreeName'
		| 'degreeSlug'
		| 'universityName'
		| 'universitySlug'
		| 'collegeName'
		| 'collegeSlug'
		| 'year'
	>;
	sections: Section[];
	items: PlanItem[];
	requirements?: {
		graduation?: GraduationRequirement[];
	};
};

const normalizeSemanticTag = (tag: string) => {
	if (tag.startsWith('year-')) return undefined;
	if (tag === 'progress-elective' || tag === 'native-elective') {
		return 'progress-elective';
	}
	return tag;
};

const normalizeGraduationRequirement = (
	requirement: GraduationRequirement
): GraduationRequirement => {
	if (
		(requirement.type === 'count' || requirement.type === 'sum') &&
		requirement.selector.type === 'tag'
	) {
		return {
			...requirement,
			selector: {
				type: 'tag',
				tag: normalizeSemanticTag(requirement.selector.tag) ?? requirement.selector.tag
			}
		};
	}

	return requirement;
};

const sortRequirements = (requirements: GraduationRequirement[] = []) =>
	[...requirements].map(normalizeGraduationRequirement).sort((a, b) => a.id.localeCompare(b.id));

const normalizeRequirementExpr = (
	expr: RequirementExpr | undefined
): RequirementExpr | undefined => {
	if (!expr) return undefined;

	switch (expr.type) {
		case 'item':
			return expr;
		case 'all':
			return {
				type: 'all',
				rules: expr.rules.map(normalizeRequirementExpr).filter(Boolean) as RequirementExpr[]
			};
		case 'any':
			return {
				type: 'any',
				rules: expr.rules.map(normalizeRequirementExpr).filter(Boolean) as RequirementExpr[]
			};
		case 'count':
		case 'percent':
		case 'sum':
			return expr;
	}
};

const sortPlacements = (placements: PlanItem['placements']) =>
	[...placements].sort((a, b) => {
		if (a.sectionId !== b.sectionId) return a.sectionId.localeCompare(b.sectionId);
		if ((a.term ?? '') !== (b.term ?? '')) return (a.term ?? '').localeCompare(b.term ?? '');
		return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
	});

const sortTags = (tags: string[] | undefined) => {
	if (!tags) return undefined;
	const normalized = tags
		.map(normalizeSemanticTag)
		.filter((tag): tag is string => tag !== undefined)
		.sort();
	return normalized.length > 0 ? normalized : undefined;
};

const normalizeItem = (item: PlanItem): PlanItem => ({
	...item,
	tags: sortTags(item.tags),
	placements: sortPlacements(item.placements),
	requirements: {
		enroll: normalizeRequirementExpr(item.requirements?.enroll),
		complete: normalizeRequirementExpr(item.requirements?.complete)
	}
});

export const toComparableStudyPlanData = (plan: StudyPlanData): ComparableStudyPlanData => ({
	info: {
		degreeName: plan.info.degreeName,
		degreeSlug: plan.info.degreeSlug,
		universityName: plan.info.universityName,
		universitySlug: plan.info.universitySlug,
		collegeName: plan.info.collegeName,
		collegeSlug: plan.info.collegeSlug,
		year: plan.info.year
	},
	sections: [...plan.sections].sort((a, b) => a.id.localeCompare(b.id)),
	items: [...plan.items].map(normalizeItem).sort((a, b) => a.seqId - b.seqId),
	requirements: {
		graduation: sortRequirements(plan.requirements?.graduation)
	}
});

export const compareNativeStudyPlanData = (
	adapterPlan: StudyPlanData,
	nativePlan: StudyPlanData
) => {
	const diffs: NativeEquivalenceDiff[] = [];
	const comparableAdapter = toComparableStudyPlanData(adapterPlan);
	const comparableNative = toComparableStudyPlanData(nativePlan);

	const pushIfDifferent = (path: string, adapter: unknown, native: unknown) => {
		if (JSON.stringify(adapter) !== JSON.stringify(native)) {
			diffs.push({ path, adapter, native });
		}
	};

	pushIfDifferent('info', comparableAdapter.info, comparableNative.info);
	pushIfDifferent('sections', comparableAdapter.sections, comparableNative.sections);
	pushIfDifferent(
		'requirements.graduation',
		comparableAdapter.requirements?.graduation,
		comparableNative.requirements?.graduation
	);

	const allItemIds = new Set([
		...comparableAdapter.items.map((item) => item.id),
		...comparableNative.items.map((item) => item.id)
	]);

	for (const itemId of allItemIds) {
		const adapterItem = comparableAdapter.items.find((item) => item.id === itemId);
		const nativeItem = comparableNative.items.find((item) => item.id === itemId);
		pushIfDifferent(`items.${itemId}`, adapterItem, nativeItem);
	}

	return diffs;
};
