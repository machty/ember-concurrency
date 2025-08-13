import { run } from '@ember/runloop';
import { forever, rawTimeout, task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';
import RSVP from 'rsvp';

import { makeAsyncError } from '../helpers/helpers';

module('Unit: task states', function (hooks) {
  let asyncError = makeAsyncError(hooks);

  test('state basic', function (assert) {
    assert.expect(11);

    class TestObj {
      myTask = task(async () => {});
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      assert.true(obj.myTask.isIdle);
      assert.false(obj.myTask.isRunning);
      assert.strictEqual(obj.myTask.state, 'idle');
      assert.strictEqual(obj.myTask.performCount, 0);
      obj.myTask.perform();
      assert.false(obj.myTask.isIdle);
      assert.true(obj.myTask.isRunning);
      assert.strictEqual(obj.myTask.state, 'running');
      assert.strictEqual(obj.myTask.performCount, 1);
    });
    assert.true(obj.myTask.isIdle);
    assert.false(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.state, 'idle');
  });

  test('state resets properly on early return', async function (assert) {
    assert.expect(8);

    class TestObj {
      myTask = task({ restartable: true }, async (input: any) => {
        if (!input || input === '') {
          return input;
        }

        await timeout(250);

        return 'bam';
      });
    }

    let obj = new TestObj();
    assert.true(obj.myTask.isIdle);
    assert.false(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.state, 'idle');
    assert.strictEqual(obj.myTask.performCount, 0);

    obj.myTask.perform('h');
    await rawTimeout(100);
    obj.myTask.perform('he');
    await rawTimeout(100);
    obj.myTask.perform('h');
    await rawTimeout(100);
    await obj.myTask.perform('');

    assert.true(obj.myTask.isIdle);
    assert.false(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.state, 'idle');
    assert.strictEqual(obj.myTask.performCount, 4);
  });

  test('state when task is blocked on a yield', function (assert) {
    assert.expect(15);

    class TestObj {
      myTask = task(async () => {
        await forever;
      });
    }

    let obj: TestObj, t: any;
    run(() => {
      obj = new TestObj();
      t = obj.myTask;
    });

    run(() => {
      assert.true(t.isIdle);
      assert.false(t.isRunning);
      assert.false(t.isQueued);
      assert.strictEqual(t.state, 'idle');
      assert.strictEqual(t.performCount, 0);
      t.perform();
    });

    run(() => {
      let t = obj.myTask;
      assert.false(t.isIdle);
      assert.true(t.isRunning);
      assert.strictEqual(t.state, 'running');
      assert.strictEqual(t.numRunning, 1);
      assert.strictEqual(t.performCount, 1);
      t.perform();
    });

    assert.false(t.isIdle);
    assert.true(t.isRunning);
    assert.strictEqual(t.state, 'running');
    assert.strictEqual(t.numRunning, 2);
    assert.strictEqual(t.performCount, 2);

    t.cancelAll();
  });

  test('.lastPerformed is set when task.perform is called', function (assert) {
    assert.expect(3);

    class TestObj {
      myTask = task(async () => {});
    }

    run(() => {
      let obj = new TestObj();
      let myTask = obj.myTask;
      assert.strictEqual(myTask.lastPerformed, null);
      let taskInstance0 = myTask.perform();
      assert.deepEqual(myTask.lastPerformed, taskInstance0);
      let taskInstance1 = myTask.perform();
      assert.deepEqual(myTask.lastPerformed, taskInstance1);
    });
  });

  test('.performCount exposes the number of times a task has been performed', function (assert) {
    assert.expect(3);

    class TestObj {
      doStuff = task(async () => {});
    }

    run(() => {
      let obj = new TestObj();
      let doStuff = obj.doStuff;
      assert.strictEqual(doStuff.performCount, 0);
      doStuff.perform();
      assert.strictEqual(doStuff.performCount, 1);
      doStuff.perform();
      doStuff.perform();
      assert.strictEqual(doStuff.performCount, 3);
    });
  });

  test('a dropped .lastPerformed shows up as canceled', function (assert) {
    assert.expect(3);

    class TestObj {
      myTask = task({ drop: true }, async () => {
        await forever;
      });
    }

    let myTask: any, taskInstance1: any;
    run(() => {
      let obj = new TestObj();
      myTask = obj.myTask;
      myTask.perform();
      taskInstance1 = myTask.perform();
      assert.deepEqual(myTask.lastPerformed, taskInstance1);
    });
    assert.strictEqual(taskInstance1.error.name, 'TaskCancelation');
    assert.strictEqual(myTask.lastPerformed.error.name, 'TaskCancelation');
  });

  test('.last is set when a task starts', function (assert) {
    assert.expect(4);

    let defer: any, taskInstance0: any, taskInstance1: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.last, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
    });

    assert.deepEqual(myTask.last, taskInstance0);
    run(defer, 'resolve');
    assert.deepEqual(myTask.last, taskInstance1);
    run(defer, 'resolve');
    assert.deepEqual(myTask.last, taskInstance1);
  });

  test('.lastSuccessful is set when a task instance returns a value', async function (assert) {
    assert.expect(5);

    let defer: any, taskInstance0: any, taskInstance1: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        return await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.lastSuccessful, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.strictEqual(myTask.lastSuccessful, null);
    run(defer, 'resolve');
    assert.deepEqual(myTask.lastSuccessful, taskInstance0);
    run(defer, 'resolve');
    assert.deepEqual(myTask.lastSuccessful, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.deepEqual(
      myTask.lastSuccessful,
      taskInstance1,
      'still is taskInstance1 because taskInstance2 failed',
    );
    await asyncError();
  });

  test('.lastComplete is set when a task instance returns/cancels/errors', async function (assert) {
    assert.expect(5);

    let defer: any, taskInstance0: any, taskInstance1: any, taskInstance2: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        return await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.lastComplete, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.strictEqual(myTask.lastComplete, null);
    run(defer, 'resolve');
    assert.deepEqual(myTask.lastComplete, taskInstance0);
    run(taskInstance1, 'cancel');
    assert.deepEqual(myTask.lastComplete, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.deepEqual(myTask.lastComplete, taskInstance2);
    await asyncError();
  });

  test('.lastErrored is set when a task instance errors (but not cancels)', async function (assert) {
    assert.expect(5);

    let defer: any, taskInstance1: any, taskInstance2: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        return await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.lastErrored, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.strictEqual(myTask.lastErrored, null);
    run(defer, 'resolve');
    assert.strictEqual(myTask.lastErrored, null);
    run(taskInstance1, 'cancel');
    assert.strictEqual(myTask.lastErrored, null);
    run(defer, 'reject', 'i am error');
    assert.deepEqual(myTask.lastErrored, taskInstance2);
    await asyncError();
  });

  test('.lastCanceled is set when a task instance cancels (but not errors)', async function (assert) {
    assert.expect(5);

    let defer: any, taskInstance1: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        return await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.lastCanceled, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.strictEqual(myTask.lastCanceled, null);
    run(defer, 'resolve');
    assert.strictEqual(myTask.lastCanceled, null);
    run(taskInstance1, 'cancel');
    assert.deepEqual(myTask.lastCanceled, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.strictEqual(
      myTask.lastCanceled,
      taskInstance1,
      'still taskInstance1',
    );
    await asyncError();
  });

  test('.lastIncomplete is set when a task instance errors or cancels', async function (assert) {
    assert.expect(5);

    let defer: any, taskInstance1: any, taskInstance2: any;

    class TestObj {
      myTask = task({ enqueue: true }, async () => {
        defer = RSVP.defer();
        return await defer.promise;
      });
    }

    let obj: TestObj, myTask: any;
    run(() => {
      obj = new TestObj();
      myTask = obj.myTask;
      assert.strictEqual(myTask.lastIncomplete, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.strictEqual(myTask.lastIncomplete, null);
    run(defer, 'resolve');
    assert.strictEqual(myTask.lastIncomplete, null);
    run(taskInstance1, 'cancel');
    assert.deepEqual(myTask.lastIncomplete, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.deepEqual(myTask.lastIncomplete, taskInstance2);
    await asyncError();
  });

  test('.lastRunning resets one-by-one as tasks are completed, successfully or not', async function (assert) {
    assert.expect(12);

    class TestObj {
      myTask = task(async (defer: any) => {
        return await defer.promise;
      });
    }

    const obj = new TestObj();

    const defer1 = RSVP.defer();
    const taskInstance1 = obj.myTask.perform(defer1);

    assert.true(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.numRunning, 1);
    assert.strictEqual(
      obj.myTask.lastRunning,
      taskInstance1,
      'lastRunning is taskInstance1 when its the only running',
    );

    const defer2 = RSVP.defer();
    const taskInstance2 = obj.myTask.perform(defer2);

    assert.true(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.numRunning, 2);
    assert.strictEqual(
      obj.myTask.lastRunning,
      taskInstance2,
      'lastRunning is taskInstance2 when its the latest running',
    );

    run(defer2, 'resolve');

    assert.true(obj.myTask.isRunning);
    assert.strictEqual(obj.myTask.numRunning, 1);
    assert.strictEqual(
      obj.myTask.lastRunning,
      taskInstance1,
      'lastRunning is taskInstance1 when taskInstance2 has stopped',
    );

    run(defer1, 'reject', 'big wrench');

    assert.false(
      obj.myTask.isRunning,
      'isRunning is false when tasks finished running',
    );
    assert.strictEqual(
      obj.myTask.numRunning,
      0,
      'numRunning is 0 when tasks finished running',
    );
    assert.strictEqual(
      obj.myTask.lastRunning,
      null,
      'lastRunning is null when tasks finished running',
    );
    await asyncError();
  });
});
