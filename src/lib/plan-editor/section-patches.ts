import { z } from 'zod';
import { courseAttributes } from '$lib/course-attribute';
import { courseTerms } from '$lib/course-term';
import { courseTypes } from '$lib/course-type';
import type { RequirementExpr } from '$lib/study-plan-data';
import { requirementExpressionSchema } from '$lib/study-plan-schema';
import { draftPlanContentSchema, type DraftPlanContent } from './draft-plan-content';
import {
	readGraduationRequirement,
	replaceGraduationRequirement,
	type GraduationRequirementValue
} from './graduation-field';
import { readRequirementField, replaceRequirementField } from './requirement-field';
import {
	findItemReferences,
	findMissingSectionReferences,
	findSectionReferences
} from './structure';

export const courseFieldsSchema = z
	.strictObject({
		type: z.enum(courseTypes).optional(),
		code: z.string().nullable().optional(),
		hours: z.number().finite().nullable().optional(),
		totalHours: z.number().finite().nullable().optional(),
		credits: z.number().finite().nullable().optional(),
		tags: z.array(z.string()).nullable().optional(),
		attributes: z.array(z.enum(courseAttributes)).nullable().optional()
	})
	.refine((value) => Object.keys(value).length > 0);

const placementSchema = z.strictObject({
	id: z.string().min(1),
	sectionId: z.string().min(1),
	term: z.enum(courseTerms).optional(),
	order: z.number().finite().optional()
});

const placementFieldsSchema = z
	.strictObject({
		sectionId: z.string().min(1).optional(),
		term: z.enum(courseTerms).nullable().optional(),
		order: z.number().finite().nullable().optional()
	})
	.refine((value) => Object.keys(value).length > 0);

export type RequirementScope = 'enroll' | 'complete';
export type RequirementValue =
	| { kind: 'unknown'; note: string }
	| { kind: 'none' }
	| { kind: 'expression'; expression: RequirementExpr };

const requirementValueSchema: z.ZodType<RequirementValue> = z.discriminatedUnion('kind', [
	z.strictObject({ kind: z.literal('unknown'), note: z.string().min(1) }),
	z.strictObject({ kind: z.literal('none') }),
	z.strictObject({ kind: z.literal('expression'), expression: requirementExpressionSchema })
]);
const graduationRequirementValueSchema: z.ZodType<GraduationRequirementValue> =
	z.discriminatedUnion('kind', [
		z.strictObject({ kind: z.literal('unknown'), note: z.string().min(1) }),
		z.strictObject({ kind: z.literal('expression'), expression: requirementExpressionSchema })
	]);
const graduationFieldsSchema = z
	.strictObject({
		label: z.string().optional(),
		weight: z.number().finite().nullable().optional()
	})
	.refine((value) => Object.keys(value).length > 0);

export const sectionPatchSchema = z.discriminatedUnion('op', [
	z.strictObject({
		op: z.literal('section.create'),
		section: z.strictObject({
			id: z.string().min(1),
			label: z.string(),
			year: z.number().int().nullable().optional()
		})
	}),
	z.strictObject({
		op: z.literal('section.rename'),
		sectionId: z.string().min(1),
		label: z.string()
	}),
	z.strictObject({ op: z.literal('section.remove'), sectionId: z.string().min(1) }),
	z.strictObject({
		op: z.literal('section.restore'),
		sectionId: z.string().min(1),
		historyVersion: z.number().int().nonnegative()
	}),
	z
		.strictObject({
			op: z.literal('section.reorder'),
			sectionId: z.string().min(1),
			afterSectionId: z.string().min(1).nullable()
		})
		.refine(({ sectionId, afterSectionId }) => sectionId !== afterSectionId),
	z.strictObject({
		op: z.literal('course.create'),
		item: z.strictObject({
			id: z.string().min(1),
			placementId: z.string().min(1),
			sectionId: z.string().min(1),
			name: z.string(),
			fields: courseFieldsSchema.optional()
		})
	}),
	z.strictObject({ op: z.literal('course.rename'), itemId: z.string().min(1), name: z.string() }),
	z.strictObject({
		op: z.literal('milestone.create'),
		item: z
			.strictObject({
				id: z.string().min(1),
				placementId: z.string().min(1).optional(),
				sectionId: z.string().min(1).optional(),
				name: z.string()
			})
			.refine(({ placementId, sectionId }) => Boolean(placementId) === Boolean(sectionId))
	}),
	z.strictObject({ op: z.literal('item.rename'), itemId: z.string().min(1), name: z.string() }),
	z.strictObject({
		op: z.literal('requirement.replace'),
		itemId: z.string().min(1),
		scope: z.enum(['enroll', 'complete']),
		value: requirementValueSchema
	}),
	z.strictObject({ op: z.literal('item.remove'), itemId: z.string().min(1) }),
	z.strictObject({
		op: z.literal('unplaced.reorder'),
		itemIds: z.array(z.string().min(1))
	}),
	z.strictObject({
		op: z.literal('item.restore'),
		itemId: z.string().min(1),
		historyVersion: z.number().int().nonnegative()
	}),
	z.strictObject({
		op: z.literal('placement.create'),
		itemId: z.string().min(1),
		placement: placementSchema
	}),
	z.strictObject({
		op: z.literal('placement.patch'),
		itemId: z.string().min(1),
		placementId: z.string().min(1),
		patch: placementFieldsSchema
	}),
	z.strictObject({
		op: z.literal('placement.remove'),
		itemId: z.string().min(1),
		placementId: z.string().min(1)
	}),
	z.strictObject({
		op: z.literal('course.patch'),
		itemId: z.string().min(1),
		patch: courseFieldsSchema
	}),
	z.strictObject({
		op: z.literal('graduation.create'),
		block: z.strictObject({ id: z.string().min(1), label: z.string() })
	}),
	z.strictObject({
		op: z.literal('graduation.patch'),
		blockId: z.string().min(1),
		patch: graduationFieldsSchema
	}),
	z.strictObject({
		op: z.literal('graduation.requirement.replace'),
		blockId: z.string().min(1),
		value: graduationRequirementValueSchema
	}),
	z.strictObject({ op: z.literal('graduation.remove'), blockId: z.string().min(1) }),
	z.strictObject({ op: z.literal('graduation.reorder'), blockIds: z.array(z.string().min(1)) })
]);
export type SectionPatch = z.infer<typeof sectionPatchSchema>;
export const sectionPatchesSchema = z.array(sectionPatchSchema).min(1);
export const parseSectionPatches = (value: unknown) => sectionPatchesSchema.parse(value);

export type RemovalDiagnostic = { targetId: string; scope: string };
export type DraftRevisionHistory = ReadonlyMap<number, DraftPlanContent>;
export type SectionPatchMerge =
	| { content: DraftPlanContent }
	| { content: DraftPlanContent; conflicts: string[]; diagnostics?: RemovalDiagnostic[] };

const sameValue = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);

const placementTuple = (placement: { sectionId: string; term?: string; order?: number }) =>
	JSON.stringify([placement.sectionId, placement.term ?? null, placement.order ?? null]);

const findPlacement = (content: DraftPlanContent, placementId: string) =>
	content.document.items
		.flatMap((item) => item.placements.map((placement) => ({ item, placement })))
		.find(({ placement }) => placement.id === placementId);

const expressionHasMissingItem = (
	expression: NonNullable<
		NonNullable<DraftPlanContent['document']['items'][number]['requirements']>[keyof NonNullable<
			DraftPlanContent['document']['items'][number]['requirements']
		>]
	>,
	itemIds: Set<string>
): boolean => {
	if (expression.type === 'item') return !itemIds.has(expression.itemId);
	if (expression.type === 'all' || expression.type === 'any' || expression.type === 'countOf')
		return expression.rules.some((rule) => expressionHasMissingItem(rule, itemIds));
	return (
		expression.selector.type === 'items' &&
		expression.selector.itemIds.some((id) => !itemIds.has(id))
	);
};

const matchesCourseCreation = (
	item: DraftPlanContent['document']['items'][number] | undefined,
	creation: Extract<SectionPatch, { op: 'course.create' }>['item']
) => {
	if (item?.kind !== 'course' || item.name !== creation.name) return false;
	const fields = creation.fields ?? {};
	return (
		item.type === (fields.type ?? 'mandatory') &&
		sameValue(item.code, fields.code ?? undefined) &&
		sameValue(item.hours, fields.hours ?? undefined) &&
		sameValue(item.totalHours, fields.totalHours ?? undefined) &&
		sameValue(item.credits, fields.credits ?? undefined) &&
		sameValue(item.tags, fields.tags ?? undefined) &&
		sameValue(item.attributes, fields.attributes ?? undefined) &&
		item.placements.some(
			(placement) =>
				placement.id === creation.placementId && placement.sectionId === creation.sectionId
		)
	);
};

const matchesMilestoneCreation = (
	item: DraftPlanContent['document']['items'][number] | undefined,
	creation: Extract<SectionPatch, { op: 'milestone.create' }>['item']
) =>
	item?.kind === 'milestone' &&
	item.name === creation.name &&
	(creation.placementId && creation.sectionId
		? item.placements.some(
				(placement) =>
					placement.id === creation.placementId && placement.sectionId === creation.sectionId
			)
		: item.placements.length === 0);

export const mergeSectionPatches = (
	base: DraftPlanContent,
	current: DraftPlanContent,
	patches: SectionPatch[],
	history: DraftRevisionHistory = new Map()
): SectionPatchMerge => {
	let result = structuredClone(current);
	const comparisonBase = structuredClone(base);
	const conflicts: string[] = [];
	const diagnostics: RemovalDiagnostic[] = [];
	const createdSectionIds = new Set<string>();
	const createdItemIds = new Set<string>();
	const createdPlacementIds = new Set<string>();
	const createdGraduationIds = new Set<string>();
	const removedGraduationIds = new Set<string>();
	for (const patch of patches) {
		if (patch.op === 'graduation.create') {
			const blocks = result.document.requirements.graduation ?? [];
			const existing = blocks.find((block) => block.id === patch.block.id);
			if (existing && existing.label !== patch.block.label)
				conflicts.push(`graduation:${patch.block.id}`);
			else if (!existing) {
				result.document.requirements.graduation = [...blocks, structuredClone(patch.block)];
				result.unknownRequirements.push({
					scope: `graduation:${patch.block.id}`,
					note: 'Todavía no comprobado.'
				});
				createdGraduationIds.add(patch.block.id);
			}
			continue;
		}
		if (patch.op === 'graduation.patch') {
			const before = comparisonBase.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			const now = result.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			if (!now) {
				for (const field of Object.keys(patch.patch))
					conflicts.push(`graduation:${patch.blockId}:${field}`);
				continue;
			}
			for (const [field, value] of Object.entries(patch.patch)) {
				const desired = value === null ? undefined : value;
				if (
					(!before &&
						!createdGraduationIds.has(patch.blockId) &&
						!sameValue(now[field as keyof typeof now], desired)) ||
					(before &&
						!sameValue(before[field as keyof typeof before], now[field as keyof typeof now]) &&
						!sameValue(now[field as keyof typeof now], desired))
				) {
					conflicts.push(`graduation:${patch.blockId}:${field}`);
					continue;
				}
				if (desired === undefined) delete (now as Record<string, unknown>)[field];
				else (now as Record<string, unknown>)[field] = desired;
			}
			continue;
		}
		if (patch.op === 'graduation.requirement.replace') {
			const before = comparisonBase.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			const now = result.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			if (
				!now ||
				(!before &&
					!createdGraduationIds.has(patch.blockId) &&
					!sameValue(readGraduationRequirement(result, patch.blockId), patch.value)) ||
				(before &&
					!sameValue(
						readGraduationRequirement(comparisonBase, patch.blockId),
						readGraduationRequirement(result, patch.blockId)
					) &&
					!sameValue(readGraduationRequirement(result, patch.blockId), patch.value))
			) {
				conflicts.push(`graduation:${patch.blockId}:requirement`);
				continue;
			}
			result = replaceGraduationRequirement(result, patch.blockId, patch.value);
			continue;
		}
		if (patch.op === 'graduation.remove') {
			const before = comparisonBase.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			const now = result.document.requirements.graduation?.find(
				(block) => block.id === patch.blockId
			);
			if (!before) {
				conflicts.push(`graduation:${patch.blockId}`);
				continue;
			}
			if (!now) {
				removedGraduationIds.add(patch.blockId);
				continue;
			}
			if (
				!sameValue(before, now) ||
				!sameValue(
					readGraduationRequirement(comparisonBase, patch.blockId),
					readGraduationRequirement(result, patch.blockId)
				)
			) {
				conflicts.push(`graduation:${patch.blockId}`);
				continue;
			}
			result.document.requirements.graduation = result.document.requirements.graduation?.filter(
				(block) => block.id !== patch.blockId
			);
			result.unknownRequirements = result.unknownRequirements.filter(
				(candidate) => candidate.scope !== `graduation:${patch.blockId}`
			);
			removedGraduationIds.add(patch.blockId);
			continue;
		}
		if (patch.op === 'graduation.reorder') {
			const beforeIds = (comparisonBase.document.requirements.graduation ?? []).map(
				(block) => block.id
			);
			const now = result.document.requirements.graduation ?? [];
			const nowIds = now.map((block) => block.id);
			const survivingBeforeIds = beforeIds.filter((id) => nowIds.includes(id));
			const currentExistingOrder = nowIds.filter((id) => beforeIds.includes(id));
			if (
				new Set(patch.blockIds).size !== patch.blockIds.length ||
				(!sameValue(nowIds, patch.blockIds) &&
					(nowIds.length !== patch.blockIds.length ||
						patch.blockIds.some((id) => !nowIds.includes(id)) ||
						nowIds.some((id) => !beforeIds.includes(id) && !createdGraduationIds.has(id)) ||
						beforeIds.some((id) => !nowIds.includes(id) && !removedGraduationIds.has(id)) ||
						!sameValue(survivingBeforeIds, currentExistingOrder)))
			) {
				conflicts.push('graduation:order');
				continue;
			}
			result.document.requirements.graduation = patch.blockIds.map(
				(id) => now.find((block) => block.id === id)!
			);
			continue;
		}
		if (patch.op === 'section.restore') {
			const source = history
				.get(patch.historyVersion)
				?.document.sections.find((section) => section.id === patch.sectionId);
			const existing = result.document.sections.find((section) => section.id === patch.sectionId);
			if (!source || (existing && !sameValue(existing, source))) conflicts.push(patch.sectionId);
			else {
				if (!comparisonBase.document.sections.some((section) => section.id === source.id))
					comparisonBase.document.sections.push(structuredClone(source));
				if (!existing) result.document.sections.push(structuredClone(source));
			}
			continue;
		}
		if (patch.op === 'item.restore') {
			const source = history
				.get(patch.historyVersion)
				?.document.items.find((item) => item.id === patch.itemId);
			const existing = result.document.items.find((item) => item.id === patch.itemId);
			const itemIds = new Set(result.document.items.map((item) => item.id));
			if (source) itemIds.add(source.id);
			const missingDependency =
				source &&
				[source.requirements?.enroll, source.requirements?.complete]
					.filter((expression): expression is NonNullable<typeof expression> => Boolean(expression))
					.some((expression) => expressionHasMissingItem(expression, itemIds));
			const collides =
				source &&
				result.document.items.some(
					(item) =>
						item.id !== source.id &&
						(item.seqId === source.seqId ||
							item.placements.some((placement) =>
								source.placements.some((candidate) => candidate.id === placement.id)
							))
				);
			const missingSection = source?.placements.some(
				(placement) =>
					!result.document.sections.some((section) => section.id === placement.sectionId)
			);
			const missingSectionSelector =
				source &&
				findMissingSectionReferences(
					{ ...result, document: { ...result.document, items: [source] } },
					new Set(result.document.sections.map((section) => section.id))
				).length > 0;
			if (
				!source ||
				(existing && !sameValue(existing, source)) ||
				collides ||
				missingSection ||
				missingDependency ||
				missingSectionSelector
			)
				conflicts.push(patch.itemId);
			else {
				if (!comparisonBase.document.items.some((item) => item.id === source.id))
					comparisonBase.document.items.push(structuredClone(source));
				if (!existing) result.document.items.push(structuredClone(source));
				for (const unknown of history.get(patch.historyVersion)?.unknownRequirements ?? []) {
					if (
						unknown.scope.startsWith(`item:${source.id}:`) &&
						!result.unknownRequirements.some((candidate) => sameValue(candidate, unknown))
					)
						result.unknownRequirements.push(structuredClone(unknown));
				}
				result.document.nextSeqId = Math.max(result.document.nextSeqId, source.seqId + 1);
			}
			continue;
		}
		if (patch.op === 'section.create') {
			const existing = result.document.sections.find((section) => section.id === patch.section.id);
			if (
				existing &&
				(existing.label !== patch.section.label ||
					existing.year !== (patch.section.year ?? undefined))
			)
				conflicts.push(patch.section.id);
			else if (!existing) {
				result.document.sections.push({
					id: patch.section.id,
					label: patch.section.label,
					...(patch.section.year == null ? {} : { year: patch.section.year })
				});
				createdSectionIds.add(patch.section.id);
			}
			continue;
		}
		if (patch.op === 'section.remove') {
			const before = comparisonBase.document.sections.find(
				(section) => section.id === patch.sectionId
			);
			const now = result.document.sections.find((section) => section.id === patch.sectionId);
			if (!before) {
				conflicts.push(patch.sectionId);
				continue;
			}
			if (!now) continue;
			if (!sameValue(before, now)) {
				conflicts.push(patch.sectionId);
				continue;
			}
			const references = result.document.items.flatMap((item) =>
				item.placements
					.filter((placement) => placement.sectionId === patch.sectionId)
					.map((placement) => ({
						targetId: patch.sectionId,
						scope: `item:${item.id}:placement:${placement.id}`
					}))
			);
			references.push(
				...findSectionReferences(result, patch.sectionId).map(({ scope }) => ({
					targetId: patch.sectionId,
					scope
				}))
			);
			if (references.length) {
				conflicts.push(patch.sectionId);
				diagnostics.push(...references);
				continue;
			}
			result.document.sections = result.document.sections.filter(
				(section) => section.id !== patch.sectionId
			);
			continue;
		}
		if (patch.op === 'section.reorder') {
			const before = comparisonBase.document.sections.find(
				(section) => section.id === patch.sectionId
			);
			const now = result.document.sections.find((section) => section.id === patch.sectionId);
			const after = patch.afterSectionId
				? result.document.sections.find((section) => section.id === patch.afterSectionId)
				: undefined;
			if (
				(!before && !createdSectionIds.has(patch.sectionId)) ||
				!now ||
				(patch.afterSectionId && !after)
			) {
				conflicts.push(patch.sectionId);
				continue;
			}
			const sections = result.document.sections.filter((section) => section.id !== patch.sectionId);
			const index = patch.afterSectionId
				? sections.findIndex((section) => section.id === patch.afterSectionId) + 1
				: 0;
			sections.splice(index, 0, now);
			result.document.sections = sections;
			continue;
		}
		if (patch.op === 'course.create') {
			const existing = result.document.items.find((item) => item.id === patch.item.id);
			if (
				!matchesCourseCreation(existing, patch.item) &&
				(existing ||
					result.document.items.some((item) =>
						item.placements.some((placement) => placement.id === patch.item.placementId)
					) ||
					!result.document.sections.some((section) => section.id === patch.item.sectionId))
			)
				conflicts.push(patch.item.id);
			else if (!existing) {
				const seqId = result.document.nextSeqId++;
				const fields = patch.item.fields ?? {};
				result.document.items.push({
					id: patch.item.id,
					seqId,
					kind: 'course',
					name: patch.item.name,
					type: fields.type ?? 'mandatory',
					...(fields.code == null ? {} : { code: fields.code }),
					...(fields.hours == null ? {} : { hours: fields.hours }),
					...(fields.totalHours == null ? {} : { totalHours: fields.totalHours }),
					...(fields.credits == null ? {} : { credits: fields.credits }),
					...(fields.tags == null ? {} : { tags: fields.tags }),
					...(fields.attributes == null ? {} : { attributes: fields.attributes }),
					placements: [{ id: patch.item.placementId, sectionId: patch.item.sectionId }]
				});
				createdItemIds.add(patch.item.id);
				createdPlacementIds.add(patch.item.placementId);
				result.unknownRequirements.push(
					{ scope: `item:${patch.item.id}:enroll`, note: 'Todavía no comprobado.' },
					{ scope: `item:${patch.item.id}:complete`, note: 'Todavía no comprobado.' }
				);
			}
			continue;
		}
		if (patch.op === 'course.rename') {
			const before = comparisonBase.document.items.find((item) => item.id === patch.itemId);
			const now = result.document.items.find((item) => item.id === patch.itemId);
			if (!before || !now || (before.name !== now.name && now.name !== patch.name))
				conflicts.push(patch.itemId);
			else now.name = patch.name;
			continue;
		}
		if (patch.op === 'placement.create') {
			const owner = result.document.items.find((item) => item.id === patch.itemId);
			const existing = result.document.items
				.flatMap((item) => item.placements.map((placement) => ({ item, placement })))
				.find(({ placement }) => placement.id === patch.placement.id);
			if (
				existing
					? existing.item.id !== patch.itemId || !sameValue(existing.placement, patch.placement)
					: !owner ||
						!result.document.sections.some((section) => section.id === patch.placement.sectionId) ||
						owner.placements.some(
							(placement) => placementTuple(placement) === placementTuple(patch.placement)
						)
			)
				conflicts.push(patch.placement.id);
			else if (!existing && owner) {
				owner.placements.push(patch.placement);
				createdPlacementIds.add(patch.placement.id);
			}
			continue;
		}
		if (patch.op === 'requirement.replace') {
			const before = comparisonBase.document.items.find((item) => item.id === patch.itemId);
			const now = result.document.items.find((item) => item.id === patch.itemId);
			if (
				!now ||
				(now.kind === 'milestone' && patch.scope === 'enroll') ||
				(before &&
					!sameValue(
						readRequirementField(comparisonBase, patch.itemId, patch.scope),
						readRequirementField(result, patch.itemId, patch.scope)
					) &&
					!sameValue(readRequirementField(result, patch.itemId, patch.scope), patch.value)) ||
				(!before &&
					!createdItemIds.has(patch.itemId) &&
					!sameValue(readRequirementField(result, patch.itemId, patch.scope), patch.value))
			) {
				conflicts.push(`item:${patch.itemId}:requirements:${patch.scope}`);
				continue;
			}
			result = replaceRequirementField(result, now.id, patch.scope, patch.value);
			continue;
		}
		if (patch.op === 'item.remove') {
			const before = comparisonBase.document.items.find((item) => item.id === patch.itemId);
			const now = result.document.items.find((item) => item.id === patch.itemId);
			if (!before) {
				conflicts.push(patch.itemId);
				continue;
			}
			if (!now) continue;
			if (!sameValue(before, now)) {
				conflicts.push(patch.itemId);
				continue;
			}
			const references = findItemReferences(result, patch.itemId);
			if (references.length) {
				conflicts.push(patch.itemId);
				diagnostics.push(...references.map(({ scope }) => ({ targetId: patch.itemId, scope })));
				continue;
			}
			result.document.items = result.document.items.filter((item) => item.id !== patch.itemId);
			continue;
		}
		if (patch.op === 'unplaced.reorder') {
			const beforeIds = comparisonBase.document.items
				.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
				.map((item) => item.id);
			const nowIds = result.document.items
				.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
				.map((item) => item.id);
			const survivingBeforeIds = beforeIds.filter((id) => nowIds.includes(id));
			const currentExistingOrder = nowIds.filter((id) => beforeIds.includes(id));
			if (
				new Set(patch.itemIds).size !== patch.itemIds.length ||
				patch.itemIds.length !== nowIds.length ||
				patch.itemIds.some((id) => !nowIds.includes(id)) ||
				(!sameValue(nowIds, patch.itemIds) && !sameValue(survivingBeforeIds, currentExistingOrder))
			) {
				conflicts.push('unplaced:order');
				continue;
			}
			const byId = new Map(result.document.items.map((item) => [item.id, item]));
			const queue = patch.itemIds.map((id) => byId.get(id)!);
			result.document.items = result.document.items.map((item) =>
				item.kind === 'milestone' && item.placements.length === 0 ? queue.shift()! : item
			);
			continue;
		}
		if (patch.op === 'placement.patch') {
			const before = findPlacement(comparisonBase, patch.placementId);
			const now = findPlacement(result, patch.placementId);
			if (
				!now ||
				(before && before.item.id !== patch.itemId) ||
				now.item.id !== patch.itemId ||
				(!before && !createdPlacementIds.has(patch.placementId))
			) {
				conflicts.push(patch.placementId);
				continue;
			}
			for (const [field, value] of Object.entries(patch.patch)) {
				const desired = value === null ? undefined : value;
				const key = field as keyof typeof patch.patch;
				if (
					before &&
					!sameValue(before.placement[key as keyof typeof before.placement], now.placement[key]) &&
					!sameValue(now.placement[key], desired)
				) {
					conflicts.push(`${patch.placementId}:${field}`);
					continue;
				}
				const candidate = { ...now.placement, [field]: desired };
				if (desired === undefined) delete (candidate as Record<string, unknown>)[field];
				if (
					!result.document.sections.some((section) => section.id === candidate.sectionId) ||
					now.item.placements.some(
						(placement) =>
							placement.id !== patch.placementId &&
							placementTuple(placement) === placementTuple(candidate)
					)
				) {
					conflicts.push(`${patch.placementId}:${field}`);
					continue;
				}
				if (desired === undefined) delete (now.placement as Record<string, unknown>)[field];
				else (now.placement as Record<string, unknown>)[field] = desired;
			}
			continue;
		}
		if (patch.op === 'placement.remove') {
			const before = findPlacement(comparisonBase, patch.placementId);
			const now = findPlacement(result, patch.placementId);
			if (!before || before.item.id !== patch.itemId || (now && now.item.id !== patch.itemId)) {
				conflicts.push(patch.placementId);
				continue;
			}
			if (now)
				now.item.placements = now.item.placements.filter(
					(placement) => placement.id !== patch.placementId
				);
			continue;
		}
		if (patch.op === 'milestone.create') {
			const existing = result.document.items.find((item) => item.id === patch.item.id);
			if (
				!matchesMilestoneCreation(existing, patch.item) &&
				(existing ||
					(patch.item.placementId &&
						result.document.items.some((item) =>
							item.placements.some((placement) => placement.id === patch.item.placementId)
						)) ||
					(patch.item.sectionId &&
						!result.document.sections.some((section) => section.id === patch.item.sectionId)))
			)
				conflicts.push(patch.item.id);
			else if (!existing) {
				const seqId = result.document.nextSeqId++;
				result.document.items.push({
					id: patch.item.id,
					seqId,
					kind: 'milestone',
					name: patch.item.name,
					placements:
						patch.item.sectionId && patch.item.placementId
							? [{ id: patch.item.placementId, sectionId: patch.item.sectionId }]
							: []
				});
				createdItemIds.add(patch.item.id);
				if (patch.item.placementId) createdPlacementIds.add(patch.item.placementId);
				result.unknownRequirements.push({
					scope: `item:${patch.item.id}:complete`,
					note: 'Todavía no comprobado.'
				});
			}
			continue;
		}
		if (patch.op === 'item.rename') {
			const before = comparisonBase.document.items.find((item) => item.id === patch.itemId);
			const now = result.document.items.find((item) => item.id === patch.itemId);
			if (!before || !now || (before.name !== now.name && now.name !== patch.name))
				conflicts.push(patch.itemId);
			else now.name = patch.name;
			continue;
		}
		if (patch.op === 'course.patch') {
			const before = comparisonBase.document.items.find(
				(item) => item.id === patch.itemId && item.kind === 'course'
			);
			const now = result.document.items.find(
				(item) => item.id === patch.itemId && item.kind === 'course'
			);
			if (!before || !now) {
				conflicts.push(patch.itemId);
				continue;
			}
			for (const [field, value] of Object.entries(patch.patch)) {
				const key = field as keyof typeof patch.patch;
				const desired = value === null ? undefined : value;
				if (
					JSON.stringify(before[key as keyof typeof before]) !==
						JSON.stringify(now[key as keyof typeof now]) &&
					JSON.stringify(now[key as keyof typeof now]) !== JSON.stringify(desired)
				) {
					conflicts.push(`${patch.itemId}:${field}`);
					continue;
				}
				if (desired === undefined) delete (now as Record<string, unknown>)[field];
				else (now as Record<string, unknown>)[field] = desired;
			}
			continue;
		}
		const baseSection = comparisonBase.document.sections.find(
			(section) => section.id === patch.sectionId
		);
		const currentSection = result.document.sections.find(
			(section) => section.id === patch.sectionId
		);
		if (
			!baseSection ||
			!currentSection ||
			(baseSection.label !== currentSection.label && currentSection.label !== patch.label)
		) {
			conflicts.push(patch.sectionId);
			continue;
		}
		currentSection.label = patch.label;
	}
	const content = draftPlanContentSchema.parse(result);
	return conflicts.length
		? { content, conflicts, ...(diagnostics.length ? { diagnostics } : {}) }
		: { content };
};
