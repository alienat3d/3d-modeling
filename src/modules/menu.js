export const menuFunc = () => {
	const menuBtn = document.querySelector('.menu');
	const menu = document.querySelector('menu');
	const closeMenuBtn = menu.querySelector('.close-btn');
	const menuItems = menu.querySelectorAll('ul > li > a');
	const scrollDownBtn = document.querySelector('a[href="#service-block"]');

	const handleMenu = () => menu.classList.toggle('active-menu');

	scrollDownBtn.addEventListener('click', (evt) => {
		evt.preventDefault();
		const blockId = scrollDownBtn.getAttribute('href');
		document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
	})

	menuBtn.addEventListener('click', handleMenu);
	closeMenuBtn.addEventListener('click', handleMenu);

	menuItems.forEach(item => {
		item.addEventListener('click', (evt) => {
			evt.preventDefault();
			handleMenu();
			const blockId = evt.target.getAttribute('href');
			document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
		});
	});
}

