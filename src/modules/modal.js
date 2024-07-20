export const modalFunc = () => {
	const width = document.documentElement.clientWidth;
	const modal = document.querySelector('.popup');
	const buttons = document.querySelectorAll('.popup-btn');
	const closeBtn = modal.querySelector('.popup-close');

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

	if (width > 768) {
		modal.style.opacity = 0;
		buttons.forEach(btn =>
			btn.addEventListener('click', () => {
				modal.style.display = 'block';
				modalAppearAnimation();
			}));
		closeBtn.addEventListener('click', modalDisappearAnimation);
	} else {
		buttons.forEach(btn =>
			btn.addEventListener('click', () => modal.style.display = 'block'));
		closeBtn.addEventListener('click', () => modal.style.display = 'none');
	}
}