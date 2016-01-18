import Ember from 'ember';
import Task from 'ember-concurrency/task';
import Dispatcher from 'dummy/services/ember-concurrency-dispatcher';
import { DidNotRunException } from 'ember-concurrency';

module('Unit: Tasks and Concurrency');

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

test("default constraints: enforce full serialization", function(assert) {
  assert.expect(11);

  let defer = Ember.RSVP.defer();
  let hostObject;
  let dispatcher;
  Ember.run(() => {
    hostObject = Ember.Object.create();
    dispatcher = Dispatcher.create();
  });

  let task0, task1, finalValue, error;
  function makeTask(genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  Ember.run(() => {
    task0 = makeTask(function * () {
      let val = yield defer.promise;
      return val;
    });

    task1 = makeTask(function * () {
      assert.ok(false, "should not run");
    });

    task0.perform().then(v => {
      finalValue = v;
    });
    task1.perform().catch(e => {
      error = e;
    });
  });

  assert.ok(!finalValue, "no value yet");
  assert.ok(error instanceof DidNotRunException);

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));
  assert.ok(task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));

  Ember.run(() => {
    defer.resolve(5);
  });

  assert.equal(finalValue, 5);

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
});

test("destroying host objects frees up other tasks to perform", function(assert) {
  assert.expect(7);

  let defer = Ember.RSVP.defer();
  let hostObject0, hostObject1;
  let dispatcher;
  Ember.run(() => {
    hostObject0 = Ember.Object.create();
    hostObject1 = Ember.Object.create();
    dispatcher = Dispatcher.create();
  });

  let task0, task1;
  function makeTask(hostObject, genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  Ember.run(() => {
    task0 = makeTask(hostObject0, function * () {
      yield defer.promise;
    });

    task1 = makeTask(hostObject1, function * (v) {
      return v;
    });
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));

  Ember.run(() => {
    task0.perform();
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));

  Ember.run(() => {
    // TODO: test object destruction; right now it only attaches via the task CP
    // hostObject0.destroy();
    task0.destroy();
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));

  Ember.run(() => {
    task1.perform(123).then(v => {
      assert.equal(v, 123);
    });
  });
});

test("you can map task args to each other via mapArgs", function(assert) {
  assert.expect(13);

  let hostObject = Ember.Object.create();
  let dispatcher = Dispatcher.create();

  function makeTask(genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  let defer = Ember.RSVP.defer();
  let task0 = makeTask(function * (ev) {
    yield defer.promise;
    assert.deepEqual(ev, { a: 'a', b: 'b', c: 'c', d: 'd' });
  });

  let task1 = task0._mapArgs((a,b,c) => ({ a, b, c, d: 'd' }));

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));

  Ember.run(() => {
    task1.perform('a', 'b', 'c');
  });

  assert.ok(!task0.get('isPerformable'));
  assert.ok(!task1.get('isPerformable'));
  assert.ok(task0.get('isRunning'));
  assert.ok(task1.get('isRunning'));

  Ember.run(() => {
    defer.resolve(123);
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
});

test("returning falsy from mapper prevents the task from running", function(assert) {
  assert.expect(9);

  let hostObject = Ember.Object.create();
  let dispatcher = Dispatcher.create();

  function makeTask(genFn) {
    return Task.create({
      _dispatcher: dispatcher,
      _hostObject: hostObject,
      _genFn: genFn,
    });
  }

  let task0 = makeTask(function * () {
    assert.ok(false);
  });

  let task1 = task0._mapArgs(() => null);

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));

  Ember.run(() => {
    task1.perform('a', 'b', 'c').catch(e => {
      assert.ok(e instanceof DidNotRunException);
    });
  });

  assert.ok(task0.get('isPerformable'));
  assert.ok(task1.get('isPerformable'));
  assert.ok(!task0.get('isRunning'));
  assert.ok(!task1.get('isRunning'));
});


