// import Component from '../classes/Component';

import Component from "../../classes/Component";
import { $dom } from "../../helpers/dom";
import { $events } from "../../helpers/events";

const {get} = $dom

const questionRootSelector = '.js-question-scroll-root';
const questionButtonSelector = '.js-question-scroll-button';
const questionBlockId = 'js-question-scroll-block';

export function questionScroll() {

  const scrollToElement = () => {

    get(`#${questionBlockId}`).scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }
  
  return new Component({
    name: 'questionScroll',
    requiredTargets: questionRootSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', questionButtonSelector, scrollToElement)
     },
    onDestroy() {
      $events.delegate
        .off('click', questionButtonSelector, scrollToElement)
     }
  })
}