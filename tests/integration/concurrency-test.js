import Ember from 'ember';
import Task from 'ember-processes/task';
import Dispatcher from 'dummy/services/ember-processes-dispatcher';

module('Unit: Tasks and Concurrency');

test("i can has task", function(assert) {
  assert.ok(Task);
});

test("tasks with unyielding generators run to completion synchronously and hence no concurrency constraints apply", function(assert) {
  assert.expect(16);

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
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
  assert.equal(value0, "none");
  assert.equal(value1, "none");

  Ember.run(() => {
    task0.perform("abc", "def");
    task1.perform("qwe", "rty");
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
  assert.equal(value0, "one");
  assert.equal(value1, "one");
});

test("default constraints: enforce full serialization", function(assert) {
  assert.expect(8);

  let defer = Ember.RSVP.defer();
  let hostObject;
  let dispatcher;
  Ember.run(() => {
    hostObject = Ember.Object.create();
    dispatcher = Dispatcher.create();
  });

  let task0, task1;
  function makeTask(genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  Ember.run(() => {
    task0 = makeTask(function * () {
      yield defer.promise;
    });

    task1 = makeTask(function * () {
      return 123;
    });

    task0.perform();
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));
  assert.ok(task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));

  Ember.run(() => {
    defer.resolve(5);
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
});


