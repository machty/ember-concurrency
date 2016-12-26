import Ember from 'ember';
import { timeout } from 'ember-concurrency';
import { test } from 'ember-concurrency/qunit';
import { module } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW,
} from 'ember-concurrency/utils';

const { $ } = Ember;

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
      if (now - startedAt > 5000) {
        taskInstance.proceed(resumeIndex, YIELDABLE_THROW, new Error(`Couldn't find selector "${selector}" after ${timeout}ms`));
      } else {
        setTimeout(keepTrying, 20);
      }
    }
  };

  keepTrying();
};

module('ember-concurrency testing utilities');

test('sync tests work', function * (assert) {
  assert.expect(1);
  assert.ok(true);
});

test('async tests work', function * (assert) {
  assert.expect(1);
  yield timeout(100);
  assert.ok(true);
});

test('tests run outside of run loops', function * (assert) {
  assert.expect(2);
  assert.ok(!Ember.run.currentRunLoop);
  yield timeout(100);
  assert.ok(!Ember.run.currentRunLoop);
});

let originalAssert = Ember.assert;
moduleForAcceptance('ember-concurrency testing utilities (acceptance)', {
  afterEach() {
    Ember.assert = originalAssert;
  }
});

test('yielding selectors will wait for them to exist', function * (assert) {
  visit('/testing-ergo/foo');

  let $sel = $(`.eventual-button:contains('Eventual Button')`);
  assert.equal($sel.length, 0);
  let $loadedSel = yield $sel;
  assert.equal($loadedSel.length, 1);
});

