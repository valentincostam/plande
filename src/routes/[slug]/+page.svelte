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

		<section class="px-3 md:px-0">
			<h3 class="p-3 text-lg font-bold">Estadísticas</h3>
			<Stats {courses} {years} />
		</section>

		<section class="px-3 md:px-0">
			<h3 class="p-3 text-lg font-bold">Notas importantes</h3>
			<ul class="grid list-disc gap-3 px-9">
				<li>
					Para iniciar y acreditar la <strong>Práctica Profesional Supervisada</strong> (200 horas),
					es necesario cumplir con los requisitos para cursar <em>Proyecto Final</em>.
				</li>
				<li>
					En Plande, la <strong>Práctica Profesional Supervisada</strong> tiene una carga horaria de
					6 horas semanales. Este número es arbitrario, orientativo, obtenido de dividir las 200 horas
					totales exigidas por la materia entre 32 semanas (año académico). La carga horaria real varía
					de acuerdo a cómo realice la práctica cada estudiante.
				</li>
				<li>
					Para rendir <strong>Proyecto Final</strong>, es necesario aprobar todas las asignaturas
					del Plan de Estudios.
				</li>
			</ul>
		</section>

		<section class="px-3 md:px-0">
			<h3 class="p-3 text-lg font-bold">Fuentes</h3>
			<ul class="grid list-disc gap-3 px-9">
				<li>
					<a
						class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
						href="https://www.frcu.utn.edu.ar/images/recursos/Grado/Grado/2023/PLAN-INGENIERIA-SISTEMAS.pdf"
					>
						Plan de Estudios 2023
					</a>
				</li>
				<li>
					<a
						class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
						href="https://www.frcu.utn.edu.ar/images/VidaEducativa/PlanCarrerasIngenieria/8.pdf"
					>
						Ordenanza N° 1877 - Diseño Curricular
					</a>
				</li>
				<li>
					<a
						class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
						href="https://www.frcu.utn.edu.ar/images/VidaEducativa/PlanCarrerasIngenieria/9.pdf"
					>
						Ordenanza N° 1878 - Régimen de Correlativas y Equivalencias
					</a>
				</li>
				<li>
					<a
						class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
						href="https://www.frcu.utn.edu.ar/images/VidaEducativa/PlanCarrerasIngenieria/10.pdf"
					>
						Resolución Nº 356/2022 CD - Implementación Plan de Transición
					</a>
				</li>
			</ul>
		</section>

		<section class="px-3 md:px-0">
			<div class="grid gap-3 rounded-md bg-gray-100 p-5 text-xs text-gray-600">
				<p>
					<strong
						>Plande está en su primera versión y podría tener errores o información incompleta</strong
					>. No tomen decisiones cruciales sobre sus estudios basándose únicamente en la información
					proporcionada aquí. Recuerden consultar a sus asesores académicos o fuentes oficiales de
					la {data.college}
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
			Por comentarios, sugerencias o reportes de errores,
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
				class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>
				Valentín Costa
			</a>
		</p>
	</footer>
</div>
