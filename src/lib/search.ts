/**
 * Normaliza un texto para búsqueda:
 * - Convierte a minúsculas
 * - Elimina tildes (á → a, é → e, etc.)
 * - Elimina espacios extras al inicio y final
 */
export function normalizeSearchText(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica si el texto contiene la query, ignorando tildes y mayúsculas/minúsculas
 */
export function matchesSearch(text: string, query: string): boolean {
	if (!query.trim()) return true;
	return normalizeSearchText(text).includes(normalizeSearchText(query));
}

/**
 * Tipo que representa un segmento de texto con o sin resaltado
 */
export type TextSegment =
	| { type: 'text'; content: string }
	| { type: 'highlight'; content: string };

/**
 * Crea un mapeo de posiciones del texto normalizado a posiciones del texto original.
 * Retorna un array donde cada índice representa una posición en el texto normalizado
 * y el valor es la posición correspondiente en el texto original.
 */
function buildPositionMap(originalText: string): number[] {
	const map: number[] = [];
	let normalizedPos = 0;

	for (let i = 0; i < originalText.length; i++) {
		const char = originalText[i];
		// Verificar si es un combining character (modificador de otro carácter)
		const code = char.charCodeAt(0);
		const isCombining = code >= 0x0300 && code <= 0x036f;

		if (!isCombining) {
			// Este carácter contribuye a la posición normalizada
			map[normalizedPos] = i;
			normalizedPos++;
		}
		// Los combining characters no aumentan la posición normalizada
	}

	return map;
}

/**
 * Divide el texto en segmentos, marcando las coincidencias con la query.
 * Ignora tildes y mayúsculas/minúsculas al buscar coincidencias.
 */
export function highlightTextSegments(originalText: string, query: string): TextSegment[] {
	const normalizedQuery = normalizeSearchText(query);
	if (!normalizedQuery) {
		return [{ type: 'text', content: originalText }];
	}

	const normalizedText = normalizeSearchText(originalText);
	const positionMap = buildPositionMap(originalText);

	const segments: TextSegment[] = [];
	let lastEnd = 0;
	let searchStart = 0;

	while (searchStart <= normalizedText.length - normalizedQuery.length) {
		const matchStart = normalizedText.indexOf(normalizedQuery, searchStart);

		if (matchStart === -1) break;

		const matchEnd = matchStart + normalizedQuery.length;

		// Mapear posiciones normalizadas a posiciones originales
		const originalStart = positionMap[matchStart] ?? lastEnd;
		const originalEnd = matchEnd < positionMap.length ? positionMap[matchEnd] : originalText.length;

		// Agregar texto antes de la coincidencia
		if (originalStart > lastEnd) {
			segments.push({
				type: 'text',
				content: originalText.slice(lastEnd, originalStart)
			});
		}

		// Agregar la coincidencia resaltada
		segments.push({
			type: 'highlight',
			content: originalText.slice(originalStart, originalEnd)
		});

		lastEnd = originalEnd;
		searchStart = matchEnd;
	}

	// Agregar texto restante después de la última coincidencia
	if (lastEnd < originalText.length) {
		segments.push({
			type: 'text',
			content: originalText.slice(lastEnd)
		});
	}

	return segments;
}
