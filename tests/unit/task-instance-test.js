import Ember from 'ember';
import TaskInstance from 'ember-concurrency/-task-instance';
import { createObservable } from 'ember-concurrency/utils';
import { Cancelation } from 'ember-concurrency';

module('Unit: task instance');

test("basics", function(assert) {
  assert.expect(2);

  let context = {};
  Ember.run(() => {
    TaskInstance.create({
      fn: function * (...args) {
        assert.equal(this, context, "generator functions' `this` is the context passed in");
        assert.deepEqual(args, [1,2,3]);
      },
      args: [1,2,3],
      context,
    });
  });
});

test("blocks on async yields", function(assert) {
  assert.expect(1);

  let defer;
  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        defer = Ember.RSVP.defer();
        let value = yield defer.promise;
        assert.equal(value, 123);
      },
      args: [],
    });
  });

  Ember.run(null, defer.resolve, 123);
});

function expectReject(promise, type) {
  promise.then(() => {
    QUnit.ok(false, "promise should have rejected");
  }, e => {
    QUnit.ok(e instanceof type, "promise rejected with expected type");
  });
}

test("cancelation", function(assert) {
  assert.expect(10);

  let defer0, defer1, defer2;
  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        try {
          defer0 = Ember.RSVP.defer();
          yield defer0.promise;
          assert.ok(false, "should not get here");
        } finally {
          defer1 = Ember.RSVP.defer();
          let result = yield defer1.promise;
          assert.equal(result, 123);
          defer2 = Ember.RSVP.defer();
          result = yield defer2.promise;
          assert.equal(result, 456);
        }
      },
      args: [],
    });
  });

  expectReject(taskInstance, Cancelation);

  Ember.run(() => {
    assert.ok(!taskInstance.get('isCanceled'));

    // this resolve should be ignored since it's within the same
    // tick as a cancel.
    defer0.resolve();
    taskInstance.cancel();
    assert.ok(!taskInstance.get('isIdle'));
    assert.ok(taskInstance.get('isCanceled'));
  });

  Ember.run(null, defer1.resolve, 123);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(!taskInstance.get('isIdle'));
  Ember.run(null, defer2.resolve, 456);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(taskInstance.get('isIdle'));
});

test("deferred start", function(assert) {
  assert.expect(4);

  let shouldBeRunning = false;
  let defer = Ember.RSVP.defer();
  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * (...args) {
        assert.ok(shouldBeRunning);
        assert.deepEqual(args, [1,2,3]);
      },
      args: [1,2,3],
      startAfter: defer.promise
    });
  });

  assert.ok(!taskInstance.get('hasStarted'));
  Ember.run(() => {
    shouldBeRunning = true;
    defer.resolve();
  });
  assert.ok(taskInstance.get('hasStarted'));
});

test("deferred start: canceled via reject", function(assert) {
  assert.expect(1);

  let defer = Ember.RSVP.defer();
  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        assert.ok(false, "should not get here");
      },
      args: [1,2,3],
      startAfter: defer.promise
    });
  });

  taskInstance.catch(e => {
    assert.ok(e instanceof Cancelation, "caught error");
  });

  Ember.run(null, defer.reject);
});

test("deferred start: canceled via .cancel()", function(assert) {
  assert.expect(3);

  let defer = Ember.RSVP.defer();
  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        assert.ok(false, "should not get here");
      },
      args: [],
      startAfter: defer.promise
    });
  });

  expectReject(taskInstance, Cancelation);

  Ember.run(() => {
    taskInstance.cancel();
    defer.resolve();
  });
  assert.ok(!taskInstance.get('hasStarted'));
  assert.ok(taskInstance.get('isCanceled'));
});

test(".then() resolves with the returned value", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        return 123;
      },
      args: [],
    }).then(v => {
      assert.equal(v, 123);
    });
  });
});

test("exception handling", function(assert) {
  assert.expect(7);

  let defer0, defer1;
  let taskInstance;
  let caughtError;
  Ember.run(() => {
    taskInstance = TaskInstance.create({
      fn: function * () {
        try {
          throw new Error("wat");
        } finally {
          defer0 = Ember.RSVP.defer();
          let val = yield defer0.promise;
          assert.equal(val, 123);
          defer1 = Ember.RSVP.defer();
          val = yield defer1.promise;
          assert.equal(val, 456);
        }
      },
      args: [],
    });
    taskInstance.catch(e => { caughtError = e; });
  });

  assert.ok(!caughtError);
  assert.ok(!taskInstance.get('isIdle'));
  Ember.run(null, defer0.resolve, 123);
  assert.ok(!taskInstance.get('isIdle'));
  Ember.run(null, defer1.resolve, 456);
  assert.equal(caughtError.message, "wat");
  assert.ok(taskInstance.get('isIdle'));
});






