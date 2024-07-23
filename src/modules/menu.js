export const menuFunc = () => {
	const main = document.querySelector('main');
	const menu = document.querySelector('menu');
	const scrollDownBtn = document.querySelector('a[href="#service-block"]');

	const handleMenu = () => {
		menu.classList.toggle('active-menu');
	}

	main.addEventListener('click', evt => {
		if (evt.target.closest('.menu')) {
			handleMenu();
		} else if (evt.target.closest('a[href="#service-block"]')) {
			evt.preventDefault();
			const blockId = scrollDownBtn.getAttribute('href');
			document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
		}
	})
	menu.addEventListener('click', (evt) => {
		evt.preventDefault();

		if (evt.target.closest('a[href^="#"]') && !evt.target.closest('a[href="#close"]')) {
			const menuLink = evt.target;
			const blockId = menuLink.getAttribute('href');
			document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
			handleMenu();
		} else if (evt.target.closest('.close-btn')) {
			handleMenu();
		}
	})
}

