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

	// * 2.0 Теперь к функционалу самого калькулятора стоимости. Во-первых нам нужна переменная, где будет храниться текущее значение селекта. Если мы рассмотри селект в console.dir(), то увидим там свойство "options", которое является HTMLCollection. А также есть свойство "selectedIndex", который и поможет найти выбранный option на данный момент. И у этого option есть свойство "value", которое содержит значение, которое нам нужно для расчётов.
	// 2.1 Также у нас будет условие, что расчёты будут производиться только тогда, когда будет выбрано и введено значение указанных * полей, т.е. типа объекта "селект" и его площадь.
	// 2.2 Ещё у нас есть поля "кол-во помещений", число которого, согласно формуле, должно увеличивать сумму на 0.10% за дополнительное помещение.
	// 2.3.0 И ещё "Срок исполнения", где за менее 10 дней у нас добавляется х1.5 модификатор, а за <5 x2 модификатор цены.
	const countCalc = () => {
		const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
		const calcSquareValue = +calcSquare.value;

		let totalValue = 0;
		let calcCountValue = 1;
		let calcDaysValue = 1;

		if (+calcCount.value > 1) {
			// calcCountValue = calcCountValue + (+calcCount.value / 10);
			// можно сократить до:
			calcCountValue += +calcCount.value / 10;
		}
		// 2.3.1 Нам обязательно надо проводить также проверку на существование какого-то значения calcDays.value, иначе вернётся null, который будет меньше 5 и пройдёт проверку.
		if (calcDays.value && +calcDays.value < 5) {
			calcDaysValue = 2;
		} else if (calcDays.value && +calcDays.value < 10) {
			calcDaysValue = 1.5;
		}

		if (calcTypeValue && calcSquareValue && calcCount.value && calcDays.value) {
			totalValue = price * calcTypeValue * calcSquareValue * calcCountValue * calcDaysValue;
		} else {
			totalValue = 0;
		}
		// Добавим регулярку, которая будет разбивать число на разряды по 3, для удобства чтения.
		totalValue = totalValue.toString().replace(numberWithSpaces, " ");
		total.textContent = totalValue + ' ₽';
	}
	// ? 1. В принципе, т.к. у нас только инпуты и селект, то нам здесь даже можно было бы не делать проверку по event.target, т.к. событие 'input' будет срабатывать только на них. Но, для примера, представим, что у нас мог бы быть ещё один элемент, на который мы не хотим распространять делегирование.
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

				// const numberWithSpaces = /\B(?=(\d{3})+(?!\d))/g;
	// .toString().replace(numberWithSpaces, " ");
	// let timeout; - проверить идею про сброс id-timeout