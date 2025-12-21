<script lang="ts">
	type Props = {
		college?: string;
	};

	let { college = 'universidad' }: Props = $props();

	const isFemenine = $derived(college.split(' ')[0].toLowerCase() === 'facultad');
</script>

<section>
	<div class="grid gap-3 bg-gray-100 p-6 text-xs text-gray-600 md:rounded-md">
		<p>
			<strong>Plande podría tener errores o información incompleta</strong>. No tomen decisiones
			cruciales sobre sus estudios basándose únicamente en la información proporcionada aquí.
			Recuerden consultar a sus asesores académicos o fuentes oficiales {isFemenine
				? 'de la'
				: 'del'}
			{college}
			para obtener orientación precisa y actualizada.
		</p>
		<p>
			Esta aplicación es una iniciativa independiente y no está afiliada ni respaldada por la
			universidad. Cualquier información proporcionada aquí es resultado de esfuerzos individuales y
			no representa oficialmente a la institución educativa.
		</p>
	</div>
</section>
