import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { loadStudyPlan } from '../data/study-plan-loaders';
import { decodeGrades } from '$lib/grade-encoding';
import { decodeItemStates } from '$lib/study-plan-url-state';
import { calculateStudyPlanSnapshot } from '$lib/study-plan-progress';

export const GET: RequestHandler = async ({ params, url }) => {
	const { slug } = params;

	const studyPlan = await loadStudyPlan(slug);

	if (!studyPlan) {
		error(404, { message: 'Study plan not found' });
	}

	// Decode states from query params
	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');

	const itemStates = stateLetters ? decodeItemStates(stateLetters) : [];
	const itemGrades = gradeLetters ? decodeGrades(gradeLetters) : [];
	const snapshot = calculateStudyPlanSnapshot(studyPlan, itemStates, itemGrades);
	const { stateDistribution, passedCourses, totalCourses, passedYears, totalYears, average } =
		snapshot;

	// Build institution string
	const institution = studyPlan.info.collegeSlug
		? `${studyPlan.info.universitySlug.toUpperCase()} ${studyPlan.info.collegeSlug.toUpperCase()}`
		: studyPlan.info.universitySlug.toUpperCase();

	const planText = studyPlan.info.year
		? `Plan de Estudios ${studyPlan.info.year}`
		: 'Plan de Estudios';

	// Load logo as base64 from public URL
	let logoBase64 = '';
	try {
		const logoUrl = new URL(
			`/og-logos/${studyPlan.info.universitySlug.toLowerCase()}.png`,
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
			<span style="font-size: 56px; font-weight: 700; color: #111827; margin-top: 8px; max-width: 850px">${studyPlan.info.degreeName}</span>
		</div>
		
		<div style="display: flex; align-items: flex-end; gap: 62px; margin-top: auto; padding: 32px 0">
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700; color: #16a34a">${Math.round(snapshot.graduationPercentage)}%</span>
				<span style="font-size: 21px; color: #6b7280">Avance</span>
			</div>
			<div style="display: flex; width: 5px; height: 100px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700"><span style="color: #111827">${passedCourses}</span><span style="color: #9ca3af">/${totalCourses}</span></span>
				<span style="font-size: 21px; color: #6b7280">Materias aprobadas</span>
			</div>
			<div style="display: flex; width: 5px; height: 100px; background-color: #e5e7eb"></div>
			<div style="display: flex; flex-direction: column; align-items: center">
				<span style="font-size: 62px; font-weight: 700"><span style="color: #111827">${passedYears}</span><span style="color: #9ca3af">/${totalYears}</span></span>
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
