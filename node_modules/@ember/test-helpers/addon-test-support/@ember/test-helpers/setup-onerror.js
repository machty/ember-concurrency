import Ember from 'ember';
const ORIGINAL_EMBER_ONERROR = Ember.onerror;
/**
 * Sets the `Ember.onerror` function for tests. This value is intended to be reset after
 * each test to ensure correct test isolation. To reset, you should simply call `setupOnerror`
 * without an `onError` argument.
 *
 * @public
 * @param {Function} onError the onError function to be set on Ember.onerror
 *
 * @example <caption>Example implementation for `ember-qunit` or `ember-mocha`</caption>
 *
 * import { setupOnerror } from '@ember/test-helpers';
 *
 * test('Ember.onerror is stubbed properly', function(assert) {
 *   setupOnerror(function(err) {
 *     assert.ok(err);
 *   });
 * });
 */
export default function setupOnerror(onError) {
    if (typeof onError !== 'function') {
        onError = ORIGINAL_EMBER_ONERROR;
    }
    Ember.onerror = onError;
}
/**
 * Resets `Ember.onerror` to the value it originally was at the start of the test run.
 *
 * @public
 *
 * @example
 *
 * import { resetOnerror } from '@ember/test-helpers';
 *
 * QUnit.testDone(function() {
 *   resetOnerror();
 * })
 */
export const resetOnerror = setupOnerror;
