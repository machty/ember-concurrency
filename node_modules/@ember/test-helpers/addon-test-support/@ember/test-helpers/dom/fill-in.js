import getElement from './-get-element';
import isFormControl from './-is-form-control';
import { __focus__ } from './focus';
import settled from '../settled';
import fireEvent from './fire-event';
import { nextTickPromise } from '../-utils';
/**
  Fill the provided text into the `value` property (or set `.innerHTML` when
  the target is a content editable element) then trigger `change` and `input`
  events on the specified target.

  @public
  @param {string|Element} target the element or selector to enter text into
  @param {string} text the text to fill into the target element
  @return {Promise<void>} resolves when the application is settled

  @example
  <caption>
    Emulating filling an input with text using `fillIn`
  </caption>

  fillIn('input', 'hello world');
*/
export default function fillIn(target, text) {
    return nextTickPromise().then(() => {
        if (!target) {
            throw new Error('Must pass an element or selector to `fillIn`.');
        }
        let element = getElement(target);
        if (!element) {
            throw new Error(`Element not found when calling \`fillIn('${target}')\`.`);
        }
        let isControl = isFormControl(element);
        if (!isControl && !element.isContentEditable) {
            throw new Error('`fillIn` is only usable on form controls or contenteditable elements.');
        }
        if (typeof text === 'undefined' || text === null) {
            throw new Error('Must provide `text` when calling `fillIn`.');
        }
        __focus__(element);
        if (isControl) {
            element.value = text;
        }
        else {
            element.innerHTML = text;
        }
        fireEvent(element, 'input');
        fireEvent(element, 'change');
        return settled();
    });
}
