<script lang="ts">
	import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
	import FullscreenButton from './fullscreen-button.svelte';
	import DownloadImageButton from './download-image-button.svelte';
	import DiagramNavigator from './diagram-navigator.svelte';
	import '@xyflow/svelte/dist/style.css';
	import type { StudyPlanViewItem } from '$lib/study-plan-view';
	import { courseTypes, isElectiveOrOptative } from '$lib/course-type';
	import CourseNode from './course-node.svelte';
	import { createDagreLayout, getEdgeStyle } from './diagram-utils';
	import type { Edge, Node } from '@xyflow/svelte';
	import type { CourseEdgeData, CourseNodeData } from './diagram-utils';
	import { SvelteSet } from 'svelte/reactivity';

	type Props = {
		items: StudyPlanViewItem[];
		slug: string;
		useCycleButton?: boolean;
	};

	let { items, slug, useCycleButton = false }: Props = $props();

	// Filter toggle (checked = show, unchecked = hide)
	let showElectives = $state(true);

	// Detect which course types exist
	const hasElectives = $derived(items.some((item) => item.item.def.type === courseTypes.elective));
	const hasOptatives = $derived(items.some((item) => item.item.def.type === courseTypes.optative));
	const electiveCount = $derived(
		items.filter((item) => isElectiveOrOptative(item.item.def.type)).length
	);

	// Dynamic label for electives checkbox
	const electivesLabel = $derived(
		hasElectives && hasOptatives
			? `Mostrar electivas y optativas (${electiveCount})`
			: hasElectives
				? `Mostrar electivas (${electiveCount})`
				: `Mostrar optativas (${electiveCount})`
	);

	const displayedItems = $derived(
		items.filter((item) => showElectives || !isElectiveOrOptative(item.item.def.type))
	);

	// Layout derived from displayed courses - recalculates when filters change
	const layout = $derived(createDagreLayout(displayedItems));

	// Use $state.raw to prevent Svelte from wrapping in proxies - SvelteFlow manages its own state
	let nodes = $state.raw<Node<CourseNodeData>[]>([]);
	let edges = $state.raw<Edge<CourseEdgeData>[]>([]);

	let selectedNodeId = $state<string | null>(null);
	let highlightedNodeId = $state<string | null>(null);
	let isFullscreen = $state(false);
	let navigatorRef: DiagramNavigator | undefined;

	// Expose focusOnCourse to parent component
	export function focusOnCourse(courseId: string) {
		navigatorRef?.focusOnCourse(courseId);
	}

	function onFocus(courseId: string) {
		highlightedNodeId = courseId;
		// Clear highlight after animation completes (3s)
		setTimeout(() => {
			highlightedNodeId = null;
		}, 3000);
	}

	// Recursive BFS to find all connected nodes in both directions
	function getConnectedIdsRecursive(nodeId: string | null): Set<string> {
		if (!nodeId) return new SvelteSet();
		const connected = new SvelteSet<string>();

		// BFS backwards (prerequisites of prerequisites...)
		const visitedBack = new SvelteSet<string>();
		const backQueue = [nodeId];
		while (backQueue.length > 0) {
			const current = backQueue.shift()!;
			if (visitedBack.has(current)) continue;
			visitedBack.add(current);
			connected.add(current);
			layout.edges.filter((e) => e.target === current).forEach((e) => backQueue.push(e.source));
		}

		// BFS forwards (dependents of dependents...)
		const visitedForward = new SvelteSet<string>();
		const forwardQueue = [nodeId];
		while (forwardQueue.length > 0) {
			const current = forwardQueue.shift()!;
			if (visitedForward.has(current)) continue;
			visitedForward.add(current);
			connected.add(current);
			layout.edges.filter((e) => e.source === current).forEach((e) => forwardQueue.push(e.target));
		}

		return connected;
	}

	// Get all edges in the dependency chain
	function getHighlightedEdgeIds(connectedIds: Set<string>): Set<string> {
		if (connectedIds.size === 0) return new SvelteSet();
		return new SvelteSet(
			layout.edges
				.filter((e) => connectedIds.has(e.source) && connectedIds.has(e.target))
				.map((e) => e.id)
		);
	}

	// Update node/edge styling when selection or layout changes
	$effect(() => {
		const connectedIds = getConnectedIdsRecursive(selectedNodeId);
		const highlightedEdgeIds = getHighlightedEdgeIds(connectedIds);

		nodes = layout.nodes.map((node) => ({
			...node,
			data: {
				...node.data,
				useCycleButton,
				isSelected: node.id === selectedNodeId,
				isHighlighted: node.data.item.item.def.id === highlightedNodeId
			},
			class: selectedNodeId && !connectedIds.has(node.id) ? 'opacity-20' : ''
		}));

		edges = layout.edges.map((edge) => ({
			...edge,
			style: getEdgeStyle(edge, selectedNodeId, highlightedEdgeIds)
		}));
	});

	const nodeTypes = { course: CourseNode };

	function isStateSelectClick(event: MouseEvent | TouchEvent) {
		return event
			.composedPath()
			.some((entry) => entry instanceof Element && entry.closest('[data-state-select]'));
	}

	function onnodeclick(event: { node: { id: string }; event: MouseEvent | TouchEvent }) {
		const nodeId = event.node.id;

		if (isStateSelectClick(event.event)) {
			selectedNodeId = nodeId;
			return;
		}

		selectedNodeId = selectedNodeId === nodeId ? null : nodeId;
	}

	function onpaneclick() {
		selectedNodeId = null;
	}
</script>

<div
	role="region"
	aria-label="Diagrama de correlatividades"
	class={[
		'overflow-hidden',
		isFullscreen
			? ''
			: 'relative h-[50vh] min-h-75 w-full border-y border-gray-200 md:h-[60vh] md:rounded-md md:border'
	]}
	style={isFullscreen
		? 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100dvh; z-index: 9999;'
		: ''}
>
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
		fitView
		fitViewOptions={{ padding: 0.2 }}
		proOptions={{ hideAttribution: true }}
		panOnDrag={true}
		zoomOnPinch={true}
		zoomOnScroll={true}
		zoomOnDoubleClick={false}
		minZoom={0.1}
		maxZoom={3}
		elevateEdgesOnSelect={false}
		nodesConnectable={false}
		{onnodeclick}
		{onpaneclick}
	>
		<Background bgColor="var(--diagram-bg-color)" patternColor="var(--diagram-grid-color)" />
		<Controls position="bottom-right" showLock={false}>
			<DownloadImageButton {slug} />
			<FullscreenButton bind:isFullscreen />
		</Controls>
		<DiagramNavigator bind:this={navigatorRef} {onFocus} />
	</SvelteFlow>

	<!-- Visibility filter -->
	{#if hasElectives || hasOptatives}
		<div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
			<div
				class="flex flex-col gap-1.5 rounded-md bg-white/90 px-3 py-2 text-xs outline outline-black/10 dark:bg-gray-200/90 dark:outline-white/10"
			>
				<label class="flex cursor-pointer items-center gap-2 select-none">
					<input
						type="checkbox"
						bind:checked={showElectives}
						class="h-3.5 w-3.5 rounded-sm ring-offset-gray-100 focus:ring-blue-500 dark:border-0 dark:bg-blue-300 dark:not-checked:bg-gray-300"
					/>
					<span class="text-gray-600">{electivesLabel}</span>
				</label>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.svelte-flow__node) {
		transition: opacity 0.2s ease;
		pointer-events: all;
	}

	:global(.svelte-flow__node select),
	:global(.svelte-flow__node button[data-state-select]) {
		pointer-events: all;
		position: relative;
		z-index: 2;
	}

	:global(.svelte-flow__edge) {
		transition: opacity 0.2s ease;
	}

	/* Control buttons styling */
	:global(.svelte-flow__controls) {
		box-shadow: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: transparent;
		border: none;
	}

	:global(.svelte-flow__controls button) {
		width: 44px;
		height: 44px;
		background: white;
		border: none !important;
		border-radius: 10px;
		outline: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.svelte-flow__controls button:hover) {
		background: #f9fafb;
	}

	:global(.dark .svelte-flow__controls button) {
		background: #27272a;
		outline: 1px solid rgba(255, 255, 255, 0.1);
		color: #e5e7eb;
	}

	:global(.dark .svelte-flow__controls button:hover) {
		background: #3f3f46;
	}

	:global(.svelte-flow) {
		--diagram-bg-color: #fff;
		--diagram-grid-color: #e5e7eb;
		--diagram-edge-color: #d1d5db;
	}

	:global(.dark .svelte-flow) {
		--diagram-bg-color: #000;
		--diagram-grid-color: #27272a;
		--diagram-edge-color: #6b7280;
	}

	:global(.svelte-flow__controls button svg) {
		width: 20px;
		height: 20px;
	}

	/* Smaller buttons on desktop */
	@media (min-width: 768px) {
		:global(.svelte-flow__controls) {
			gap: 6px;
		}

		:global(.svelte-flow__controls button) {
			width: 36px;
			height: 36px;
		}

		:global(.svelte-flow__controls button svg) {
			width: 16px;
			height: 16px;
		}
	}
</style>
