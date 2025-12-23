import type { StudyPlan } from '../study-plan';
import { courseTermLabels } from '../course-term';
import { courseTypeLabels } from '../course-type';
import { courseAttributeLabels } from '../course-attribute';
import { femenineCourseStateLabels } from '../course-state';
import { requiredFor, requiredForLabels } from '../raw-course';

export function studyPlanToPlainText(studyPlan: StudyPlan): string {
	const sections: string[] = [];
	const SEPARATOR =
		'================================================================================';
	const SUBSEPARATOR =
		'--------------------------------------------------------------------------------';

	// Header with metadata
	sections.push(SEPARATOR);
	sections.push(studyPlan.degreeName.toUpperCase());
	sections.push(SEPARATOR);
	sections.push('');
	sections.push(`Universidad: ${studyPlan.universityName} (${studyPlan.universitySlug})`);

	if (studyPlan.collegeName && studyPlan.collegeSlug) {
		sections.push(`Facultad: ${studyPlan.collegeName} (${studyPlan.collegeSlug})`);
	}

	sections.push(`Duración: ${studyPlan.durationYears} años`);

	if (studyPlan.year) {
		sections.push(`Plan: ${studyPlan.year}`);
	}

	sections.push('');

	// Progress configuration
	sections.push(SUBSEPARATOR);
	sections.push('CONFIGURACIÓN DE PROGRESO');
	sections.push(SUBSEPARATOR);
	sections.push('');

	const progressTypeLabels = {
		'mandatory-only': 'Solo materias obligatorias',
		'mandatory-plus-elective-hours': 'Obligatorias + horas electivas específicas',
		'mandatory-plus-elective-count': 'Obligatorias + N electivas específicas'
	};

	sections.push(`Tipo: ${progressTypeLabels[studyPlan.progress.type]}`);

	if (studyPlan.progress.requiredElectiveHours) {
		sections.push(`Horas electivas requeridas: ${studyPlan.progress.requiredElectiveHours} horas`);
	}

	if (studyPlan.progress.requiredElectiveCount) {
		sections.push(`Cantidad de electivas requeridas: ${studyPlan.progress.requiredElectiveCount}`);
	}

	sections.push('');

	// Group courses by year
	const coursesByYear = new Map<number | undefined, typeof studyPlan.courses>();

	for (const course of studyPlan.courses) {
		if (!coursesByYear.has(course.year)) {
			coursesByYear.set(course.year, []);
		}
		coursesByYear.get(course.year)!.push(course);
	}

	// Sort years (undefined = transversal goes last)
	const sortedYears = Array.from(coursesByYear.keys()).sort((a, b) => {
		if (a === undefined) return 1;
		if (b === undefined) return -1;
		return a - b;
	});

	sections.push(SUBSEPARATOR);
	sections.push('MATERIAS');
	sections.push(SUBSEPARATOR);
	sections.push('');

	for (const year of sortedYears) {
		sections.push(year !== undefined ? `AÑO ${year}` : 'MATERIAS TRANSVERSALES');
		sections.push('');

		const courses = coursesByYear.get(year)!;

		for (const course of courses) {
			sections.push(course.name);

			// Course details
			if (course.code) {
				sections.push(`  Código: ${course.code}`);
			}

			if (course.hours) {
				sections.push(`  Horas: ${course.hours}`);
			}

			const termLabel = courseTermLabels[course.term];
			if (termLabel) {
				sections.push(`  Período: ${termLabel}`);
			}

			sections.push(`  Tipo: ${courseTypeLabels[course.type]}`);

			if (course.attributes && course.attributes.length > 0) {
				const attrLabels = course.attributes.map((a) => courseAttributeLabels[a]).join(', ');
				sections.push(`  Atributos: ${attrLabels}`);
			}

			if (course.crossYear) {
				const endTermLabel = courseTermLabels[course.crossYear.endsInTerm];
				sections.push(`  Plurianual: Hasta año ${course.crossYear.spansToYear} (${endTermLabel})`);
			}

			// Requirements
			if (course.requirements && course.requirements.length > 0) {
				sections.push('  Correlativas:');

				// Group requirements by purpose
				const enrollRequirements = course.requirements.filter(
					(req) => req.requiredFor === requiredFor.enroll
				);
				const completeRequirements = course.requirements.filter(
					(req) => req.requiredFor === requiredFor.complete
				);

				if (enrollRequirements.length > 0) {
					sections.push(`    Para ${requiredForLabels[requiredFor.enroll]}:`);
					for (const req of enrollRequirements) {
						const reqCourse = studyPlan.courses.find((c) => c.id === req.requiredCourseId);
						const stateLabel = femenineCourseStateLabels[req.requiredState];
						if (reqCourse) {
							sections.push(`      - ${reqCourse.name} (debe estar ${stateLabel})`);
						}
					}
				}

				if (completeRequirements.length > 0) {
					sections.push(`    Para ${requiredForLabels[requiredFor.complete]}:`);
					for (const req of completeRequirements) {
						const reqCourse = studyPlan.courses.find((c) => c.id === req.requiredCourseId);
						const stateLabel = femenineCourseStateLabels[req.requiredState];
						if (reqCourse) {
							sections.push(`      - ${reqCourse.name} (debe estar ${stateLabel})`);
						}
					}
				}
			}

			sections.push('');
		}
	}

	// Sources
	if (studyPlan.sources.length > 0) {
		sections.push(SUBSEPARATOR);
		sections.push('FUENTES OFICIALES');
		sections.push(SUBSEPARATOR);
		sections.push('');

		for (const source of studyPlan.sources) {
			sections.push(`${source.id}. ${source.label}`);
			sections.push(`   ${source.url}`);
		}

		sections.push('');
	}

	// Notes
	if (studyPlan.notes && studyPlan.notes.length > 0) {
		sections.push(SUBSEPARATOR);
		sections.push('NOTAS ADICIONALES');
		sections.push(SUBSEPARATOR);
		sections.push('');

		for (const note of studyPlan.notes) {
			// Strip markdown formatting from notes for plain text
			const plainNote = note.text
				.replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
				.replace(/\*(.+?)\*/g, '$1') // Remove italic
				.replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
				.replace(/<sup>(.+?)<\/sup>/g, '^$1'); // Convert sup to caret notation

			sections.push(plainNote);
			sections.push('');
		}
	}

	return sections.join('\n');
}
