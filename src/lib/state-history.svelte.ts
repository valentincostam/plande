const MAX_HISTORY_SIZE = 50;

let undoStack = $state<string[]>([]);
let redoStack = $state<string[]>([]);
let currentState = $state<string>('');
let isApplyingHistory = $state(false);

export function getCanUndo() {
	return undoStack.length > 0;
}

export function getCanRedo() {
	return redoStack.length > 0;
}

export function getHasHistory() {
	return undoStack.length > 0 || redoStack.length > 0;
}

export function getIsApplyingHistory() {
	return isApplyingHistory;
}

export function pushState(encoded: string) {
	if (isApplyingHistory) return;

	if (currentState === encoded) return;

	if (currentState !== '') {
		undoStack = [...undoStack, currentState].slice(-MAX_HISTORY_SIZE);
		redoStack = [];
	}

	currentState = encoded;
}

export function undo(): string | null {
	if (undoStack.length === 0) return null;

	const previous = undoStack[undoStack.length - 1];
	undoStack = undoStack.slice(0, -1);

	if (currentState !== '') {
		redoStack = [...redoStack, currentState];
	}

	isApplyingHistory = true;
	currentState = previous;

	return previous;
}

export function redo(): string | null {
	if (redoStack.length === 0) return null;

	const next = redoStack[redoStack.length - 1];
	redoStack = redoStack.slice(0, -1);

	if (currentState !== '') {
		undoStack = [...undoStack, currentState];
	}

	isApplyingHistory = true;
	currentState = next;

	return next;
}

export function clearIsApplyingHistory() {
	isApplyingHistory = false;
}

export function resetHistory() {
	undoStack = [];
	redoStack = [];
	currentState = '';
	isApplyingHistory = false;
}
