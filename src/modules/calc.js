import { animate, splitNumbers, digitsOnly } from './helpers';

export const calcFunc = (price = 10000) => {
	const calcBlock = document.querySelector('.calc-block');
	const calcType = calcBlock.querySelector('select');
	const calcInputs = calcBlock.querySelectorAll('input');
	const calcSquare = calcInputs[0];
	const calcCount = calcInputs[1];
	const calcDays = calcInputs[2];
	const total = calcBlock.querySelector('#total');

	const countingNumbersUp = (elem, val, speed = 500) => {
		function makeEaseInOut(timing) {
			return function (timeFraction) {
				if (timeFraction < .5)
					return timing(2 * timeFraction) / 2;
				else
					return (2 - timing(2 * (1 - timeFraction))) / 2;
			}
		}
		function quad(timeFraction) {
			return Math.pow(timeFraction, 2)
		}
		const quadEaseOut = makeEaseInOut(quad);
		animate({
			duration: speed,
			timing: quadEaseOut,
			draw(progress) {
				elem.innerText = splitNumbers(Math.round(progress * val).toString()) + ' ₽';
			}
		})
	}

	const countCalc = () => {
		const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
		const calcSquareValue = +calcSquare.value;

		let totalValue = 0;
		let calcCountValue = 1;
		let calcDaysValue = 1;

		if (+calcCount.value > 1) calcCountValue += +calcCount.value / 10;

		if (calcDays.value && +calcDays.value < 5) {
			calcDaysValue = 2;
		} else if (calcDays.value && +calcDays.value < 10) {
			calcDaysValue = 1.5;
		}

		calcTypeValue && calcSquareValue ?
			totalValue = price * calcTypeValue * calcSquareValue * calcCountValue * calcDaysValue :
			totalValue = 0;

		total.dataset.num = totalValue;

		countingNumbersUp(total, totalValue, 500);
	}

	calcBlock.addEventListener('input', (evt) => {
		if (evt.target === calcType || evt.target === calcSquare ||
			evt.target === calcCount || evt.target === calcDays) {
			countCalc();
		}
	})

	calcInputs.forEach(input => 
		input.addEventListener('input', () =>
			input.value = digitsOnly(input.value)
		)
	);
}