<script lang="ts">
	import type { PrivateProgressConflict } from './private-progress-contract';

	let {
		conflicts,
		itemNames,
		onchoose
	}: {
		conflicts: PrivateProgressConflict[];
		itemNames: Record<string, string>;
		onchoose: (
			itemId: string,
			field: PrivateProgressConflict['field'],
			choice: 'local' | 'server'
		) => void;
	} = $props();

	const stateLabel: Record<string, string> = {
		notTaken: 'No cursada',
		inProgress: 'En curso',
		taken: 'Regular',
		passed: 'Aprobada',
		pending: 'Pendiente',
		completed: 'Completado'
	};

	const valueLabel = (conflict: PrivateProgressConflict, value: typeof conflict.local) => {
		if (conflict.field === 'grade') return value === undefined ? 'Sin nota' : String(value);
		return stateLabel[String(value)] ?? String(value);
	};
</script>

<section class="alert alert-warning mt-2 block" aria-labelledby="private-progress-conflicts">
	<h2 id="private-progress-conflicts" class="font-semibold">Elegí qué progreso conservar</h2>
	<p class="mt-1">Hubo cambios distintos en este dispositivo y en tu cuenta.</p>
	{#each conflicts as conflict (`${conflict.itemId}-${conflict.field}`)}
		<fieldset class="mt-3">
			<legend class="font-medium">
				{itemNames[conflict.itemId] ?? 'Ítem histórico'} ·
				{conflict.field === 'state' ? 'Estado' : 'Nota'}
			</legend>
			<div class="mt-2 flex flex-wrap gap-2">
				<button
					type="button"
					class="btn btn-sm"
					aria-label={`Conservar este dispositivo para ${itemNames[conflict.itemId] ?? 'ítem histórico'}: ${valueLabel(conflict, conflict.local)}`}
					onclick={() => onchoose(conflict.itemId, conflict.field, 'local')}
				>
					Este dispositivo: {valueLabel(conflict, conflict.local)}
				</button>
				<button
					type="button"
					class="btn btn-sm"
					aria-label={`Usar la cuenta para ${itemNames[conflict.itemId] ?? 'ítem histórico'}: ${valueLabel(conflict, conflict.server)}`}
					onclick={() => onchoose(conflict.itemId, conflict.field, 'server')}
				>
					Tu cuenta: {valueLabel(conflict, conflict.server)}
				</button>
			</div>
		</fieldset>
	{/each}
</section>
