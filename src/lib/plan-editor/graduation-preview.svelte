<script lang="ts">
	import { courseStates } from '$lib/course-state';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { milestoneStates, type ItemState } from '$lib/study-plan-data';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import { previewGraduation } from './graduation-preview';
	import Select from './ui/select.svelte';
	let { content }: { content: DraftPlanContent } = $props();
	let states = $state<Record<string, ItemState>>({});
	let open = $state(false);
	const preview = $derived(previewGraduation($state.snapshot(content), $state.snapshot(states)));
	const fieldId = $props.id();
	const courseStateOptions = [
		{ value: courseStates.notTaken, label: 'No cursada' },
		{ value: courseStates.inProgress, label: 'En curso' },
		{ value: courseStates.taken, label: 'Regularizada' },
		{ value: courseStates.passed, label: 'Aprobada' }
	];
	const milestoneStateOptions = [
		{ value: milestoneStates.pending, label: 'Pendiente' },
		{ value: milestoneStates.completed, label: 'Completado' }
	];
</script>

<Collapsible.Root bind:open class="border-border rounded-xl border px-4 py-3">
	<Collapsible.Trigger
		class="flex w-full cursor-pointer items-center justify-between gap-4 text-start font-semibold"
	>
		<span>Probar graduación</span>
		<ChevronDown
			class={`text-muted-foreground size-4 transition-transform duration-150 ease-out ${open ? 'rotate-180' : ''}`}
			strokeWidth={1.75}
			aria-hidden="true"
		/>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<p class="text-muted-foreground mt-2 text-sm">
			Estos estados son de prueba. No cambian tu progreso ni publican el plan.
		</p>
		{#if preview.kind === 'unavailable'}
			<p role="status" class="mt-3 text-sm">{preview.message}</p>
		{:else}
			<Field.Group class="my-4 gap-4">
				{#each content.document.items as item (item.id)}
					<Field.Field orientation="responsive">
						<Field.Label for={`${fieldId}-${item.id}`}
							>Estado simulado de {item.name || 'elemento sin nombre'}</Field.Label
						>
						<Select
							id={`${fieldId}-${item.id}`}
							value={states[item.id] ??
								(item.kind === 'course' ? courseStates.notTaken : milestoneStates.pending)}
							options={item.kind === 'course' ? courseStateOptions : milestoneStateOptions}
							onvaluechange={(value) => (states[item.id] = value as ItemState)}
						/>
					</Field.Field>
				{/each}
			</Field.Group>
			<p role="status" class="font-semibold">
				Graduación simulada: {Number(preview.progress.percentage.toFixed(1))}%
			</p>
			<ul class="mt-2 space-y-1 text-sm">
				{#each preview.progress.blocks as block (block.id)}
					<li>
						{block.label || 'Condición sin nombre'}: {Number((block.progress * 100).toFixed(1))}%
					</li>
				{/each}
			</ul>
		{/if}
	</Collapsible.Content>
</Collapsible.Root>
