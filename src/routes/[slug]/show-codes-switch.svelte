<script lang="ts">
	type Props = {
		value?: boolean;
	};

	let { value = $bindable() }: Props = $props();
</script>

<label
	for="show-codes"
	class={[
		value ? 'bg-sky-100 text-sky-900' : 'bg-gray-100 text-gray-900',
		'flex cursor-pointer items-center justify-between gap-3 rounded-md px-6 py-3 transition-colors select-none',
		'focus-within:outline-2 focus-within:outline-blue-500'
	]}
>
	<span>
		<strong>Mostrar identificadores</strong>
		<br />
		Los códigos de las materias se ven junto a sus nombres.
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
		id="show-codes"
		class="absolute right-3 h-8 w-8 opacity-0"
	/>
</label>
