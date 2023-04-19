import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const { get, getAll, addClass, removeClass } = $dom

const searchSelector = '.js-search';
const searchInputSelector = '.js-search-input';
const searchDropdownSelector = '.js-search-dropdown';

export function searchDropdown() {

  const showDropdown = event => {
    const target = event.target.closest(searchInputSelector);
    const dropdown = get(searchDropdownSelector, target.parentNode)

    if (target.value.length > 0) {
      addClass(dropdown, variables.classNames.active)
      // addClass(target.parentNode, variables.classNames.filled)
    } else {
      removeClass(dropdown, variables.classNames.active)
      // removeClass(target.parentNode, variables.classNames.filled)
    }
  }

  const closeDropdown = event => {
    const target = event.target

    console.log('kjfgdjhfgdjkjvdjkjuj');

    if (!target.closest(searchInputSelector) || !target.closest(searchDropdownSelector)) {
      getAll(searchDropdownSelector).forEach(element => {
        removeClass(element, variables.classNames.active)
      });
      getAll(searchInputSelector).forEach(element => {
        removeClass(element, variables.classNames.filled)
      });
      // removeClass(get(searchDropdownSelector), variables.classNames.active)
      // removeClass(get(searchInputSelector), variables.classNames.filled)
    }
  }

  return new Component({
    name: 'searchDropdown',
    requiredTargets: searchSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('input', searchInputSelector, showDropdown)
        .on('click', window, closeDropdown)
    },
    onDestroy() {
      $events.delegate
        .off('input', searchInputSelector, showDropdown)
        .off('click', window, closeDropdown)
    }
  })
}