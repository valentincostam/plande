<script lang="ts">
	import { highlightTextSegments } from '$lib/search';

	type Props = {
		text: string;
		query: string;
	};

	let { text, query }: Props = $props();

	const segments = $derived(highlightTextSegments(text, query));
</script>

{#each segments as segment, index (index)}
	{#if segment.type === 'highlight'}
		<mark class="rounded bg-yellow-200 px-0.5">{segment.content}</mark>
	{:else}
		{segment.content}
	{/if}
{/each}
