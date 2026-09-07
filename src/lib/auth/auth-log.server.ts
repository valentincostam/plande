import { version } from '$app/environment';

export type AuthOperation = 'callback' | 'sign-in' | 'sign-out' | 'session-validation';
export type AuthResult = 'failure' | 'success' | 'unavailable';

export const logAuthEvent = (
	operation: AuthOperation,
	result: AuthResult,
	startedAt: number,
	correlationId: string
) => {
	try {
		console.info(
			JSON.stringify({
				operation,
				result,
				durationMs: Date.now() - startedAt,
				version,
				correlationId
			})
		);
	} catch {
		return;
	}
};
