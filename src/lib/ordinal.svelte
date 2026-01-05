<script lang="ts">
	import { getOrdinalSuperscript, getOrdinalWord } from '$lib/year.svelte';

	type Props = {
		number: number;
		noun: string;
	};

	let { number, noun }: Props = $props();

	const superscript = $derived(getOrdinalSuperscript(number));
	const ariaLabel = $derived(`${getOrdinalWord(number)} ${noun}`);
</script>

<span aria-label={ariaLabel}>{number}<sup aria-hidden="true">{superscript}</sup> {noun}</span>
