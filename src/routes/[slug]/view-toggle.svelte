<script lang="ts">
	import ListIcon from '$lib/icons/list-icon.svelte';
	import DiagramIcon from '$lib/icons/diagram-icon.svelte';

	type Props = {
		value: 'list' | 'diagram';
	};

	let { value = $bindable() }: Props = $props();
</script>

<div class="inline-flex gap-0.5 rounded-md bg-gray-100 p-1 text-sm">
	<button
		onclick={() => (value = 'list')}
		class={[
			'flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 transition-all',
			value === 'list' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'
		]}
	>
		<ListIcon class="h-4 w-4" />
		Lista
	</button>
	<button
		onclick={() => (value = 'diagram')}
		class={[
			'flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 transition-all',
			value === 'diagram' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'
		]}
	>
		<DiagramIcon class="h-4 w-4" />
		Diagrama
	</button>
</div>
