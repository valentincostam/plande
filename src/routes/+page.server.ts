import { studyPlanReader } from './[slug]/data/study-plan-reader.server';

export const prerender = true;

export const load = async () => ({ studyPlans: await studyPlanReader.loadCatalog() });
