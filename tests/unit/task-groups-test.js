import Ember from 'ember';
import { task, taskGroup } from 'ember-concurrency';

module('Unit: task groups');

function assertStates(task, isRunning, isQueued, isIdle, suffix) {
  QUnit.equal(task.get('isRunning'), isRunning, `${task._propertyName} is ${isRunning ? '' : 'not'} running ${suffix}`);
  QUnit.equal(task.get('isQueued'),  isQueued,  `${task._propertyName} is ${isQueued ? '' : 'not'} queued ${suffix}`);
  QUnit.equal(task.get('isIdle'),    isIdle,    `${task._propertyName} is ${isIdle ? '' : 'not'} idle ${suffix}`);
}

test("task groups allow tasks to share concurrency constraints", function(assert) {
  assert.expect(48);

  let deferA, deferB;
  let Obj = Ember.Object.extend({
    tg: taskGroup().enqueue(),

    taskA: task(function * () {
      deferA = Ember.RSVP.defer();
      yield deferA.promise;
    }).group('tg'),

    taskB: task(function * () {
      deferB = Ember.RSVP.defer();
      yield deferB.promise;
    }).group('tg'),
  });

  let obj, taskA, taskB, suffix, tg;
  Ember.run(() => {
    obj = Obj.create();
    tg = obj.get('tg');
    taskA = obj.get('taskA');
    taskB = obj.get('taskB');

    suffix = "before anything has been performed";
    assertStates(tg,    false, false, true, suffix);
    assertStates(taskA, false, false, true, suffix);
    assertStates(taskB, false, false, true, suffix);

    taskA.perform();
  });

  suffix = "after taskA is performed";
  assertStates(tg,    true, false, false, suffix);
  assertStates(taskA, true, false, false, suffix);
  assertStates(taskB, false, false, true, suffix);

  Ember.run(taskB, 'perform');

  suffix = "after taskB is performed, but before taskA is finished";
  assertStates(tg,    true, false, false, suffix);
  assertStates(taskA, true, false, false, suffix);
  assertStates(taskB, false, true, false, suffix);
  assert.ok(deferA);
  assert.ok(!deferB);

  Ember.run(deferA, deferA.resolve);

  suffix = "after taskA has finished";
  assertStates(tg,    true, false, false, suffix);
  assertStates(taskA, false, false, true, suffix);
  assertStates(taskB, true, false, false, suffix);
  assert.ok(deferB);

  Ember.run(deferB, deferB.resolve);

  suffix = "after taskB has finished";
  assertStates(tg,    false, false, true, suffix);
  assertStates(taskA, false, false, true, suffix);
  assertStates(taskB, false, false, true, suffix);
});

test("task groups enforce that only one member runs at a time", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    tg: taskGroup(),
    taskA: task(function * () {}).group('tg')
  });

  Ember.run(() => {
    assert.equal(Obj.create().get('taskA.group.name'), 'tg');
  });
});

test("task groups can be cancelled", function(assert) {
  assert.expect(9);

  let deferA, deferB;
  let Obj = Ember.Object.extend({
    tg: taskGroup().enqueue(),

    taskA: task(function * () {
      deferA = Ember.RSVP.defer();
      yield deferA.promise;
    }).group('tg'),

    taskB: task(function * () {
      deferB = Ember.RSVP.defer();
      yield deferB.promise;
    }).group('tg'),
  });

  let obj, taskA, taskB, suffix, tg;
  Ember.run(() => {
    obj = Obj.create();
    tg = obj.get('tg');
    taskA = obj.get('taskA');
    taskB = obj.get('taskB');
    taskA.perform();
    taskB.perform();
  });

  Ember.run(tg, 'cancelAll');

  suffix = "after tg.cancelAll()";
  assertStates(tg,    false, false, true, suffix);
  assertStates(taskA, false, false, true, suffix);
  assertStates(taskB, false, false, true, suffix);
});

