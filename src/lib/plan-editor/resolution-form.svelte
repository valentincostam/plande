<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Select from './ui/select.svelte';

	type Status = 'pending' | 'confirmed' | 'dismissed' | 'corrected';
	type Action = 'confirm' | 'dismiss' | 'correct' | 'reopen';

	let {
		subject,
		requestId,
		reviewRevision,
		discussionRevision,
		discussionId,
		status,
		sources
	}: {
		subject: string;
		requestId: string;
		reviewRevision: number;
		discussionRevision: number;
		discussionId: string;
		status: Status;
		sources: { id: string; label: string }[];
	} = $props();
	const id = $props.id();
	let pendingAction = $state<'confirm' | 'dismiss'>('confirm');
	let sourceId = $state('');
	const actionOptions = [
		{ value: 'confirm', label: 'Error confirmado' },
		{ value: 'dismiss', label: 'Objeción descartada' }
	];
	const sourceOptions = $derived(
		sources.map((source) => ({ value: source.id, label: source.label }))
	);
	const action = $derived<Action>(
		status === 'pending' ? pendingAction : status === 'confirmed' ? 'correct' : 'reopen'
	);
</script>

<form
	method="POST"
	action="?/resolveObjection"
	use:enhance
	aria-label="Resolución de objeción"
	class="grid gap-3 rounded border border-gray-300 p-3"
>
	<p class="text-sm text-gray-600">
		Las resoluciones son públicas. No incluyas datos personales. Terceros ajenos al aporte deben
		revisar el contenido afectado antes de concluir. Ningún check es automático.
	</p>
	{#if status === 'pending'}
		<label class="grid gap-1" for={`${id}-action`}>
			<span>Resolución</span>
			<Select
				id={`${id}-action`}
				name="action"
				bind:value={pendingAction}
				options={actionOptions}
			/>
		</label>
	{:else if status === 'confirmed'}
		<input type="hidden" name="action" value="correct" />
	{:else}
		<input type="hidden" name="action" value="reopen" />
	{/if}
	<label class="grid gap-1" for={`${id}-argument`}>
		<span>Argumento</span>
		<textarea
			id={`${id}-argument`}
			class="min-h-28 w-full rounded border border-gray-300 bg-transparent p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
			name="argument"
			maxlength={8000}
			required
		></textarea>
	</label>
	<label class="grid gap-1" for={`${id}-source`}>
		<span>Fuente</span>
		<Select
			id={`${id}-source`}
			name="sourceId"
			bind:value={sourceId}
			options={sourceOptions}
			placeholder="Elegí una fuente"
			required
		/>
	</label>
	<label class="grid gap-1" for={`${id}-locator`}>
		<span>Página o sección, opcional</span>
		<Input id={`${id}-locator`} name="locator" maxlength={1000} />
	</label>
	{#if action === 'reopen'}
		<label class="grid gap-1" for={`${id}-evidence`}>
			<span>Nueva evidencia</span>
			<textarea
				id={`${id}-evidence`}
				class="min-h-24 w-full rounded border border-gray-300 bg-transparent p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
				name="newEvidence"
				maxlength={8000}
				required
			></textarea>
		</label>
	{:else}
		<input type="hidden" name="newEvidence" value="" />
	{/if}
	<input type="hidden" name="subject" value={subject} />
	<input type="hidden" name="requestId" value={requestId} />
	<input type="hidden" name="reviewRevision" value={reviewRevision} />
	<input type="hidden" name="discussionRevision" value={discussionRevision} />
	<input type="hidden" name="discussionId" value={discussionId} />
	<Button type="submit"
		>{action === 'correct'
			? 'Comprobar corrección'
			: action === 'reopen'
				? 'Reabrir objeción'
				: 'Resolver objeción'}</Button
	>
</form>
