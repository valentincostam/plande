import { error, fail, isRedirect, redirect } from '@sveltejs/kit';
import {
	collaborationUnavailable,
	readDraft,
	readDraftEditor,
	readDraftRevision,
	saveDraftDocument,
	searchOffers,
	setDraftYear
} from '$lib/collaboration/collaboration.server';
import { mergeSectionPatches, parseSectionPatches } from '$lib/plan-editor/section-patches.server';
import { isEmptyDraft, parseDraftImport } from '$lib/plan-editor/draft-import';
import { addDraftSource } from '$lib/collaboration/draft-review.server';
import { readPublicationStatus } from '$lib/collaboration/draft-publication.server';
import { readProposalComparison } from '$lib/collaboration/plan-proposal.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (collaborationUnavailable()) error(503, 'La colaboración no está disponible.');
	const draft = await readDraft(params.id);
	const publication = await readPublicationStatus(params.id);
	if (!draft) {
		if (publication?.published) redirect(303, `/${publication.canonicalSlug}`);
		error(404, 'No encontramos este borrador.');
	}
	const editor = await readDraftEditor(params.id);
	const comparison = publication?.published
		? await readProposalComparison(params.id, null, [])
		: null;
	const proposal = comparison
		? {
				proposalRound: comparison.proposalRound,
				baseSnapshotId: comparison.baseSnapshotId,
				sourceSnapshotId: comparison.sourceSnapshotId,
				argument: comparison.argument
			}
		: null;
	return {
		draft,
		editor,
		publication,
		proposal,
		publishedItemIds: comparison?.publishedItemIds ?? [],
		pendingYear: Boolean(
			comparison && comparison.before.identity.year == null && draft.year !== null
		),
		auth: Boolean(locals.auth),
		editorSubject: locals.auth?.subject ?? null
	};
};

export const actions: Actions = {
	addSource: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para agregar una fuente.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		const form = await request.formData();
		if (form.get('editorSubject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá para continuar.' });
		const revision = form.get('reviewRevision');
		const label = form.get('source-label');
		const sourceUrl = form.get('source-url');
		if (
			typeof revision !== 'string' ||
			!/^(0|[1-9]\d*)$/.test(revision) ||
			!Number.isSafeInteger(Number(revision)) ||
			typeof label !== 'string' ||
			!label.trim() ||
			label.length > 2000 ||
			typeof sourceUrl !== 'string' ||
			sourceUrl.length > 2048
		)
			return fail(400, { error: 'Completá la etiqueta y el enlace de la fuente.' });
		try {
			if (!['https:', 'http:'].includes(new URL(sourceUrl).protocol))
				return fail(400, { error: 'Usá un enlace http o https.' });
			const result = await addDraftSource(
				params.id,
				Number(revision),
				label,
				sourceUrl,
				locals.auth.subject
			);
			if (result === 'version_conflict')
				return fail(409, { error: 'El borrador cambió. Recargá antes de agregar la fuente.' });
		} catch {
			return fail(400, {
				error: 'No pudimos agregar la fuente. Revisá el enlace y volvé a intentar.'
			});
		}
		return { sourceAdded: true };
	},
	importDraft: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para importar un borrador.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible.' });
		try {
			const reader = request.body?.getReader();
			if (!reader) return fail(400, { error: 'Pegá la respuesta de tu IA.' });
			const chunks: Uint8Array<ArrayBuffer>[] = [];
			let size = 0;
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					size += value.byteLength;
					if (size > 2 * 1024 * 1024) {
						await reader.cancel();
						return fail(413, { error: 'La respuesta es demasiado grande para importar.' });
					}
					chunks.push(new Uint8Array(value));
				}
			} finally {
				reader.releaseLock();
			}
			const form = await new Response(new Blob(chunks), {
				headers: { 'Content-Type': request.headers.get('content-type') ?? '' }
			}).formData();
			if (form.get('editorSubject') !== locals.auth.subject)
				return fail(409, { error: 'La cuenta cambió en otra pestaña. Recargá para continuar.' });
			const rawVersion = form.get('baseVersion');
			if (typeof rawVersion !== 'string' || !/^(0|[1-9]\d*)$/.test(rawVersion))
				return fail(400, { error: 'La versión del borrador no es válida.' });
			const expectedVersion = Number(rawVersion);
			if (!Number.isSafeInteger(expectedVersion))
				return fail(400, { error: 'La versión del borrador no es válida.' });
			const raw = form.get('json');
			if (typeof raw !== 'string') return fail(400, { error: 'Pegá la respuesta de tu IA.' });
			const imported = parseDraftImport(raw);
			if (!imported.ok)
				return fail(400, {
					error: 'Revisá la respuesta antes de importar.',
					importDiagnostics: imported.diagnostics
				});
			const current = await readDraftEditor(params.id);
			if (!current) return fail(404, { error: 'No encontramos este borrador.' });
			if (current.version !== expectedVersion || !isEmptyDraft(current.content))
				return fail(409, {
					error:
						'El borrador cambió o ya tiene contenido. No importamos ni reemplazamos ese trabajo.'
				});
			const saved = await saveDraftDocument(
				params.id,
				expectedVersion,
				imported.content,
				locals.auth.subject
			);
			if (saved.disposition === 'version_conflict')
				return fail(409, {
					error:
						'El borrador cambió mientras confirmabas. No importamos ni reemplazamos ese trabajo.'
				});
			redirect(303, `/draft/${params.id}`);
		} catch (exception) {
			if (isRedirect(exception)) throw exception;
			return fail(400, {
				error: 'No pudimos importar. Conservá la respuesta y volvé a intentarlo.'
			});
		}
	},
	editSections: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para editar este borrador.' });
		try {
			const form = await request.formData();
			if (form.get('editorSubject') !== locals.auth.subject)
				return fail(409, {
					error: 'La cuenta cambió en otra pestaña. Recargá para continuar.',
					accountChanged: true
				});
			const baseText = form.get('baseVersion');
			if (typeof baseText !== 'string' || !/^(0|[1-9]\d*)$/.test(baseText))
				return fail(400, { error: 'La versión del borrador no es válida.' });
			const baseVersion = Number(baseText);
			if (!Number.isSafeInteger(baseVersion))
				return fail(400, { error: 'La versión del borrador no es válida.' });
			const rawPatches = form.get('patches');
			const operation = form.get('operation');
			const patches = parseSectionPatches(
				rawPatches
					? JSON.parse(String(rawPatches))
					: operation === 'create'
						? [
								{
									op: 'section.create',
									section: { id: String(form.get('sectionId')), label: String(form.get('label')) }
								}
							]
						: operation === 'rename'
							? [
									{
										op: 'section.rename',
										sectionId: String(form.get('sectionId')),
										label: String(form.get('label'))
									}
								]
							: operation === 'course-create'
								? [
										{
											op: 'course.create',
											item: {
												id: String(form.get('itemId')),
												placementId: String(form.get('placementId')),
												sectionId: String(form.get('sectionId')),
												name: String(form.get('label'))
											}
										}
									]
								: []
			);
			const recoveryVersions = [
				...new Set(
					patches.flatMap((patch) =>
						patch.op === 'item.restore' || patch.op === 'section.restore'
							? [patch.historyVersion]
							: []
					)
				)
			];
			const [base, current, ...recoveries] = await Promise.all([
				readDraftRevision(params.id, baseVersion),
				readDraftEditor(params.id),
				...recoveryVersions.map((historyVersion) => readDraftRevision(params.id, historyVersion))
			]);
			if (!base || !current) return fail(404, { error: 'No encontramos este borrador.' });
			const history = new Map<number, typeof base.content>([[baseVersion, base.content]]);
			for (const [index, recovery] of recoveries.entries()) {
				if (!recovery)
					return fail(409, {
						error: 'No encontramos la revisión necesaria para recuperar ese cambio.',
						conflicts:
							recoveryVersions[index] === undefined ? [] : [String(recoveryVersions[index])],
						editorConflict: { content: current.content, version: current.version }
					});
				history.set(recoveryVersions[index], recovery.content);
			}
			const merged = mergeSectionPatches(base.content, current.content, patches, history);
			if ('conflicts' in merged)
				return fail(409, {
					error: patches.some(
						(patch) => patch.op === 'item.restore' || patch.op === 'section.restore'
					)
						? 'No se pudo recuperar ese cambio porque faltan dependencias o ya existe contenido distinto.'
						: 'Otro cambio modificó esta sección.',
					conflicts: merged.conflicts,
					...(merged.diagnostics ? { diagnostics: merged.diagnostics } : {}),
					editorConflict: { content: current.content, version: current.version }
				});
			const saved = await saveDraftDocument(
				params.id,
				current.version,
				merged.content,
				locals.auth.subject
			);
			if (saved.disposition === 'version_conflict') {
				const latest = await readDraftEditor(params.id);
				if (!latest) return fail(404, { error: 'No encontramos este borrador.' });
				return fail(409, {
					error: 'El borrador cambió mientras guardábamos. Reintentá.',
					conflicts: [],
					editorConflict: { content: latest.content, version: latest.version }
				});
			}
			redirect(303, `/draft/${params.id}`);
		} catch (exception) {
			if (isRedirect(exception)) throw exception;
			return fail(400, { error: 'No pudimos guardar ese cambio.' });
		}
	},
	setYear: async ({ request, params, locals }) => {
		if (!locals.auth) return fail(401, { error: 'Iniciá sesión para continuar este borrador.' });
		if (collaborationUnavailable())
			return fail(503, { error: 'La colaboración no está disponible. Intentá de nuevo.' });
		const form = await request.formData();
		if (form.get('editorSubject') !== locals.auth.subject)
			return fail(409, { error: 'La cuenta cambió. Recargá para continuar.' });
		const value = form.get('year');
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
