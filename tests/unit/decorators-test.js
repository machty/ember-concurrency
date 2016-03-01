import Ember from 'ember';
import { task, interval, drop, restartable, enqueue, maxConcurrency } from 'ember-concurrency';
import {
  enqueueTasksPolicy,
  dropQueuedTasksPolicy,
  cancelOngoingTasksPolicy,
} from 'ember-concurrency/-buffer-policy';

const decorators = [
  [drop, dropQueuedTasksPolicy],
  [enqueue, enqueueTasksPolicy],
  [restartable, cancelOngoingTasksPolicy],
];

module('Unit: decorators');

decorators.forEach(([decorator, bufferPolicy]) => {
  test(`task accepts ${decorator.name} as a decorator arg`, function(assert) {
    assert.expect(1);

    let Obj = Ember.Object.extend({
      myTask: task(decorator(), function * () { }),
    });

    Ember.run(() => {
      let obj = Obj.create();
      let task = obj.get('myTask');
      assert.equal(task.bufferPolicy, bufferPolicy);
    });
  });
});

test(`task accepts maxConcurrency as a decorator arg`, function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    myTask: task(maxConcurrency(5), function * () { }),
  });

  Ember.run(() => {
    let obj = Obj.create();
    let task = obj.get('myTask');
    assert.equal(task._maxConcurrency, 5);
  });
});



