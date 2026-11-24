import type { DraftPlanContent, EditorItem } from './draft-plan-content';
import { describeRequirement } from '$lib/formatters/study-plan-document';
import { readRequirementField } from './requirement-field';
import { readGraduationRequirement } from './graduation-field';
import type { RequirementScope, SectionPatch } from './section-patches';
import { courseTermLabels } from '$lib/course-term';
import { courseTypeLabels } from '$lib/course-type';

const courseFields = [
	'type',
	'code',
	'hours',
	'totalHours',
	'credits',
	'tags',
	'attributes'
] as const;

export type EditorRecoveries = {
	items: Record<string, { historyVersion: number; content: DraftPlanContent }>;
	sections: Record<string, { historyVersion: number; content: DraftPlanContent }>;
};

const noRecoveries = (): EditorRecoveries => ({ items: {}, sections: {} });

export function editorChanges(
	base: DraftPlanContent,
	content: DraftPlanContent,
	recoveries: EditorRecoveries = noRecoveries()
): SectionPatch[] {
	const changes: SectionPatch[] = [];
	for (const section of content.document.sections) {
		const recovery = recoveries.sections[section.id];
		const current = base.document.sections.find((candidate) => candidate.id === section.id);
		const before =
			current ??
			recovery?.content.document.sections.find((candidate) => candidate.id === section.id);
		if (!current && before && recovery)
			changes.push({
				op: 'section.restore',
				sectionId: section.id,
				historyVersion: recovery.historyVersion
			});
		if (!before) changes.push({ op: 'section.create', section });
		else if (before.label !== section.label)
			changes.push({ op: 'section.rename', sectionId: section.id, label: section.label });
	}
	for (const item of content.document.items) {
		const recovery = recoveries.items[item.id];
		const current = base.document.items.find((candidate) => candidate.id === item.id);
		const before =
			current ?? recovery?.content.document.items.find((candidate) => candidate.id === item.id);
		if (!current && before && recovery) {
			changes.push({
				op: 'item.restore',
				itemId: item.id,
				historyVersion: recovery.historyVersion
			});
		}
		if (!before) {
			const placement = item.placements[0];
			if (item.kind === 'milestone')
				changes.push({
					op: 'milestone.create',
					item: {
						id: item.id,
						name: item.name,
						...(placement ? { placementId: placement.id, sectionId: placement.sectionId } : {})
					}
				});
			else if (placement)
				changes.push({
					op: 'course.create',
					item: {
						id: item.id,
						name: item.name,
						placementId: placement.id,
						sectionId: placement.sectionId,
						fields: Object.fromEntries(
							courseFields
								.filter((field) => item[field] !== undefined)
								.map((field) => [field, item[field]])
						)
					}
				});
		} else {
			if (before.name !== item.name)
				changes.push({ op: 'item.rename', itemId: item.id, name: item.name });
			if (before.kind === 'course' && item.kind === 'course') {
				for (const field of courseFields) {
					if (JSON.stringify(before[field]) !== JSON.stringify(item[field]))
						changes.push({
							op: 'course.patch',
							itemId: item.id,
							patch: { [field]: item[field] ?? null }
						});
				}
			}
		}
		const scopes: RequirementScope[] =
			item.kind === 'course' ? ['enroll', 'complete'] : ['complete'];
		for (const scope of scopes) {
			const previous = readRequirementField(base, item.id, scope);
			const next = readRequirementField(content, item.id, scope);
			if (JSON.stringify(previous) !== JSON.stringify(next))
				changes.push({ op: 'requirement.replace', itemId: item.id, scope, value: next });
		}
		for (const placement of item.placements) {
			const old = before?.placements.find((candidate) => candidate.id === placement.id);
			if (!old) {
				if (before || placement !== item.placements[0])
					changes.push({ op: 'placement.create', itemId: item.id, placement });
				else {
					for (const field of ['term', 'order'] as const) {
						if (placement[field] !== undefined)
							changes.push({
								op: 'placement.patch',
								itemId: item.id,
								placementId: placement.id,
								patch: { [field]: placement[field] }
							});
					}
				}
			} else {
				for (const field of ['sectionId', 'term', 'order'] as const) {
					if (old[field] !== placement[field])
						changes.push({
							op: 'placement.patch',
							itemId: item.id,
							placementId: placement.id,
							patch: { [field]: placement[field] ?? null }
						});
				}
			}
		}
		for (const placement of before?.placements ?? []) {
			if (!item.placements.some((candidate) => candidate.id === placement.id))
				changes.push({ op: 'placement.remove', itemId: item.id, placementId: placement.id });
		}
	}
	for (const item of base.document.items) {
		if (!content.document.items.some((candidate) => candidate.id === item.id))
			changes.push({ op: 'item.remove', itemId: item.id });
	}
	const baseUnplacedIds = base.document.items
		.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
		.map((item) => item.id);
	const unplacedIds = content.document.items
		.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
		.map((item) => item.id);
	const expectedUnplacedIds = [
		...baseUnplacedIds.filter((id) => unplacedIds.includes(id)),
		...unplacedIds.filter((id) => !baseUnplacedIds.includes(id))
	];
	if (JSON.stringify(expectedUnplacedIds) !== JSON.stringify(unplacedIds))
		changes.push({ op: 'unplaced.reorder', itemIds: unplacedIds });
	const baseGraduation = base.document.requirements.graduation ?? [];
	const graduation = content.document.requirements.graduation ?? [];
	for (const block of graduation) {
		const before = baseGraduation.find((candidate) => candidate.id === block.id);
		if (!before) {
			changes.push({ op: 'graduation.create', block: { id: block.id, label: block.label } });
			if (block.weight !== undefined)
				changes.push({
					op: 'graduation.patch',
					blockId: block.id,
					patch: { weight: block.weight }
				});
		} else {
			if (before.label !== block.label)
				changes.push({ op: 'graduation.patch', blockId: block.id, patch: { label: block.label } });
			if (before.weight !== block.weight)
				changes.push({
					op: 'graduation.patch',
					blockId: block.id,
					patch: { weight: block.weight ?? null }
				});
		}
		const previous = readGraduationRequirement(base, block.id);
		const next = readGraduationRequirement(content, block.id);
		if (JSON.stringify(previous) !== JSON.stringify(next))
			changes.push({ op: 'graduation.requirement.replace', blockId: block.id, value: next });
	}
	for (const block of baseGraduation) {
		if (!graduation.some((candidate) => candidate.id === block.id))
			changes.push({ op: 'graduation.remove', blockId: block.id });
	}
	if (
		JSON.stringify(baseGraduation.map((block) => block.id)) !==
		JSON.stringify(graduation.map((block) => block.id))
	)
		changes.push({ op: 'graduation.reorder', blockIds: graduation.map((block) => block.id) });
	for (const section of base.document.sections) {
		if (!content.document.sections.some((candidate) => candidate.id === section.id))
			changes.push({ op: 'section.remove', sectionId: section.id });
	}
	const order = [
		...base.document.sections
			.filter((section) =>
				content.document.sections.some((candidate) => candidate.id === section.id)
			)
			.map((section) => section.id),
		...content.document.sections
			.filter((section) => !base.document.sections.some((candidate) => candidate.id === section.id))
			.map((section) => section.id)
	];
	for (const [index, section] of content.document.sections.entries()) {
		if (order[index] !== section.id) {
			changes.push({
				op: 'section.reorder',
				sectionId: section.id,
				afterSectionId: content.document.sections[index - 1]?.id ?? null
			});
			order.splice(order.indexOf(section.id), 1);
			order.splice(index, 0, section.id);
		}
	}
	return changes;
}

export function changeKey(patch: SectionPatch): string {
	if (patch.op === 'requirement.replace') return `item:${patch.itemId}:requirements:${patch.scope}`;
	if (patch.op === 'graduation.create' || patch.op === 'graduation.remove')
		return `graduation:${patch.op === 'graduation.create' ? patch.block.id : patch.blockId}`;
	if (patch.op === 'graduation.patch')
		return `graduation:${patch.blockId}:${Object.keys(patch.patch)[0]}`;
	if (patch.op === 'graduation.requirement.replace')
		return `graduation:${patch.blockId}:requirement`;
	if (patch.op === 'graduation.reorder') return 'graduation:order';
	if (patch.op === 'unplaced.reorder') return 'unplaced:order';
	if (patch.op === 'placement.create') return patch.placement.id;
	if (patch.op === 'placement.patch') return `${patch.placementId}:${Object.keys(patch.patch)[0]}`;
	if (patch.op === 'placement.remove') return patch.placementId;
	if (patch.op === 'section.create') return patch.section.id;
	if (patch.op === 'section.restore') return patch.sectionId;
	if (
		patch.op === 'section.rename' ||
		patch.op === 'section.remove' ||
		patch.op === 'section.reorder'
	)
		return patch.sectionId;
	if (patch.op === 'course.create' || patch.op === 'milestone.create') return patch.item.id;
	if (patch.op === 'item.restore') return patch.itemId;
	if (patch.op === 'course.patch') return `${patch.itemId}:${Object.keys(patch.patch)[0]}`;
	return patch.itemId!;
}

export const choiceKey = (patch: SectionPatch) => `${patch.op}:${changeKey(patch)}`;

export function changeValue(patch: SectionPatch, content: DraftPlanContent): string {
	if (patch.op === 'unplaced.reorder')
		return content.document.items
			.filter((item) => item.kind === 'milestone' && item.placements.length === 0)
			.map((item) => item.name)
			.join(' · ');
	if (patch.op === 'requirement.replace') {
		const value = readRequirementField(content, patch.itemId, patch.scope);
		if (value.kind === 'none') return 'Sin requisitos';
		if (value.kind === 'unknown') return value.note;
		return describeRequirement(value.expression, content.document);
	}
	if (
		patch.op === 'graduation.create' ||
		patch.op === 'graduation.patch' ||
		patch.op === 'graduation.requirement.replace' ||
		patch.op === 'graduation.remove' ||
		patch.op === 'graduation.reorder'
	) {
		if (patch.op === 'graduation.reorder')
			return (content.document.requirements.graduation ?? [])
				.map((block) => block.label)
				.join(' · ');
		const id = patch.op === 'graduation.create' ? patch.block.id : patch.blockId;
		const block = content.document.requirements.graduation?.find(
			(candidate) => candidate.id === id
		);
		if (!block) return 'Bloque retirado';
		if (patch.op === 'graduation.requirement.replace') {
			const value = readGraduationRequirement(content, id);
			return value.kind === 'unknown'
				? value.note
				: describeRequirement(value.expression, content.document);
		}
		if (patch.op === 'graduation.patch' && 'weight' in patch.patch)
			return block.weight === undefined ? 'Sin indicar' : String(block.weight);
		return block.label;
	}
	if (
		patch.op === 'placement.create' ||
		patch.op === 'placement.patch' ||
		patch.op === 'placement.remove'
	) {
		const id = patch.op === 'placement.create' ? patch.placement.id : patch.placementId;
		const placement = content.document.items
			.flatMap((item) => item.placements)
			.find((candidate) => candidate.id === id);
		if (!placement) return 'Ubicación retirada';
		const section =
			content.document.sections.find((candidate) => candidate.id === placement.sectionId)?.label ||
			'Sección sin título';
		const term = placement.term ? courseTermLabels[placement.term] : '';
		return [section, term, placement.order === undefined ? '' : `Posición ${placement.order}`]
			.filter(Boolean)
			.join(' · ');
	}
	if (
		patch.op === 'section.create' ||
		patch.op === 'section.rename' ||
		patch.op === 'section.remove' ||
		patch.op === 'section.restore' ||
		patch.op === 'section.reorder'
	) {
		const id = patch.op === 'section.create' ? patch.section.id : patch.sectionId;
		return (
			content.document.sections.find((section) => section.id === id)?.label ?? 'Sección retirada'
		);
	}
	const id =
		patch.op === 'course.create' || patch.op === 'milestone.create' ? patch.item.id : patch.itemId!;
	const item = content.document.items.find((candidate) => candidate.id === id);
	if (!item) return 'Elemento retirado';
	if (patch.op === 'course.patch') {
		const field = Object.keys(patch.patch)[0];
		if (field === 'type' && item.kind === 'course') return courseTypeLabels[item.type];
		const value = item[field as keyof EditorItem];
		return value === undefined
			? 'Sin indicar'
			: Array.isArray(value)
				? value.join(', ')
				: String(value);
	}
	return item.name;
}
