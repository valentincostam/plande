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
		'flex cursor-pointer items-center justify-between gap-3 rounded-md bg-gray-100 px-6 py-3 text-gray-900 transition-colors select-none'
	]}
>
	<span>
		<strong>{label}</strong>
		<br />
		<span class=" text-gray-600">{description}</span>
	</span>

	<input type="checkbox" bind:checked={value} {id} class="h-6 w-6 rounded-sm" />
</label>
