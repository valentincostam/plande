import { preparePlan } from '$lib/prepare-plan';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import { studyPlanDocumentSchema } from '$lib/study-plan-schema';
import type { StudyPlanCatalogEntry } from '$lib/study-plan';
import type { StudyPlanData, StudyPlanInfo, StudyPlanSource } from '$lib/study-plan-data';
import type { DraftPlanContent } from './draft-plan-content';
import { completeDraftStructure } from './graduation-field';

export type PublicationIdentity = Pick<
	StudyPlanInfo,
	| 'degreeName'
	| 'degreeSlug'
	| 'universityName'
	| 'universitySlug'
	| 'collegeName'
	| 'collegeSlug'
	| 'notes'
> & {
	year: number | null;
	canonicalSlug?: string;
	campus?: string;
	modality?: string;
};

export type PublicationCandidateInput = {
	content: DraftPlanContent;
	identity: PublicationIdentity;
	sources: readonly StudyPlanSource[];
};

export type PublicationCandidateResult =
	| { ok: true; plan: StudyPlanData; catalog: StudyPlanCatalogEntry }
	| {
			ok: false;
			reason:
				| 'missing_items'
				| 'missing_sources'
				| 'unknown_requirements'
				| 'unsupported_content'
				| 'incomplete_structure'
				| 'invalid_plan';
	  };

export const publicationCandidate = ({
	content,
	identity,
	sources
}: PublicationCandidateInput): PublicationCandidateResult => {
	if (content.document.items.length === 0) return { ok: false, reason: 'missing_items' };
	if (sources.length === 0) return { ok: false, reason: 'missing_sources' };
	if (content.unknownRequirements.length) return { ok: false, reason: 'unknown_requirements' };
	if (content.unsupportedContent.length) return { ok: false, reason: 'unsupported_content' };
	const structure = completeDraftStructure(content);
	if (!structure) return { ok: false, reason: 'incomplete_structure' };
	const { year, ...info } = identity;
	const plan: StudyPlanData = {
		info: {
			...info,
			...(year === null ? {} : { year }),
			sources: [...sources]
		},
		...structure,
		items: content.document.items.map(({ placements, ...item }) => ({
			...item,
			placements: placements.map(({ sectionId, term, order }) => ({ sectionId, term, order }))
		}))
	};
	const parsed = studyPlanDocumentSchema.safeParse(plan);
	if (!parsed.success) return { ok: false, reason: 'invalid_plan' };
	try {
		const prepared = preparePlan(parsed.data).plan;
		return { ok: true, plan: prepared, catalog: studyPlanDataToCatalogEntry(prepared) };
	} catch {
		return { ok: false, reason: 'invalid_plan' };
	}
};
