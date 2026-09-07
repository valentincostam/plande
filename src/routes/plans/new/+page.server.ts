import { fail, redirect } from '@sveltejs/kit';
import {
	collaborationUnavailable,
	createOrFindDraft,
	searchOffers
} from '$lib/collaboration/collaboration.server';
import { createDraftEnvelope } from '$lib/collaboration/draft-envelope';
import type { Actions, PageServerLoad } from './$types';

const readText = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value : '');

const readYear = (value: FormDataEntryValue | null) => {
	const text = readText(value).trim();
	return text ? Number(text) : null;
};

const readSources = (form: FormData) => {
	const label = readText(form.get('source-label'));
	const url = readText(form.get('source-url'));
	return label || url ? [{ label, url }] : [];
};

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') ?? '';
	if (collaborationUnavailable()) return { matches: [], query, collaborationUnavailable: true };
	return {
		matches: query.trim() ? await searchOffers(query) : [],
		query,
		collaborationUnavailable: false
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.auth) redirect(303, '/auth/sign-in');
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible. Intentá de nuevo.' });
		const form = await request.formData();
		let result;
		try {
			const draft = createDraftEnvelope({
				id: 'new-draft',
				offer: {
					university: readText(form.get('university')),
					faculty: readText(form.get('faculty')),
					offer: readText(form.get('offer')),
					campus: readText(form.get('campus')),
					modality: readText(form.get('modality'))
				},
				year: readYear(form.get('year')),
				sources: readSources(form),
				content: {}
			});
			result = await createOrFindDraft(draft, locals.auth.subject);
		} catch (error) {
			if (error instanceof Error) return fail(400, { error: error.message });
			return fail(503, { error: 'No se pudo crear el borrador. Intentá de nuevo.' });
		}
		if (result.disposition === 'identity_ambiguous')
			return fail(409, {
				error:
					'Ya hay ofertas parecidas sin facultad identificada. Buscá y compará antes de crear otra.'
			});
		if (result.isDraft) redirect(303, `/draft/${result.planId}`);
		if (!result.canonicalSlug)
			return fail(503, { error: 'No se pudo abrir el plan publicado. Intentá de nuevo.' });
		redirect(303, `/${result.canonicalSlug}`);
	}
};
