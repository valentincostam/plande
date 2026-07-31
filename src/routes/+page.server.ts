import { studyPlanCatalog } from './[slug]/data/study-plan-catalog';

export const prerender = true;

export const load = () => ({ studyPlans: studyPlanCatalog });
