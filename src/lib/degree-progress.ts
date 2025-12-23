import { courseStates } from './course-state';
import { courseTypes, isElectiveOrOptative } from './course-type';
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
		(course) => course.type === courseTypes.mandatory
	);

	const electiveCourses = courses.filter((course) => isElectiveOrOptative(course.type));

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

			// Convert required elective hours to equivalent units (~4hs per unit)
			// This gives mandatory courses proper weight over electives
			const electiveEquivalentUnits = Math.ceil(requiredHours / 4);
			const totalUnitsNeeded = mandatoryCourses.length + electiveEquivalentUnits;
			const mandatoryWeight = mandatoryCourses.length / totalUnitsNeeded;
			const electiveWeight = electiveEquivalentUnits / totalUnitsNeeded;

			// Mandatory progress: simple proportion of passed mandatory courses
			const mandatoryProgress =
				mandatoryCourses.length > 0 ? passedMandatoryCourses.length / mandatoryCourses.length : 0;

			// Elective progress: based on required hours vs passed hours
			const electiveProgress = requiredHours > 0 ? cappedElectiveHours / requiredHours : 0;

			// Weighted final progress
			const weightedProgress =
				mandatoryProgress * mandatoryWeight + electiveProgress * electiveWeight;

			// For display purposes, scale to total units needed
			completedUnits = Math.round(weightedProgress * totalUnitsNeeded);
			totalUnits = totalUnitsNeeded;
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
