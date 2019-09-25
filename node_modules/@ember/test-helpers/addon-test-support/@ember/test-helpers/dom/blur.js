import getElement from './-get-element';
import fireEvent from './fire-event';
import settled from '../settled';
import isFocusable from './-is-focusable';
import { nextTickPromise } from '../-utils';
/**
  @private
  @param {Element} element the element to trigger events on
*/
export function __blur__(element) {
    let browserIsNotFocused = document.hasFocus && !document.hasFocus();
    // makes `document.activeElement` be `body`.
    // If the browser is focused, it also fires a blur event
    element.blur();
    // Chrome/Firefox does not trigger the `blur` event if the window
    // does not have focus. If the document does not have focus then
    // fire `blur` event via native event.
    if (browserIsNotFocused) {
        fireEvent(element, 'blur', { bubbles: false });
        fireEvent(element, 'focusout');
    }
}
/**
  Unfocus the specified target.

  Sends a number of events intending to simulate a "real" user unfocusing an
  element.

  The following events are triggered (in order):

  - `blur`
  - `focusout`

  The exact listing of events that are triggered may change over time as needed
  to continue to emulate how actual browsers handle unfocusing a given element.

  @public
  @param {string|Element} [target=document.activeElement] the element or selector to unfocus
  @return {Promise<void>} resolves when settled

  @example
  <caption>
    Emulating blurring an input using `blur`
  </caption>

  blur('input');
*/
export default function blur(target = document.activeElement) {
    return nextTickPromise().then(() => {
        let element = getElement(target);
        if (!element) {
            throw new Error(`Element not found when calling \`blur('${target}')\`.`);
        }
        if (!isFocusable(element)) {
            throw new Error(`${target} is not focusable`);
        }
        __blur__(element);
        return settled();
    });
}
