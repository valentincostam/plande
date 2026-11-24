<script lang="ts">
	import type { ReviewUnit, ReviewUnitsInput } from './review-units';
	import { proposalImpact } from './proposal-impact';
	import ReviewPlanView from './review-plan-view.svelte';

	let { before, proposed }: { before: ReviewUnitsInput; proposed: ReviewUnitsInput } = $props();
	const impact = $derived(proposalImpact(before, proposed));

	function unitName(key: string, input: ReviewUnitsInput) {
		if (key === 'identity') return 'Identidad del plan';
		if (key.startsWith('source:'))
			return (
				input.sources.find((source) => source.id === key.slice('source:'.length))?.label ??
				'Fuente sin etiqueta'
			);
		if (key.startsWith('item:'))
			return (
				input.content.document.items.find((item) => item.id === key.slice('item:'.length))?.name ||
				'Ítem sin nombre'
			);
		if (key.startsWith('graduation:'))
			return (
				input.content.document.requirements.graduation?.find(
					(block) => block.id === key.slice('graduation:'.length)
				)?.label || 'Condición de graduación sin etiqueta'
			);
		return 'Contenido sin nombre';
	}

	function availability(unit: ReviewUnit) {
		return unit.unavailable === 'unknown_requirement'
			? 'Requisito pendiente.'
			: unit.unavailable === 'unresolvable'
				? 'Referencia sin resolver.'
				: undefined;
	}
</script>

{#snippet plan(input: ReviewUnitsInput)}
	<div class="grid gap-2 text-sm">
		<p>
			{input.identity.university}{input.identity.faculty ? ` · ${input.identity.faculty}` : ''} ·
			{input.identity.offer}
		</p>
		{#if input.identity.campus}<p>Sede: {input.identity.campus}</p>{/if}
		{#if input.identity.modality}<p>Modalidad: {input.identity.modality}</p>{/if}
		{#if input.identity.year !== undefined}<p>Año: {input.identity.year}</p>{/if}
		{#if input.identity.notes?.length}
			<section aria-label="Notas del plan" class="grid gap-1">
				<h3 class="font-medium">Notas</h3>
				{#each input.identity.notes as note (note.id)}<p class="whitespace-pre-wrap">
						{note.text}
					</p>{/each}
			</section>
		{/if}
		<section aria-label="Fuentes del plan" class="grid gap-1">
			<h3 class="font-medium">Fuentes</h3>
			{#each input.sources as source (source.id)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- source URL comes from the reviewed plan -->
				<a class="underline" href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{:else}<p>Sin fuentes.</p>{/each}
		</section>
	</div>
	<ReviewPlanView content={input.content} />
{/snippet}

<section class="grid gap-3" aria-labelledby="proposal-comparison-heading">
	<h2 id="proposal-comparison-heading" class="font-medium">Cambios propuestos</h2>
	{#if impact.added.length}
		<section aria-labelledby="proposal-added-heading">
			<h3 id="proposal-added-heading" class="font-medium">Agregado</h3>
			<ul>
				{#each impact.added as unit (unit.key)}
					<li>
						{unitName(unit.key, proposed)}
						{#if availability(unit)}<span class="text-sm"> {availability(unit)}</span>{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if impact.removed.length}
		<section aria-labelledby="proposal-removed-heading">
			<h3 id="proposal-removed-heading" class="font-medium">Retirado</h3>
			<ul>
				{#each impact.removed as unit (unit.key)}<li>{unitName(unit.key, before)}</li>{/each}
			</ul>
		</section>
	{/if}
	{#if impact.changed.length}
		<section aria-labelledby="proposal-changed-heading">
			<h3 id="proposal-changed-heading" class="font-medium">Modificado</h3>
			<ul>
				{#each impact.changed as unit (unit.after.key)}
					<li>
						{unitName(unit.after.key, proposed)}
						{#if availability(unit.after)}<span class="text-sm">
								{availability(unit.after)}</span
							>{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	<p class="text-sm">{impact.unchangedKeys.length} unidades sin cambios.</p>
	<details>
		<summary>Antes</summary>
		{@render plan(before)}
	</details>
	<details>
		<summary>Propuesto</summary>
		{@render plan(proposed)}
	</details>
</section>
