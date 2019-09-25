export { _setupAJAXHooks, _teardownAJAXHooks } from '@ember/test-helpers/settled';

import { waitUntil, getSettledState } from '@ember/test-helpers';

/**
  Returns a promise that resolves when in a settled state (see `isSettled` for
  a definition of "settled state").

  @private
  @deprecated
  @param {Object} [options={}] the options to be used for waiting
  @param {boolean} [options.waitForTimers=true] should timers be waited upon
  @param {boolean} [options.waitForAjax=true] should $.ajax requests be waited upon
  @param {boolean} [options.waitForWaiters=true] should test waiters be waited upon
  @returns {Promise<void>} resolves when settled
*/
export default function wait(options = {}) {
  if (typeof options !== 'object' || options === null) {
    options = {};
  }

  return waitUntil(
    () => {
      let waitForTimers = 'waitForTimers' in options ? options.waitForTimers : true;
      let waitForAJAX = 'waitForAJAX' in options ? options.waitForAJAX : true;
      let waitForWaiters = 'waitForWaiters' in options ? options.waitForWaiters : true;

      let {
        hasPendingTimers,
        hasRunLoop,
        hasPendingRequests,
        hasPendingWaiters,
      } = getSettledState();

      if (waitForTimers && (hasPendingTimers || hasRunLoop)) {
        return false;
      }

      if (waitForAJAX && hasPendingRequests) {
        return false;
      }

      if (waitForWaiters && hasPendingWaiters) {
        return false;
      }

      return true;
    },
    { timeout: Infinity }
  );
}
