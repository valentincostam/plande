import { z } from 'zod';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { courseTypes } from '$lib/course-type';
import { requirementExpressionSchema } from '$lib/study-plan-schema';

const finiteNumber = z.number().finite();
const term = z.enum(courseTerms);
const courseType = z.enum(courseTypes);
const placement = z.strictObject({
	id: z.string().min(1),
	sectionId: z.string().min(1),
	term: term.optional(),
	order: finiteNumber.optional()
});
const itemRequirements = z
	.strictObject({
		enroll: requirementExpressionSchema.optional(),
		complete: requirementExpressionSchema.optional()
	})
	.optional();
const baseItem = {
	id: z.string().min(1),
	seqId: z.number().int().nonnegative(),
	name: z.string(),
	code: z.string().optional(),
	tags: z.array(z.string()).optional(),
	placements: z.array(placement),
	requirements: itemRequirements
};
const item = z.discriminatedUnion('kind', [
	z.strictObject({
		...baseItem,
		kind: z.literal('course'),
		type: courseType,
		hours: finiteNumber.optional(),
		totalHours: finiteNumber.optional(),
		credits: finiteNumber.optional(),
		attributes: z.array(z.enum(courseAttributes)).optional()
	}),
	z.strictObject({ ...baseItem, kind: z.literal('milestone') })
]);
const graduation = z.strictObject({
	id: z.string().min(1),
	label: z.string(),
	expr: requirementExpressionSchema.optional(),
	weight: finiteNumber.optional()
});
const requirements = z.strictObject({ graduation: z.array(graduation).optional() });
const section = z.strictObject({
	id: z.string().min(1),
	label: z.string(),
	year: finiteNumber.optional()
});

export const draftPlanDocumentSchema = z.strictObject({
	nextSeqId: z.number().int().nonnegative().default(0),
	sections: z.array(section).default([]),
	items: z.array(item).default([]),
	requirements: requirements.default({})
});

const unknownRequirement = z.strictObject({
	scope: z.string().regex(/^(item:[^:]+:(enroll|complete)|graduation:[^:]+)$/),
	note: z.string().min(1)
});
const jsonValue: z.ZodType<unknown> = z.lazy(() =>
	z.union([
		z.string(),
		z.number().finite(),
		z.boolean(),
		z.null(),
		z.array(jsonValue),
		z.record(z.string(), jsonValue)
	])
);
const unsupportedContent = z.strictObject({
	path: z
		.string()
		.regex(
			/^document\/(items\/[A-Za-z0-9_-]+\/(attributes|requirements)|requirements\/graduation\/[A-Za-z0-9_-]+)$/
		),
	value: jsonValue
});

export const draftPlanContentSchema = z.strictObject({
	schemaVersion: z.literal(1),
	document: draftPlanDocumentSchema,
	unknownRequirements: z.array(unknownRequirement).default([]),
	unsupportedContent: z.array(unsupportedContent).default([])
});

export type DraftPlanDocument = z.infer<typeof draftPlanDocumentSchema>;
export type DraftPlanContent = z.infer<typeof draftPlanContentSchema>;
export type EditorPlacement = z.infer<typeof placement>;
export type EditorItem = z.infer<typeof item>;

export const emptyDraftPlanContent = (): DraftPlanContent => ({
	schemaVersion: 1,
	document: { nextSeqId: 0, sections: [], items: [], requirements: {} },
	unknownRequirements: [],
	unsupportedContent: []
});

export const parseDraftPlanContent = (value: unknown): DraftPlanContent => {
	if (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		Object.keys(value).length === 0
	)
		return emptyDraftPlanContent();
	const content = draftPlanContentSchema.parse(value);
	return {
		...content,
		document: {
			...content.document,
			nextSeqId: Math.max(
				content.document.nextSeqId,
				...content.document.items.map((item) => item.seqId + 1)
			)
		}
	};
};
