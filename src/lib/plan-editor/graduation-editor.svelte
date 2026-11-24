<script lang="ts">
	import type { DraftPlanContent } from './draft-plan-content';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { readGraduationRequirement, replaceGraduationRequirement } from './graduation-field';
	import RequirementValueEditor from './requirement-value-editor.svelte';
	import Button from './ui/button.svelte';

	let {
		content,
		oncontentchange
	}: {
		content: DraftPlanContent;
		oncontentchange: (content: DraftPlanContent) => void;
	} = $props();

	const editorId = $props.id();
	let removalId = $state<string | undefined>(undefined);
	let removalOpen = $state(false);
	const requirements = $derived(content.document.requirements.graduation ?? []);

	function change(next: DraftPlanContent) {
		oncontentchange(next);
	}

	function updateBlock(id: string, update: (block: (typeof requirements)[number]) => void) {
		const next = structuredClone($state.snapshot(content));
		const block = next.document.requirements.graduation?.find((candidate) => candidate.id === id);
		if (!block) return;
		update(block);
		change(next);
	}

	function add() {
		const next = structuredClone($state.snapshot(content));
		const id = `graduation-${crypto.randomUUID()}`;
		next.document.requirements.graduation = [
			...(next.document.requirements.graduation ?? []),
			{ id, label: '' }
		];
		next.unknownRequirements.push({ scope: `graduation:${id}`, note: 'Todavía no comprobado.' });
		change(next);
	}

	function move(id: string, offset: number) {
		const next = structuredClone($state.snapshot(content));
		const blocks = next.document.requirements.graduation;
		if (!blocks) return;
		const index = blocks.findIndex((block) => block.id === id);
		const destination = index + offset;
		if (index < 0 || destination < 0 || destination >= blocks.length) return;
		[blocks[index], blocks[destination]] = [blocks[destination], blocks[index]];
		change(next);
	}

	function remove() {
		if (!removalId) return;
		const next = structuredClone($state.snapshot(content));
		next.document.requirements.graduation = next.document.requirements.graduation?.filter(
			(block) => block.id !== removalId
		);
		next.unknownRequirements = next.unknownRequirements.filter(
			(entry) => entry.scope !== `graduation:${removalId}`
		);
		removalId = undefined;
		removalOpen = false;
		change(next);
	}

	function updateWeight(id: string, value: string) {
		if (value.trim() === '') {
			updateBlock(id, (block) => delete block.weight);
			return;
		}
		const weight = Number(value);
		if (Number.isFinite(weight)) updateBlock(id, (block) => (block.weight = weight));
	}
</script>

<section aria-labelledby={`${editorId}-heading`} class="grid gap-3">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 id={`${editorId}-heading`} class="text-lg font-semibold">Condiciones de graduación</h2>
		<Button type="button" variant="outline" onclick={add}>+ Agregar condición de graduación</Button>
	</div>

	{#each requirements as requirement, index (requirement.id)}
		<Field.Set class="gap-3">
			<Field.Legend>Condición de graduación {index + 1}</Field.Legend>
			<div class="flex flex-wrap items-end gap-2">
				<Field.Field class="min-w-48 grow">
					<Field.Label for={`${editorId}-${requirement.id}-label`}
						>Nombre de la condición</Field.Label
					>
					<Input
						id={`${editorId}-${requirement.id}-label`}
						value={requirement.label}
						oninput={(event) =>
							updateBlock(requirement.id, (block) => (block.label = event.currentTarget.value))}
					/>
				</Field.Field>
				<Field.Field class="max-w-48">
					<Field.Label for={`${editorId}-${requirement.id}-weight`}>Peso en el progreso</Field.Label
					>
					<Input
						id={`${editorId}-${requirement.id}-weight`}
						class="w-24"
						type="number"
						step="any"
						value={requirement.weight ?? ''}
						oninput={(event) => updateWeight(requirement.id, event.currentTarget.value)}
					/>
					<Field.Description
						>Opcional. Las sumas de horas o créditos necesitan peso.</Field.Description
					>
				</Field.Field>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					disabled={index === 0}
					aria-label="Subir condición de graduación"
					onclick={() => move(requirement.id, -1)}>↑</Button
				>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					disabled={index === requirements.length - 1}
					aria-label="Bajar condición de graduación"
					onclick={() => move(requirement.id, 1)}>↓</Button
				>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onclick={() => {
						removalId = requirement.id;
						removalOpen = true;
					}}>Retirar</Button
				>
			</div>
			<RequirementValueEditor
				{content}
				legend="Requisito de graduación"
				value={readGraduationRequirement($state.snapshot(content), requirement.id)}
				allowNone={false}
				onvaluechange={(value) => {
					if (value.kind === 'none') return;
					change(
						replaceGraduationRequirement(
							$state.snapshot(content),
							requirement.id,
							$state.snapshot(value)
						)
					);
				}}
			/>
		</Field.Set>
	{/each}
</section>

<AlertDialog.Root bind:open={removalOpen}>
	<AlertDialog.Content class="plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain">
		<AlertDialog.Header
			><AlertDialog.Title>Retirar condición de graduación</AlertDialog.Title
			><AlertDialog.Description>Se retirará al guardar los cambios.</AlertDialog.Description
			></AlertDialog.Header
		>
		<AlertDialog.Footer
			><AlertDialog.Cancel type="button">Cancelar</AlertDialog.Cancel><AlertDialog.Action
				type="button"
				onclick={remove}>Retirar</AlertDialog.Action
			></AlertDialog.Footer
		>
	</AlertDialog.Content>
</AlertDialog.Root>
