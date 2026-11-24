<script lang="ts">
	import Button from './ui/button.svelte';

	let { url }: { url: string } = $props();
	let message = $state('');
	let showFallback = $state(false);
	const invitation = $derived(
		`¿Podés revisar este plan completo contra las fuentes? Las cuentas nuevas son bienvenidas. Este enlace no concede permisos.\n${url}`
	);

	async function copyInvitation() {
		try {
			await navigator.clipboard.writeText(invitation);
			message = 'Invitación copiada.';
			showFallback = false;
		} catch {
			message = 'No pudimos copiarla. Seleccioná y copiá el texto siguiente.';
			showFallback = true;
		}
	}
</script>

<section
	class="grid gap-2 rounded border border-gray-300 p-3"
	aria-labelledby="review-invitation-title"
>
	<h2 id="review-invitation-title" class="font-medium">Revisión con compañeros</h2>
	<p class="text-sm text-gray-600">
		Invitá a dos compañeros a revisar el plan completo contra las fuentes. Las cuentas nuevas son
		bienvenidas. El enlace no concede permisos.
	</p>
	<div>
		<Button type="button" variant="outline" onclick={copyInvitation}>Copiar invitación</Button>
	</div>
	{#if message}<p role="status" class="text-sm text-gray-600">{message}</p>{/if}
	{#if showFallback}
		<textarea
			class="min-h-28 w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
			readonly
			value={invitation}
			aria-label="Invitación para copiar"
		></textarea>
	{/if}
</section>
