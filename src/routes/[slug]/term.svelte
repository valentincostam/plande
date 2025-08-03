<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		title: string;
	};

	let { children, title }: Props = $props();
</script>

<h3 class="p-3 text-sm text-gray-600">{title}</h3>
<ul class="grid gap-1">
	{@render children()}
</ul>
