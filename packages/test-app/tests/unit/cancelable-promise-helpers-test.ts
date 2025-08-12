import { run } from '@ember/runloop';
import { all, allSettled, task, timeout } from 'ember-concurrency';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import RSVP from 'rsvp';

module('Unit: cancelable promises test helpers', function (hooks) {
  setupTest(hooks);

  test('all behaves like Promise.all', function (assert) {
    assert.expect(6);

    let defers: RSVP.Deferred<string>[] = [];

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        let allPromise = all([
          childTask.perform(),
          childTask.perform(),
          childTask.perform(),
        ]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = await allPromise;
        assert.deepEqual(values, ['a', 'b', 'c']);
      });

      child = task(async () => {
        let defer = RSVP.defer<string>();
        defers.push(defer);
        let value = await defer.promise;
        return value;
      });
    }

    let obj = new TestObject();
    run(() => {
      obj.parent.perform();
    });

    let childTask = obj.child as any;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift()!.resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift()!.resolve('b'));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift()!.resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('all cancels all other joined tasks if one of them fails', function (assert) {
    assert.expect(3);

    let defers: RSVP.Deferred<any>[] = [];

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        try {
          await all([
            childTask.perform(),
            childTask.perform(),
            childTask.perform(),
          ]);
        } catch (e: any) {
          assert.strictEqual(e.wat, 'lol');
        }
      });

      child = task(async () => {
        let defer = RSVP.defer();
        defers.push(defer);
        await defer.promise;
      });
    }

    let obj: TestObject;
    run(() => {
      obj = new TestObject();
      obj.parent.perform();
    });

    let childTask = obj!.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift()!.reject({ wat: 'lol' }));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('all cancels all joined tasks if parent task is canceled', function (assert) {
    assert.expect(2);

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        await all([
          childTask.perform(),
          childTask.perform(),
          childTask.perform(),
        ]);
      });

      child = task(async () => {
        await RSVP.defer().promise;
      });
    }

    let obj: TestObject;
    run(() => {
      obj = new TestObject();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => obj.parent.cancelAll());
    assert.strictEqual(childTask.numRunning, 0);
  });

  test("all doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(1);

    class TestObject {
      parent = task(async () => {
        try {
          await all([this.child.perform()]);
        } catch (e: any) {
          assert.strictEqual(e.message, 'boom');
        }
      });

      child = task(async () => {
        throw new Error('boom');
      });
    }

    let obj = new TestObject();
    await obj.parent.perform();
  });

  test('all throws an assertion, if something other than an array is passed', async function (assert) {
    assert.expect(2);

    try {
      await all();
    } catch (e: any) {
      assert.ok(e.message, /'all' expects an array/);
    }

    try {
      await all(RSVP.Promise.resolve() as any);
    } catch (e: any) {
      assert.ok(e.message, /'all' expects an array/);
    }
  });

  test('allSettled behaves like Promise.allSettled', function (assert) {
    assert.expect(6);

    let defers: RSVP.Deferred<string>[] = [];

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        let allPromise = allSettled([
          childTask.perform(),
          childTask.perform(),
          childTask.perform(),
        ]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = await allPromise;
        assert.deepEqual(values, [
          { state: 'fulfilled', value: 'a' },
          { state: 'fulfilled', value: 'b' },
          { state: 'fulfilled', value: 'c' },
        ]);
      });

      child = task(async () => {
        let defer = RSVP.defer<string>();
        defers.push(defer);
        let value = await defer.promise;
        return value;
      });
    }

    let obj: TestObject;
    run(() => {
      obj = new TestObject();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift()!.resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift()!.resolve('b'));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift()!.resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('allSettled does not cancel all other joined tasks if one of them fails', function (assert) {
    assert.expect(9);

    let defers: RSVP.Deferred<string>[] = [];

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        let allPromise = allSettled([
          childTask.perform(),
          childTask.perform(),
          childTask.perform(),
        ]);
        assert.strictEqual(typeof allPromise.then, 'function');
        let values = await allPromise;
        let fulfilled = values.filter(
          (value: any) => value.state === 'fulfilled',
        );
        let rejected = values.filter(
          (value: any) => value.state !== 'fulfilled',
        );
        assert.deepEqual(fulfilled, [
          { state: 'fulfilled', value: 'a' },
          { state: 'fulfilled', value: 'c' },
        ]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'wat');
      });

      child = task(async () => {
        let defer = RSVP.defer<string>();
        defers.push(defer);
        let value = await defer.promise;
        return value;
      });
    }

    let obj: TestObject;
    run(() => {
      obj = new TestObject();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => defers.shift()!.resolve('a'));
    assert.strictEqual(childTask.numRunning, 2);
    run(() => defers.shift()!.reject(new Error('wat')));
    assert.strictEqual(childTask.numRunning, 1);
    run(() => defers.shift()!.resolve('c'));
    assert.strictEqual(childTask.numRunning, 0);
  });

  test('allSettled cancels all joined tasks if parent task is canceled', function (assert) {
    assert.expect(2);

    class TestObject {
      parent = task(async () => {
        let childTask = this.child;
        await allSettled([
          childTask.perform(),
          childTask.perform(),
          childTask.perform(),
        ]);
      });

      child = task(async () => {
        await RSVP.defer().promise;
      });
    }

    let obj: TestObject;
    run(() => {
      obj = new TestObject();
      obj.parent.perform();
    });

    let childTask = obj.child;
    assert.strictEqual(childTask.numRunning, 3);
    run(() => obj.parent.cancelAll());
    assert.strictEqual(childTask.numRunning, 0);
  });

  test("allSettled doesn't asynchronously rethrow synchronous errors from child tasks", async function (assert) {
    assert.expect(4);

    class TestObject {
      parent = task(async () => {
        const promise = allSettled([
          this.child.perform(),
          this.throws.perform(),
        ]);
        let values = await promise;
        let fulfilled = values.filter(
          (value: any) => value.state === 'fulfilled',
        );
        let rejected = values.filter(
          (value: any) => value.state !== 'fulfilled',
        );
        assert.deepEqual(fulfilled, [{ state: 'fulfilled', value: 'ok!' }]);
        assert.strictEqual(rejected.length, 1);
        assert.strictEqual(rejected[0].state, 'rejected');
        assert.strictEqual(rejected[0].reason.message, 'boom');
      });

      child = task(async () => {
        await timeout(1);
        return 'ok!';
      });

      throws = task(async () => {
        throw new Error('boom');
      });
    }

    let obj = new TestObject();
    await obj.parent.perform();
  });

  test('allSettled throws an assertion, if something other than an array is passed', async function (assert) {
    assert.expect(2);

    try {
      await allSettled();
    } catch (e: any) {
      assert.ok(e.message, /'allSettled' expects an array/);
    }

    try {
      await allSettled(RSVP.Promise.resolve() as any);
    } catch (e: any) {
      assert.ok(e.message, /'allSettled' expects an array/);
    }
  });

  // TODO: Convert remaining tests following the same pattern
});
