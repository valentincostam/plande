const MAX_HISTORY_SIZE = 50;

export type HistoryState = { states: string; grades: string };

let undoStack = $state<HistoryState[]>([]);
let redoStack = $state<HistoryState[]>([]);
let currentState = $state<HistoryState | null>(null);
let isApplyingHistory = $state(false);

const clone = (state: HistoryState): HistoryState => ({ ...state });
const sameState = (left: HistoryState, right: HistoryState) =>
	left.states === right.states && left.grades === right.grades;

export function getIsApplyingHistory() {
	return isApplyingHistory;
}

export function pushState(state: HistoryState) {
	if (isApplyingHistory || (currentState !== null && sameState(currentState, state))) return;

	if (currentState !== null) {
		undoStack = [...undoStack, clone(currentState)].slice(-MAX_HISTORY_SIZE);
		redoStack = [];
	}

	currentState = clone(state);
}

export function undo(): HistoryState | null {
	if (undoStack.length === 0) return null;

	const previous = undoStack[undoStack.length - 1];
	undoStack = undoStack.slice(0, -1);

	if (currentState !== null)
		redoStack = [...redoStack, clone(currentState)].slice(-MAX_HISTORY_SIZE);

	isApplyingHistory = true;
	currentState = clone(previous);
	return clone(previous);
}

export function redo(): HistoryState | null {
	if (redoStack.length === 0) return null;

	const next = redoStack[redoStack.length - 1];
	redoStack = redoStack.slice(0, -1);

	if (currentState !== null)
		undoStack = [...undoStack, clone(currentState)].slice(-MAX_HISTORY_SIZE);

	isApplyingHistory = true;
	currentState = clone(next);
	return clone(next);
}

export function clearIsApplyingHistory() {
	isApplyingHistory = false;
}

export function resetHistory() {
	undoStack = [];
	redoStack = [];
	currentState = null;
	isApplyingHistory = false;
}
