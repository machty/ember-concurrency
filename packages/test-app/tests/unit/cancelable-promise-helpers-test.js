import { run } from '@ember/runloop';
import RSVP, { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { isSettled } from '@ember/test-helpers';
import {
  task,
  all,
  allSettled,
  animationFrame,
  hash,
  hashSettled,
  race,
  rawTimeout,
  timeout,
  waitForEvent,
  waitForProperty,
  waitForQueue,
} from 'ember-concurrency';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit: cancelable promises test helpers', function (hooks) {
  setupTest(hooks);

  test('all behaves like Promise.all', function (assert) {
    assert.expect(6);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let allPromise = all([task.perform(), task.perform(), task.perform()]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = yield allPromise;
        assert.deepEqual(values, ['a', 'b', 'c']);
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift().resolve('b'));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift().resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('all cancels all other joined tasks if one of them fails', function (assert) {
    assert.expect(3);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        try {
          yield all([task.perform(), task.perform(), task.perform()]);
        } catch (e) {
          assert.strictEqual(e.wat, 'lol');
        }
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        yield defer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().reject({ wat: 'lol' }));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('all cancels all joined tasks if parent task is canceled', function (assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        yield all([task.perform(), task.perform(), task.perform()]);
      }),

      child: task(function* () {
        yield RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => obj.parent.cancelAll());
    assert.strictEqual(childTask.numRunning, 0);
  });

  test("all doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        try {
          yield all([this.child.perform()]);
        } catch (e) {
          assert.strictEqual(e.message, 'boom');
        }
      }),

      child: task(function* () {
        throw new Error('boom');
      }),
    });

    let obj = Obj.create();
    await obj.parent.perform();
  });

  test('all throws an assertion, if something other than an array is passed', async function (assert) {
    assert.expect(2);

    try {
      await all();
    } catch (e) {
      assert.ok(e.message, /'all' expects an array/);
    }

    try {
      await all(RSVP.Promise.resolve());
    } catch (e) {
      assert.ok(e.message, /'all' expects an array/);
    }
  });

  test('allSettled behaves like Promise.allSettled', function (assert) {
    assert.expect(6);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let allPromise = allSettled([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = yield allPromise;
        assert.deepEqual(values, [
          { state: 'fulfilled', value: 'a' },
          { state: 'fulfilled', value: 'b' },
          { state: 'fulfilled', value: 'c' },
        ]);
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift().resolve('b'));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift().resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('allSettled does not cancel all other joined tasks if one of them fails', function (assert) {
    assert.expect(9);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let allPromise = allSettled([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = yield allPromise;
        let fulfilled = values.filter((value) => value.state === 'fulfilled');
        let rejected = values.filter((value) => value.state !== 'fulfilled');
        assert.deepEqual(fulfilled, [
          { state: 'fulfilled', value: 'a' },
          { state: 'fulfilled', value: 'c' },
        ]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'wat');
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift().reject(new Error('wat')));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift().resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('allSettled cancels all joined tasks if parent task is canceled', function (assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        yield allSettled([task.perform(), task.perform(), task.perform()]);
      }),

      child: task(function* () {
        yield RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => obj.parent.cancelAll());
    assert.strictEqual(childTask.numRunning, 0);
  });

  test("allSettled doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(4);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        const promise = allSettled([
          this.child.perform(),
          this.throws.perform(),
        ]);
        let values = yield promise;
        let fulfilled = values.filter((value) => value.state === 'fulfilled');
        let rejected = values.filter((value) => value.state !== 'fulfilled');
        assert.deepEqual(fulfilled, [{ state: 'fulfilled', value: 'ok!' }]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'boom');
      }),

      child: task(function* () {
        yield timeout(1);
        return 'ok!';
      }),

      throws: task(function* () {
        throw new Error('boom');
      }),
    });

    let obj = Obj.create();
    await obj.parent.perform();
  });

  test('allSettled throws an assertion, if something other than an array is passed', async function (assert) {
    assert.expect(2);

    try {
      await allSettled();
    } catch (e) {
      assert.ok(e.message, /'allSettled' expects an array/);
    }

    try {
      await allSettled(RSVP.Promise.resolve());
    } catch (e) {
      assert.ok(e.message, /'allSettled' expects an array/);
    }
  });

  test('hash', function (assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let v = yield hash({
          a: task.perform(1),
          b: task.perform(2),
          c: task.perform(3),
        });
        assert.deepEqual(v, { a: 1, b: 2, c: 3 });
      }),

      child: task(function* (v) {
        return v;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
  });

  test('hash cancels the others if one fails', function (assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        yield hash({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
        assert.ok(false, 'should not get here');
      }),

      child: task(function* () {
        return RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
    assert.strictEqual(obj.child.numRunning, 3);
    run(obj.child.last, 'cancel');
    assert.strictEqual(obj.child.numRunning, 0);
  });

  test('hash cancels children if parent is canceled', function (assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        yield hash({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
        assert.ok(false, 'should not get here');
      }),

      child: task(function* () {
        return RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
    assert.strictEqual(obj.child.numRunning, 3);
    run(obj.parent, 'cancelAll');
    assert.strictEqual(obj.child.numRunning, 0);
  });

  test("hash doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        try {
          yield hash({
            a: this.child.perform(),
            b: this.throws.perform(),
          });
        } catch (e) {
          assert.strictEqual(e.message, 'boom');
        }
      }),

      child: task(function* () {
        return RSVP.defer().promise;
      }),

      throws: task(function* () {
        throw new Error('boom');
      }),
    });

    let obj = Obj.create();
    await obj.parent.perform();
  });

  test('hashSettled behaves like Promise.hashSettled', function (assert) {
    assert.expect(6);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let allPromise = hashSettled({
          a: task.perform(1),
          b: task.perform(2),
          c: task.perform(3),
        });
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = yield allPromise;
        assert.deepEqual(values, {
          a: { state: 'fulfilled', value: 'a' },
          b: { state: 'fulfilled', value: 'b' },
          c: { state: 'fulfilled', value: 'c' },
        });
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift().resolve('b'));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift().resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('hashSettled does not cancel all other joined tasks if one of them fails', function (assert) {
    assert.expect(9);

    let defers = [];
    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let allPromise = hashSettled({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = Object.values(yield allPromise);
        let fulfilled = values.filter((value) => value.state === 'fulfilled');
        let rejected = values.filter((value) => value.state !== 'fulfilled');
        assert.deepEqual(fulfilled, [
          { state: 'fulfilled', value: 'a' },
          { state: 'fulfilled', value: 'c' },
        ]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'wat');
      }),

      child: task(function* () {
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift().resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift().reject(new Error('wat')));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift().resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('hashSettled cancels all joined tasks if parent task is canceled', function (assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        yield hashSettled({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
      }),

      child: task(function* () {
        yield RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => obj.parent.cancelAll());
    assert.strictEqual(childTask.numRunning, 0);
  });

  test("hashSettled doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(4);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        const promise = hashSettled({
          a: this.child.perform(),
          b: this.throws.perform(),
        });
        let values = Object.values(yield promise);
        let fulfilled = values.filter((value) => value.state === 'fulfilled');
        let rejected = values.filter((value) => value.state !== 'fulfilled');
        assert.deepEqual(fulfilled, [{ state: 'fulfilled', value: 'ok!' }]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'boom');
      }),

      child: task(function* () {
        yield timeout(1);
        return 'ok!';
      }),

      throws: task(function* () {
        throw new Error('boom');
      }),
    });

    let obj = Obj.create();
    await obj.parent.perform();
  });

  test('race throws an assertion, if something other than an array is passed', async function (assert) {
    assert.expect(2);

    try {
      await race();
    } catch (e) {
      assert.ok(e.message, /'race' expects an array/);
    }

    try {
      await race(RSVP.Promise.resolve());
    } catch (e) {
      assert.ok(e.message, /'race' expects an array/);
    }
  });

  test('yieldable helpers work with null/undefined values', function (assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      parent: task(function* () {
        let task = this.child;
        let v = yield hash({
          a: task.perform(1),
          b: null,
          c: undefined,
        });
        assert.deepEqual(v, { a: 1, b: null, c: undefined });
      }),

      child: task(function* (v) {
        return v;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
  });

  test('yieldable helpers support to cancel promises with __ec_cancel__', function (assert) {
    assert.expect(1);

    let promise = new RSVP.defer().promise;
    promise.__ec_cancel__ = () => {
      assert.ok(true);
    };

    let Obj = EmberObject.extend({
      _checkValueOrTimeOutAfterOneSec: task(function* () {
        yield race([promise, resolve()]);
      }).on('init'),
    });

    run(() => {
      Obj.create();
    });
  });

  test('yieldable helpers support cancelation on all manner of Yieldable-derived classes', async function (assert) {
    assert.expect(9);

    let wrapCancelation = (yieldable, shouldBeCalled = true) => {
      let originalOnYield = yieldable.onYield.bind(yieldable);
      yieldable.onYield = (...args) => {
        let disposer = originalOnYield(...args);
        return function () {
          disposer();
          assert.ok(shouldBeCalled);
        };
      };
    };

    let fakeNode = {
      // eslint-disable-next-line no-unused-vars
      addEventListener(_eventName, _fn) {},
      // eslint-disable-next-line no-unused-vars
      removeEventListener(_eventName, _fn) {},
    };

    let Obj = EmberObject.extend({
      a: 12,

      someTask: task(function* () {
        let eventYieldable = waitForEvent(fakeNode, 'never');
        wrapCancelation(eventYieldable);

        let propertyYieldable = waitForProperty(this, 'a', 3);
        wrapCancelation(propertyYieldable);

        let queueYieldable = waitForQueue('afterRender');
        wrapCancelation(queueYieldable);

        let rawTimeoutYieldable = rawTimeout(100000);
        wrapCancelation(rawTimeoutYieldable);

        let timeoutYieldable = timeout(100000);
        wrapCancelation(timeoutYieldable);

        let rafYieldable = animationFrame();
        wrapCancelation(rafYieldable);

        yield all([
          eventYieldable,
          propertyYieldable,
          queueYieldable,
          rawTimeoutYieldable,
          timeoutYieldable,
          rafYieldable,
          resolve(42),
        ]);
      }),
    });

    let obj;

    run(() => {
      obj = Obj.create();
      obj.someTask.perform();
    });

    assert.ok(obj.someTask.isRunning, 'expected to be running');

    await obj.someTask.cancelAll();

    assert.notOk(obj.someTask.isRunning, 'expected not to be running');
    assert.ok(isSettled(), 'expected to be settled');
  });
});
