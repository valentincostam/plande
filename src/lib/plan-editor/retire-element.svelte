<script lang="ts">
	import { tick } from 'svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import { mergeSectionPatches, type SectionPatch } from './section-patches';
	let {
		content,
		targetId,
		kind,
		label,
		wasPublished = false,
		open = $bindable(false),
		trigger = true,
		returnFocus = null,
		oncontentchange
	}: {
		content: DraftPlanContent;
		targetId: string;
		kind: 'item' | 'section';
		label: string;
		wasPublished?: boolean;
		open?: boolean;
		trigger?: boolean;
		returnFocus?: HTMLElement | null;
		oncontentchange: (content: DraftPlanContent) => void;
	} = $props();
	let wasOpen = false;
	const patch = $derived<SectionPatch>(
		kind === 'item'
			? { op: 'item.remove', itemId: targetId }
			: { op: 'section.remove', sectionId: targetId }
	);
	const removal = $derived(
		mergeSectionPatches($state.snapshot(content), $state.snapshot(content), [patch])
	);
	const blocked = $derived('conflicts' in removal);
	const references = $derived('diagnostics' in removal ? (removal.diagnostics ?? []) : []);
	const actionLabel = $derived(
		kind === 'item'
			? wasPublished
				? 'Retirar de la corrección'
				: 'Eliminar del borrador'
			: 'Retirar del borrador'
	);
	function referenceLabel(scope: string) {
		if (scope.startsWith('graduation:')) return 'Un requisito de egreso';
		const item = content.document.items.find((candidate) => scope.includes(candidate.id));
		return item?.name || 'Un requisito o ubicación del plan';
	}
	async function retire() {
		if (blocked) return;
		open = false;
		await tick();
		oncontentchange(removal.content);
	}
	$effect(() => {
		if (wasOpen && !open) {
			tick().then(() => {
				if (returnFocus?.isConnected) returnFocus.focus();
			});
		}
		wasOpen = open;
	});
</script>

<AlertDialog.Root bind:open>
	{#if trigger}
		<AlertDialog.Trigger
			type="button"
			class="text-muted-foreground hover:text-destructive rounded px-2 py-1 text-sm"
			aria-label={`Retirar ${label}`}>Retirar</AlertDialog.Trigger
		>
	{/if}
	<AlertDialog.Content class="plan-editor">
		<AlertDialog.Header>
			<AlertDialog.Title>Retirar {label}</AlertDialog.Title>
			<AlertDialog.Description>
				{wasPublished
					? blocked
						? 'Antes de retirarlo, corregí las referencias o mové los elementos que dependen de él. El progreso y las notas ya registrados se conservan.'
						: 'Dejará de aparecer en la próxima publicación. El progreso y las notas ya registrados se conservan.'
					: blocked
						? 'Antes de retirarlo, corregí las referencias o mové los elementos que dependen de él.'
						: 'Se retirará de este borrador cuando guardes los cambios.'}
			</AlertDialog.Description>
		</AlertDialog.Header>
		{#if references.length}<ul class="list-inside list-disc text-sm">
				{#each references as reference, index (`${reference.scope}:${index}`)}<li>
						{referenceLabel(reference.scope)}
					</li>{/each}
			</ul>{/if}
		<AlertDialog.Footer>
			<AlertDialog.Cancel type="button">Volver</AlertDialog.Cancel>
			{#if !blocked}<AlertDialog.Action type="button" variant="destructive" onclick={retire}
					>{actionLabel}</AlertDialog.Action
				>{/if}
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
