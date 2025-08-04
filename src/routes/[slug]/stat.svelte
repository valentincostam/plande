<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		label: string;
		progress?: number;
		value: string;
	};

	let { label, value, progress, class: className }: Props = $props();
</script>

<li class={['overflow-hidden rounded-md bg-gray-200', className]}>
	<div class="flex items-center justify-between gap-3 p-3">
		<span class="text-gray-700">{label}</span>
		<span class="text-right whitespace-nowrap text-gray-900">{value}</span>
	</div>

	{#if progress}
		<div class="h-1 w-full bg-gray-300">
			<div class="h-full rounded-full bg-green-500" style={`width: ${progress}%`}></div>
		</div>
	{/if}
</li>
