<script lang="ts">
	import UndoIcon from './undo-icon.svelte';
	import RedoIcon from './redo-icon.svelte';

	type Props = {
		canUndo: boolean;
		canRedo: boolean;
		onUndo: () => void;
		onRedo: () => void;
	};

	let { canUndo, canRedo, onUndo, onRedo }: Props = $props();

	const show = $derived(canUndo || canRedo);
</script>

{#if show}
	<div class="sticky bottom-3 z-50 flex justify-center gap-3 px-3">
		<button
			onclick={onUndo}
			disabled={!canUndo}
			aria-label="Deshacer"
			aria-keyshortcuts="Control+z Meta+z"
			class="flex items-center gap-3 rounded-lg bg-white px-3 py-1.5 ring-1 ring-black/10 transition-colors hover:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-white dark:bg-gray-200 dark:ring-white/10 dark:hover:bg-gray-300 dark:disabled:hover:bg-gray-200"
		>
			<UndoIcon class={['h-3 w-3', !canUndo ? 'text-gray-300' : 'text-gray-700']} />
			<span class="text-sm">Deshacer</span>
		</button>
		<button
			onclick={onRedo}
			disabled={!canRedo}
			aria-label="Rehacer"
			aria-keyshortcuts="Control+Shift+z Meta+Shift+z Control+y"
			class="flex items-center gap-3 rounded-lg bg-white px-3 py-1.5 ring-1 ring-black/10 transition-colors hover:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-white dark:bg-gray-200 dark:ring-white/10 dark:hover:bg-gray-300 dark:disabled:hover:bg-gray-200"
		>
			<RedoIcon class={['h-3 w-3', !canRedo ? 'text-gray-300' : 'text-gray-700']} />
			<span class="text-sm">Rehacer</span>
		</button>
	</div>
{/if}
