import { describe, it, expect } from 'vitest';
import { encodeGrades, decodeGrades } from './grade-encoding';

describe('encodeGrades', () => {
	it('encodes empty array as empty string', () => {
		expect(encodeGrades([])).toBe('');
	});

	it('encodes single grade', () => {
		expect(encodeGrades([4])).toBe('d');
		expect(encodeGrades([7])).toBe('g');
		expect(encodeGrades([10])).toBe('j');
	});

	it('encodes undefined as n', () => {
		expect(encodeGrades([undefined, 7])).toBe('ng');
	});

	it('trims trailing undefined grades', () => {
		expect(encodeGrades([undefined])).toBe('');
		expect(encodeGrades([7, undefined])).toBe('g');
		expect(encodeGrades([7, undefined, undefined])).toBe('g');
	});

	it('compresses repeated grades', () => {
		expect(encodeGrades([7, 7, 7])).toBe('g3');
		expect(encodeGrades([8, 8, 9, 9])).toBe('h2i2');
	});

	it('handles all valid grades', () => {
		expect(encodeGrades([4, 5, 6, 7, 8, 9, 10])).toBe('defghij');
	});
});

describe('decodeGrades', () => {
	it('decodes empty string as empty array', () => {
		expect(decodeGrades('')).toEqual([]);
	});

	it('decodes single grade', () => {
		expect(decodeGrades('d')).toEqual([4]);
		expect(decodeGrades('g')).toEqual([7]);
		expect(decodeGrades('j')).toEqual([10]);
	});

	it('decodes n as undefined', () => {
		expect(decodeGrades('n')).toEqual([undefined]);
		expect(decodeGrades('ng')).toEqual([undefined, 7]);
	});

	it('decompresses repeated grades', () => {
		expect(decodeGrades('g3')).toEqual([7, 7, 7]);
		expect(decodeGrades('h2i2')).toEqual([8, 8, 9, 9]);
	});

	it('handles uppercase input', () => {
		expect(decodeGrades('G')).toEqual([7]);
		expect(decodeGrades('DEFGHIJ')).toEqual([4, 5, 6, 7, 8, 9, 10]);
	});
});

describe('encode/decode roundtrip', () => {
	it('decode(encode(grades)) === grades (without trailing undefined)', () => {
		const grades = [7, 8, undefined, 9, 10];
		expect(decodeGrades(encodeGrades(grades))).toEqual(grades);
	});

	it('handles complex grade arrays', () => {
		const grades = [undefined, undefined, 7, 7, 7, 8, 10];
		expect(decodeGrades(encodeGrades(grades))).toEqual(grades);
	});

	it('handles all same grades', () => {
		const grades = [6, 6, 6, 6, 6];
		expect(decodeGrades(encodeGrades(grades))).toEqual(grades);
	});
});
