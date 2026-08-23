export const panelPreferenceKeys = {
	recentPlans: 'plande-panel-recent-plans',
	sharedProgress: 'plande-panel-shared-progress'
} as const;

export function readPanelExpandedPreference(key: string): boolean {
	try {
		return localStorage.getItem(key) !== 'collapsed';
	} catch {
		return true;
	}
}

export function writePanelExpandedPreference(key: string, expanded: boolean): void {
	try {
		localStorage.setItem(key, expanded ? 'expanded' : 'collapsed');
	} catch {
		// The preference is optional; the panel remains usable without storage.
	}
}
