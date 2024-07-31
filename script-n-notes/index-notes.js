import { timerFunc } from "../src/modules/timer";
import { menuFunc } from "../src/modules/menu";
import { modalFunc } from "../src/modules/modal";
import { calcFunc } from "../src/modules/calc";
import { formFunc } from "../src/modules/form";
import { tabsFunc } from "../src/modules/tabs";
import { sliderFunc } from "../src/modules/slider";
import { swiperSettingsFunc } from "../src/modules/swiper-settings";
import { sendFormFunc } from "../src/modules/send-form";

timerFunc('07 august 2024 14:00');
menuFunc();
modalFunc();
calcFunc(10000);
formFunc();
tabsFunc();
sliderFunc('.portfolio-content', '.portfolio-item');
swiperSettingsFunc();
// todo [начало в send-form-notes.js]
// ? 3.5 Немного модифицируем параметры функции здесь и также в index.js, изменив на объект. Теперь мы там же сможем передавать в объект какое-то свойство, например массив с данными, в котором будут содержаться какие-то элементы, данные из которых нам нужно достать. 
// ? 3.6 Например, в этот объект мы можем поместить свойства "id" и "type". А такими данными могут быть например результаты калькулятора. Посмотрев в вёрстке, мы обнаружим, что у элемента со значением калькулятора id со значением "total", его мы и укажем в объект.
// ? 3.7 Т.к. элемент, из которого нужно добавлять данные может быть и простым блоком "div" или "span", так и строкой ввода "input". Т.о., если это будет простой блок, то мы будем обращаться к свойству textContent, а если это инпут, то к свойству value. Для этого мы добавили "type" в объект, что позволит нам оставаться более гибкими в дальнейшем.
// todo [см. send-form-notes.js]
sendFormFunc({
	formId: '#form12',
	someElems: [
		{
			id: '#total',
			type: 'block'
		}
	]
});
// sendFormFunc('#form2');
// sendFormFunc('#form3');