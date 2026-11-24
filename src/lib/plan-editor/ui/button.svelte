<script lang="ts">
	import { Button as ShadcnButton } from '$lib/components/ui/button';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof ShadcnButton>, 'variant' | 'size'> & {
		variant?: 'default' | 'outline' | 'ghost' | 'destructive';
		size?: 'default' | 'sm' | 'icon';
	};
	let {
		variant = 'default',
		size = 'default',
		children,
		type = 'button',
		...rest
	}: Props = $props();
</script>

<ShadcnButton {type} {variant} {size} {...rest}>
	{@render children?.()}
</ShadcnButton>
