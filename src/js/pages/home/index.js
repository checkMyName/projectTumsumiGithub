import Page from '../../classes/Page';
import { introSlider } from './introSlider';
import { ourclinicsSlider } from './ourclinicsSlider';
import { specialistsSlider } from './specialistsSlider';

const homePage = new Page({
  name: 'home',
  rootElementId: 'js-page-home',

  onCreate() {
    console.log('homePage create')
  },
  onInit() {
    console.log('homePage init')

    this
      .addComponent(introSlider)
      .addComponent(ourclinicsSlider)
      .addComponent(specialistsSlider)
  },
  onDestroy() {
    console.log('homePage destroy')
  },
});

export default homePage;
