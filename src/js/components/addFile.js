import Component from '../classes/Component';
import { $dom } from '../helpers/dom';
import { $events } from '../helpers/events';
import variables from '../variables';

const { get, addClass, removeClass } = $dom

const previewGroupSelector = '.js-group-preview'
const fileInputSelector = '.js-file-input'

const fileEmptySelector = '.js-file-empty';
const fileLoadedSelector = '.js-file-loaded';
const fileLoadedNameSelector = '.js-file-name';
const fileDeleteButtonSelector = '.js-file-delete';
const previewFileSelector = '.js-preview-file';
const fileErrorSelector = '.js-file-error';

const fileSize = 10485760

export function addFile() {

  const handleDeletePreviewFile = event => {
    const target = event.target.closest(fileDeleteButtonSelector);

    removeClass(fileEmptySelector, variables.classNames.hidden);
    addClass(fileLoadedSelector, variables.classNames.hidden)

    get(fileInputSelector).value = '';

  }

  const handleAddImages = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      const reader = new FileReader();

      reader.onload = function () {
        if (e.target.files[i].size > fileSize) {
          removeClass(fileErrorSelector, variables.classNames.hidden);
        } else {
          addClass(fileErrorSelector, variables.classNames.hidden);
        }

        addClass(fileEmptySelector, variables.classNames.hidden);
        addClass(fileErrorSelector, variables.classNames.hidden);
        removeClass(fileLoadedSelector, variables.classNames.hidden)
        get(fileLoadedNameSelector).innerHTML = file.name
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  return new Component({
    name: 'addFile',
    requiredTargets: previewGroupSelector,
    onCreate() { },
    onInit() {

      $events.delegate
        .on('change', fileInputSelector, handleAddImages)
        .on('click', fileDeleteButtonSelector, handleDeletePreviewFile)
        .on('hide.bs.modal', window, handleDeletePreviewFile)
    },
    onDestroy() {
      $events.delegate
        .off('change', fileInputSelector, handleAddImages)
        .off('click', fileDeleteButtonSelector, handleDeletePreviewFile)
        .off('hide.bs.modal', window, handleDeletePreviewFile)
    }
  })
}