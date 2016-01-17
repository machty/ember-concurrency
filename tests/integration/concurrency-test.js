import Ember from 'ember';
import Task from 'ember-processes/task';
import Dispatcher from 'dummy/services/ember-processes-dispatcher';

module('Unit: Tasks and Concurrency');

test("i can has task", function(assert) {
  assert.ok(Task);
});

test("tasks with unyielding generators run to completion synchronously and hence no concurrency constraints apply", function(assert) {
  assert.expect(10);

  let hostObject = Ember.Object.create();
  let dispatcher = Dispatcher.create();

  function makeTask(genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  let value0 = "none";
  let task0 = makeTask(function * (...args) {
    assert.equal(this, hostObject);
    assert.deepEqual(args, ['abc', 'def']);
    value0 = "one";
  });

  let value1 = "none";
  let task1 = makeTask(function * (...args) {
    assert.equal(this, hostObject);
    assert.deepEqual(args, ['qwe', 'rty']);
    value1 = "one";
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.equal(value0, "none");
  assert.equal(value1, "none");

  Ember.run(() => {
    task0.perform("abc", "def");
    task1.perform("qwe", "rty");
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
});

