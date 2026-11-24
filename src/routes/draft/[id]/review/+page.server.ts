import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { publishDraft, readPublicationStatus } from '$lib/collaboration/draft-publication.server';
import { readProposalComparison } from '$lib/collaboration/plan-proposal.server';
import {
	collaborationUnavailable,
	readDraft,
	readDraftEditor
} from '$lib/collaboration/collaboration.server';
import { draftReview } from '$lib/collaboration/draft-review.server';
import {
	addDraftDiscussion,
	readDraftDiscussions,
	resolveDraftObjection
} from '$lib/collaboration/draft-discussions.server';
import { parseDiscussionInput, parseResolutionInput } from '$lib/plan-editor/discussion-input';
import type { Actions, PageServerLoad } from './$types';

const revisionValue = (value: FormDataEntryValue | null) =>
	typeof value === 'string' && /^(0|[1-9]\d*)$/.test(value) ? Number(value) : NaN;

export const load: PageServerLoad = async ({ params, locals, url, setHeaders }) => {
	setHeaders({ 'Cache-Control': 'private, no-store' });
	if (collaborationUnavailable()) error(503, 'La colaboración no está disponible.');
	const draft = await readDraft(params.id);
	const publication = await readPublicationStatus(params.id);
	if (!draft) {
		if (publication?.published) redirect(303, `/${publication.canonicalSlug}`);
		error(404, 'No encontramos este borrador.');
	}
	const discussions = await readDraftDiscussions(params.id, locals.auth?.subject ?? null);
	const editor = await readDraftEditor(params.id);
	if (!draft || !editor) error(404, 'No encontramos este borrador.');
	const review = locals.auth ? (await draftReview(params.id, locals.auth.subject)).state : null;
	if (review) {
		draft.offer = review.identity;
		draft.year = review.identity.year ?? null;
		draft.sources = review.sources;
	}
	const comparisonSources = publication?.published
		? (review?.sources ??
			draft.sources.map((source, index) => ({ ...source, id: `public-source-${index}` })))
		: [];
	return {
		publication,
		comparisonSources,
		proposal: publication?.published
			? await readProposalComparison(params.id, locals.auth?.subject ?? null, comparisonSources)
			: null,
		discussions,
		publicationRequestId: crypto.randomUUID(),
		requestId: crypto.randomUUID(),
		resolutionRequestIds: Object.fromEntries(
			discussions.entries
				.filter((entry) => entry.kind === 'objection')
				.map((entry) => [entry.id, crypto.randomUUID()])
		),
		replyRequestIds: Object.fromEntries(
			discussions.entries
				.filter((entry) => entry.kind === 'objection')
				.map((entry) => [entry.id, crypto.randomUUID()])
		),
		draft,
		content: review?.content ?? editor.content,
		review,
		subject: locals.auth?.subject ?? null,
		invitationUrl: `${url.origin}${url.pathname}`
	};
};

export const actions: Actions = {
	publish: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para publicar el plan.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		const form = await request.formData();
		if (form.get('subject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá para continuar.' });
		const requestId = z.string().uuid().safeParse(form.get('requestId'));
		const reviewRevision = revisionValue(form.get('reviewRevision'));
		const discussionRevision = revisionValue(form.get('discussionRevision'));
		if (
			!requestId.success ||
			!Number.isSafeInteger(reviewRevision) ||
			!Number.isSafeInteger(discussionRevision)
		)
			return fail(400, {
				error: 'La solicitud de publicación no es válida. Recargá para continuar.'
			});
		let result;
		try {
			result = await publishDraft(params.id, locals.auth.subject, {
				requestId: requestId.data,
				reviewRevision,
				discussionRevision
			});
		} catch {
			return fail(503, {
				error: 'No pudimos confirmar la publicación. Volvé a intentar con esta misma solicitud.'
			});
		}
		if (result.disposition === 'base_obsolete')
			return fail(409, {
				error:
					'La publicación base cambió. Esta propuesta no se publicó ni reemplazó la versión vigente.'
			});
		if (result.disposition === 'version_conflict')
			return fail(409, {
				error:
					'El plan o la discusión cambiaron. Recargá para revisar la versión actual antes de publicar.'
			});
		if (result.disposition === 'blocked') {
			if (result.blockers.includes('year_conflict'))
				return fail(409, {
					error:
						'Ya existe otro plan de esta oferta con el año propuesto. No se publicó la corrección ni se trasladó el progreso.'
				});
			const message = result.blockers.includes('objections_pending')
				? 'Hay objeciones pendientes. Resolvelas antes de publicar.'
				: result.blockers.includes('reviews_missing')
					? 'Faltan dos revisiones completas y vigentes de estudiantes que no editaron el borrador.'
					: 'El borrador todavía tiene datos o autoría pendientes de completar. Revisalo antes de publicar.';
			return fail(400, { error: message });
		}
		if (!result.canonicalSlug)
			return fail(503, {
				error: 'No pudimos confirmar el enlace del plan publicado. Volvé a intentar.'
			});
		redirect(303, `/${result.canonicalSlug}`);
	},
	discuss: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para participar.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		const form = await request.formData();
		if (form.get('subject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá para continuar.' });
		const parsed = parseDiscussionInput({
			requestId: form.get('requestId'),
			reviewRevision: revisionValue(form.get('reviewRevision')),
			discussionRevision: revisionValue(form.get('discussionRevision')),
			kind: form.get('kind'),
			unitKey: form.get('unitKey'),
			argument: form.get('argument'),
			sourceId: form.get('sourceId'),
			locator: form.get('locator') ?? '',
			...(form.get('parentId') ? { parentId: form.get('parentId') } : {})
		});
		if (!parsed.success) return fail(400, { error: parsed.error });
		try {
			const result = await addDraftDiscussion(params.id, locals.auth.subject, parsed.data);
			if (result.disposition === 'version_conflict')
				return fail(409, {
					error: 'El plan o la discusión cambiaron. Conservá tu texto y recargá antes de enviarlo.'
				});
		} catch {
			return fail(400, { error: 'No pudimos guardar el aporte. Revisá el contexto y la fuente.' });
		}
		return { discussionSaved: true };
	},
	resolveObjection: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para participar.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		const form = await request.formData();
		if (form.get('subject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá para continuar.' });
		const parsed = parseResolutionInput({
			requestId: form.get('requestId'),
			discussionId: form.get('discussionId'),
			reviewRevision: revisionValue(form.get('reviewRevision')),
			discussionRevision: revisionValue(form.get('discussionRevision')),
			action: form.get('action'),
			argument: form.get('argument'),
			sourceId: form.get('sourceId'),
			locator: form.get('locator') ?? '',
			newEvidence: form.get('newEvidence') ?? ''
		});
		if (!parsed.success) return fail(400, { error: parsed.error });
		try {
			const result = await resolveDraftObjection(params.id, locals.auth.subject, parsed.data);
			if (result.disposition === 'version_conflict')
				return fail(409, {
					error: 'El plan o la discusión cambiaron. Conservá tu texto y recargá antes de concluir.'
				});
		} catch {
			return fail(400, {
				error:
					'La conclusión necesita un participante ajeno a la disputa. Para cerrar una corrección, comprobá de nuevo el contenido afectado; para reabrir, aportá evidencia nueva.'
			});
		}
		return { discussionSaved: true };
	},
	review: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para guardar tu revisión.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		const form = await request.formData();
		if (form.get('subject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá antes de continuar.' });
		const rawRevision = form.get('revision');
		if (
			typeof rawRevision !== 'string' ||
			!/^(0|[1-9]\d*)$/.test(rawRevision) ||
			!Number.isSafeInteger(Number(rawRevision))
		)
			return fail(400, { error: 'La revisión no es válida.' });
		const revision = Number(rawRevision);
		const operation = form.get('operation');
		const key = form.get('key');
		if (
			operation !== 'approve' &&
			(operation !== 'check' || typeof key !== 'string' || key.length > 300)
		)
			return fail(400, { error: 'Elegí qué contenido querés comprobar.' });
		try {
			const { result } = await draftReview(
				params.id,
				locals.auth.subject,
				operation === 'approve'
					? { type: 'approve', revision }
					: {
							type: 'check',
							revision,
							key: String(key),
							sourcesOpened: form.get('sourcesOpened') === 'yes'
						}
			);
			if (result === 'stale')
				return fail(409, {
					error:
						'El plan cambió. Recargá para revisar la versión actual; conservamos las comprobaciones que siguen vigentes.'
				});
			if (result === 'ineligible')
				return fail(403, { error: 'Los coautores no pueden aprobar su propio borrador.' });
			if (result === 'incomplete')
				return fail(400, {
					error:
						'Falta comprobar contenido o resolver dudas. Confirmá también que pudiste abrir las fuentes sin pedir acceso.'
				});
		} catch {
			return fail(400, { error: 'No pudimos guardar la revisión. Recargá y volvé a intentar.' });
		}
		redirect(303, `/draft/${params.id}/review`);
	}
};
