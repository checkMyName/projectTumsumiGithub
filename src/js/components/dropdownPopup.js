import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const {get, addClass, removeClass, toggleClass} = $dom

const dropdownSelector = '.js-dropdown-popup';
const dropdownButtonSelector = '.js-dropdown-popup-button';
const dropdownContentSelector = '.js-dropdown-popup-content';

export function dropdownPopup() {

  const showDropdown = event => {
    const target = event.target.closest(dropdownButtonSelector)

    toggleClass(target, variables.classNames.active)
    toggleClass(get(dropdownContentSelector, target.parentNode), variables.classNames.active)
  }

  const hideAll = event => {
    const target = event.target
    
    if (target.closest(dropdownButtonSelector) || target.closest(dropdownContentSelector)) return

    removeClass(dropdownButtonSelector, variables.classNames.active)
    removeClass(dropdownContentSelector, variables.classNames.active)
  }
  
  return new Component({
    name: 'dropdownPopup',
    requiredTargets: dropdownSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', dropdownButtonSelector, showDropdown)
        .on('click', window, hideAll)
     },
    onDestroy() { }
  })
}