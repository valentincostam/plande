export const getOrdinalSuperscript = (number: number) => {
	if (number === 1) return 'er';
	if (number === 2) return 'do';
	if (number === 3) return 'er';
	return 'to';
};

export const getOrdinalPrefix = (number: number) => `${number}${getOrdinalSuperscript(number)}`;

export const getOrdinalWord = (number: number) => {
	const ordinals: Record<number, string> = {
		1: 'primer',
		2: 'segundo',
		3: 'tercer',
		4: 'cuarto',
		5: 'quinto',
		6: 'sexto',
		7: 'séptimo',
		8: 'octavo',
		9: 'noveno',
		10: 'décimo'
	};
	return ordinals[number] ?? `${number}°`;
};
