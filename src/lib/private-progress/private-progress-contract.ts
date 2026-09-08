import { courseStates } from '$lib/course-state';
import { milestoneStates, type ItemState } from '$lib/study-plan-data';

export type PrivateProgressItem = {
	itemId: string;
	state: ItemState;
	grade?: number;
};

export type PrivateProgress = {
	version: number;
	items: PrivateProgressItem[];
};

export type PrivateProgressSave = {
	expectedVersion: number;
	items: PrivateProgressItem[];
};

export type PrivateProgressAttempt = PrivateProgressSave & {
	requestId: string;
};

export type PrivateProgressConflict = {
	itemId: string;
	field: 'state' | 'grade';
	local: ItemState | number | undefined;
	server: ItemState | number | undefined;
};

export type PrivateProgressResolution = PrivateProgressConflict & {
	choice: 'local' | 'server';
};

export type PrivateProgressMerge = {
	merged: PrivateProgress;
	conflicts: PrivateProgressConflict[];
};

export const privateProgressSave = 'private_progress_save';
export const privateProgressSaveOnce = 'private_progress_save_once';
export const privateProgressAccountHeader = 'x-plande-account';

export class PrivateProgressContractError extends Error {
	constructor() {
		super('Private progress payload is invalid.');
	}
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const states = new Set<ItemState>([
	courseStates.notTaken,
	courseStates.inProgress,
	courseStates.taken,
	courseStates.passed,
	milestoneStates.pending,
	milestoneStates.completed
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const parseVersion = (value: unknown): number => {
	if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
		throw new PrivateProgressContractError();
	}
	return value;
};

const parseExpectedVersion = (value: unknown): number => {
	if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < -1) {
		throw new PrivateProgressContractError();
	}
	return value;
};

const parseItem = (value: unknown): PrivateProgressItem => {
	if (!isRecord(value) || typeof value.itemId !== 'string' || value.itemId.length === 0) {
		throw new PrivateProgressContractError();
	}
	if (!states.has(value.state as ItemState)) throw new PrivateProgressContractError();
	const grade = value.grade;
	if (
		'grade' in value &&
		(typeof grade !== 'number' || !Number.isInteger(grade) || grade < 4 || grade > 10)
	) {
		throw new PrivateProgressContractError();
	}

	return {
		itemId: value.itemId,
		state: value.state as ItemState,
		...(typeof grade === 'number' ? { grade } : {})
	};
};

const parseItems = (value: unknown) => {
	if (!Array.isArray(value)) throw new PrivateProgressContractError();
	const items = value.map(parseItem);
	if (new Set(items.map((item) => item.itemId)).size !== items.length) {
		throw new PrivateProgressContractError();
	}
	return items;
};

export const assertPrivateProgressPlanId = (planId: string) => {
	if (!uuidPattern.test(planId)) throw new PrivateProgressContractError();
	return planId;
};

export const privateProgressEndpoint = (planId: string) => {
	assertPrivateProgressPlanId(planId);
	return `/api/private-progress/${encodeURIComponent(planId)}`;
};

export const parsePrivateProgress = (value: unknown): PrivateProgress => {
	if (!isRecord(value)) throw new PrivateProgressContractError();
	return { version: parseVersion(value.version), items: parseItems(value.items) };
};

export const parsePrivateProgressSave = (value: unknown): PrivateProgressSave => {
	if (!isRecord(value)) throw new PrivateProgressContractError();
	return {
		expectedVersion: parseExpectedVersion(value.expectedVersion),
		items: parseItems(value.items)
	};
};

export const parsePrivateProgressAttempt = (value: unknown): PrivateProgressAttempt => {
	if (
		!isRecord(value) ||
		typeof value.requestId !== 'string' ||
		!uuidPattern.test(value.requestId)
	) {
		throw new PrivateProgressContractError();
	}
	return { ...parsePrivateProgressSave(value), requestId: value.requestId };
};

export const parsePrivateProgressResolutions = (value: unknown): PrivateProgressResolution[] => {
	if (!Array.isArray(value)) throw new PrivateProgressContractError();
	return value.map((resolution) => {
		if (
			!isRecord(resolution) ||
			typeof resolution.itemId !== 'string' ||
			resolution.itemId.length === 0 ||
			(resolution.field !== 'state' && resolution.field !== 'grade') ||
			(resolution.choice !== 'local' && resolution.choice !== 'server')
		)
			throw new PrivateProgressContractError();
		const local = resolution.local;
		const server = resolution.server;
		if (
			(resolution.field === 'state' &&
				(!states.has(local as ItemState) || !states.has(server as ItemState))) ||
			(resolution.field === 'grade' &&
				((local !== undefined && (typeof local !== 'number' || !Number.isInteger(local))) ||
					(server !== undefined && (typeof server !== 'number' || !Number.isInteger(server)))))
		)
			throw new PrivateProgressContractError();
		return resolution as PrivateProgressResolution;
	});
};

export const createPrivateProgressSaveBody = (save: PrivateProgressSave | PrivateProgressAttempt) =>
	JSON.stringify(
		'requestId' in save ? parsePrivateProgressAttempt(save) : parsePrivateProgressSave(save)
	);

const indexItems = (items: PrivateProgressItem[]) =>
	new Map(items.map((item) => [item.itemId, item]));

const mergeField = <T>(
	itemId: string,
	field: PrivateProgressConflict['field'],
	base: T | undefined,
	local: T | undefined,
	server: T | undefined,
	conflicts: PrivateProgressConflict[]
) => {
	const localChanged = local !== base;
	const serverChanged = server !== base;

	if (localChanged && serverChanged && local !== server) {
		conflicts.push({
			itemId,
			field,
			local: local as ItemState | number | undefined,
			server: server as ItemState | number | undefined
		});
		return server;
	}

	return localChanged ? local : server;
};

export const mergePrivateProgress = ({
	base,
	local,
	server
}: {
	base: PrivateProgress;
	local: PrivateProgress;
	server: PrivateProgress;
}): PrivateProgressMerge => {
	const baseItems = indexItems(base.items);
	const localItems = indexItems(local.items);
	const serverItems = indexItems(server.items);
	const itemIds = new Set([...serverItems.keys(), ...localItems.keys(), ...baseItems.keys()]);
	const conflicts: PrivateProgressConflict[] = [];
	const items = [...itemIds].map((itemId) => {
		const baseItem = baseItems.get(itemId);
		const localItem = localItems.get(itemId);
		const serverItem = serverItems.get(itemId);
		const state = mergeField(
			itemId,
			'state',
			baseItem?.state,
			localItem ? localItem.state : baseItem?.state,
			serverItem ? serverItem.state : baseItem?.state,
			conflicts
		) as ItemState;
		const grade = mergeField(
			itemId,
			'grade',
			baseItem?.grade,
			localItem ? localItem.grade : baseItem?.grade,
			serverItem ? serverItem.grade : baseItem?.grade,
			conflicts
		) as number | undefined;

		return { itemId, state, ...(grade === undefined ? {} : { grade }) };
	});

	return { merged: { version: server.version, items }, conflicts };
};
