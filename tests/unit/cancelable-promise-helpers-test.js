import { run } from '@ember/runloop';
import RSVP, { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import {
  task,
  all,
  allSettled,
  hash,
  race,
  rawTimeout,
  timeout,
  waitForEvent,
  waitForProperty,
  waitForQueue
} from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: cancelable promises test helpers', function() {
  test("all behaves like Promise.all", function(assert) {
    assert.expect(6);

    let defers = [];
    let Obj = EmberObject.extend({
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
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => defers.shift().resolve('a'));
    assert.equal(childTask.get('concurrency'), 2);
    run(() => defers.shift().resolve('b'));
    assert.equal(childTask.get('concurrency'), 1);
    run(() => defers.shift().resolve('c'));
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("all cancels all other joined tasks if one of them fails", function(assert) {
    assert.expect(3);

    let defers = [];
    let Obj = EmberObject.extend({
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
        let defer = RSVP.defer();
        defers.push(defer);
        yield defer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => defers.shift().reject({ wat: 'lol' }));
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("all cancels all joined tasks if parent task is canceled", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function * () {
        let task = this.get('child');
        yield all([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
      }),

      child: task(function * () {
        yield RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => obj.get('parent').cancelAll());
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("all throws an assertion, if something other than an array is passed", function (assert) {
    assert.expectAssertion(() => {
      all();
    }, /'all' expects an array/);
    assert.expectAssertion(() => {
      all(RSVP.Promise.resolve());
    }, /'all' expects an array/);
  });

  test("allSettled behaves like Promise.allSettled", function(assert) {
    assert.expect(6);

    let defers = [];
    let Obj = EmberObject.extend({
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
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => defers.shift().resolve('a'));
    assert.equal(childTask.get('concurrency'), 2);
    run(() => defers.shift().resolve('b'));
    assert.equal(childTask.get('concurrency'), 1);
    run(() => defers.shift().resolve('c'));
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("allSettled does not cancel all other joined tasks if one of them fails", function(assert) {
    assert.expect(9);

    let defers = [];
    let Obj = EmberObject.extend({
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
        let defer = RSVP.defer();
        defers.push(defer);
        let value = yield defer.promise;
        return value;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => defers.shift().resolve('a'));
    assert.equal(childTask.get('concurrency'), 2);
    run(() => defers.shift().reject(new Error('wat')));
    assert.equal(childTask.get('concurrency'), 1);
    run(() => defers.shift().resolve('c'));
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("allSettled cancels all joined tasks if parent task is canceled", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function * () {
        let task = this.get('child');
        yield allSettled([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
      }),

      child: task(function * () {
        yield RSVP.defer().promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });

    let childTask = obj.get('child');
    assert.equal(childTask.get('concurrency'), 3);
    run(() => obj.get('parent').cancelAll());
    assert.equal(childTask.get('concurrency'), 0);
  });

  test("allSettled throws an assertion, if something other than an array is passed", function (assert) {
    assert.expectAssertion(() => {
      allSettled();
    }, /'allSettled' expects an array/);
    assert.expectAssertion(() => {
      allSettled(RSVP.Promise.resolve());
    }, /'allSettled' expects an array/);
  });

  test("hash", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
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
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
  });

  test("hash cancels the others if one fails", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function * () {
        let task = this.get('child');
        yield hash({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
        assert.ok(false, "should not get here");
      }),

      child: task(function * () { return RSVP.defer().promise; }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.equal(obj.get('child.concurrency'), 3);
    run(obj.get('child.last'), 'cancel');
    assert.equal(obj.get('child.concurrency'), 0);
  });

  test("hash cancels children if parent is canceled", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      parent: task(function * () {
        let task = this.get('child');
        yield hash({
          a: task.perform(),
          b: task.perform(),
          c: task.perform(),
        });
        assert.ok(false, "should not get here");
      }),

      child: task(function * () { return RSVP.defer().promise; }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.equal(obj.get('child.concurrency'), 3);
    run(obj.get('parent'), 'cancelAll');
    assert.equal(obj.get('child.concurrency'), 0);
  });

  test("race throws an assertion, if something other than an array is passed", function (assert) {
    assert.expectAssertion(() => {
      race();
    }, /'race' expects an array/);
    assert.expectAssertion(() => {
      race(RSVP.Promise.resolve());
    }, /'race' expects an array/);
  });

  test("yieldable helpers work with null/undefined values", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      parent: task(function * () {
        let task = this.get('child');
        let v = yield hash({
          a: task.perform(1),
          b: null,
          c: undefined
        });
        assert.deepEqual(v, { a: 1, b: null, c: undefined });
      }),

      child: task(function * (v) { return v; }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
  });

  test("yieldable helpers support to cancel promises with __ec_cancel__", function(assert) {
    assert.expect(1);

    let promise = new RSVP.defer().promise;
    promise.__ec_cancel__ = () => {
      assert.ok(true);
    };

    let Obj = EmberObject.extend({
      _checkValueOrTimeOutAfterOneSec: task(function * () {
        yield race([promise, resolve()]);
      }).on('init')
    });

    run(() => {
      Obj.create();
    });
  });

  test("yieldable helpers support cancelation on all manner of Yieldable-derived classes", function(assert) {
    assert.expect(5);

    let wrapCancelation = (yieldable, shouldBeCalled = true) => {
      let originalCancel = yieldable.__ec_cancel__.bind(yieldable);
      yieldable.__ec_cancel__ = () => {
        originalCancel();
        assert.ok(shouldBeCalled);
      };
    }

    let fakeNode = {
      // eslint-disable-next-line no-unused-vars
      addEventListener(_eventName, _fn) {},
      // eslint-disable-next-line no-unused-vars
      removeEventListener(_eventName, _fn) {}
    };

    let Obj = EmberObject.extend({
      a: 12,

      someTask: task(function * () {
        let eventYieldable = waitForEvent(fakeNode, 'never');
        wrapCancelation(eventYieldable);

        let propertyYieldable = waitForProperty(this, 'a', 3);
        wrapCancelation(propertyYieldable);

        let queueYieldable = waitForQueue('afterRender');
        wrapCancelation(queueYieldable);

        let rawTimeoutYieldable = rawTimeout(100000);
        wrapCancelation(rawTimeoutYieldable);

        let timeoutYieldable = timeout(100000);
        wrapCancelation(timeoutYieldable);

        yield race([
          eventYieldable,
          propertyYieldable,
          queueYieldable,
          rawTimeoutYieldable,
          timeoutYieldable,
          resolve(42)
        ]);
      }).on('init')
    });

    run(() => {
      Obj.create();
    });
  });
});
