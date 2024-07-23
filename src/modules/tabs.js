export const tabsFunc = () => {

	const tabsContent = document.querySelectorAll('.service-tab');
	const tabsPanel = document.querySelector('.service-header');
	const tabs = tabsPanel.querySelectorAll('.service-header-tab');

	tabsPanel.addEventListener('click', (evt) => {
		if (evt.target.closest('.service-header-tab')) {
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