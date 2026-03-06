<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type Props = {
		question: string;
		answerId: string;
		isExpanded: boolean;
		onToggle: () => void;
		isFirst?: boolean;
		isLast?: boolean;
		children?: Snippet;
	};

	let {
		question,
		answerId,
		isExpanded,
		onToggle,
		isFirst = false,
		isLast = false,
		children
	}: Props = $props();
</script>

<div class={[
	isFirst && 'rounded-t-lg',
	isLast && 'rounded-b-lg',
	'bg-gray-50 dark:bg-gray-100'
]}>
	<button
		type="button"
		onclick={onToggle}
		aria-expanded={isExpanded}
		aria-controls={answerId}
		class="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left font-semibold text-gray-900 dark:text-gray-900"
	>
		<span>{question}</span>
		<svg
			class={[
				isExpanded && 'rotate-180',
				'h-5 w-5 flex-none stroke-gray-500 transition-transform duration-200 dark:stroke-gray-600'
			]}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</button>
	{#if isExpanded}
		<div
			id={answerId}
			class="px-4 pb-4 text-gray-700 dark:text-gray-700"
			transition:slide={{ duration: 200 }}
		>
			{@render children?.()}
		</div>
	{/if}
</div>
