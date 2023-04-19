// import Swiper, { Navigation, Pagination } from 'swiper';
import Swiper, { Navigation, Pagination } from 'swiper';
import Component from '../classes/Component';
import variables from '../variables';

const { xl, lg, md, sm } = variables.breakpoints

const sliderSelector = '.js-chapter-slider';
const sliderButtonPrevSelector = '.js-chapter-button-prev';
const sliderButtonNextSelector = '.js-chapter-button-next';
const sliderPaginationSlider = '.js-chapter-pagination';

export function chapterSlider() {

  return new Component({
    name: 'chapterSlider',
    requiredTargets: sliderSelector,
    onCreate() {
    },
    onInit() {

      this.swiper = new Swiper(sliderSelector, {
        modules: [Navigation, Pagination],
        direction: 'horizontal',

        slidesPerView: 4,
        spaceBetween: 20,
        cssMode: true,
        speed: '.75s',

        breakpoints: {
          320: {
            slidesPerView: 1.05,
          },
          [sm]: {
            slidesPerView: 1.05,
            spaceBetween: 10
          },
          [md]: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          [lg]: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          [xl]: {
            slidesPerView: 3,
            spaceBetween: 20
          },
        },
        navigation: {
          prevEl: sliderButtonPrevSelector,
          nextEl: sliderButtonNextSelector,
          disabledClass: variables.classNames.disabled,
        },

        pagination: {
          el: sliderPaginationSlider,
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