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