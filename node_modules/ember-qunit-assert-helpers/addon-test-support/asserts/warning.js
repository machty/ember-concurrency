import Ember from 'ember';
import QUnit from 'qunit';
import { checkMatcher } from '../-private/utils';


export default function() {
  let warnings;

  QUnit.testStart(function() {
    warnings = [];
  });

  Ember.Debug.registerWarnHandler(function(message, options, next) {
    // It's possible for warnings to trigger before the test has started.
    if (warnings) {
      warnings.push({ message, options });
    }
    next(message, options);
  });

  function assertWarnings(qunitAssert, matcher) {
    let matchedWarnings = warnings.filter(warning => {
      return checkMatcher(warning.message, matcher);
    });
    qunitAssert.pushResult({
      result: matchedWarnings.length !== 0,
      actual: matchedWarnings,
      expected: null,
      message: 'Expected warnings during test, but no warnings were found.'
    });
  }

  function assertNoWarnings(qunitAssert) {
    let warningStr = warnings.reduce((a, b) => {
      return `${b}${a.message}\n`;
    }, '');

    qunitAssert.pushResult({
      result: warnings.length === 0,
      actual: warnings,
      expected: [],
      message: `Expected no warnings during test, but warnings were found.\n${warningStr}`
    });
  }

  QUnit.assert.expectWarning = function(cb, matcher) {
    let originalWarnings = warnings;

    if (typeof cb !== 'function') {
      matcher = cb;
      cb = null;
    }

    if (cb) {
      warnings = [];
      cb();
    }

    assertWarnings(this, matcher);
    warnings = originalWarnings;
  };

  QUnit.assert.expectNoWarning = function(cb) {
    let originalWarnings = warnings;

    if (cb) {
      warnings = [];
      cb();
    }

    assertNoWarnings(this);
    warnings = originalWarnings;
  };
}
