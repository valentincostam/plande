import dagre from '@dagrejs/dagre';
import type { Node, Edge } from '@xyflow/svelte';
import type { Course } from '$lib/course.svelte';

export const NODE_WIDTH = 280;
export const NODE_HEIGHT = 76;

export type EdgeType = 'enroll' | 'complete';

export type CourseNodeData = {
	course: Course;
};

export type CourseEdgeData = {
	type: EdgeType;
};

export function createDagreLayout(courses: Course[]): {
	nodes: Node<CourseNodeData>[];
	edges: Edge<CourseEdgeData>[];
} {
	const g = new dagre.graphlib.Graph();

	g.setGraph({
		rankdir: 'LR',
		nodesep: 30,
		ranksep: 80,
		marginx: 20,
		marginy: 20
	});

	g.setDefaultEdgeLabel(() => ({}));

	// Add nodes
	courses.forEach((course) => {
		g.setNode(String(course.id), { width: NODE_WIDTH, height: NODE_HEIGHT });
	});

	// Generate edges for both requirement types
	const edges: Edge<CourseEdgeData>[] = [];
	const addedEdges = new Set<string>();

	courses.forEach((course) => {
		// For enrollment - solid blue line
		course.requirementsForEnrollment.forEach((req) => {
			const edgeId = `e-${req.requiredCourse.id}-${course.id}`;
			if (addedEdges.has(edgeId)) return;
			addedEdges.add(edgeId);

			g.setEdge(String(req.requiredCourse.id), String(course.id));
			edges.push({
				id: edgeId,
				source: String(req.requiredCourse.id),
				target: String(course.id),
				data: { type: 'enroll' }
			});
		});

		// For completion - dashed amber line
		course.requirementsForCompletion.forEach((req) => {
			const edgeId = `c-${req.requiredCourse.id}-${course.id}`;
			if (addedEdges.has(edgeId)) return;
			addedEdges.add(edgeId);

			g.setEdge(String(req.requiredCourse.id), String(course.id));
			edges.push({
				id: edgeId,
				source: String(req.requiredCourse.id),
				target: String(course.id),
				data: { type: 'complete' }
			});
		});
	});

	// Run layout
	dagre.layout(g);

	// Extract positions
	const nodes: Node<CourseNodeData>[] = courses.map((course) => {
		const pos = g.node(String(course.id));
		return {
			id: String(course.id),
			type: 'course',
			position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 },
			data: { course },
			draggable: false
		};
	});

	return { nodes, edges };
}

// Edge colors
export const EDGE_COLOR_ENROLL = '#d1d5db'; // gray-300 (light gray for "Para cursar")
export const EDGE_COLOR_COMPLETE = '#6b7280'; // gray-500 (medium gray for "Para rendir")

export function getEdgeStyle(
	edge: Edge<CourseEdgeData>,
	selectedNodeId: string | null,
	highlightedEdgeIds: Set<string>
): string {
	const opacity = selectedNodeId && !highlightedEdgeIds.has(edge.id) ? 0.15 : 1;
	const width = selectedNodeId && highlightedEdgeIds.has(edge.id) ? 3 : 2;

	return `stroke: ${EDGE_COLOR_ENROLL}; stroke-width: ${width}px; opacity: ${opacity};`;
}
