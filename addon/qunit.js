import Ember from 'ember';
import { test as qunitTest } from 'qunit';
import QUnit from 'qunit';
import TaskInstance from 'ember-concurrency/-task-instance';
import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW,
} from 'ember-concurrency/utils';

const { $ } = Ember;

function injectJQueryYieldables() {
  const ELEMENT_MATCHER_TIMEOUT = 5000;

  $.fn[yieldableSymbol] = function(taskInstance, resumeIndex) {
    let startedAt = + new Date();
    let selector = this.selector;
    let timeout = ELEMENT_MATCHER_TIMEOUT;
    let keepTrying = () => {
      let $el = $(selector);
      if ($el.length) {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, $el);
      } else {
        let now = + new Date();
        if (now - startedAt > ELEMENT_MATCHER_TIMEOUT) {
          taskInstance.proceed(resumeIndex, YIELDABLE_THROW, new Error(`Couldn't find selector "${selector}" after ${timeout}ms`));
        } else {
          setTimeout(keepTrying, 20);
        }
      }
    };

    keepTrying();
  };
}

injectJQueryYieldables();

function test(description, generatorFn) {
  qunitTest(description, function(assert) {
    QUnit.config.current._isTaskTest = true;
    let done = assert.async();
    TaskInstance.create({
      _runLoop: false,
      fn: generatorFn,
      args: [assert],
      context: this,
    })._start().finally(done);
  });
}

export {
  test
};

