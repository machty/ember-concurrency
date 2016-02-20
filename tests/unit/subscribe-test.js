import Ember from 'ember';
import { task, subscribe } from 'ember-concurrency';

module('Unit: subscribe');

const Observable = window.Rx.Observable;

let oneTwoThree = Observable.range(1,3);

test("subscribe() loops over observables", function(assert) {
  assert.expect(4);

  let arr = [];
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      let self = this;
      yield subscribe(oneTwoThree, function * (v) {
        assert.equal(this, self);
        arr.push(v);
      });
    }).on('init'),
  });

  Ember.run(() => {
    Obj.create();
  });

  assert.deepEqual(arr, [1,2,3]);
});

test("subscribe() has default unbounded concurrency", function(assert) {
  assert.expect(4);

  let defer;
  let innerTask;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      innerTask = subscribe(oneTwoThree, function * () {
        defer = defer || Ember.RSVP.defer();
        yield defer.promise;
      });
      yield innerTask;
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  assert.equal(innerTask.get('concurrency'), 3);
  assert.equal(obj.get('foo.concurrency'), 1);
  Ember.run(null, defer.resolve);
  assert.equal(innerTask.get('concurrency'), 0);
  assert.equal(obj.get('foo.concurrency'), 0);
});

test("subscribe().enqueue()", function(assert) {
  assert.expect(8);

  let defer;
  let innerTask;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      innerTask = subscribe(oneTwoThree, function * () {
        defer = Ember.RSVP.defer();
        yield defer.promise;
      }).enqueue();
      yield innerTask;
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  let n = 3;
  while (n--) {
    assert.equal(innerTask.get('concurrency'), 1);
    assert.equal(obj.get('foo.concurrency'), 1);
    Ember.run(null, defer.resolve);
  }
  assert.equal(innerTask.get('concurrency'), 0, "the inner task is no longer running");
  assert.equal(obj.get('foo.concurrency'), 0, "the outer foo task has run to completion");
});

test("subscribe().drop()", function(assert) {
  assert.expect(6);

  let defer;
  let innerTask;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      innerTask = subscribe(oneTwoThree, function * (v) {
        assert.equal(v, 1);
        assert.ok(!defer);
        defer = Ember.RSVP.defer();
        yield defer.promise;
      }).drop();
      yield innerTask;
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  assert.equal(innerTask.get('concurrency'), 1);
  assert.equal(obj.get('foo.concurrency'), 1);
  Ember.run(null, defer.resolve);
  assert.equal(innerTask.get('concurrency'), 0);
  assert.equal(obj.get('foo.concurrency'), 0);
});

test("subscribe() within subscribe()", function(assert) {
  assert.expect(11);

  let values = [];
  let defer;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      yield subscribe(oneTwoThree, function * (v) {
        yield subscribe(Observable.range(v*10, 3), function * (v) {
          values.push(v);
          defer = Ember.RSVP.defer();
          yield defer.promise;
        }).enqueue();
      }).enqueue();
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  let num = 9;
  while (num--) {
    assert.equal(obj.get('foo.concurrency'), 1);
    Ember.run(null, defer.resolve);
  }
  assert.equal(obj.get('foo.concurrency'), 0);
  assert.deepEqual(values, [10, 11, 12, 20, 21, 22, 30, 31, 32]);
});

test("subscribe() within subscribe() with inner drop", function(assert) {
  assert.expect(5);

  let values = [];
  let defer;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      yield subscribe(oneTwoThree, function * (v) {
        yield subscribe(Observable.range(v*10, 3), function * (v) {
          values.push(v);
          defer = Ember.RSVP.defer();
          yield defer.promise;
        }).enqueue();
      }).drop();
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  let num = 3;
  while (num--) {
    assert.equal(obj.get('foo.concurrency'), 1);
    Ember.run(null, defer.resolve);
  }
  assert.equal(obj.get('foo.concurrency'), 0);
  assert.deepEqual(values, [10, 11, 12]);
});

test("subscribe() can be passed a Task to run", function(assert) {
  assert.expect(11);

  let values = [];
  let defer;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      yield subscribe(oneTwoThree, function * (v) {
        yield subscribe(Observable.range(v*10, 3), this.get('handleEvent'));
      }).enqueue();
    }).on('init'),

    handleEvent: task(function * (v) {
      values.push(v);
      defer = Ember.RSVP.defer();
      yield defer.promise;
    }).enqueue(),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  let num = 9;
  while (num--) {
    assert.equal(obj.get('foo.concurrency'), 1);
    Ember.run(null, defer.resolve);
  }
  assert.equal(obj.get('foo.concurrency'), 0);
  assert.deepEqual(values, [10, 11, 12, 20, 21, 22, 30, 31, 32]);
});



