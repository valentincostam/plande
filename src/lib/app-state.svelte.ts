export const appState = $state({
	isDirty: false
});

export const markDirty = () => {
	appState.isDirty = true;
};

export const resetDirty = () => {
	appState.isDirty = false;
};
