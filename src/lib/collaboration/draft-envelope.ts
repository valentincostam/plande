export type OfferIdentity = {
	university: string;
	faculty: string;
	offer: string;
	campus?: string;
	modality?: string;
};

export type DraftSource = {
	label: string;
	url: string;
};

export type DraftEnvelope = {
	id: string;
	offer: OfferIdentity;
	year: number | null;
	sources: DraftSource[];
	content: Record<string, unknown>;
};

type OfferIdentityInput = Partial<OfferIdentity>;

type DraftEnvelopeInput = {
	id: string;
	offer: OfferIdentityInput;
	year: number | null;
	sources: DraftSource[];
	content: Record<string, unknown>;
};

const normalizeText = (value: string | undefined) => value?.trim() ?? '';

const normalizeOptionalText = (value: string | undefined) => {
	const normalized = normalizeText(value);
	return normalized || undefined;
};

const normalizeSearchText = (value: string) =>
	value
		.normalize('NFD')
		.replaceAll(/[\u0300-\u036f]/g, '')
		.toLocaleLowerCase('es-AR');

export const parseOfferIdentity = (input: OfferIdentityInput): OfferIdentity => {
	const university = normalizeText(input.university);
	const faculty = normalizeText(input.faculty);
	const offer = normalizeText(input.offer);
	if (!university || !faculty) throw new Error('Indicá la universidad y la facultad de la oferta.');
	if (!offer) throw new Error('Indicá el nombre de la oferta.');

	return {
		university,
		faculty,
		offer,
		...(normalizeOptionalText(input.campus) ? { campus: normalizeOptionalText(input.campus) } : {}),
		...(normalizeOptionalText(input.modality)
			? { modality: normalizeOptionalText(input.modality) }
			: {})
	};
};

export const buildOfferSearchText = (offer: OfferIdentity) =>
	normalizeSearchText(
		[offer.university, offer.faculty, offer.offer, offer.campus, offer.modality]
			.filter(Boolean)
			.join(' ')
	);

export const findOfferMatches = (query: string, offers: OfferIdentity[]) => {
	const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
	if (terms.length === 0) return offers;
	return offers.filter((offer) => {
		const text = buildOfferSearchText(offer);
		return terms.every((term) => text.includes(term));
	});
};

export const createDraftEnvelope = (input: DraftEnvelopeInput): DraftEnvelope => {
	if (!input.id) throw new Error('El borrador necesita una identidad estable.');
	if (input.year !== null && !Number.isInteger(input.year))
		throw new Error('Indicá un año de plan válido o dejalo vacío.');
	for (const source of input.sources) {
		if (!normalizeText(source.label)) throw new Error('Cada fuente necesita una etiqueta.');
		try {
			const url = new URL(source.url);
			if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
		} catch {
			throw new Error('Cada fuente necesita un enlace http o https.');
		}
	}

	return {
		id: input.id,
		offer: parseOfferIdentity(input.offer),
		year: input.year,
		sources: input.sources.map(({ label, url }) => ({ label: label.trim(), url: url.trim() })),
		content: input.content
	};
};
