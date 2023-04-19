import Component from '../../classes/Component';
import { $dom } from '../../helpers/dom';
import { $events } from '../../helpers/events';
import variables from '../../variables';

const {get, getAll, attr, addClass, removeClass, hasClass, toggleClass} = $dom

const chapterWrapperSelector = '.js-chapter-wrapper';
const chapterContentSelector = '.js-chapter-content';
const chapterItemSelector = '.js-chapter-item';

const chapterPricesBlockSelector = '.js-chapter-prices-block';
const chapterPricesButtonSelector = '.js-chapter-prices-button';
const chapterDropdownSelector = '.js-chapter-dropdown';
const chapterDropdownMenuSelector = '.js-chapter-dropdown-menu';

const hiddenClass = 'hidden';

export function chapterContentChanger() {
  const itemsList = getAll(chapterItemSelector, chapterWrapperSelector);
  const contentsList = getAll(chapterContentSelector, chapterWrapperSelector)

  const contentChanger = event => {
    const target = event.target.closest(chapterItemSelector);
    const contentId = attr(target, 'data-content-id');
    const content = get(`${chapterContentSelector}[data-content-id="${contentId}"]`)
    
    itemsList.forEach((element, i) => {
      if (hasClass(element, variables.classNames.active)) removeClass(element, variables.classNames.active)
      if (hasClass(contentsList[i], variables.classNames.active)) removeClass(contentsList[i], variables.classNames.active)
    });

    addClass(target, variables.classNames.active)
    addClass(content, variables.classNames.active)
  }

  const dropdownContentChanger = event => {
    const target = event.target.closest(chapterDropdownSelector);
    const list = get(chapterDropdownMenuSelector, target);
    const currentElementId = attr(get(`.${variables.classNames.selected}`, list), 'data-value')
    const content = get(`${chapterContentSelector}[data-content-id="${currentElementId}"]`)

    contentsList.forEach((element, i) => {
      if (hasClass(element, variables.classNames.active)) removeClass(element, variables.classNames.active)
    });

    addClass(content, variables.classNames.active)
  }

  const pricesVisibilitySwitcher = event => {
    const target = event.target.closest(chapterPricesButtonSelector)

    toggleClass(target, variables.classNames.active);
    toggleClass(get(chapterPricesBlockSelector, target.parentNode), hiddenClass);
  }

  return new Component({
    name: 'chapterContentChanger',
    requiredTargets: chapterWrapperSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', chapterItemSelector, contentChanger)
        .on('click', chapterPricesButtonSelector, pricesVisibilitySwitcher)
        .on('hide.bs.dropdown', chapterDropdownSelector, dropdownContentChanger)
     },
    onDestroy() { }
  })
}