import Ember from 'ember';
import { default as TaskInstance, wrap } from 'ember-concurrency/-task-instance';
import { module, test } from 'qunit';

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

test("task instances run synchronously", function(assert) {
  assert.expect(1);
  Ember.run(() => {
    let ti = wrap(function * (v) { return v; })(123);
    assert.equal(ti.value, 123);
  });
});

test("task instance hierarchies run synchronously", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    let ti = wrap(function * (v) {
      return wrap(function * (a) { return a*2; })(v);
    })(123);
    assert.equal(ti.value, 246);
  });
});

if (window.Promise) {
  test("window.Promise: returning a promise immediately", function(assert) {
    assert.expect(4);

    let done = assert.async();
    let ti;
    Ember.run(() => {
      ti = wrap(function * (v) {
        return window.Promise.resolve(v*2);
      })(123);
    });
    assert.equal(ti.get('isFinished'), false);
    assert.equal(ti.value, null);

    setTimeout(() => {
      assert.equal(ti.get('isFinished'), true);
      assert.equal(ti.value, 246);
      done();
    }, 1);
  });

  test("window.Promise: yielding many in a row", function(assert) {
    assert.expect(7);

    let done = assert.async();
    let ti;
    Ember.run(() => {
      ti = wrap(function * (v) {
        assert.ok(Ember.run.currentRunLoop);
        v = yield window.Promise.resolve(v*2);
        assert.ok(Ember.run.currentRunLoop);
        v = yield window.Promise.resolve(v*2);
        assert.ok(Ember.run.currentRunLoop);
        return v;
      })(123);
    });
    assert.equal(ti.get('isFinished'), false);
    assert.equal(ti.value, null);

    setTimeout(() => {
      assert.equal(ti.get('isFinished'), true);
      assert.equal(ti.value, 492);
      done();
    }, 1);
  });

  test("window.Promise: taskInstance.then()", function(assert) {
    assert.expect(5);

    let done = assert.async();
    let ti;
    Ember.run(() => {
      ti = wrap(function * (v) {
        v = yield window.Promise.resolve(v*2);
        v = yield window.Promise.resolve(v*2);
        return v;
      })(123);
    });
    assert.equal(ti.get('isFinished'), false);
    assert.equal(ti.value, null);

    ti.then(value => {
      assert.equal(ti.get('isFinished'), true);
      assert.equal(ti.value, 492);
      assert.equal(value, 492);
      done();
    });
  });
}

test("blocks on async yields", function(assert) {
  assert.expect(1);

  let defer;
  Ember.run(() => {
    wrap(function * () {
      defer = Ember.RSVP.defer();
      let value = yield defer.promise;
      assert.equal(value, 123);
    })();
  });

  Ember.run(null, defer.resolve, 123);
});

function expectCancelation(assert, promise) {
  promise.then(() => {
    assert.ok(false, "promise should have rejected");
  }, e => {
    assert.equal(e.name, 'TaskCancelation', "promise rejection is a cancelation");
  });
}

test("cancelation: yields in finally block", function(assert) {
  assert.expect(13);

  let defer0, defer1, defer2;
  let taskInstance = Ember.run(() => {
    return wrap(function * () {
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
    })();
  });

  expectCancelation(assert, taskInstance);

  Ember.run(() => {
    assert.ok(!taskInstance.get('isCanceled'));

    defer0.resolve();
    taskInstance.cancel();
    assert.ok(!taskInstance.get('isFinished'), "task is not yet finished");
    assert.ok(!taskInstance.get('isCanceled'), "task is not yet canceled");
    assert.ok(taskInstance.get('isCanceling'), "task is canceling");
  });

  Ember.run(null, defer1.resolve, 123);
  assert.ok(!taskInstance.get('isFinished'), "task is not yet finished");
  assert.ok(!taskInstance.get('isCanceled'), "task is not yet canceled");
  assert.ok(taskInstance.get('isCanceling'), "task is canceling");
  Ember.run(null, defer2.resolve, 456);
  assert.ok(taskInstance.get('isCanceled'));
  assert.ok(taskInstance.get('isFinished'));
  assert.ok(taskInstance.get('isCanceling'));
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

  expectCancelation(assert, taskInstance);

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
    wrap(function * () {
      return 123;
    })().then(v => {
      assert.equal(v, 123);
    });
  });
});

test("returning promises resolves the promise", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    wrap(function * () {
      return Ember.RSVP.resolve(123);
    })().then(v => {
      assert.equal(v, 123);
    });
  });
});

test("returning rejecting promise rejects TaskInstance's promise", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    wrap(function * () {
      return Ember.RSVP.reject(123);
    })().then(null, v => {
      assert.equal(v, 123);
    });
  });
});

test("don't use the most recent yield as a return value if there's no explicit return", function(assert) {
  assert.expect(1);
  Ember.run(() => {
    wrap(function * () {
      yield 5;
    })().then(v => {
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
    taskInstance = wrap(function * () {
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
    })();
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
      wrap(function * () {
        yield Ember.RSVP.reject("wat");
      })();
    });
  } catch(e) {
    assert.equal(e, "wat");
  }
});

test("unhandled thrown exceptions bubble", function(assert) {
  assert.expect(1);
  try {
    Ember.run(() => {
      wrap(function * () {
        throw "wat";
      })();
    });
  } catch(e) {
    assert.equal(e, "wat");
  }
});

test("yielding to other tasks", function(assert) {
  assert.expect(3);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = wrap(function * () {
      taskInstance1 = wrap(function * () {
        defer = Ember.RSVP.defer();
        let value = yield defer.promise;
        return value;
      })();
      let value = yield taskInstance1;
      assert.equal(value, 123);
    })();
  });

  assert.equal(taskInstance0.get('state'), 'running');
  assert.equal(taskInstance1.get('state'), 'running');

  Ember.run(null, defer.resolve, 123);
});

test("yielding to other tasks: parent task gets canceled", function(assert) {
  assert.expect(2);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = wrap(function * () {
      taskInstance1 = wrap(function * () {
        defer = Ember.RSVP.defer();
        let value = yield defer.promise;
        return value;
      })();
      let value = yield taskInstance1;
      assert.equal(value, 123);
    })();
  });

  Ember.run(taskInstance0, 'cancel');

  assert.equal(taskInstance0.get('state'), 'canceled');
  assert.equal(taskInstance1.get('state'), 'canceled');

  Ember.run(null, defer.resolve, "naw");
});

function shouldNotGetCalled() {
  throw new Error("should not be called");
}

test("yielding to other tasks: child task gets canceled", function(assert) {
  assert.expect(4);

  let taskInstance0, taskInstance1, defer;
  Ember.run(() => {
    taskInstance0 = wrap(function * () {
      taskInstance1 = wrap(function * () {
        defer = Ember.RSVP.defer();
        let value = yield defer.promise;
        return value;
      })();
      taskInstance1.then(shouldNotGetCalled);
      yield taskInstance1;
      assert.ok(false);
    })();
  });

  try {
    Ember.run(taskInstance1, 'cancel');
  } catch(e) {
    assert.equal(e.name, 'TaskCancelation');
    assert.equal(e.taskInstance, taskInstance1);
  }

  assert.equal(taskInstance0.get('state'), 'canceled');
  assert.equal(taskInstance1.get('state'), 'canceled');

  Ember.run(null, defer.resolve, "naw");
});

test("canceling a finished task shouldn't mark it as canceled", function(assert) {
  assert.expect(5);

  let taskInstance, didRun = false;
  Ember.run(() => {
    taskInstance = wrap(function * () {
      didRun = true;
    })();
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
    return wrap(function * () {
      yield Ember.RSVP.defer().promise;
    })();
  });

  Ember.run(taskInstance, '_start');
  Ember.run(taskInstance, 'cancel');
  assert.equal(taskInstance.get('error.name'), "TaskCancelation");
});

test("taskInstance.error is set when task is dropped", function(assert) {
  assert.expect(1);

  let taskInstance = Ember.run(() => {
    return wrap(function * () {
      yield Ember.RSVP.defer().promise;
    })();
  });

  Ember.run(taskInstance, 'cancel');
  assert.equal(taskInstance.get('error.name'), "TaskCancelation");
});

test("tasks can catch rejecting promises, preventing their errors from bubbling", function(assert) {
  assert.expect(1);

  let taskInstance0;
  Ember.run(() => {
    taskInstance0 = wrap(function * () {
      try {
        yield Ember.RSVP.reject("wat");
      } catch(e) {
        assert.equal(e, "wat");
      }
    })();
  });
});

test("if a parent task catches a child task that throws, it prevents the error from bubbling", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    wrap(function * () {
      let taskInstance1 = wrap(function * () { throw "wat"; })();
      try {
        yield taskInstance1;
      } catch(e) {
        assert.equal(e, "wat");
      }
    })();
  });
});

test("if a parent task catches a child task that returns a rejecting promise, it prevents the error from bubbling", function(assert) {
  assert.expect(1);

  Ember.run(() => {
    wrap(function * () {
      let taskInstance1 = wrap(function * () {
        return Ember.RSVP.reject("wat");
      })();

      try {
        yield taskInstance1;
      } catch(e) {
        assert.equal(e, "wat");
      }
    })();
  });
});

test("in a hierarchy of child task performs, a bubbling exception should only print to console once", function(assert) {
  assert.expect(1);

  try {
    Ember.run(() => {
      wrap(function * () {
        yield wrap(function * () {
          yield wrap(function * () {
            return Ember.RSVP.reject("wat");
          })();
        })();
      })();
    });
    assert.ok(false);
  } catch(e) {
    assert.equal(e, "wat");
  }
});

test("in a hierarchy of child task performs, a bubbling cancel should not be considered an error", function(assert) {
  assert.expect(1);

  let taskInstance0;
  Ember.run(() => {
    wrap(function * () {
      yield wrap(function * () {
        taskInstance0 = wrap(function * () {
          return Ember.RSVP.defer().promise;
        })();
        yield taskInstance0;
      })();
    })();
  });

  assert.ok(taskInstance0.get('isRunning'));
  Ember.run(taskInstance0, 'cancel');
});

test("task cancelation should skip over catch blocks within task functions", function(assert) {
  assert.expect(1);

  let taskInstance0;
  Ember.run(() => {
    wrap(function * () {
      try {
        yield wrap(function * () {
          try {
            taskInstance0 = wrap(function * () {
              try {
                yield Ember.RSVP.defer().promise;
                assert.ok(false, "one");
              } catch(e) {
                assert.ok(false, "one catch");
              }
            })();
            yield taskInstance0;
            assert.ok(false, "two");
          } catch(e) {
            assert.ok(false, "two catch");
          }
        })();
        assert.ok(false, "three");
      } catch(e) {
        assert.ok(false, "three catch");
      }
    })().catch(e => {
      assert.equal(e.name, 'TaskCancelation');
    });
  });

  Ember.run(taskInstance0, 'cancel');
});


