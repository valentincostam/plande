<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={props.class}
>
	<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
	<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
