<script lang="ts">
	import { toPng } from 'html-to-image';
	import { ControlButton, getNodesBounds, getViewportForBounds, useNodes } from '@xyflow/svelte';

	type Props = {
		slug: string;
	};

	let { slug }: Props = $props();

	const nodes = useNodes();
	let isDownloading = $state(false);

	// Padding around the diagram (in pixels at scale 1)
	const PADDING = 50;
	// Scale factor for higher resolution
	const SCALE = 2;

	async function handleClick() {
		if (isDownloading) return;
		isDownloading = true;

		try {
			const nodesBounds = getNodesBounds(nodes.current);

			// Calculate image dimensions based on actual diagram size + padding
			const imageWidth = Math.ceil((nodesBounds.width + PADDING * 2) * SCALE);
			const imageHeight = Math.ceil((nodesBounds.height + PADDING * 2) * SCALE);

			// Get viewport transform to fit all nodes with padding
			const viewport = getViewportForBounds(
				nodesBounds,
				imageWidth,
				imageHeight,
				0.5,
				2,
				PADDING / Math.max(nodesBounds.width, nodesBounds.height)
			);

			const viewportDomNode = document.querySelector<HTMLElement>('.svelte-flow__viewport');
			const isDarkMode = document.documentElement.classList.contains('dark');

			if (viewport && viewportDomNode) {
				const dataUrl = await toPng(viewportDomNode, {
					backgroundColor: isDarkMode ? '#18181b' : '#f9fafb',
					width: imageWidth,
					height: imageHeight,
					style: {
						width: `${imageWidth}px`,
						height: `${imageHeight}px`,
						transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
					}
				});

				const link = document.createElement('a');
				link.download = `diagrama-${slug}-correlatividades.png`;
				link.href = dataUrl;
				link.click();
			}
		} finally {
			isDownloading = false;
		}
	}
</script>

<ControlButton onclick={handleClick} title="Descargar imagen PNG" disabled={isDownloading}>
	<svg viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" />
	</svg>
</ControlButton>
