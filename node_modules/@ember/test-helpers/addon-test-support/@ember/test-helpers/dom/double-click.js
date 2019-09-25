import getElement from './-get-element';
import fireEvent from './fire-event';
import { __focus__ } from './focus';
import settled from '../settled';
import isFocusable from './-is-focusable';
import { nextTickPromise } from '../-utils';
/**
  @private
  @param {Element} element the element to double-click on
  @param {Object} options the options to be merged into the mouse events
*/
export function __doubleClick__(element, options) {
    fireEvent(element, 'mousedown', options);
    if (isFocusable(element)) {
        __focus__(element);
    }
    fireEvent(element, 'mouseup', options);
    fireEvent(element, 'click', options);
    fireEvent(element, 'mousedown', options);
    fireEvent(element, 'mouseup', options);
    fireEvent(element, 'click', options);
    fireEvent(element, 'dblclick', options);
}
/**
  Double-clicks on the specified target.

  Sends a number of events intending to simulate a "real" user clicking on an
  element.

  For non-focusable elements the following events are triggered (in order):

  - `mousedown`
  - `mouseup`
  - `click`
  - `mousedown`
  - `mouseup`
  - `click`
  - `dblclick`

  For focusable (e.g. form control) elements the following events are triggered
  (in order):

  - `mousedown`
  - `focus`
  - `focusin`
  - `mouseup`
  - `click`
  - `mousedown`
  - `mouseup`
  - `click`
  - `dblclick`

  The exact listing of events that are triggered may change over time as needed
  to continue to emulate how actual browsers handle clicking a given element.

  Use the `options` hash to change the parameters of the [MouseEvents](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent).

  @public
  @param {string|Element} target the element or selector to double-click on
  @param {Object} options the options to be merged into the mouse events
  @return {Promise<void>} resolves when settled

  @example
  <caption>
    Emulating double clicking a button using `doubleClick`
  </caption>

  doubleClick('button');

  @example
  <caption>
    Emulating double clicking a button and pressing the `shift` key simultaneously using `click` with `options`.
  </caption>

  doubleClick('button', { shiftKey: true });
*/
export default function doubleClick(target, options = {}) {
    return nextTickPromise().then(() => {
        if (!target) {
            throw new Error('Must pass an element or selector to `doubleClick`.');
        }
        let element = getElement(target);
        if (!element) {
            throw new Error(`Element not found when calling \`doubleClick('${target}')\`.`);
        }
        __doubleClick__(element, options);
        return settled();
    });
}
