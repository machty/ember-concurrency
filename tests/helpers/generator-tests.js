import { resolve } from 'rsvp';
import $ from 'jquery';
import { test as qunitTest } from 'ember-qunit';
import { wrap, go } from 'ember-concurrency/-task-instance';
import { run } from "@ember/runloop";
import { visit, click, settled } from '@ember/test-helpers';
import {
  raw,
  rawTimeout
} from 'ember-concurrency/utils';

const find = wrap(function * (app, selector, options = {}) {
  let startedAt = + new Date();
  let timeoutMs = options.timeout;
  let count = typeof options.count === 'undefined' ? 1 : options.count;

  let isSettled = false;
  settled().then(() => {
    isSettled = true;
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
        if (isSettled) {
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
    return visit(...args);
  },
  click: wrap(function * (selector) {
    yield find(this.application, selector);
    return click(selector);
  }),
};

function test(description, fn) {
  qunitTest(description, function(assert) {
    Object.assign(this, HELPER_METHODS);
    window.QUnit.config.current._isTaskTest = true;
    let qunitDone = assert.async();
    let done = () => {
      run.backburner.cancelTimers();
      qunitDone();
    };
    if (fn.constructor.name === 'GeneratorFunction') {
      go([assert], fn, {
        _runLoop: false,
        context: this,
      }).finally(done);
    } else {
      resolve(fn.call(this, assert)).finally(done);
    }
  });
}

export {
  test
};
