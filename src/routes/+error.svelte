<script lang="ts">
	import Footer from './footer.svelte';
</script>

<svelte:head>
	<title>Planes de Estudios Interactivos en Plande</title>
</svelte:head>

<main class="relative flex min-h-dvh flex-col justify-center">
	<header class="absolute top-0 w-full p-9 text-center">
		<a
			href="/"
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
				href="/"
				class=" text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
				>Ir a la página principal</a
			>
		</p>
	</section>
	<img
		class="absolute bottom-0 left-1/2 -z-10 max-h-[25dvh] -translate-x-1/2"
		src="/travolta.gif"
		alt="Travolta lost"
	/>
</main>

<style>
	:global(body) {
		background-color: rgb(252 254 252);
	}
</style>
