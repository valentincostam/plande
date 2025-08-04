<script lang="ts">
	interface Props {
		author: string;
		message: string;
		time: string;
		color: 'pink' | 'blue' | 'green' | 'purple';
		isOutgoing?: boolean;
	}

	let { author, message, time, color, isOutgoing = false }: Props = $props();

	const colorClasses = {
		pink: { avatar: 'bg-rose-400', name: 'text-rose-500' },
		blue: { avatar: 'bg-sky-400', name: 'text-sky-500' },
		green: { avatar: 'bg-emerald-400', name: 'text-emerald-500' },
		purple: { avatar: 'bg-purple-400', name: 'text-purple-500' }
	};

	const initial = author.charAt(0).toUpperCase();
</script>

{#if isOutgoing}
	<!-- Outgoing message (right aligned) -->
	<div class="flex justify-end">
		<div
			class="relative rounded-[7.5px] rounded-tr-none px-2 pt-1.5 pb-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
			style="background-color: #D9FDD3"
		>
			<span class="absolute top-0 -right-2 z-10 h-2 w-2 rounded-full"
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
					transform="scale(-1, 1)"
					><title>tail-out</title><path
						opacity="0.13"
						fill="#0000000"
						d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
					></path><path
						fill="#D9FDD3"
						d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
					></path></svg
				></span
			>
			<p class="text-sm">
				<a href={message} class="text-[#1B8755] underline underline-offset-2">{message}</a>
				<span class="invisible text-[11px]">{time}</span>
			</p>
			<p class="absolute right-2 bottom-1 text-[11px] text-gray-600">{time}</p>
		</div>
	</div>
{:else}
	<!-- Incoming message (left aligned with avatar) -->
	<div class="flex items-start gap-2">
		<div
			class={[
				colorClasses[color].avatar,
				'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white'
			]}
		>
			{initial}
		</div>
		<div
			class="relative max-w-xs rounded-[7.5px] rounded-tl-none bg-white px-2 pt-1.5 pb-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
		>
			<span class="absolute top-0 -left-2 z-10 h-2 w-2 rounded-full text-white"
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
					><title>tail-in</title><path
						opacity="0.13"
						fill="#0000000"
						d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
					></path><path
						fill="currentColor"
						d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
					></path></svg
				></span
			>
			<p class={[colorClasses[color].name, 'text-[12.8px] leading-[22px] font-semibold']}>
				{author}
			</p>
			<p class="text-sm">{message} <span class="invisible text-[11px]">{time}</span></p>
			<p class="absolute right-2 bottom-1 text-[11px] text-[rgba(0,0,0,0.6)]">{time}</p>
		</div>
	</div>
{/if}
