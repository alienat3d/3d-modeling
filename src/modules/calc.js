export const calcFunc = (price = 10000) => {
	const calcBlock = document.querySelector('.calc-block');
	const calcType = calcBlock.querySelector('select');
	const calcInputs = calcBlock.querySelectorAll('input');
	const calcSquare = calcInputs[0];
	const calcCount = calcInputs[1];
	const calcDays = calcInputs[2];
	const total = calcBlock.querySelector('#total');

	const digitsOnly = /\D+/g;
	const numberWithSpaces = /\B(?=(\d{3})+(?!\d))/g;

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

		totalValue = totalValue.toString().replace(numberWithSpaces, " ");

		total.textContent = totalValue + ' ₽';
	}

	calcBlock.addEventListener('input', (evt) => {
		if (evt.target === calcType || evt.target === calcSquare || 
				evt.target === calcCount || evt.target === calcDays) {
			countCalc();
		}
	})

	calcInputs.forEach(input => {
		input.addEventListener('input', () =>
			input.value = input.value.replace(digitsOnly, '')
		)
	});
}