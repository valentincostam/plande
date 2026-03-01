<script lang="ts">
	import { marked } from 'marked';
	import { findRedundantRequirements } from '$lib/raw-course';
	import type { RawCourse } from '$lib/raw-course';

	let { courses }: { courses: RawCourse[] } = $props();
</script>

<ol class="grid list-decimal gap-3 px-9">
	{#each findRedundantRequirements(courses) as redundantRequirement (redundantRequirement)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<li>{@html marked(redundantRequirement)}</li>
	{/each}
</ol>
