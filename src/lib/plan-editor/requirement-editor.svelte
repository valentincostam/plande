<script lang="ts">
	import type { DraftPlanContent } from './draft-plan-content';
	import { readRequirementField, replaceRequirementField } from './requirement-field';
	import RequirementValueEditor from './requirement-value-editor.svelte';
	let {
		content,
		itemId,
		scope,
		oncontentchange
	}: {
		content: DraftPlanContent;
		itemId: string;
		scope: 'enroll' | 'complete';
		oncontentchange: (content: DraftPlanContent) => void;
	} = $props();
	const value = $derived(readRequirementField($state.snapshot(content), itemId, scope));
</script>

<RequirementValueEditor
	{content}
	ownerId={itemId}
	legend={scope === 'enroll' ? 'Para cursar' : 'Para completar'}
	{value}
	onvaluechange={(next) =>
		oncontentchange(replaceRequirementField($state.snapshot(content), itemId, scope, next))}
/>
