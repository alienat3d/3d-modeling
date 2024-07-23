export const tabsFunc = () => {

	const tabsContent = document.querySelectorAll('.service-tab');
	const tabsPanel = document.querySelector('.service-header');
	const tabs = tabsPanel.querySelectorAll('.service-header-tab');
	console.log('tabs', tabs)

	tabsPanel.addEventListener('click', (evt) => {
		// if (tgt.classList.contains('service-header-tab')) { - не подходит, т.к. у нас внутри ещё тег <span>, поэтому используем метод closest() с классом вкладки
		if (evt.target.closest('.service-header-tab')) {
			// * 1.0 При каждом клике мы определяем по какой именно кнопке произошёл клик и перебираем forEach() все кнопки. Каждую итерируемую кнопку мы сравниваем с той кнопкой по которой произошёл клик. И если это она, то мы ей присвоим класс "active", а у остальных его удалим.
			// 1.1 Мы также можем получить в idx индекс каждой кнопки, а т.к. у нас контента табов столько же, сколько и кнопок, то мы можем легко их объединить. У контента с таким же индексом, как у активной кнопки мы удалим класс "d-none", скрывающий этот элемент, а у остальных его добавим.
			const tabBtn = evt.target.closest('.service-header-tab');
			tabs.forEach((tab, idx) => {
				
				if (tab === tabBtn) {
					tab.classList.add('active');
					tabsContent[idx].classList.remove('d-none');
				} else {
					tab.classList.remove('active');
					tabsContent[idx].classList.add('d-none');
				}
			});
		}
	})








}