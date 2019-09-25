import getElement from './-get-element';
import fireEvent from './fire-event';
import { __click__ } from './click';
import settled from '../settled';
import { nextTickPromise } from '../-utils';
/**
  Taps on the specified target.

  Sends a number of events intending to simulate a "real" user tapping on an
  element.

  For non-focusable elements the following events are triggered (in order):

  - `touchstart`
  - `touchend`
  - `mousedown`
  - `mouseup`
  - `click`

  For focusable (e.g. form control) elements the following events are triggered
  (in order):

  - `touchstart`
  - `touchend`
  - `mousedown`
  - `focus`
  - `focusin`
  - `mouseup`
  - `click`

  The exact listing of events that are triggered may change over time as needed
  to continue to emulate how actual browsers handle tapping on a given element.

  Use the `options` hash to change the parameters of the tap events.

  @public
  @param {string|Element} target the element or selector to tap on
  @param {Object} options the options to be merged into the touch events
  @return {Promise<void>} resolves when settled

  @example
  <caption>
    Emulating tapping a button using `tap`
  </caption>

  tap('button');
*/
export default function tap(target, options = {}) {
    return nextTickPromise().then(() => {
        if (!target) {
            throw new Error('Must pass an element or selector to `tap`.');
        }
        let element = getElement(target);
        if (!element) {
            throw new Error(`Element not found when calling \`tap('${target}')\`.`);
        }
        let touchstartEv = fireEvent(element, 'touchstart', options);
        let touchendEv = fireEvent(element, 'touchend', options);
        if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
            __click__(element, options);
        }
        return settled();
    });
}
