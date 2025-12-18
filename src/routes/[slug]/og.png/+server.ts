import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from '../study-plan-maps';
import { decodeCoursesStates, courseStates } from '$lib/course-state';
import { decodeGrades } from '$lib/grade-encoding';
import { calculateDegreeProgress } from '$lib/degree-progress';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const GET: RequestHandler = async ({ params, url }) => {
	const { slug } = params;

	const studyPlan =
		studyPlanSlugMap[slug.toLowerCase()] ?? studyPlanSlugWithYearMap[slug.toLowerCase()];

	if (!studyPlan) {
		error(404, { message: 'Study plan not found' });
	}

	// Decode states from query params
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');

	const coursesStates = stateLetters ? decodeCoursesStates(stateLetters) : [];
	const coursesGrades = gradeLetters ? decodeGrades(gradeLetters) : [];

	// Apply states to courses
	const coursesWithState = studyPlan.courses.map((course, index) => ({
		...course,
		state: coursesStates[index] ?? courseStates.notTaken,
		grade: coursesGrades[index] ?? undefined
	}));

	// Calculate progress
	const progress = calculateDegreeProgress(
		coursesWithState.map((c) => ({ ...c, isEnabled: true, canPass: true })) as any,
		studyPlan.progress
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

	// Calculate passed years
	const coursesByYear = new Map<number, typeof coursesWithState>();
	for (const course of coursesWithState) {
		const yearCourses = coursesByYear.get(course.year) || [];
		yearCourses.push(course);
		coursesByYear.set(course.year, yearCourses);
	}

	let passedYears = 0;
	for (let year = 1; year <= studyPlan.durationYears; year++) {
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
	const institution = studyPlan.collegeSlug
		? `${studyPlan.universitySlug.toUpperCase()} ${studyPlan.collegeSlug.toUpperCase()}`
		: studyPlan.universitySlug.toUpperCase();

	const planText = studyPlan.year ? `Plan de Estudios ${studyPlan.year}` : 'Plan de Estudios';

	// Load logo as base64
	let logoBase64 = '';
	try {
		const logoPath = join(
			process.cwd(),
			'static',
			'og-logos',
			`${studyPlan.universitySlug.toLowerCase()}.png`
		);
		const logoBuffer = readFileSync(logoPath);
		logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
	} catch {
		// If logo doesn't exist, continue without it
	}

	// Logo HTML (positioned top-right with same margins as content)
	const logoHtml = logoBase64
		? `<img src="${logoBase64}" style="position: absolute; top: 48px; right: 56px; max-width: 150px; max-height: 100px; object-fit: contain; opacity: 0.3; filter: grayscale(1)" />`
		: '';

	// Average HTML section
	const averageSection =
		average !== undefined && average > 0
			? `<div style="display: flex; width: 1px; height: 60px; background-color: #e5e7eb"></div>
			   <div style="display: flex; flex-direction: column; align-items: center">
				   <span style="font-size: 48px; font-weight: 700; color: #111827">${average.toFixed(2)}</span>
				   <span style="font-size: 16px; color: #6b7280">Promedio</span>
			   </div>`
			: '';

	const html = `
<div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: white; position: relative">
	${logoHtml}
	<div style="display: flex; flex-direction: column; flex: 1; padding: 48px 56px 32px 56px">
		<div style="display: flex; flex-direction: column">
			<span style="font-size: 20px; color: #1e40af">plande.app</span>
			<span style="font-size: 24px; color: #6b7280; margin-top: 8px">${institution} · ${planText}</span>
			<span style="font-size: 56px; font-weight: 700; color: #111827; margin-top: 8px; max-width: 850px">${studyPlan.degreeName}</span>
		</div>
		
		<div style="display: flex; align-items: flex-end; gap: 48px; margin-top: auto; padding: 32px 0">
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 48px; font-weight: 700; color: #16a34a">${Math.round(progress.percentage)}%</span>
				<span style="font-size: 16px; color: #6b7280">Avance</span>
			</div>
			<div style="display: flex; width: 1px; height: 60px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 48px; font-weight: 700"><span style="color: #111827">${passedCourses}</span><span style="color: #9ca3af">/${totalCourses}</span></span>
				<span style="font-size: 16px; color: #6b7280">Materias aprobadas</span>
			</div>
			<div style="display: flex; width: 1px; height: 60px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 48px; font-weight: 700"><span style="color: #111827">${passedYears}</span><span style="color: #9ca3af">/${studyPlan.durationYears}</span></span>
				<span style="font-size: 16px; color: #6b7280">Años aprobados</span>
			</div>
			${averageSection}
		</div>
	</div>
	
	<div style="display: flex; width: 100%; height: 16px">
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
