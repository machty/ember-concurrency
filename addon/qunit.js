import Ember from 'ember';
import { test as qunitTest } from 'qunit';
import QUnit from 'qunit';
import { wrap, go } from 'ember-concurrency/-task-instance';
import {
  raw,
  rawTimeout
} from 'ember-concurrency/utils';

const { $ } = Ember;

const find = wrap(function * (app, selector, options = {}) {
  let startedAt = + new Date();
  let timeoutMs = options.timeout;
  let count = typeof options.count === 'undefined' ? 1 : options.count;

  let settled = false;
  app.testHelpers.wait().then(() => {
    settled = true;
  });

  while(true) {
    let $el = $(selector);

    if ($el.length === count) {
      return raw($el);
    } else {
      if (timeoutMs) {
        let now = + new Date();
        if (now - startedAt > timeoutMs) {
          throw new Error(`Tried to find ${count} occurrence(s) of "${selector}" within ${timeoutMs}ms, instead found ${$el.length}`);
        }
      } else {
        if (settled) {
          throw new Error(`Tried to find ${count} occurrence(s) of "${selector}" before test waiters settled, instead found ${$el.length}`);
        }
      }

      yield rawTimeout(15);
    }
  }
});

const HELPER_METHODS = {
  find(...args) {
    return find(this.application, ...args);
  },
  visit(...args) {
    this.application.testHelpers.visit(...args);
  },
  click: wrap(function * (selector) {
    yield find(this.application, selector);
    this.application.testHelpers.click(selector);
  }),
};

function test(description, fn) {
  qunitTest(description, function(assert) {
    Object.assign(this, HELPER_METHODS);
    QUnit.config.current._isTaskTest = true;
    let done = assert.async();
    if (fn.constructor.name === 'GeneratorFunction') {

      go([assert], fn, {
        _runLoop: false,
        context: this,
      }).finally(done);
    } else {
      Ember.RSVP.resolve(fn.call(this, assert)).finally(done);
    }
  });
}

export {
  test
};

