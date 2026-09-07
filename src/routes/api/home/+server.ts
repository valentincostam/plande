import type { RequestHandler } from './$types';
import { groupStudyPlansByUniversityAndCollege, getStudyPlanSlug } from '$lib/study-plan';
import { studyPlanReader } from '../../[slug]/data/study-plan-reader.server';

export const prerender = true;

/**
 * Generate markdown representation of the homepage
 */
function generateHomepageMarkdown(
	allStudyPlans: Awaited<ReturnType<typeof studyPlanReader.loadCatalog>>
): string {
	const grouped = groupStudyPlansByUniversityAndCollege(allStudyPlans);

	let markdown = `# Plande - Planificador de Carreras Universitarias

## Qué es Plande

Plande es una aplicación web gratuita que ayuda a estudiantes universitarios argentinos a planificar sus carreras mediante planes de estudio interactivos.

### Funcionalidades principales

1. **Visualizar requisitos y correlatividades**: Ver qué materias se necesitan antes de cursar o aprobar otras
2. **Simular escenarios**: Cambiar estados de materias para ver qué se habilita sin afectar la realidad
3. **Calcular prioridades automáticamente**: Identificar qué materias desbloquean más otras (requisitos de muchas materias posteriores)
4. **Compartir progreso**: URLs con estado codificado que se pueden compartir
5. **Exportar datos**: CSV, JSON y texto plano

### Estados de materias

- **No cursada**: No se ha comenzado
- **En curso**: Cursando actualmente
- **Regular**: Cursada aprobada, examen final pendiente
- **Aprobada**: Cursada y final aprobados

## Planes de estudio disponibles

**Total**: ${allStudyPlans.length} planes de estudio de ${grouped.length} universidades

`;

	for (const university of grouped) {
		markdown += `### ${university.universityName} (${university.universitySlug})\n\n`;

		for (const college of university.colleges) {
			if (college.collegeName) {
				markdown += `**${college.collegeName}** (${college.collegeSlug}):\n\n`;
			}

			for (const degree of college.degrees) {
				const yearSuffix = degree.year ? ` (Plan ${degree.year})` : '';
				markdown += `- ${degree.degreeName}${yearSuffix}\n`;
			}

			markdown += '\n';
		}
	}

	markdown += `## Cómo usar Plande

1. Visitar https://plande.app
2. Buscar tu universidad y carrera
3. Seleccionar el plan de estudios
4. Cambiar el estado de las materias haciendo clic
5. Ver qué materias están disponibles para cursar
6. Revisar la sección "Prioridad" para identificar materias clave
7. Compartir tu progreso copiando la URL

## Codificación de estados en URLs

Plande guarda el estado de las materias en la URL mediante el parámetro \`s\`:

- \`n\` = No cursada
- \`e\` = En curso
- \`r\` = Regular
- \`a\` = Aprobada
- Números indican repetición: \`a2n3\` = dos aprobadas + tres no cursadas

Ejemplo: \`https://plande.app/utn-frcu-isi?s=a2n3r1\`

## Solicitar nuevos planes

Si tu carrera no está disponible, completar el formulario en https://forms.gle/bCC6rCb44LLYERHu6

## Información técnica para LLMs

- **Content negotiation**: Usar endpoint /api/home con header \`Accept: text/markdown\` o \`application/json\`
- **Endpoints de planes**: \`/{slug}\` con header Accept devuelve planes en múltiples formatos
- **Documentación**: https://plande.app/llms.txt

## Universidades destacadas

- **UTN**: Universidad Tecnológica Nacional (más planes disponibles)
- **UNLP**: Universidad Nacional de La Plata
- **UBA**: Universidad de Buenos Aires (programas selectos)
- **UADER**: Universidad Autónoma de Entre Ríos
- **UNCA**: Universidad Nacional del Chaco Austral

## Carreras populares

- Ingeniería en Sistemas / Licenciatura en Sistemas
- Psicología
- Ingeniería Civil
- Ingeniería Electrónica
- Arquitectura
- Abogacía
- Medicina
- Economía

---

**Sitio web**: https://plande.app  
**Gratuito**: Sí  
**Autenticación**: No requerida  
**Datos**: Curados manualmente desde fuentes oficiales
`;

	return markdown;
}

/**
 * Generate plain text representation
 */
function generateHomepagePlainText(
	allStudyPlans: Awaited<ReturnType<typeof studyPlanReader.loadCatalog>>
): string {
	return generateHomepageMarkdown(allStudyPlans)
		.replace(/# /g, '')
		.replace(/## /g, '')
		.replace(/### /g, '')
		.replace(/\*\*/g, '')
		.replace(/`/g, '')
		.replace(/\n\n/g, '\n')
		.replace(/- /g, '• ');
}

/**
 * Generate JSON representation
 */
function generateHomepageJSON(
	allStudyPlans: Awaited<ReturnType<typeof studyPlanReader.loadCatalog>>
) {
	const grouped = groupStudyPlansByUniversityAndCollege(allStudyPlans);

	return {
		name: 'Plande',
		description:
			'Planificador de carreras universitarias argentinas con visualización interactiva de requisitos y correlatividades',
		url: 'https://plande.app',
		isFree: true,
		requiresAuth: false,
		totalStudyPlans: allStudyPlans.length,
		totalUniversities: grouped.length,
		universities: grouped.map((u) => ({
			name: u.universityName,
			slug: u.universitySlug,
			colleges: u.colleges.map((c) => ({
				name: c.collegeName,
				slug: c.collegeSlug,
				degrees: c.degrees.map((d) => ({
					name: d.degreeName,
					slug: getStudyPlanSlug(d),
					year: d.year,
					duration: d.durationYears
				}))
			}))
		})),
		features: [
			'Visualización de requisitos y correlatividades',
			'Simulación de escenarios',
			'Cálculo automático de prioridades',
			'Compartir progreso vía URL',
			'Exportación de datos'
		],
		courseStates: {
			notTaken: { code: 'n', name: 'No cursada' },
			inProgress: { code: 'e', name: 'En curso' },
			taken: { code: 'r', name: 'Regular' },
			passed: { code: 'a', name: 'Aprobada' }
		}
	};
}

export const GET: RequestHandler = async ({ request }) => {
	const allStudyPlans = await studyPlanReader.loadCatalog();
	const acceptHeader = request.headers.get('accept') || '*/*';

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600'
	};

	// Parse Accept header
	const acceptsMarkdown = acceptHeader.includes('text/markdown');
	const acceptsJSON = acceptHeader.includes('application/json');
	const acceptsPlain = acceptHeader.includes('text/plain');
	const acceptsAny = acceptHeader.includes('*/*');

	if (acceptsJSON) {
		return new Response(JSON.stringify(generateHomepageJSON(allStudyPlans), null, 2), {
			headers: {
				...headers,
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}

	if (acceptsPlain) {
		return new Response(generateHomepagePlainText(allStudyPlans), {
			headers: {
				...headers,
				'Content-Type': 'text/plain; charset=utf-8'
			}
		});
	}

	// Default to markdown for markdown or wildcard
	if (acceptsMarkdown || acceptsAny) {
		return new Response(generateHomepageMarkdown(allStudyPlans), {
			headers: {
				...headers,
				'Content-Type': 'text/markdown; charset=utf-8'
			}
		});
	}

	// Fallback
	return new Response(generateHomepageMarkdown(allStudyPlans), {
		headers: {
			...headers,
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
};
