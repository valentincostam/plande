<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		label: string;
		showPercentage?: boolean;
		total?: number;
		value: number;
	};

	let { label, value, total, class: className, showPercentage = false }: Props = $props();

	const progress = $derived(total ? Math.round((value / total) * 100) : 0);
</script>

<li class={['overflow-hidden rounded-md bg-gray-100', className]}>
	<div class="flex items-center justify-between gap-3 px-6 py-3">
		<span class="text-gray-700">{label}</span>
		<div class="flex items-center gap-0.5">
			<span class="flex items-center text-2xl font-bold whitespace-nowrap text-gray-600">
				{showPercentage ? progress : value}<span class="text-xs font-normal text-gray-500"
					>{showPercentage ? '%' : ''}</span
				>
			</span>
			{#if total && !showPercentage}
				<span class="text-xs text-gray-500">/</span>
				<span class="text-xs text-gray-500">{total}</span>
			{/if}
		</div>
	</div>

	{#if progress}
		<div class="h-1 w-full bg-gray-300">
			<div class="h-full bg-green-500" style={`width: ${progress}%`}></div>
		</div>
	{/if}
</li>
