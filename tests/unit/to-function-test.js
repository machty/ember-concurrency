import { run } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: toFunction');

test("basic", function(assert) {
  assert.expect(1);

  let value;
  run(() => {
    let fn = task(function * () {
      return 123;
    }).toFunction();

    fn().then((v) => {
      value = v;
    });
  });

  assert.equal(value, 123);
});

test("falsy contexts share concurrency context", function(assert) {
  assert.expect(3);

  let t0, t1;
  run(() => {
    let fn = task(function * () {
      'use strict';
      assert.ok(!this);
      yield timeout(5000);
    }).restartable().toFunction();

    t0 = fn();
    t1 = fn();
  });

  assert.equal(t0.get('isRunning'), false);
  assert.equal(t1.get('isRunning'), true);
  run(t1, 'cancel');
});

test("invocations with different contexts have different concurrency contexts", function(assert) {
  assert.expect(5);

  function Klass() {}

  Klass.prototype.bar = 5;
  Klass.prototype.foo = task(function * () {
    assert.equal(this.bar, 5);
    yield timeout(5000);
  }).restartable().toFunction();

  let k0, k1, t0, t1, t2;
  run(() => {
    k0 = new Klass();
    t0 = k0.foo();
    t1 = k0.foo();
    k1 = new Klass();
    t2 = k1.foo();
  });

  assert.equal(t0.get('isRunning'), false);
  assert.equal(t1.get('isRunning'), true);
  assert.equal(t2.get('isRunning'), true);
  run(t2, 'cancel');
  run(t1, 'cancel');
});

test("toFunction works with encapsulated tasks", function(assert) {
  assert.expect(1);

  let fn = task({
    foo: 123,
    perform: function * () {
      assert.equal(this.foo, 123);
    },
  }).restartable().toFunction();

  Ember.run(() => {
    fn();
  });
});

