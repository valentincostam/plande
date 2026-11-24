<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { cn } from './utils';

	const generatedId = $props.id();

	type Option = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	let {
		ref = $bindable(null),
		id,
		name,
		options,
		value = $bindable(''),
		placeholder = 'Elegí una opción',
		disabled = false,
		required = false,
		class: className,
		contentClass,
		ariaLabel,
		ariaDescribedby,
		ariaInvalid,
		onvaluechange
	}: {
		ref?: HTMLButtonElement | null;
		id?: string;
		name?: string;
		options: Option[];
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		contentClass?: string;
		ariaLabel?: string;
		ariaDescribedby?: string;
		ariaInvalid?: boolean | 'true' | 'false';
		onvaluechange?: (value: string) => void;
	} = $props();
</script>

<Select.Root
	type="single"
	bind:value
	items={options}
	{name}
	{disabled}
	{required}
	onValueChange={onvaluechange}
>
	<Select.Trigger
		bind:ref
		{id}
		role="combobox"
		class={cn('w-full', className)}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={ariaInvalid}
		aria-controls={`${id ?? generatedId}-options`}
	>
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content
		id={`${id ?? generatedId}-options`}
		class={cn('plan-editor', contentClass)}
		aria-label={ariaLabel ?? 'Opciones disponibles'}
	>
		{#each options as option (option.value)}
			<Select.Item value={option.value} label={option.label} disabled={option.disabled}>
				{option.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
