import Ember from 'ember';
import { test as qunitTest } from 'qunit';
import QUnit from 'qunit';
import { wrap, go } from 'ember-concurrency/-task-instance';
import { race } from 'ember-concurrency/-yieldables';
import {
  yieldableSymbol,
  raw,
  rawTimeout
} from 'ember-concurrency/utils';

const { $ } = Ember;

const find = wrap(function * (selector, options = {}) {
  let startedAt = + new Date();
  let timeoutMs = options.timeout;

  let settled = false;
  wait().then(() => {
    settled = true;
  });

  while(true) {
    let $el = $(selector);

    if ($el.length) {
      return raw($el);
    } else {
      if (timeoutMs) {
        let now = + new Date();
        if (now - startedAt > timeoutMs) {
          throw new Error(`Couldn't find selector "${selector}" after ${timeoutMs}ms`);
        }
      } else {
        if (settled) {
          throw new Error(`Couldn't find selector "${selector}", and all test waiters have settled.`);
        }
      }

      yield rawTimeout(15);
    }
  }
});

function injectJQueryYieldables() {
  $.fn[yieldableSymbol] = function(...args) {
    return find(this.selector)[yieldableSymbol](...args);
  };
}

injectJQueryYieldables();

function test(description, generatorFn) {
  qunitTest(description, function(assert) {
    QUnit.config.current._isTaskTest = true;
    let done = assert.async();

    go([assert], generatorFn, {
      _runLoop: false,
      context: this,
    }).finally(done);
  });
}

export {
  test,
  find
};

