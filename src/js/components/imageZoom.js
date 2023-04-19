import { Modal } from 'bootstrap';
import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';

const {get, attr} = $dom

const imageZoomModalId = 'js-image-zoom-modal';

const imageZoomItemSelector = '.js-image-zoom-item';
const imageZoomModalItemSelector = '.js-image-zoom-modal-item';

export function imageZoom() {

  const imageZoomModal = new Modal(`#${imageZoomModalId}`, {});

  const zoomOnImage = event => {
    const target = event.target.closest(imageZoomItemSelector)
    const imageSrc = attr(target, 'src');
    const modalImage = get(imageZoomModalItemSelector, `#${imageZoomModalId}`);

    attr(modalImage, 'src', imageSrc);

    imageZoomModal.show();
  }
  
  return new Component({
    name: 'imageZoom',
    requiredTargets: imageZoomItemSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', imageZoomItemSelector, zoomOnImage)
     },
    onDestroy() { }
  })
}