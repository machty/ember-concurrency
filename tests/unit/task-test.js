import Ember from 'ember';
import { task, interval } from 'ember-concurrency';

module('Unit: task');

test("task init", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    oldschool: task(function() {
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
    Obj.create({ });
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

test("linked tasks can perform the tasks they're linked to", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    foo: task(function * (v) {
      assert.equal(v, 123);
    }),

    bar: task(function * (v) {
      yield this.get('foo').perform(v);
    }).link('foo'),
  });

  Ember.run(() => {
    Obj.create().get('bar').perform(123);
  });
});


test("linked tasks wat", function(assert) {
  assert.expect(2);

  let defer;
  let Obj = Ember.Object.extend({
    foo: task(function * () {
      defer = Ember.RSVP.defer();
      yield defer.promise;
    }).drop(),

    bar: task(function * () {
      return 123;
    }).link('foo'),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('foo').perform();
    obj.get('bar').perform().catch(e => {
      assert.equal(e.name, 'TaskCancelation');
    });
  });

  Ember.run(null, defer.resolve);

  Ember.run(() => {
    obj.get('bar').perform().then(v => {
      assert.equal(v, 123);
    });
  });
});





