import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const {get, getAll, addClass, removeClass, clone, append, remove} = $dom

const headerNavSelector = '.js-header-nav';
const footerNavSelector = '.js-footer-nav';

const navSelector = '.js-nav';
const navContentSelector = '.js-nav-content';
const navLinkSelector = '.js-nav-link';
const navTripledotSelector = '.js-nav-tripledot';
const navTripledotButtonSelector = '.js-nav-tripledot-button';
const navTripledotContentSelector = '.js-nav-tripledot-content';

export function tripledot() {

  const hidePopUpElements = root => {
    // let hiddenElements = [];
    let widthSum = 50;
    let navWidth = 0;
    
    const nav = get(navSelector, root);
    const navContent = get(navContentSelector, nav);
    const navLinks = getAll(navLinkSelector, navContent);
    const tripledot = get(navTripledotSelector, root);
    const tripledotContent = get(navTripledotContentSelector, tripledot);

    tripledotContent.innerHTML = '';

    addClass(tripledot, 'd-none')

    navLinks.forEach(element => {
      removeClass(element, 'd-none')
    });

    if(window.innerWidth < variables.breakpoints.lg) return

    navWidth = navContent.getBoundingClientRect().width

    navLinks.forEach(element => {
      const elemWidth = element.getBoundingClientRect().width

      widthSum += elemWidth;

      if (widthSum > navWidth) {
        removeClass(tripledot, 'd-none')

        tripledotContent.appendChild(clone(element));
        
        addClass(element, 'd-none')
      }
    });
  }

  function resizeUpdate() {
    console.log('resize update');
    hidePopUpElements(headerNavSelector)
    hidePopUpElements(footerNavSelector)
  }

  return new Component({
    name: 'tripledot',
    requiredTargets: navSelector,
    onCreate() { },
    onInit() {
      resizeUpdate()

      $events.resize('on', resizeUpdate)
      $events.resize('on', resizeUpdate)
     },
    onDestroy() {
      $events.resize('off', resizeUpdate)
      $events.resize('off', resizeUpdate)
     }
  })
}