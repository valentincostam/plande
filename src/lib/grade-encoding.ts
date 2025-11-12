// Grade to letter mapping for URL encoding
// n = no grade (undefined), d-j = grades 4-10
const gradeToLetter: Record<number, string> = {
	4: 'd',
	5: 'e',
	6: 'f',
	7: 'g',
	8: 'h',
	9: 'i',
	10: 'j'
};

const letterToGrade: Record<string, number | undefined> = {
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	n: undefined
};

const NO_GRADE_LETTER = 'n';

// Trim trailing 'n' letters (no grade) to keep URL short
const trimTrailingNoGrades = (gradeLetters: string) => {
	return gradeLetters.replace(/n+$/, '');
};

// Run-length compression: "ggg" → "g3", "nnn" → "n3"
const compressGradeLetters = (input: string) => {
	if (!input) return '';

	let compressed = '';
	let count = 1;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[i + 1]) {
			count++;
		} else {
			compressed += input[i] + (count > 1 ? count : '');
			count = 1;
		}
	}

	return compressed;
};

// Decompress run-length encoding: "g3" → "ggg"
const decompressGradeLetters = (compressed: string) => {
	if (!compressed) return '';

	let decompressed = '';
	let index = 0;

	while (index < compressed.length) {
		const char = compressed[index];
		let countString = '';
		index++;

		// Read digits following the character
		while (index < compressed.length && !isNaN(parseInt(compressed[index]))) {
			countString += compressed[index];
			index++;
		}

		const count = countString === '' ? 1 : parseInt(countString);
		decompressed += char.repeat(count);
	}

	return decompressed;
};

/**
 * Encode an array of grades into a compressed string for URL
 * @param grades - Array of grades (4-10) or undefined
 * @returns Compressed string (e.g., "g12h8i6j2")
 */
export const encodeGrades = (grades: (number | undefined)[]): string => {
	if (!grades || grades.length === 0) {
		return '';
	}

	// Convert grades to letters
	const gradeLetters = grades
		.map((grade) => (grade !== undefined ? gradeToLetter[grade] : NO_GRADE_LETTER))
		.join('');

	// Trim trailing 'n' and compress
	const trimmed = trimTrailingNoGrades(gradeLetters);

	if (!trimmed) {
		return '';
	}

	return compressGradeLetters(trimmed);
};

/**
 * Decode a compressed grade string from URL into an array of grades
 * @param encoded - Compressed grade string (e.g., "g12h8i6j2")
 * @returns Array of grades (4-10) or undefined
 */
export const decodeGrades = (encoded: string): (number | undefined)[] => {
	if (!encoded) {
		return [];
	}

	// Decompress and convert to lowercase
	const decompressed = decompressGradeLetters(encoded.toLowerCase());

	// Convert letters back to grades
	return decompressed.split('').map((letter) => letterToGrade[letter]);
};
