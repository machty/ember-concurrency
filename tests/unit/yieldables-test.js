import Ember from 'ember';
import { task, all, allSettled, hash } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: yieldables');

test("all behaves like Promise.all", function(assert) {
  assert.expect(6);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      let allPromise = all([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
      assert.equal(typeof allPromise.then, 'function');
      let values = yield allPromise;
      assert.deepEqual(values, ['a', 'b', 'c']);
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      let value = yield defer.promise;
      return value;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().resolve('a'));
  assert.equal(childTask.get('concurrency'), 2);
  Ember.run(() => defers.shift().resolve('b'));
  assert.equal(childTask.get('concurrency'), 1);
  Ember.run(() => defers.shift().resolve('c'));
  assert.equal(childTask.get('concurrency'), 0);
});

test("all cancels all other joined tasks if one of them fails", function(assert) {
  assert.expect(3);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      try {
        yield all([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
      } catch(e) {
        assert.equal(e.wat, 'lol');
      }
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      yield defer.promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().reject({ wat: 'lol' }));
  assert.equal(childTask.get('concurrency'), 0);
});

test("all cancels all joined tasks if parent task is canceled", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      yield all([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
    }),

    child: task(function * () {
      yield Ember.RSVP.defer().promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => obj.get('parent').cancelAll());
  assert.equal(childTask.get('concurrency'), 0);
});

test("allSettled behaves like Promise.allSettled", function(assert) {
  assert.expect(6);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      let allPromise = allSettled([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
      assert.equal(typeof allPromise.then, 'function');
      let values = yield allPromise;
      assert.deepEqual(values, [{ state: 'fulfilled', value: 'a' }, { state: 'fulfilled', value: 'b' }, { state: 'fulfilled', value: 'c' }]);
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      let value = yield defer.promise;
      return value;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().resolve('a'));
  assert.equal(childTask.get('concurrency'), 2);
  Ember.run(() => defers.shift().resolve('b'));
  assert.equal(childTask.get('concurrency'), 1);
  Ember.run(() => defers.shift().resolve('c'));
  assert.equal(childTask.get('concurrency'), 0);
});

test("allSettled does not cancel all other joined tasks if one of them fails", function(assert) {
  assert.expect(9);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      let allPromise = allSettled([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
      assert.equal(typeof allPromise.then, 'function');
      let values = yield allPromise;
      let fulfilled = values.filter((value) => value.state === 'fulfilled');
      let rejected = values.filter((value) => value.state !== 'fulfilled');
      assert.deepEqual(fulfilled, [{ state: 'fulfilled', value: 'a' }, { state: 'fulfilled', value: 'c' }]);
      assert.equal(rejected.length, 1);
      assert.equal(rejected[0].state, 'rejected');
      assert.equal(rejected[0].reason.message, 'wat');
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      let value = yield defer.promise;
      return value;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().resolve('a'));
  assert.equal(childTask.get('concurrency'), 2);
  Ember.run(() => defers.shift().reject(new Error('wat')));
  assert.equal(childTask.get('concurrency'), 1);
  Ember.run(() => defers.shift().resolve('c'));
  assert.equal(childTask.get('concurrency'), 0);
});

test("allSettled cancels all joined tasks if parent task is canceled", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      yield allSettled([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
    }),

    child: task(function * () {
      yield Ember.RSVP.defer().promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => obj.get('parent').cancelAll());
  assert.equal(childTask.get('concurrency'), 0);
});

test("hash", function(assert) {
  assert.expect(1);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      let v = yield hash({
        a: task.perform(1),
        b: task.perform(2),
        c: task.perform(3),
      });
      assert.deepEqual(v, { a: 1, b: 2, c: 3});
    }),

    child: task(function * (v) { return v; }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });
});

test("hash cancels the others if one fails", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      yield hash({
        a: task.perform(),
        b: task.perform(),
        c: task.perform(),
      });
      assert.ok(false, "should not get here");
    }),

    child: task(function * () { return Ember.RSVP.defer().promise; }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });
  assert.equal(obj.get('child.concurrency'), 3);
  Ember.run(obj.get('child.last'), 'cancel');
  assert.equal(obj.get('child.concurrency'), 0);
});

test("hash cancels children if parent is canceled", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      yield hash({
        a: task.perform(),
        b: task.perform(),
        c: task.perform(),
      });
      assert.ok(false, "should not get here");
    }),

    child: task(function * () { return Ember.RSVP.defer().promise; }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });
  assert.equal(obj.get('child.concurrency'), 3);
  Ember.run(obj.get('parent'), 'cancelAll');
  assert.equal(obj.get('child.concurrency'), 0);
});


