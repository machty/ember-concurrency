import Ember from 'ember';
import { module, test } from 'qunit';
import { task, waitForQueue, waitForEvent } from 'ember-concurrency';

const EventedObject = Ember.Object.extend(Ember.Evented);

const {
  run
} = Ember;

module('Unit: test waitForQueue and waitForEvent');

test('waitForQueue works', function(assert) {
  assert.expect(2);

  let taskCompleted = false;
  const Obj = Ember.Object.extend({
    task: task(function*() {
      yield waitForQueue('afterRender');
      taskCompleted = true;
    })
  });

  run(() => {
    let obj = Obj.create();
    obj.get('task').perform();
    assert.notOk(taskCompleted, 'Task should not have completed');
  });

  assert.ok(taskCompleted, 'Task should have completed');
});

test('cancelling waitForQueue works', function(assert) {
  assert.expect(2);

  let taskCompleted = false;
  const Obj = Ember.Object.extend({
    task: task(function*() {
      yield waitForQueue('afterRender');
      taskCompleted = true;
    })
  });

  run(() => {
    let obj = Obj.create();
    obj.get('task').perform();
    assert.notOk(taskCompleted, 'Task should not have completed');
    obj.get('task').cancelAll();
  });

  assert.notOk(taskCompleted, 'Task should not have completed');
});

test('waitForEvent works', function(assert) {
  assert.expect(2);

  let taskCompleted = false;
  const Obj = EventedObject.extend({
    task: task(function*() {
      yield waitForEvent(this, 'foo');
      taskCompleted = true;
    })
  });

  run(() => {
    let obj = Obj.create();
    obj.get('task').perform();
    assert.notOk(taskCompleted, 'Task should not have completed');
    obj.trigger('foo');
  });

  assert.ok(taskCompleted, 'Task should have completed');
});

test('cancelling waitForEvent works', function(assert) {
  assert.expect(2);

  let taskCompleted = false;
  const Obj = EventedObject.extend({
    task: task(function*() {
      yield waitForEvent(this, 'foo');
      taskCompleted = true;
    })
  });

  run(() => {
    let obj = Obj.create();
    obj.get('task').perform();
    assert.notOk(taskCompleted, 'Task should not have completed');
    obj.get('task').cancelAll();
    obj.trigger('foo');
  });

  assert.notOk(taskCompleted, 'Task should not have completed');
});
