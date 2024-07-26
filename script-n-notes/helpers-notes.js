// Cut a string at the end, replacing with '…'
// Param[1]: a string, param[2]: max length of the string, after which it will be cut.
const slicer = (str, num) =>
	str.trim().length > num ?
		str.trim().substring(0, num).trim() + '…' :
		str.trim();

// Runs animation through requestAnimationFrame
// ? 1.0 duration - время за которое выполнится анимация, timing - линейность анимации (как в CSS-анимации настройки: "easy-in", "easy-out" или "Cubic Bezier Function"), draw — собственно сама анимация (отрисовка её).
// * 1.1 Итак, когда запускается функция animate() создаётся переменная start, затем срабатывает функция performance.now() и её значение передаётся в переменную start. Этот метод фиксирует текущую точку времени на данный момент, точку времени старта анимации. Далее внутри requestAnimationFrame() запускается ещё одна функция animate(), которая принимает time (временную рамку очередного повторения функции animate()). Затем создаётся переменная timeFraction, которая принимает разницу между началом и текущем временем анимации и потом делится на duration (длительность анимации).
// 1.2 Далее создаётся переменная progress, которая принимает результат выполнения функции timing(). В timing() мы будем передавать значение timeFraction, которое будет содержать отрезки от 0 до 1, дроблёные на разные участки. И каждый раз они будут передаваться в функцию timing(). И если у нас линейная анимация, то он будет сразу возвращаться без каких либо изменений в progress.
// 1.3 progress будет уже поступать в коллбэк, который мы передаём в draw(), затем идёт проверка, не достигла ли рекурсия 1 и если да, то она прекратится.
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