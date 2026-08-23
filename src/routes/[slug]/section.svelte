<script lang="ts">
	import type { Snippet } from 'svelte';
	import AnchoredHeading from './anchored-heading.svelte';

	type Props = {
		id: string;
		title: string;
		description?: string;
		children: Snippet;
	};

	let { id, title, description, children }: Props = $props();

	const headingId = $derived(`${id}-heading`);
</script>

<section aria-labelledby={headingId} {id}>
	<AnchoredHeading
		{id}
		{headingId}
		ariaLabel={`Copiar link a ${title}`}
		class="p-3 text-lg font-bold"
	>
		{title}
	</AnchoredHeading>
	{#if description}
		<p class="px-3 pb-3">{description}</p>
	{/if}
	{@render children()}
</section>
