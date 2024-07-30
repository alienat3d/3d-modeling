import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';

export const swiperSettingsFunc = () => {
	const swiper = new Swiper('.swiper', {
		modules: [ Navigation, Pagination, Autoplay, Keyboard ],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			prevEl: '.companies-btn-left',
			nextEl: '.companies-btn-right',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		autoplay: {
			delay: 2500,
		},
		breakpoints: {
			640: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 50,
			},
		},
	});
}