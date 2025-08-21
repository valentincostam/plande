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
	import { findRedundantRequirements } from '$lib/raw-course';
	import StatePill from './state-pill.svelte';
	import { courseStates, encodeCoursesStates, decodeCoursesStates } from '$lib/course-state';
	import Charts from './charts.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	const initialCoursesStates = data.coursesStates;
	const initialIsStrictModeEnabled = data.isStrictModeEnabled;

	let isStrictModeEnabled = $state(initialIsStrictModeEnabled);
	let isInitializing = $state(true);

	const courses = createCourses(data.courses, initialCoursesStates, () => isStrictModeEnabled);

	$effect(() => {
		if (isInitializing) return;

		const coursesStates = courses.map((course) => course.state);
		const urlSearchParams = createUrlSearchParams(coursesStates, isStrictModeEnabled);

		goto(`?${urlSearchParams}`, { replaceState: true, noScroll: true, keepFocus: true });

		if (!browser) return;

		const storageKey = `plande-${data.slug}`;
		const encodedStates = encodeCoursesStates(coursesStates);

		const storageData = {
			coursesStates: encodedStates,
			isStrictModeEnabled
		};

		localStorage.setItem(storageKey, JSON.stringify(storageData));
	});

	onMount(() => {
		if (!browser || initialCoursesStates.length > 0) {
			isInitializing = false;
			return;
		}

		const storageKey = `plande-${data.slug}`;
		const savedData = localStorage.getItem(storageKey);

		if (!savedData) {
			isInitializing = false;
			return;
		}

		try {
			const parsed = JSON.parse(savedData);
			const decodedStates = decodeCoursesStates(parsed.coursesStates);

			courses.forEach((course, index) => {
				if (decodedStates[index]) {
					course.state = decodedStates[index];
				}
			});

			if (parsed.isStrictModeEnabled !== undefined) {
				isStrictModeEnabled = parsed.isStrictModeEnabled;
			}
		} catch (error) {
			console.warn('Failed to parse saved course states:', error);
		} finally {
			isInitializing = false;
		}
	});

	const years = createYears(data.years, courses);

	const title = `Plan de estudios de ${data.degree} de ${data.college} en Plande`;

	const redundantRequirements = findRedundantRequirements(data.courses);
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<a
			href="/"
			class="text-sm leading-loose text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>Plande</a
		>
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
			<h3 class="p-3 text-lg font-bold">Estadísticas</h3>
			<div class="grid gap-3">
				<Charts {courses} {years} progress={data.progress} />
				<Stats {courses} {years} progress={data.progress} />
			</div>
		</section>

		{#if data.notes}
			<section>
				<h3 class="p-3 text-lg font-bold">Notas</h3>
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.notes as note}
						<li class="note">
							{@html marked(note.text)}
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		{#if data.sources}
			<section>
				<h3 class="p-3 text-lg font-bold">Fuentes</h3>
				<ol class="grid list-decimal gap-3 px-9">
					{#each data.sources as source}
						<li>
							<a
								class="text-blue-800 underline-offset-2 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
								href={source.url}
							>
								{source.label}
							</a>
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		<section>
			<h3 class="p-3 text-lg font-bold">Referencias</h3>
			<ol class="grid list-decimal gap-3 px-9">
				<li>
					Una materia está <StatePill state={courseStates.notTaken} class="text-sm" /> cuando aún no
					has asistido a sus clases.
				</li>
				<li>
					Una materia está <StatePill state={courseStates.inProgress} class="text-sm" /> cuando estás
					asistiendo a sus clases.
				</li>
				<li>
					Una materia está <StatePill state={courseStates.taken} class="text-sm" /> (o regular) cuando
					ya terminaste de asistir a sus clases pero aún debés rendir su examen final.
				</li>
				<li>
					Una materia está <StatePill state={courseStates.passed} class="text-sm" /> cuando ya la rendiste
					y aprobaste.
				</li>
				<li>
					Un año está <StatePill state={courseStates.notTaken} gender="masculine" class="text-sm" />
					si al menos una materia de ese año está <StatePill
						state={courseStates.notTaken}
						class="text-sm"
					/> y ninguna está <StatePill state={courseStates.inProgress} class="text-sm" />.
				</li>
				<li>
					Un año está <StatePill
						state={courseStates.inProgress}
						gender="masculine"
						class="text-sm"
					/>
					si al menos una materia de ese año está <StatePill
						state={courseStates.inProgress}
						class="text-sm"
					/>.
				</li>
				<li>
					Un año está <StatePill state={courseStates.taken} gender="masculine" class="text-sm" />
					si todas las materias de ese año están <StatePill
						state={courseStates.taken}
						class="text-sm"
						plural
					/> (o regulares).
				</li>
				<li>
					Un año está <StatePill state={courseStates.passed} gender="masculine" class="text-sm" />
					si todas las materias de ese año están <StatePill
						state={courseStates.passed}
						class="text-sm"
						plural
					/>.
				</li>
			</ol>
		</section>

		<section>
			<div class="grid gap-3 bg-gray-100 p-6 text-xs text-gray-600 md:rounded-md">
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

<ol class="grid list-decimal gap-3 px-9">
	{#each redundantRequirements as redundantRequirement}
		<li>{@html marked(redundantRequirement)}</li>
	{/each}
</ol>

<style>
	.note :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		display: grid;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		padding-top: 0.5rem;
	}
</style>
