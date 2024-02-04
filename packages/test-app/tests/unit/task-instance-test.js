import RSVP, { resolve, reject } from 'rsvp';
import { run } from '@ember/runloop';
import { TaskInstance } from 'ember-concurrency/-private/task-instance';
import { didCancel } from 'ember-concurrency';
import { module, test } from 'qunit';
import { makeAsyncError } from '../helpers/helpers';
import { TaskInstanceExecutor } from 'ember-concurrency/-private/external/task-instance/executor';
import { EMBER_ENVIRONMENT } from 'ember-concurrency/-private/ember-environment';

module('Unit: task instance', function (hooks) {
  let asyncError = makeAsyncError(hooks);

  test('basics', function (assert) {
    assert.expect(2);

    let context = {};
    run(() => {
      makeTaskInstance({
        *fn(...args) {
          assert.deepEqual(
            this,
            context,
            "generator functions' `this` is the context passed in"
          );
          assert.deepEqual(args, [1, 2, 3]);
        },
        args: [1, 2, 3],
        context,
      }).start();
    });
  });

  test('task instances run synchronously', function (assert) {
    assert.expect(3);
    let ti;
    run(() => {
      let isSync = true;
      ti = wrap(function* (v) {
        assert.ok(isSync);
        return v;
      })(123);
      isSync = false;
      assert.strictEqual(ti.value, null);
    });
    assert.strictEqual(ti.value, 123);
  });

  test('task instance hierarchies run synchronously', function (assert) {
    assert.expect(3);

    let ti;
    run(() => {
      let isSync = true;
      ti = wrap(function* (v) {
        return wrap(function* (a) {
          assert.ok(isSync);
          return a * 2;
        })(v);
      })(123);
      isSync = false;
      assert.strictEqual(ti.value, null);
    });
    assert.strictEqual(ti.value, 246);
  });

  if (window.Promise) {
    test('window.Promise: returning a promise immediately', function (assert) {
      assert.expect(4);

      let done = assert.async();
      let ti;
      run(() => {
        ti = wrap(function* (v) {
          return window.Promise.resolve(v * 2);
        })(123);
      });
      assert.false(ti.isFinished);
      assert.strictEqual(ti.value, null);

      setTimeout(() => {
        assert.true(ti.isFinished);
        assert.strictEqual(ti.value, 246);
        done();
      }, 1);
    });

    test('window.Promise: yielding many in a row', function (assert) {
      assert.expect(4);

      let done = assert.async();
      let ti;
      run(() => {
        ti = wrap(function* (v) {
          v = yield window.Promise.resolve(v * 2);
          v = yield window.Promise.resolve(v * 2);
          return v;
        })(123);
      });
      assert.false(ti.isFinished);
      assert.strictEqual(ti.value, null);

      setTimeout(() => {
        assert.true(ti.isFinished);
        assert.strictEqual(ti.value, 492);
        done();
      }, 1);
    });

    test('window.Promise: taskInstance.then()', function (assert) {
      assert.expect(5);

      let done = assert.async();
      let ti;
      run(() => {
        ti = wrap(function* (v) {
          v = yield window.Promise.resolve(v * 2);
          v = yield window.Promise.resolve(v * 2);
          return v;
        })(123);
      });
      assert.false(ti.isFinished);
      assert.strictEqual(ti.value, null);

      ti.then((value) => {
        assert.true(ti.isFinished);
        assert.strictEqual(ti.value, 492);
        assert.strictEqual(value, 492);
        done();
      });
    });
  }

  test('blocks on async yields', function (assert) {
    assert.expect(1);

    let defer;
    run(() => {
      wrap(function* () {
        defer = RSVP.defer();
        let value = yield defer.promise;
        assert.strictEqual(value, 123);
      })();
    });

    run(null, defer.resolve, 123);
  });

  function expectCancelation(assert, promise, message) {
    promise.then(
      () => {
        assert.ok(false, 'promise should have rejected');
      },
      (e) => {
        assert.strictEqual(
          e.name,
          'TaskCancelation',
          'promise rejection is a cancelation'
        );
        if (message) {
          assert.strictEqual(e.message, message);
        }
      }
    );
  }

  test('cancelation: yields in finally block', function (assert) {
    assert.expect(16);

    let defer0, defer1, defer2;
    let taskInstance = run(() => {
      return wrap(function* () {
        try {
          defer0 = RSVP.defer();
          yield defer0.promise;
          assert.ok(false, 'should not get here');
        } finally {
          defer1 = RSVP.defer();
          let result = yield defer1.promise;
          assert.strictEqual(result, 123);
          defer2 = RSVP.defer();
          result = yield defer2.promise;
          assert.strictEqual(result, 456);
        }
      })();
    });

    expectCancelation(assert, taskInstance);

    run(() => {
      assert.false(taskInstance.isCanceled);

      defer0.resolve();
      taskInstance.cancel();
      assert.false(taskInstance.isFinished, 'task is not yet finished');
      assert.false(taskInstance.isCanceled, 'task is not yet canceled');
      assert.false(taskInstance.isError);
    });

    run(null, defer1.resolve, 123);
    assert.false(taskInstance.isFinished, 'task is not yet finished');
    assert.false(taskInstance.isCanceled, 'task is not yet canceled');
    run(null, defer2.resolve, 456);
    assert.true(taskInstance.isCanceled);
    assert.false(taskInstance.isSuccessful);
    assert.false(taskInstance.isError);
    run(null, defer2.resolve, 456);
    assert.true(taskInstance.isFinished);
    assert.true(taskInstance.isCanceled);
    assert.false(taskInstance.isSuccessful);
    assert.false(taskInstance.isError);
  });

  test('deferred start', function (assert) {
    assert.expect(4);

    let shouldBeRunning = false;
    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn(...args) {
          assert.ok(shouldBeRunning);
          assert.deepEqual(args, [1, 2, 3]);
        },
        args: [1, 2, 3],
      });
    });

    assert.false(taskInstance.hasStarted);
    run(() => {
      shouldBeRunning = true;
      taskInstance.start();
    });
    assert.ok(taskInstance.hasStarted);
  });

  test('deferred start: .cancel() before .start()', function (assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {
          assert.ok(false, 'should not get here');
        },
        args: [],
      });
    });

    expectCancelation(
      assert,
      taskInstance,
      "TaskInstance '<unknown>' was canceled because .cancel() was explicitly called. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help"
    );

    run(() => {
      taskInstance.cancel();
      taskInstance.start();
    });
    assert.false(taskInstance.hasStarted);
    assert.ok(taskInstance.isCanceled);
  });

  test('.then() resolves with the returned value', function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        return 123;
      })().then((v) => {
        assert.strictEqual(v, 123);
      });
    });
  });

  test('returning promises resolves the promise', function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        return resolve(123);
      })().then((v) => {
        assert.strictEqual(v, 123);
      });
    });
  });

  test("returning rejecting promise rejects TaskInstance's promise", function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        return reject(123);
      })().then(null, (v) => {
        assert.strictEqual(v, 123);
      });
    });
  });

  test("don't use the most recent yield as a return value if there's no explicit return", function (assert) {
    assert.expect(1);
    run(() => {
      wrap(function* () {
        yield 5;
      })().then((v) => {
        assert.strictEqual(v, undefined);
      });
    });
  });

  test('exception handling', async function (assert) {
    assert.expect(7);

    let defer0, defer1;
    let taskInstance;
    let caughtError;
    run(() => {
      taskInstance = wrap(function* () {
        try {
          throw new Error('wat');
        } finally {
          defer0 = RSVP.defer();
          let val = yield defer0.promise;
          assert.strictEqual(val, 123);
          defer1 = RSVP.defer();
          val = yield defer1.promise;
          assert.strictEqual(val, 456);
        }
      })();
      taskInstance.catch((e) => {
        caughtError = e;
      });
    });

    assert.notOk(caughtError);
    assert.false(taskInstance.isFinished);
    run(null, defer0.resolve, 123);
    assert.false(taskInstance.isFinished);
    run(null, defer1.resolve, 456);
    assert.strictEqual(caughtError.message, 'wat');
    assert.ok(taskInstance.isFinished);
  });

  test('unhandled yielded rejections are asyncly reported to Ember.onerror', async function (assert) {
    assert.expect(1);
    run(() => {
      wrap(function* () {
        yield reject('wat');
      })();
    });
    assert.deepEqual(await asyncError(), 'wat');
  });

  test('yielding to other tasks', function (assert) {
    assert.expect(3);

    let taskInstance0, taskInstance1, defer;
    run(() => {
      taskInstance0 = wrap(function* () {
        taskInstance1 = wrap(function* () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        let value = yield taskInstance1;
        assert.strictEqual(value, 123);
      })();
    });

    assert.strictEqual(taskInstance0.state, 'running');
    assert.strictEqual(taskInstance1.state, 'running');

    run(null, defer.resolve, 123);
  });

  test('yielding to other tasks: parent task gets canceled', function (assert) {
    assert.expect(4);

    let taskInstance0, taskInstance1, defer;
    run(() => {
      taskInstance0 = wrap(function* () {
        taskInstance1 = wrap(function* () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        let value = yield taskInstance1;
        assert.strictEqual(value, 123);
      })();
    });

    assert.strictEqual(taskInstance0.state, 'running');
    assert.strictEqual(taskInstance1.state, 'running');

    run(taskInstance0, 'cancel');

    assert.strictEqual(taskInstance0.state, 'canceled');
    assert.strictEqual(taskInstance1.state, 'canceled');

    run(null, defer.resolve, 'naw');
  });

  test('yielding to other tasks: child task gets canceled', async function (assert) {
    assert.expect(2);

    let taskInstance0, taskInstance1, defer;
    run(() => {
      taskInstance0 = wrap(function* () {
        taskInstance1 = wrap(function* () {
          defer = RSVP.defer();
          let value = yield defer.promise;
          return value;
        })();
        yield taskInstance1;
        assert.ok(false);
      })();
    });

    run(taskInstance1, 'cancel');

    assert.strictEqual(taskInstance0.state, 'canceled');
    assert.strictEqual(taskInstance1.state, 'canceled');

    run(null, defer.resolve, 'naw');
  });

  test("canceling a finished task shouldn't mark it as canceled", function (assert) {
    assert.expect(5);

    let taskInstance,
      didRun = false;
    run(() => {
      taskInstance = wrap(function* () {
        didRun = true;
      })();
    });

    assert.ok(didRun);
    assert.true(taskInstance.isFinished);
    assert.false(taskInstance.isCanceled);
    run(taskInstance, 'cancel');
    assert.true(taskInstance.isFinished);
    assert.false(taskInstance.isCanceled);
  });

  test('taskInstance.value is null until task instance completes successfully', function (assert) {
    assert.expect(2);

    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {
          return 123;
        },
        args: [],
      });
    });

    assert.strictEqual(taskInstance.value, null);
    run(taskInstance, 'start');
    assert.strictEqual(taskInstance.value, 123);
  });

  test('taskInstance.error is null until task instance errors', async function (assert) {
    assert.expect(3);

    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {
          throw 'justin bailey';
        },
        args: [],
      });
    });

    assert.strictEqual(taskInstance.error, null);
    run(taskInstance, 'start');

    let error = await asyncError();
    assert.strictEqual(error, 'justin bailey');
    assert.strictEqual(taskInstance.error, 'justin bailey');
  });

  test('taskInstance.error is set when task cancels', function (assert) {
    assert.expect(1);

    let taskInstance = run(() => {
      return wrap(function* () {
        yield RSVP.defer().promise;
      })();
    });

    run(taskInstance, 'start');
    run(taskInstance, 'cancel');
    assert.strictEqual(taskInstance.error.name, 'TaskCancelation');
  });

  test('taskInstance.error is set when task is dropped', function (assert) {
    assert.expect(1);

    let taskInstance = run(() => {
      return wrap(function* () {
        yield RSVP.defer().promise;
      })();
    });

    run(taskInstance, 'cancel');
    assert.strictEqual(taskInstance.error.name, 'TaskCancelation');
  });

  test('taskInstance.isSuccessful is set when task fulfills', function (assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {},
        args: [],
      });
    });

    run(taskInstance, 'start');
    assert.true(taskInstance.isFinished);
    assert.true(taskInstance.isSuccessful);
    assert.false(taskInstance.isCanceled);
    assert.false(taskInstance.isError);
  });

  test('taskInstance.isError is set when task throws an error', async function (assert) {
    assert.expect(4);

    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {
          throw 'wat';
        },
        args: [],
      });
    });

    run(taskInstance, 'start');

    assert.true(taskInstance.isFinished);
    assert.false(taskInstance.isSuccessful);
    assert.false(taskInstance.isCanceled);
    assert.true(taskInstance.isError);

    await asyncError();
  });

  test('tasks can catch rejecting promises, preventing their errors from bubbling', function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        try {
          yield reject('wat');
        } catch (e) {
          assert.strictEqual(e, 'wat');
        }
      })();
    });
  });

  test('if a parent task catches a child task that throws, it prevents the error from bubbling', function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        let taskInstance1 = wrap(function* () {
          throw 'wat';
        })();
        try {
          yield taskInstance1;
        } catch (e) {
          assert.strictEqual(e, 'wat');
        }
      })();
    });
  });

  test('if a parent task catches a child task that returns a rejecting promise, it prevents the error from bubbling', function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        let taskInstance1 = wrap(function* () {
          return reject('wat');
        })();

        try {
          yield taskInstance1;
        } catch (e) {
          assert.strictEqual(e, 'wat');
        }
      })();
    });
  });

  test('in a hierarchy of child task performs, a bubbling exception should only print to console once', async function (assert) {
    assert.expect(1);

    run(() => {
      wrap(function* () {
        yield wrap(function* () {
          yield wrap(function* () {
            return reject('wat');
          })();
        })();
      })();
    });

    let error = await asyncError();
    assert.strictEqual(error, 'wat');
  });

  test('in a hierarchy of child task performs, a bubbling cancel should not be considered an error', function (assert) {
    assert.expect(1);

    let taskInstance0;
    run(() => {
      wrap(function* () {
        yield wrap(function* () {
          taskInstance0 = wrap(function* () {
            return RSVP.defer().promise;
          })();
          yield taskInstance0;
        })();
      })();
    });

    assert.ok(taskInstance0.isRunning);
    run(taskInstance0, 'cancel');
  });

  test('task cancelation should skip over catch blocks within task functions', function (assert) {
    assert.expect(1);

    let taskInstance0;
    run(() => {
      wrap(function* () {
        try {
          yield wrap(function* () {
            try {
              taskInstance0 = wrap(function* () {
                try {
                  yield RSVP.defer().promise;
                  assert.ok(false, 'one');
                } catch (e) {
                  assert.ok(false, 'one catch');
                }
              })();
              yield taskInstance0;
              assert.ok(false, 'two');
            } catch (e) {
              assert.ok(false, 'two catch');
            }
          })();
          assert.ok(false, 'three');
        } catch (e) {
          assert.ok(false, 'three catch');
        }
      })().catch((e) => {
        assert.strictEqual(e.name, 'TaskCancelation');
      });
    });

    run(taskInstance0, 'cancel');
  });

  test('canceling a task instance should be async', function (assert) {
    assert.expect(2);

    let defer;
    let taskInstance = run(() => {
      return makeTaskInstance({
        *fn() {
          defer = RSVP.defer();
          yield defer.promise;
          taskInstance.cancel();
          return 123;
        },
      }).start();
    });

    taskInstance.then(
      () => {
        assert.ok(false);
      },
      (e) => {
        assert.ok(
          didCancel(e),
          'canceling a task instance right before it returns is still considered a cancelation'
        );
      }
    );

    run(null, defer.resolve);
    assert.ok(taskInstance.isCanceled);
  });

  let guid = 0;
  function makeTaskInstance({ context, args, fn }) {
    args = args || [];
    let stubTask = { guid: `ec_${guid++}`, context };
    let executor = new TaskInstanceExecutor({
      generatorFactory: () => fn.apply(context, args),
      env: EMBER_ENVIRONMENT,
    });
    return new TaskInstance({
      task: stubTask,
      args: args,
      executor,
    });
  }

  function go(options) {
    let taskInstance = makeTaskInstance(options);
    taskInstance.executor.start();
    return taskInstance;
  }

  function wrap(fn) {
    return function wrappedRunnerFunction(...args) {
      return go({ fn, context: {}, args });
    };
  }
});
