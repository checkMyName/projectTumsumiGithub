import autoComplete from "@tarekraafat/autocomplete.js";
import smartSearch from "smart-search";
import Component from "../../classes/Component";
import { $dom } from "../../helpers/dom";
import { $events } from "../../helpers/events";
import variables from "../../variables";

const { get, getAll, addClass, removeClass } = $dom

const pricesSearchId = 'pricesAutoComplete';

const pricesSelector = '.js-prices';
const pricesSearchSelector = '.js-prices-search';
const pricesSearchInputSelector = '.js-prices-search-input';
const pricesSearchCloseSelector = '.js-prices-search-close';
const pricesSearchResultSelector = '.js-prices-search-result';
const pricesSearchAreaSelector = '.js-prices-search-area';

const pricesResultTemplate = '#search-element';

export function pricesSearch() {

  const pricesList = getAll('.border-horizontal', pricesSearchAreaSelector);
  const resultTemplate = get(pricesResultTemplate).innerHTML

  let entries = [];

  pricesList.forEach(element => {
    entries.push({
      name: get('[data-name]', element).innerHTML,
      price: get('[data-price]', element).innerHTML
    })
  });

  const insertElement = (element, template) => element.insertAdjacentHTML('beforeend', template)

  function printresult(result) {

    if (!result) return
    
    result.map(element => {

      const newResultTemplate = Object.keys(element).reduce((acc, key) => {

        if (element.hasOwnProperty(key)) {
          const val = element[key];
          acc = acc.replaceAll(`{{${key}}}`, val)

          if (key == 'searchValue') {
            let re = new RegExp(element[key], 'g')
            acc = acc.replaceAll(re, `<span class="text-danger">${element[key]}</span>`)
          }
        }
        return acc;
      }, resultTemplate)

      insertElement(get(pricesSearchResultSelector), newResultTemplate)
    })
  }

  const getSearchResult = event => {
    const target = event.target.closest(pricesSearchInputSelector)
    const pattern = target.value;
    const fields = { name: true };
    let result = [];
    let resultArr = [];

    if (target.value.length > 0) {
      addClass(target.parentNode, variables.classNames.focused)
      addClass(target.parentNode, variables.classNames.filled)
      addClass(pricesSelector, variables.classNames.active)
    } else {
      removeClass(target.parentNode, variables.classNames.focused)
      removeClass(target.parentNode, variables.classNames.filled)
      removeClass(pricesSelector, variables.classNames.active)
    }

    get(pricesSearchResultSelector).innerHTML = '';
    
    if (!target.value) return

    smartSearch(entries, pattern, fields).map(element => {
      result.push({
        name: element.entry.name,
        price: element.entry.price,
        searchValue: element.info[0].patterns[0].value,
      })
    });
    
    printresult(result)
  }

  const cleanInput = event => {
    const target = event.target.closest(pricesSearchCloseSelector);

    console.log(target.parentNode);
    get(pricesSearchInputSelector, target.parentNode).value = '';

    removeClass(target.parentNode, variables.classNames.focused)
    removeClass(pricesSelector, variables.classNames.active)
    get(pricesSearchResultSelector).innerHTML = '';
  }

  return new Component({
    name: 'pricesSearch',
    requiredTargets: pricesSelector,
    onCreate() { },
    onInit() {
      $events.delegate
        .on('input', pricesSearchInputSelector, getSearchResult)
        .on('click', pricesSearchCloseSelector, cleanInput)
    },
    onDestroy() { }
  })
}