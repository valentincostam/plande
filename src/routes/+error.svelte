<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from '$lib/link.svelte';
</script>

<svelte:head>
	<title>Planes de Estudios Interactivos en Plande</title>
</svelte:head>

<main
	class="error-page relative flex min-h-dvh flex-col justify-center bg-[rgb(252_254_252)] dark:bg-gray-50"
>
	<header class="absolute top-0 w-full p-9 text-center">
		<Link href={resolve('/')} class="text-sm">Plande</Link>
	</header>

	<section class="grid gap-9 text-center">
		<div>
			<h1 class="text-2xl font-bold">¿Te perdiste?</h1>
			<p class=" text-gray-500">Nos pasa a todos</p>
		</div>
		<p>
			<Link href={resolve('/')}>Ir a la página principal</Link>
		</p>
	</section>
	<img
		class="absolute bottom-0 left-1/2 max-h-[25dvh] -translate-x-1/2"
		src="/travolta.gif"
		alt="Travolta lost"
	/>
</main>
