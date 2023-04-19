import Component from '../classes/Component';
import { $events } from '../helpers/events';
import { $dom } from '../helpers/dom';
import AirDatepicker from 'air-datepicker';

const { get } = $dom

const calendarSelector = '.js-calendar';
const calendarInputSelector = '.js-calendar-input';
const calendarButtonSelector = '.js-calendar-button';

export function calendarFunctional() {

  const showCalendar = event => {
    const target = event.target.closest(calendarButtonSelector);
    const input = get(calendarInputSelector, target.parentNode)
    const calendar = new AirDatepicker(input, {
      isMobile: true,
      onSelect() {
        calendar.hide();
      }
    })

    calendar.show();
  }

  return new Component({
    name: 'calendarFunctional',
    requiredTargets: calendarSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('click', calendarButtonSelector, showCalendar)
    },
    onDestroy() {
      $events.delegate
        .off('click', calendarButtonSelector, showCalendar)
     }
  })
}