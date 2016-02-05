import Ember from 'ember';
import { interval, _numIntervals } from 'ember-concurrency';

module('Unit: overloaded Ember.on');

const Observable = window.Rx.Observable;

test("Ember.on init", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    oldschool: Ember.on('init', function() {
      assert.ok(this instanceof Obj);
    }),

    newschool: Ember.on('init', function * () {
      assert.ok(this instanceof Obj);
      yield 1;
      yield 1;
      yield 1;
      assert.ok(true, "done");
    }),
  });

  Ember.run(() => {
    Obj.create({ });
  });
});

test("Ember.on Evented event", function(assert) {
  assert.expect(1);

  let arr = [];
  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: Ember.on('foo', function * (a,b,c) {
      arr.push(a,b,c);
    }),
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.trigger('foo', 1, 2, 3);
    obj.trigger('foo', 4, 5, 6);
    obj.trigger('foo', 7, 8, 9);
  });
  assert.deepEqual(arr, [1,2,3,4,5,6,7,8,9]);
});

test("Ember.on Evented event discontinues after destruction", function(assert) {
  assert.expect(1);

  let arr = [];
  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: Ember.on('foo', function * (a,b,c) {
      arr.push(a,b,c);
    }),
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

test("Ember.on discontinues after destruction when blocked on async values", function(assert) {
  QUnit.stop();
  assert.expect(1);

  let Obj = Ember.Object.extend(Ember.Evented, {
    doStuff: Ember.on('init', function * () {
      assert.ok(true);
      yield interval(1000);
      assert.ok(false);
      yield interval(1000);
    }),
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

