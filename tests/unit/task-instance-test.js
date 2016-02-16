import Ember from 'ember';
import TaskInstance from 'ember-concurrency/-task-instance';
import { timeout, _numIntervals } from 'ember-concurrency';

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
    })._start();
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
    })._start();
  });

  Ember.run(null, defer.resolve, 123);
});

function expectCancelation(promise) {
  promise.then(() => {
    QUnit.ok(false, "promise should have rejected");
  }, e => {
    QUnit.equal(e.name, 'TaskCancelation', "promise rejection is a cancelation");
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
    })._start();
  });

  expectCancelation(taskInstance);

  Ember.run(() => {
    assert.ok(!taskInstance.get('isCanceled'));

    // this resolve should be ignored since it's within the same
    // tick as a cancel.
    defer0.resolve();
    taskInstance.cancel();
    assert.ok(!taskInstance.get('isFinished'));
    assert.ok(taskInstance.get('isCanceled'));
  });

  Ember.run(null, defer1.resolve, 123);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(!taskInstance.get('isFinished'));
  Ember.run(null, defer2.resolve, 456);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(taskInstance.get('isFinished'));
});

test("deferred start", function(assert) {
  assert.expect(4);

  let shouldBeRunning = false;
  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * (...args) {
        assert.ok(shouldBeRunning);
        assert.deepEqual(args, [1,2,3]);
      },
      args: [1,2,3],
    });
  });

  assert.ok(!taskInstance.get('hasStarted'));
  Ember.run(() => {
    shouldBeRunning = true;
    taskInstance._start();
  });
  assert.ok(taskInstance.get('hasStarted'));
});

test("deferred start: .cancel() before ._start()", function(assert) {
  assert.expect(3);

  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        assert.ok(false, "should not get here");
      },
      args: [],
    });
  });

  expectCancelation(taskInstance);

  Ember.run(() => {
    taskInstance.cancel();
    taskInstance._start();
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
    })._start().then(v => {
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
    })._start();
    taskInstance.catch(e => { caughtError = e; });
  });

  assert.ok(!caughtError);
  assert.ok(!taskInstance.get('isFinished'));
  Ember.run(null, defer0.resolve, 123);
  assert.ok(!taskInstance.get('isFinished'));
  Ember.run(null, defer1.resolve, 456);
  assert.equal(caughtError.message, "wat");
  assert.ok(taskInstance.get('isFinished'));
});

test("yielded disposables are disposed upon cancellation", function(assert) {
  QUnit.stop();
  assert.expect(3);

  assert.equal(_numIntervals, 0);
  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        yield timeout(50);
        yield timeout(50);
        Ember.run.next(() => {
          assert.equal(_numIntervals, 0);
          QUnit.start();
        });
      },
      args: [],
    })._start();
  });
  assert.equal(_numIntervals, 1);
});

test("unhandled yielded rejections bubble", function(assert) {
  assert.expect(1);
  try {
    Ember.run(() => {
      TaskInstance.create({
        fn: function * () {
          yield Ember.RSVP.reject("wat");
        },
        args: [],
      })._start();
    });
  } catch(e) {
    assert.equal(e, "wat");
  }
});

test("unhandled thrown exceptions bubble", function(assert) {
  assert.expect(1);
  try {
    Ember.run(() => {
      TaskInstance.create({
        fn: function * () {
          throw "wat";
        },
        args: [],
      })._start();
    });
  } catch(e) {
    assert.equal(e, "wat");
  }
});


