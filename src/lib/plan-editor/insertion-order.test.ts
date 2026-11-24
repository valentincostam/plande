import { expect, test } from 'vitest';
import { insertionOrders } from './insertion-order';

test('normalizes equal or missing orders before inserting below the selected placement', () => {
	const result = insertionOrders(
		[{ id: 'first' }, { id: 'second', order: 0 }, { id: 'third', order: 0 }],
		'first'
	);
	expect(result?.inserted).toBe(0.5);
	expect([...result!.existing.entries()]).toEqual([
		['first', 0],
		['second', 1],
		['third', 2]
	]);
});
