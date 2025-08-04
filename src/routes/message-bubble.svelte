<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		isOutgoing?: boolean;
		time: string;
	};

	let { time, isOutgoing = false, children }: Props = $props();

	const bgColor = isOutgoing ? 'bg-[#D9FDD3]' : 'bg-white';
	const triangleColor = isOutgoing ? 'text-[#D9FDD3]' : 'text-white';
	const trianglePosition = isOutgoing ? '-right-2' : '-left-2';
</script>

<div
	class={[
		'relative max-w-xs rounded-[7.5px] rounded-tl-none px-2 pt-1.5 pb-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]',
		bgColor
	]}
>
	<span class={['absolute top-0 z-10 h-2 w-2 rounded-full', trianglePosition, triangleColor]}
		><svg
			viewBox="0 0 8 13"
			height="13"
			width="8"
			preserveAspectRatio="xMidYMid meet"
			class=""
			version="1.1"
			x="0px"
			y="0px"
			enable-background="new 0 0 8 13"
			transform={isOutgoing ? 'scale(-1, 1)' : undefined}
			><path
				opacity="0.13"
				fill="#0000000"
				d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
			></path><path
				fill="currentColor"
				d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
			></path></svg
		></span
	>
	<p class="text-sm">
		{@render children()}
		<span class="invisible text-[11px]">{time}</span>
	</p>
	<p class="absolute right-2 bottom-1 text-[11px] text-[rgba(0,0,0,0.6)]">{time}</p>
</div>
