import { courseTermLabels } from '../course-term';
import { preparePlan } from '../prepare-plan';
import type {
	PlanItem,
	RequirementExpr,
	RequirementState,
	Selector,
	StudyPlanData
} from '../study-plan-data';

export type StudyPlanDocumentItem = {
	item: PlanItem;
	sectionLabel: string;
	placements: string[];
	enrollRequirement?: string;
	completeRequirement?: string;
};

export type StudyPlanDocument = {
	plan: StudyPlanData;
	durationYears: number;
	items: StudyPlanDocumentItem[];
	graduationRequirements: { label: string; description: string }[];
	priority: { item: PlanItem; year?: number; dependentCount: number }[];
};

const stateLabel = (state: RequirementState, plural: boolean, milestone = false) => {
	if (milestone) return state === 'completed' ? 'completado' : state;
	const labels: Record<RequirementState, [string, string]> = {
		inProgress: ['en curso', 'en curso'],
		taken: ['regularizada', 'regularizadas'],
		passed: ['aprobada', 'aprobadas'],
		completed: ['aprobada', 'aprobadas']
	};
	return labels[state][plural ? 1 : 0];
};

type RequirementDescriptionPlan = Pick<StudyPlanData, 'items' | 'sections'>;

const selectorLabel = (selector: Selector, plan: RequirementDescriptionPlan) => {
	switch (selector.type) {
		case 'items':
			return 'materias seleccionadas';
		case 'tag':
			return `materias del grupo ${selector.tag}`;
		case 'section':
			return `materias de ${plan.sections.find((section) => section.id === selector.sectionId)?.label ?? selector.sectionId}`;
		case 'all':
			return selector.courseType
				? `materias ${{ mandatory: 'obligatorias', elective: 'electivas', optative: 'optativas' }[selector.courseType]}`
				: 'materias del plan';
		case 'sections': {
			const labels = selector.sectionIds.map(
				(id) => plan.sections.find((section) => section.id === id)?.label ?? id
			);
			const term = selector.term ? ` (${courseTermLabels[selector.term]})` : '';
			return `materias de ${labels.join(', ')}${term}`;
		}
	}
};

export const describeRequirement = (
	expr: RequirementExpr,
	plan: RequirementDescriptionPlan
): string => {
	const itemsById = new Map(plan.items.map((item) => [item.id, item]));

	const describe = (node: RequirementExpr): string => {
		if ('label' in node && node.label) return node.label;
		switch (node.type) {
			case 'item': {
				const target = itemsById.get(node.itemId);
				return `${target?.name ?? node.itemId} ${stateLabel(node.state, false, target?.kind === 'milestone')}`;
			}
			case 'all':
				return node.rules.map(describe).join('; y ');
			case 'any':
				return `alguna de estas opciones: ${node.rules.map(describe).join('; o ')}`;
			case 'countOf':
				return `${node.min} de estas opciones: ${node.rules.map(describe).join('; ')}`;
			case 'count':
				return `${node.min} ${selectorLabel(node.selector, plan)} ${stateLabel(node.state, true)}`;
			case 'percent':
				return `${node.minPercent}% de las ${selectorLabel(node.selector, plan)} ${stateLabel(node.state, true)}`;
			case 'sum':
				return `${node.min} ${node.metric === 'credits' ? 'créditos' : node.metric === 'totalHours' ? 'horas totales' : 'horas'} de ${selectorLabel(node.selector, plan)} ${stateLabel(node.state, true)}`;
		}
	};

	return describe(expr);
};

const directEnrollRequirementIds = (expr: RequirementExpr | undefined): string[] => {
	if (!expr) return [];
	switch (expr.type) {
		case 'item':
			return [expr.itemId];
		case 'all':
		case 'any':
		case 'countOf':
			return expr.rules.flatMap(directEnrollRequirementIds);
		case 'count':
		case 'percent':
		case 'sum':
			return [];
	}
};

const buildDependentCounts = (plan: StudyPlanData) => {
	const dependents = new Map<string, Set<string>>();
	for (const item of plan.items) {
		for (const requiredId of directEnrollRequirementIds(item.requirements?.enroll)) {
			const targets = dependents.get(requiredId) ?? new Set<string>();
			targets.add(item.id);
			dependents.set(requiredId, targets);
		}
	}

	return new Map(
		plan.items.map((item) => {
			const visited = new Set<string>();
			const queue = [item.id];
			while (queue.length > 0) {
				for (const dependentId of dependents.get(queue.shift()!) ?? []) {
					if (visited.has(dependentId)) continue;
					visited.add(dependentId);
					queue.push(dependentId);
				}
			}
			return [item.id, visited.size];
		})
	);
};

export const buildStudyPlanDocument = (source: StudyPlanData): StudyPlanDocument => {
	const plan = preparePlan(source).plan;
	const sectionsById = new Map(plan.sections.map((section) => [section.id, section]));
	const dependentCounts = buildDependentCounts(plan);
	const items = plan.items.map<StudyPlanDocumentItem>((item) => {
		const primarySection = sectionsById.get(item.placements[0]?.sectionId ?? '');
		return {
			item,
			sectionLabel: primarySection?.label ?? 'Hitos y requisitos adicionales',
			placements: item.placements.map((placement) => {
				const section = sectionsById.get(placement.sectionId);
				const term = placement.term ? courseTermLabels[placement.term] : undefined;
				return [section?.label ?? placement.sectionId, term].filter(Boolean).join(' · ');
			}),
			enrollRequirement: item.requirements?.enroll
				? describeRequirement(item.requirements.enroll, plan)
				: undefined,
			completeRequirement: item.requirements?.complete
				? describeRequirement(item.requirements.complete, plan)
				: undefined
		};
	});
	const priority = plan.items
		.filter((item) => item.kind === 'course')
		.map((item) => ({
			item,
			year: sectionsById.get(item.placements[0]?.sectionId ?? '')?.year,
			dependentCount: dependentCounts.get(item.id) ?? 0
		}))
		.sort(
			(a, b) =>
				b.dependentCount - a.dependentCount ||
				(a.year ?? Infinity) - (b.year ?? Infinity) ||
				a.item.name.localeCompare(b.item.name, 'es')
		);

	return {
		plan,
		durationYears: Math.max(0, ...plan.sections.map((section) => section.year ?? 0)),
		items,
		graduationRequirements: (plan.requirements?.graduation ?? []).map((requirement) => ({
			label: requirement.label,
			description: describeRequirement(requirement.expr, plan)
		})),
		priority
	};
};
