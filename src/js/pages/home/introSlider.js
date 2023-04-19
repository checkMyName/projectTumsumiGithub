// import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import Swiper, { Navigation, Pagination } from 'swiper';
import Component from '../../classes/Component';
import { $dom } from '../../helpers/dom';
import { $events } from '../../helpers/events';
import variables from '../../variables';

const { get } = $dom

const root = '.js-home-intro';
const sliderSelector = '.js-home-intro-slider';

const introSliderButtonPrevSelector = '.js-intro-slider-button-prev';
const introSliderButtonNextSelector = '.js-intro-slider-button-next';
const introSliderPaginationSelector = '.js-slider-pagination';

export function introSlider() {

  return new Component({
    name: 'introSlider',
    requiredTargets: root,
    onCreate() {
    },
    onInit() {

      this.swiper = new Swiper(sliderSelector, {
        modules: [Navigation, Pagination],
        direction: 'horizontal',

        slidesPerView: 1,
        cssMode: true,
        speed: '.75s',

        navigation: {
          prevEl: introSliderButtonPrevSelector,
          nextEl: introSliderButtonNextSelector,
          disabledClass: variables.classNames.disabled,
        },

        pagination: {
          el: introSliderPaginationSelector,
          type: 'bullets',
          clickable: true,
          bulletClass: 'slider__pagination-bullet',
          bulletActiveClass: variables.classNames.active,
        },
      });
    },
    onDestroy() {
      this.swiper = null;
    }
  })
}