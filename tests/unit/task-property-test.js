import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

let taskRunCounter = 0;
function taskCounterWrapper(taskProperty) {
  let originalTaskFn = taskProperty.taskFn;

  taskProperty.taskFn = function * (...args) {
    taskRunCounter += 1;
    try {
      return yield * originalTaskFn.apply(this, args);
    } finally {
      taskRunCounter -= 1;
    }
  };

  return taskProperty;
}

module('Unit: task property');

test("`TaskProperty`s can be extended with custom functionality / decoration", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: taskCounterWrapper(task(function * () {
      yield Ember.RSVP.defer().promise;
    }))
  });

  let obj;

  assert.equal(taskRunCounter, 0);

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.equal(taskRunCounter, 1);

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.equal(taskRunCounter, 2);

  Ember.run(() => {
    obj.get('doStuff').cancelAll();
  });

  assert.equal(taskRunCounter, 0);
});

