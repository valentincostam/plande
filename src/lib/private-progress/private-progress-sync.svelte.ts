import { untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { PlanSession } from '$lib/plan-session.svelte';
import {
	createPrivateProgressSaveBody,
	mergePrivateProgress,
	parsePrivateProgress,
	privateProgressEndpoint,
	privateProgressAccountHeader,
	type PrivateProgress
} from './private-progress-contract';

type ProgressSession = Pick<PlanSession, 'items' | 'itemsById' | 'reset'>;

class AccountChangedError extends Error {}

export function createPrivateProgressSync(
	session: ProgressSession,
	{ planId, subject }: { planId?: string; subject?: string }
) {
	const privateProgressActive = Boolean(subject && planId);
	const defaultPrivateProgress: PrivateProgress = {
		version: 0,
		items: session.items.map((item) => ({
			itemId: item.def.id,
			state: item.def.kind === 'course' ? 'notTaken' : 'pending'
		}))
	};
	let privateProgressReady = $state(false);
	let privateProgressStatus = $state<
		'pending' | 'saved' | 'failed' | 'conflict' | 'session-changed' | null
	>(null);
	let privateProgressBase = $state<PrivateProgress>(defaultPrivateProgress);
	let privateProgressServer = $state<PrivateProgress | null>(null);
	let privateProgressExpectedVersion = $state(-1);
	let privateProgressLastSaved = $state('');
	let privateProgressConflict = $state(false);
	let privateProgressSaving = false;
	let queuedPrivateProgress: PrivateProgress | null = null;
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

	const progressFingerprint = (progress: PrivateProgress) =>
		JSON.stringify([...progress.items].sort((a, b) => a.itemId.localeCompare(b.itemId)));

	const capturePrivateProgress = (): PrivateProgress => ({
		version: privateProgressBase.version,
		items: [
			...new SvelteMap([
				...privateProgressBase.items.map((item) => [item.itemId, item] as const),
				...(privateProgressServer?.items ?? []).map((item) => [item.itemId, item] as const),
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
		session.reset();
		for (const record of progress.items) {
			const item = session.itemsById.get(record.itemId);
			if (!item) continue;
			item.state = record.state;
			if (item.def.kind === 'course') item.grade = record.grade;
		}
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
			const local = capturePrivateProgress();
			const merged = mergePrivateProgress({ base: privateProgressBase, local, server: confirmed });
			privateProgressServer = confirmed;
			privateProgressExpectedVersion = stored?.version ?? -1;
			privateProgressLastSaved = progressFingerprint(confirmed);
			privateProgressConflict = merged.conflicts.length > 0;
			if (privateProgressConflict) {
				privateProgressStatus = 'conflict';
			} else {
				applyPrivateProgress(merged.merged);
				privateProgressBase = confirmed;
				privateProgressStatus = stored ? 'saved' : null;
			}
			privateProgressReady = true;
		} catch (error) {
			if (!disposed)
				privateProgressStatus = error instanceof AccountChangedError ? 'session-changed' : 'failed';
		}
	}

	async function savePrivateProgress(progress = capturePrivateProgress()) {
		if (
			!planId ||
			!privateProgressReady ||
			privateProgressConflict ||
			disposed ||
			privateProgressStatus === 'session-changed'
		)
			return;
		if (privateProgressSaving) {
			queuedPrivateProgress = progress;
			return;
		}
		const serialized = progressFingerprint(progress);
		if (serialized === privateProgressLastSaved) return;
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
				body: createPrivateProgressSaveBody({
					expectedVersion: privateProgressExpectedVersion,
					items: progress.items
				})
			});
			if (disposed) return;
			if (response.status === 401) {
				privateProgressStatus = 'session-changed';
				return;
			}
			if (response.status === 409) {
				privateProgressConflict = true;
				privateProgressStatus = 'conflict';
				try {
					const latest = await readPrivateProgress();
					if (!disposed && latest) privateProgressServer = completePrivateProgress(latest);
				} catch (error) {
					if (!disposed && error instanceof AccountChangedError)
						privateProgressStatus = 'session-changed';
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
			privateProgressExpectedVersion = body.version;
			privateProgressBase = { version: body.version, items: progress.items };
			privateProgressServer = privateProgressBase;
			privateProgressLastSaved = serialized;
			privateProgressStatus = 'saved';
		} catch {
			if (!disposed) privateProgressStatus = 'failed';
		} finally {
			privateProgressSaving = false;
			const queued = queuedPrivateProgress;
			queuedPrivateProgress = null;
			if (queued && !disposed && privateProgressStatus !== 'failed')
				void savePrivateProgress(queued);
		}
	}

	return {
		get active() {
			return privateProgressActive;
		},
		get status() {
			return privateProgressStatus;
		},
		get cache() {
			return {
				privateProgressBase,
				privateProgressServer,
				privateProgressLocal: capturePrivateProgress()
			};
		},
		restoreCache(base: unknown, local: unknown, restoreItems: boolean) {
			if (base) privateProgressBase = completePrivateProgress(parsePrivateProgress(base));
			if (restoreItems && local) applyPrivateProgress(parsePrivateProgress(local));
		},
		hydrate: hydratePrivateProgress,
		sync() {
			if (!privateProgressActive || !privateProgressReady || privateProgressConflict) return;
			const progress = capturePrivateProgress();
			untrack(() => {
				void savePrivateProgress(progress);
			});
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
