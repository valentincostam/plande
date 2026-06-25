<script lang="ts">
	import type { RequirementView } from '$lib/study-plan-view';
	import CheckIcon from './check-icon.svelte';
	import CloseIcon from './close-icon.svelte';

	type Props = {
		requirement: RequirementView;
	};

	let { requirement }: Props = $props();
</script>

<li class="flex items-baseline gap-1 leading-relaxed">
	{#if requirement.isMet}
		<CheckIcon class="h-5 w-5 flex-none translate-y-1.5 stroke-green-700" />
	{:else}
		<CloseIcon class="h-5 w-5 flex-none translate-y-1 stroke-red-700" />
	{/if}

	<span class="font-noto">{requirement.label}</span>
	{#if requirement.description}
		<span class="font-noto text-gray-500">{requirement.description}</span>
	{/if}
</li>
