import { timerFunc } from "./modules/timer";
import { menuFunc } from "./modules/menu";
import { modalFunc } from "./modules/modal";
import { calcFunc } from "./modules/calc";
import { formFunc } from "./modules/form";
import { tabsFunc } from "./modules/tabs";
import { sliderFunc } from "./modules/slider";
import { swiperSettingsFunc } from "./modules/swiperSettings";

timerFunc('07 august 2024 14:00');
menuFunc();
modalFunc();
calcFunc(10000);
formFunc();
tabsFunc();
sliderFunc('.portfolio-content', '.portfolio-item');
swiperSettingsFunc();