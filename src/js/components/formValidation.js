import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';
import FormValidator from '@yaireo/validator'
import { isElement } from '../helpers/_utilities';

const {
  callAll,
  attr,
  get,
  remove,
  addClass,
  removeClass,
  exist
} = $dom;

const { formValidationMessages } = variables;
const
  formSelector = '.js-form-validate',
  formGroupSelector = '.js-group-validate',
  formFieldSelector = '.js-field-validate',
  notifyClassName = 'form__group-notify',
  needValidateClassName = 'is-need-validate'
  ;

const switcherRootSelector = '.js-switch-inputs';
const switcherSlideSelector = '.js-slide';
const inputPhoneSelector = '.js-input-phone';
const inputEmailSelector = '.js-input-email';
const inputCodeSelector = '.js-modal-code'

export function formValidation() {

  const inputsSwitcher = event => {
    const target = event.target.closest(switcherSlideSelector);
    const itemValue = attr(get('input:checked', target).parentNode, 'data-value');
    const form = get(switcherRootSelector)

    const inputPhone = get(inputPhoneSelector, form);
    const inputEmail = get(inputEmailSelector, form);

    switch (itemValue) {
      case 'phone': {
        removeClass(inputPhone, variables.classNames.hidden)
        addClass(inputEmail, variables.classNames.hidden)
        break;
      }
      case 'email': {
        removeClass(inputEmail, variables.classNames.hidden)
        addClass(inputPhone, variables.classNames.hidden)
        break;
      }
    }
  }

  const resetModalForms = event => {
    const target = event.target
    const form = get(formSelector, target)
    
    if(form) form.reset();
  }

  const limitLength = event => {
    const target = event.target.closest(inputCodeSelector);
    const maxLength = attr(target, 'maxlength');
    
    if (target.value.length > maxLength - 1) {
      target.value = target.value.slice(0, maxLength);
      console.log(target.value);
    }
  }

  return new Component({
    name: 'formValidation',
    requiredTargets: formSelector,
    onCreate() {
      this.validator = null;
    },
    onInit() {
      this.validator = new FormValidator({
        classes: {
          item: formGroupSelector.replace('.', ''),
          bad: variables.classNames.invalid,
          alert: notifyClassName
        },
        texts: formValidationMessages
      });

      attr(formSelector, 'novalidate', '');

      this.checkField = formGroup => {
        if (formGroup instanceof Event) {
          const { target } = formGroup;

          if (isElement(target)) formGroup = target.closest(formGroupSelector)
        }

        const field = get(formFieldSelector, formGroup);

        if (isElement(field)) {
          const { valid, error } = this.validator.checkField(field);
        }
      };

      this.handleForm = event => {
        const form = event.target.closest(formSelector);

        event.preventDefault();

        callAll(formGroupSelector, this.checkField, form);
        if (!this.validator.checkAll(form).valid) {
          console.log('invalid data');
          event.preventDefault();
        } else {
          console.log('valid data');
        }
      };

      callAll(formGroupSelector, el => addClass(el, needValidateClassName));

      $events
        .add('focus blur', formFieldSelector, this.checkField)
        .delegate
        .on('submit', formSelector, this.handleForm)
        .on('input change', formGroupSelector, this.checkField)
        .on('click', switcherSlideSelector, inputsSwitcher)
        .on('hide.bs.modal', window, resetModalForms)
        .on('input', inputCodeSelector, limitLength)
        ;
    },
    onDestroy() {
      this.validator = null;

      callAll(formSelector, form => {
        form.removeAttribute('novalidate');
        if (exist(formGroupSelector, form)) callAll(formGroupSelector, el => removeClass(el, needValidateClassName), form);
        if (exist('.' + notifyClassName, form)) callAll('.' + notifyClassName, el => remove(el), form);
      });


      $events
        .remove('focus blur', formFieldSelector, this.checkField)
        .delegate
        .off('submit', formSelector, this.handleForm)
        .off('input change', formGroupSelector, this.checkField)
        .off('click', switcherSlideSelector, inputsSwitcher)
        .off('hide.bs.modal', window, resetModalForms)
        ;
    },
  })
}
