import { env } from '$env/dynamic/private';
import { preparePlan } from '$lib/prepare-plan';
import type { StudyPlanCatalogEntry } from '$lib/study-plan';
import type { StudyPlanData } from '$lib/study-plan-data';
import { studyPlanDocumentSchema, studyPlanCatalogSchema } from '$lib/study-plan-schema';
import { studyPlanCatalog } from './study-plan-catalog';
import { loadStudyPlan } from './study-plan-loaders';

type StudyPlanReader = {
	loadCatalog: () => Promise<StudyPlanCatalogEntry[]>;
	loadPlan: (slug: string) => Promise<StudyPlanData | undefined>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

export const parseStudyPlanDocument = (value: unknown): StudyPlanData => {
	const parsed = studyPlanDocumentSchema.safeParse(value);
	if (!parsed.success) throw new Error('Supabase returned an invalid study plan document.');
	try {
		preparePlan(parsed.data);
	} catch {
		throw new Error('Supabase returned an invalid study plan document.');
	}
	return parsed.data;
};

const getJson = async (path: string): Promise<unknown> => {
	const url = env.SUPABASE_URL?.replace(/\/$/, '');
	const key = env.SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_ANON_KEY;
	if (!url || !key)
		throw new Error('Supabase reader requires SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
	const response = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key } });
	if (!response.ok) throw new Error(`Supabase reader failed with ${response.status}.`);
	return response.json();
};

export const createSupabaseStudyPlanReader = (
	getJson: (path: string) => Promise<unknown>
): StudyPlanReader => ({
	async loadCatalog() {
		const rows = await getJson('study_plan_catalog?select=catalog&order=canonical_slug');
		if (!Array.isArray(rows) || !rows.every((row) => isRecord(row) && 'catalog' in row)) {
			throw new Error('Supabase returned an invalid study plan catalog.');
		}
		const parsed = studyPlanCatalogSchema.safeParse(rows.map((row) => row.catalog));
		if (!parsed.success) throw new Error('Supabase returned an invalid study plan catalog.');
		return parsed.data;
	},
	async loadPlan(slug) {
		const rows = await getJson(
			`study_plan_published?slug=eq.${encodeURIComponent(slug.toLowerCase())}&select=document&limit=1`
		);
		if (!Array.isArray(rows) || rows.length > 1)
			throw new Error('Supabase returned an invalid study plan response.');
		if (rows.length === 0) return undefined;
		const row: unknown = rows[0];
		if (!isRecord(row) || !('document' in row))
			throw new Error('Supabase returned an invalid study plan response.');
		return parseStudyPlanDocument(row.document);
	}
});

const staticReader: StudyPlanReader = {
	loadCatalog: async () => studyPlanCatalog,
	loadPlan: loadStudyPlan
};

export const studyPlanReader: StudyPlanReader =
	env.PLANDE_STUDY_PLAN_READER === 'supabase'
		? createSupabaseStudyPlanReader(getJson)
		: staticReader;
