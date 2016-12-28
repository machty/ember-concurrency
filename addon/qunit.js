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
  let count = options.count || 1;

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
    //debugger;
    this.application.testHelpers.visit(...args);
  },
};

function test(description, generatorFn) {
  qunitTest(description, function(assert) {
    QUnit.config.current._isTaskTest = true;
    let done = assert.async();

    Object.assign(this, HELPER_METHODS);

    go([assert], generatorFn, {
      _runLoop: false,
      context: this,
    }).finally(done);
  });
}

export {
  test
};

