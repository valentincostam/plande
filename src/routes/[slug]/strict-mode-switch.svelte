<script lang="ts">
	type Props = {
		value?: boolean;
	};

	let { value = $bindable() }: Props = $props();
</script>

<label
	for="strict-mode"
	class={[
		value ? 'bg-sky-100 text-sky-900' : 'bg-gray-100 text-gray-900',
		'flex cursor-pointer items-center justify-between rounded-md px-6 py-3 transition-colors select-none',
		'focus-within:outline-2 focus-within:outline-blue-500'
	]}
>
	<span>
		<strong>Modo estricto</strong>
		<br />
		Los requisitos de las materias <span class="whitespace-nowrap">son obligatorios</span>.
	</span>

	<span
		class={[
			value ? 'bg-sky-600' : 'bg-gray-600',
			'shrink-0 rounded-md px-2 py-1 text-center text-xs text-white transition-colors'
		]}
	>
		{value ? 'Activado' : 'Desactivado'}
	</span>

	<input
		type="checkbox"
		bind:checked={value}
		id="strict-mode"
		class="absolute right-3 h-8 w-8 opacity-0"
	/>
</label>
