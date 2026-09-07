<script lang="ts">
	import { resolve } from '$app/paths';
	interface Props {
		auth: { subject: string } | null;
		enabled: boolean;
		authUnavailable: boolean;
		signOutFailed: boolean;
	}

	let { auth, enabled, authUnavailable, signOutFailed }: Props = $props();
</script>

{#if enabled && auth}
	<form method="POST" action="/auth/sign-out">
		<button class="btn btn-ghost" type="submit">Cerrar sesión</button>
	</form>
{:else if enabled}
	<a class="btn btn-ghost" href={resolve('/auth/sign-in')}>Iniciar sesión</a>
{/if}

{#if enabled && authUnavailable}
	<p class="text-sm" role="status">
		No pudimos validar tu sesión. Podés seguir usando tu progreso local.
	</p>
{/if}

{#if enabled && signOutFailed}
	<p class="alert alert-error mt-2" role="alert">No se pudo cerrar sesión. Intentá de nuevo.</p>
{/if}
