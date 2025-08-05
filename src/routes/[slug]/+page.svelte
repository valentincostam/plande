<script lang="ts">
	import { createCourses } from '$lib/course.svelte';
	import type { PageProps } from './$types';
	import Year from './year.svelte';
	import { createYears } from '$lib/year.svelte';
	import { goto } from '$app/navigation';
	import StrictModeSwitch from './strict-mode-switch.svelte';
	import Stats from './stats.svelte';
	import { createUrlSearchParams } from '$lib/url-state-parameter';
	import ShareButton from './share-button.svelte';
	import { marked } from 'marked';

	let { data }: PageProps = $props();

	let isStrictModeEnabled = $state(data.isStrictModeEnabled);

	const courses = createCourses(data.courses, data.coursesStates, () => isStrictModeEnabled);

	$effect(() => {
		const coursesStates = courses.map((course) => course.state);
		const urlSearchParams = createUrlSearchParams(coursesStates, isStrictModeEnabled);

		const url = urlSearchParams.size > 0 ? `?${urlSearchParams}` : '';

		goto(url, { replaceState: true, noScroll: true, keepFocus: true });
	});

	const years = createYears(data.years, courses);

	const title = `Plan de estudios de ${data.degree} de ${data.college} en Plande`;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<p>
			{data.college} · {data.studyProgram}
		</p>
		<h1 class="text-2xl font-bold">{data.degree}</h1>
	</header>

	<main class="grid gap-9">
		{#each years as year}
			<Year {year} />
		{/each}

		<section class="px-3 md:px-0">
			<StrictModeSwitch bind:value={isStrictModeEnabled} />
		</section>

		<section class="px-3 md:px-0">
			<ShareButton {title} />
		</section>

		<section>
			<h3 class="px-6 py-3 text-lg font-bold">Estadísticas</h3>
			<Stats {courses} {years} requiredElectiveHours={data.requiredElectiveHours} />
		</section>

		{#if data.notes}
			<section class="px-3 md:px-0">
				<h3 class="p-3 text-lg font-bold">Notas</h3>
				<ul class="grid list-disc gap-3 px-9">
					{#each data.notes as note}
						<li>
							{@html marked(note.text)}
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if data.sources}
			<section class="px-3 md:px-0">
				<h3 class="p-3 text-lg font-bold">Fuentes</h3>
				<ul class="grid list-disc gap-3 px-9">
					{#each data.sources as source}
						<li>
							<a
								class="text-blue-800 underline-offset-2 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
								href={source.href}
							>
								{source.label}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section class="px-3 md:px-0">
			<div class="grid gap-3 rounded-md bg-gray-100 p-5 text-xs text-gray-600">
				<p>
					<strong>Plande podría tener errores o información incompleta</strong>. No tomen decisiones
					cruciales sobre sus estudios basándose únicamente en la información proporcionada aquí.
					Recuerden consultar a sus asesores académicos o fuentes oficiales de la {data.college}
					para obtener orientación precisa y actualizada.
				</p>
				<p>
					Esta aplicación es una iniciativa independiente y no está afiliada ni respaldada por la
					universidad. Cualquier información proporcionada aquí es resultado de esfuerzos
					individuales y no representa oficialmente a la institución educativa.
				</p>
			</div>
		</section>
	</main>

	<footer class="grid gap-6 px-6">
		<p class="text-center text-sm">
			Por comentarios, sugerencias o errores,
			<a
				href="mailto:valentincostam+plande@gmail.com"
				class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>
				escribime
			</a>.
		</p>
		<p class="text-center text-sm">
			<a
				href="/"
				class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
				>Plande</a
			>
			· Creado por
			<a
				href="https://valentincosta.com"
				class="whitespace-nowrap text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>
				Valentín Costa
			</a>
		</p>
	</footer>
</div>
