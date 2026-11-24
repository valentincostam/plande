<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';

	let { subject, revision }: { subject: string; revision: number } = $props();
	const id = $props.id();
</script>

<form method="POST" action="?/addSource" use:enhance class="mt-3 grid gap-4">
	<p class="text-muted-foreground text-sm leading-5">
		Agregar una fuente te convierte en coautor y tu aprobación no contará.
	</p>
	<label class="grid gap-1.5 text-sm" for={`${id}-source-label`}>
		<span class="font-medium">Etiqueta</span>
		<Input id={`${id}-source-label`} name="source-label" maxlength={2000} required />
	</label>
	<label class="grid gap-1.5 text-sm" for={`${id}-source-url`}>
		<span class="font-medium">URL</span>
		<Input
			id={`${id}-source-url`}
			name="source-url"
			type="url"
			inputmode="url"
			pattern="https?://.+"
			maxlength={2048}
			title="Usá una URL que empiece con http:// o https://"
			required
		/>
	</label>
	<input type="hidden" name="editorSubject" value={subject} />
	<input type="hidden" name="reviewRevision" value={revision} />
	<Button class="justify-self-start" type="submit">Agregar fuente</Button>
</form>
