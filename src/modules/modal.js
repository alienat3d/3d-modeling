import { animate } from './helpers';

export const modalFunc = () => {
	const width = document.documentElement.clientWidth;
	const modal = document.querySelector('.popup');
	const buttons = document.querySelectorAll('.popup-btn');

	const modalAppearAnimation = () => {
		modal.style.display = 'block';
		animate({
			duration: 400,
			timing(timeFraction) {
				return Math.pow(timeFraction, 2);
			},
			draw(progress) {
				modal.style.opacity = progress;
			}
		})
	}
	const modalDisappearAnimation = () => {
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