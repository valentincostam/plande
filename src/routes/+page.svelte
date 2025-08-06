<script lang="ts">
	import ChatMessage from './chat-message.svelte';
</script>

<svelte:head>
	<title>Plande</title>
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<h1 class="text-2xl font-bold">Plande</h1>
		<p class="text-sm text-gray-500">Planes de Estudios Interactivos</p>
	</header>
	<main class="grid gap-9">
		<section class="relative bg-[#F5F1EB] p-6 md:rounded-md">
			<div
				class="bg-size-[412.5px 749.25px] absolute inset-0 h-full w-full bg-[url(/wa-bg.png)] opacity-10"
			></div>
			<div class="relative z-10 grid gap-3">
				<ChatMessage author="Mamá" time="10:17" color="pink">como venis con la facu?</ChatMessage>

				<ChatMessage author="Compañero" time="12:14" color="blue">
					che que podes cursar el cuatri que viene?
				</ChatMessage>

				<ChatMessage author="Amigo" time="19:28" color="green">
					cuanto te falta para recibirte?
				</ChatMessage>

				<ChatMessage author="Vos" time="19:31" color="blue" isOutgoing>
					<a href="/utn-frcu-isi?estado=a34ce3" class="text-[#1B8755] underline underline-offset-2"
						>https://plande.app/utn-frcu-isi?estado=a34ce3</a
					>
				</ChatMessage>
			</div>
		</section>
		<section class="grid gap-3 px-6">
			<h2 class="text-lg font-bold">Planes de Estudios</h2>
			<ul class="grid gap-3">
				<li class="grid gap-1">
					<span class="font-bold">UTN FRCU</span>
					<ul class="list-disc pl-5">
						<li>
							<a href="/utn-frcu-isi" class="text-blue-800 underline-offset-2 hover:underline"
								>Ingeniería en Sistemas de Información</a
							>
						</li>
					</ul>
				</li>
				<li class="grid gap-1">
					<span class="font-bold">UCU FAU</span>
					<ul class="list-disc pl-5">
						<li>
							<a href="/ucu-fau-arq" class="text-blue-800 underline-offset-2 hover:underline"
								>Arquitectura</a
							>
						</li>
					</ul>
				</li>
			</ul>
		</section>
	</main>
</div>
