import getRootElement from './get-root-element';
/**
  Used internally by the DOM interaction helpers to find multiple elements.

  @private
  @param {string} target the selector to retrieve
  @returns {NodeList} the matched elements
*/
export default function getElements(target) {
    if (typeof target === 'string') {
        let rootElement = getRootElement();
        return rootElement.querySelectorAll(target);
    }
    else {
        throw new Error('Must use a selector string');
    }
}
