import { isDocument } from './-target';
const FORM_CONTROL_TAGS = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'];
/**
  @private
  @param {Element} element the element to check
  @returns {boolean} `true` when the element is a form control, `false` otherwise
*/
export default function isFormControl(element) {
    return (!isDocument(element) &&
        FORM_CONTROL_TAGS.indexOf(element.tagName) > -1 &&
        element.type !== 'hidden');
}
