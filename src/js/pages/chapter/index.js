import Page from '../../classes/Page';
import { chapterContentChanger } from './chapterContentChanger';

const chapterPage = new Page({
  name: 'home',
  rootElementId: 'js-page-chapter',

  onCreate() {
    console.log('chapterPage create')
  },
  onInit() {
    console.log('chapterPage init')

    this
      .addComponent(chapterContentChanger)
      // .addComponent(ourclinicsSlider)
  },
  onDestroy() {
    console.log('chapterPage destroy')
  },
});

export default chapterPage;
