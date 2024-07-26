// Cut a string at the end, replacing with '…'
// Param[1]: a string, param[2]: max length of the string, after which it will be cut.
const slicer = (str, num) =>
	str.trim().length > num ?
		str.trim().substring(0, num).trim() + '…' :
		str.trim();

// Runs animation through requestAnimationFrame
const animate = ({ timing, draw, duration }) => {

	let start = performance.now();

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

export { slicer, animate };

// https://learn.javascript.ru/js-animation