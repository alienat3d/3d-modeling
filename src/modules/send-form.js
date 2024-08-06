import { digitsOnly } from './helpers';

export const sendFormFunc = ({ formId, someElems = [] }) => {
	const form = document.querySelector(formId);

	const statusInfoBlock = document.createElement('div');
	const loadText = 'Началась загрузка данных…';
	const errorText = 'Произошла ошибка! Попробуйте снова.';
	const successText = 'Спасибо за заявку! Наш менеджер скоро с вами свяжется!';

	const validate = (list) => {
		let success = true;

		// 4.7 Но если у нас нет отдельной функции, обрабатывающей регулярками инпуты, то сделать это можно здесь. Перебрать все инпуты и проверить методом test() их value. (И лично Александру этот вариант нравится больше.)
		/* list.forEach(input => {
			if (!input.classList.contains('success')) {
				success = false;
			}
		}); */

		return success;
	}

	const sendData = (data) => {
		return fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json());
	}

	const submitForm = () => {
		const formInputs = form.querySelectorAll('input');
		const formData = new FormData(form);
		const formBody = {};

		formData.forEach((value, key) => formBody[key] = value);

		someElems.forEach(elem => {
			const element = document.querySelector(elem.id);
			if (elem.type === 'block' && +digitsOnly(element.textContent) !== 0) {
				formBody[elem.id] = +digitsOnly(element.textContent);
			} else if (elem.type === 'input') {
				formBody[elem.id] = element.value;
			}
		});

		statusInfoBlock.textContent = loadText;
		form.append(statusInfoBlock);

		if (validate(formInputs)) {
			sendData(formBody)
				.then(() => {
					statusInfoBlock.textContent = successText;
					formInputs.forEach(input => input.value = '');
				})
				.catch(() => {
					statusInfoBlock.textContent = errorText;
				});
		} else {
			alert('Данные не валидны, проверьте ввод и попробуйте снова!');
		}
	}

	try {
		if (!form) {
			throw new Error('Форма отправки не найдена');
		}
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			submitForm();
		})
	} catch (error) {
		console.error(error.message);
	}
}