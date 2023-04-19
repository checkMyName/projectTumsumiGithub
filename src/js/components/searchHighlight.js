import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const {addClass, removeClass} = $dom

const searchInputHighlightSelector = '.js-search-input-highlight';
const searchInputOutlineSelector = '.js-search-input-outline';

export function searchHighlight() {

  const isFilled = event => {
    const target = event.target.closest(searchInputHighlightSelector)

    if (target.value.length > 0) {
      addClass(target.parentNode, variables.classNames.filled)
    } else {
      removeClass(target.parentNode, variables.classNames.filled)
    }
  }

  const handleFocusIn = event => {
    const target = event.target.closest(searchInputOutlineSelector)

    console.log('focus on');

    addClass(target.parentNode, variables.classNames.focused)
  }

  const handleFocusOut = event => {
    const target = event.target.closest(searchInputOutlineSelector)

    console.log('focus out');

    removeClass(target.parentNode, variables.classNames.focused)
  }

  return new Component({
    name: 'searchHighlight',
    requiredTargets: searchInputHighlightSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('input', searchInputHighlightSelector, isFilled)
        .on('focusin', searchInputOutlineSelector, handleFocusIn)
        .on('focusout', searchInputOutlineSelector, handleFocusOut)
    },
    onDestroy() {
      $events.delegate
        .off('input', searchInputHighlightSelector, isFilled)
        .off('focusin', searchInputOutlineSelector, handleFocusIn)
        .off('focusout', searchInputOutlineSelector, handleFocusOut)
    }
  })
}