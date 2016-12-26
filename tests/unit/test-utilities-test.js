import Ember from 'ember';
import { timeout } from 'ember-concurrency';
import { test } from 'ember-concurrency/qunit';
import { module } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const { $ } = Ember;

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

test('yielding a selector waits for it to exist', function * (assert) {
  assert.expect(2);
  visit('/testing-ergo/foo');

  let $sel = $(`.eventual-button:contains('Eventual Button')`);
  assert.equal($sel.length, 0);
  let $loadedSel = yield $sel;
  assert.equal($loadedSel.length, 1);
});

test('it is easy to test loading routes by yielding selectors rather than awaiting "settledness"', function * (assert) {
  assert.expect(2);
  visit('/testing-ergo/slow');

  let $loadingBanner = yield $('.loading-message');
  assert.equal($loadingBanner.text(), "I am a loading route.");

  let $slowBanner = yield $('.slow-banner');
  assert.equal($slowBanner.text(), "Welcome to slow route.");
});

test('it is easy to test timer loops', function * (assert) {
  assert.expect(0);
  visit('/testing-ergo/timer-loop');
  yield $(`.timer-loop-message:contains('foo=5')`);
});

