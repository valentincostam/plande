import { z } from 'zod';

const uuid = z.string().uuid('Identificador de propuesta inválido.');

export const proposalFormSchema = z.object({
	subject: uuid,
	requestId: uuid,
	baseSnapshotId: uuid,
	sourceSnapshotId: uuid,
	argument: z.string().trim().min(1, 'Escribí un argumento.').max(8_000, 'Máximo 8000 caracteres.')
});
