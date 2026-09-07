<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Iniciar sesión | Plande</title>
</svelte:head>

<main class="mx-auto max-w-md px-6 py-16">
	<h1 class="text-3xl font-bold">Iniciar sesión</h1>
	<p class="mt-3">Usá tu cuenta de Google para guardar tu progreso y colaborar.</p>

	<form method="POST" action="?/google" class="mt-8">
		<button class="btn btn-primary w-full" type="submit">Continuar con Google</button>
	</form>

	{#if form?.error}
		<p class="alert alert-error mt-4" role="alert">{form.error}</p>
	{/if}
	{#if data.callbackFailed}
		<p class="alert alert-error mt-4" role="alert">
			No se pudo completar el inicio de sesión. Intentá de nuevo.
		</p>
	{/if}

	<p class="mt-6 text-sm">
		Podés seguir consultando planes y registrando progreso local sin iniciar sesión.
	</p>
</main>
