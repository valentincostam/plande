import { expect, test } from 'vitest';
import { publicationChanges } from './publication-changes';

const history = [
	{ snapshotId: 'latest', argument: 'Nueva correlativa.' },
	{ snapshotId: 'middle', argument: 'Materia retirada.' },
	{ snapshotId: 'initial', argument: null }
];

test('shows corrections since the publication this device actually saw', () => {
	expect(publicationChanges(history, 'initial', 'latest')).toEqual(history.slice(0, 2));
	expect(publicationChanges(history, 'middle', 'latest')).toEqual(history.slice(0, 1));
	expect(publicationChanges(history, 'latest', 'latest')).toEqual([]);
});

test('does not announce a newer snapshot than the loaded document', () => {
	expect(publicationChanges(history, 'initial', 'middle')).toEqual(history.slice(1, 2));
	expect(publicationChanges(history, 'latest', 'middle')).toEqual([]);
	expect(publicationChanges(history, 'initial', undefined)).toEqual([]);
});

test('legacy saved progress sees corrections but initial publication is not a correction', () => {
	expect(publicationChanges(history, undefined, 'latest')).toEqual(history.slice(0, 2));
	expect(publicationChanges(history, undefined, 'initial')).toEqual([]);
});
