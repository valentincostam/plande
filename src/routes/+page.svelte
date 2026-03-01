<script lang="ts">
	import ChatMessage from './chat-message.svelte';
	import Footer from './footer.svelte';
	import HighlightText from './highlight-text.svelte';
	import { allStudyPlans } from './[slug]/data/all-study-plans';
	import { groupStudyPlansByUniversityAndCollege, getStudyPlanSlugWithYear } from '$lib/study-plan';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import { matchesSearch, normalizeSearchText } from '$lib/search';

	let searchQuery = $state('');

	function getStudyPlanSearchText(plan: (typeof allStudyPlans)[number]): string {
		return [
			plan.degreeName,
			plan.universityName,
			plan.universitySlug,
			plan.collegeName,
			plan.collegeSlug
		]
			.filter(Boolean)
			.join(' ');
	}

	const normalizedQuery = $derived(normalizeSearchText(searchQuery));

	const filteredStudyPlans = $derived.by(() => {
		if (!normalizedQuery) return allStudyPlans;

		return allStudyPlans.filter((plan) => matchesSearch(getStudyPlanSearchText(plan), searchQuery));
	});

	const groupedPlans = $derived(groupStudyPlansByUniversityAndCollege(filteredStudyPlans));

	const totalResults = $derived(
		groupedPlans.reduce(
			(total, uni) => total + uni.colleges.reduce((sum, col) => sum + col.degrees.length, 0),
			0
		)
	);

	const hasActiveSearch = $derived(normalizedQuery.length > 0);
</script>

<svelte:head>
	<title>
		Planificá tu carrera universitaria fácil y rápido con un plan de estudios interactivo de Plande
	</title>
	<meta
		name="description"
		content="Plande te ayuda a planificar tu carrera universitaria. Visualizá correlatividades, descubrí qué materias podés cursar ahora y compartí tu progreso."
	/>
	<link rel="canonical" href="https://plande.app/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Plande - Planificador de Carreras Universitarias" />
	<meta
		property="og:description"
		content="Plande te ayuda a planificar tu carrera universitaria. Visualizá correlatividades, descubrí qué materias podés cursar ahora y compartí tu progreso."
	/>
	<meta property="og:url" content="https://plande.app/" />
	<meta property="og:site_name" content="Plande" />
	<meta property="og:image" content="https://plande.app/og-home.png" />
	<meta property="og:locale" content="es_AR" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Plande - Planificador de Carreras Universitarias" />
	<meta
		name="twitter:description"
		content="Plande te ayuda a planificar tu carrera universitaria. Visualizá correlatividades, descubrí qué materias podés cursar ahora y compartí tu progreso."
	/>
	<meta name="twitter:image" content="https://plande.app/og-home.png" />

	<!-- Schema.org: WebApplication -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Plande',
		alternateName: 'Planes de Estudios Interactivos',
		url: 'https://plande.app',
		applicationCategory: 'EducationApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'ARS'
		},
		description:
			'Aplicación web gratuita para planificar carreras universitarias argentinas. Visualiza requisitos y correlatividades entre materias, simula escenarios y comparte tu progreso.',
		inLanguage: 'es',
		audience: {
			'@type': 'Audience',
			audienceType: 'Estudiantes universitarios'
		},
		featureList: [
			'Visualización interactiva de correlatividades',
			'Simulación de escenarios de cursada',
			'Cálculo automático de prioridades de materias',
			'Compartir progreso mediante URL',
			'Exportación a CSV, JSON y texto',
			'Tracking de estados de materias'
		],
		softwareVersion: '1.0',
		author: {
			'@type': 'Organization',
			name: 'Plande'
		}
	})}<${'/'}script>`}

	<!-- Schema.org: FAQPage -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: '¿Qué es Plande?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Plande es una aplicación web gratuita que ayuda a estudiantes universitarios argentinos a planificar sus carreras. Permite visualizar requisitos y correlatividades entre materias, simular escenarios, calcular prioridades automáticamente y compartir el progreso mediante URLs.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cómo funcionan los estados de las materias?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Las materias pueden tener cuatro estados: No cursada (sin empezar), En curso (cursando actualmente), Regular (cursada aprobada pero final pendiente) y Aprobada (cursada y final aprobados). Al cambiar el estado de una materia, Plande actualiza automáticamente qué otras materias se habilitan para cursar.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cómo guardo mi progreso?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Plande guarda tu progreso automáticamente en tu dispositivo y en la URL. No necesitás crear cuenta ni iniciar sesión. Tu información nunca sale de tu dispositivo.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cómo comparto mi plan y mi progreso?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Plande codifica el estado de todas las materias en la URL del navegador. Simplemente copiá la URL y compartila por WhatsApp, email o cualquier medio. La persona que reciba el link va a ver exactamente el mismo progreso que vos.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Es gratis?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Sí, Plande es 100% gratuito. No requiere registro ni cuenta de usuario. Los datos se almacenan localmente en tu navegador o en la URL para compartir.'
				}
			},
			{
				'@type': 'Question',
				name: '¿Cómo puedo agregar mi carrera?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Si tu carrera no está disponible, completá el formulario en https://forms.gle/bCC6rCb44LLYERHu6 con el plan de estudios oficial de tu universidad. Los planes se agregan manualmente.'
				}
			}
		]
	})}<${'/'}script>`}
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
					onclick={handleSmoothScroll}
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
				<div class="grid gap-1">
					<label for="career-search" class="sr-only">Buscar carrera, facultad o universidad</label>
					<div class="relative">
						<input
							id="career-search"
							type="text"
							placeholder="Buscar carrera, facultad o universidad..."
							bind:value={searchQuery}
							class="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none"
						/>
						{#if hasActiveSearch}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								aria-label="Limpiar búsqueda"
								class="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						{/if}
					</div>
					{#if hasActiveSearch}
						<p class="px-2 text-sm text-gray-600" role="status">
							{totalResults}
							{totalResults === 1 ? 'carrera encontrada' : 'carreras encontradas'}
						</p>
					{/if}
				</div>
				<div class="grid gap-4">
					{#each groupedPlans as university (university.universitySlug)}
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
								<HighlightText text={university.universityName} query={searchQuery}>
									{#snippet children({ highlightedText })}
										<span>{@html highlightedText}</span>
									{/snippet}
								</HighlightText>
								<span class="text-gray-500">
									(<HighlightText text={university.universitySlug} query={searchQuery}>
										{#snippet children({ highlightedText })}
											<span>{@html highlightedText}</span>
										{/snippet}
									</HighlightText>)
								</span>
							</h3>
							{#each university.colleges as college, collegeIndex (`${university.universitySlug}-${college.collegeSlug ?? college.collegeName ?? collegeIndex}`)}
								{#if college.collegeName}
									<div class="grid gap-2">
										<h4 class="font-medium text-gray-700">
											<HighlightText text={college.collegeName} query={searchQuery}>
												{#snippet children({ highlightedText })}
													<span>{@html highlightedText}</span>
												{/snippet}
											</HighlightText>
											<span class="text-gray-500">
												(<HighlightText text={college.collegeSlug ?? ''} query={searchQuery}>
													{#snippet children({ highlightedText })}
														<span>{@html highlightedText}</span>
													{/snippet}
												</HighlightText>)
											</span>
										</h4>
										<ul class="space-y-2 md:pl-4">
											{#each college.degrees as degree (getStudyPlanSlugWithYear(degree))}
												<li>
													<a
														href={`/${getStudyPlanSlugWithYear(degree)}`}
														class="text-blue-700 transition-colors hover:text-blue-900"
													>
														<HighlightText text={degree.degreeName} query={searchQuery}>
															{#snippet children({ highlightedText })}
																<span>{@html highlightedText}</span>
															{/snippet}
														</HighlightText>
														{#if degree.year}
															<span class="text-gray-500"> (Plan {degree.year})</span>
														{/if}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								{:else}
									<ul class="space-y-2 md:pl-4">
										{#each college.degrees as degree (getStudyPlanSlugWithYear(degree))}
											<li>
												<a
													href={`/${getStudyPlanSlugWithYear(degree)}`}
													class="text-blue-700 transition-colors hover:text-blue-900"
												>
													<HighlightText text={degree.degreeName} query={searchQuery}>
														{#snippet children({ highlightedText })}
															<span>{@html highlightedText}</span>
														{/snippet}
													</HighlightText>
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

		<section id="faq" class="grid gap-6 px-6 pb-6 md:px-0">
			<header class="grid gap-1">
				<h2 class="text-center text-2xl font-bold">
					<span class="whitespace-nowrap">Preguntas Frecuentes 💬</span>
				</h2>
				<p class="text-center text-gray-700">Todo lo que necesitás saber sobre Plande</p>
			</header>

			<div class="grid gap-1">
				<details class="group rounded-t-lg bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Qué es Plande?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						Plande es una aplicación web gratuita que ayuda a estudiantes universitarios argentinos
						a planificar sus carreras. Permite visualizar requisitos y correlatividades entre
						materias, simular escenarios, calcular prioridades automáticamente y compartir el
						progreso mediante URLs.
					</div>
				</details>

				<details class="group bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Cómo funcionan los estados de las materias?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						<div class="space-y-2">
							<p>Las materias pueden tener cuatro estados:</p>
							<ul class="list-disc space-y-2 pl-5">
								<li><strong class="text-gray-700">No cursada</strong>: No se ha comenzado</li>
								<li>
									<strong class="text-blue-700">En curso</strong>: Se está cursando actualmente
								</li>
								<li>
									<strong class="text-amber-700">Regular</strong>: Cursada aprobada pero examen
									final pendiente
								</li>
								<li>
									<strong class="text-green-700">Aprobada</strong>: Cursada y examen final aprobados
								</li>
							</ul>
							<p>
								Al cambiar el estado de una materia, Plande actualiza automáticamente qué otras
								materias se habilitan para cursar.
							</p>
						</div>
					</div>
				</details>

				<details class="group bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Cómo guardo mi progreso?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						Plande guarda tu progreso automáticamente:
						<ul class="mt-2 list-disc space-y-1 pl-5">
							<li>
								<strong>En tu dispositivo</strong>: Tu progreso se guarda automáticamente en tu
								navegador, así que cuando vuelvas a la página vas a encontrar todo como lo dejaste.
							</li>
							<li>
								<strong>En la URL</strong>: El estado de tus materias se codifica automáticamente en
								la dirección del navegador. Si copiás y guardás esa URL, tu progreso viaja con ella.
							</li>
						</ul>
						<p class="mt-2">
							No necesitás crear cuenta ni iniciar sesión. Tu información nunca sale de tu
							dispositivo.
						</p>
					</div>
				</details>

				<details class="group bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Cómo comparto mi plan y mi progreso?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						<p>
							Plande codifica el estado de todas las materias en la URL del navegador. Simplemente
							copiá la URL y compartila por WhatsApp, email o cualquier medio. La persona que reciba
							el link va a ver exactamente el mismo progreso que vos.
						</p>
						<p class="mt-2">
							Esto es ideal para mostrarle tu avance a familiares, compañeros o consejeros
							académicos. También podés usarlo para consultar dudas sobre correlatividades en grupos
							de estudio.
						</p>
					</div>
				</details>

				<details class="group bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Es gratis?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						Sí, Plande es 100% gratuito. No requiere registro ni cuenta de usuario. Los datos se
						almacenan localmente en tu navegador o en la URL para compartir.
					</div>
				</details>

				<details class="group rounded-b-lg bg-gray-50">
					<summary
						class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900"
					>
						<span>¿Cómo puedo agregar mi carrera?</span>
						<svg
							class="h-5 w-5 flex-none stroke-gray-500 transition-transform group-open:rotate-180"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-gray-700">
						Si tu carrera no está disponible, completá el formulario en
						<a href="https://forms.gle/bCC6rCb44LLYERHu6" class="text-blue-700 hover:underline"
							>este link</a
						>
						con el plan de estudios oficial de tu universidad. Los planes se agregan manualmente.
					</div>
				</details>
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
					Tu opinión va a definir la siguiente versión de Plande. Usá el siguiente link para
					contarme tus ideas y sugerencias.
				</p>
			</div>

			<div class="grid justify-center gap-3 text-center">
				<a
					href="https://forms.gle/5iR99PJAffwFmayC6"
					class="block rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Escribir opinión o sugerencia
				</a>
				<p class="text-sm text-gray-600">
					<em>Hagamos que recibirse sea más fácil y rápido</em>
				</p>
			</div>
		</section>
	</main>

	<Footer />
</div>
