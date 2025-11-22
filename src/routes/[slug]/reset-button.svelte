<script lang="ts">
	type Props = {
		onclick: () => void;
	};

	let { onclick }: Props = $props();
</script>

<button
	{onclick}
	class="group flex cursor-pointer items-center justify-between gap-3 rounded-md border-1 border-gray-300 bg-white px-6 py-3 text-left transition-colors select-none hover:border-red-300 hover:bg-red-50 active:scale-[0.99]"
>
	<span class="flex-1">
		<strong class="text-gray-900 transition-colors group-hover:text-red-900"
			>Reiniciar progreso</strong
		>
		<br />
		<span class="text-gray-600 transition-colors group-hover:text-red-800"
			>Se perderán estados de materias, notas y configuraciones</span
		>
	</span>

	<svg
		class="h-6 w-6 shrink-0 text-gray-900 group-hover:text-red-900"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
		/>
	</svg>
</button>
