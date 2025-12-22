<script lang="ts">
	import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
	import FullscreenButton from './fullscreen-button.svelte';
	import '@xyflow/svelte/dist/style.css';
	import type { Course } from '$lib/course.svelte';
	import { courseTags } from '$lib/course-tag';
	import CourseNode from './course-node.svelte';
	import { createDagreLayout, getEdgeStyle } from './diagram-utils';
	import type { Edge, Node } from '@xyflow/svelte';
	import type { CourseEdgeData, CourseNodeData } from './diagram-utils';

	type Props = {
		courses: Course[];
	};

	let { courses }: Props = $props();

	// Filter toggle (checked = show, unchecked = hide)
	let showElectives = $state(true);

	// Detect which course types exist
	const hasElectives = $derived(courses.some((c) => c.tag === courseTags.elective));
	const hasOptatives = $derived(courses.some((c) => c.tag === courseTags.optative));

	// Dynamic label for electives checkbox
	const electivesLabel = $derived(
		hasElectives && hasOptatives
			? 'Mostrar electivas/optativas'
			: hasElectives
				? 'Mostrar electivas'
				: 'Mostrar optativas'
	);

	// Filter courses based on toggle
	const displayedCourses = $derived(
		courses.filter((c) => {
			if (!showElectives && (c.tag === courseTags.elective || c.tag === courseTags.optative)) {
				return false;
			}
			return true;
		})
	);

	// Layout derived from displayed courses - recalculates when filters change
	const layout = $derived(createDagreLayout(displayedCourses));

	// Use $state.raw to prevent Svelte from wrapping in proxies - SvelteFlow manages its own state
	let nodes = $state.raw<Node<CourseNodeData>[]>([]);
	let edges = $state.raw<Edge<CourseEdgeData>[]>([]);

	let selectedNodeId = $state<string | null>(null);
	let isFullscreen = $state(false);

	// Recursive BFS to find all connected nodes in both directions
	function getConnectedIdsRecursive(nodeId: string | null): Set<string> {
		if (!nodeId) return new Set();
		const connected = new Set<string>();

		// BFS backwards (prerequisites of prerequisites...)
		const visitedBack = new Set<string>();
		const backQueue = [nodeId];
		while (backQueue.length > 0) {
			const current = backQueue.shift()!;
			if (visitedBack.has(current)) continue;
			visitedBack.add(current);
			connected.add(current);
			layout.edges
				.filter((e) => e.target === current)
				.forEach((e) => backQueue.push(e.source));
		}

		// BFS forwards (dependents of dependents...)
		const visitedForward = new Set<string>();
		const forwardQueue = [nodeId];
		while (forwardQueue.length > 0) {
			const current = forwardQueue.shift()!;
			if (visitedForward.has(current)) continue;
			visitedForward.add(current);
			connected.add(current);
			layout.edges
				.filter((e) => e.source === current)
				.forEach((e) => forwardQueue.push(e.target));
		}

		return connected;
	}

	// Get all edges in the dependency chain
	function getHighlightedEdgeIds(connectedIds: Set<string>): Set<string> {
		if (connectedIds.size === 0) return new Set();
		return new Set(
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
				isSelected: node.id === selectedNodeId
			},
			class: selectedNodeId && !connectedIds.has(node.id) ? 'opacity-20' : ''
		}));

		edges = layout.edges.map((edge) => ({
			...edge,
			style: getEdgeStyle(edge, selectedNodeId, highlightedEdgeIds)
		}));
	});

	const nodeTypes = { course: CourseNode };

	function handleNodeClick(event: { node: { id: string } }) {
		const nodeId = event.node.id;
		selectedNodeId = selectedNodeId === nodeId ? null : nodeId;
	}

	function handlePaneClick() {
		selectedNodeId = null;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={[
		'overflow-hidden bg-gray-50',
		isFullscreen
			? ''
			: 'relative h-[50vh] min-h-[300px] w-full border-y border-gray-200 md:h-[60vh] md:rounded-md md:border'
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
		minZoom={0.1}
		maxZoom={3}
		nodesConnectable={false}
		onnodeclick={handleNodeClick}
		onpaneclick={handlePaneClick}
	>
		<Background />
		<Controls position="bottom-right" showLock={false}>
			<FullscreenButton bind:isFullscreen />
		</Controls>
	</SvelteFlow>

	<!-- Visibility filter -->
	{#if hasElectives || hasOptatives}
		<div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
			<div
				class="flex flex-col gap-1.5 rounded-md bg-white/90 px-3 py-2 text-xs outline outline-black/10"
			>
				<label class="flex cursor-pointer items-center gap-2 select-none">
					<input
						type="checkbox"
						bind:checked={showElectives}
						class="h-3.5 w-3.5 rounded border-gray-300 text-blue-600"
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
