import { digitsOnly } from './helpers';

export const sendFormFunc = ({ formId, someElems = [] }) => {
	const form = document.querySelector(formId);

	const statusInfoBlock = document.createElement('div');
	const loadText = 'Началась загрузка данных…';
	const errorText = 'Произошла ошибка! Попробуйте снова.';
	const successText = 'Спасибо за заявку! Наш менеджер скоро с вами свяжется!';

	const checkInput = (input, regExp) =>
		regExp.test(input.value) ?
			input.classList.add('success') :
			input.classList.add('error');

	const validate = (list) => {
		let success = true;
		
		list.forEach(input => {
			input.classList.remove('success');
			input.classList.remove('error');
			switch (input.name) {
				case 'user_name':
					checkInput(input, /[А-Яа-яЁё\s]/g);
					break;
				case 'user_email':
					checkInput(input, /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g);
					break;
				case 'user_phone':
					checkInput(input, /[\d()\-+]/g);
					break;
				case 'user_message':
					checkInput(input, /[\WА-Яа-яЁё_]/g);
					break;
			}
			!input.classList.contains('success') ?
				success = false :
				input.classList.remove('success')
		});

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
			// alert('Данные не валидны, проверьте ввод и попробуйте снова!');
			console.warn('Данные не валидны, проверьте ввод и попробуйте снова!');
		}
	}

	statusInfoBlock.classList.add('info-block');

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