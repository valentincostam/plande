<script lang="ts">
	import type { Snippet } from 'svelte';

	import MessageBubble from './message-bubble.svelte';

	type Props = {
		children: Snippet;
		author: string;
		time: string;
		color: 'pink' | 'blue' | 'green' | 'purple';
		isOutgoing?: boolean;
	};

	let { author, time, color, isOutgoing = false, children }: Props = $props();

	const colorClasses = {
		pink: { avatar: 'bg-rose-400', name: 'text-rose-500' },
		blue: { avatar: 'bg-sky-400', name: 'text-sky-500' },
		green: { avatar: 'bg-emerald-400', name: 'text-emerald-500' },
		purple: { avatar: 'bg-purple-400', name: 'text-purple-500' }
	};

	const initial = author.charAt(0).toUpperCase();
</script>

{#if isOutgoing}
	<div class="flex justify-end">
		<MessageBubble {time} {isOutgoing}>
			{@render children()}
		</MessageBubble>
	</div>
{:else}
	<div class="flex gap-2">
		<div
			class={[
				colorClasses[color].avatar,
				'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white'
			]}
		>
			{initial}
		</div>
		<MessageBubble {time} {isOutgoing}>
			<span class={[colorClasses[color].name, 'block text-[12.8px] leading-[22px] font-semibold']}>
				{author}
			</span>
			{@render children()}
		</MessageBubble>
	</div>
{/if}
