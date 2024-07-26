import { slicer, animate } from '../src/modules/helpers';

export const testFunc = () => {
	const car = document.querySelector('.car');
	// const text = '           Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ut corrupti repellat velit perferendis debitis veritatis vitae quis, maxime architecto eum et officiis delectus error sunt magnam. Iste perferendis vel molestias doloribus tempora, aliquid eum.       '
	
	// 1.1 Чтобы дать сперва странице загрузиться поставим небольшой таймаут.
	setTimeout(() => {
		animate({
			duration: 2000,
			timing(timeFraction) {
				// return timeFraction;
				return Math.pow(timeFraction, 2);
			},
			draw(progress) {
				// коллбэк draw() на этом примере возвращает нам определённый отрезок от 0 до 1, и отрезков будет тем больше, чем выше значение duration.
				// console.log('progress', progress)
				// * 1.0 Сделаем так, чтобы машинка уехала за пределы экрана
				car.style.left = (100 * progress) + '%';
				// * 2.0 А теперь поиграемся со свойством opacity. Здесь нам вообще достаточно будет только указать progress, т.к. opacity: 1, означает, что элемент полностью виден, а opacity: 0, что он полностью прозрачен.
				// car.style.opacity = progress;
			}
		})
	}, 1500);
	// setTimeout(() => {
	// 	car.style.transform = 'scale(-1, 1)';
	// 	animate({
	// 		duration: 2000,
	// 		timing(timeFraction) {
	// 			// return timeFraction;
	// 			return Math.pow(timeFraction, 2);
	// 		},
	// 		draw(progress) {
	// 			car.style.left = (1 * progress) + '%';
	// 		}
	// 	})
	// }, 10000);

	// console.log(slicer(text, 25));
	// console.log(slicer(text, 40));
}

// ? Таким образом можно реализовывать практически любые анимации, хоть появление модального окна, хоть счёт\перебор цифр в калькуляторе.