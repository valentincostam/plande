<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { untrack } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { proposalFormSchema } from './proposal-form';
	import Select from './ui/select.svelte';

	let {
		form,
		error,
		versions = []
	}: {
		form: SuperValidated<Infer<typeof proposalFormSchema>>;
		error?: string;
		versions?: { snapshotId: string; publishedAt: string | null; isCurrent: boolean }[];
	} = $props();
	const id = $props.id();
	const argumentErrorId = `${id}-argument-error`;
	const {
		form: proposal,
		errors,
		constraints,
		submitting,
		enhance
	} = superForm(
		untrack(() => form),
		{ validators: zod4Client(proposalFormSchema) }
	);
	const versionOptions = $derived(
		versions.map((version) => ({
			value: version.snapshotId,
			label: version.isCurrent
				? 'Publicación vigente'
				: version.publishedAt
					? `Versión del ${new Date(version.publishedAt).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}`
					: 'Versión inicial'
		}))
	);
</script>

<form
	method="POST"
	action="?/propose"
	use:enhance
	class="grid gap-3"
	aria-label="Proponer corrección"
>
	<p class="text-sm text-gray-600">
		La publicación actual seguirá disponible; podrás agregar fuentes y editar la propuesta.
	</p>
	{#if versions.length > 1}
		<label class="grid gap-1" for={`${id}-version`}>
			<span>Partir de</span>
			<Select
				id={`${id}-version`}
				name="sourceSnapshotId"
				bind:value={$proposal.sourceSnapshotId}
				options={versionOptions}
			/>
		</label>
		{#if $proposal.sourceSnapshotId !== $proposal.baseSnapshotId}
			<p class="text-sm">
				Restaurar una versión anterior también requiere revisión. No borra el historial ni el
				progreso.
			</p>
		{/if}
	{:else}
		<input type="hidden" name="sourceSnapshotId" value={$proposal.sourceSnapshotId} />
	{/if}
	<label class="grid gap-1" for={`${id}-argument`}>
		<span>Argumento</span>
		<Textarea
			id={`${id}-argument`}
			name="argument"
			maxlength={8000}
			bind:value={$proposal.argument}
			aria-invalid={$errors.argument ? 'true' : undefined}
			aria-describedby={$errors.argument ? argumentErrorId : undefined}
			{...$constraints.argument}
		/>
	</label>
	{#if $errors.argument}<p id={argumentErrorId} class="text-sm text-red-700">
			{$errors.argument[0]}
		</p>{/if}
	<input type="hidden" name="subject" value={$proposal.subject} />
	<input type="hidden" name="requestId" value={$proposal.requestId} />
	<input type="hidden" name="baseSnapshotId" value={$proposal.baseSnapshotId} />
	<Button type="submit" disabled={$submitting}>Proponer corrección</Button>
	{#if error}<p role="alert" class="text-sm text-red-700">{error}</p>{/if}
</form>
