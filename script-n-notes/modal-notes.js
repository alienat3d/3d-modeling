export const modalFunc = () => {
	const width = document.documentElement.clientWidth;
	const modal = document.querySelector('.popup');
	const buttons = document.querySelectorAll('.popup-btn');

	let count = 0;
	let idInterval;

	const modalAppearAnimation = () => {
		idInterval = requestAnimationFrame(modalAppearAnimation);
		if (count < 10) {
			modal.style.opacity = `0.${count++}`;
		} else {
			count = 10;
			modal.style.opacity = 1;
			cancelAnimationFrame(idInterval);
		}
	}
	const modalDisappearAnimation = () => {
		idInterval = requestAnimationFrame(modalDisappearAnimation);
		if (count > 0) {
			modal.style.opacity = `0.${count--}`;
		} else {
			modal.style.opacity = 0;
			modal.style.display = 'none';
			cancelAnimationFrame(idInterval);
		}
	}

	if (width > 768) modal.style.opacity = 0;

	buttons.forEach(btn =>
		btn.addEventListener('click', () => {
			if (width > 768) {
				modal.style.display = 'block';
				modalAppearAnimation();
			} else {
				modal.style.display = 'block'
			}
		})
	)

	// * 1.0 Чтобы реализовать закрытие модального окна по клику вне его границ, мы будем искать с помощью метода "closest()"" класс '.popup-content', которого у элемента с классом ".popup" просто нет, а у всего контента внутри модалки есть.
	// 1.1 Теперь, когда мы используем делегирование событий, то нам уже необязательно вешать слушатель на кнопку закрытия модалки, мы можем её указать в условии
	modal.addEventListener('click', (evt) => {
		if (width > 768) {
			if (!evt.target.closest('.popup-content') || evt.target.classList.contains('popup-close')) {
				modalDisappearAnimation();
			}
		} else {
			if (!evt.target.closest('.popup-content') || evt.target.classList.contains('popup-close')) {
				modal.style.display = 'none';
			}
		}
	})
}