import { redirect } from '@sveltejs/kit';
import {
	collaborationUnavailable,
	createOrFindDraft,
	searchOffers
} from '$lib/collaboration/collaboration.server';
import { createDraftEnvelope } from '$lib/collaboration/draft-envelope';
import { newPlanSchema } from '$lib/new-plan-form';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const newPlanAdapter = zod4(newPlanSchema);

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	if (collaborationUnavailable())
		return {
			matches: [],
			offers: [],
			query,
			collaborationUnavailable: true,
			form: await superValidate(newPlanAdapter)
		};
	return {
		matches: query.trim() ? await searchOffers(query) : [],
		offers: await searchOffers(''),
		query,
		collaborationUnavailable: false,
		form: await superValidate(newPlanAdapter)
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.auth) redirect(303, '/auth/sign-in');
		if (collaborationUnavailable())
			return fail(503, {
				form: await superValidate(request, newPlanAdapter),
				error: 'La colaboración no está disponible. Intentá de nuevo.'
			});
		const form = await superValidate(request, newPlanAdapter);
		if (!form.valid) return fail(400, { form });
		let draft;
		try {
			draft = createDraftEnvelope({
				id: 'new-draft',
				offer: {
					university: form.data.university,
					faculty: form.data.faculty,
					offer: form.data.offer,
					campus: form.data.campus,
					modality: form.data.modality
				},
				year: form.data.year ? Number(form.data.year) : null,
				sources: form.data.sourceLabel
					? [{ label: form.data.sourceLabel, url: form.data.sourceUrl }]
					: [],
				content: {}
			});
		} catch {
			return setError(form, 'offer', 'Revisá los datos de la oferta.', { status: 400 });
		}
		let result;
		try {
			result = await createOrFindDraft(draft, locals.auth.subject);
		} catch {
			return fail(503, {
				form,
				error: 'No se pudo crear el borrador. Intentá de nuevo.'
			});
		}
		if (result.disposition === 'identity_ambiguous')
			return setError(
				form,
				'offer',
				'Ya hay ofertas parecidas sin facultad identificada. Buscá y compará antes de crear otra.',
				{ status: 409 }
			);
		if (result.isDraft) redirect(303, `/draft/${result.planId}`);
		if (!result.canonicalSlug)
			return fail(503, {
				form,
				error: 'No se pudo abrir el plan publicado. Intentá de nuevo.'
			});
		redirect(303, `/${result.canonicalSlug}`);
	}
};
