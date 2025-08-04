<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		label: string;
		value: number;
		total?: number;
	};

	let { label, value, total, class: className }: Props = $props();

	const progress = $derived(total ? (value / total) * 100 : 0);
</script>

<li class={['overflow-hidden bg-gray-200 md:rounded-md', className]}>
	<div class="flex items-center justify-between gap-3 px-6 py-3">
		<span class="text-gray-700">{label}</span>
		<div class="flex items-center gap-0.5">
			<span class="text-center text-2xl font-bold whitespace-nowrap text-gray-600">{value}</span>
			{#if total}
				<span class="text-center text-xs text-gray-500">/</span>
				<span class="text-center text-xs text-gray-500">{total}</span>
			{/if}
		</div>
	</div>

	{#if progress}
		<div class="h-1 w-full bg-gray-300">
			<div class="h-full bg-green-500" style={`width: ${progress}%`}></div>
		</div>
	{/if}
</li>
