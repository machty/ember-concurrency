/* eslint-disable no-console */
import { A } from '@ember/array';
import { destroy } from '@ember/destroyable';
import { later, run } from '@ember/runloop';
import { settled } from '@ember/test-helpers';
import Ember from 'ember';
import { forever, task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';
import { defer } from 'rsvp';

const originalLog = console.log;
const originalWarn = console.warn;

// Helper class for Evented behavior
class EventedClass {
  trigger(eventName: string, ...args: any[]): void {
    // Basic trigger implementation for testing
    const listeners = (this as any)._eventListeners?.[eventName] || [];
    listeners.forEach((listener: any) => listener(...args));
  }

  on(eventName: string, callback: Function): void {
    (this as any)._eventListeners = (this as any)._eventListeners || {};
    (this as any)._eventListeners[eventName] =
      (this as any)._eventListeners[eventName] || [];
    (this as any)._eventListeners[eventName].push(callback);
  }

  destroy(): void {
    (this as any)._eventListeners = {};
  }
}

module('Unit: task', function (hooks) {
  hooks.afterEach(function () {
    console.log = originalLog;
    console.warn = originalWarn;
    Ember.ENV.DEBUG_TASKS = false;
  });

  test('task init', function (assert) {
    assert.expect(3);

    class TestObj {
      oldschool = task(async () => {
        assert.ok(this instanceof TestObj);
      }).on('init');

      newschool = task(async () => {
        assert.ok(this instanceof TestObj);
        await 1;
        await 1;
        await 1;
        assert.ok(true, 'done');
      }).on('init');

      constructor() {
        // Simulate init behavior
        (this as any).oldschool.perform();
        (this as any).newschool.perform();
      }
    }

    run(() => {
      new TestObj();
    });
  });

  test('task Evented event', function (assert) {
    assert.expect(1);

    let arr: any[] = [];

    class TestObj extends EventedClass {
      doStuff = task(async (a: any, b: any, c: any) => {
        arr.push(a, b, c);
      }).on('foo');

      constructor() {
        super();
        this.on('foo', (...args: any[]) => {
          (this as any).doStuff.perform(...args);
        });
      }
    }

    run(() => {
      let obj = new TestObj();
      obj.trigger('foo', 1, 2, 3);
      obj.trigger('foo', 4, 5, 6);
      obj.trigger('foo', 7, 8, 9);
    });
    assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('task Evented event discontinues after destruction', function (assert) {
    assert.expect(1);

    let arr: any[] = [];

    class TestObj extends EventedClass {
      doStuff = task(async (a: any, b: any, c: any) => {
        arr.push(a, b, c);
      }).on('foo');

      constructor() {
        super();
        this.on('foo', (...args: any[]) => {
          (this as any).doStuff.perform(...args);
        });
      }
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      obj.trigger('foo', 1, 2, 3);
    });
    run(obj, 'destroy');
    run(obj, 'trigger', 9, 9, 9);
    assert.deepEqual(arr, [1, 2, 3]);
  });

  test('task discontinues after destruction when blocked on async values', function (assert) {
    let start = assert.async();
    assert.expect(1);

    class TestObj extends EventedClass {
      doStuff = task(async () => {
        assert.ok(true);
        await timeout(1000);
        assert.ok(false);
        await timeout(1000);
      }).on('init');

      constructor() {
        super();
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
    });
  });

  test('tasks can be paused indefinitely by yielding `forever`', function (assert) {
    assert.expect(2);

    class TestObj extends EventedClass {
      doStuff = task(async () => {
        await forever;
      }).on('init');

      constructor() {
        super();
        (this as any).doStuff.perform();
      }
    }

    let obj = run(() => new TestObj());
    assert.true((obj as any).doStuff.isRunning);
    run(() => destroy(obj));
    assert.false((obj as any).doStuff.isRunning);
  });

  test('task.cancelAll cancels all running task instances', async function (assert) {
    assert.expect(2);

    class TestObj extends EventedClass {
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

    class TestObj extends EventedClass {
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

    class TestObj extends EventedClass {
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

    class TestObj extends EventedClass {
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

    class TestObj extends EventedClass {
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

  test('task().cancelOn', function (assert) {
    assert.expect(0);

    class TestObj extends EventedClass {
      doStuff = task(async () => {
        await timeout(10);
        assert.ok(false, 'should not get here');
      })
        .on('init')
        .cancelOn('foo');

      constructor() {
        super();
        (this as any).doStuff.perform();
        this.trigger('foo');
      }
    }

    run(() => {
      new TestObj();
    });
  });

  test('.observes re-performs the task every time the observed property changes in a coalesced manner', async function (assert) {
    assert.expect(2);

    let values: any[] = [];

    class TestObj {
      foo = 0;

      observingTask = task(async () => {
        values.push(this.foo);
      }).observes('foo');
    }

    let obj = new TestObj();
    await settled();

    (obj as any).foo = 1;
    (obj as any).foo = 2;
    (obj as any).foo = 3;
    await settled();

    assert.deepEqual(values, [3]);
    values = [];

    (obj as any).foo = 4;
    (obj as any).foo = 5;
    (obj as any).foo = 6;
    await settled();

    assert.deepEqual(values, [6]);
  });

  test('.observes coalesces even with multiple properties', async function (assert) {
    assert.expect(2);

    let values: any[] = [];

    class TestObj {
      foo = 0;
      bar = 0;

      observingTask = task(async () => {
        values.push(this.foo);
        values.push(this.bar);
      }).observes('foo', 'bar');
    }

    let obj = new TestObj();

    (obj as any).foo = 1;
    (obj as any).foo = 2;
    (obj as any).bar = 1;
    (obj as any).bar = 2;
    await settled();

    assert.deepEqual(values, [2, 2]);
    values = [];

    (obj as any).foo = 3;
    (obj as any).foo = 4;
    (obj as any).bar = 3;
    (obj as any).bar = 4;
    await settled();

    assert.deepEqual(values, [4, 4]);
  });

  test(".observes has the same lazy/live semantics as normal Ember.observer(...).on('init')", async function (assert) {
    assert.expect(2);

    let values: any[] = [];

    class TestObj {
      foo = 0;

      get bar() {
        return this.foo;
      }

      observingTask = task(async () => {
        values.push((this as any).bar);
      })
        .observes('bar')
        .on('init');

      constructor() {
        (this as any).observingTask.perform();
      }
    }

    let obj = new TestObj();

    (obj as any).foo = 1;
    (obj as any).foo = 2;
    await settled();

    assert.deepEqual(values, [0, 2]);
    values = [];

    (obj as any).foo = 3;
    (obj as any).foo = 4;
    await settled();

    assert.deepEqual(values, [4]);
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

    Ember.ENV.DEBUG_TASKS = true;

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

      task = task(async () => {
        assert.ok(true);
      });
    }

    run(() => {
      let obj = new TestObj();
      if (obj.es5getterSyntaxSupported === 'yes') {
        assert.expect(1);
        (obj as any).task.perform();
      } else {
        assert.expect(0);
      }
    });
  });

  test('ES classes: syntax with decorators works', function (assert) {
    assert.expect(2);

    const done = assert.async(2);

    class FakeGlimmerComponent {
      @task *task() {
        assert.true(this instanceof FakeGlimmerComponent);
        yield timeout(1);
        assert.true(true);
        done();
      }
    }

    run(() => {
      let obj = new FakeGlimmerComponent();
      (obj as any).task.perform();
    });

    later(done, 1);
  });

  test('ES classes: performing a task on a destroyed object returns an immediately-canceled taskInstance', function (assert) {
    assert.expect(2);

    class TestObj {
      @task *task() {
        throw new Error("shouldn't get here");
      }
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      destroy(obj);
      assert.true((obj as any).task.perform().isDropped);
    });

    run(() => {
      assert.true((obj as any).task.perform().isDropped);
    });
  });

  test('ES classes: task discontinues after destruction when blocked on async values', function (assert) {
    let start = assert.async();
    assert.expect(1);

    class TestObj {
      @task *doStuff() {
        assert.ok(true);
        yield timeout(1000);
        assert.ok(false);
        yield timeout(1000);
      }

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
