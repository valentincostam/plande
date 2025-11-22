<script lang="ts">
	import type { Course } from '$lib/course.svelte';
	import {
		exportToCSV,
		exportToJSON,
		exportToTOON,
		downloadFile,
		generateFilename
	} from '$lib/export';
	import DownloadIcon from './download-icon.svelte';
	import CheckIcon from './check-icon.svelte';

	type Props = {
		format: 'csv' | 'json' | 'toon';
		courses: Course[];
		degreeName: string;
		universitySlug: string;
		collegeSlug: string | null;
	};

	let props: Props = $props();

	let isDownloaded = $state(false);

	const formatLabels = {
		csv: 'CSV',
		json: 'JSON',
		toon: 'TOON'
	};

	const mimeTypes = {
		csv: 'text/csv;charset=utf-8;',
		json: 'application/json;charset=utf-8;',
		toon: 'text/plain;charset=utf-8;'
	};

	const onclick = () => {
		if (isDownloaded) return;

		let content: string;
		switch (props.format) {
			case 'csv':
				content = exportToCSV(props.courses);
				break;
			case 'json':
				content = exportToJSON(props.courses);
				break;
			case 'toon':
				content = exportToTOON(props.courses);
				break;
		}

		const filename = generateFilename(
			props.degreeName,
			props.universitySlug,
			props.collegeSlug,
			props.format
		);

		downloadFile(content, filename, mimeTypes[props.format]);

		isDownloaded = true;
		setTimeout(() => {
			isDownloaded = false;
		}, 2000);
	};
</script>

<button
	{onclick}
	class="flex items-center justify-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-blue-900 transition select-none hover:bg-blue-100 active:scale-95"
>
	{#if isDownloaded}
		<CheckIcon class="w-4 shrink-0" />
	{:else}
		<DownloadIcon class="w-4 shrink-0" />
	{/if}
	<span class="text-sm">
		{isDownloaded ? 'Descargado' : `Descargar ${formatLabels[props.format]}`}
	</span>
</button>
