import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task, forever, taskGroup } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task states - onState', function() {
  test("task state-tracking can be configured with .onState()", function(assert) {
    assert.expect(9);

    let obj, taskInstance;
    let states = [];

    let Obj = EmberObject.extend({
      myTask: task(function * () {
        yield forever;
      }).onState((task, state, object) => {
        assert.equal(obj, object);
        assert.equal(obj.get('myTask'), task);
        states.push(state);
      }),
    });

    run(() => {
      obj = Obj.create();
      taskInstance = obj.get('myTask').perform();
      assert.equal(obj.get('myTask.isIdle'), true);
    });

    assert.equal(states.length, 1);
    assert.deepEqual(states.pop(), {
      last: taskInstance,
      lastPerformed: taskInstance,
      lastRunning: taskInstance,
      numQueued: 0,
      numRunning: 1,
      performCount: 1,
    })

    run(() => obj.get('myTask').cancelAll());

    assert.equal(states.length, 1);
    assert.deepEqual(states.pop(), {
      lastCanceled: taskInstance,
      lastComplete: taskInstance,
      lastIncomplete: taskInstance,
      numQueued: 0,
      numRunning: 0,
      performCount: 0,
    })
  });

  test("task state-tracking can be completely disabled with .onState(null)", function(assert) {
    assert.expect(1);

    let obj;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        yield forever;
      }).onState(null),
    });

    run(() => {
      obj = Obj.create();
      obj.get('myTask').perform();
      assert.equal(obj.get('myTask.isIdle'), true);
    });
  });

  test("passing .onState(null) on root task group disables state tracking for all", function(assert) {
    assert.expect(1);

    let fn = function * () { yield forever };
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
      obj.get('b').perform();
    });

    assert.deepEqual(changes, []);
  });

  test("passing .onState(null) on non-root group tasks continues state tracking for all others", function(assert) {
    assert.expect(1);

    let fn = function * () { yield forever };
    let changes = [];
    let onState = task => changes.push(task._propertyName);

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
      obj.get('a').perform();
      obj.get('b').perform();
    });

    assert.deepEqual(changes, ["a", "gg2", "gg3", "a", "gg2", "gg3"]);
  });
});
