import Ember from 'ember';
import { task, all, allSettled, timeout, race } from 'ember-concurrency';
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

test("yieldable helpers support to cancel promises with __ec_cancel__", function(assert) {
  assert.expect(1);
  let done = assert.async();

  function waitUntilValueChanged(context, path) {
    let intervalId;
    let originalValue = context.get(path);
    let promise = new Ember.RSVP.Promise((resolve) => {
      intervalId = setInterval(() => {
        let newValue = context.get(path);
        if (newValue !== originalValue) {
          clearInterval(intervalId);
          resolve(newValue);
        }
      }, 100);
    });
    promise.__ec_cancel__ = () => {
      assert.ok(true);
      clearInterval(intervalId);
      done();
    };
    return promise;
  }

  let Obj = Ember.Object.extend({
    value: 5,
    _checkValueOrTimeOutAfterOneSec: task(function * () {
      Ember.run.later(() => {
        assert.ok(false);
        done();
      }, 1100);
      yield race([waitUntilValueChanged(this, 'value'), timeout(1000)])
    }).on('init')
  });

  Ember.run(() => {
    Obj.create();
  });
});
