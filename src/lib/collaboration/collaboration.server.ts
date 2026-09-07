import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import type { DraftEnvelope, DraftSource } from './draft-envelope';

type DraftRow = {
	plan_id: string;
	university_name: string;
	faculty_name: string;
	offer_name: string;
	campus: string | null;
	modality: string | null;
	plan_year: number | null;
	content: Record<string, unknown>;
	sources: DraftSource[];
};

export type OfferMatch = {
	university: string;
	faculty: string | null;
	offer: string;
	campus?: string;
	modality?: string;
	planId: string;
	canonicalSlug: string | null;
	year: number | null;
	isDraft: boolean;
	sources: DraftSource[];
};

export type CreateDraftResult =
	| {
			planId: string;
			disposition: 'created' | 'existing';
			year: number | null;
			isDraft: boolean;
			canonicalSlug: string | null;
	  }
	| { planId: null; disposition: 'identity_ambiguous'; year: null };

export type SetDraftYearResult =
	| { disposition: 'updated' | 'unchanged'; planId: string; conflictingPlanId: null }
	| { disposition: 'year_conflict'; planId: string; conflictingPlanId: string };

let client: postgres.Sql | undefined;

const getClient = () => {
	const connection = env.COLLABORATION_DATABASE_URL;
	if (!connection) return undefined;
	client ??= postgres(connection, { max: 2, idle_timeout: 10, connect_timeout: 5 });
	return client;
};

const mapOffer = (row: {
	university_name: string;
	faculty_name: string | null;
	offer_name: string;
	campus: string | null;
	modality: string | null;
}) => ({
	university: row.university_name,
	faculty: row.faculty_name,
	offer: row.offer_name,
	...(row.campus ? { campus: row.campus } : {}),
	...(row.modality ? { modality: row.modality } : {})
});

export const collaborationUnavailable = () => !getClient();

export const searchOffers = async (query: string): Promise<OfferMatch[]> => {
	const sql = getClient();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const rows = await sql<
		Array<{
			offer_id: string;
			university_name: string;
			faculty_name: string | null;
			offer_name: string;
			campus: string | null;
			modality: string | null;
			plan_id: string;
			canonical_slug: string | null;
			plan_year: number | null;
			is_draft: boolean;
			sources: DraftSource[];
		}>
	>`select * from plan_collaboration.search_offers(${query})`;
	return rows.map((row) => ({
		...mapOffer(row),
		planId: row.plan_id,
		canonicalSlug: row.canonical_slug,
		year: row.plan_year,
		isDraft: row.is_draft,
		sources: row.sources
	}));
};

export const createOrFindDraft = async (
	draft: Omit<DraftEnvelope, 'id' | 'content'>,
	actor: string
): Promise<CreateDraftResult> => {
	const sql = getClient();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const row = await sql.begin(async (transaction) => {
		const [result] = await transaction<
			Array<{
				plan_id: string | null;
				disposition: 'created' | 'existing' | 'identity_ambiguous';
				plan_year: number | null;
			}>
		>`select * from plan_collaboration.create_or_find_draft(
			${draft.offer.university},
			${draft.offer.faculty},
			${draft.offer.offer},
			${draft.offer.campus ?? null},
			${draft.offer.modality ?? null},
			${draft.year},
			${transaction.json(draft.sources)},
			${actor}::uuid
		)`;
		if (!result || result.disposition === 'identity_ambiguous') return result;
		if (!result.plan_id) throw new Error('Collaboration database returned an invalid draft.');
		const [metadata] = await transaction<
			Array<{ is_draft: boolean; canonical_slug: string | null }>
		>`
			select is_draft, canonical_slug
			from plan_collaboration.search_offers(${draft.offer.university})
			where plan_id = ${result.plan_id}::uuid
		`;
		if (!metadata) throw new Error('Collaboration database returned no draft metadata.');
		return { ...result, ...metadata };
	});
	if (!row) throw new Error('Collaboration database returned no draft.');
	if (row.disposition === 'identity_ambiguous')
		return { planId: null, disposition: 'identity_ambiguous', year: null };
	const metadataRow = row as typeof row & { is_draft?: unknown; canonical_slug?: unknown };
	if (metadataRow.disposition === 'identity_ambiguous')
		throw new Error('Collaboration database returned an invalid draft.');
	if (
		!metadataRow.plan_id ||
		typeof metadataRow.is_draft !== 'boolean' ||
		(metadataRow.canonical_slug !== null && typeof metadataRow.canonical_slug !== 'string')
	)
		throw new Error('Collaboration database returned an invalid draft.');
	return {
		planId: metadataRow.plan_id,
		disposition: metadataRow.disposition,
		year: metadataRow.plan_year,
		isDraft: metadataRow.is_draft,
		canonicalSlug: metadataRow.canonical_slug
	};
};

export const setDraftYear = async (
	planId: string,
	year: number,
	actor: string
): Promise<SetDraftYearResult> => {
	const sql = getClient();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const row = await sql.begin(async (transaction) => {
		const [result] = await transaction<
			Array<{
				plan_id: string;
				disposition: SetDraftYearResult['disposition'];
				conflicting_plan_id: string | null;
			}>
		>`select * from plan_collaboration.set_draft_year(${planId}::uuid, ${year}, ${actor}::uuid)`;
		return result;
	});
	if (!row) throw new Error('Collaboration database returned no year result.');
	if (row.disposition === 'year_conflict' && row.conflicting_plan_id)
		return {
			disposition: 'year_conflict',
			planId: row.plan_id,
			conflictingPlanId: row.conflicting_plan_id
		};
	if (row.disposition === 'updated' || row.disposition === 'unchanged')
		return { disposition: row.disposition, planId: row.plan_id, conflictingPlanId: null };
	throw new Error('Collaboration database returned an invalid year result.');
};

export const readDraft = async (planId: string): Promise<DraftEnvelope | undefined> => {
	const sql = getClient();
	if (!sql) throw new Error('Collaboration database is unavailable.');
	const [row] = await sql<DraftRow[]>`select * from plan_collaboration.read_draft(${planId}::uuid)`;
	if (!row) return undefined;
	return {
		id: row.plan_id,
		offer: {
			university: row.university_name,
			faculty: row.faculty_name,
			offer: row.offer_name,
			...(row.campus ? { campus: row.campus } : {}),
			...(row.modality ? { modality: row.modality } : {})
		},
		year: row.plan_year,
		sources: row.sources,
		content: row.content
	};
};
