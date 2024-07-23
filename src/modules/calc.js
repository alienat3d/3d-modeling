export const calcFunc = () => {
	const calcBlock = document.querySelector('.calc-block');
	const calcInputs = calcBlock.querySelectorAll('input');

	const regExpDigitsOnly = /\D+/g;

	calcInputs.forEach(input => {
		input.addEventListener('input', () =>
			input.value = input.value.replace(regExpDigitsOnly, '')
		)
	});
}