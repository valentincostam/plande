<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Select from './ui/select.svelte';

	let {
		subject,
		reviewRevision,
		discussionRevision,
		units,
		sources,
		requestId,
		parentId
	}: {
		subject: string;
		reviewRevision: number;
		discussionRevision: number;
		units: { key: string; label: string }[];
		sources: { id: string; label: string }[];
		requestId: string;
		parentId?: string;
	} = $props();
	const id = $props.id();
	let kind = $state('comment');
	let unitKey = $state('');
	let sourceId = $state('');
	const kindOptions = [
		{ value: 'comment', label: 'Comentario' },
		{ value: 'objection', label: 'Objeción' }
	];
	const unitOptions = $derived(units.map((unit) => ({ value: unit.key, label: unit.label })));
	const sourceOptions = $derived(
		sources.map((source) => ({ value: source.id, label: source.label }))
	);
</script>

<form
	method="POST"
	action="?/discuss"
	use:enhance
	aria-label={parentId ? 'Responder aporte' : 'Nuevo aporte'}
	class="grid gap-3 rounded border border-gray-300 p-3"
>
	<p class="text-sm text-gray-600">
		Los aportes son públicos. No incluyas datos personales. Comentar no edita el plan ni te
		convierte en coautor.
	</p>
	{#if parentId}
		<input type="hidden" name="kind" value="comment" />
	{:else}
		<label class="grid gap-1" for={`${id}-kind`}>
			<span>Tipo de aporte</span>
			<Select id={`${id}-kind`} name="kind" bind:value={kind} options={kindOptions} required />
		</label>
	{/if}
	<label class="grid gap-1" for={`${id}-unit`}>
		<span>Contexto</span>
		<Select
			id={`${id}-unit`}
			name="unitKey"
			bind:value={unitKey}
			options={unitOptions}
			placeholder="Elegí contenido"
			required
		/>
	</label>
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
			ariaDescribedby={`${id}-source-help`}
			required
		/>
	</label>
	<p id={`${id}-source-help`} class="text-sm text-gray-600">
		La fuente es obligatoria para documentar el aporte.
	</p>
	<label class="grid gap-1" for={`${id}-locator`}>
		<span>Página o sección, opcional</span>
		<Input id={`${id}-locator`} name="locator" maxlength={1000} />
	</label>
	<input type="hidden" name="subject" value={subject} />
	<input type="hidden" name="reviewRevision" value={reviewRevision} />
	<input type="hidden" name="discussionRevision" value={discussionRevision} />
	<input type="hidden" name="requestId" value={requestId} />
	<input type="hidden" name="parentId" value={parentId ?? ''} />
	<Button type="submit">Publicar aporte</Button>
</form>
