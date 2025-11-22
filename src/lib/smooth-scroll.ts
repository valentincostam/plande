export function handleSmoothScroll(event: MouseEvent) {
	event.preventDefault();

	const target = event.currentTarget as HTMLAnchorElement;
	const href = target.getAttribute('href');

	if (!href || !href.startsWith('#')) return;

	const hash = href.slice(1); // Remove the '#'
	const element = document.getElementById(hash);

	if (element) {
		// Remove any existing targeted class from other elements
		document.querySelectorAll('.is-targeted').forEach((el) => {
			el.classList.remove('is-targeted');
		});

		// Start smooth scroll
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });

		// Add class to trigger highlight animation
		element.classList.add('is-targeted');

		// Remove class after animation completes (3 seconds)
		setTimeout(() => {
			element.classList.remove('is-targeted');
		}, 3000);
	}
}
