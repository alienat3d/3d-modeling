export const sliderFunc = () => {
	let TIME_INTERVAL = 4;

	const sliderBlock = document.querySelector('.portfolio-content');
	const slides = sliderBlock.querySelectorAll('.portfolio-item');
	const dots = sliderBlock.querySelectorAll('.dot');

	let currentSlide = 0;
	let interval;
	
	const prevSlide = (elems, idx, activeClass) => elems[idx].classList.remove(activeClass);
	const nextSlide = (elems, idx, activeClass) => elems[idx].classList.add(activeClass);

	const autoSlider = () => {
		prevSlide(slides, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		nextSlide(slides, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	}

	TIME_INTERVAL = TIME_INTERVAL * 1000;

	const startSlider = (timer) => {
		interval = setInterval(autoSlider, timer);
	}
	const stopSlider = () => {
		clearInterval(interval);
	}

	sliderBlock.addEventListener('click', (evt) => {
		evt.preventDefault();

		if (!evt.target.matches('.dot, .portfolio-btn')) return;
		
		prevSlide(slides, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');
		
		if (evt.target.matches('#arrow-left')) {
			currentSlide--;
		} else if (evt.target.matches('#arrow-right')) {
			currentSlide++;
		} else if (evt.target.classList.contains('dot')) {
			dots.forEach((dot, idx) => {
				if (evt.target === dot) currentSlide = idx;
			});
		}

		if (currentSlide >= slides.length) currentSlide = 0;
		if (currentSlide < 0) currentSlide = slides.length - 1;

		nextSlide(slides, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	})

	sliderBlock.addEventListener('mouseenter', (evt) => {
		if (evt.target.matches('.dot, .portfolio-btn')) stopSlider(TIME_INTERVAL);
	}, true)
	sliderBlock.addEventListener('mouseleave', (evt) => {
		if (evt.target.matches('.dot, .portfolio-btn')) startSlider(TIME_INTERVAL);
	}, true)

	startSlider(TIME_INTERVAL);
}