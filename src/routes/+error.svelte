<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Planes de Estudios Interactivos en Plande</title>
</svelte:head>

<main class="error-page relative flex min-h-dvh flex-col justify-center bg-[rgb(252_254_252)]">
	<header class="absolute top-0 w-full p-9 text-center">
		<a
			href={resolve('/')}
			class="text-sm text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>Plande</a
		>
	</header>

	<section class="grid gap-9 text-center">
		<div>
			<h1 class="text-2xl font-bold">¿Te perdiste?</h1>
			<p class=" text-gray-500">Nos pasa a todos</p>
		</div>
		<p>
			<a
				href={resolve('/')}
				class=" text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
				>Ir a la página principal</a
			>
		</p>
	</section>
	<img
		class="absolute bottom-0 left-1/2 max-h-[25dvh] -translate-x-1/2"
		src="/travolta.gif"
		alt="Travolta lost"
	/>
</main>
