import { untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { PlanSession } from '$lib/plan-session.svelte';
import {
	createPrivateProgressSaveBody,
	mergePrivateProgress,
	parsePrivateProgress,
	parsePrivateProgressAttempt,
	parsePrivateProgressResolutions,
	privateProgressAccountHeader,
	privateProgressEndpoint,
	type PrivateProgress,
	type PrivateProgressAttempt,
	type PrivateProgressConflict,
	type PrivateProgressResolution
} from './private-progress-contract';

type ProgressSession = Pick<
	PlanSession,
	'items' | 'itemsById' | 'applyProgress' | 'projectProgress'
>;
type PersistAttempt = (attempt: PrivateProgressAttempt | null) => boolean;

class AccountChangedError extends Error {}

export function createPrivateProgressSync(
	session: ProgressSession,
	{
		planId,
		subject,
		persistAttempt
	}: { planId?: string; subject?: string; persistAttempt?: PersistAttempt }
) {
	const privateProgressActive = Boolean(subject && planId);
	const defaultPrivateProgress: PrivateProgress = {
		version: 0,
		items: [
			...session.items.map((item) => ({
				itemId: item.def.id,
				state: item.def.kind === 'course' ? ('notTaken' as const) : ('pending' as const)
			})),
			...session.projectProgress([], false)
		]
	};
	let privateProgressReady = $state(false);
	let privateProgressStatus = $state<
		'pending' | 'saved' | 'failed' | 'conflict' | 'session-changed' | null
	>(null);
	let privateProgressBase = $state<PrivateProgress>(defaultPrivateProgress);
	let privateProgressServer = $state<PrivateProgress | null>(null);
	let privateProgressExpectedVersion = $state(-1);
	let privateProgressLastSaved = $state('');
	let privateProgressConflicts = $state<PrivateProgressConflict[]>([]);
	let privateProgressResolutions = $state<PrivateProgressResolution[]>([]);
	let privateProgressPendingAttempt = $state<PrivateProgressAttempt | null>(null);
	let retiredProgress = $state<PrivateProgress['items']>([]);
	let privateProgressHasLocalOnlyRetiredProgress = false;
	let privateProgressSaving = false;
	let queuedPrivateProgress = false;
	let disposed = false;
	const requests = new AbortController();

	const completePrivateProgress = (progress: PrivateProgress): PrivateProgress => ({
		version: progress.version,
		items: [
			...new SvelteMap([
				...defaultPrivateProgress.items.map((item) => [item.itemId, item] as const),
				...progress.items.map((item) => [item.itemId, item] as const)
			]).values()
		]
	});

	const progressFingerprint = (progress: Pick<PrivateProgress, 'items'>) =>
		JSON.stringify([...progress.items].sort((a, b) => a.itemId.localeCompare(b.itemId)));

	const capturePrivateProgress = (): PrivateProgress => ({
		version: privateProgressBase.version,
		items: [
			...new SvelteMap([
				...privateProgressBase.items.map((item) => [item.itemId, item] as const),
				...(privateProgressServer?.items ?? []).map((item) => [item.itemId, item] as const),
				...session.projectProgress(retiredProgress).map((item) => [item.itemId, item] as const),
				...session.items.map(
					(item) =>
						[
							item.def.id,
							{
								itemId: item.def.id,
								state: item.state,
								...(item.def.kind === 'course' && item.grade !== undefined
									? { grade: item.grade }
									: {})
							}
						] as const
				)
			]).values()
		]
	});

	const applyPrivateProgress = (progress: PrivateProgress) => {
		retiredProgress = progress.items.filter((item) => !session.itemsById.has(item.itemId));
		privateProgressHasLocalOnlyRetiredProgress = session.applyProgress(progress.items);
	};

	const persistPendingAttempt = (attempt: PrivateProgressAttempt | null) => {
		if (!(persistAttempt?.(attempt) ?? true)) return false;
		privateProgressPendingAttempt = attempt;
		return true;
	};

	const reconcile = (
		server: PrivateProgress,
		local = capturePrivateProgress(),
		base = privateProgressBase
	) => {
		const merged = mergePrivateProgress({ base, local, server });
		const resolved = merged.conflicts.filter((conflict) =>
			privateProgressResolutions.some(
				(resolution) =>
					resolution.itemId === conflict.itemId &&
					resolution.field === conflict.field &&
					resolution.local === conflict.local &&
					resolution.server === conflict.server
			)
		);
		for (const conflict of resolved) {
			const resolution = privateProgressResolutions.find(
				(candidate) =>
					candidate.itemId === conflict.itemId &&
					candidate.field === conflict.field &&
					candidate.local === conflict.local &&
					candidate.server === conflict.server
			);
			const item = merged.merged.items.find((candidate) => candidate.itemId === conflict.itemId);
			if (!item || !resolution) continue;
			const value = conflict[resolution.choice];
			if (conflict.field === 'state') item.state = value as typeof item.state;
			else if (value === undefined) delete item.grade;
			else item.grade = value as number;
		}
		const unresolved = merged.conflicts.filter((conflict) => !resolved.includes(conflict));
		privateProgressServer = server;
		privateProgressExpectedVersion = server.version;
		privateProgressLastSaved = progressFingerprint(server);
		privateProgressConflicts = unresolved;
		if (unresolved.length > 0) {
			privateProgressStatus = 'conflict';
			return false;
		}
		applyPrivateProgress(merged.merged);
		privateProgressBase = server;
		return true;
	};

	async function readPrivateProgress(): Promise<PrivateProgress | null> {
		if (!planId) throw new Error('Private progress is unavailable.');
		const response = await fetch(privateProgressEndpoint(planId), {
			headers: { [privateProgressAccountHeader]: subject ?? '' },
			signal: requests.signal
		});
		if (response.status === 401) throw new AccountChangedError();
		const body: unknown = await response.json();
		if (!response.ok || typeof body !== 'object' || body === null || !('progress' in body))
			throw new Error('Private progress is unavailable.');
		return body.progress === null ? null : parsePrivateProgress(body.progress);
	}

	async function hydratePrivateProgress() {
		if (!privateProgressActive || disposed) return;
		privateProgressReady = false;
		try {
			const stored = await readPrivateProgress();
			if (disposed) return;
			const confirmed = completePrivateProgress(stored ?? defaultPrivateProgress);
			const merged = reconcile(confirmed);
			privateProgressExpectedVersion = stored?.version ?? -1;
			if (
				privateProgressPendingAttempt &&
				progressFingerprint(confirmed) === progressFingerprint(privateProgressPendingAttempt)
			)
				persistPendingAttempt(null);
			if (privateProgressPendingAttempt) privateProgressStatus = 'failed';
			else if (merged)
				privateProgressStatus =
					stored && !privateProgressHasLocalOnlyRetiredProgress ? 'saved' : null;
			privateProgressReady = true;
		} catch (error) {
			if (!disposed)
				privateProgressStatus = error instanceof AccountChangedError ? 'session-changed' : 'failed';
		}
	}

	const createAttempt = (progress: PrivateProgress): PrivateProgressAttempt => ({
		expectedVersion: privateProgressExpectedVersion,
		items: progress.items,
		requestId: crypto.randomUUID()
	});

	async function savePrivateProgress(progress = capturePrivateProgress()) {
		if (
			!planId ||
			!privateProgressReady ||
			privateProgressConflicts.length > 0 ||
			disposed ||
			privateProgressStatus === 'session-changed'
		)
			return;
		if (privateProgressSaving) {
			queuedPrivateProgress = true;
			return;
		}
		const attempt = privateProgressPendingAttempt ?? createAttempt(progress);
		if (!privateProgressPendingAttempt && progressFingerprint(attempt) === privateProgressLastSaved)
			return;
		if (!privateProgressPendingAttempt && !persistPendingAttempt(attempt)) {
			privateProgressStatus = 'failed';
			return;
		}
		privateProgressSaving = true;
		privateProgressStatus = 'pending';
		try {
			const response = await fetch(privateProgressEndpoint(planId), {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					[privateProgressAccountHeader]: subject ?? ''
				},
				signal: requests.signal,
				body: createPrivateProgressSaveBody(attempt)
			});
			if (disposed) return;
			if (response.status === 401) {
				privateProgressStatus = 'session-changed';
				return;
			}
			if (response.status === 409) {
				persistPendingAttempt(null);
				const latest = await readPrivateProgress();
				if (!disposed && latest) {
					const merged = reconcile(completePrivateProgress(latest));
					if (merged) {
						privateProgressStatus = privateProgressHasLocalOnlyRetiredProgress ? null : 'saved';
						if (progressFingerprint(capturePrivateProgress()) !== privateProgressLastSaved)
							void savePrivateProgress();
					}
				}
				return;
			}
			const body: unknown = await response.json();
			if (
				!response.ok ||
				typeof body !== 'object' ||
				body === null ||
				!('version' in body) ||
				typeof body.version !== 'number' ||
				!Number.isSafeInteger(body.version) ||
				body.version < 0
			)
				throw new Error('Private progress save failed.');
			const latest = await readPrivateProgress();
			if (disposed || !latest) return;
			persistPendingAttempt(null);
			const merged = reconcile(completePrivateProgress(latest), capturePrivateProgress(), {
				version: body.version,
				items: attempt.items
			});
			if (merged) {
				privateProgressResolutions = [];
				privateProgressStatus = privateProgressHasLocalOnlyRetiredProgress ? null : 'saved';
				if (progressFingerprint(capturePrivateProgress()) !== privateProgressLastSaved)
					void savePrivateProgress();
			}
		} catch (error) {
			if (!disposed)
				privateProgressStatus = error instanceof AccountChangedError ? 'session-changed' : 'failed';
		} finally {
			privateProgressSaving = false;
			if (
				queuedPrivateProgress &&
				!disposed &&
				privateProgressStatus !== 'failed' &&
				privateProgressStatus !== 'session-changed'
			) {
				queuedPrivateProgress = false;
				void savePrivateProgress();
			}
		}
	}

	return {
		get active() {
			return privateProgressActive;
		},
		get status() {
			return privateProgressStatus;
		},
		get conflicts() {
			return privateProgressConflicts;
		},
		get cache() {
			return {
				privateProgressBase,
				privateProgressServer,
				privateProgressLocal: capturePrivateProgress(),
				privateProgressPendingAttempt,
				privateProgressResolutions
			};
		},
		restoreCache(
			base: unknown,
			server: unknown,
			local: unknown,
			pendingAttempt: unknown,
			resolutions: unknown,
			restoreItems: boolean
		) {
			if (base) privateProgressBase = completePrivateProgress(parsePrivateProgress(base));
			if (server) privateProgressServer = completePrivateProgress(parsePrivateProgress(server));
			if (pendingAttempt)
				privateProgressPendingAttempt = parsePrivateProgressAttempt(pendingAttempt);
			if (resolutions) privateProgressResolutions = parsePrivateProgressResolutions(resolutions);
			if (local) {
				const progress = parsePrivateProgress(local);
				if (restoreItems) applyPrivateProgress(progress);
				else
					retiredProgress = session.projectProgress(
						progress.items.filter((item) => !session.itemsById.has(item.itemId))
					);
			}
		},
		hydrate: hydratePrivateProgress,
		sync() {
			if (
				!privateProgressActive ||
				!privateProgressReady ||
				privateProgressConflicts.length > 0 ||
				privateProgressStatus === 'failed'
			)
				return;
			const progress = capturePrivateProgress();
			untrack(() => {
				void savePrivateProgress(progress);
			});
		},
		resolve(itemId: string, field: PrivateProgressConflict['field'], choice: 'local' | 'server') {
			const conflict = privateProgressConflicts.find(
				(candidate) => candidate.itemId === itemId && candidate.field === field
			);
			if (!conflict) return;
			privateProgressResolutions = [
				...privateProgressResolutions.filter(
					(candidate) => candidate.itemId !== itemId || candidate.field !== field
				),
				{ ...conflict, choice }
			];
			const server = privateProgressServer;
			if (!server) return;
			const merged = reconcile(server);
			if (merged) {
				if (progressFingerprint(capturePrivateProgress()) === privateProgressLastSaved)
					privateProgressStatus = 'saved';
				else void savePrivateProgress();
			}
		},
		retry() {
			return privateProgressReady ? savePrivateProgress() : hydratePrivateProgress();
		},
		localStorageFailed() {
			privateProgressStatus = 'failed';
		},
		dispose() {
			disposed = true;
			requests.abort();
		}
	};
}
