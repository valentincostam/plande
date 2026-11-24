import {
	draftPlanContentSchema,
	type DraftPlanContent,
	type EditorItem
} from './draft-plan-content';
import { mergeSectionPatches, type SectionPatch } from './section-patches';
import { replaceRequirementField } from './requirement-field';
import { readGraduationRequirement, replaceGraduationRequirement } from './graduation-field';

const courseFields = [
	'type',
	'code',
	'hours',
	'totalHours',
	'credits',
	'tags',
	'attributes'
] as const;

const setOptional = (target: Record<string, unknown>, key: string, value: unknown) => {
	if (value === undefined) delete target[key];
	else target[key] = structuredClone(value);
};

const applyPlacement = (target: EditorItem, local: EditorItem, placementId: string) => {
	const desired = local.placements.find((placement) => placement.id === placementId);
	if (!desired) return false;
	const position = target.placements.findIndex((placement) => placement.id === placementId);
	if (position === -1) target.placements.push(structuredClone(desired));
	else target.placements[position] = structuredClone(desired);
	return true;
};

export const resolveEditorChange = (
	remote: DraftPlanContent,
	merged: DraftPlanContent,
	local: DraftPlanContent,
	patch: SectionPatch,
	history?: { version: number; content: DraftPlanContent }
): DraftPlanContent | undefined => {
	const applied = mergeSectionPatches(remote, merged, [patch]);
	if (!('conflicts' in applied)) return applied.content;
	if (
		patch.op === 'graduation.create' ||
		patch.op === 'graduation.patch' ||
		patch.op === 'graduation.requirement.replace' ||
		patch.op === 'graduation.remove' ||
		patch.op === 'graduation.reorder'
	) {
		if (patch.op === 'graduation.reorder') {
			const localBlocks = local.document.requirements.graduation ?? [];
			const resolvedBlocks = merged.document.requirements.graduation ?? [];
			if (
				localBlocks.length !== resolvedBlocks.length ||
				resolvedBlocks.some((block) => !localBlocks.some((candidate) => candidate.id === block.id))
			)
				return undefined;
			const resolved = structuredClone(merged);
			resolved.document.requirements.graduation = localBlocks.map(
				(localBlock) => resolvedBlocks.find((block) => block.id === localBlock.id)!
			);
			return draftPlanContentSchema.parse(resolved);
		}
		const blockId = patch.op === 'graduation.create' ? patch.block.id : patch.blockId;
		if (patch.op === 'graduation.remove') {
			if (!merged.document.requirements.graduation?.some((block) => block.id === blockId))
				return undefined;
			const resolved = structuredClone(merged);
			resolved.document.requirements.graduation = resolved.document.requirements.graduation!.filter(
				(block) => block.id !== blockId
			);
			resolved.unknownRequirements = resolved.unknownRequirements.filter(
				(candidate) => candidate.scope !== `graduation:${blockId}`
			);
			return draftPlanContentSchema.parse(resolved);
		}
		const localBlock = local.document.requirements.graduation?.find(
			(block) => block.id === blockId
		);
		const resolvedBlock = merged.document.requirements.graduation?.find(
			(block) => block.id === blockId
		);
		if (!localBlock || !resolvedBlock) return undefined;
		if (patch.op === 'graduation.requirement.replace')
			return replaceGraduationRequirement(
				merged,
				blockId,
				readGraduationRequirement(local, blockId)
			);
		const resolved = structuredClone(merged);
		const target = resolved.document.requirements.graduation!.find(
			(block) => block.id === blockId
		)!;
		if (patch.op === 'graduation.create') {
			Object.assign(target, structuredClone(localBlock));
			return replaceGraduationRequirement(
				resolved,
				blockId,
				readGraduationRequirement(local, blockId)
			);
		}
		if (patch.op !== 'graduation.patch') return undefined;
		for (const field of Object.keys(patch.patch) as Array<'label' | 'weight'>) {
			if (field === 'weight' && localBlock.weight === undefined) delete target.weight;
			else if (field === 'label') target.label = localBlock.label;
			else target.weight = localBlock.weight;
		}
		return draftPlanContentSchema.parse(resolved);
	}
	if (patch.op === 'unplaced.reorder') {
		const localIds = local.document.items
			.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
			.map((item) => item.id);
		const resolvedItems = merged.document.items.filter(
			(item) => item.kind === 'milestone' && item.placements.length === 0
		);
		if (
			localIds.length !== resolvedItems.length ||
			resolvedItems.some((item) => !localIds.includes(item.id))
		)
			return undefined;
		const byId = new Map(resolvedItems.map((item) => [item.id, item]));
		const queue = localIds.map((id) => byId.get(id)!);
		const resolved = structuredClone(merged);
		resolved.document.items = resolved.document.items.map((item) =>
			item.kind === 'milestone' && item.placements.length === 0 ? queue.shift()! : item
		);
		return draftPlanContentSchema.parse(resolved);
	}
	const targetId =
		patch.op === 'section.rename' ||
		patch.op === 'section.remove' ||
		patch.op === 'section.restore' ||
		patch.op === 'section.reorder'
			? patch.sectionId
			: patch.op === 'section.create'
				? patch.section.id
				: patch.op === 'course.create' || patch.op === 'milestone.create'
					? patch.item.id
					: patch.itemId;
	const isMissingItem =
		targetId &&
		!remote.document.items.some((item) => item.id === targetId) &&
		local.document.items.some((item) => item.id === targetId);
	const isMissingSection =
		targetId &&
		!remote.document.sections.some((section) => section.id === targetId) &&
		local.document.sections.some((section) => section.id === targetId);
	if (history && (isMissingItem || isMissingSection)) {
		const restore: SectionPatch = isMissingItem
			? { op: 'item.restore', itemId: targetId, historyVersion: history.version }
			: { op: 'section.restore', sectionId: targetId, historyVersion: history.version };
		const recovered = mergeSectionPatches(
			history.content,
			merged,
			[restore, patch],
			new Map([[history.version, history.content]])
		);
		if (!('conflicts' in recovered)) return recovered.content;
	}
	const resolved = structuredClone(merged);

	if (patch.op === 'section.create') {
		const section = resolved.document.sections.find(
			(candidate) => candidate.id === patch.section.id
		);
		const localSection = local.document.sections.find(
			(candidate) => candidate.id === patch.section.id
		);
		if (!section || !localSection) return undefined;
		section.label = localSection.label;
		if (localSection.year === undefined) delete (section as Record<string, unknown>).year;
		else section.year = localSection.year;
		return draftPlanContentSchema.parse(resolved);
	}

	if (patch.op === 'requirement.replace') {
		if (!resolved.document.items.some((item) => item.id === patch.itemId)) return undefined;
		return replaceRequirementField(resolved, patch.itemId, patch.scope, patch.value);
	}

	if (patch.op !== 'course.create' && patch.op !== 'milestone.create') return undefined;
	const remoteItem = remote.document.items.find((candidate) => candidate.id === patch.item.id);
	const item = resolved.document.items.find((candidate) => candidate.id === patch.item.id);
	const localItem = local.document.items.find((candidate) => candidate.id === patch.item.id);
	if (
		!remoteItem ||
		!item ||
		!localItem ||
		remoteItem.kind !== localItem.kind ||
		item.kind !== localItem.kind
	)
		return undefined;

	item.name = localItem.name;
	if (item.kind === 'course' && localItem.kind === 'course') {
		for (const field of courseFields)
			setOptional(item as Record<string, unknown>, field, localItem[field]);
	}
	if (patch.item.placementId && !applyPlacement(item, localItem, patch.item.placementId))
		return undefined;
	return draftPlanContentSchema.parse(resolved);
};
