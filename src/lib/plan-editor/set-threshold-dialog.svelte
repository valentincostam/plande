<script lang="ts">
	import type { RequirementExpr } from '$lib/study-plan-data';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { DraftPlanContent } from './draft-plan-content';
	import SetThresholdEditor from './set-threshold-editor.svelte';
	let {
		open = $bindable(false),
		content,
		ownerId,
		expression,
		opener,
		onconfirm
	}: {
		open?: boolean;
		content: DraftPlanContent;
		ownerId?: string;
		expression?: Extract<RequirementExpr, { type: 'count' | 'percent' | 'sum' }>;
		opener?: HTMLElement;
		onconfirm: (
			expression: Extract<RequirementExpr, { type: 'count' | 'percent' | 'sum' }>
		) => void;
	} = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="plan-editor max-h-[85dvh] overflow-y-auto overscroll-contain sm:max-w-lg"
		showCloseButton={false}
		onCloseAutoFocus={(event) => {
			if (!opener?.isConnected) return;
			event.preventDefault();
			opener.focus();
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Conjunto y objetivo</Dialog.Title>
			<Dialog.Description>Elegí las materias o hitos, el estado y el objetivo.</Dialog.Description>
		</Dialog.Header>
		{#if open}
			<SetThresholdEditor
				{content}
				{ownerId}
				{expression}
				onconfirm={(next) => {
					onconfirm(next);
					open = false;
				}}
				oncancel={() => (open = false)}
			/>
		{/if}
	</Dialog.Content>
</Dialog.Root>
