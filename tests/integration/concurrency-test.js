import Ember from 'ember';
import Task from 'ember-concurrency/task';
import Dispatcher from 'dummy/services/ember-concurrency-dispatcher';

module('Integration: Tasks and Concurrency');

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
  });

  Ember.run(() => {
    task1.perform("qwe", "rty");
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
  assert.equal(value0, "one");
  assert.equal(value1, "one");
});

test("two tasks can run at the same time", function(assert) {
  QUnit.stop();
  QUnit.stop();

  assert.expect(10);

  let defer0 = Ember.RSVP.defer();
  let defer1 = Ember.RSVP.defer();
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
      let val = yield defer0.promise;
      return val;
    });

    task1 = makeTask(function * () {
      let val = yield defer1.promise;
      return val;
    });

    task0.perform().then(v => {
      assert.equal(v, 5);
      QUnit.start();
    });
    task1.perform().then(v => {
      assert.equal(v, 6);
      QUnit.start();
    });
  });

  assert.ok(!task0.get('isPerformable'), "task0 shouldn't be performable because it is running");
  assert.ok(!task1.get('isPerformable'));
  assert.ok(task0.get('isRunning'));
  assert.ok(task1.get('isRunning'));

  Ember.run(() => {
    defer0.resolve(5);
    defer1.resolve(6);
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
});

test("destroying host objects frees up other tasks to perform", function(assert) {
  assert.expect(12);

  let defer = Ember.RSVP.defer();
  let hostObject;
  let dispatcher;
  Ember.run(() => {
    hostObject = Ember.Object.create();
    dispatcher = Dispatcher.create();
  });

  let task0, task1, task2;
  let task1DidClose = false;
  Ember.run(() => {
    task0 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: function * () {}
    });

    task1 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _depTask: task0,
      _genFn: function * () {
        try {
          yield defer.promise;
        } finally {
          task1DidClose = true;
        }
      }
    });

    task2 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _depTask: task0,
      _genFn: function * () {}
    });
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(task2.get('isPerformable'));

  Ember.run(() => {
    task1.perform();
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));
  assert.ok(!task2.get('isPerformable'));

  assert.ok(task0.get('isRunning'));
  assert.ok(task1.get('isRunning'));
  assert.ok(!task2.get('isRunning'));

  Ember.run(() => {
    // TODO: test object destruction; right now it only attaches via the task CP
    // hostObject.destroy();
    task1.destroy();
  });

  assert.ok(task0.get('isPerformable'));
  assert.equal(task1DidClose, true);
  assert.ok(task2.get('isPerformable'));

  // TODO: define behavior for destroying a dep task?
  // Seems like dependers should no longer be runnable.
});

test("dependent tasks", function(assert) {
  assert.expect(16);

  let hostObject = Ember.Object.create();
  let dispatcher = Dispatcher.create();

  let defer = Ember.RSVP.defer();
  let task0, task1, task2;
  Ember.run(() => {
    task0 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: function * (c, d) {
        assert.equal(c, 'c');
        assert.equal(d, 'd');
        let val = yield defer.promise;
        return val;
      },
    });

    task1 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: function * (a, b) {
        assert.equal(a, 123);
        assert.equal(b, 456);
        let val = yield task0.perform('c', 'd');
        return val;
      },
      _depTask: task0,
    });

    task2 = Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: function * () { },
      _depTask: task1,
    });
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(task2.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
  assert.ok(!task2.get('isRunning'));

  Ember.run(() => {
    task1.perform(123, 456);
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));
  assert.ok(!task2.get('isPerformable'));
  assert.ok(task0.get('isRunning'));
  assert.ok(task1.get('isRunning'));
  assert.ok(!task2.get('isRunning'));
});

