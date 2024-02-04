import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task, forever, taskGroup } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task states - onState', function () {
  test('task state-tracking can be configured with .onState()', function (assert) {
    assert.expect(9);

    let obj, taskInstance;
    let states = [];

    let Obj = EmberObject.extend({
      myTask: task(function* () {
        yield forever;
      }).onState((state, task) => {
        assert.deepEqual(obj.myTask, task);
        assert.deepEqual(task.context, obj);
        states.push(state);
      }),
    });

    run(() => {
      obj = Obj.create();
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

    let obj;
    let Obj = EmberObject.extend({
      myTask: task(function* () {
        yield forever;
      }).onState(null),
    });

    run(() => {
      obj = Obj.create();
      obj.myTask.perform();
      assert.true(obj.myTask.isIdle);
    });
  });

  test('passing .onState(null) on root task group disables state tracking for all', function (assert) {
    assert.expect(1);

    let fn = function* () {
      yield forever;
    };
    let changes = [];
    let onState = (...args) => changes.push(args);

    let Obj = EmberObject.extend({
      a: task(fn).group('gg1').onState(onState),
      b: task(fn).group('gg1').onState(onState),
      c: task(fn).group('gg1').onState(onState),
      gg1: taskGroup().group('gg2').onState(onState),
      gg2: taskGroup().onState(null),
    });

    run(() => {
      let obj = Obj.create();
      obj.b.perform();
    });

    assert.deepEqual(changes, []);
  });

  test('passing .onState(null) on non-root group tasks continues state tracking for all others', function (assert) {
    assert.expect(1);

    let fn = function* () {
      yield forever;
    };
    let changes = [];
    let onState = (_, task) => changes.push(task.name);

    let Obj = EmberObject.extend({
      a: task(fn).group('gg1').onState(onState),
      b: task(fn).group('gg1').onState(null),
      c: task(fn).group('gg1').onState(onState),
      gg1: taskGroup().group('gg2').onState(null),
      gg2: taskGroup().group('gg3').onState(onState),
      gg3: taskGroup().onState(onState),
    });

    run(() => {
      let obj = Obj.create();
      obj.a.perform();
      obj.b.perform();
    });

    assert.deepEqual(changes, ['a', 'gg2', 'gg3', 'a', 'gg2', 'gg3']);
  });

  test("the task schedular doesn't rely on state tracking functionality in order to work", function (assert) {
    assert.expect(1);

    let obj;
    let Obj = EmberObject.extend({
      a: task(function* () {}).onState(null),
    });

    let taskInstances = [];
    run(() => {
      obj = Obj.create();
      taskInstances.push(obj.a.perform());
    });

    run(() => {
      taskInstances.push(obj.a.perform());
    });

    let states = taskInstances.map((ti) => ti.state);
    assert.deepEqual(states, ['finished', 'finished']);
  });
});
