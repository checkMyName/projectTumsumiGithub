import Page from '../../classes/Page';
import { questionScroll } from './questionScroll';

const qandaPage = new Page({
  name: 'qanda',
  rootElementId: 'js-page-qanda',

  onCreate() {
    console.log('qandaPage create')
  },
  onInit() {
    console.log('qandaPage init')

    this
      .addComponent(questionScroll)
  },
  onDestroy() {
    console.log('qandaPage destroy')
  },
});

export default qandaPage;
