// Cut a string at the end, replacing with '…'
// Param[1]: a string, param[2]: max length of the string, after which it will be cut.
const slicer = (str, num) =>
	str.trim().length > num ?
		str.trim().substring(0, num).trim() + '…' :
		str.trim();

// Runs animation through requestAnimationFrame
const animate = ({ timing, draw, duration }) => {

	let start = performance.now();

	// function quad(timeFraction) {
	// 	return Math.pow(timeFraction, 2)
	// }

	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});
}

// Divides numbers into digits of 3 digits each
const splitNumbers = (str) => {
	const regExp = /\B(?=(\d{3})+(?!\d))/g;
	return str.replace(regExp, " ");
}

// Leaves digits only in a string
const digitsOnly = (str) => {
	const regExp = /\D+/g;
	return str.replace(regExp, '');
}

export { slicer, animate, splitNumbers, digitsOnly };

// https://learn.javascript.ru/js-animation