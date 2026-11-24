<script lang="ts">
	import { courseAttributeLabels } from '$lib/course-attribute';
	import { courseTermLabels } from '$lib/course-term';
	import { courseTypeLabels } from '$lib/course-type';
	import { describeRequirement } from '$lib/formatters/study-plan-document';
	import type { Snippet } from 'svelte';
	import type { DraftPlanContent, EditorItem } from './draft-plan-content';
	import { readGraduationRequirement } from './graduation-field';
	import { readRequirementField } from './requirement-field';
	import { itemsInSection } from './structure';

	let {
		content,
		checkControl
	}: {
		content: DraftPlanContent;
		checkControl?: Snippet<[string]>;
	} = $props();

	function itemDetails(item: EditorItem) {
		const details = [item.code ? `Código: ${item.code}` : undefined];
		if (item.kind === 'course') {
			details.push(`Tipo: ${courseTypeLabels[item.type]}`);
			if (item.hours !== undefined) details.push(`${item.hours} horas`);
			if (item.totalHours !== undefined) details.push(`${item.totalHours} horas totales`);
			if (item.credits !== undefined) details.push(`${item.credits} créditos`);
		}
		return details.filter(Boolean).join(' · ');
	}

	function placementDetails(item: EditorItem, sectionId: string) {
		return item.placements
			.filter((placement) => placement.sectionId === sectionId)
			.map((placement) => {
				const details = [
					placement.term === undefined
						? undefined
						: courseTermLabels[placement.term] || 'Período no indicado',
					placement.order === undefined ? undefined : `Orden: ${placement.order}`
				];
				return details.filter(Boolean).join(' · ') || 'Sin período ni orden';
			})
			.join(' / ');
	}

	function unknownNotes(scope: string) {
		return content.unknownRequirements
			.filter((unknown) => unknown.scope === scope)
			.map((unknown) => unknown.note);
	}

	function requirementSummary(item: EditorItem, scope: 'enroll' | 'complete') {
		const value = readRequirementField(content, item.id, scope);
		if (value.kind === 'expression') return describeRequirement(value.expression, content.document);
		return value.kind === 'none' ? 'Sin requisitos' : value.note;
	}

	function extraUnknownNotes(item: EditorItem, scope: 'enroll' | 'complete') {
		return item.requirements?.[scope] ? unknownNotes(`item:${item.id}:${scope}`) : [];
	}

	function graduationSummary(blockId: string) {
		const value = readGraduationRequirement(content, blockId);
		return value.kind === 'expression'
			? describeRequirement(value.expression, content.document)
			: value.note;
	}
</script>

<section class="grid gap-3" aria-label="Revisión del plan">
	<h2 class="font-medium">Plan completo</h2>
	{#each content.document.sections as section (section.id)}
		<section
			class="border-l border-gray-300 pl-3"
			aria-label={section.label || 'Sección sin título'}
		>
			<h3>
				{section.label || 'Sección sin título'}{section.year === undefined
					? ''
					: ` · Año ${section.year}`}
			</h3>
			<ul class="grid gap-2 text-sm">
				{#each itemsInSection(content.document, section.id) as item (item.id)}
					<li>
						<div>{item.name || 'Ítem sin nombre'}</div>
						{@render checkControl?.(`item:${item.id}`)}
						<div>{itemDetails(item)}</div>
						<div>{placementDetails(item, section.id)}</div>
						{#if item.tags?.length}<div>Etiquetas: {item.tags.join(', ')}</div>{/if}
						{#if item.kind === 'course' && item.attributes?.length}
							<div>
								Características: {item.attributes
									.map((attribute) => courseAttributeLabels[attribute])
									.join(', ')}
							</div>
						{/if}
						{#if item.kind === 'course'}
							<div>Para cursar: {requirementSummary(item, 'enroll')}</div>
							{#each extraUnknownNotes(item, 'enroll') as note, index (`${item.id}:enroll:${index}`)}<div
								>
									Para cursar: {note}
								</div>{/each}
						{/if}
						<div>Para completar: {requirementSummary(item, 'complete')}</div>
						{#each extraUnknownNotes(item, 'complete') as note, index (`${item.id}:complete:${index}`)}<div
							>
								Para completar: {note}
							</div>{/each}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
	{#if content.document.items.some((item) => item.placements.length === 0)}
		<section class="border-l border-gray-300 pl-3" aria-label="Ítems sin ubicación">
			<h3>Sin ubicación</h3>
			<ul class="grid gap-2 text-sm">
				{#each content.document.items.filter((item) => item.placements.length === 0) as item (item.id)}
					<li>
						<div>{item.name || 'Ítem sin nombre'}</div>
						{@render checkControl?.(`item:${item.id}`)}
						<div>{itemDetails(item)}</div>
						{#if item.tags?.length}<div>Etiquetas: {item.tags.join(', ')}</div>{/if}
						{#if item.kind === 'course' && item.attributes?.length}
							<div>
								Características: {item.attributes
									.map((attribute) => courseAttributeLabels[attribute])
									.join(', ')}
							</div>
						{/if}
						{#if item.kind === 'course'}
							<div>Para cursar: {requirementSummary(item, 'enroll')}</div>
							{#each extraUnknownNotes(item, 'enroll') as note, index (`${item.id}:enroll:${index}`)}<div
								>
									Para cursar: {note}
								</div>{/each}
						{/if}
						<div>Para completar: {requirementSummary(item, 'complete')}</div>
						{#each extraUnknownNotes(item, 'complete') as note, index (`${item.id}:complete:${index}`)}<div
							>
								Para completar: {note}
							</div>{/each}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if content.document.requirements.graduation?.length}
		<section class="border-l border-gray-300 pl-3" aria-label="Requisitos de graduación">
			<h3>Graduación</h3>
			<ul class="grid gap-2 text-sm">
				{#each content.document.requirements.graduation as requirement (requirement.id)}
					<li>
						<div>{requirement.label || 'Condición sin etiqueta'}</div>
						{@render checkControl?.(`graduation:${requirement.id}`)}
						{#if requirement.weight !== undefined}<div>Peso: {requirement.weight}</div>{/if}
						<div>{graduationSummary(requirement.id)}</div>
						{#each requirement.expr ? unknownNotes(`graduation:${requirement.id}`) : [] as note, index (`${requirement.id}:${index}`)}<div
							>
								{note}
							</div>{/each}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if content.unsupportedContent.length}
		<section class="border-l border-gray-300 pl-3" aria-label="Contenido sin editor">
			<h3>Dudas conservadas</h3>
			<ul class="grid gap-2 text-sm">
				{#each content.unsupportedContent as unsupported, index (`${unsupported.path}:${index}`)}
					<li>
						<details>
							<summary>Contenido sin editor: {unsupported.path}</summary>
							<pre class="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(
									unsupported.value,
									null,
									2
								)}</pre>
						</details>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</section>
