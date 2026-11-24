<script lang="ts">
	import { courseTypeLabels } from '$lib/course-type';
	import * as Field from '$lib/components/ui/field/index.js';
	import type { EditorItem } from './draft-plan-content';
	import Input from './ui/input.svelte';
	import Select from './ui/select.svelte';

	type Course = Extract<EditorItem, { kind: 'course' }>;
	type Patch = Partial<Pick<Course, 'code' | 'credits' | 'hours' | 'tags' | 'totalHours' | 'type'>>;
	let { item, onpatch }: { item: Course; onpatch: (patch: Patch) => void } = $props();
	const fieldId = $props.id();
	const typeOptions = Object.entries(courseTypeLabels).map(([value, label]) => ({ value, label }));
	const metric = (value: string) => (value.trim() === '' ? undefined : Number(value));
	const updateTags = (value: string) => {
		const tags = value
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean);
		onpatch(tags.length ? { tags } : { tags: undefined });
	};
</script>

<Field.Set class="max-w-4xl gap-3">
	<Field.Legend>Datos académicos</Field.Legend>
	<Field.Group
		class="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-[minmax(12rem,1.3fr)_7rem_7rem_minmax(10rem,1fr)]"
	>
		<Field.Field class="col-span-2 sm:col-span-1">
			<Field.Label for={`${fieldId}-type`}>Tipo</Field.Label>
			<Select
				id={`${fieldId}-type`}
				value={item.type}
				options={typeOptions}
				onvaluechange={(value) => onpatch({ type: value as Course['type'] })}
			/>
		</Field.Field>
		<Field.Field>
			<Field.Label for={`${fieldId}-credits`}>Créditos</Field.Label>
			<Input
				id={`${fieldId}-credits`}
				type="number"
				min="0"
				value={item.credits ?? ''}
				oninput={(event) => onpatch({ credits: metric(event.currentTarget.value) })}
			/>
		</Field.Field>
		<Field.Field>
			<Field.Label for={`${fieldId}-hours`}>Horas</Field.Label>
			<Input
				id={`${fieldId}-hours`}
				type="number"
				min="0"
				value={item.hours ?? ''}
				oninput={(event) => onpatch({ hours: metric(event.currentTarget.value) })}
			/>
		</Field.Field>
		<Field.Field class="col-span-2 sm:col-span-1">
			<Field.Label for={`${fieldId}-code`}>Código</Field.Label>
			<Input
				id={`${fieldId}-code`}
				value={item.code ?? ''}
				oninput={(event) => onpatch({ code: event.currentTarget.value.trim() || undefined })}
			/>
		</Field.Field>
		<Field.Field class="max-w-32">
			<Field.Label for={`${fieldId}-total-hours`}>Horas totales</Field.Label>
			<Input
				id={`${fieldId}-total-hours`}
				type="number"
				min="0"
				value={item.totalHours ?? ''}
				oninput={(event) => onpatch({ totalHours: metric(event.currentTarget.value) })}
			/>
		</Field.Field>
		<Field.Field class="col-span-2 max-w-xl sm:col-span-3">
			<Field.Label for={`${fieldId}-tags`}>Etiquetas</Field.Label>
			<Input
				id={`${fieldId}-tags`}
				value={item.tags?.join(', ') ?? ''}
				placeholder="Separadas por coma"
				oninput={(event) => updateTags(event.currentTarget.value)}
			/>
		</Field.Field>
	</Field.Group>
</Field.Set>
