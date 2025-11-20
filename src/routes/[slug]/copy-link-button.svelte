<script lang="ts">
	import CopyIcon from './copy-icon.svelte';

	let isCopied = $state(false);

	const onclick = async () => {
		if (isCopied) return;
		if (!navigator.clipboard) return;

		await navigator.clipboard.writeText(window.location.href);

		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};
</script>

<button
	{onclick}
	class="mx-auto flex items-center justify-center gap-2 rounded-md bg-transparent px-6 py-3 text-blue-700 transition select-none hover:bg-blue-50 active:scale-95"
>
	<CopyIcon class="w-4 shrink-0" />
	<span class="text-sm">
		{isCopied ? 'Copiado' : 'Copiar link para compartir'}
	</span>
</button>
