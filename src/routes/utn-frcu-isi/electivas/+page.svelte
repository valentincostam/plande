<script lang="ts">
	import { resolve } from '$app/paths';
	import type { StudyPlanData } from '$lib/study-plan-data';
	import { studyPlanDataToCatalogEntry } from '$lib/study-plan-catalog';
	import { utnFrcuIsi2023 } from '../../[slug]/data/utn-frcu-isi-2023';
	import Footer from '../../footer.svelte';
	import Ordinal from '$lib/ordinal.svelte';
	import Link from '$lib/link.svelte';

	const studyPlan = studyPlanDataToCatalogEntry(utnFrcuIsi2023 as unknown as StudyPlanData);
</script>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class="px-3 text-center">
		<Link href={resolve('/')} class="text-sm leading-loose">Plande</Link>
		<p>{studyPlan.collegeName} · {studyPlan.degreeName}</p>
		<h1 class="text-2xl font-bold">{studyPlan.degreeName}</h1>
	</header>

	<main class="grid gap-6 px-6 md:px-0">
		<h2 class="text-lg font-bold">
			¿Por qué debo aprobar 40 horas de materias electivas para egresarme?
		</h2>
		<p>
			La <Link href={`https://${studyPlan.sources[1].url.replace(/^https?:\/\//, '')}`}
				>Ordenanza N° 1877</Link
			>
			define el plan de estudios de la carrera de Ingeniería en Sistemas de Información de la UTN. En
			las páginas 37 y 38, establece que la carga horaria mínima (de
			<strong>dictado anual</strong>) de las materias electivas debe ser:
		</p>

		<ul class="list-disc pl-6">
			<li>
				4 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={3} noun="nivel" /></span
				>
			</li>
			<li>
				6 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={4} noun="nivel" /></span
				>
			</li>
			<li>
				10 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={5} noun="nivel" /></span
				>
			</li>
		</ul>

		<figure>
			<img
				src="/utn-frcu-plan-ordenanza-isi.png"
				alt="Fragmento de la Ordenanza N° 1877 que detalla la carga horaria mínima de materias electivas"
				class="w-full"
			/>
			<figcaption class="mt-2 text-center text-xs text-gray-600">
				Fragmento de la Ordenanza N° 1877 que detalla la carga horaria mínima de materias electivas
			</figcaption>
		</figure>

		<p>
			Sin embargo, en la UTN FRCU, las materias electivas son de
			<strong>dictado cuatrimestral</strong>. Esto significa que la misma cantidad de horas debe ser
			dictada en la mitad del tiempo.
			<em> (Recordemos que un cuatrimestre se cursa durante la mitad de un año). </em> Por lo tanto, para
			cumplir con dicha ordenanza, la carga horaria mínima (de dictado cuatrimestral) de las materias
			electivas debe ser el doble, es decir:
		</p>

		<ul class="list-disc pl-6">
			<li>
				8 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={3} noun="nivel" /></span
				>
			</li>
			<li>
				12 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={4} noun="nivel" /></span
				>
			</li>
			<li>
				20 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={5} noun="nivel" /></span
				>
			</li>
		</ul>

		<p>
			Esto suma un total de <strong>40 horas cátedra semanales</strong> (de dictado cuatrimestral). Esta
			es la cantidad de horas cátedra semanales mínimas de materias electivas aprobadas que exige el plan
			de estudios para egresarse en la carrera de Ingeniería de Sistemas de Información.
		</p>

		<p>
			El plan de estudios de Ingeniería en Sistemas de Información de la UTN FRCU ofrece un total de
			<strong>52 horas cátedra semanales</strong> (de dictado cuatrimestral), distribuidas de la siguiente
			manera:
		</p>

		<ul class="grid list-disc gap-2 pl-6">
			<li>
				8 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={3} noun="nivel" /></span
				>
				<ul class="list-disc pl-6">
					<li>4 horas de <em>Metodología de la Investigación</em></li>
					<li>4 horas de <em>Emprendedorismo</em></li>
				</ul>
			</li>
			<li>
				14 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={4} noun="nivel" /></span
				>
				<ul class="list-disc pl-6">
					<li>6 horas de <em>Relaciones Humanas</em></li>
					<li>8 horas de <em>Sistemas Distribuidos</em></li>
				</ul>
			</li>
			<li>
				30 horas cátedra semanales en el <span class="whitespace-nowrap"
					><Ordinal number={5} noun="nivel" /></span
				>
				<ul class="list-disc pl-6">
					<li>6 horas de <em>Auditoría de Sistemas de Información</em></li>
					<li>
						6 horas de <em>Consolidación de Tecnologías de la Información y las Comunicaciones</em>
					</li>
					<li>6 horas de <em>Gestión Avanzada de Datos</em></li>
					<li>6 horas de <em>Desarrollo de Aplicación Cliente-Servidor</em></li>
					<li>6 horas de <em>Modelado y Optimización de Sistemas</em></li>
				</ul>
			</li>
		</ul>

		<figure>
			<img
				src="/utn-frcu-plan-isi.png"
				alt="Plan de estudios de la carrera de Ingeniería en Sistemas de Información de la UTN FRCU con las materias electivas resaltadas y la suma de horas de las mismas"
				class="w-full"
			/>
			<figcaption class="mt-2 text-center text-xs text-gray-600">
				Plan de estudios de la carrera de Ingeniería en Sistemas de Información de la UTN FRCU con
				las materias electivas resaltadas y la suma de horas de las mismas por nivel
			</figcaption>
		</figure>

		<p>
			Al haber una oferta de 12 horas cátedra semanales por encima de lo exigido por la ordenanza,
			no es necesario cursar o aprobar todas las materias electivas.
			<strong>Basta con aprobar aquellas cuya carga horaria sumen 40 horas cátedra semanales</strong
			>.
		</p>

		<p class="text-center">
			<Link href={resolve('/utn-frcu-isi')}>Volver al plan de estudios</Link>
		</p>
	</main>

	<Footer />
</div>
