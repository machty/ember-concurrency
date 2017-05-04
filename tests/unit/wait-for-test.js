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
  assert.expect(4);

  let taskCompleted = false;
  let obj;

  const Obj = EventedObject.extend({
    task: task(function*() {
      let value = yield waitForEvent(this, 'foo');
      assert.equal(value, 123);
      taskCompleted = true;
    })
  });

  run(() => {
    obj = Obj.create();
    obj.get('task').perform();
  });

  run(() => {
    assert.notOk(taskCompleted, 'Task should not have completed');
    assert.ok(obj.has('foo'), 'Object has the event listener');
    obj.trigger('foo', 123);
  });

  assert.ok(taskCompleted, 'Task should have completed');
});

test('canceling waitForEvent works', function(assert) {
  assert.expect(4);

  let taskCompleted = false;
  let obj;

  const Obj = EventedObject.extend({
    task: task(function*() {
      yield waitForEvent(this, 'foo');
      taskCompleted = true;
    })
  });

  run(() => {
    obj = Obj.create();
    obj.get('task').perform();
  });

  run(() => {
    assert.notOk(taskCompleted, 'Task should not have completed');
    assert.ok(obj.has('foo'), 'Object has the event listener');
    obj.get('task').cancelAll();
    obj.trigger('foo');
  });

  assert.notOk(obj.has('foo'), 'Object does not have the event listener');
  assert.notOk(taskCompleted, 'Task should not have completed');
});
