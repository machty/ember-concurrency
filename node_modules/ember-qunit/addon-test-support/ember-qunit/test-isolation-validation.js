/* eslint-disable no-console */
import QUnit from 'qunit';
import { run } from '@ember/runloop';
import { waitUntil, isSettled, getSettledState } from '@ember/test-helpers';
import { getDebugInfo } from '@ember/test-helpers';

/**
 * Detects if a specific test isn't isolated. A test is considered
 * not isolated if it:
 *
 * - has pending timers
 * - is in a runloop
 * - has pending AJAX requests
 * - has pending test waiters
 *
 * @function detectIfTestNotIsolated
 * @param {Object} testInfo
 * @param {string} testInfo.module The name of the test module
 * @param {string} testInfo.name The test name
 */
export function detectIfTestNotIsolated(test, message = '') {
  if (!isSettled()) {
    let { debugInfo } = getSettledState();

    console.group(`${test.module.name}: ${test.testName}`);
    debugInfo.toConsole();
    console.groupEnd();

    test.expected++;
    test.assert.pushResult({
      result: false,
      message: `${message} \nMore information has been printed to the console. Please use that information to help in debugging.\n\n`,
    });
  }
}

/**
 * Installs a hook to detect if a specific test isn't isolated.
 * This hook is installed by patching into the `test.finish` method,
 * which allows us to be very precise as to when the detection occurs.
 *
 * @function installTestNotIsolatedHook
 * @param {number} delay the delay delay to use when checking for isolation validation
 */
export function installTestNotIsolatedHook(delay = 50) {
  if (!getDebugInfo()) {
    return;
  }

  let test = QUnit.config.current;
  let finish = test.finish;
  let pushFailure = test.pushFailure;

  test.pushFailure = function(message) {
    if (message.indexOf('Test took longer than') === 0) {
      detectIfTestNotIsolated(this, message);
    } else {
      return pushFailure.apply(this, arguments);
    }
  };

  // We're hooking into `test.finish`, which utilizes internal ordering of
  // when a test's hooks are invoked. We do this mainly becuase we need
  // greater precision as to when to detect and subsequently report if the
  // test is isolated.
  //
  // We looked at using:
  // - `afterEach`
  //    - the ordering of when the `afterEach` is called is not easy to guarantee
  //      (ancestor `afterEach`es have to be accounted for too)
  // - `QUnit.on('testEnd')`
  //    - is executed too late; the test is already considered done so
  //      we're unable to push a new assert to fail the current test
  // - 'QUnit.done'
  //    - it detatches the failure from the actual test that failed, making it
  //      more confusing to the end user.
  test.finish = function() {
    let doFinish = () => finish.apply(this, arguments);

    if (isSettled()) {
      return doFinish();
    } else {
      return waitUntil(isSettled, { timeout: delay })
        .catch(() => {
          // we consider that when waitUntil times out, you're in a state of
          // test isolation violation. The nature of the error is irrelevant
          // in this case, and we want to allow the error to fall through
          // to the finally, where cleanup occurs.
        })
        .finally(() => {
          detectIfTestNotIsolated(
            this,
            'Test is not isolated (async execution is extending beyond the duration of the test).'
          );

          // canceling timers here isn't perfect, but is as good as we can do
          // to attempt to prevent future tests from failing due to this test's
          // leakage
          run.cancelTimers();

          return doFinish();
        });
    }
  };
}
