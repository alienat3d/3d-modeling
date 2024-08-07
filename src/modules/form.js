export const formFunc = () => {
	const textInputs = document.querySelectorAll('input[id$="-name"]');
	const emailInputs = document.querySelectorAll('input[type="email"]');
	const phoneInputs = document.querySelectorAll('input[type="tel"]');

	const cyrillicLettersOnly = /[^а-яА-Я]+/g;
	const emailSymbolsOnly = /[^\w\@\-\_\.\!\~\*\']+/g;
	const phoneSymbolsOnly = /[^\d\(\)\-]+/g;

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