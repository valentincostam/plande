<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<svg
	width="16"
	height="16"
	viewBox="0 0 24 24"
	fill="currentColor"
	aria-hidden="true"
	class={props.class}
>
	<path
		d="M8 10v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v1h2v-1c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-13z"
	/>
</svg>
