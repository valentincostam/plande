import { z } from 'zod';
import { courseAttributes } from './course-attribute';
import { courseTerms } from './course-term';
import { courseTypes } from './course-type';
import {
	requirementStates,
	type RequirementExpr,
	type Selector,
	type StudyPlanData
} from './study-plan-data';
import type { StudyPlanCatalogEntry } from './study-plan';

const term = z.enum(courseTerms);
const courseType = z.enum(courseTypes);
const state = z.enum(requirementStates);
const number = z.number().finite();
const source = z.strictObject({ id: number, label: z.string(), url: z.string() });
const note = z.strictObject({ id: number, text: z.string() });
const info = z.strictObject({
	degreeName: z.string(),
	degreeSlug: z.string(),
	universityName: z.string(),
	universitySlug: z.string(),
	collegeName: z.string().optional(),
	collegeSlug: z.string().optional(),
	year: number.optional(),
	sources: z.array(source).optional(),
	notes: z.array(note).optional()
});

const selector: z.ZodType<Selector> = z.discriminatedUnion('type', [
	z.strictObject({ type: z.literal('items'), itemIds: z.array(z.string()) }),
	z.strictObject({ type: z.literal('tag'), tag: z.string() }),
	z.strictObject({ type: z.literal('section'), sectionId: z.string() }),
	z.strictObject({
		type: z.literal('sections'),
		sectionIds: z.array(z.string()),
		term: term.optional()
	}),
	z.strictObject({ type: z.literal('all'), courseType: courseType.optional() })
]);

const requirement: z.ZodType<RequirementExpr> = z.lazy(() =>
	z.discriminatedUnion('type', [
		z.strictObject({ type: z.literal('item'), itemId: z.string(), state }),
		z.strictObject({
			type: z.literal('all'),
			rules: z.array(requirement),
			label: z.string().optional()
		}),
		z.strictObject({
			type: z.literal('any'),
			rules: z.array(requirement),
			label: z.string().optional()
		}),
		z.strictObject({
			type: z.literal('countOf'),
			rules: z.array(requirement),
			min: number,
			label: z.string().optional()
		}),
		z.strictObject({
			type: z.literal('count'),
			selector,
			min: number,
			state,
			label: z.string().optional()
		}),
		z.strictObject({
			type: z.literal('percent'),
			selector,
			minPercent: number,
			state,
			label: z.string().optional()
		}),
		z.strictObject({
			type: z.literal('sum'),
			selector,
			metric: z.enum(['hours', 'totalHours', 'credits']),
			min: number,
			state,
			label: z.string().optional()
		})
	])
);

const item = {
	id: z.string(),
	seqId: number.int(),
	name: z.string(),
	code: z.string().optional(),
	tags: z.array(z.string()).optional(),
	placements: z.array(
		z.strictObject({ sectionId: z.string(), term: term.optional(), order: number.optional() })
	),
	requirements: z
		.strictObject({ enroll: requirement.optional(), complete: requirement.optional() })
		.optional()
};

export const studyPlanDocumentSchema: z.ZodType<StudyPlanData> = z.strictObject({
	info,
	sections: z.array(z.strictObject({ id: z.string(), label: z.string(), year: number.optional() })),
	items: z.array(
		z.discriminatedUnion('kind', [
			z.strictObject({
				...item,
				kind: z.literal('course'),
				type: courseType,
				hours: number.optional(),
				totalHours: number.optional(),
				credits: number.optional(),
				attributes: z.array(z.enum(courseAttributes)).optional()
			}),
			z.strictObject({ ...item, kind: z.literal('milestone') })
		])
	),
	requirements: z
		.strictObject({
			graduation: z
				.array(
					z.strictObject({
						id: z.string(),
						label: z.string(),
						expr: requirement,
						weight: number.optional()
					})
				)
				.optional()
		})
		.optional()
});

export const studyPlanCatalogSchema: z.ZodType<StudyPlanCatalogEntry[]> = z.array(
	info.extend({ durationYears: number, sources: z.array(source) })
);
