import Ember from 'ember';
import QUnit from 'qunit';
import { QUnitAdapter } from 'ember-qunit';
import { checkMatcher } from '../-private/utils';


let TestAdapter = QUnitAdapter.extend({
  exception(error) {
    this.lastError = error;
  }
});

let noop = () => {};

export default function() {
  let isProductionBuild = (function() {
    try {
      Ember.assert('fails in debug builds');
    } catch(e) {
      return false;
    }

    return true;
  })();

  QUnit.assert.expectAssertion = function(cb, matcher) {
    // Save off the original adapter and replace it with a test one.
    let origTestAdapter = Ember.Test.adapter;
    let origLoggerError = Ember.Logger.error;
    Ember.run(() => {
      Ember.Test.adapter = TestAdapter.create();
      Ember.Logger.error = noop;
    });

    let error = null;
    try {
      cb();
    } catch (e) {
      error = e;
    } finally {
      error = error || Ember.Test.adapter.lastError;
    }

    let isEmberError = error instanceof Ember.Error;
    let matches = Boolean(isEmberError && checkMatcher(error.message, matcher));

    if (isProductionBuild) {
      this.pushResult({
        result: true,
        actual: null,
        expected: null,
        message: 'Assertions are disabled in production builds.'
      });
    } else {
      this.pushResult({
        result: isEmberError && matches,
        actual: error && error.message,
        expected: matcher,
        message: matcher ? 'Ember.assert matched specific message' : 'Ember.assert called with any message'
      });
    }

    // Cleanup the test adapter and restore the original.
    Ember.run(() => {
      Ember.Test.adapter.destroy();
      Ember.Test.adapter = origTestAdapter;
      Ember.Logger.error = origLoggerError;
    });
  };
}
