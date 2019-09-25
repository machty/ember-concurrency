import { nextTickPromise } from './-utils';
import settled from './settled';
/**
  Used by test framework addons to tear down the provided context after testing is completed.

  @public
  @param {Object} context the context to setup
  @param {Object} [options] options used to override defaults
  @param {boolean} [options.waitForSettled=true] should the teardown wait for `settled()`ness
  @returns {Promise<void>} resolves when settled
*/
export default function (context, options) {
    let waitForSettled = true;
    if (options !== undefined && 'waitForSettled' in options) {
        waitForSettled = options.waitForSettled;
    }
    if (waitForSettled) {
        return settled();
    }
    return nextTickPromise();
}
