import { preparePlan } from '$lib/prepare-plan';
import type { DraftPlanContent } from './draft-plan-content';
import { completeDraftStructure } from './graduation-field';

const itemName = (content: DraftPlanContent, itemId: string) =>
	content.document.items.find((item) => item.id === itemId)?.name ?? itemId;

const requirementScope = (content: DraftPlanContent, message: string) => {
	const graduation = /^Graduation requirement "([^"]+)": (.+)$/.exec(message);
	if (graduation) {
		const block = content.document.requirements.graduation?.find(
			(candidate) => candidate.id === graduation[1]
		);
		return {
			label: `El requisito de graduación ${block?.label || graduation[1]}`,
			detail: graduation[2]
		};
	}
	const match = /^Item "([^"]+)" (enroll|complete) requirement: (.+)$/.exec(message);
	if (!match) return undefined;
	return {
		label: `El requisito para ${match[2] === 'enroll' ? 'cursar' : 'completar'} de ${itemName(content, match[1])}`,
		detail: match[3]
	};
};

const diagnosticMessage = (content: DraftPlanContent, message: string) => {
	const cycle = /^Circular dependency detected: (.+)$/.exec(message);
	if (cycle)
		return `Hay una dependencia circular: ${cycle[1]
			.split(' -> ')
			.map((itemId) => itemName(content, itemId))
			.join(' -> ')}.`;

	const scope = requirementScope(content, message);
	if (scope) {
		if (scope.detail === 'weight must be a positive finite number')
			return `${scope.label} necesita un peso mayor que cero.`;
		if (scope.detail.startsWith('sum blocks require an explicit weight'))
			return `${scope.label} suma horas o créditos y necesita un peso explícito.`;
		const missing = /^referenced item "([^"]+)" does not exist$/.exec(scope.detail);
		if (missing)
			return `${scope.label} referencia a ${itemName(content, missing[1])}, que no existe.`;
		const missingMetric = /^item "([^"]+)" is missing metric "([^"]+)" required by sum$/.exec(
			scope.detail
		);
		if (missingMetric) {
			const metric =
				{ hours: 'horas', totalHours: 'horas totales', credits: 'créditos' }[missingMetric[2]] ??
				missingMetric[2];
			return `${scope.label} necesita ${metric} en ${itemName(content, missingMetric[1])}.`;
		}
		const milestone = /^milestone "([^"]+)" can only be referenced with state "completed"$/.exec(
			scope.detail
		);
		if (milestone)
			return `${scope.label} solo puede referirse al hito ${itemName(content, milestone[1])} como completado.`;
		if (scope.detail === 'minPercent must be between 1 and 100')
			return `${scope.label} debe tener un porcentaje entre 1 y 100.`;
		if (scope.detail === 'countOf min must be a positive integer')
			return `${scope.label} debe pedir al menos una condición.`;
		const countOf = /^countOf min \((\d+)\) exceeds its (\d+) rules$/.exec(scope.detail);
		if (countOf)
			return `${scope.label} pide ${countOf[1]} condiciones, pero solo tiene ${countOf[2]}.`;
		if (/^selector references unknown section /.test(scope.detail))
			return `${scope.label} usa una sección que no existe.`;
		if (/^selector .+ does not match any items$/.test(scope.detail))
			return `${scope.label} usa un conjunto sin elementos.`;
	}

	return 'No se pudo comprobar este requisito.';
};

export const requirementDiagnostics = (content: DraftPlanContent): string[] => {
	const structure = completeDraftStructure(content);
	if (!structure) {
		const block = content.document.requirements.graduation?.find((candidate) => !candidate.expr);
		return [`El requisito de egreso ${block?.label ?? 'sin título'} está incompleto.`];
	}
	try {
		preparePlan(structure);
		return [];
	} catch (error) {
		return [diagnosticMessage(content, error instanceof Error ? error.message : '')];
	}
};
