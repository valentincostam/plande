<script lang="ts">
	import { isTransversal } from '$lib/course-attribute';
	import { createCourses } from '$lib/course.svelte';
	import type { PageProps } from './$types';
	import { createYears } from '$lib/year.svelte';
	import Footer from '../../footer.svelte';
	import SimpleYear from './simple-year.svelte';
	import SimpleStats from './simple-stats.svelte';
	import SimpleCourse from './simple-course.svelte';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { decodeCoursesStates } from '$lib/course-state';
	import ShareButton from '../share-button.svelte';
	import CopyLinkButton from '../copy-link-button.svelte';

	let { data }: PageProps = $props();

	const courses = untrack(() =>
		createCourses(
			data.studyPlan.courses,
			data.coursesStates,
			() => false,
			data.coursesGrades
		)
	);

	const years = $derived(createYears(data.studyPlan.durationYears, courses));

	const transversalCourses = $derived(
		courses.filter((course) => isTransversal(course.attributes))
	);

	const fullViewUrl = $derived.by(() => {
		const searchParams = page.url.search;
		return `/${data.slug}${searchParams}`;
	});

	const seo = $derived.by(() => {
		const collegeAbbr = data.studyPlan.collegeSlug
			? data.studyPlan.collegeSlug.toUpperCase()
			: '';
		const universityAbbr = data.studyPlan.universitySlug.toUpperCase();
		const institution = collegeAbbr ? `${universityAbbr} ${collegeAbbr}` : universityAbbr;
		const title = `${data.studyPlan.degreeName} ・ ${institution} ・ Plande`;
		const description = `Progreso en ${data.studyPlan.degreeName} - ${data.studyPlan.universityName}${data.studyPlan.collegeName ? ` ・ ${data.studyPlan.collegeName}` : ''}.`;
		const url = `https://plande.app/${data.slug}`;
		const ogImageUrl = `https://plande.app/${data.slug}/og.png${page.url.search}`;

		return { title, description, url, ogImageUrl };
	});

	const storageKey = $derived(`plande-${data.slug}`);

	onMount(() => {
		if (!browser) return;

		// Solo cargar de localStorage si no hay datos en URL
		if (data.coursesStates.length > 0) return;

		const savedData = localStorage.getItem(storageKey);
		if (!savedData) return;

		try {
			const parsed = JSON.parse(savedData);

			if (parsed.coursesStates) {
				const decodedStates = decodeCoursesStates(parsed.coursesStates);
				courses.forEach((course, index) => {
					if (decodedStates[index]) {
						course.state = decodedStates[index];
					}
				});
			}

			if (parsed.grades) {
				courses.forEach((course, index) => {
					if (index < parsed.grades.length) {
						course.grade = parsed.grades[index] ?? undefined;
					}
				});
			}
		} catch (error) {
			console.warn('Failed to parse saved course states:', error);
		}
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="robots" content="noindex" />
	<link rel="canonical" href={seo.url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={seo.url} />
	<meta property="og:site_name" content="Plande" />
	<meta property="og:image" content={seo.ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.ogImageUrl} />
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<a
			href="/"
			class="text-sm leading-loose text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>Plande</a
		>
		<p>
			Plan de Estudios {data.studyPlan.year ?? ''} · {data.studyPlan.universitySlug}
			{data.studyPlan.collegeSlug ?? ''}
		</p>
		<h1 class="text-2xl font-bold">{data.studyPlan.degreeName}</h1>
	</header>

	<main class="grid gap-9">
		{#each years as year}
			<SimpleYear {year} />
		{/each}

		{#if transversalCourses.length > 0}
			<section aria-labelledby="transversal-heading">
				<header class="flex items-center gap-3 p-3">
					<h2 id="transversal-heading" class="text-lg font-bold">Transversales</h2>
				</header>
				<ul class="grid gap-1">
					{#each transversalCourses as course}
						<SimpleCourse {course} />
					{/each}
				</ul>
			</section>
		{/if}

		<SimpleStats {courses} progress={data.studyPlan.progress} />
	</main>

	<section class="grid gap-3 px-3">
		<ShareButton title={seo.title} />
		<CopyLinkButton />
		<a
			href={fullViewUrl}
			class="mx-auto text-sm text-blue-800 hover:underline"
		>
			Ver versión completa
		</a>
	</section>

	<Footer />
</div>
