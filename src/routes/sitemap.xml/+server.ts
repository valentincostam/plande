export const prerender = true;

const degrees = [
	'utn-frcu-loi',
	'utn-frcu-isi',
	'utn-frcu-ie',
	'utn-frcu-ic',
	'ucu-fau-arq',
	'uader-fcyt-lsi',
	'uader-fcyt-it',
	'uner-fcs-med',
	'unca-fca-tupazsa',
	'udemm-lp'
];

export async function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://plande.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${degrees
		.map(
			(degree) => `
  <url>
    <loc>https://plande.app/${degree}</loc>
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
