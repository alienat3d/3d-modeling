export const formFunc = () => {
	const textInputs = document.querySelectorAll('input[id$="-name"]');
	const emailInputs = document.querySelectorAll('input[type="email"]');
	const phoneInputs = document.querySelectorAll('input[type="tel"]');
	console.log('phoneInputs', phoneInputs)

	const cyrillicLettersOnly = /[^а-яА-Я]+/g;
	const emailSymbolsOnly = /[^\w\@\-\_\.\!\~\*\']+/g;
	const phoneSymbolsOnly = /[^\d\(\)\-]+/g;

	// Попытка создать более продвинутые проверки e-mail и телефона при помощи регулярок
	// const validEmail = /[\-\.[a-z]\_\!\~\*\']+@([a-z\-]+\.)+[a-z]{1,15}/g;
	// const validPhone = /^[[\+\d{1,2}]8]\([\d]{3}\)[\d]{3}-[\d]{2}-[\d]{2}$/g;

	const modifyInputs = (array, regExp) => {
		array.forEach(input =>
			input.addEventListener('input', () =>
				input.value = input.value.replace(regExp, '')
			)
		);
	}

	modifyInputs(textInputs, cyrillicLettersOnly);
	modifyInputs(emailInputs, emailSymbolsOnly);
	modifyInputs(phoneInputs, phoneSymbolsOnly);
}