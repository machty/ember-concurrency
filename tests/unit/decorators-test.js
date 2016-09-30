import Ember from 'ember';
import { task, drop, restartable, enqueue, maxConcurrency } from 'ember-concurrency';
import {
  enqueueTasksPolicy,
  dropQueuedTasksPolicy,
  cancelOngoingTasksPolicy,
} from 'ember-concurrency/-buffer-policy';
import { module, test } from 'qunit';


let decorators = { drop, restartable, enqueue };

const decoratorPolicies = [
  ['drop', dropQueuedTasksPolicy],
  ['enqueue', enqueueTasksPolicy],
  ['restartable', cancelOngoingTasksPolicy],
];

module('Unit: decorators');

decoratorPolicies.forEach(([decoratorName, bufferPolicy]) => {
  let decorator = decorators[decoratorName];
  decoratorTest(`${decoratorName}`, decorator, bufferPolicy);
  decoratorTest(`${decoratorName}()`, decorator(), bufferPolicy);
});

function decoratorTest(decoratorName, decorator, bufferPolicy) {
  test(`task accepts ${decoratorName} as a decorator arg`, function(assert) {
    assert.expect(1);

    let Obj = Ember.Object.extend({
      myTask: task(decorator, function * () { }),
    });

    Ember.run(() => {
      let obj = Obj.create();
      let task = obj.get('myTask');
      assert.equal(task._scheduler.bufferPolicy, bufferPolicy);
    });
  });
}

test(`task accepts maxConcurrency as a decorator arg`, function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    myTask: task(enqueue, maxConcurrency(5), function * () { }),
  });

  Ember.run(() => {
    let obj = Obj.create();
    let task = obj.get('myTask');
    assert.equal(task._scheduler.maxConcurrency, 5);
  });
});



