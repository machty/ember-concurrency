import Ember from 'ember';
import { task, interval } from 'ember-concurrency';

module('Unit: task');

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
  QUnit.stop();
  assert.expect(1);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      assert.ok(true);
      yield interval(1000);
      assert.ok(false);
      yield interval(1000);
    }).on('init'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run.later(() => {
    obj.destroy();
    QUnit.start();
  });
});

test("task.cancelAll cancels all running task instances", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
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
});

test("task().cancelOn", function(assert) {
  assert.expect(0);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: task(function * () {
      assert.ok(false, "should not get here");
    }).on('init').cancelOn('foo'),
  });

  Ember.run(() => {
    Obj.create().trigger('foo');
  });
});

test(".performs() links two tasks such that if the target task next perform will fail, the calling task will immediately drop", function(assert) {
  assert.expect(13);

  let defer;
  let canCallBar = false;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      defer = Ember.RSVP.defer();
      yield defer.promise;
    }).drop(),

    bar: task(function * () {
      assert.ok(canCallBar, "bar shouldn't be called at this time");
    }).performs('foo'),
  });

  let obj, error;
  Ember.run(() => {
    obj = Obj.create();
    assert.equal(obj.get('foo.isRunning'), false);
    assert.equal(obj.get('bar.isRunning'), false);
    assert.equal(obj.get('foo.nextPerformState'), 'succeed');
    assert.equal(obj.get('bar.nextPerformState'), 'succeed');
    obj.get('foo').perform();
    assert.equal(obj.get('bar.nextPerformState'), 'drop');
    obj.get('bar').perform().catch(e => {
      error = e;
    });
  });

  assert.equal(error.name, 'TaskCancelation');
  assert.equal(obj.get('foo.isRunning'), true);
  assert.equal(obj.get('bar.isRunning'), false);
  Ember.run(defer.resolve);
  assert.equal(obj.get('foo.isRunning'), false);
  assert.equal(obj.get('bar.isRunning'), false);
  assert.equal(obj.get('foo.nextPerformState'), 'succeed');
  assert.equal(obj.get('bar.nextPerformState'), 'succeed');
  canCallBar = true;
  Ember.run(() => {
    obj.get('bar').perform();
  });
});

test(".performs() allows caller's perform to succeed when maxConcurrency isn't constraining", function(assert) {
  assert.expect(4);

  let defer;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      defer = defer || Ember.RSVP.defer();
      yield defer.promise;
    }),

    bar: task(function * () {
      yield this.get('foo').perform();
    }).performs('foo'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('foo').perform();
    obj.get('bar').perform();
  });

  assert.equal(obj.get('foo.concurrency'), 2);
  assert.equal(obj.get('bar.concurrency'), 1);
  Ember.run(defer.resolve);
  assert.equal(obj.get('foo.concurrency'), 0);
  assert.equal(obj.get('bar.concurrency'), 0);
});

test(".performs() allows caller's perform to succeed when maxConcurrency isn't constraining", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    foo: task(function * () {
      throw new Error("wat");
    }),
  });

  try {
    Ember.run(() => {
      Obj.create().get('foo').perform();
    });
  } catch(e) {
    assert.equal(e.message, "wat");
  }
});

