import getRootElement from './get-root-element';
import { isDocument, isElement } from './-target';
/**
  Used internally by the DOM interaction helpers to find one element.

  @private
  @param {string|Element} target the element or selector to retrieve
  @returns {Element} the target or selector
*/
function getElement(target) {
    if (typeof target === 'string') {
        let rootElement = getRootElement();
        return rootElement.querySelector(target);
    }
    else if (isElement(target) || isDocument(target)) {
        return target;
    }
    else if (target instanceof Window) {
        return target.document;
    }
    else {
        throw new Error('Must use an element or a selector string');
    }
}
export default getElement;
