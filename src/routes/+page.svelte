<script lang="ts">
	import ChatMessage from './chat-message.svelte';
	import FaqItem from './faq-item.svelte';
	import Footer from './footer.svelte';
	import HighlightText from './highlight-text.svelte';
	import { allStudyPlans } from './[slug]/data/all-study-plans';
	import { groupStudyPlansByUniversityAndCollege, getStudyPlanSlugWithYear } from '$lib/study-plan';
	import { handleSmoothScroll } from '$lib/smooth-scroll';
	import { matchesSearch, normalizeSearchText } from '$lib/search';
	import Link from '$lib/link.svelte';
	import { resolve } from '$app/paths';

	const seoTitle = 'Planificá tu carrera universitaria | Plande';
	const seoDescription = `Explorá ${allStudyPlans.length} planes de estudio interactivos. Visualizá correlatividades, descubrí qué materias podés cursar y llevá tu progreso sin crear una cuenta.`;
	const seoImageUrl = 'https://plande.app/og.png';

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
	let expandedFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		expandedFaqIndex = expandedFaqIndex === index ? null : index;
	}
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<link rel="canonical" href="https://plande.app/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:url" content="https://plande.app/" />
	<meta property="og:site_name" content="Plande" />
	<meta property="og:image" content={seoImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content={`Plande, planificador universitario con ${allStudyPlans.length} planes de estudio disponibles`}
	/>
	<meta property="og:locale" content="es_AR" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content={seoImageUrl} />
	<meta
		name="twitter:image:alt"
		content={`Plande, planificador universitario con ${allStudyPlans.length} planes de estudio disponibles`}
	/>

	<!-- Schema.org: WebApplication -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
		<section class="relative bg-[#F5F1EB] p-6 md:rounded-md dark:bg-[#161717]">
			<div
				class="bg-size-[412.5px 749.25px] absolute inset-0 h-full w-full bg-[url(/wa-bg.png)] opacity-10 dark:bg-[url(/wa-bg-dark.png)] dark:opacity-[0.06]"
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
					<a
						href={resolve('/utn-frcu-isi')}
						class="text-[#1B8755] underline underline-offset-2 dark:text-[#22C063]"
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
					class="block rounded bg-blue-700 px-6 py-3 text-white transition-colors select-none hover:bg-blue-800 active:scale-95 active:bg-blue-900 dark:bg-blue-200 dark:hover:bg-blue-300 dark:active:bg-blue-400"
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
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale dark:opacity-95 dark:grayscale dark:invert"
				/>
				<img
					src="/uader.png"
					alt="UADER"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale dark:opacity-95 dark:grayscale dark:invert"
				/>
				<img
					src="/unca.png"
					alt="UNCA"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale dark:opacity-95 dark:grayscale dark:invert"
				/>
				<img
					src="/udemm.png"
					alt="UDEMM"
					class="max-h-10 max-w-32 object-contain opacity-70 grayscale dark:opacity-95 dark:grayscale dark:invert"
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

		<section class="grid gap-6">
			<header class="grid gap-1 px-6 md:px-0">
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
				<h2 class="px-6 text-lg font-bold md:px-0">Carreras disponibles</h2>
				<div class="grid gap-1 px-6 md:px-0">
					<label for="career-search" class="sr-only">Buscar carrera...</label>
					<div class="relative">
						<input
							id="career-search"
							type="text"
							placeholder="Buscar carrera..."
							bind:value={searchQuery}
							class="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:text-gray-900 dark:placeholder:text-gray-400"
						/>
						{#if hasActiveSearch}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								aria-label="Limpiar búsqueda"
								class="absolute inset-y-0 right-6 flex items-center justify-center px-3 text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:right-0 dark:text-gray-500 dark:hover:text-gray-700 dark:focus:text-gray-700"
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
					<div class="divide-y divide-gray-300">
						{#each groupedPlans as university (university.universitySlug)}
							<div class="relative grid gap-5 p-6 md:px-0">
								<img
									src={`/${university.universitySlug.toLowerCase()}.png`}
									alt={university.universityName}
									class={[
										'mx-auto max-h-10 max-w-24 object-contain opacity-50 grayscale dark:grayscale dark:invert',
										'md:absolute md:top-5 md:right-5 md:max-h-16 md:max-w-32 md:opacity-30'
									]}
								/>
								<h3 class="text-center font-semibold text-gray-900 md:text-left">
									<HighlightText text={university.universityName} query={searchQuery} />
									<span class="font-normal text-gray-500">
										<HighlightText text={university.universitySlug} query={searchQuery} />
									</span>
								</h3>
								{#each university.colleges as college, collegeIndex (`${university.universitySlug}-${college.collegeSlug ?? college.collegeName ?? collegeIndex}`)}
									{#if college.collegeName}
										<div class="grid gap-2">
											<h4 class="font-medium text-gray-700">
												<HighlightText text={college.collegeName} query={searchQuery} />
												<span class="font-normal text-gray-500">
													<HighlightText text={college.collegeSlug ?? ''} query={searchQuery} />
												</span>
											</h4>
											<ul class="space-y-2 md:pl-4">
												{#each college.degrees as degree (getStudyPlanSlugWithYear(degree))}
													<li>
														<Link
															href={resolve(`/${getStudyPlanSlugWithYear(degree)}` as `/${string}`)}
														>
															<HighlightText text={degree.degreeName} query={searchQuery} />
															{#if degree.year}
																<span
																	class="inline-block text-xs whitespace-nowrap text-gray-500 uppercase"
																>
																	Plan {degree.year}</span
																>
															{/if}
														</Link>
													</li>
												{/each}
											</ul>
										</div>
									{:else}
										<ul class="space-y-2 md:pl-4">
											{#each college.degrees as degree (getStudyPlanSlugWithYear(degree))}
												<li>
													<Link
														href={resolve(`/${getStudyPlanSlugWithYear(degree)}` as `/${string}`)}
													>
														<HighlightText text={degree.degreeName} query={searchQuery} />
														{#if degree.year}
															<span
																class="inline-block text-xs whitespace-nowrap text-gray-500 uppercase"
															>
																Plan {degree.year}</span
															>
														{/if}
													</Link>
												</li>
											{/each}
										</ul>
									{/if}
								{/each}
							</div>
						{/each}
					</div>

					<div class="px-6 md:px-0">
						<div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
							<span class="text-sm text-gray-600">¿No está tu carrera?</span>
							<Link href="https://forms.gle/bCC6rCb44LLYERHu6" class="ml-1 text-sm">Pedila acá</Link
							>
						</div>
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
				<FaqItem
					question="¿Qué es Plande?"
					answerId="faq-answer-0"
					isExpanded={expandedFaqIndex === 0}
					onToggle={() => toggleFaq(0)}
					isFirst
				>
					Plande es una aplicación web gratuita que ayuda a estudiantes universitarios argentinos a
					planificar sus carreras. Permite visualizar requisitos y correlatividades entre materias,
					simular escenarios, calcular prioridades automáticamente y compartir el progreso mediante
					URLs.
				</FaqItem>

				<FaqItem
					question="¿Cómo funcionan los estados de las materias?"
					answerId="faq-answer-1"
					isExpanded={expandedFaqIndex === 1}
					onToggle={() => toggleFaq(1)}
				>
					<div class="space-y-2">
						<p>Las materias pueden tener cuatro estados:</p>
						<ul class="list-disc space-y-2 pl-5">
							<li><strong class="text-gray-700">No cursada</strong>: No se ha comenzado</li>
							<li><strong class="text-blue-700">En curso</strong>: Se está cursando actualmente</li>
							<li>
								<strong class="text-amber-700">Regular</strong>: Cursada aprobada pero examen final
								pendiente
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
				</FaqItem>

				<FaqItem
					question="¿Cómo guardo mi progreso?"
					answerId="faq-answer-2"
					isExpanded={expandedFaqIndex === 2}
					onToggle={() => toggleFaq(2)}
				>
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
				</FaqItem>

				<FaqItem
					question="¿Cómo comparto mi plan y mi progreso?"
					answerId="faq-answer-3"
					isExpanded={expandedFaqIndex === 3}
					onToggle={() => toggleFaq(3)}
				>
					<p>
						Plande codifica el estado de todas las materias en la URL del navegador. Simplemente
						copiá la URL y compartila por WhatsApp, email o cualquier medio. La persona que reciba
						el link va a ver exactamente el mismo progreso que vos.
					</p>
					<p class="mt-2">
						Esto es ideal para mostrarle tu avance a familiares, compañeros o consejeros académicos.
						También podés usarlo para consultar dudas sobre correlatividades en grupos de estudio.
					</p>
				</FaqItem>

				<FaqItem
					question="¿Es gratis?"
					answerId="faq-answer-4"
					isExpanded={expandedFaqIndex === 4}
					onToggle={() => toggleFaq(4)}
				>
					Sí, Plande es 100% gratuito. No requiere registro ni cuenta de usuario. Los datos se
					almacenan localmente en tu navegador o en la URL para compartir.
				</FaqItem>

				<FaqItem
					question="¿Cómo puedo agregar mi carrera?"
					answerId="faq-answer-5"
					isExpanded={expandedFaqIndex === 5}
					onToggle={() => toggleFaq(5)}
					isLast
				>
					Si tu carrera no está disponible, completá el formulario en
					<Link href="https://forms.gle/bCC6rCb44LLYERHu6">este link</Link>
					con el plan de estudios oficial de tu universidad. Los planes se agregan manualmente.
				</FaqItem>
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
					class="block rounded bg-blue-700 px-6 py-3 text-white transition-colors select-none hover:bg-blue-800 active:scale-95 active:bg-blue-900 dark:bg-blue-200 dark:hover:bg-blue-300 dark:active:bg-blue-400"
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
