<script lang="ts">
	import { fade } from 'svelte/transition';
	import ShareIcon from './share-icon.svelte';

	type Props = {
		title: string;
	};

	let props: Props = $props();

	let isCopied = $state(false);

	const copyLink = async () => {
		if (isCopied) return;

		if (!navigator.clipboard) return;

		await navigator.clipboard.writeText(window.location.href);

		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};

	const onclick = () => {
		if (!navigator.share) {
			copyLink();
			return;
		}

		navigator.share({
			title: props.title,
			url: window.location.href
		});
	};
</script>

<button
	{onclick}
	class="relative mx-auto flex items-center justify-center gap-3 overflow-hidden rounded-md bg-blue-700 px-6 py-3 text-left text-white transition select-none active:scale-95 active:bg-blue-800"
>
	<ShareIcon class="w-5 shrink-0" />

	<span class="flex flex-col">
		<span>Compartir plan de estudios</span>
		<span class="text-xs font-light text-blue-200">y el estado de las materias</span>
	</span>

	{#if isCopied}
		<span
			class="absolute inset-0 flex items-center justify-center bg-blue-700"
			transition:fade={{ duration: 100 }}>¡Link copiado!</span
		>
	{/if}
</button>
