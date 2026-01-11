<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		label: string;
		showPercentage?: boolean;
		total?: number;
		value: number;
		unit?: string;
		description?: string;
	};

	let {
		label,
		value,
		total,
		class: className,
		showPercentage = false,
		unit,
		description
	}: Props = $props();

	const numberFormatter = new Intl.NumberFormat('es-AR', {
		maximumFractionDigits: 2
	});

	const progress = $derived(total ? Math.round((value / total) * 100) : 0);
</script>

<li class={['overflow-hidden rounded-md bg-gray-100', className]}>
	<div class="flex items-center justify-between gap-3 px-6 py-3">
		<div class="grid">
			<span class="text-gray-700">{label}</span>
			{#if description}
				<span class="text-xs text-gray-500">{description}</span>
			{/if}
		</div>
		<div class="flex items-center gap-1">
			<span class="flex items-center text-2xl font-bold whitespace-nowrap text-gray-600">
				{showPercentage ? progress : numberFormatter.format(unit === 'hs.' ? Math.round(value) : value)}<span
					class="text-xs font-normal text-gray-500">{showPercentage ? '%' : ''}</span
				>
			</span>
			{#if total && !showPercentage}
				<span class="text-xs text-gray-500">de</span>
				<span class="text-xs text-gray-500">{total}</span>
			{/if}
			{#if unit}
				<span class="text-xs text-gray-500">{unit}</span>
			{/if}
		</div>
	</div>

	{#if progress}
		<div class="h-1 w-full bg-gray-300">
			<div class="h-full bg-green-500" style={`width: ${progress}%`}></div>
		</div>
	{/if}
</li>
