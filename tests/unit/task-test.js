import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

const originalLog = Ember.Logger.log;
module('Unit: task', {
  afterEach() {
    Ember.Logger.log = originalLog;
    Ember.ENV.DEBUG_TASKS = false;
  }
});

test("task init", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    oldschool: task(function * () {
      assert.ok(this instanceof Obj);
    }).on('init'),

    newschool: task(function * () {
      assert.ok(this instanceof Obj);
      yield 1;
      yield 1;
      yield 1;
      assert.ok(true, "done");
    }).on('init'),
  });

  Ember.run(() => {
    Obj.create();
  });
});

test("task Evented event", function(assert) {
  assert.expect(1);

  let arr = [];
  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * (a,b,c) {
      arr.push(a,b,c);
    }).on('foo'),
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.trigger('foo', 1, 2, 3);
    obj.trigger('foo', 4, 5, 6);
    obj.trigger('foo', 7, 8, 9);
  });
  assert.deepEqual(arr, [1,2,3,4,5,6,7,8,9]);
});

test("task Evented event discontinues after destruction", function(assert) {
  assert.expect(1);

  let arr = [];
  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * (a,b,c) {
      arr.push(a,b,c);
    }).on('foo'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.trigger('foo', 1, 2, 3);
  });
  Ember.run(obj, 'destroy');
  Ember.run(obj, 'trigger', 9, 9, 9);
  assert.deepEqual(arr, [1,2,3]);
});

test("task discontinues after destruction when blocked on async values", function(assert) {
  let start = assert.async();
  assert.expect(1);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      assert.ok(true);
      yield timeout(1000);
      assert.ok(false);
      yield timeout(1000);
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run.later(() => {
    obj.destroy();
    start();
  });
});

test("task.cancelAll cancels all running task instances", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      yield timeout(1);
      assert.ok(false, "should not get here");
    }),
  });

  let instances;
  Ember.run(() => {
    let obj = Obj.create();
    let task = obj.get('doStuff');
    instances = Ember.A([ task.perform(), task.perform(), task.perform() ]);
    task.cancelAll();
  });

  assert.deepEqual(instances.mapBy('isCanceled'), [true, true, true]);
  assert.equal(instances[0].get('cancelReason'), "TaskInstance 'doStuff' was canceled because .cancelAll() was explicitly called on the Task. For more information, see: http://ember-concurrency.com/#/docs/task-cancelation-help");
});

test("cancelation due to task modifier supplies useful message", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      yield timeout(1);
    }).restartable(),
  });

  let instances;
  Ember.run(() => {
    let obj = Obj.create();
    let task = obj.get('doStuff');
    instances = Ember.A([ task.perform(), task.perform(), task.perform() ]);
  });

  assert.deepEqual(instances.mapBy('isCanceled'), [true, true, false]);
  assert.equal(instances[0].get('cancelReason'), "TaskInstance 'doStuff' was canceled because it belongs to a 'restartable' Task that was .perform()ed again. For more information, see: http://ember-concurrency.com/#/docs/task-cancelation-help");
});

test("tasks can call cancelAll() on themselves", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      this.get('doStuff').cancelAll();
      return 123;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.ok(obj.get('doStuff.last.isCanceled'));
});

test("task().cancelOn", function(assert) {
  assert.expect(0);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      yield timeout(10);
      assert.ok(false, "should not get here");
    }).on('init').cancelOn('foo'),
  });

  Ember.run(() => {
    Obj.create().trigger('foo');
  });
});

test(".observes re-performs the task every time the observed property changes in a coalesced manner", function(assert) {
  assert.expect(2);

  let values = [];
  let Obj = Ember.Object.extend({
    foo: 0,

    observingTask: task(function * () {
      values.push(this.get('foo'));
    }).observes('foo'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run(() => {
    obj.set('foo', 1);
    obj.set('foo', 2);
    obj.set('foo', 3);
  });

  assert.deepEqual(values, [3]);
  values = [];

  Ember.run(() => {
    obj.set('foo', 4);
    obj.set('foo', 5);
    obj.set('foo', 6);
  });

  assert.deepEqual(values, [6]);
});

test(".observes coalesces even with multiple properties", function(assert) {
  assert.expect(2);

  let values = [];
  let Obj = Ember.Object.extend({
    foo: 0,
    bar: 0,

    observingTask: task(function * () {
      values.push(this.get('foo'));
      values.push(this.get('bar'));
    }).observes('foo', 'bar'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run(() => {
    obj.set('foo', 1);
    obj.set('foo', 2);
    obj.set('bar', 1);
    obj.set('bar', 2);
  });

  assert.deepEqual(values, [2,2]);
  values = [];

  Ember.run(() => {
    obj.set('foo', 3);
    obj.set('foo', 4);
    obj.set('bar', 3);
    obj.set('bar', 4);
  });

  assert.deepEqual(values, [4,4]);
});


test(".observes has the same lazy/live semantics as normal Ember.observer(...).on('init')", function(assert) {
  assert.expect(2);

  let values = [];
  let Obj = Ember.Object.extend({
    foo: 0,
    bar: Ember.computed('foo', function() {
      return this.get('foo');
    }),

    observingTask: task(function * () {
      values.push(this.get('bar'));
    }).observes('bar').on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run(() => {
    obj.set('foo', 1);
    obj.set('foo', 2);
  });

  assert.deepEqual(values, [0,2]);
  values = [];

  Ember.run(() => {
    obj.set('foo', 3);
    obj.set('foo', 4);
  });

  assert.deepEqual(values, [4]);
});

test("performing a task on a destroyed object returns an immediately-canceled taskInstance", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    myTask: task(function * () {
      throw new Error("shouldn't get here");
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.destroy();
    assert.equal(obj.get('myTask').perform().get('isDropped'), true);
  });

  Ember.run(() => {
    assert.equal(obj.get('myTask').perform().get('isDropped'), true);
  });
});

test("handles prototype-less object args", function(assert) {
  assert.expect(0);

  let Obj = Ember.Object.extend({
    doStuff: task(function * () {})
  });

  Ember.run(() => {
    Obj.create().get('doStuff').perform(Object.create(null));
  });
});

test("updates derived state synchronously", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      assert.ok(this.get('doStuff.isRunning'), "Expected to see self running");
    })
  });

  Ember.run(() => {
    Obj.create().get('doStuff').perform();
  });
});

test(".performCount exposes the number of times a task has been performed", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    doStuff: task(function * () { })
  });

  Ember.run(() => {
    let obj = Obj.create();
    let doStuff = obj.get('doStuff');
    assert.equal(doStuff.get('performCount'), 0);
    doStuff.perform();
    assert.equal(doStuff.get('performCount'), 1);
    doStuff.perform();
    doStuff.perform();
    assert.equal(doStuff.get('performCount'), 3);
  });
});

test("call stack stays within reasonable bounds", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    a: task(function * () {
      yield this.get('b').perform();

      // Not sure how to test this in an automated fashion;
      // when we tweak scheduler logic, we can check that stack
      // traces are within reasonable bounds by uncommenting
      // the line below. (I'd use Error.stack but Chrome truncates
      // the stack to only a few frames).
      // debugger;
    }),
    b: task(function * () {
      yield this.get('c').perform();
    }),
    c: task(function * () {
      yield this.get('d').perform();
    }),
    d: task(function * () { }),
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.get('a').perform();
  });
  assert.ok(true);
});

test(".debug() enables basic debugging", function(assert) {
  assert.expect(1);

  let logs = [];
  Ember.Logger.log = (...args) => {
    logs.push(args);
  };

  let Obj = Ember.Object.extend({
    a: task(function * () {
      yield Ember.RSVP.defer().promise;
    }).debug()
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.get('a').perform();
    obj.destroy();
  });

  assert.deepEqual(logs, [
    [
      "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/#/docs/task-cancelation-help"
    ]
  ]);
});

test("Ember.ENV.DEBUG_TASKS=true enables basic debugging", function(assert) {
  assert.expect(1);

  Ember.ENV.DEBUG_TASKS = true;

  let logs = [];
  Ember.Logger.log = (...args) => {
    logs.push(args);
  };

  let Obj = Ember.Object.extend({
    a: task(function * () {
      yield Ember.RSVP.defer().promise;
    }),
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.get('a').perform();
    obj.destroy();
  });

  assert.deepEqual(logs, [
    [
      "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/#/docs/task-cancelation-help"
    ]
  ]);
});

test("helpful errors when calling this.taskName.perform()", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    a: task(function * () { })
  });

  Ember.run(() => {
    let obj = Obj.create();
    try {
      obj.a.perform();
    } catch(e) {
      assert.equal(e.message, "It looks like you tried to perform a task via `this.nameOfTask.perform()`, which isn't supported. Use `this.get('nameOfTask').perform()` instead.");
    }
  });
});

