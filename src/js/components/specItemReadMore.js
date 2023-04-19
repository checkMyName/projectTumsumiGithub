import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const { get, getAll, toggleClass, removeClass } = $dom

const specItemSelector = '.js-specitem'; 
const readMoreButtonSelector = '.js-specitem-button-more';

export function specItemReadMore() {

  const clickHandler = event => {
    const target = event.target.closest(readMoreButtonSelector);
    const specitem = target.parentNode.parentNode.parentNode.parentNode;

    toggleClass(target, variables.classNames.active)
    toggleClass(specitem, variables.classNames.active)
  }

  const clearClasses = () => {

    if(window.innerWidth < variables.breakpoints.md) return

    getAll(specItemSelector).forEach(element => {
      removeClass(element, variables.classNames.active)
      removeClass(get(readMoreButtonSelector, element), variables.classNames.active)
    });
  }

  return new Component({
    name: 'specItemReadMore',
    requiredTargets: specItemSelector,
    onCreate() { },
    onInit() {

      $events.resize('on', clearClasses);

      $events.delegate
        .on('click', readMoreButtonSelector, clickHandler)
    },
    onDestroy() { }
  })
}