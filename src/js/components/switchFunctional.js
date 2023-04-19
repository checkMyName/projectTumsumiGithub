import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const { get, getAll, toggleClass } = $dom

const switchSelector = '.js-switch';
const switchSideSelector = '.js-switch-side';
const switchButtonSelector = '.js-switch-button';

export function switchFunctional() {

  const sidesArray = getAll(switchSideSelector)

  const switchHandler = event => {
    const target = event.target;

    if (!target) return

    if (target.closest(switchSideSelector)) {
      toggleClass(sidesArray[0], variables.classNames.active)
      toggleClass(sidesArray[1], variables.classNames.active)
      const input = get(`${switchButtonSelector} input`, target.closest(switchSideSelector).parentNode)
      input.checked = !input.checked
      return
    }

    if (target.closest(switchButtonSelector)) {
      toggleClass(sidesArray[0], variables.classNames.active)
      toggleClass(sidesArray[1], variables.classNames.active)
      return
    }

  }

  return new Component({
    name: 'switchFunctional',
    requiredTargets: switchSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', switchSelector, switchHandler)
    },
    onDestroy() {
      $events.delegate
        .off('click', switchSelector, switchHandler)
    }
  })
}