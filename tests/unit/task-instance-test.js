import RSVP, { resolve, reject } from 'rsvp';
import { run } from '@ember/runloop';
import {
  default as TaskInstance,
  wrap,
  didCancel
} from 'ember-concurrency/-task-instance';
import { module, test } from 'qunit';

module('Unit: task instance', function() {
  test("basics", function(assert) {
    assert.expect(2);

    let context = {};
    run(() => {
      TaskInstance.create({
        *fn(...args) {
          assert.equal(this, context, "generator functions' `this` is the context passed in");
          assert.deepEqual(args, [1,2,3]);
        },
        args: [1,2,3],
        context,
      })._start();
    });
  });

  test("task instances run synchronously", function(assert) {
    assert.expect(3);
    let ti;
    run(() => {
      let isSync = true;
      ti = wrap(function * (v) {
        assert.ok(isSync);
        return v;
      })(123);
      isSync = false;
      assert.equal(ti.value, null);
    });
    assert.equal(ti.value, 123);
  });

  test("task instance hierarchies run synchronously", function(assert) {
    assert.expect(3);

    let ti;
    run(() => {
      let isSync = true;
      ti = wrap(function * (v) {
        return wrap(function * (a) {
          assert.ok(isSync);
          return a*2;
        })(v);
      })(123);
      isSync = false;
      assert.equal(ti.value, null);
    });
    assert.equal(ti.value, 246);
  });

  if (window.Promise) {
    test("window.Promise: returning a promise immediately", function(assert) {
      assert.expect(4);

      let done = assert.async();
      let ti;
      run(() => {
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
      run(() => {
        ti = wrap(function * (v) {
          assert.ok(run.currentRunLoop);
          v = yield window.Promise.resolve(v*2);
          assert.ok(run.currentRunLoop);
          v = yield window.Promise.resolve(v*2);
          assert.ok(run.currentRunLoop);
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
      run(() => {
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
    run(() => {
      wrap(function * () {
        defer = RSVP.defer();
        let value = yield defer.promise;
        assert.equal(value, 123);
      })();
    });

    run(null, defer.resolve, 123);
  });

  function expectCancelation(assert, promise, message) {
    promise.then(() => {
      assert.ok(false, "promise should have rejected");
    }, e => {
      assert.equal(e.name, 'TaskCancelation', "promise rejection is a cancelation");
      if (message) {
        assert.equal(e.message, message);
      }
    });
  }

  test("cancelation: yields in finally block", function(assert) {
    assert.expect(19);

    let defer0, defer1, defer2;
    let taskInstance = run(() => {
      return wrap(function * () {
        try {
          defer0 = RSVP.defer();
          yield defer0.promise;
          assert.ok(false, "should not get here");
        } finally {
          defer1 = RSVP.defer();
          let result = yield defer1.promise;
          assert.equal(result, 123);
          defer2 = RSVP.defer();
          result = yield defer2.promise;
          assert.equal(result, 456);
        }
      })();
    });

    expectCancelation(assert, taskInstance);

    run(() => {
      assert.ok(!taskInstance.get('isCanceled'));

      defer0.resolve();
      taskInstance.cancel();
      assert.ok(!taskInstance.get('isFinished'), "task is not yet finished");
      assert.ok(!taskInstance.get('isCanceled'), "task is not yet canceled");
      assert.ok(taskInstance.get('isCanceling'), "task is canceling");
      assert.ok(!taskInstance.get('isError'));
    });

    run(null, defer1.resolve, 123);
    assert.ok(!taskInstance.get('isFinished'), "task is not yet finished");
    assert.ok(!taskInstance.get('isCanceled'), "task is not yet canceled");
    assert.ok(taskInstance.get('isCanceling'), "task is canceling");
    run(null, defer2.resolve, 456);
    assert.ok(taskInstance.get('isCanceled'));
    assert.ok(!taskInstance.get('isSuccessful'));
    assert.ok(!taskInstance.get('isError'));
    run(null, defer2.resolve, 456);
    assert.ok(taskInstance.get('isFinished'));
    assert.ok(taskInstance.get('isCanceled'));
    assert.ok(!taskInstance.get('isSuccessful'));
    assert.ok(!taskInstance.get('isError'));
    assert.ok(taskInstance.get('isCanceling'));
  });

  test("deferred start", function(assert) {
    assert.expect(4);

    let shouldBeRunning = false;
    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn(...args) {
          assert.ok(shouldBeRunning);
          assert.deepEqual(args, [1,2,3]);
        },
        args: [1,2,3],
      });
    });

    assert.ok(!taskInstance.get('hasStarted'));
    run(() => {
      shouldBeRunning = true;
      taskInstance._start();
    });
    assert.ok(taskInstance.get('hasStarted'));
  });

  test("deferred start: .cancel() before ._start()", function(assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {
          assert.ok(false, "should not get here");
        },
        args: [],
      });
    });

    expectCancelation(assert, taskInstance, "TaskInstance '<unknown>' was canceled because .cancel() was explicitly called. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help");

    run(() => {
      taskInstance.cancel();
      taskInstance._start();
    });
    assert.ok(!taskInstance.get('hasStarted'));
    assert.ok(taskInstance.get('isCanceled'));
  });

  test(".then() resolves with the returned value", function(assert) {
    assert.expect(1);

    run(() => {
      wrap(function * () {
        return 123;
      })().then(v => {
        assert.equal(v, 123);
      });
    });
  });

  test("returning promises resolves the promise", function(assert) {
    assert.expect(1);

    run(() => {
      wrap(function * () {
        return resolve(123);
      })().then(v => {
        assert.equal(v, 123);
      });
    });
  });

  test("returning rejecting promise rejects TaskInstance's promise", function(assert) {
    assert.expect(1);

    run(() => {
      wrap(function * () {
        return reject(123);
      })().then(null, v => {
        assert.equal(v, 123);
      });
    });
  });

  test("don't use the most recent yield as a return value if there's no explicit return", function(assert) {
    assert.expect(1);
    run(() => {
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
    run(() => {
      taskInstance = wrap(function * () {
        try {
          throw new Error("wat");
        } finally {
          defer0 = RSVP.defer();
          let val = yield defer0.promise;
          assert.equal(val, 123);
          defer1 = RSVP.defer();
          val = yield defer1.promise;
          assert.equal(val, 456);
        }
      })();
      taskInstance.catch(e => { caughtError = e; });
    });

    assert.ok(!caughtError);
    assert.ok(!taskInstance.get('isFinished'));
    run(null, defer0.resolve, 123);
    assert.ok(!taskInstance.get('isFinished'));
    run(null, defer1.resolve, 456);
    assert.equal(caughtError.message, "wat");
    assert.ok(taskInstance.get('isFinished'));
  });

  test("unhandled yielded rejections bubble", function(assert) {
    assert.expect(1);
    try {
      run(() => {
        wrap(function * () {
          yield reject("wat");
        })();
      });
    } catch(e) {
      assert.equal(e, "wat");
    }
  });

  test("unhandled thrown exceptions bubble", function(assert) {
    assert.expect(1);
    try {
      run(() => {
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
    run(() => {
      taskInstance0 = wrap(function * () {
        taskInstance1 = wrap(function * () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        let value = yield taskInstance1;
        assert.equal(value, 123);
      })();
    });

    assert.equal(taskInstance0.get('state'), 'running');
    assert.equal(taskInstance1.get('state'), 'running');

    run(null, defer.resolve, 123);
  });

  test("yielding to other tasks: parent task gets canceled", function(assert) {
    assert.expect(2);

    let taskInstance0, taskInstance1, defer;
    run(() => {
      taskInstance0 = wrap(function * () {
        taskInstance1 = wrap(function * () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        let value = yield taskInstance1;
        assert.equal(value, 123);
      })();
    });

    run(taskInstance0, 'cancel');

    assert.equal(taskInstance0.get('state'), 'canceled');
    assert.equal(taskInstance1.get('state'), 'canceled');

    run(null, defer.resolve, "naw");
  });

  function shouldNotGetCalled() {
    throw new Error("should not be called");
  }

  test("yielding to other tasks: child task gets canceled", function(assert) {
    assert.expect(4);

    let taskInstance0, taskInstance1, defer;
    run(() => {
      taskInstance0 = wrap(function * () {
        taskInstance1 = wrap(function * () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        taskInstance1.then(shouldNotGetCalled);
        yield taskInstance1;
        assert.ok(false);
      })();
    });

    try {
      run(taskInstance1, 'cancel');
    } catch(e) {
      assert.equal(e.name, 'TaskCancelation');
      assert.equal(e.taskInstance, taskInstance1);
    }

    assert.equal(taskInstance0.get('state'), 'canceled');
    assert.equal(taskInstance1.get('state'), 'canceled');

    run(null, defer.resolve, "naw");
  });

  test("canceling a finished task shouldn't mark it as canceled", function(assert) {
    assert.expect(5);

    let taskInstance, didRun = false;
    run(() => {
      taskInstance = wrap(function * () {
        didRun = true;
      })();
    });

    assert.ok(didRun);
    assert.equal(taskInstance.get('isFinished'), true);
    assert.equal(taskInstance.get('isCanceled'), false);
    run(taskInstance, 'cancel');
    assert.equal(taskInstance.get('isFinished'), true);
    assert.equal(taskInstance.get('isCanceled'), false);
  });

  test("taskInstance.value is null until task instance completes successfully", function(assert) {
    assert.expect(2);

    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {
          return 123;
        },
        args: [],
      });
    });

    assert.equal(taskInstance.get('value'), null);
    run(taskInstance, '_start');
    assert.equal(taskInstance.get('value'), 123);
  });

  test("taskInstance.error is null until task instance errors", function(assert) {
    assert.expect(3);

    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {
          throw "justin bailey";
        },
        args: [],
      });
    });

    assert.equal(taskInstance.get('error'), null);
    try {
      run(taskInstance, '_start');
    } catch(e) {
      assert.equal(e, "justin bailey");
      assert.equal(taskInstance.get('error'), "justin bailey");
    }
  });

  test("taskInstance.error is set when task cancels", function(assert) {
    assert.expect(1);

    let taskInstance = run(() => {
      return wrap(function * () {
        yield RSVP.defer().promise;
      })();
    });

    run(taskInstance, '_start');
    run(taskInstance, 'cancel');
    assert.equal(taskInstance.get('error.name'), "TaskCancelation");
  });

  test("taskInstance.error is set when task is dropped", function(assert) {
    assert.expect(1);

    let taskInstance = run(() => {
      return wrap(function * () {
        yield RSVP.defer().promise;
      })();
    });

    run(taskInstance, 'cancel');
    assert.equal(taskInstance.get('error.name'), "TaskCancelation");
  });

  test("taskInstance.isSuccessful is set when task fulfills", function(assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {},
        args: [],
      });
    });

    run(taskInstance, '_start');
    assert.equal(taskInstance.get('isFinished'), true);
    assert.equal(taskInstance.get('isSuccessful'), true);
    assert.equal(taskInstance.get('isCanceled'), false);
    assert.equal(taskInstance.get('isError'), false);
  });

  test("taskInstance.isError is set when task throws an error", function(assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {
          throw "wat";
        },
        args: [],
      });
    });

    try {
      run(taskInstance, '_start');
    } catch (e) {
      assert.equal(taskInstance.get('isFinished'), true);
      assert.equal(taskInstance.get('isSuccessful'), false);
      assert.equal(taskInstance.get('isCanceled'), false);
      assert.equal(taskInstance.get('isError'), true);
    }
  });

  test("tasks can catch rejecting promises, preventing their errors from bubbling", function(assert) {
    assert.expect(1);

    run(() => {
      wrap(function * () {
        try {
          yield reject("wat");
        } catch(e) {
          assert.equal(e, "wat");
        }
      })();
    });
  });

  test("if a parent task catches a child task that throws, it prevents the error from bubbling", function(assert) {
    assert.expect(1);

    run(() => {
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

    run(() => {
      wrap(function * () {
        let taskInstance1 = wrap(function * () {
          return reject("wat");
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
      run(() => {
        wrap(function * () {
          yield wrap(function * () {
            yield wrap(function * () {
              return reject("wat");
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
    run(() => {
      wrap(function * () {
        yield wrap(function * () {
          taskInstance0 = wrap(function * () {
            return RSVP.defer().promise;
          })();
          yield taskInstance0;
        })();
      })();
    });

    assert.ok(taskInstance0.get('isRunning'));
    run(taskInstance0, 'cancel');
  });

  test("task cancelation should skip over catch blocks within task functions", function(assert) {
    assert.expect(1);

    let taskInstance0;
    run(() => {
      wrap(function * () {
        try {
          yield wrap(function * () {
            try {
              taskInstance0 = wrap(function * () {
                try {
                  yield RSVP.defer().promise;
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

    run(taskInstance0, 'cancel');
  });

  test("canceling a task instance should be async", function(assert) {
    assert.expect(4);

    let defer;
    let taskInstance = run(() => {
      return TaskInstance.create({
        *fn() {
          defer = RSVP.defer();
          yield defer.promise;
          taskInstance.cancel();
          return 123;
        },
      })._start();
    });

    taskInstance.then(() => {
      assert.ok(false);
    }, (e) => {
      assert.ok(didCancel(e), "canceling a task instance right before it returns is still considered a cancelation");
    });

    assert.ok(!taskInstance.get('isCanceling'));
    run(null, defer.resolve);
    assert.ok(taskInstance.get('isCanceling'));
    assert.ok(taskInstance.get('isCanceled'));
  });
});