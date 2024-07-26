export const calcFunc = (price = 10000) => {
	const calcBlock = document.querySelector('.calc-block');
	const calcType = calcBlock.querySelector('select');
	const calcInputs = calcBlock.querySelectorAll('input');
	const calcSquare = calcInputs[0];
	const calcCount = calcInputs[1];
	const calcDays = calcInputs[2];
	const total = calcBlock.querySelector('#total');

	const digitsOnly = /\D+/g;
	// const numberWithSpaces = /\B(?=(\d{3})+(?!\d))/g;

	// let timeout;

	const countingNumbersUp = (elem, val, speed = 200) => {
		const animationSpeed = speed;

		const animate = () => {
			const value = +val;
			const data = +elem.innerText;
			// const data = +elem.innerText.replace(/\s/, "");
			console.log(data);

			const countUp = value / animationSpeed;

			if (data < value) {
				elem.innerText = Math.ceil(+elem.innerText + countUp);
				timeout = setTimeout(animate, 1);
			} else {
				elem.innerText = value;
				// elem.innerText = value.toString().replace(numberWithSpaces, " ");
			}
		}

		animate();
	}
	/* 	const countingNumbersDown = (elem, val, speed = 200) => {
			const animationSpeed = speed;
	
			const animate = () => {
				const value = +val;
				const data = +elem.innerText;
	
				if (+data === +value) {
					elem.innerText = value.toString().replace(numberWithSpaces, " ");
				}
	
				const countDown = Math.round(data / animationSpeed);
	
				if (data > value) {
					elem.innerText = Math.round(data - countDown);
					setTimeout(animate, 1);
				} else {
					elem.innerText = value;
				}
				if (+data === +value) {
					elem.innerText = value.toString().replace(numberWithSpaces, " ");
				}
			}
			animate();
		} */

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

		countingNumbersUp(total, totalValue, 300);
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