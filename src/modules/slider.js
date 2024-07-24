export const sliderFunc = () => {
	let TIME_INTERVAL = 4;

	const sliderBlock = document.querySelector('.portfolio-content');
	const slides = sliderBlock.querySelectorAll('.portfolio-item');
	const dots = sliderBlock.querySelectorAll('.dot');

	// * 1.0 Для реализации смены слайдов нам потребуется переменная счётчик, значение которой будем увеличивать\уменьшать и её значение приравнивать к индексу и показывать нужный слайд, а другие скрывать.
	let currentSlide = 0;
	let interval;
	
	// 1.3 Чтобы сделать смену слайдов более универсальной напишем ещё две функции nextSlide() & prevSlide(). И чтобы сделать их по-настоящему универсальными добавим такие параметры, как "elems" (коллекция элементов), "idx" (индекс элемента, с которым на текущий момент работаем) и strClass (строчка класса активности)
	const prevSlide = (elems, idx, activeClass) => elems[idx].classList.remove(activeClass);
	const nextSlide = (elems, idx, activeClass) => elems[idx].classList.add(activeClass);

	// 1.1 Создадим функцию autoSlider(), чтобы слайды автоматически переключались. Итак в коллекции slides мы будем обращаться к элементу под индексом соответствующему значению currentSlide и удалять класс активности. Потом увеличить счётчик на единицу, достать новый элемент по новому индексу и дать ему класс активности.
	// * 2. Не забудем и про точки, обозначающие положение текущего слайдера в очереди слайдов. Для этого получим коллекцию точек и подставим их в универсальные функции "prevSlide()" & "nextSlide()"
	const autoSlider = () => {
		prevSlide(slides, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		nextSlide(slides, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	}
	// 1.2 Также нам понадобятся функции startSlider() & stopSlider(), для запуска и остановки слайдера соответственно. И запускать слайдер мы будем в интервале 3 секунды
	// * 4.0 Однако есть ещё кое что, что выглядит не очень красиво. Это то, что автоматическое перелистывание слайдов не обращает внимание на управление пользователем. Т.о. может произойти например двойное перелистывание слайдов. Это можно исправить тем, что при наведении на элементы управления (дотсы и стрелки) мы можем очищать интервал авто-слайдера, а потом, когда мышку увели снова его запускать. Для этого выше создадим ещё одну переменную "interval", куда занесём id-интервала авто-слайдера и будем его потом очищать и запускать снова. [↓]
	// * 5. Ещё будет неплохо передавать значение таймера не цифрами, а параметром со стандартным значением.
	TIME_INTERVAL = TIME_INTERVAL * 1000;

	const startSlider = (timer) => {
		interval = setInterval(autoSlider, timer);
	}
	const stopSlider = () => {
		clearInterval(interval);
	}

	// * 3.0 Также займёмся и управлением слайдером через кнопки "стрелки", а также по клику на точки ("дотсы"). И сделаем это через делегирование событий. Для этого повесим слушатель события "click" на блок слайдера.
	sliderBlock.addEventListener('click', (evt) => {
		evt.preventDefault();

		// 3.5 Ещё не помешает иметь ограничитель, чтобы событие не срабатывало каждый раз, когда мы кликаем в любом месте слайдера. Укажем в методе matches, на каких именно элементах нам нужно, чтобы событие срабатывало. У дотсов это ".dot", а у стрелок ".portfolio-btn". Теперь, с помощью "!" и "return" мы можем указать, что наш скрипт должен выполняться только, если event.target соответствует одному из элементов с указанными в matches() классами иначе функция завершается. Это сэкономит уйму ресурсов.
		if (!evt.target.matches('.dot, .portfolio-btn')) return;
		
		// 3.3.0 Ну и в итоге нам нужно, также как и в функции autoSlider() добавить функции для слайдов и дотсов prevSlide() до условия...[↓]
		prevSlide(slides, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');
		
		// 3.1 При помощи метода matches мы отфильтруем нужные элементы из event.target. И здесь всё просто, по клику на кнопке влево мы будем уменьшать значение currentSlide на 1, что отмотает слайд назад, а по клику на кнопке вправо увеличивать значение на 1, что отмотает слайд вперёд соответственно.
		// 3.2 А также добавим ещё одно условие для поиска класса "dot". Здесь мы будем перебирать всю коллекцию дотсов и сравнивать event.target с индексом дотсов, и если они совпадут, тогда мы дадим currentSlide значение idx, что переключит нас на нужный слайд.
		if (evt.target.matches('#arrow-left')) {
			currentSlide--;
		} else if (evt.target.matches('#arrow-right')) {
			currentSlide++;
		} else if (evt.target.classList.contains('dot')) {
			dots.forEach((dot, idx) => {
				if (evt.target === dot) currentSlide = idx;
			});
		}

		// 3.4 Не забыть добавить условие-предохранитель, чтобы currentSlide не превысил максимального значения и не вызвал ошибку. Но Также, чтобы и когда значение currentSlide достигало 0, то оно возвращалось на максимальное.
		if (currentSlide >= slides.length) currentSlide = 0;
		if (currentSlide < 0) currentSlide = slides.length - 1;

		// 3.3.1 [...] , а также функции nextSlide() после условия. Т.о. мы переопределим значения currentSlide и дадим активный класс другим элементам.
		nextSlide(slides, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	})

	// * 4.1 Чтобы autoSlider() останавливалась при наведении на кнопки стрелок и дотсы, а запускалась при покидании курсора этих кнопок, напишем ещё два слушателя. Также нам понадобится тот ограничитель по элементам, который мы описали выше, но уже без "!".
	// ? 4.2 Но теперь мы столкнулись с тем, что почему-то нужные элементы не попадают в консоль, если мы поместим в условие "console.log(evt.target)". Так происходит потому, что события "mouseenter" & "mouseleave" действуют на родительские элементы и на сами элементы не влияют. Мы конечно могли бы вместо этого использовать "mouseover", но для разбора опции "погружения" мы сделаем иначе. Мы добавим вторым аргументом слушателя true, что изменит поведение "всплытия событий" на "погружение". Т.е. перемещение поиска не вверх по иерархии DOM-дерева, а вниз к дочерним, а не к родительским элементам.
	sliderBlock.addEventListener('mouseenter', (evt) => {
		if (evt.target.matches('.dot, .portfolio-btn')) stopSlider(TIME_INTERVAL);
	}, true)
	sliderBlock.addEventListener('mouseleave', (evt) => {
		if (evt.target.matches('.dot, .portfolio-btn')) startSlider(TIME_INTERVAL);
	}, true)

	startSlider(TIME_INTERVAL);
}