/*
1) В калькуляторе разрешить ввод только цифр: 
После выполнения необходимо проверить работоспособность SELECT - при выборе любого значения текст option должен отображаться. 

2) У нас на странице есть 3 формы (первый экран, последний экран и модальное окно). Необходимо валидировать (проверять введенное значение на допустимые символы) поля ввода всех форм:

В поля ввода type=text и placeholder="Ваше сообщение" позволить ввод только кириллицы в любом регистре, дефиса и пробела.
В поля ввода type=email позволить ввод только латиницы в любом регистре, цифры и спецсимволы:  @  -  _  . ! ~ * '
(Собака , Дефис , Подчеркивание , Точка , Восклицательный знак , Тильда , Звездочка , Одинарная кавычка)   
В поля ввода type=tel позволить ввод только цифр, круглых скобок и дефис
*/
export const calcFunc = () => {
	const calcBlock = document.querySelector('.calc-block');
	const calcInputs = calcBlock.querySelectorAll('input');
	// const calcSelect = calcBlock.querySelector('.calc-type');
	// const calcOptions = calcSelect.querySelectorAll('option');

	// console.log(calcOptions);

	const regExpDigitsOnly = /\D+/g;

	calcInputs.forEach(input => {
		input.addEventListener('input', () =>
			input.value = input.value.replace(regExpDigitsOnly, '')
		)
	});
}