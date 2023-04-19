import Component from '../classes/Component';

const mapId = 'addresses__map';
const mapSelector = '.js-addresses-map';

export function addressesMap() {
  return new Component({
    name: 'addressesMap',
    requiredTargets: mapSelector,
    onCreate() { },
    onInit() {
      ymaps.ready(init);
      function init() {
        var myMap = new ymaps.Map('map', {
          center: [57.137202, 65.576171],
          zoom: 17
        });
      }
    },
    onDestroy() { }
  })
}