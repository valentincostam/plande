<script lang="ts">
	import { createCourses } from '$lib/course.svelte';
	import type { PageProps } from './$types';
	import Year from './year.svelte';
	import { createYears } from '$lib/year.svelte';
	import StrictModeSwitch from './strict-mode-switch.svelte';
	import ShowCodesSwitch from './show-codes-switch.svelte';
	import Stats from './stats.svelte';
	import { createUrlSearchParams, urlStateParameters } from '$lib/url-state-parameter';
	import { replaceState } from '$app/navigation';
	import ShareButton from './share-button.svelte';
	import { marked } from 'marked';
	import StatePill from './state-pill.svelte';
	import { courseStates, decodeCoursesStates } from '$lib/course-state';
	import Charts from './charts.svelte';
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import Footer from '../footer.svelte';
	import Disclaimer from '../disclaimer.svelte';
	import RedundantRequirements from './redundant-requirements.svelte';

	let { data }: PageProps = $props();

	const initialCoursesStates = data.coursesStates;
	const initialIsStrictModeEnabled = data.isStrictModeEnabled;
	const initialShowCodes = data.showCodes;

	let isStrictModeEnabled = $state(initialIsStrictModeEnabled);
	let showCodes = $state(initialShowCodes);
	let isInitializing = $state(true);

	const courses = createCourses(data.courses, initialCoursesStates, () => isStrictModeEnabled);

	let isRouterReady = $state(false);

	const storageKey = `plande-${data.slug}`;

	$effect(() => {
		if (isInitializing || !isRouterReady) return;

		const coursesStates = courses.map((course) => course.state);
		const urlSearchParams = createUrlSearchParams(coursesStates, isStrictModeEnabled, showCodes);

		if (!browser) return;

		tick().then(() => {
			replaceState(
				urlSearchParams.toString() ? `?${urlSearchParams}` : window.location.pathname,
				{}
			);

			const encodedStates = urlSearchParams.get(urlStateParameters.state);

			const storageData = {
				coursesStates: encodedStates,
				isStrictModeEnabled,
				showCodes
			};

			localStorage.setItem(storageKey, JSON.stringify(storageData));
		});
	});

	onMount(() => {
		isRouterReady = true;

		if (!browser || initialCoursesStates.length > 0) {
			isInitializing = false;
			return;
		}

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

			if (parsed.showCodes !== undefined) {
				showCodes = parsed.showCodes;
			}
		} catch (error) {
			console.warn('Failed to parse saved course states:', error);
		} finally {
			isInitializing = false;
		}
	});

	const years = createYears(data.years, courses);

	const title = `${data.degree} - ${data.college} | Plan de Estudios Interactivo`;
	const description = `Plan de estudios interactivo de ${data.degree} en ${data.college}. Visualiza materias, requisitos y tu progreso académico de forma clara y organizada.`;
	const url = `https://plande.app/${data.slug}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content="Plande" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<!-- Structured Data - Course & Organization -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: data.degree,
		description: description,
		provider: {
			'@type': 'CollegeOrUniversity',
			name: data.college
		},
		educationalLevel: 'Undergraduate',
		url: url,
		inLanguage: 'es'
	})}<\/script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Inicio',
				item: 'https://plande.app'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: data.degree,
				item: url
			}
		]
	})}<\/script>`}
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
			<Year {year} {showCodes} />
		{/each}

		<section class="grid gap-3 px-3 md:px-0">
			<StrictModeSwitch bind:value={isStrictModeEnabled} />
			<ShowCodesSwitch bind:value={showCodes} />
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
					Una materia está <StatePill state={courseStates.taken} class="text-sm" /> cuando aprobaste
					la cursada pero aún debés rendir su examen final.
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
					/>.
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
	</main>

	<Disclaimer college={data.college} />

	<Footer />
</div>

<style>
	.note :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		display: grid;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		padding-top: 0.5rem;
	}

	.note :global(a) {
		color: var(--color-blue-800);
		text-underline-offset: 2px;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
</style>
