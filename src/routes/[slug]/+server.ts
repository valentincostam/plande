import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { studyPlanSlugMap, studyPlanSlugWithYearMap } from './study-plan-maps';
import { studyPlanToMarkdown } from '$lib/formatters/study-plan-markdown';
import { studyPlanToPlainText } from '$lib/formatters/study-plan-plaintext';

export const prerender = true;

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

export const GET: RequestHandler = async ({ params, request }) => {
	const { slug } = params;

	// Lookup study plan
	const studyPlan =
		studyPlanSlugMap[slug.toLowerCase()] ?? studyPlanSlugWithYearMap[slug.toLowerCase()];

	if (!studyPlan) {
		error(404, {
			message: 'Study plan not found'
		});
	}

	// Content negotiation
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
