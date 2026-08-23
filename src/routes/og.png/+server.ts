import type { RequestHandler } from './$types';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { allStudyPlans } from '../[slug]/data/all-study-plans';

export const prerender = true;

const totalPlans = allStudyPlans.length;
const universityCounts = new Map<string, number>();

for (const plan of allStudyPlans) {
	universityCounts.set(plan.universitySlug, (universityCounts.get(plan.universitySlug) ?? 0) + 1);
}

const featuredUniversities = [...universityCounts.entries()]
	.sort(([slugA, countA], [slugB, countB]) => countB - countA || slugA.localeCompare(slugB))
	.slice(0, 8)
	.map(([slug]) => slug);

async function loadLogo(fetcher: typeof fetch, origin: string, slug: string) {
	try {
		const response = await fetcher(new URL(`/og-logos/${slug.toLowerCase()}.png`, origin));
		if (!response.ok) return undefined;

		const buffer = Buffer.from(await response.arrayBuffer());
		return `data:image/png;base64,${buffer.toString('base64')}`;
	} catch {
		return undefined;
	}
}

export const GET: RequestHandler = async ({ fetch, url }) => {
	const logos = await Promise.all(
		featuredUniversities.map(async (slug) => ({
			slug,
			data: await loadLogo(fetch, url.origin, slug)
		}))
	);

	const logoHtml = logos
		.map(
			({ slug, data }) => `
				<div style="display: flex; width: 160px; height: 82px; align-items: center; justify-content: center">
					${
						data
							? `<img src="${data}" style="max-width: 140px; max-height: 58px; object-fit: contain; opacity: 0.48; filter: grayscale(1)" />`
							: `<span style="font-size: 26px; font-weight: 700; color: #9ca3af">${slug.toUpperCase()}</span>`
					}
				</div>`
		)
		.join('');

	const html = `
<div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #ffffff; position: relative; overflow: hidden">
	<div style="display: flex; flex: 1; padding: 48px 56px 32px 56px">
		<div style="display: flex; flex-direction: column; width: 700px; padding-right: 46px">
			<span style="font-size: 30px; color: #1e40af">plande.app</span>
			<span style="font-size: 24px; font-weight: 700; letter-spacing: 1.8px; color: #6b7280; margin-top: 26px">PLANES DE ESTUDIO INTERACTIVOS</span>
			<span style="font-size: 64px; line-height: 1.04; font-weight: 700; color: #111827; margin-top: 12px">Planificá tu carrera con claridad</span>
			<span style="font-size: 27px; line-height: 1.35; color: #4b5563; margin-top: 22px">Visualizá correlatividades, descubrí qué materias podés cursar y llevá tu progreso.</span>

			<div style="display: flex; align-items: center; margin-top: auto">
				<div style="display: flex; flex-direction: column">
					<span style="font-size: 48px; line-height: 1; font-weight: 700; color: #111827">${totalPlans}</span>
					<span style="font-size: 20px; color: #6b7280; margin-top: 7px">planes de estudio</span>
				</div>
				<div style="display: flex; width: 3px; height: 72px; background-color: #e5e7eb; margin: 0 40px"></div>
				<div style="display: flex; flex-direction: column">
					<span style="font-size: 48px; line-height: 1; font-weight: 700; color: #111827">${universityCounts.size}</span>
					<span style="font-size: 20px; color: #6b7280; margin-top: 7px">universidades</span>
				</div>
			</div>
		</div>

		<div style="display: flex; flex-direction: column; flex: 1; border-left: 3px solid #f3f4f6; padding-left: 42px">
			<span style="font-size: 22px; color: #6b7280; margin-bottom: 18px">Planes disponibles de</span>
			<div style="display: flex; flex-wrap: wrap; width: 340px; align-content: flex-start">
				${logoHtml}
			</div>
			<span style="font-size: 20px; color: #9ca3af; margin-top: auto">y muchas más instituciones</span>
		</div>
	</div>

	<div style="display: flex; width: 100%; height: 30px">
		<div style="display: flex; height: 100%; background-color: #d1d5db; flex: 3"></div>
		<div style="display: flex; height: 100%; background-color: #60a5fa; flex: 1"></div>
		<div style="display: flex; height: 100%; background-color: #fbbf24; flex: 1"></div>
		<div style="display: flex; height: 100%; background-color: #22c55e; flex: 2"></div>
	</div>
</div>`;

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
		headers: {
			'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
		}
	});
};
