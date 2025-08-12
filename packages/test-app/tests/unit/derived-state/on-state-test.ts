import { run } from '@ember/runloop';
import { forever, task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task states - onState', function () {
  test('task state-tracking can be configured with .onState()', function (assert) {
    assert.expect(9);

    let obj: any, taskInstance: any;
    let states: any[] = [];

    function onState(state: any, task: any) {
      assert.deepEqual(obj.myTask, task);
      assert.deepEqual(task.context, obj);
      states.push(state);
    }

    class TestObj {
      myTask = task({ onState }, async () => {
        await forever;
      });
    }

    run(() => {
      obj = new TestObj();
      taskInstance = obj.myTask.perform();
      assert.true(obj.myTask.isIdle);
    });

    assert.strictEqual(states.length, 1);
    assert.deepEqual(states.pop(), {
      last: taskInstance,
      lastPerformed: taskInstance,
      lastRunning: taskInstance,
      numQueued: 0,
      numRunning: 1,
      numPerformedInc: 1,
    });

    run(() => obj.myTask.cancelAll());

    assert.strictEqual(states.length, 1);
    assert.deepEqual(states.pop(), {
      lastRunning: null,
      lastCanceled: taskInstance,
      lastComplete: taskInstance,
      lastIncomplete: taskInstance,
      numQueued: 0,
      numRunning: 0,
      numPerformedInc: 0,
    });
  });

  test('task state-tracking can be completely disabled with .onState(null)', function (assert) {
    assert.expect(1);

    let obj: any;

    class TestObj {
      myTask = task({ onState: null }, async () => {
        await forever;
      });
    }

    run(() => {
      obj = new TestObj();
      obj.myTask.perform();
      assert.true(obj.myTask.isIdle);
    });
  });

  test("the task scheduler doesn't rely on state tracking functionality in order to work", function (assert) {
    assert.expect(1);

    let obj: any;

    class TestObj {
      a = task({ onState: null }, async () => {});
    }

    let taskInstances: any[] = [];
    run(() => {
      obj = new TestObj();
      taskInstances.push(obj.a.perform());
    });

    run(() => {
      taskInstances.push(obj.a.perform());
    });

    let states = taskInstances.map((ti) => ti.state);
    assert.deepEqual(states, ['finished', 'finished']);
  });
});
