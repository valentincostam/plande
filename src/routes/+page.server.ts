import { studyPlanReader } from './[slug]/data/study-plan-reader.server';

export const prerender = false;

export const load = async ({ url }: { url: URL }) => ({
	studyPlans: await studyPlanReader.loadCatalog(),
	signOutFailed: url.searchParams.get('auth') === 'sign-out-failed'
});
