import Swiper from "swiper";
import Component from "../../classes/Component";
import variables from "../../variables";

const { lg, md, sm } = variables.breakpoints

const ourclinicsSliderSelector = '.js-ourclinics-intro-slider';

export function ourclinicsSlider() {
return new Component({
  name: 'ourclinicsSlider',
  requiredTargets: ourclinicsSliderSelector,
  
  onCreate() {},
  onInit() {
    this.swiper = new Swiper(ourclinicsSliderSelector, {
      direction: 'horizontal',

      slidesPerView: 2,
      cssMode: true,
      speed: '.75s',

      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.05,
          spaceBetween: 10
        },
        // when window width is >= 480px
        // [sm]: {
        //   slidesPerView: 1.05,
        //   spaceBetween: 10
        // },
        // when window width is >= 640px
        [md]: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        [lg]: {
          slidesPerView: 2,
          spaceBetween: 20
        },
      },

      // navigation: {
      //   prevEl: introSliderButtonPrevSelector,
      //   nextEl: introSliderButtonNextSelector,
      //   disabledClass: variables.classNames.disabled,
      // },

      // pagination: {
      //   el: introSliderPaginationSelector,
      //   type: 'bullets',
      //   clickable: true,
      //   bulletClass: 'slider__pagination-bullet',
      //   bulletActiveClass: variables.classNames.active,
      // },
    });
  },
  onDestroy() {}
})
}