<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="grid gap-6 px-6">
	<p class="text-center text-sm">
		¿Tenés dudas, sugerencias o errores?
		<a
			href="https://forms.gle/5iR99PJAffwFmayC6"
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			Escribime
		</a>.
	</p>
	<p class="text-center text-sm">
		¿Te gustó Plande?
		<a
			href="https://cafecito.app/valentincostam"
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			Invitame un café
		</a>.
	</p>
	<p class="text-center text-sm">
		<a
			href={resolve('/')}
			class="text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
			>Plande</a
		>
		· Creado por
		<a
			href="https://valentincosta.com"
			class="whitespace-nowrap text-blue-800 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
		>
			Valentín Costa
		</a>
	</p>
</footer>
