/* [✓] 2) У нас на странице есть 3 формы (первый экран, последний экран и модальное окно). Необходимо валидировать (проверять введенное значение на допустимые символы) поля ввода всех форм:

В поля ввода type=text и placeholder="Ваше сообщение" позволить ввод только кириллицы в любом регистре, дефиса и пробела.
В поля ввода type=email позволить ввод только латиницы в любом регистре, цифры и спецсимволы:  @  -  _  . ! ~ * '
(Собака , Дефис , Подчеркивание , Точка , Восклицательный знак , Тильда , Звездочка , Одинарная кавычка)   
В поля ввода type=tel позволить ввод только цифр, круглых скобок и дефис */
export const formFunc = () => {
	const textInputs = document.querySelectorAll('input[id$="-name"]');
	const emailInputs = document.querySelectorAll('input[type="email"]');
	const phoneInputs = document.querySelectorAll('input[type="tel"]');

	const cyrillicLettersOnly = /[^а-яА-Я]+/g;
	const emailSymbolsOnly = /[^\w\@\-\_\.\!\~\*\']+/g;
	const phoneSymbolsOnly = /[^\d\(\)\-]+/g;

	// Попытка создать более продвинутые проверки e-mail и телефона при помощи регулярок
	// const validEmail = /[\-\.[a-z]\_\!\~\*\']+@([a-z\-]+\.)+[a-z]{1,15}/g;
	// const validPhone = /^[[\+\d{1,2}]8]\([\d]{3}\)[\d]{3}-[\d]{2}-[\d]{2}$/g;

	/* 	const modifyInputs = (array, regExp) => {
			array.forEach(input =>
				input.addEventListener('input', () =>
					input.value = input.value.replace(regExp, '')
				)
			);
		} */
	const modifyInputs = (array, regExp) => {
		array.forEach(input =>
			input.addEventListener('blur', () => {
				input.value = input.value.replace(regExp, '');
				input.value = input.value.replace(/[ ]{2,}/, ' ');
				input.value = input.value.replace(/[-]{2,}/, '-');
				input.value = input.value.replace(/^[ -]+/, '');
				input.value = input.value.replace(/[ -]+$/, '');
			})
		);
	}
	const capitalizeFirstLetter = (array) => {
		array.forEach(input =>
			input.addEventListener('blur', () => {
				input.value = input.value.replace(/^([а-яё])([а-яА-Яё]+)/g, (str, $1, $2) => {
					return $1.toUpperCase() + $2.toLowerCase();
				})
			})
		);
	}

	modifyInputs(textInputs, cyrillicLettersOnly);
	capitalizeFirstLetter(textInputs);
	modifyInputs(emailInputs, emailSymbolsOnly);
	modifyInputs(phoneInputs, phoneSymbolsOnly);
}