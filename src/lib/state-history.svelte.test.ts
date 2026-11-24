import { afterEach, expect, test } from 'vitest';
import {
	clearIsApplyingHistory,
	getIsApplyingHistory,
	pushState,
	redo,
	resetHistory,
	undo,
	type HistoryState
} from './state-history.svelte';

afterEach(resetHistory);

const state = (states: string, grades: string): HistoryState => ({ states, grades });

test('restores grades through undo and redo', () => {
	pushState(state('approved', '7'));
	pushState(state('approved', '8'));

	expect(undo()).toEqual(state('approved', '7'));
	expect(getIsApplyingHistory()).toBe(true);
	clearIsApplyingHistory();
	expect(redo()).toEqual(state('approved', '8'));
});

test('restores a cleared grade', () => {
	pushState(state('approved', '7'));
	pushState(state('approved', ''));

	expect(undo()).toEqual(state('approved', '7'));
	clearIsApplyingHistory();
	expect(redo()).toEqual(state('approved', ''));
});

test('keeps an empty baseline as valid history', () => {
	pushState(state('', ''));
	pushState(state('approved', ''));

	expect(undo()).toEqual(state('', ''));
});

test('deduplicates equal pairs and clones saved pairs', () => {
	const first = state('approved', '7');
	pushState(first);
	pushState(state('approved', '7'));
	first.grades = '99';
	pushState(state('approved', '8'));

	expect(undo()).toEqual(state('approved', '7'));
	clearIsApplyingHistory();
	expect(undo()).toBeNull();
});

test('drops redo on a new branch and reset clears history', () => {
	const first = state('regular', '');
	pushState(first);
	pushState(state('approved', '7'));
	expect(undo()).toEqual(first);
	clearIsApplyingHistory();
	pushState(state('failed', ''));

	expect(redo()).toBeNull();
	resetHistory();
	expect(undo()).toBeNull();
	expect(getIsApplyingHistory()).toBe(false);
});
