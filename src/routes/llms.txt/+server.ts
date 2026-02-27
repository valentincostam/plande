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
				description += ` (Plan ${plan.year})`;
			}

			return `- \`${slug}\` - ${description} - ${parts.join(' - ')}`;
		})
		.join('\n');

	// Generate dynamic university list
	const universityCounts = new Map<string, { name: string; slug: string; count: number }>();
	for (const plan of studyPlans) {
		const key = plan.universitySlug;
		const existing = universityCounts.get(key);
		if (existing) {
			existing.count++;
		} else {
			universityCounts.set(key, {
				name: plan.universityName,
				slug: plan.universitySlug,
				count: 1
			});
		}
	}

	// Sort by count descending, then alphabetically
	const sortedUniversities = Array.from(universityCounts.values()).sort((a, b) => {
		if (b.count !== a.count) return b.count - a.count;
		return a.name.localeCompare(b.name);
	});

	// Format university list
	const topUniversities = sortedUniversities.slice(0, 5);
	const otherUniversities = sortedUniversities.slice(5);

	const topUniversitiesSection = topUniversities
		.map(
			(uni) =>
				`- **${uni.name}** (${uni.slug}): ${uni.count} ${uni.count === 1 ? 'plan' : 'planes'}`
		)
		.join('\n');

	const otherUniversitiesSection = otherUniversities
		.map((uni) => `${uni.name} (${uni.slug})`)
		.join(', ');

	return `# Plande - Planificador de Carreras Universitarias

> Guía para modelos de lenguaje (LLMs) sobre cómo acceder y utilizar los datos de planificación académica de Plande.

## Qué es Plande

Plande es una aplicación web gratuita que ayuda a estudiantes universitarios a planificar sus carreras mediante planes de estudio interactivos. Permite:

- **Visualizar requisitos y correlatividades** entre materias de forma interactiva
- **Simular escenarios** cambiando el estado de las materias sin afectar la realidad
- **Calcular prioridades** automáticamente según qué materias desbloquean más otras
- **Compartir progreso** mediante URLs con estado codificado
- **Exportar datos** en CSV, JSON y texto plano

Plande está diseñada para el sistema universitario argentino, utilizando terminología local como "correlativas", "regularizada" y "cursada", pero los conceptos son universales en educación superior.

## Estados de Materias

Cada materia puede tener uno de cuatro estados:

1. **No cursada (N)**: Estado inicial. No se ha comenzado la materia.
2. **En curso (E)**: Se está cursando actualmente.
3. **Regular (R)**: Cursada aprobada pero examen final pendiente. (En otros países: "cursada completada")
4. **Aprobada (A)**: Cursada y examen final aprobados. Materia completada.

## Acceso a Datos

Plande proporciona acceso programático a los planes de estudio mediante negociación de contenido (content negotiation).

### URL Base

\`\`\`
https://plande.app/{slug}
\`\`\`

Donde \`{slug}\` es el identificador del plan (ejemplo: \`utn-frcu-isi\` para UTN FRCU Ingeniería en Sistemas de Información).

### Negociación de Contenido

La API soporta múltiples formatos mediante el header \`Accept\`:

- \`text/markdown\` - Formato Markdown (recomendado para LLMs)
- \`text/plain\` - Texto plano
- \`application/json\` - Datos estructurados en JSON
- \`*/*\` - Por defecto devuelve Markdown

### Ejemplos de Uso

\`\`\`bash
# Obtener plan como Markdown (recomendado)
curl -H "Accept: text/markdown" https://plande.app/utn-frcu-isi

# Obtener plan como JSON
curl -H "Accept: application/json" https://plande.app/utn-frcu-isi

# Obtener plan como texto plano
curl -H "Accept: text/plain" https://plande.app/utn-frcu-isi
\`\`\`

## Codificación de Estados en URLs

Plande codifica el estado de todas las materias en el parámetro de query \`s\`, permitiendo compartir el progreso mediante URLs.

### Formato de Codificación

- Cada estado se representa con una letra: \`n\` (no cursada), \`e\` (en curso), \`r\` (regular), \`a\` (aprobada)
- Estados consecutivos idénticos se comprimen: \`a2n5\` = dos aprobadas seguidas de cinco no cursadas
- El orden de letras corresponde al orden de materias en el plan de estudios

### Ejemplo

\`\`\`
https://plande.app/utn-frcu-isi?s=a2n6r5e3
\`\`\`

Decodificación:
- \`a2\`: Primeras 2 materias aprobadas
- \`n6\`: Siguientes 6 materias no cursadas (comprimido de 6 letras 'n')
- \`r5\`: Siguientes 5 materias regularizadas
- \`e3\`: Últimas 3 materias en curso

### Generación Manual de URLs

Para crear una URL con estados específicos:

1. Obtener la lista de materias en orden del plan de estudios
2. Mapear cada materia a su letra de estado
3. Comprimir secuencias consecutivas idénticas (n3, a2, etc.)
4. Agregar como parámetro \`?s=\` a la URL del plan

### Parámetros de URL Adicionales

- \`?r=no\`: Desactivar modo estricto (permite simular escenarios hipotéticos)
- \`?c=si\`: Mostrar códigos de materias
- \`?n=<codificado>\`: Incluir notas/calificaciones (sistema de codificación separado)

## Planes de Estudio Disponibles

${studyPlanList}

## Universidades Disponibles

**Total**: ${studyPlans.length} planes de estudio de ${universityCounts.size} universidades

### Principales universidades (por cantidad de planes)

${topUniversitiesSection}

### Otras universidades incluidas

${otherUniversitiesSection}

## Cómo Solicitar Nuevos Planes

Si un plan de estudios no está disponible:

1. Visitar https://forms.gle/bCC6rCb44LLYERHu6
2. Completar el formulario con el plan de estudios oficial de la universidad
3. El mantenedor agregará el plan manualmente a la base de datos

## Estructura de Datos

Cada plan de estudio incluye:

- **Información del título**: Universidad, facultad, nombre de la carrera, duración
- **Materias**: Lista completa con códigos, nombres, horas, cuatrimestres y años
- **Requisitos**: Dependencias y requisitos entre materias
- **Fuentes**: Links a documentación oficial
- **Configuración de progreso**: Requisitos para completar el título

### Estructura de Materia

\`\`\`json
{
  "id": 1,
  "name": "Matemática I",
  "code": "MAT101",
  "year": 1,
  "term": "firstSemester",
  "hours": 144,
  "type": "mandatory",
  "attributes": [],
  "requirements": [
    {
      "requiredCourseId": 2,
      "requiredState": "passed",
      "requiredFor": "enroll"
    }
  ]
}
\`\`\`

**Cuatrimestres**: \`annual\`, \`firstSemester\`, \`secondSemester\`, \`annualOrSemestral\`, \`semestral\`, \`crossYear\`, \`unknown\`

**Tipos**: \`mandatory\` (obligatoria), \`elective\` (electiva), \`optative\` (optativa)

**Propósitos de requisito**: \`enroll\` (para cursar), \`complete\` (para aprobar/finalizar)

## Endpoints Disponibles

\`\`\`
GET /{slug}                  # Página del plan de estudio (con negociación de contenido)
GET /{slug}/simple           # Vista simplificada sin interactividad
GET /{slug}/og.png           # Imagen OpenGraph dinámica con estadísticas
GET /sitemap.xml             # Sitemap XML con todos los planes
GET /llms.txt                # Este archivo
\`\`\`

## Mejores Prácticas para LLMs

1. **Usar Markdown**: El formato \`text/markdown\` es más eficiente en tokens y legible
2. **Datos de solo lectura**: Los planes representan programas académicos oficiales
3. **Idioma**: Nombres de materias y códigos están en español
4. **Acceso público**: No requiere autenticación
5. **URLs compartibles**: Usar el parámetro \`s\` para referenciar estados específicos

## Limitaciones

- Los planes deben agregarse manualmente (no hay integración automática con universidades)
- Progreso almacenado localmente o en URLs (sin cuentas de usuario)
- Enfocado en universidades argentinas (pero extensible a otros países)

## Recursos Adicionales

- Website: https://plande.app
- Solicitar planes: https://forms.gle/bCC6rCb44LLYERHu6
- Feedback: https://forms.gle/5iR99PJAffwFmayC6

---

**Nota legal**: La información proviene de fuentes oficiales compartidas por estudiantes. Siempre verificar con la documentación oficial de la universidad.
`;
}

export const GET: RequestHandler = async () => {
	const content = generateLlmsTxt();

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
