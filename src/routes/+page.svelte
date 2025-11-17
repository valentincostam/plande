<script lang="ts">
	import ChatMessage from './chat-message.svelte';
	import Footer from './footer.svelte';
	import { allStudyPlans } from './[slug]/data/all-study-plans';
	import {
		groupStudyPlansByUniversityAndCollege,
		getStudyPlanSlug,
		getStudyPlanSlugWithYear
	} from '$lib/study-plan';

	const groupedStudyPlans = groupStudyPlansByUniversityAndCollege(allStudyPlans);
</script>

<svelte:head>
	<title>
		Planificá tu carrera universitaria fácil y rápido con un plan de estudios interactivo de Plande
	</title>
	<meta
		name="description"
		content="Plande te ayuda a planificar tu carrera universitaria. Visualizá correlatividades, descubrí qué materias podés cursar ahora y compartí tu progreso."
	/>
</svelte:head>

<div class="mx-auto grid gap-9 py-9 md:max-w-2xl">
	<header class=" gap-1 px-3 text-center">
		<h1 class="text-xl font-bold">Plande 🎓</h1>
		<span class="text-sm text-gray-500">Planes de Estudios Interactivos</span>
	</header>

	<main class="grid gap-9">
		<section class="relative bg-[#F5F1EB] p-6 md:rounded-md">
			<div
				class="bg-size-[412.5px 749.25px] absolute inset-0 h-full w-full bg-[url(/wa-bg.png)] opacity-10"
			></div>
			<div class="relative z-10 grid gap-3">
				<ChatMessage author="Mamá" time="10:17" color="pink">
					Cómo venís con la facultad?
				</ChatMessage>

				<ChatMessage author="Compañero" time="12:14" color="blue">
					Qué podés cursar el cuatrimestre que viene?
				</ChatMessage>

				<ChatMessage author="Amigo" time="19:28" color="green">
					Cuánto te falta para recibirte?
				</ChatMessage>

				<ChatMessage author="Vos" time="19:31" color="blue" isOutgoing>
					<a href="/utn-frcu-isi?s=a26r5e3" class="text-[#1B8755] underline underline-offset-2"
						>https://plande.app/utn-frcu-isi?s=a26r5e3</a
					>
				</ChatMessage>
			</div>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<header class="grid gap-1">
				<h2 class="text-center text-2xl font-bold">
					<span class="whitespace-nowrap">No pierdas tiempo,</span>
					<span class="whitespace-nowrap">recibite más rápido 🚀</span>
				</h2>
				<p class="text-center text-gray-700">
					Batallar con correlatividades confusas y documentos tediosos puede ser frustrante. <span
						class="whitespace-nowrap"
					>
						Plande convierte
					</span> todo ese caos en una herramienta simple.
				</p>
			</header>
			<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5">
					<h3 class="font-bold">Probá sin riesgo</h3>
					<p class="text-gray-700">
						¿Y si curso esta materia primero? ¿Y si dejo esa para el año que viene? Con Plande
						probás todas las combinaciones que se te ocurran y ves cómo afectan tu fecha de
						graduación. Sin apuestas, sin errores costosos.
					</p>
				</div>
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5">
					<h3 class="font-bold">Descubrí qué cursar ahora</h3>
					<p class="text-gray-700">
						Basta de revisar el plan mil veces para entender correlativas. Plande te muestra las
						materias que podés cursar YA y también las que te faltan. Enfocate en lo que suma
						puntos, no en descifrar papeles.
					</p>
				</div>
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5">
					<h3 class="font-bold">Mirá tu progreso real</h3>
					<p class="text-gray-700">
						Nada de calcular a ojo cuánto te falta. Marcás las materias que ya aprobaste y al toque
						ves tu porcentaje completado y cuándo te vas a recibir. La motivación que necesitás para
						seguir adelante.
					</p>
				</div>
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5">
					<h3 class="font-bold">Compartí tu progreso</h3>
					<p class="text-gray-700">
						Cuando tu mamá te pregunte "¿cómo vas con la facultad?", mandále tu link de Plande. Que
						mire todo tu progreso al instante, sin explicaciones largas. Perfecto para que se sienta
						orgullosa de vos (y te deje en paz).
					</p>
				</div>
			</div>
			<div class="flex justify-center pb-6 text-center">
				<a
					href="#carreras"
					class="block rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Probar Plande ahora
				</a>
			</div>
		</section>

		<section class="grid gap-6 px-6 pb-6 md:px-0">
			<header class="text-center text-sm text-gray-600">
				Utilizado por estudiantes de distintas universidades
			</header>
			<div class="flex flex-wrap justify-center gap-x-12 gap-y-6">
				<img
					src="/utn.png"
					alt="UTN"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale"
				/>
				<img
					src="/uader.png"
					alt="UADER"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale"
				/>
				<img
					src="/unca.png"
					alt="UNCA"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale"
				/>
				<img
					src="/udemm.png"
					alt="UDEMM"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale"
				/>
			</div>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<header class="grid gap-1">
				<h2 class="text-center text-2xl font-bold">
					Errores que cuestan <span class="whitespace-nowrap">años de carrera 💔</span>
				</h2>
				<p class="text-center text-gray-700">Este tipo de historias me inspiraron a crear Plande</p>
			</header>
			<div class="grid gap-4">
				<blockquote class="rounded-md bg-gray-100 p-5 text-gray-700 italic">
					"Perdí UN AÑO ENTERO porque no sabía que para cursar Estructuras I necesitaba tener
					Matemática I aprobada. Me enteré cuando quise inscribirme y ya era tarde."
					<footer class="mt-2 text-right text-sm text-gray-500 not-italic">
						— Sofía, estudiante de Arquitectura, UCU
					</footer>
				</blockquote>
				<blockquote class="rounded-md bg-gray-100 p-5 text-gray-700 italic">
					"Pasé SEMANAS tratando de descifrar las correlatividades del plan. Le pregunté a varios
					pero era un quilombo total, nadie se ponía de acuerdo. Al final tuve que ir a secretaría
					académica para entender qué podía cursar y qué no."
					<footer class="mt-2 text-right text-sm text-gray-500 not-italic">
						— Juan, estudiante de Ingeniería, UTN
					</footer>
				</blockquote>
				<blockquote class="rounded-md bg-gray-100 p-5 text-gray-700 italic">
					"Me recibí, pero tardé un cuatrimestre de más porque nunca entendí bien qué materias me
					convenía priorizar. Recién al final me di cuenta de que había desperdiciado tiempo
					cursando materias que podría haber hecho después."
					<footer class="mt-2 text-right text-sm text-gray-500 not-italic">
						— Camila, recibida de Licenciatura, UADER
					</footer>
				</blockquote>
			</div>
			<p class="pb-6 text-center text-gray-600">
				No dejés que te pase lo mismo. <span class="whitespace-nowrap"
					>Probá Plande con tu carrera.</span
				>
			</p>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<header class="grid gap-1">
				<h2 class="scroll-m-6 text-center text-2xl font-bold" id="carreras">
					Tu carrera <span class="whitespace-nowrap">en un solo link 🔗</span>
				</h2>
				<p class="text-center text-gray-700">
					Elegí tu carrera y empezá a trackear tu progreso <span class="whitespace-nowrap"
						>ahora mismo</span
					>
				</p>
			</header>

			<div class="grid gap-4 pb-6">
				<h2 class="text-lg font-bold">Carreras disponibles</h2>
				<div class="grid gap-4">
					{#each groupedStudyPlans as university}
						<div class="relative grid gap-5 rounded-md border border-gray-300 p-5">
							<img
								src={`/${university.universitySlug.toLowerCase()}.png`}
								alt={university.universityName}
								class={[
									'mx-auto max-h-10 max-w-24 object-contain opacity-50 grayscale',
									'md:absolute md:top-5 md:right-5  md:max-h-16 md:max-w-32 md:opacity-30'
								]}
							/>
							<h3 class="text-center font-semibold text-gray-900 md:text-left">
								{university.universityName} ({university.universitySlug})
							</h3>
							{#each university.colleges as college}
								{#if college.collegeName}
									<div class="grid gap-2">
										<h4 class="text-sm font-medium text-gray-700">
											{college.collegeName} ({college.collegeSlug})
										</h4>
										<ul class="space-y-1 md:pl-4">
											{#each college.degrees as degree}
												<li>
													<a
														href={`/${getStudyPlanSlug(degree)}`}
														class="text-sm text-blue-700 transition-colors hover:text-blue-900"
													>
														{degree.degreeName}
														{#if degree.year}
															<span class="text-gray-500"> (Plan {degree.year})</span>
														{/if}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								{:else}
									<ul class="space-y-1 md:pl-4">
										{#each college.degrees as degree}
											<li>
												<a
													href={`/${getStudyPlanSlug(degree)}`}
													class="text-sm text-blue-700 transition-colors hover:text-blue-900"
												>
													{degree.degreeName}
													{#if degree.year}
														<span class="text-gray-500"> (Plan {degree.year})</span>
													{/if}
												</a>
											</li>
										{/each}
									</ul>
								{/if}
							{/each}
						</div>
					{/each}

					<div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
						<span class="text-sm text-gray-600">¿No está tu carrera?</span>
						<a
							href="https://forms.gle/bCC6rCb44LLYERHu6"
							class="ml-1 text-sm text-blue-700 hover:text-blue-900 hover:underline">Pedila acá</a
						>
					</div>
				</div>
			</div>
		</section>

		<section class="grid gap-6 px-6 pb-6 md:px-0">
			<header class="grid gap-1">
				<h2 class="text-center text-2xl font-bold">
					Mejor planificación, <span class="whitespace-nowrap">más egresados 🧑‍🎓</span>
				</h2>

				<p class="text-center text-gray-700">Plande está para que te recibas sin vueltas.</p>
			</header>

			<div class="grid gap-3">
				<h3 class="text-lg font-bold">Contruyamos Plande juntos</h3>
				<p class="text-gray-700">
					Con tu ayuda podemos hacer de Plande la mejor app para planificar tu carrera.
				</p>
				<ul class="list-disc space-y-1 pl-5 text-gray-700">
					<li>¿Qué es lo que más te complica cuando planificás tu carrera?</li>
					<li>¿Qué funcionalidades te gustaría ver en Plande?</li>
				</ul>
				<p class="text-gray-700">
					Tu opinión va a definir la siguiente versión de Plande. Anotate en el siguiente link para
					contarme tus ideas y ser de los primeros en enterarte cuando esté lista.
				</p>
			</div>

			<div class="grid justify-center gap-3 text-center">
				<a
					href="https://forms.gle/mX5AWbNxnmtcRk6W9"
					class="block rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Anotarme en la lista
				</a>
				<p class="text-sm text-gray-600">
					<em>Hagamos que recibirse sea más fácil y rápido</em>
				</p>
			</div>
		</section>
	</main>

	<Footer />
</div>
