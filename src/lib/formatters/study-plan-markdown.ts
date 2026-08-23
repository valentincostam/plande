import { courseAttributeLabels } from '../course-attribute';
import { courseTypeLabels } from '../course-type';
import type { StudyPlanData } from '../study-plan-data';
import { buildStudyPlanDocument } from './study-plan-document';

export function studyPlanToMarkdown(source: StudyPlanData): string {
	const { plan, durationYears, items, graduationRequirements, priority } =
		buildStudyPlanDocument(source);
	const lines: string[] = [
		`# ${plan.info.degreeName}`,
		'',
		`**Universidad**: ${plan.info.universityName} (${plan.info.universitySlug})`
	];
	if (plan.info.collegeName && plan.info.collegeSlug) {
		lines.push(`**Facultad**: ${plan.info.collegeName} (${plan.info.collegeSlug})`);
	}
	lines.push(`**Duración**: ${durationYears} años`);
	if (plan.info.year) lines.push(`**Plan**: ${plan.info.year}`);
	lines.push('', '## Configuración de Progreso', '');
	if (graduationRequirements.length === 0) lines.push('Sin requisitos de graduación definidos.');
	for (const requirement of graduationRequirements) {
		lines.push(`- **${requirement.label}**: ${requirement.description}`);
	}

	lines.push('', '## Materias', '');
	let currentSection: string | undefined;
	for (const entry of items) {
		if (entry.sectionLabel !== currentSection) {
			currentSection = entry.sectionLabel;
			lines.push(`### ${currentSection}`, '');
		}
		lines.push(`#### ${entry.item.name}`, '');
		if (entry.item.code) lines.push(`- **Código**: ${entry.item.code}`);
		if (entry.item.kind === 'course') {
			if (entry.item.hours) lines.push(`- **Horas**: ${entry.item.hours}`);
			if (entry.item.totalHours) lines.push(`- **Horas totales**: ${entry.item.totalHours}`);
			if (entry.item.credits) lines.push(`- **Créditos**: ${entry.item.credits}`);
			lines.push(`- **Tipo**: ${courseTypeLabels[entry.item.type]}`);
			if (entry.item.attributes?.length) {
				lines.push(
					`- **Atributos**: ${entry.item.attributes.map((value) => courseAttributeLabels[value]).join(', ')}`
				);
			}
		} else {
			lines.push('- **Tipo**: Hito');
		}
		if (entry.placements.length) lines.push(`- **Ubicación**: ${entry.placements.join('; ')}`);
		if (entry.enrollRequirement)
			lines.push(`- **Requiere para cursar**: ${entry.enrollRequirement}`);
		if (entry.completeRequirement)
			lines.push(`- **Requiere para completar**: ${entry.completeRequirement}`);
		lines.push('', '---', '');
	}

	lines.push(
		'## Orden de Prioridad Sugerido',
		'',
		'Materias ordenadas por cantidad de otras que desbloquean. Conviene priorizar las que están más arriba.',
		'',
		'| # | Materia | Año | Desbloquea |',
		'|---|---------|-----|------------|'
	);
	priority.forEach((entry, index) => {
		lines.push(
			`| ${index + 1} | ${entry.item.name} | ${entry.year === undefined ? '-' : `${entry.year}º`} | ${entry.dependentCount} |`
		);
	});

	if (plan.info.sources?.length) {
		lines.push('', '## Fuentes Oficiales', '');
		for (const sourceItem of plan.info.sources) {
			lines.push(`${sourceItem.id}. [${sourceItem.label}](${sourceItem.url})`);
		}
	}
	if (plan.info.notes?.length) {
		lines.push('', '## Notas Adicionales', '');
		for (const note of plan.info.notes) lines.push(note.text, '');
	}
	lines.push(
		'',
		'---',
		'',
		'Este plan de estudios fue creado con [Plande](https://plande.app).',
		'Plande es un proyecto de [Valentín Costa](https://valentincosta.com).',
		''
	);
	return lines.join('\n');
}
