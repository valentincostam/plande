<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = {
		progress?: number; // 0..100
		strokeWidth?: number; // unidades del viewBox (0..100)
		fg?: string; // color foreground
		bg?: string; // color background
		rounded?: boolean;
		class?: ClassValue;
		children?: Snippet;
		label?: string;
	};

	let {
		progress = 0,
		strokeWidth = 8,
		fg = 'oklch(72.3% 0.219 149.579)', // green-500
		bg = 'var(--color-gray-300)',
		rounded = true,
		class: className,
		children,
		label = 'Avance de carrera'
	}: Props = $props();

	// Cálculos internos en un viewBox 0..100
	const clamped = $derived(Math.max(0, Math.min(100, progress)));
	const radius = $derived(50 - strokeWidth / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const dashOffset = $derived(circumference - (clamped / 100) * circumference);
</script>

<div
	class={['relative w-full', className]}
	style="aspect-ratio: 1 / 1;"
	role="progressbar"
	aria-valuenow={Math.round(clamped)}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-label={label}
>
	<svg viewBox="0 0 100 100" class="absolute inset-0 h-full w-full">
		<circle cx="50" cy="50" r={radius} stroke={bg} stroke-width={strokeWidth} fill="transparent" />
		<circle
			cx="50"
			cy="50"
			r={radius}
			stroke={fg}
			stroke-width={strokeWidth}
			fill="transparent"
			stroke-dasharray={`${circumference} ${circumference}`}
			style={`stroke-dashoffset: ${dashOffset}; transform: rotate(-90deg); transform-origin: 50% 50%;`}
			stroke-linecap={rounded ? 'round' : 'butt'}
		/>
	</svg>
	<div class="absolute inset-0 flex items-center justify-center">
		{#if children}
			{@render children()}
		{:else}
			<span class="flex items-center text-xl font-bold text-gray-600 md:text-2xl"
				>{Math.round(clamped)}<span class="text-[0.4em] font-normal text-gray-500">%</span></span
			>
		{/if}
	</div>
</div>
