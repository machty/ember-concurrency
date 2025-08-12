/* eslint-disable no-console */
import { A } from '@ember/array';
import { destroy } from '@ember/destroyable';
import { later, run } from '@ember/runloop';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';
import { defer } from 'rsvp';

const originalLog = console.log;
const originalWarn = console.warn;

module('Unit: task', function (hooks) {
  hooks.afterEach(function () {
    console.log = originalLog;
    console.warn = originalWarn;
    (Ember.ENV as any).DEBUG_TASKS = false;
  });

  test('task.cancelAll cancels all running task instances', async function (assert) {
    assert.expect(2);

    class TestObj {
      doStuff = task(async () => {
        await timeout(1);
        assert.ok(false, 'should not get here');
      });
    }

    let obj = new TestObj();
    let taskObj = (obj as any).doStuff;
    let instances = A([
      taskObj.perform(),
      taskObj.perform(),
      taskObj.perform(),
    ]);
    await taskObj.cancelAll();

    assert.deepEqual(instances.mapBy('isCanceled'), [true, true, true]);
    assert.strictEqual(
      instances[0].cancelReason,
      "TaskInstance 'doStuff' was canceled because .cancelAll() was explicitly called on the Task. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help",
    );
  });

  test('task.cancelAll normally preserves the last derived state', async function (assert) {
    assert.expect(2);

    class TestObj {
      doStuff = task(async () => {
        await timeout(1);
        return 1;
      });
    }

    let obj = new TestObj();
    let taskObj = (obj as any).doStuff;
    await taskObj.perform();

    assert.strictEqual(taskObj.lastSuccessful.value, 1);

    taskObj.perform();
    await taskObj.cancelAll();

    assert.strictEqual(taskObj.lastSuccessful.value, 1);
  });

  test('task.cancelAll({ resetState: true }) resets derived state', async function (assert) {
    assert.expect(2);

    class TestObj {
      doStuff = task(async () => {
        await timeout(1);
        return 1;
      });
    }

    let obj = new TestObj();
    let taskObj = (obj as any).doStuff;
    await taskObj.perform();

    assert.strictEqual(taskObj.lastSuccessful.value, 1);

    taskObj.perform();
    await taskObj.cancelAll({ resetState: true });

    assert.notOk(
      taskObj.lastSuccessful,
      'expected there to be no last successful value',
    );
  });

  test('cancelation due to task modifier supplies useful message', function (assert) {
    assert.expect(2);

    class TestObj {
      doStuff = task(async () => {
        await timeout(1);
      }).restartable();
    }

    let instances: any;
    run(() => {
      let obj = new TestObj();
      let task = (obj as any).doStuff;
      instances = A([task.perform(), task.perform(), task.perform()]);
    });

    assert.deepEqual(instances.mapBy('isCanceled'), [true, true, false]);
    assert.strictEqual(
      instances[0].cancelReason,
      "TaskInstance 'doStuff' was canceled because it belongs to a 'restartable' Task that was .perform()ed again. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help",
    );
  });

  test('tasks can call cancelAll() on themselves', function (assert) {
    assert.expect(1);

    class TestObj {
      doStuff = task(async () => {
        (this as any).doStuff.cancelAll();
        return 123;
      });
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      (obj as any).doStuff.perform();
    });

    assert.ok((obj as any).doStuff.last.isCanceled);
  });

  test('performing a task on a destroyed object returns an immediately-canceled taskInstance', function (assert) {
    assert.expect(2);

    class TestObj {
      myTask = task(async () => {
        throw new Error("shouldn't get here");
      });
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      destroy(obj);
      assert.true((obj as any).myTask.perform().isDropped);
    });

    run(() => {
      assert.true((obj as any).myTask.perform().isDropped);
    });
  });

  test('handles prototype-less object args', function (assert) {
    assert.expect(0);

    class TestObj {
      doStuff = task(async () => {});
    }

    run(() => {
      new TestObj().doStuff.perform(Object.create(null));
    });
  });

  test('updates derived state synchronously', function (assert) {
    assert.expect(1);

    class TestObj {
      doStuff = task(async () => {
        assert.true(
          (this as any).doStuff.isRunning,
          'Expected to see self running',
        );
      });
    }

    run(() => {
      new TestObj().doStuff.perform();
    });
  });

  test('call stack stays within reasonable bounds', function (assert) {
    assert.expect(1);

    class TestObj {
      a = task(async () => {
        await (this as any).b.perform();

        // Not sure how to test this in an automated fashion;
        // when we tweak scheduler logic, we can check that stack
        // traces are within reasonable bounds by uncommenting
        // the line below. (I'd use Error.stack but Chrome truncates
        // the stack to only a few frames).
        // debugger;
      });

      b = task(async () => {
        await (this as any).c.perform();
      });

      c = task(async () => {
        await (this as any).d.perform();
      });

      d = task(async () => {});
    }

    run(() => {
      let obj = new TestObj();
      (obj as any).a.perform();
    });
    assert.ok(true);
  });

  test('.debug() enables basic debugging', function (assert) {
    assert.expect(1);

    let logs: any[] = [];
    console.log = (...args: any[]) => {
      logs.push(args);
    };

    class TestObj {
      a = task(async () => {
        await defer().promise;
      }).debug();
    }

    run(() => {
      let obj = new TestObj();
      (obj as any).a.perform();
      destroy(obj);
    });

    assert.deepEqual(logs, [
      [
        "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help",
      ],
    ]);
  });

  test('Ember.ENV.DEBUG_TASKS=true enables basic debugging', function (assert) {
    assert.expect(1);

    (Ember.ENV as any).DEBUG_TASKS = true;

    let logs: any[] = [];
    console.log = (...args: any[]) => {
      logs.push(args);
    };

    class TestObj {
      a = task(async () => {
        await defer().promise;
      });
    }

    run(() => {
      let obj = new TestObj();
      (obj as any).a.perform();
      destroy(obj);
    });

    assert.deepEqual(logs, [
      [
        "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help",
      ],
    ]);
  });

  test('.unlinked().perform() detaches a child task from its parent to avoid parent->child cancelation', function (assert) {
    assert.expect(4);

    class TestObj {
      a = task(async () => {
        await (this as any).b.unlinked().perform();
      });

      b = task(async () => {
        await defer().promise;
      });
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      (obj as any).a.perform();

      assert.true((obj as any).a.isRunning);
      assert.true((obj as any).b.isRunning);

      (obj as any).a.cancelAll();
    });

    assert.false((obj as any).a.isRunning);
    assert.true((obj as any).b.isRunning);
  });

  test('.linked() throws an error if called outside of a task', function (assert) {
    assert.expect(1);

    class TestObj {
      a = task(async () => {});
    }

    run(() => {
      try {
        new TestObj().a.linked();
      } catch (e: any) {
        assert.strictEqual(
          e.message,
          'You can only call .linked() from within a task.',
        );
      }
    });
  });

  test('.linked() warns when not immediately yielded', function (assert) {
    assert.expect(1);

    let warnings: any[] = [];
    console.warn = (...args: any[]) => {
      warnings.push(args);
    };

    class TestObj {
      a = task(async () => {
        (this as any).b.linked().perform();
      });

      b = task(async () => {});
    }

    run(() => {
      new TestObj().a.perform();
    });

    assert.deepEqual(warnings, [
      [
        'You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency).',
      ],
    ]);
  });

  // eslint-disable-next-line qunit/require-expect
  test('ES5 getter syntax works', function (assert) {
    class TestObj {
      get es5getterSyntaxSupported() {
        return 'yes';
      }

      myTask = task(async () => {
        assert.ok(true);
      });
    }

    run(() => {
      let obj = new TestObj();
      if (obj.es5getterSyntaxSupported === 'yes') {
        assert.expect(1);
        (obj as any).myTask.perform();
      } else {
        assert.expect(0);
      }
    });
  });

  test('ES classes: performing a task on a destroyed object returns an immediately-canceled taskInstance', function (assert) {
    assert.expect(2);

    class TestObj {
      myTask = task(async () => {
        throw new Error("shouldn't get here");
      });
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      destroy(obj);
      assert.true((obj as any).myTask.perform().isDropped);
    });

    run(() => {
      assert.true((obj as any).myTask.perform().isDropped);
    });
  });

  test('ES classes: task discontinues after destruction when blocked on async values', function (assert) {
    let start = assert.async();
    assert.expect(1);

    class TestObj {
      doStuff = task(async () => {
        assert.ok(true);
        await timeout(1000);
        assert.ok(false);
        await timeout(1000);
      });

      constructor() {
        (this as any).doStuff.perform();
      }
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
    });

    later(() => {
      destroy(obj);
      start();
    }, 1);
  });
});
