<script lang="ts">
	import CopyIcon from './copy-icon.svelte';
	import CheckIcon from './check-icon.svelte';

	let isCopied = $state(false);

	const onclick = async () => {
		if (isCopied) return;
		if (!navigator.clipboard) return;

		const urlWithoutHash =
			window.location.origin + window.location.pathname + window.location.search;
		await navigator.clipboard.writeText(urlWithoutHash);

		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};
</script>

<button
	{onclick}
	class="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-md bg-transparent px-6 py-3 text-blue-800 transition-colors select-none hover:bg-blue-50 active:scale-95 dark:text-blue-600"
>
	{#if isCopied}
		<CheckIcon class="w-4 shrink-0" />
	{:else}
		<CopyIcon class="w-4 shrink-0" />
	{/if}
	<span class="text-sm">
		{isCopied ? 'Copiado' : 'Copiar link para compartir'}
	</span>
</button>
