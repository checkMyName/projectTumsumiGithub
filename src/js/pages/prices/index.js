import Page from '../../classes/Page';
import { pricesSearch } from './pricesSearch';

const pricesPage = new Page({
  name: 'prices',
  rootElementId: 'js-page-prices',

  onCreate() {
    console.log('pricesPage create')
  },
  onInit() {
    console.log('pricesPage init')

    this
    .addComponent(pricesSearch)
  },
  onDestroy() {
    console.log('pricesPage destroy')
  },
});

export default pricesPage;
