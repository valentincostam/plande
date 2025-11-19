import { courseStates } from './course-state';
import { courseTags } from './course-tag';
import type { Course } from './course.svelte';

export type DegreeProgressType =
	| 'mandatory-only' // Solo materias obligatorias (ej: UADER FCyT LSI)
	| 'mandatory-plus-one-elective' // Obligatorias + al menos 1 electiva (ej: UCU FAU Arq)
	| 'mandatory-plus-elective-hours' // Obligatorias + horas electivas específicas (ej: UTN FRCU ISI)
	| 'mandatory-plus-elective-count'; // Obligatorias + N electivas específicas (ej: UNSa FCE Física)

export type DegreeProgressConfig = {
	type: DegreeProgressType;
	requiredElectiveHours?: number; // Solo para 'mandatory-plus-elective-hours'
	requiredElectiveCount?: number; // Para 'mandatory-plus-one-elective' y 'mandatory-plus-elective-count'
};

export type DegreeProgressCalculation = {
	completedUnits: number;
	totalUnits: number;
	percentage: number;
};

export function calculateDegreeProgress(
	courses: Course[],
	config: DegreeProgressConfig
): DegreeProgressCalculation {
	const mandatoryCourses = courses.filter(
		(course) => course.tag !== courseTags.elective && course.tag !== courseTags.optative
	);

	const electiveCourses = courses.filter(
		(course) => course.tag === courseTags.elective || course.tag === courseTags.optative
	);

	const passedMandatoryCourses = mandatoryCourses.filter(
		(course) => course.state === courseStates.passed
	);

	const passedElectiveCourses = electiveCourses.filter(
		(course) => course.state === courseStates.passed
	);

	let completedUnits = 0;
	let totalUnits = 0;

	switch (config.type) {
		case 'mandatory-only':
			completedUnits = passedMandatoryCourses.length;
			totalUnits = mandatoryCourses.length;
			break;

		case 'mandatory-plus-one-elective': {
			const requiredElectiveCount = config.requiredElectiveCount ?? 1;
			const completedElectives = Math.min(passedElectiveCourses.length, requiredElectiveCount);

			completedUnits = passedMandatoryCourses.length + completedElectives;
			totalUnits = mandatoryCourses.length + requiredElectiveCount;
			break;
		}

		case 'mandatory-plus-elective-count': {
			const requiredElectiveCount = config.requiredElectiveCount ?? 1;
			const completedElectives = Math.min(passedElectiveCourses.length, requiredElectiveCount);

			completedUnits = passedMandatoryCourses.length + completedElectives;
			totalUnits = mandatoryCourses.length + requiredElectiveCount;
			break;
		}

		case 'mandatory-plus-elective-hours': {
			const requiredHours = config.requiredElectiveHours ?? 0;
			const passedElectiveHours = passedElectiveCourses.reduce(
				(acc, course) => acc + (course.hours ?? 0),
				0
			);
			const cappedElectiveHours = Math.min(passedElectiveHours, requiredHours);

			// Calculate progress based on total number of courses for more intuitive percentage
			const totalCourses = courses.length;
			const mandatoryWeight = mandatoryCourses.length / totalCourses;
			const electiveWeight = electiveCourses.length / totalCourses;

			// Mandatory progress: simple proportion of passed mandatory courses
			const mandatoryProgress = passedMandatoryCourses.length / mandatoryCourses.length;

			// Elective progress: based on required hours vs passed hours
			const electiveProgress = requiredHours > 0 ? cappedElectiveHours / requiredHours : 0;

			// Weighted final progress
			const weightedProgress =
				mandatoryProgress * mandatoryWeight + electiveProgress * electiveWeight;

			// For display purposes, scale to total courses
			completedUnits = Math.round(weightedProgress * totalCourses);
			totalUnits = totalCourses;
			break;
		}
	}

	const percentage = totalUnits === 0 ? 0 : (completedUnits / totalUnits) * 100;

	return {
		completedUnits,
		totalUnits,
		percentage
	};
}
