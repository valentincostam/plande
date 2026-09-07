import { describe, expect, it } from 'vitest';
import { mergePrivateProgress, type PrivateProgress } from './private-progress-contract';
import { createPrivateProgressSaveBody } from './private-progress-contract';

const progress = (items: PrivateProgress['items'], version = 0): PrivateProgress => ({
	version,
	items
});

describe('mergePrivateProgress', () => {
	it('merges independent changes and retains a record for an item removed from the current plan', () => {
		const base = progress([
			{ itemId: 'course', state: 'taken' },
			{ itemId: 'removed-item', state: 'passed', grade: 7 }
		]);
		const local = progress([
			{ itemId: 'course', state: 'passed' },
			{ itemId: 'removed-item', state: 'passed', grade: 7 }
		]);
		const server = progress(
			[
				{ itemId: 'course', state: 'taken' },
				{ itemId: 'removed-item', state: 'passed', grade: 9 }
			],
			4
		);

		expect(mergePrivateProgress({ base, local, server })).toEqual({
			merged: progress(
				[
					{ itemId: 'course', state: 'passed' },
					{ itemId: 'removed-item', state: 'passed', grade: 9 }
				],
				4
			),
			conflicts: []
		});
	});

	it('keeps an historical item when neither current copy includes it', () => {
		const base = progress([{ itemId: 'removed-item', state: 'passed', grade: 8 }]);
		const current = progress([{ itemId: 'course', state: 'taken' }], 2);

		expect(mergePrivateProgress({ base, local: current, server: current })).toEqual({
			merged: progress(
				[
					{ itemId: 'course', state: 'taken' },
					{ itemId: 'removed-item', state: 'passed', grade: 8 }
				],
				2
			),
			conflicts: []
		});
	});

	it('returns incompatible alternatives without discarding the local value', () => {
		const base = progress([{ itemId: 'course', state: 'taken', grade: 7 }]);
		const local = progress([{ itemId: 'course', state: 'passed', grade: 7 }]);
		const server = progress([{ itemId: 'course', state: 'inProgress', grade: 7 }], 2);

		expect(mergePrivateProgress({ base, local, server })).toEqual({
			merged: progress([{ itemId: 'course', state: 'inProgress', grade: 7 }], 2),
			conflicts: [
				{
					itemId: 'course',
					field: 'state',
					local: 'passed',
					server: 'inProgress'
				}
			]
		});
	});
});

it('accepts -1 only as the first private-progress save version', () => {
	expect(() => createPrivateProgressSaveBody({ expectedVersion: -1, items: [] })).not.toThrow();
});

it('keeps a local grade clear when the server did not change that grade', () => {
	const base = progress([{ itemId: 'course', state: 'passed', grade: 8 }], 1);
	expect(
		mergePrivateProgress({
			base,
			local: progress([{ itemId: 'course', state: 'passed' }]),
			server: base
		}).merged.items
	).toEqual([{ itemId: 'course', state: 'passed' }]);
});

it('does not report a conflict when local progress matches its saved base', () => {
	const base = progress([{ itemId: 'course', state: 'passed' }], 1);
	expect(
		mergePrivateProgress({
			base,
			local: base,
			server: progress([{ itemId: 'course', state: 'passed' }], 2)
		}).conflicts
	).toEqual([]);
});
