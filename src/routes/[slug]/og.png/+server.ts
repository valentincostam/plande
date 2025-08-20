import type { RequestHandler } from './$types';
import { Resvg } from '@resvg/resvg-js';
import { courseStates, decodeCoursesStates } from '$lib/course-state';
import { utnFrcuIsiData } from '../utn-frcu-isi-data';
import { utnFrcuIeData } from '../utn-frcu-ie-data';
import { ucuFauArqData } from '../ucu-fau-arq';
import { uaderFcytLsiData } from '../uader-fcyt-lsi-data';
import { unerFcsMedData } from '../uner-fcs-med-data';

const getPlanData = (slug: string) => {
	if (slug === 'utn-frcu-isi') return utnFrcuIsiData;
	if (slug === 'utn-frcu-ie') return utnFrcuIeData;
	if (slug === 'ucu-fau-arq') return ucuFauArqData;
	if (slug === 'uader-fcyt-lsi') return uaderFcytLsiData;
	if (slug === 'uner-fcs-med') return unerFcsMedData;
	return null;
};

const computeDistribution = (states: (keyof typeof courseStates)[]) => {
	const dist = {
		notTaken: 0,
		inProgress: 0,
		taken: 0,
		passed: 0
	};
	for (const s of states) {
		if (s) (dist as Record<string, number>)[s]++;
	}
	return dist;
};

type Plan = {
	courses: { hours?: number; tag?: string }[];
	degree: string;
	college: string;
	studyProgram: string;
	requiredElectiveHours?: number;
};

export const GET: RequestHandler = async ({ params, url }) => {
	const { slug } = params;
	const plan = getPlanData(slug) as unknown as Plan | null;
	if (!plan) {
		return new Response('Not found', { status: 404 });
	}

	const stateLetters = url.searchParams.get('estado') ?? '';
	const states = decodeCoursesStates(stateLetters);
	const defaultStates = new Array(plan.courses.length).fill(courseStates.notTaken);
	// Rellenar estados faltantes con "notTaken" para que coincida con el UI
	const effectiveStates = states.length
		? [
				...states,
				...new Array(Math.max(0, plan.courses.length - states.length)).fill(courseStates.notTaken)
			]
		: defaultStates;
	// Limitar en caso de que vengan más estados que materias
	const limitedStates = effectiveStates.slice(0, plan.courses.length);
	const dist = computeDistribution(limitedStates);

	// Overall progress percent
	const requiredElectiveHours: number = plan.requiredElectiveHours ?? 0;
	const isElective = (c: { tag?: string }) => ['elective', 'optative'].includes(c.tag ?? '');
	const mandatoryCourses = plan.courses.filter((c) => !isElective(c));
	let passedMandatoryCount = 0;
	let passedElectiveHours = 0;
	for (let i = 0; i < plan.courses.length; i++) {
		const course = plan.courses[i];
		const state = limitedStates[i];
		if (!isElective(course) && state === courseStates.passed) passedMandatoryCount++;
		if (isElective(course) && state === courseStates.passed) {
			passedElectiveHours += course.hours ?? 0;
		}
	}
	const cappedPassedElectiveHours = requiredElectiveHours
		? Math.min(passedElectiveHours, requiredElectiveHours)
		: 0;
	const progressTotalUnits = requiredElectiveHours
		? mandatoryCourses.length + requiredElectiveHours
		: plan.courses.length;
	const progressCompletedUnits = requiredElectiveHours
		? passedMandatoryCount + cappedPassedElectiveHours
		: limitedStates.filter((s) => s === courseStates.passed).length;
	const progressPct = Math.round(((progressCompletedUnits || 0) / (progressTotalUnits || 1)) * 100);

	// Visual constants
	const width = 1200;
	const height = 630;
	const padY = 80;
	const bg = '#ffffff';
	const textPrimary = '#0f172a';
	const textMuted = '#334155';
	const ringBg = '#d1d5db'; // gray-300 to match state-distribution
	const ringFg = '#22c55e'; // green-500 to match state-distribution

	// Donut geometry
	const cx = width / 2;
	const cy = 370;
	const r = 140;
	const stroke = 28;
	const circumference = 2 * Math.PI * r;
	const progressFraction = Math.max(0, Math.min(1, progressPct / 100));
	const dasharray = `${circumference} ${circumference}`;
	const dashoffset = String(circumference * (1 - progressFraction));

	// Bottom distribution strip
	const stripH = 36;
	const stripY = height - stripH;
	const total = plan.courses.length || 1;
	// Compute integer widths so the strip fills edge-to-edge exactly
	const wNotTaken = Math.round((width * dist.notTaken) / total);
	const wInProgress = Math.round((width * dist.inProgress) / total);
	const wTaken = Math.round((width * dist.taken) / total);
	let wPassed = Math.round((width * dist.passed) / total);
	// Ajuste: forzar que el total sea exactamente el ancho, corrigiendo por redondeo
	const widthDelta = width - (wNotTaken + wInProgress + wTaken + wPassed);
	wPassed += widthDelta;
	const xInProgress = wNotTaken;
	const xTaken = wNotTaken + wInProgress;
	const xPassed = wNotTaken + wInProgress + wTaken;
	const segColors = {
		notTaken: '#d1d5db', // gray-300 to match state-distribution
		inProgress: '#60a5fa', // blue-400 to match state-distribution
		taken: '#fbbf24', // amber-400 to match state-distribution
		passed: '#22c55e' // green-500 to match state-distribution
	};

	const svg = `<?xml version="1.0" encoding="UTF-8"?>
	<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<rect width="100%" height="100%" fill="${bg}" />
		<text x="${width / 2}" y="${padY}" font-family="Arial" font-size="32" text-anchor="middle" fill="${textMuted}">${plan.college} · ${plan.studyProgram}</text>
		<text x="${width / 2}" y="${padY + 70}" font-family="Arial" font-size="64" font-weight="bold" text-anchor="middle" fill="${textPrimary}">${plan.degree}</text>

		<g transform="rotate(-90 ${cx} ${cy})">
			<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ringBg}" stroke-width="${stroke}" />
			<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ringFg}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${dasharray}" stroke-dashoffset="${dashoffset}" />
		</g>
		<text x="${cx}" y="${cy}" dy="-4" dominant-baseline="central" text-anchor="middle" font-family="Arial" fill="${textPrimary}">
			<tspan font-size="96" font-weight="bold">${progressPct}</tspan>
			<tspan font-size="56" font-weight="normal" fill="#64748b">%</tspan>
		</text>

		<rect x="0" y="${stripY}" width="${wNotTaken}" height="${stripH}" fill="${segColors.notTaken}" />
		<rect x="${xInProgress}" y="${stripY}" width="${wInProgress}" height="${stripH}" fill="${segColors.inProgress}" />
		<rect x="${xTaken}" y="${stripY}" width="${wTaken}" height="${stripH}" fill="${segColors.taken}" />
		<rect x="${xPassed}" y="${stripY}" width="${wPassed}" height="${stripH}" fill="${segColors.passed}" />
	</svg>`;

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: width },
		font: {
			loadSystemFonts: true
		}
	});
	const png = resvg.render().asPng();
	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=60'
		}
	});
};
