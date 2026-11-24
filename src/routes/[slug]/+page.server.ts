import { decodeItemStates } from '$lib/study-plan-url-state';
import { decodeGrades } from '$lib/grade-encoding';
import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getCanonicalStudyPlanSlug } from './data/study-plan-loaders';
import { studyPlanReader } from './data/study-plan-reader.server';
import { loadPrivateProgressPlanId } from '$lib/private-progress/plan-identity.server';
import { collaborationUnavailable } from '$lib/collaboration/collaboration.server';
import { readPublicationStatus } from '$lib/collaboration/draft-publication.server';
import {
	openPlanProposal,
	readPublicProposal,
	readPlanHistory,
	type PlanHistoryEntry
} from '$lib/collaboration/plan-proposal.server';
import { proposalFormSchema } from '$lib/plan-editor/proposal-form';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { randomUUID } from 'node:crypto';

const proposalAdapter = zod4(proposalFormSchema);

export const load: PageServerLoad = async ({ params, url, locals }) => {
	const slug = params.slug.toLowerCase();
	const canonicalSlug = getCanonicalStudyPlanSlug(slug);
	const publishedPlan = await studyPlanReader.loadPlanWithProgress(canonicalSlug);

	if (!publishedPlan) error(404, { message: 'Not found' });
	const nativeStudyPlan = publishedPlan.document;
	if (slug !== canonicalSlug) {
		const searchParams = url.searchParams.toString();
		redirect(301, `/${canonicalSlug}${searchParams ? `?${searchParams}` : ''}`);
	}

	const stateLetters = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeLetters = url.searchParams.get('n') || url.searchParams.get('notas');
	const strictMode = url.searchParams.get('r') || url.searchParams.get('estricto');
	const showCodesParam = url.searchParams.get('c') || url.searchParams.get('codigos');
	const collaborationAvailable = !collaborationUnavailable();
	let publicPlanId: string | undefined;
	if (locals.auth || collaborationAvailable) {
		try {
			publicPlanId = await loadPrivateProgressPlanId(canonicalSlug);
		} catch {
			publicPlanId = undefined;
		}
	}
	let publication: { publishedAt: string } | undefined;
	let publicationHistory: PlanHistoryEntry[] = [];
	let proposal:
		| { planId: string; active: boolean; form: Awaited<ReturnType<typeof createProposalForm>> }
		| undefined;
	if (collaborationAvailable && publicPlanId) {
		try {
			const status = await readPublicationStatus(publicPlanId);
			if (status?.publishedAt) publication = { publishedAt: status.publishedAt };
			try {
				publicationHistory = await readPlanHistory(publicPlanId);
			} catch {
				publicationHistory = [];
			}
			if (locals.auth && status?.snapshotId) {
				try {
					const active = await readPublicProposal(publicPlanId);
					proposal = {
						planId: publicPlanId,
						active: active !== null,
						form: await createProposalForm(
							locals.auth.subject,
							publishedPlan.snapshotId ?? status.snapshotId
						)
					};
				} catch {
					proposal = undefined;
				}
			}
		} catch {
			publication = undefined;
		}
	}

	return {
		studyPlan: studyPlanDataToCatalogEntry(nativeStudyPlan),
		nativeStudyPlan,
		progressItemIds: publishedPlan.progressItemIds,
		progressItemKinds: publishedPlan.progressItemKinds,
		publicationSnapshotId: publishedPlan.snapshotId,
		slug,
		planId: locals.auth ? publicPlanId : undefined,
		publication,
		publicationHistory,
		proposal,
		privateProgressUnavailable: Boolean(locals.auth && !publicPlanId),
		itemStates: stateLetters ? decodeItemStates(stateLetters) : [],
		itemGrades: gradeLetters ? decodeGrades(gradeLetters) : [],
		isStrictModeEnabled: strictMode ? strictMode === 'si' : true,
		showCodes: showCodesParam ? showCodesParam === 'si' : false
	};
};

const createProposalForm = (subject: string, snapshotId: string) =>
	superValidate(
		{
			subject,
			requestId: randomUUID(),
			baseSnapshotId: snapshotId,
			sourceSnapshotId: snapshotId,
			argument: ''
		},
		proposalAdapter,
		{ errors: false }
	);

export const actions = {
	propose: async ({ request, params, locals }) => {
		if (!locals.auth) redirect(303, '/auth/sign-in');
		const form = await superValidate(request, proposalAdapter);
		if (!form.valid) return fail(400, { form, error: undefined, proposalPlanId: undefined });
		if (form.data.subject !== locals.auth.subject)
			return fail(409, {
				form,
				error: 'La cuenta cambió. Recargá antes de proponer una corrección.'
			});
		if (collaborationUnavailable())
			return fail(503, { form, error: 'Las propuestas no están disponibles. Intentá de nuevo.' });
		let planId: string | undefined;
		let result;
		try {
			planId = await loadPrivateProgressPlanId(
				getCanonicalStudyPlanSlug(params.slug.toLowerCase())
			);
			if (!planId) return fail(404, { form, error: 'No se encontró el plan publicado.' });
			const { requestId, baseSnapshotId, sourceSnapshotId, argument } = form.data;
			result = await openPlanProposal(
				planId,
				{ requestId, baseSnapshotId, sourceSnapshotId, argument },
				locals.auth.subject
			);
		} catch {
			return fail(503, {
				form,
				error: 'No se pudo abrir la propuesta. Tu argumento se conserva; intentá de nuevo.'
			});
		}
		if (result.disposition === 'active')
			return fail(409, {
				form,
				proposalPlanId: planId,
				error: 'Ya hay una propuesta en curso. Tu argumento no se agregó a ella.'
			});
		if (result.disposition === 'base_obsolete')
			return fail(409, {
				form,
				error:
					'El plan publicado cambió. Conservá tu argumento y revisá la publicación actual antes de volver a proponer.'
			});
		redirect(303, `/draft/${planId}`);
	}
} satisfies Actions;
