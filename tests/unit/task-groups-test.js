import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import EmberObject from '@ember/object';
import { task, taskGroup, forever } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task groups', function() {
  function assertStates(assert, task, isRunning, isQueued, isIdle, suffix) {
    assert.equal(task.get('isRunning'), isRunning, `${task._propertyName} is ${isRunning ? '' : 'not'} running ${suffix}`);
    assert.equal(task.get('isQueued'),  isQueued,  `${task._propertyName} is ${isQueued ? '' : 'not'} queued ${suffix}`);
    assert.equal(task.get('isIdle'),    isIdle,    `${task._propertyName} is ${isIdle ? '' : 'not'} idle ${suffix}`);
  }

  test("task groups allow tasks to share concurrency constraints", function(assert) {
    assert.expect(48);

    let deferA, deferB;
    let Obj = EmberObject.extend({
      tg: taskGroup().enqueue(),

      taskA: task(function * () {
        deferA = RSVP.defer();
        yield deferA.promise;
      }).group('tg'),

      taskB: task(function * () {
        deferB = RSVP.defer();
        yield deferB.promise;
      }).group('tg'),
    });

    let obj, taskA, taskB, suffix, tg;
    run(() => {
      obj = Obj.create();
      tg = obj.get('tg');
      taskA = obj.get('taskA');
      taskB = obj.get('taskB');

      suffix = "before anything has been performed";
      assertStates(assert, tg,    false, false, true, suffix);
      assertStates(assert, taskA, false, false, true, suffix);
      assertStates(assert, taskB, false, false, true, suffix);

      taskA.perform();
    });

    suffix = "after taskA is performed";
    assertStates(assert, tg,    true, false, false, suffix);
    assertStates(assert, taskA, true, false, false, suffix);
    assertStates(assert, taskB, false, false, true, suffix);

    run(taskB, 'perform');

    suffix = "after taskB is performed, but before taskA is finished";
    assertStates(assert, tg,    true, false, false, suffix);
    assertStates(assert, taskA, true, false, false, suffix);
    assertStates(assert, taskB, false, true, false, suffix);
    assert.ok(deferA);
    assert.ok(!deferB);

    run(deferA, deferA.resolve);

    suffix = "after taskA has finished";
    assertStates(assert, tg,    true, false, false, suffix);
    assertStates(assert, taskA, false, false, true, suffix);
    assertStates(assert, taskB, true, false, false, suffix);
    assert.ok(deferB);

    run(deferB, deferB.resolve);

    suffix = "after taskB has finished";
    assertStates(assert, tg,    false, false, true, suffix);
    assertStates(assert, taskA, false, false, true, suffix);
    assertStates(assert, taskB, false, false, true, suffix);
  });

  test("task groups enforce that only one member runs at a time", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      tg: taskGroup(),
      taskA: task(function * () {}).group('tg')
    });

    run(() => {
      assert.equal(Obj.create().get('taskA.group.name'), 'tg');
    });
  });

  function sharedTaskGroupSetup(taskGroupProperty) {
    let Obj = EmberObject.extend({
      tg: taskGroupProperty,

      taskA: task(function * () {
        yield forever;
      }).group('tg'),

      taskB: task(function * () {
        yield forever;
      }).group('tg'),
    });

    let taskA, taskB, tg;
    run(() => {
      let obj = Obj.create();
      tg = obj.get('tg');
      taskA = obj.get('taskA');
      taskB = obj.get('taskB');
      taskA.perform();
      taskB.perform();
    });

    return [taskA, taskB, tg];
  }

  test("enqueued task groups can be canceled", function(assert) {
    assert.expect(18);

    let [taskA, taskB, tg] = sharedTaskGroupSetup(taskGroup().enqueue());
    let suffix = "after first run loop";

    assertStates(assert, tg,    true, false, false, suffix);
    assertStates(assert, taskA, true, false, false, suffix);
    assertStates(assert, taskB, false, true, false, suffix);

    run(tg, 'cancelAll');

    suffix = "after tg.cancelAll()";
    assertStates(assert, tg,    false, false, true, suffix);
    assertStates(assert, taskA, false, false, true, suffix);
    assertStates(assert, taskB, false, false, true, suffix);
  });

  test("unmodified task groups can be canceled", function(assert) {
    assert.expect(18);

    let [taskA, taskB, tg] = sharedTaskGroupSetup(taskGroup());
    let suffix = "after first run loop";

    assertStates(assert, tg,    true, false, false, suffix);
    assertStates(assert, taskA, true, false, false, suffix);
    assertStates(assert, taskB, true, false, false, suffix);

    run(tg, 'cancelAll');

    suffix = "after tg.cancelAll()";
    assertStates(assert, tg,    false, false, true, suffix);
    assertStates(assert, taskA, false, false, true, suffix);
    assertStates(assert, taskB, false, false, true, suffix);
  });

  test("task groups return a boolean for isRunning", function(assert) {
    assert.expect(3);

    let defer = RSVP.defer();

    let Obj = EmberObject.extend({
      tg: taskGroup().enqueue(),

      myTask: task(function * () {
        yield defer.promise;
      }).group('tg')
    });

    let obj = Obj.create();
    let tg = obj.get('tg');
    let myTask = obj.get('myTask');
    assert.strictEqual(tg.get('isRunning'), false);
    run(() => myTask.perform());
    assert.strictEqual(tg.get('isRunning'), true);
    run(defer, defer.resolve);
    assert.strictEqual(tg.get('isRunning'), false);
  });

  test("calling cancelAll on a task doesn't cancel other tasks in group", function(assert) {
    assert.expect(6);

    let obj, taskA, taskB, tg;
    let Obj = EmberObject.extend({
      tg: taskGroup(),

      taskA: task(function * () {
        yield forever;
      }).group('tg'),

      taskB: task(function * () {
        yield forever;
      }).group('tg'),
    });

    run(() => {
      obj = Obj.create();
      tg = obj.get('tg');
      taskA = obj.get('taskA');
      taskA.perform();
      taskB = obj.get('taskB');
    });

    function assertRunning() {
      assert.strictEqual(tg.get('isRunning'), true);
      assert.strictEqual(taskA.get('isRunning'), true);
      assert.strictEqual(taskB.get('isRunning'), false);
    }

    assertRunning();

    run(() => obj.get('taskB').cancelAll());

    assertRunning();
  });
});