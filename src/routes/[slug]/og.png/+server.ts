import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from '../study-plan-maps';
import { decodeCoursesStates, courseStates } from '$lib/course-state';
import { decodeGrades } from '$lib/grade-encoding';
import { calculateDegreeProgress } from '$lib/degree-progress';
import type { Course } from '$lib/course.svelte';
import { studyPlanDataToStudyPlan } from '$lib/study-plan-catalog';

export const GET: RequestHandler = async ({ params, url }) => {
	const { slug } = params;

	const studyPlan =
		studyPlanSlugMap[slug.toLowerCase()] ?? studyPlanSlugWithYearMap[slug.toLowerCase()];

	if (!studyPlan) {
		error(404, { message: 'Study plan not found' });
	}

	const exportStudyPlan = studyPlanDataToStudyPlan(studyPlan);

	// Decode states from query params
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');

	const coursesStates = stateLetters ? decodeCoursesStates(stateLetters) : [];
	const coursesGrades = gradeLetters ? decodeGrades(gradeLetters) : [];

	// Apply states to courses
	const coursesWithState = exportStudyPlan.courses.map((course, index) => ({
		...course,
		attributes: course.attributes ?? [],
		state: coursesStates[index] ?? courseStates.notTaken,
		grade: coursesGrades[index] ?? undefined
	}));

	// Calculate progress
	const progress = calculateDegreeProgress(
		coursesWithState.map((c) => ({ ...c, isEnabled: true, canPass: true })) as unknown as Course[],
		exportStudyPlan.progress
	);

	// Calculate state distribution
	const stateDistribution = {
		notTaken: coursesWithState.filter((c) => c.state === courseStates.notTaken).length,
		inProgress: coursesWithState.filter((c) => c.state === courseStates.inProgress).length,
		taken: coursesWithState.filter((c) => c.state === courseStates.taken).length,
		passed: coursesWithState.filter((c) => c.state === courseStates.passed).length
	};

	const passedCourses = stateDistribution.passed;
	const totalCourses = coursesWithState.length;

	// Calculate passed years (exclude transversals with undefined year)
	const coursesByYear = new Map<number, typeof coursesWithState>();
	for (const course of coursesWithState) {
		if (course.year === undefined) continue; // Skip transversal courses
		const yearCourses = coursesByYear.get(course.year) || [];
		yearCourses.push(course);
		coursesByYear.set(course.year, yearCourses);
	}

	let passedYears = 0;
	for (let year = 1; year <= exportStudyPlan.durationYears; year++) {
		const yearCourses = coursesByYear.get(year) || [];
		if (yearCourses.length > 0 && yearCourses.every((c) => c.state === courseStates.passed)) {
			passedYears++;
		}
	}

	// Calculate average
	const coursesWithGrades = coursesWithState.filter(
		(c) => c.state === courseStates.passed && c.grade !== undefined && c.grade !== null
	);
	const average =
		coursesWithGrades.length > 0
			? coursesWithGrades.reduce((acc, c) => acc + (c.grade ?? 0), 0) / coursesWithGrades.length
			: undefined;

	// Build institution string
	const institution = exportStudyPlan.collegeSlug
		? `${exportStudyPlan.universitySlug.toUpperCase()} ${exportStudyPlan.collegeSlug.toUpperCase()}`
		: exportStudyPlan.universitySlug.toUpperCase();

	const planText = exportStudyPlan.year
		? `Plan de Estudios ${exportStudyPlan.year}`
		: 'Plan de Estudios';

	// Load logo as base64 from public URL
	let logoBase64 = '';
	try {
		const logoUrl = new URL(
			`/og-logos/${exportStudyPlan.universitySlug.toLowerCase()}.png`,
			url.origin
		);
		const response = await fetch(logoUrl);
		if (response.ok) {
			const arrayBuffer = await response.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			logoBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
		}
	} catch {
		// If logo doesn't exist, continue without it
	}

	// Logo HTML (positioned top-right with same margins as content)
	const logoHtml = logoBase64
		? `<img src="${logoBase64}" style="position: absolute; top: 40px; right: 56px; max-width: 225px; max-height: 150px; object-fit: contain; opacity: 0.3; filter: grayscale(1)" />`
		: '';

	// Average HTML section
	const averageSection =
		average !== undefined && average > 0
			? `<div style="display: flex; width: 5px; height: 100px; background-color: #e5e7eb"></div>
			   <div style="display: flex; flex-direction: column; align-items: center">
				   <span style="font-size: 62px; font-weight: 700; color: #111827">${average.toFixed(2).replace('.', ',')}</span>
				   <span style="font-size: 21px; color: #6b7280">Promedio</span>
			   </div>`
			: '';

	const html = `
<div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: white; position: relative">
	${logoHtml}
	<div style="display: flex; flex-direction: column; flex: 1; padding: 48px 56px 32px 56px">
		<div style="display: flex; flex-direction: column">
			<span style="font-size: 30px; color: #1e40af">plande.app</span>
			<span style="font-size: 36px; color: #6b7280; margin-top: 12px">${institution} · ${planText}</span>
			<span style="font-size: 56px; font-weight: 700; color: #111827; margin-top: 8px; max-width: 850px">${exportStudyPlan.degreeName}</span>
		</div>
		
		<div style="display: flex; align-items: flex-end; gap: 62px; margin-top: auto; padding: 32px 0">
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700; color: #16a34a">${Math.round(progress.percentage)}%</span>
				<span style="font-size: 21px; color: #6b7280">Avance</span>
			</div>
			<div style="display: flex; width: 5px; height: 100px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700"><span style="color: #111827">${passedCourses}</span><span style="color: #9ca3af">/${totalCourses}</span></span>
				<span style="font-size: 21px; color: #6b7280">Materias aprobadas</span>
			</div>
			<div style="display: flex; width: 5px; height: 100px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700"><span style="color: #111827">${passedYears}</span><span style="color: #9ca3af">/${exportStudyPlan.durationYears}</span></span>
				<span style="font-size: 21px; color: #6b7280">Años aprobados</span>
			</div>
			${averageSection}
		</div>
	</div>
	
	<div style="display: flex; width: 100%; height: 32px">
		<div style="display: flex; height: 100%; background-color: #d1d5db; flex-grow: ${stateDistribution.notTaken}"></div>
		<div style="display: flex; height: 100%; background-color: #60a5fa; flex-grow: ${stateDistribution.inProgress}"></div>
		<div style="display: flex; height: 100%; background-color: #fbbf24; flex-grow: ${stateDistribution.taken}"></div>
		<div style="display: flex; height: 100%; background-color: #22c55e; flex-grow: ${stateDistribution.passed}"></div>
	</div>
</div>`;

	return new ImageResponse(html, {
		width: 1200,
		height: 630
	});
};
