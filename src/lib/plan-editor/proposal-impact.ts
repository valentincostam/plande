import { reviewUnits, type ReviewUnit, type ReviewUnitsInput } from './review-units';

export type ProposalImpact = {
	added: ReviewUnit[];
	removed: ReviewUnit[];
	changed: Array<{ before: ReviewUnit; after: ReviewUnit }>;
	unchangedKeys: string[];
};

export const proposalImpact = (
	base: ReviewUnitsInput,
	candidate: ReviewUnitsInput
): ProposalImpact => {
	const previous = new Map(reviewUnits(base).units.map((unit) => [unit.key, unit]));
	const added: ReviewUnit[] = [];
	const changed: ProposalImpact['changed'] = [];
	const unchangedKeys: string[] = [];

	for (const after of reviewUnits(candidate).units) {
		const before = previous.get(after.key);
		if (!before) {
			added.push(after);
			continue;
		}
		previous.delete(after.key);
		if (
			before.fingerprint !== undefined &&
			after.fingerprint !== undefined &&
			before.fingerprint === after.fingerprint
		)
			unchangedKeys.push(after.key);
		else changed.push({ before, after });
	}

	return { added, removed: [...previous.values()], changed, unchangedKeys };
};
