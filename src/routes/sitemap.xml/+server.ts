import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
import { getStudyPlanSlug, getStudyPlanSlugWithYear } from '$lib/study-plan';
import { allStudyPlans as studyPlanDataCatalog } from '../[slug]/data/all-study-plans';

export const prerender = true;

const allStudyPlans = studyPlanDataCatalog.map(studyPlanDataToCatalogEntry);

export async function GET() {
	// Genera slugs únicos para todas las carreras (con y sin año)
	const slugs = new Set<string>();

	for (const studyPlan of allStudyPlans) {
		slugs.add(getStudyPlanSlug(studyPlan));
		// También incluir slug con año si existe
		const slugWithYear = getStudyPlanSlugWithYear(studyPlan);
		if (slugWithYear !== getStudyPlanSlug(studyPlan)) {
			slugs.add(slugWithYear);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://plande.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${Array.from(slugs)
		.sort()
		.map(
			(slug) => `
  <url>
    <loc>https://plande.app/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
		)
		.join('')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
