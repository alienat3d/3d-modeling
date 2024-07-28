import { animate } from './helpers';

export const modalFunc = () => {
	const width = document.documentElement.clientWidth;
	const modal = document.querySelector('.popup');
	const buttons = document.querySelectorAll('.popup-btn');

	// let count = 0;
	// let idInterval;

	const modalAppearAnimation = () => {
		// idInterval = requestAnimationFrame(modalAppearAnimation);
		// if (count < 10) {
		// 	modal.style.opacity = `0.${count++}`;
		// } else {
		// 	count = 10;
		// 	modal.style.opacity = 1;
		// 	cancelAnimationFrame(idInterval);
		modal.style.display = 'block';
		animate({
			duration: 400,
			timing(timeFraction) {
				// return timeFraction;
				return Math.pow(timeFraction, 2);
			},
			draw(progress) {
				modal.style.opacity = progress;
			}
		})
	}
	const modalDisappearAnimation = () => {
		/* idInterval = requestAnimationFrame(modalDisappearAnimation);
		if (count > 0) {
			modal.style.opacity = `0.${count--}`;
		} else {
			modal.style.opacity = 0;
			modal.style.display = 'none';
			cancelAnimationFrame(idInterval);
		} */
		animate({
			duration: 400,
			timing(timeFraction) {
				return Math.pow(timeFraction, 2);
			},
			draw(progress) {
				modal.style.opacity = 1 - progress;
			}
		})
		setTimeout(() => {
			modal.style.display = 'none';
		}, 500);
	}
	if (width > 768) modal.style.opacity = 0;

	buttons.forEach(btn =>
		btn.addEventListener('click', () => 
			width > 768 ?
				modalAppearAnimation() :
				modal.style.display = 'block'
		)
	)

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