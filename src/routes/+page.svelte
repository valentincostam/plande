<script lang="ts">
	import ChatMessage from './chat-message.svelte';
	import Footer from './footer.svelte';
</script>

<svelte:head>
	<title>Planes de Estudios Interactivos en Plande</title>
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
					<a href="/utn-frcu-isi?estado=a34ce3" class="text-[#1B8755] underline underline-offset-2"
						>https://plande.app/utn-frcu-isi?estado=a34ce3</a
					>
				</ChatMessage>
			</div>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<h2 class="text-center text-2xl font-bold">
				<span class="whitespace-nowrap">No pierdas tiempo,</span>
				<span class="whitespace-nowrap">recibite más rápido 🚀</span>
			</h2>
			<p class="text-center text-gray-700">
				Batallar con correlatividades confusas y documentos tediosos puede ser frustrante. Plande
				convierte todo ese caos en una herramienta que simplemente funciona.
			</p>
			<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5">
					<h3 class="font-bold">Probá sin riesgo</h3>
					<p class="text-gray-700">
						¿Y si curso esta materia primero? ¿Y si dejo esa para el año que viene? Con Plande
						probás todas las combinaciones que se te ocurran y ves exactamente cómo afectan tu fecha
						de graduación. Sin apuestas, sin errores costosos.
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
						Cuando tu vieja te pregunte "¿cómo vas con la facultad?", mandále tu link de Plande. Que
						mire todo tu progreso al instante, sin explicaciones largas. Perfecto para que se sienta
						orgullosa de vos (y te deje en paz).
					</p>
				</div>
				<div class="grid gap-1 rounded-lg bg-gray-100 p-5 md:col-span-2">
					<h3 class="flex items-center gap-2 font-bold">
						Funciones PRO <span
							class="rounded-md bg-white px-1.5 py-0.5 text-[.5rem] font-normal text-gray-700"
							>PRÓXIMAMENTE</span
						>
					</h3>
					<p class="text-sm text-gray-700">
						Perfil personalizable, leaderboard con tus compañeros, cargar notas y calcular promedio,
						exportar datos, dark theme. Para quienes quieran usar Plande más en serio. ¿Te interesa?
					</p>
				</div>
			</div>
			<div class="flex justify-center text-center">
				<a
					href="/utn-frcu-isi"
					class="block rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					Probar Plande ahora
				</a>
			</div>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<h2 class="text-center text-2xl font-bold">
				Errores que cuestan <span class="whitespace-nowrap">años de carrera 💔</span>
			</h2>
			<p class="text-center text-gray-700">Este tipo de historias me inspiraron a crear Plande.</p>
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
					académica mil veces para entender qué podía cursar y qué no."
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
			<p class="text-center text-gray-600">
				No dejés que te pase lo mismo. <span class="whitespace-nowrap"
					>Probá Plande con tu carrera.</span
				>
			</p>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<h2 class="text-center text-2xl font-bold">
				Tu carrera completa <span class="whitespace-nowrap">en un solo link 🔗</span>
			</h2>
			<p class="text-center text-gray-700">
				Elegí tu carrera y empezá a trackear tu progreso <span class="whitespace-nowrap"
					>ahora mismo</span
				>
			</p>

			<div class="grid gap-3">
				<h2 class="text-lg font-bold">Carreras disponibles</h2>
				<ul class="grid gap-3">
					<li class="grid gap-1">
						<span class="font-bold">UTN FRCU</span>
						<ul class="list-disc pl-5">
							<li>
								<a href="/utn-frcu-isi" class="text-blue-800 underline-offset-2 hover:underline"
									>Ingeniería en Sistemas de Información</a
								>
							</li>
						</ul>
					</li>
					<li class="grid gap-1">
						<span class="font-bold">UCU FAU</span>
						<ul class="list-disc pl-5">
							<li>
								<a href="/ucu-fau-arq" class="text-blue-800 underline-offset-2 hover:underline"
									>Arquitectura</a
								>
							</li>
						</ul>
					</li>
					<li class="grid gap-1">
						<span class="font-bold">UADER FCyT</span>
						<ul class="list-disc pl-5">
							<li>
								<a href="/uader-fcyt-lsi" class="text-blue-800 underline-offset-2 hover:underline"
									>Licenciatura en Sistemas de Información</a
								>
							</li>
						</ul>
					</li>
					<li class="grid gap-1">
						<span class="font-bold">UNER FCS</span>
						<ul class="list-disc pl-5">
							<li>
								<a href="/uner-fcs-med" class="text-blue-800 underline-offset-2 hover:underline"
									>Medicina</a
								>
							</li>
						</ul>
					</li>
					<li class="grid gap-1">
						<span class="font-bold">Otras facultades</span>
						<ul class="list-disc pl-5">
							<li>
								¿No está tu carrera?
								<a
									href="https://forms.gle/bCC6rCb44LLYERHu6"
									class="whitespace-nowrap text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
									>Pedila acá</a
								>.
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</section>

		<section class="grid gap-6 px-6 md:px-0">
			<h2 class="text-center text-2xl font-bold">
				Mejor planificación, <span class="whitespace-nowrap">más egresados 🧑‍🎓</span>
			</h2>

			<p class="text-center text-gray-700">Plande está para que te recibas sin vueltas.</p>

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
					href="/utn-frcu-isi"
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
