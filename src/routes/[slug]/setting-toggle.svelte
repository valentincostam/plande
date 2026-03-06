<script lang="ts">
	type Props = {
		id: string;
		value?: boolean;
		label: string;
		description: string;
	};

	let { id, value = $bindable(), label, description }: Props = $props();
</script>

<label
	for={id}
	class={[
		'flex cursor-pointer items-center justify-between gap-3 rounded-md bg-gray-100 px-6 py-3 text-gray-900 select-none'
	]}
>
	<span>
		<strong>{label}</strong>
		<br />
		<span class="text-gray-600">{description}</span>
	</span>

	<input
		type="checkbox"
		bind:checked={value}
		{id}
		class="h-6 w-6 cursor-pointer rounded-sm ring-offset-gray-100 focus:ring-blue-500 dark:border-0 dark:bg-blue-300 dark:not-checked:bg-gray-300"
	/>
</label>
