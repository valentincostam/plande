<script lang="ts">
	import type { Snippet } from 'svelte';
	import LinkIcon from './link-icon.svelte';
	import CheckIcon from './check-icon.svelte';

	type Props = {
		id: string;
		title: string;
		description?: string;
		children: Snippet;
	};

	let { id, title, description, children }: Props = $props();

	const headingId = $derived(`${id}-heading`);

	let copied = $state(false);

	function onclick(event: MouseEvent) {
		event.preventDefault();
		const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${id}`;
		navigator.clipboard.writeText(url);
		window.history.pushState(null, '', `${window.location.search}#${id}`);

		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<section aria-labelledby={headingId} {id}>
	<h2 id={headingId} class="flex items-center gap-2 p-3 text-lg font-bold">
		{title}
		<a
			href="#{id}"
			{onclick}
			class="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-600"
			aria-label="Copiar enlace a {title}"
		>
			{#if copied}
				<CheckIcon class="size-4" />
				<span class="text-xs font-normal">Link copiado</span>
			{:else}
				<LinkIcon class="size-4" />
			{/if}
		</a>
	</h2>
	{#if description}
		<p class="px-3 pb-3">{description}</p>
	{/if}
	{@render children()}
</section>
