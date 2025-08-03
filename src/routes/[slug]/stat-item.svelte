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

<li
	class={[
		'relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-gray-200 p-3',
		className
	]}
>
	<span class="text-center text-gray-700">{label}</span>
	<span class="text-xl">{value}</span>

	{#if progress}
		<div class="absolute bottom-0 h-1 w-full bg-gray-300">
			<div class="h-full rounded-full bg-green-500" style={`width: ${progress}%`}></div>
		</div>
	{/if}
</li>
