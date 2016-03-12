import Ember from 'ember';
import { task, taskGroup } from 'ember-concurrency';

module('Unit: task groups');

function assertStates(task, isRunning, isQueued, isIdle, suffix) {
  QUnit.equal(task.get('isRunning'), isRunning, `${task._propertyName} is ${isRunning ? '' : 'not'} running ${suffix}`);
  QUnit.equal(task.get('isQueued'),  isQueued,  `${task._propertyName} is ${isQueued ? '' : 'not'} queued ${suffix}`);
  QUnit.equal(task.get('isIdle'),    isIdle,    `${task._propertyName} is ${isIdle ? '' : 'not'} idle ${suffix}`);
}

test("task groups enforce that only one member runs at a time", function(assert) {
  assert.expect(33);

  let deferA, deferB;
  let Obj = Ember.Object.extend({
    tg: taskGroup(),

    taskA: task(function * () {
      deferA = Ember.RSVP.defer();
      yield deferA.promise;
    }).group('tg'),

    taskB: task(function * () {
      deferB = Ember.RSVP.defer();
      yield deferB.promise;
    }).group('tg'),
  });

  let obj, taskA, taskB, suffix;
  Ember.run(() => {
    obj = Obj.create();
    taskA = obj.get('taskA');
    taskB = obj.get('taskB');

    suffix = "before anything has been performed";
    assertStates(taskA, false, false, true, suffix);
    assertStates(taskB, false, false, true, suffix);

    taskA.perform();
  });

  suffix = "after taskA is performed";
  assertStates(taskA, true, false, false, suffix);
  assertStates(taskB, false, false, true, suffix);

  Ember.run(taskB, 'perform');

  suffix = "after taskB is performed, but before taskA is finished";
  assertStates(taskA, true, false, false, suffix);
  assertStates(taskB, false, true, false, suffix);
  assert.ok(deferA);
  assert.ok(!deferB);

  Ember.run(deferA, deferA.resolve);

  suffix = "after taskA has finished";
  assertStates(taskA, false, false, true, suffix);
  assertStates(taskB, true, false, false, suffix);
  assert.ok(deferB);

  Ember.run(deferB, deferB.resolve);

  suffix = "after taskB has finished";
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


