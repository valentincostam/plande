import { courseAttributeLabels, isTransversal } from './course-attribute';
import type { Course } from './course.svelte';
import { feminineCourseStateLabels } from './course-state';
import { courseTermLabels } from './course-term';
import { courseTypeLabels } from './course-type';

export type ExportableCourse = {
	codigo: string;
	materia: string;
	año: string;
	periodo: string;
	horas: string;
	tipo: string;
	atributos: string;
	estado: string;
	nota?: number;
};

/**
 * Convierte un curso a formato exportable con labels en español
 */
function courseToExportable(course: Course): ExportableCourse {
	return {
		codigo: course.code ?? '',
		materia: course.name,
		año: course.year?.toString() ?? (isTransversal(course.attributes) ? 'Transversal' : ''),
		periodo: courseTermLabels[course.term],
		horas: course.hours ? course.hours.toString() : '',
		tipo: courseTypeLabels[course.type],
		atributos: course.attributes.map((attr) => courseAttributeLabels[attr]).join(', '),
		estado: feminineCourseStateLabels[course.state],
		nota: course.grade
	};
}

/**
 * Exporta cursos a formato CSV
 */
export function exportToCSV(courses: Course[]): string {
	const headers = [
		'Código',
		'Materia',
		'Año',
		'Período/Modalidad',
		'Horas',
		'Tipo',
		'Atributos',
		'Estado',
		'Nota'
	];
	const rows = courses.map((course) => {
		const exp = courseToExportable(course);
		return [
			escapeCsvValue(exp.codigo),
			escapeCsvValue(exp.materia),
			escapeCsvValue(exp.año),
			escapeCsvValue(exp.periodo),
			exp.horas,
			escapeCsvValue(exp.tipo),
			escapeCsvValue(exp.atributos),
			escapeCsvValue(exp.estado),
			exp.nota
		];
	});

	const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

	// Agregar BOM UTF-8 para correcta visualización en Excel/celulares
	return '\uFEFF' + csvContent;
}

/**
 * Escapa valores para CSV (comillas si contiene coma, salto de línea o comillas)
 */
function escapeCsvValue(value: string): string {
	if (!value) return '';
	if (value.includes(',') || value.includes('\n') || value.includes('"')) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}

/**
 * Exporta cursos a formato JSON
 */
export function exportToJSON(courses: Course[]): string {
	const exportable = courses.map(courseToExportable);
	return JSON.stringify(exportable, null, 2);
}

/**
 * Exporta cursos a formato TOON
 */
export function exportToTOON(courses: Course[]): string {
	const exportable = courses.map(courseToExportable);
	const count = exportable.length;

	// Header con declaración de campos
	const fields = 'codigo,materia,año,periodo,horas,tipo,atributos,estado,nota';
	const header = `materias[${count}]{${fields}}:`;

	// Filas de datos
	const rows = exportable.map((course) => {
		return [
			escapeToonValue(course.codigo),
			escapeToonValue(course.materia),
			course.año,
			escapeToonValue(course.periodo),
			course.horas,
			escapeToonValue(course.tipo),
			escapeToonValue(course.atributos),
			escapeToonValue(course.estado),
			course.nota
		].join(',');
	});

	return [header, ...rows.map((row) => `  ${row}`)].join('\n');
}

/**
 * Escapa valores para TOON (comillas si contiene coma)
 */
function escapeToonValue(value: string): string {
	if (!value) return '';
	if (value.includes(',')) {
		return `"${value.replace(/"/g, '\\"')}"`;
	}
	return value;
}

/**
 * Genera nombre de archivo sanitizado
 */
export function generateFilename(
	degreeName: string,
	universitySlug: string,
	collegeSlug: string | null,
	extension: string
): string {
	const parts = [degreeName, universitySlug];
	if (collegeSlug) {
		parts.push(collegeSlug);
	}

	const sanitized = parts
		.join('-')
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remueve acentos
		.replace(/[^a-z0-9-]/g, '-') // Reemplaza caracteres especiales con guión
		.replace(/-+/g, '-') // Reemplaza múltiples guiones con uno solo
		.replace(/^-|-$/g, ''); // Remueve guiones al inicio y final

	return `${sanitized}.${extension}`;
}

/**
 * Dispara la descarga de un archivo
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
