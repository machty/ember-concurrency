import Ember from 'ember';
import { task, taskGroup, interval } from 'ember-concurrency';

module('Unit: task groups');

test("task groups enforce that only one member runs at a time", function(assert) {
  assert.expect(3);

  let deferA, deferB;
  let Obj = Ember.Object.extend({
    tg: taskGroup(),

    a: task(function * () {
      deferA = Ember.RSVP.defer();
      yield deferA.promise;
    }).group('tg'),

    b: task(function * () {
      deferB = Ember.RSVP.defer();
      yield deferB.promise;
    }).group('tg'),
  });

  let obj, taskA, taskB;
  Ember.run(() => {
    obj = Obj.create();
    taskA = obj.get('taskA');
    taskB = obj.get('taskB');

    taskA.perform();
    taskB.perform();

    assert.equal(taskA.get('isRunning'),  true);
    assert.equal(taskB.get('isRunning'),  true);
    assert.equal(taskA.get('isEnqueued'), false);
    assert.equal(taskB.get('isEnqueued'), true);
  });
});

