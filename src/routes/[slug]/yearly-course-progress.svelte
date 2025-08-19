<script lang="ts">
	import type { Year } from '$lib/year.svelte';
	import { getOrdinalSuperscript } from '$lib/year.svelte';
	import { courseStates } from '$lib/course-state';

	type Props = { years: Year[] };

	let { years }: Props = $props();

	const rows = $derived(
		years.map((y) => {
			const total = y.courses.length;
			const passed = y.courses.filter((c) => c.state === courseStates.passed).length;
			return { year: y.year, total, passed };
		})
	);
</script>

<div class="overflow-hidden bg-gray-100 p-4 md:rounded-md">
	<div class="mb-2 text-gray-700">Materias aprobadas por año</div>
	<ul class="grid gap-2">
		{#each rows as y}
			<li class="flex items-center gap-2">
				<span class="w-14 text-right text-[11px] text-gray-500">
					{y.year}<sup>{getOrdinalSuperscript(y.year)}</sup> año
				</span>
				<div
					class="grid h-2 w-full gap-0.5 overflow-hidden"
					style={`grid-template-columns: repeat(${Math.max(1, y.total)}, minmax(0, 1fr));`}
				>
					{#each Array(y.total) as _, i}
						<div
							class={`h-full ${i === 0 ? 'rounded-l-full ' : ''}${i === y.total - 1 ? 'rounded-r-full ' : ''}${i < y.passed ? 'bg-green-500' : 'bg-gray-300'}`}
						></div>
					{/each}
					<span class="sr-only">{y.passed}/{y.total}</span>
				</div>
				<span class="w-12 text-left text-xs whitespace-nowrap text-gray-600"
					><span class="font-bold">{y.passed}</span>
					<span class="text-gray-400">/ {y.total}</span></span
				>
			</li>
		{/each}
	</ul>
</div>
