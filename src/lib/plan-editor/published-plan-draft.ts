import type { StudyPlanData } from '$lib/study-plan-data';
import { parseDraftPlanContent } from './draft-plan-content';

export const publishedPlanDraft = (plan: StudyPlanData, nextSeqId: number) =>
	parseDraftPlanContent({
		schemaVersion: 1,
		document: {
			nextSeqId,
			sections: plan.sections,
			items: plan.items.map((item) => ({
				...item,
				placements: item.placements.map((placement, index) => ({
					...placement,
					id: `published-${item.seqId}-${index}`
				}))
			})),
			requirements: plan.requirements ?? {}
		},
		unknownRequirements: [],
		unsupportedContent: []
	});
