export const menuFunc = () => {
	const menuBtn = document.querySelector('.menu');
	const menu = document.querySelector('menu');
	const closeMenuBtn = menu.querySelector('.close-btn');
	const menuItems = menu.querySelectorAll('ul > li > a');
	const scrollDownBtn = document.querySelector('a[href="#service-block"]');

	// Открытие / закрытие меню, добавлением класса.
	const handleMenu = () => menu.classList.toggle('active-menu');
	// [Усложнённое задание №2]
	scrollDownBtn.addEventListener('click', (evt) => {
		evt.preventDefault();
		const blockId = scrollDownBtn.getAttribute('href');
		document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
	})
	// / [Усложнённое задание №2]
	menuBtn.addEventListener('click', handleMenu);
	closeMenuBtn.addEventListener('click', handleMenu);

	// Для примера как это выглядит циклом for, но обычно на практике используется метод forEach(), разве только нам не нужна поддержка каких-то специфических браузеров, которые не поддерживают современный стандарт.
	// for (let index = 0; index < menuItems.length; index++) {
	// 	menuItems[index].addEventListener('click', handleMenu);
	// }
	menuItems.forEach(item => {
		item.addEventListener('click', (evt) => {
			evt.preventDefault();
			handleMenu();
			// [Усложнённое задание №1]
			const blockId = evt.target.getAttribute('href');
			document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
			// / [Усложнённое задание №1]
		});
	});
}