<script lang="ts">
	import { Input as ShadcnInput } from '$lib/components/ui/input';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof ShadcnInput>;
	let { value = $bindable(), ...rest }: Props = $props();
</script>

<ShadcnInput bind:value {...rest} />
