import type { RequestHandler } from './$types';
import { studyPlanSlugMap } from '../[slug]/study-plan-maps';
import { getStudyPlanSlug } from '$lib/study-plan';

export const prerender = true;

function generateLlmsTxt(): string {
	// Get all unique study plans from the slug map
	const studyPlans = Array.from(new Set(Object.values(studyPlanSlugMap)));

	// Sort study plans by university, then college, then degree
	const sortedPlans = studyPlans.sort((planA, planB) => {
		// First sort by university
		const uniCompare = planA.universityName.localeCompare(planB.universityName);
		if (uniCompare !== 0) return uniCompare;

		// Then by college (if exists)
		const collegeA = planA.collegeName || '';
		const collegeB = planB.collegeName || '';
		const collegeCompare = collegeA.localeCompare(collegeB);
		if (collegeCompare !== 0) return collegeCompare;

		// Finally by degree name
		return planA.degreeName.localeCompare(planB.degreeName);
	});

	// Generate study plan list
	const studyPlanList = sortedPlans
		.map((plan) => {
			const slug = getStudyPlanSlug(plan);
			const parts: string[] = [];

			if (plan.collegeName) {
				parts.push(`${plan.collegeName} (${plan.collegeSlug})`);
			}

			parts.push(`${plan.universityName} (${plan.universitySlug})`);

			let description = plan.degreeName;
			if (plan.year) {
				description += ` (${plan.year})`;
			}

			return `- \`${slug}\` - ${description} - ${parts.join(' - ')}`;
		})
		.join('\n');

	return `# llms.txt

> This file provides guidance for LLMs on how to access and use Plande's academic degree planning data.

## About Plande

Plande is a web application that provides interactive study plans (planes de estudios) for university degree programs in Argentina. It helps students visualize course prerequisites, track their academic progress, and plan their degree completion.

## API Access

Plande provides programmatic access to study plan data through content negotiation. All study plans are accessible via the base URL pattern:

\`\`\`
https://plande.app/{slug}
\`\`\`

Where \`{slug}\` is the study plan identifier (e.g., \`utn-frcu-isi\` for UTN FRCU Ingeniería en Sistemas de Información).

### Content Negotiation

The API supports multiple content types via the \`Accept\` header:

- **\`text/markdown\`** - Returns study plan in Markdown format (recommended for LLMs)
- **\`text/plain\`** - Returns study plan in plain text format
- **\`application/json\`** - Returns structured JSON data
- **\`*/*\`** - Defaults to Markdown format

### Example Usage

\`\`\`bash
# Get study plan as Markdown (recommended)
curl -H "Accept: text/markdown" https://plande.app/utn-frcu-isi

# Get study plan as JSON
curl -H "Accept: application/json" https://plande.app/utn-frcu-isi

# Get study plan as plain text
curl -H "Accept: text/plain" https://plande.app/utn-frcu-isi
\`\`\`

## Available Study Plans

The following study plans are currently available:

${studyPlanList}

## Data Structure

Each study plan includes:

- **Degree Information**: University, college, degree name, duration
- **Courses**: Complete list of courses with codes, names, hours, terms, and years
- **Prerequisites**: Course requirements and dependencies
- **Sources**: References to official documentation
- **Progress Configuration**: Requirements for degree completion

## Best Practices for LLMs

1. Use \`Accept: text/markdown\` header for the most token-efficient format
2. Study plans are read-only - they represent official academic programs
3. Course codes and names are in Spanish (Argentine universities)
4. All data is publicly available and does not require authentication

## Additional Resources

- Website: https://plande.app
`;
}

export const GET: RequestHandler = async () => {
	const content = generateLlmsTxt();

	return new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
