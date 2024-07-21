/*
[✓] 1) В калькуляторе разрешить ввод только цифр: 
После выполнения необходимо проверить работоспособность SELECT - при выборе любого значения текст option должен отображаться. 
*/
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