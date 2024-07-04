/* 
[✓] 1) Написать таймер обратного отсчета по видео.
[✓] 2) Переписать таймер с помощью setInterval. Будьте внимательны, чтобы setInterval не вызывал сам себя, не превращался в рекурсивный вызов!
Проверить себя легко. Выведите что-нибудь в консоль внутри функции updateClock. Вывод в консоль должен происходить 1 раз за 1000ms.
[✓] 3) Проверить, чтобы все работало и не было ошибок в консоли
[✓] 4) У таймера есть проблема (нужно исправить):
	- Если дата уже прошла, а мы заходим на страницу, то получим (-1350 : -23 : -30)
[✓] 5) Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00
	- Необходимо подставлять 0 перед значениями, которые состоят из одной цифры (из 4:6:50 сделает 04:06:50)
[] 6) В отдельной папке создать html и js
	Вывести текущий день и время на страницу в таком формате
"Добрый день (утро, вечер, ночь в зависимости от времени суток)

Сегодня: Понедельник

Текущее время: 12:05:15 PM

До нового года осталось 175 дней"
*/
export const timerFunc = (date) => {
	const timerDays = document.getElementById('timer-days');
	const timerHours = document.getElementById('timer-hours');
	const timerMinutes = document.getElementById('timer-minutes');
	const timerSeconds = document.getElementById('timer-seconds');

	let clockInterval;
	let timeLeft;

	const addPrefixZero = num => {
		num < 10 ? num = `0${num}` : num;
		return num;
	}

	const getTimeRemaining = (deadline) => {
		const dateStop = new Date(deadline).getTime();
		const dateNow = new Date().getTime();
		const timeRemaining = (dateStop - dateNow) / 1000;
		const seconds = Math.floor(timeRemaining % 60);
		const minutes = Math.floor((timeRemaining / 60) % 60);
		const hours = Math.floor((timeRemaining / 60 / 60) % 24);
		const days = Math.floor(timeRemaining / 60 / 60 / 24);
		return { timeRemaining, days, hours, minutes, seconds };
	}

	const updateClock = () => {
		const getTime = getTimeRemaining(date);

		const fSeconds = addPrefixZero(getTime.seconds);
		const fMinutes = addPrefixZero(getTime.minutes);
		const fHours = addPrefixZero(getTime.hours);
		const fDays = addPrefixZero(getTime.days);

		timerSeconds.textContent = fSeconds;
		timerMinutes.textContent = fMinutes;
		timerHours.textContent = fHours;
		timerDays.textContent = fDays;

		if (getTime.timeRemaining <= 0) {
			timerSeconds.textContent = '00';
			timerMinutes.textContent = '00';
			timerHours.textContent = '00';
			timerDays.textContent = '00';
		};
		return getTime.timeRemaining;
	}

	clockInterval = setInterval(() => {
		if (timeLeft <= 0) {
			clearInterval(clockInterval);
		};
		timeLeft = updateClock();
	}, 500);
}