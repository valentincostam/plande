import { z } from 'zod';

const safeRevision = z.number().int().nonnegative().refine(Number.isSafeInteger);

const discussionInputSchema = z
	.strictObject({
		requestId: z.string().uuid(),
		reviewRevision: safeRevision,
		discussionRevision: safeRevision,
		kind: z.enum(['comment', 'objection']),
		unitKey: z.string().min(1).max(300),
		argument: z.string().trim().min(1).max(8000),
		sourceId: z.string().guid(),
		locator: z.string().trim().max(1000),
		parentId: z.string().uuid().optional()
	})
	.refine((input) => input.kind === 'comment' || input.parentId === undefined, {
		path: ['parentId'],
		message: 'Una objeción inicial no puede responder a otro aporte.'
	});

export type DiscussionInput = z.infer<typeof discussionInputSchema>;

export type DiscussionInputResult =
	| { success: true; data: DiscussionInput }
	| { success: false; error: string };

const resolutionInputSchema = z
	.strictObject({
		requestId: z.string().uuid(),
		discussionId: z.string().uuid(),
		reviewRevision: safeRevision,
		discussionRevision: safeRevision,
		action: z.enum(['confirm', 'dismiss', 'reopen', 'correct']),
		argument: z.string().trim().min(1).max(8000),
		sourceId: z.string().guid(),
		locator: z.string().trim().max(1000),
		newEvidence: z.string().trim().max(8000)
	})
	.refine((input) => input.action !== 'reopen' || input.newEvidence.length > 0, {
		path: ['newEvidence'],
		message: 'Reabrir requiere evidencia nueva.'
	});

export type ResolutionInput = z.infer<typeof resolutionInputSchema>;

export type ResolutionInputResult =
	| { success: true; data: ResolutionInput }
	| { success: false; error: string };

const messages: Record<string, string> = {
	requestId: 'El identificador de solicitud no es válido.',
	reviewRevision: 'La revisión no es válida.',
	discussionRevision: 'La revisión de discusión no es válida.',
	kind: 'El tipo de aporte no es válido.',
	unitKey: 'El contenido referido no es válido.',
	argument: 'El argumento debe tener entre 1 y 8000 caracteres.',
	sourceId: 'La fuente no es válida.',
	locator: 'La referencia debe tener hasta 1000 caracteres.'
};

export const parseDiscussionInput = (input: unknown): DiscussionInputResult => {
	const parsed = discussionInputSchema.safeParse(input);
	if (parsed.success) return parsed;
	const issue = parsed.error.issues[0];
	if (issue.code === 'unrecognized_keys')
		return { success: false, error: 'El aporte contiene campos no permitidos.' };
	if (issue.path[0] === 'parentId' && issue.code === 'custom')
		return { success: false, error: 'Una objeción inicial no puede responder a otro aporte.' };
	const field = typeof issue.path[0] === 'string' ? issue.path[0] : '';
	return { success: false, error: messages[field] ?? 'El aporte no es válido.' };
};

export const parseResolutionInput = (input: unknown): ResolutionInputResult => {
	const parsed = resolutionInputSchema.safeParse(input);
	if (parsed.success) return parsed;
	const issue = parsed.error.issues[0];
	if (issue.code === 'unrecognized_keys')
		return { success: false, error: 'La resolución contiene campos no permitidos.' };
	if (issue.path[0] === 'newEvidence' && issue.code === 'custom')
		return { success: false, error: 'Reabrir requiere evidencia nueva.' };
	const field = typeof issue.path[0] === 'string' ? issue.path[0] : '';
	return {
		success: false,
		error:
			field === 'discussionId'
				? 'La discusión no es válida.'
				: field === 'action'
					? 'La acción no es válida.'
					: field === 'newEvidence'
						? 'La evidencia nueva debe tener hasta 8000 caracteres.'
						: (messages[field] ?? 'La resolución no es válida.')
	};
};
