<script lang="ts">
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { onMount, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';

	type Props = {
		id: string;
		name: string;
		label: string;
		placeholder: string;
		options: string[];
		value?: string;
		disabled?: boolean;
		error?: string;
		onvaluechange?: (value: string) => void;
	};

	let {
		id,
		name,
		label,
		placeholder,
		options,
		value = $bindable(''),
		disabled = false,
		error,
		onvaluechange
	}: Props = $props();

	let open = $state(false);
	let ready = $state(false);
	onMount(() => {
		ready = true;
	});
	let query = $state('');
	const errorId = $derived(error ? `${id}-error` : undefined);
	const normalizedQuery = $derived(query.trim());
	const hasExactOption = $derived(
		options.some(
			(option) => option.localeCompare(normalizedQuery, undefined, { sensitivity: 'accent' }) === 0
		)
	);

	function select(next: string) {
		value = next;
		onvaluechange?.(next);
		open = false;
		query = '';
		tick().then(() => document.getElementById(id)?.focus());
	}
</script>

<div class="grid gap-1.5 text-sm">
	<span id={`${id}-label`} class="font-medium">{label}</span>
	<input hidden {name} bind:value />
	<Popover.Root bind:open>
		<Popover.Trigger {id} disabled={disabled || !ready}>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-full justify-between bg-gray-50 text-left text-gray-900"
					role="combobox"
					aria-labelledby={`${id}-label`}
					aria-describedby={errorId}
					aria-invalid={error ? 'true' : undefined}
					aria-expanded={open}
					disabled={disabled || !ready}
				>
					<span class="truncate">{value || placeholder}</span>
					<ChevronsUpDownIcon class="size-4 shrink-0 opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-(--bits-popover-anchor-width) p-0">
			<Command.Root>
				<Command.Input bind:value={query} placeholder={`Buscar ${label.toLocaleLowerCase()}...`} />
				<Command.List>
					<Command.Empty>No hay coincidencias.</Command.Empty>
					<Command.Group>
						{#each options as option (option)}
							<Command.Item value={option} onSelect={() => select(option)}>
								{option}
							</Command.Item>
						{/each}
						{#if normalizedQuery && !hasExactOption}
							<Command.Item value={normalizedQuery} onSelect={() => select(normalizedQuery)}>
								Agregar “{normalizedQuery}”
							</Command.Item>
						{/if}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	{#if error}<p id={errorId} class="text-sm text-red-700">{error}</p>{/if}
</div>
