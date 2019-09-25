import Ember from 'ember';
import QUnit from 'qunit';
import { checkMatcher } from '../-private/utils';


export default function() {
  let deprecations;

  QUnit.testStart(function() {
    deprecations = [];
  });

  Ember.Debug.registerDeprecationHandler(function(message, options, next) {
    // It's possible for deprecations to trigger before the test has started.
    if (deprecations) {
      deprecations.push({ message, options });
    }
    next(message, options);
  });

  function assertDeprecations(qunitAssert, matcher) {
    let matchedDeprecations = deprecations.filter(deprecation => {
      return checkMatcher(deprecation.message, matcher);
    });
    qunitAssert.pushResult({
      result: matchedDeprecations.length !== 0,
      actual: matchedDeprecations,
      expected: null,
      message: 'Expected deprecations during test, but no deprecations were found.'
    });
  }

  function assertNoDeprecations(qunitAssert) {
    let deprecationStr = deprecations.reduce((a, b) => {
      return `${b}${a.message}\n`;
    }, '');

    qunitAssert.pushResult({
      result: deprecations.length === 0,
      actual: deprecations,
      expected: [],
      message: `Expected no deprecations during test, but deprecations were found.\n${deprecationStr}`
    });
  }

  QUnit.assert.expectDeprecation = function(cb, matcher) {
    let origDeprecations = deprecations;

    if (typeof cb !== 'function') {
      matcher = cb;
      cb = null;
    }

    if (cb) {
      deprecations = [];
      cb();
    }

    assertDeprecations(this, matcher);
    deprecations = origDeprecations;
  };

  QUnit.assert.expectNoDeprecation = function(cb) {
    let origDeprecations = deprecations;

    if (cb) {
      deprecations = [];
      cb();
    }

    assertNoDeprecations(this);
    deprecations = origDeprecations;
  };
}
