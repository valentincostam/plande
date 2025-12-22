import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from './study-plan-maps';
import { studyPlanToMarkdown } from '$lib/formatters/study-plan-markdown';
import { studyPlanToPlainText } from '$lib/formatters/study-plan-plaintext';

export const prerender = true;

/**
 * Open Graph crawlers that need HTML with meta tags instead of Markdown/JSON.
 * These crawlers generate link previews for social media platforms.
 */
const OG_CRAWLERS = [
	'facebookexternalhit',
	'Facebot',
	'meta-externalagent',
	'Twitterbot',
	'LinkedInBot',
	'WhatsApp',
	'TelegramBot',
	'Slackbot',
	'Slack-ImgProxy',
	'Discordbot',
	'SkypeUriPreview',
	'Viber',
	'pinterest',
	'redditbot',
	'Embedly',
	'BingPreview',
	'vkShare'
];

/**
 * Check if the request comes from an Open Graph crawler
 */
function isOGCrawler(userAgent: string | null): boolean {
	if (!userAgent) return false;
	const ua = userAgent.toLowerCase();
	return OG_CRAWLERS.some((crawler) => ua.includes(crawler.toLowerCase()));
}

/**
 * Generate minimal HTML response with Open Graph meta tags for social media crawlers
 */
function generateOGResponse(
	studyPlan: (typeof studyPlanSlugMap)[string],
	slug: string,
	url: URL
): Response {
	const collegeAbbr = studyPlan.collegeSlug ? studyPlan.collegeSlug.toUpperCase() : '';
	const universityAbbr = studyPlan.universitySlug.toUpperCase();
	const institution = collegeAbbr ? `${universityAbbr} ${collegeAbbr}` : universityAbbr;

	const title = `${studyPlan.degreeName} - ${institution} | Plande`;
	const description = `Plan de Estudios de ${studyPlan.degreeName} en ${studyPlan.universityName}${studyPlan.collegeName ? ` · ${studyPlan.collegeName}` : ''}. Visualizá materias, correlatividades y tu progreso académico.`;
	const canonicalUrl = `https://plande.app/${slug.toLowerCase()}`;

	// Build OG image URL with query params if present
	const ogImageParams = new URLSearchParams();
	const stateParam = url.searchParams.get('s') || url.searchParams.get('estado');
	const gradeParam = url.searchParams.get('n') || url.searchParams.get('notas');
	if (stateParam) ogImageParams.set('s', stateParam);
	if (gradeParam) ogImageParams.set('n', gradeParam);
	const ogImageQuery = ogImageParams.toString();
	const ogImageUrl = `https://plande.app/${slug.toLowerCase()}/og.png${ogImageQuery ? `?${ogImageQuery}` : ''}`;

	const html = `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>${title}</title>
	<meta name="description" content="${description}">
	<link rel="canonical" href="${canonicalUrl}">

	<!-- Open Graph -->
	<meta property="og:type" content="website">
	<meta property="og:title" content="${title}">
	<meta property="og:description" content="${description}">
	<meta property="og:url" content="${canonicalUrl}">
	<meta property="og:site_name" content="Plande">
	<meta property="og:image" content="${ogImageUrl}">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="${title}">
	<meta name="twitter:description" content="${description}">
	<meta name="twitter:image" content="${ogImageUrl}">
</head>
<body>
	<h1>${studyPlan.degreeName}</h1>
	<p>${description}</p>
</body>
</html>`;

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

/**
 * Parse Accept header and return quality scores for different content types
 */
function parseAcceptHeader(acceptHeader: string | null): Map<string, number> {
	const contentTypes = new Map<string, number>();

	if (!acceptHeader) {
		return contentTypes;
	}

	const parts = acceptHeader.split(',');

	for (const part of parts) {
		const [type, ...params] = part.trim().split(';');
		let quality = 1.0; // Default quality

		// Parse q parameter if present
		for (const param of params) {
			const [key, value] = param.trim().split('=');
			if (key === 'q' && value) {
				quality = parseFloat(value);
			}
		}

		contentTypes.set(type.trim(), quality);
	}

	return contentTypes;
}

/**
 * Determine the best content type to respond with based on Accept header
 */
function negotiateContentType(acceptHeader: string | null): string {
	const acceptedTypes = parseAcceptHeader(acceptHeader);

	// If no Accept header, default to JSON
	if (acceptedTypes.size === 0) {
		return 'application/json';
	}

	// Check for wildcard
	if (acceptedTypes.has('*/*')) {
		return 'text/markdown';
	}

	// Find the highest quality match
	let bestType = 'application/json';
	let bestQuality = 0;

	const supportedTypes = ['text/markdown', 'text/plain', 'application/json'];

	for (const [type, quality] of acceptedTypes) {
		if (supportedTypes.includes(type) && quality > bestQuality) {
			bestType = type;
			bestQuality = quality;
		}
	}

	return bestType;
}

export const GET: RequestHandler = async ({ params, request, url }) => {
	const { slug } = params;

	// Lookup study plan
	const studyPlan =
		studyPlanSlugMap[slug.toLowerCase()] ?? studyPlanSlugWithYearMap[slug.toLowerCase()];

	if (!studyPlan) {
		error(404, {
			message: 'Study plan not found'
		});
	}

	const userAgent = request.headers.get('user-agent');

	// If it's an OG crawler, return minimal HTML with Open Graph meta tags
	// so they can generate proper link previews
	if (isOGCrawler(userAgent)) {
		return generateOGResponse(studyPlan, slug, url);
	}

	// Content negotiation for non-OG crawlers (LLMs, APIs, etc.)
	const acceptHeader = request.headers.get('accept');
	const contentType = negotiateContentType(acceptHeader);

	// Common cache headers
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600'
	};

	switch (contentType) {
		case 'text/markdown': {
			const markdown = studyPlanToMarkdown(studyPlan);
			return new Response(markdown, {
				headers: {
					...headers,
					'Content-Type': 'text/markdown; charset=utf-8'
				}
			});
		}

		case 'text/plain': {
			const plaintext = studyPlanToPlainText(studyPlan);
			return new Response(plaintext, {
				headers: {
					...headers,
					'Content-Type': 'text/plain; charset=utf-8'
				}
			});
		}

		case 'application/json':
		default: {
			return json(studyPlan, {
				headers
			});
		}
	}
};
