const visibleItemTagLabels: Record<string, string> = {
	'optativa-i': 'Optativa I',
	'optativa-ii': 'Optativa II',
	'idioma-latino': 'Idioma latino',
	'idioma-germanico': 'Idioma germánico',
	'cfg-elective': 'Electiva CFG',
	'cfp-elective': 'Electiva CFP'
};

export const getVisibleItemTagLabels = (tags: string[] | undefined) =>
	(tags ?? []).flatMap((tag) => (visibleItemTagLabels[tag] ? [visibleItemTagLabels[tag]] : []));
