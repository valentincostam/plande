import type { CourseState } from './course-state';
import { courseStates, femenineCourseStateLabels } from './course-state';
import type { CourseTag } from './course-tag';
import type { CourseTerm } from './course-term';

export const requiredFor = {
	enroll: 'enroll',
	complete: 'complete'
} as const;

export type RequiredFor = (typeof requiredFor)[keyof typeof requiredFor];

export type RawCourseRequirement = {
	id: number;
	requiredCourseId: number;
	requiredState: CourseState;
	requiredFor: RequiredFor;
};

export type RawCourse = {
	id: number;
	name: string;
	year: number;
	hours?: number;
	term: CourseTerm;
	requirements?: RawCourseRequirement[];
	tag?: CourseTag;
};

/**
 * Detecta requerimientos redundantes en un plan de estudios basándose en dependencias transitivas.
 * Un requerimiento es redundante si ya está implícito a través de otra dependencia.
 *
 * Por ejemplo: Si A requiere B, y B requiere C, entonces el requerimiento directo de C en A es redundante.
 */
export function findRedundantRequirements(courses: RawCourse[]): string[] {
	const redundancies: string[] = [];

	// Crear un mapa de cursos por ID para búsqueda rápida
	const courseMap = new Map<number, RawCourse>();
	courses.forEach((course) => courseMap.set(course.id, course));

	// Función para verificar si un estado es mayor o igual a otro
	const isStateGreaterOrEqual = (state1: CourseState, state2: CourseState): boolean => {
		const stateHierarchy: Record<CourseState, number> = {
			[courseStates.notTaken]: 0,
			[courseStates.inProgress]: 1,
			[courseStates.taken]: 2,
			[courseStates.passed]: 3
		};
		return stateHierarchy[state1] >= stateHierarchy[state2];
	};

	// Función recursiva para obtener todos los prerequisitos transitivos de una materia
	const getTransitivePrerequisites = (
		courseId: number,
		requiredFor: RequiredFor,
		visited = new Set<number>()
	): Map<number, { state: CourseState; path: string[] }> => {
		if (visited.has(courseId)) return new Map();
		visited.add(courseId);

		const course = courseMap.get(courseId);
		if (!course?.requirements) return new Map();

		const prerequisites = new Map<number, { state: CourseState; path: string[] }>();

		for (const req of course.requirements) {
			if (req.requiredFor !== requiredFor) continue;

			const reqCourse = courseMap.get(req.requiredCourseId);
			if (!reqCourse) continue;

			// Agregar el prerequisito directo
			const currentPath = [`${reqCourse.name} (${reqCourse.id})`];
			prerequisites.set(req.requiredCourseId, {
				state: req.requiredState,
				path: currentPath
			});

			// Agregar prerequisitos transitivos
			const transitivePrereqs = getTransitivePrerequisites(
				req.requiredCourseId,
				requiredFor,
				new Set(visited)
			);
			for (const [transitiveId, transitiveData] of transitivePrereqs) {
				const existing = prerequisites.get(transitiveId);
				if (!existing || isStateGreaterOrEqual(transitiveData.state, existing.state)) {
					prerequisites.set(transitiveId, {
						state: transitiveData.state,
						path: [...currentPath, ...transitiveData.path]
					});
				}
			}
		}

		return prerequisites;
	};

	// Analizar cada materia
	for (const course of courses) {
		if (!course.requirements) continue;

		// Conjunto para rastrear qué requerimientos ya fueron marcados como redundantes
		const processedRedundancies = new Set<string>();

		for (const requirement of course.requirements) {
			const requiredCourse = courseMap.get(requirement.requiredCourseId);
			if (!requiredCourse) continue;

			// Crear una clave única para este requerimiento específico
			const requirementKey = `${requirement.requiredCourseId}-${requirement.requiredState}-${requirement.requiredFor}`;

			// Si ya encontramos que este requerimiento es redundante, saltarlo
			if (processedRedundancies.has(requirementKey)) continue;

			// Obtener todos los prerequisitos transitivos de otras materias requeridas
			const otherRequirements = course.requirements.filter(
				(r) =>
					r.requiredCourseId !== requirement.requiredCourseId &&
					r.requiredFor === requirement.requiredFor
			);

			for (const otherReq of otherRequirements) {
				const transitivePrereqs = getTransitivePrerequisites(
					otherReq.requiredCourseId,
					requirement.requiredFor
				);

				if (transitivePrereqs.has(requirement.requiredCourseId)) {
					const transitiveData = transitivePrereqs.get(requirement.requiredCourseId)!;
					const otherCourse = courseMap.get(otherReq.requiredCourseId);

					// Verificar si el estado transitivo cubre el requerimiento directo
					if (isStateGreaterOrEqual(transitiveData.state, requirement.requiredState)) {
						const stateText = femenineCourseStateLabels[requirement.requiredState].toLowerCase();
						const transitiveStateText =
							femenineCourseStateLabels[transitiveData.state].toLowerCase();
						const purposeText =
							requirement.requiredFor === requiredFor.enroll ? 'CURSAR' : 'RENDIR';
						const transitivePurposeText =
							requirement.requiredFor === requiredFor.enroll ? 'cursar' : 'rendir';

						// Crear la cadena de dependencias
						const dependencyChain = transitiveData.path.reverse().join(' → ');

						redundancies.push(
							`En **${course.name} (${course.id})**: El requerimiento **${requiredCourse.name} (${requiredCourse.id})** \`${stateText}\` para \`${purposeText}\` es redundante porque para ${transitivePurposeText} **${otherCourse?.name} (${otherReq.requiredCourseId})** ya se requiere la cadena: \`${dependencyChain}\` (\`${transitiveStateText}\`)`
						);

						// Marcar este requerimiento como procesado para evitar duplicados
						processedRedundancies.add(requirementKey);
						break; // Salir del loop una vez que encontramos una redundancia
					}
				}
			}
		}
	}

	return redundancies;
}
