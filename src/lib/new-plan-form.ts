import { z } from 'zod';

const optionalText = z.string().trim().max(2_000).optional().default('');

export const newPlanSchema = z
	.object({
		university: z.string().trim().min(1, 'Indicá la universidad.').max(2_000),
		faculty: z.string().trim().min(1, 'Indicá la facultad.').max(2_000),
		offer: z.string().trim().min(1, 'Indicá el nombre de la oferta.').max(2_000),
		campus: optionalText,
		modality: optionalText,
		year: z
			.string()
			.trim()
			.optional()
			.default('')
			.refine(
				(value) =>
					value === '' || (/^[+-]?\d+$/.test(value) && Number.isSafeInteger(Number(value))),
				'Indicá un año válido o dejalo vacío.'
			),
		sourceLabel: optionalText,
		sourceUrl: z.string().trim().max(2_048).optional().default('')
	})
	.superRefine((value, context) => {
		if (value.sourceLabel || value.sourceUrl) {
			if (!value.sourceLabel)
				context.addIssue({ code: 'custom', path: ['sourceLabel'], message: 'Indicá la etiqueta.' });
			if (!value.sourceUrl) {
				context.addIssue({ code: 'custom', path: ['sourceUrl'], message: 'Indicá el enlace.' });
				return;
			}
			try {
				const url = new URL(value.sourceUrl);
				if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
			} catch {
				context.addIssue({
					code: 'custom',
					path: ['sourceUrl'],
					message: 'Indicá un enlace http o https.'
				});
			}
		}
	});
