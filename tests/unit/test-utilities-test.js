import Ember from 'ember';
import { timeout } from 'ember-concurrency';
import { module, test } from 'ember-concurrency/qunit';

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

