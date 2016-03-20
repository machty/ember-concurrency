import Ember from 'ember';
import TaskInstance from 'ember-concurrency/-task-instance';

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
    assert.ok(taskInstance.get('isFinished'));
    assert.ok(taskInstance.get('isCanceled'));
  });

  Ember.run(null, defer1.resolve, 123);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(taskInstance.get('isFinished'));
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

test("returning promises resolves the promise", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        return Ember.RSVP.resolve(123);
      },
      args: [],
    })._start().then(v => {
      assert.equal(v, 123);
    });
  });
});

test("returning rejecting promise rejects TaskInstance's promise", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        return Ember.RSVP.reject(123);
      },
      args: [],
    })._start().then(null, v => {
      assert.equal(v, 123);
    });
  });
});

test("don't use the most recent yield as a return value if there's no explicit return", function(assert) {
  assert.expect(1);
  Ember.run(() => {
    TaskInstance.create({
      fn: function * () {
        yield 5;
      },
      args: [],
    })._start().then(v => {
      assert.equal(v, undefined);
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

test("yielding to other tasks", function(assert) {
  assert.expect(3);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = TaskInstance.create({
      fn: function * () {
        taskInstance1 = TaskInstance.create({
          fn: function * () {
            defer = Ember.RSVP.defer();
            let value = yield defer.promise;
            return value;
          },
          args: [],
        })._start();
        let value = yield taskInstance1;
        assert.equal(value, 123);
      },
      args: [],
    })._start();
  });

  assert.equal(taskInstance0.get('state'), 'running');
  assert.equal(taskInstance1.get('state'), 'running');

  Ember.run(null, defer.resolve, 123);
});

test("yielding to other tasks: parent task gets canceled", function(assert) {
  assert.expect(2);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = TaskInstance.create({
      fn: function * () {
        taskInstance1 = TaskInstance.create({
          fn: function * () {
            defer = Ember.RSVP.defer();
            let value = yield defer.promise;
            return value;
          },
          args: [],
        })._start();
        let value = yield taskInstance1;
        assert.equal(value, 123);
      },
      args: [],
    })._start();
  });

  Ember.run(taskInstance0, 'cancel');

  assert.equal(taskInstance0.get('state'), 'canceled');
  assert.equal(taskInstance1.get('state'), 'canceled');

  Ember.run(null, defer.resolve, "naw");
});

function shouldNotGetCalled() {
  QUnit.ok(false, "should not be called");
}

test("yielding to other tasks: child task gets canceled", function(assert) {
  assert.expect(4);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = TaskInstance.create({
      fn: function * () {
        taskInstance1 = TaskInstance.create({
          fn: function * () {
            defer = Ember.RSVP.defer();
            let value = yield defer.promise;
            return value;
          },
          args: [],
        })._start();
        taskInstance1.then(shouldNotGetCalled);
        let value = yield taskInstance1;
        assert.equal(value, 123);
      },
      args: [],
    })._start();
  });

  try {
    Ember.run(taskInstance1, 'cancel');
  } catch(e) {
    assert.equal(e.name, 'TaskCancelation');
    assert.equal(e.taskInstance, taskInstance1);
  }

  assert.equal(taskInstance0.get('state'), 'finished'); // TODO: this is up for debate
  assert.equal(taskInstance1.get('state'), 'canceled');

  Ember.run(null, defer.resolve, "naw");
});

test("canceling a finished task shouldn't mark it as canceled", function(assert) {
  assert.expect(5);

  let taskInstance, didRun = false;
  Ember.run(() => {
    taskInstance = TaskInstance.create({
      fn: function * () {
        didRun = true;
      },
      args: [],
    })._start();
  });

  assert.ok(didRun);
  assert.equal(taskInstance.get('isFinished'), true);
  assert.equal(taskInstance.get('isCanceled'), false);
  Ember.run(taskInstance, 'cancel');
  assert.equal(taskInstance.get('isFinished'), true);
  assert.equal(taskInstance.get('isCanceled'), false);
});

test("taskInstance.value is null until task instance completes successfully", function(assert) {
  assert.expect(2);

  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        return 123;
      },
      args: [],
    });
  });

  assert.equal(taskInstance.get('value'), null);
  Ember.run(taskInstance, '_start');
  assert.equal(taskInstance.get('value'), 123);
});

test("taskInstance.error is null until task instance errors", function(assert) {
  assert.expect(3);

  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        throw "justin bailey";
      },
      args: [],
    });
  });

  assert.equal(taskInstance.get('error'), null);
  try {
    Ember.run(taskInstance, '_start');
  } catch(e) {
    assert.equal(e, "justin bailey");
    assert.equal(taskInstance.get('error'), "justin bailey");
  }
});

test("taskInstance.error is set when task cancels", function(assert) {
  assert.expect(1);

  let taskInstance = Ember.run(() => {
    return TaskInstance.create({
      fn: function * () {
        yield Ember.RSVP.defer().promise;
      },
      args: [],
    });
  });

  Ember.run(taskInstance, '_start');
  Ember.run(taskInstance, 'cancel');
  assert.equal(taskInstance.get('error.name'), "TaskCancelation");
});


