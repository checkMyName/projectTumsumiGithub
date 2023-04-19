import Component from '../classes/Component';
import IMask from 'imask';

import { $dom } from '../helpers/dom';

const { getAll } = $dom

const fieldSelector = '.js-phone-mask'

export function phoneMask() {
  return new Component({
    name: 'phoneMask',
    requiredTargets: fieldSelector,
    onCreate() {
      this.maskOptions = {
        mask: '+{7} (000) 000-00-00'
      };

      this.masks = [];
    },
    onInit() {
      this.masks = getAll(fieldSelector).map(field => IMask(field, this.maskOptions))
    },
    onDestroy() {
      this.masks = this.masks.filter(mask => {
        mask.destroy && mask.destroy();
        return false
      });
    }
  })
}