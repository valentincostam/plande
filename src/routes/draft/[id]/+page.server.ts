import { error, fail } from '@sveltejs/kit';
import {
	collaborationUnavailable,
	readDraft,
	searchOffers,
	setDraftYear
} from '$lib/collaboration/collaboration.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (collaborationUnavailable()) error(503, 'La colaboración no está disponible.');
	const draft = await readDraft(params.id);
	if (!draft) error(404, 'No encontramos este borrador.');
	return { draft };
};

export const actions: Actions = {
	setYear: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para continuar este borrador.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible. Intentá de nuevo.' });
		const value = (await request.formData()).get('year');
		const text = typeof value === 'string' ? value.trim() : '';
		const year = text === '' ? Number.NaN : Number(text);
		if (!Number.isInteger(year)) return fail(400, { error: 'Indicá un año de plan válido.' });
		try {
			const result = await setDraftYear(params.id, year, locals.auth.subject);
			if (result.disposition === 'year_conflict') {
				const target = (await searchOffers('')).find(
					(match) => match.planId === result.conflictingPlanId
				);
				const conflictingHref = target?.isDraft
					? `/draft/${target.planId}`
					: target?.canonicalSlug
						? `/${target.canonicalSlug}`
						: undefined;
				return fail(409, {
					error: 'Ya existe otro plan para esta oferta y ese año. No se modificó este borrador.',
					conflictingHref
				});
			}
			return { year: result.disposition === 'updated' ? year : undefined };
		} catch {
			return fail(503, { error: 'No se pudo actualizar el año. Intentá de nuevo.' });
		}
	}
};
