import Evented from '@ember/object/evented';
import EmberObject, { computed, set } from '@ember/object';
import { run } from '@ember/runloop';
import { settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import {
  task,
  waitForQueue,
  waitForEvent,
  waitForProperty,
  race,
} from 'ember-concurrency';
import { alias } from '@ember/object/computed';

const EventedObject = EmberObject.extend(Evented);

const GenericEventedMixin = {
  init() {
    this._super(...arguments);
    this._handlers = {};
  },

  has(eventName) {
    return this._handlers[eventName] && this._handlers[eventName].length > 0;
  },

  trigger(eventName, data) {
    const eventHandlers = this._handlers[eventName];
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler.call(this, data));
    }
  },

  on(eventName, fn) {
    this._handlers[eventName] = this._handlers[eventName] || [];
    this._handlers[eventName].push(fn);
  },

  off(eventName, fn) {
    const eventHandlers = this._handlers[eventName];
    if (eventHandlers) {
      this._handlers[eventName] = eventHandlers.filter(
        (handler) => handler !== fn,
      );
    }
  },
};

module(
  'Unit: test waitForQueue and waitForEvent and waitForProperty',
  function () {
    test('waitForQueue works', function (assert) {
      assert.expect(2);

      let taskCompleted = false;
      const Obj = EmberObject.extend({
        task: task(function* () {
          yield waitForQueue('afterRender');
          taskCompleted = true;
        }),
      });

      run(() => {
        let obj = Obj.create();
        obj.task.perform();
        assert.notOk(taskCompleted, 'Task should not have completed');
      });

      assert.ok(taskCompleted, 'Task should have completed');
    });

    test('cancelling waitForQueue works', function (assert) {
      assert.expect(2);

      let taskCompleted = false;
      const Obj = EmberObject.extend({
        task: task(function* () {
          yield waitForQueue('afterRender');
          taskCompleted = true;
        }),
      });

      run(() => {
        let obj = Obj.create();
        obj.task.perform();
        assert.notOk(taskCompleted, 'Task should not have completed');
        obj.task.cancelAll();
      });

      assert.notOk(taskCompleted, 'Task should not have completed');
    });

    test('waitForQueue throws if invalid queue is used', function (assert) {
      assert.expect(2);

      let taskErrored = false;
      const Obj = EmberObject.extend({
        task: task(function* () {
          try {
            yield waitForQueue('non-existing-queue');
          } catch (error) {
            assert.strictEqual(
              error.toString(),
              "Error: You attempted to schedule an action in a queue (non-existing-queue) that doesn't exist",
              'it correctly bubbles error up',
            );
            taskErrored = true;
          }
        }),
      });

      run(() => {
        let obj = Obj.create();
        obj.task.perform();
        assert.notOk(taskErrored, 'Task should have errored');
      });
    });

    test('waitForEvent works (`Ember.Evented` interface)', function (assert) {
      assert.expect(4);
      let taskCompleted = false;
      const Obj = EventedObject.extend({
        task: task(function* () {
          let value = yield waitForEvent(this, 'foo');
          assert.strictEqual(value, 123);
          taskCompleted = true;
        }),
      });

      let obj;
      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        assert.ok(obj.has('foo'), 'Object has the event listener');
        obj.trigger('foo', 123);
      });

      assert.ok(taskCompleted, 'Task should have completed');
    });

    test('canceling waitForEvent works (`Ember.Evented` interface)', function (assert) {
      assert.expect(4);
      let taskCompleted = false;
      const Obj = EventedObject.extend({
        task: task(function* () {
          yield waitForEvent(this, 'foo');
          taskCompleted = true;
        }),
      });

      let obj;
      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        assert.ok(obj.has('foo'), 'Object has the event listener');
        obj.task.cancelAll();
        obj.trigger('foo');
      });

      assert.notOk(obj.has('foo'), 'Object does not have the event listener');
      assert.notOk(taskCompleted, 'Task should not have completed');
    });

    test('waitForEvent works (DOM `EventTarget` interface)', function (assert) {
      assert.expect(3);

      const element = document.createElement('button');
      let taskCompleted = false;
      let obj;

      const Obj = EventedObject.extend({
        task: task(function* () {
          let { detail } = yield waitForEvent(element, 'foo');
          assert.strictEqual(detail, 123);
          taskCompleted = true;
        }),
      });

      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        element.dispatchEvent(new CustomEvent('foo', { detail: 123 }));
      });

      assert.ok(taskCompleted, 'Task should have completed');
    });

    test('canceling waitForEvent works (DOM `EventTarget` interface)', function (assert) {
      assert.expect(3);

      const element = document.createElement('button');
      element.removeEventListener = (...args) => {
        removeEventListenerCalled = true;
        return HTMLElement.prototype.removeEventListener.apply(element, args);
      };
      let taskCompleted = false;
      let removeEventListenerCalled = false;
      let obj;

      const Obj = EventedObject.extend({
        task: task(function* () {
          yield waitForEvent(element, 'foo');
          taskCompleted = true;
        }),
      });

      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        obj.task.cancelAll();
        element.dispatchEvent(new CustomEvent('foo'));
      });

      assert.ok(removeEventListenerCalled, '`removeEventListener` was called');
      assert.notOk(taskCompleted, 'Task should not have completed');
    });

    test('waitForEvent works (generic on/off interface)', function (assert) {
      assert.expect(4);
      let taskCompleted = false;
      const Obj = EmberObject.extend({
        ...GenericEventedMixin,

        task: task(function* () {
          let value = yield waitForEvent(this, 'foo');
          assert.strictEqual(value, 123);
          taskCompleted = true;
        }),
      });

      let obj;
      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        assert.ok(obj.has('foo'), 'Object has the event listener');
        obj.trigger('foo', 123);
      });

      assert.ok(taskCompleted, 'Task should have completed');
    });

    test('canceling waitForEvent works (generic on/off interface)', function (assert) {
      assert.expect(4);
      let taskCompleted = false;
      const Obj = EmberObject.extend({
        ...GenericEventedMixin,

        task: task(function* () {
          let value = yield waitForEvent(this, 'foo');
          assert.strictEqual(value, 123);
          taskCompleted = true;
        }),
      });

      let obj;
      run(() => {
        obj = Obj.create();
        obj.task.perform();
      });

      run(() => {
        assert.notOk(taskCompleted, 'Task should not have completed');
        assert.ok(obj.has('foo'), 'Object has the event listener');
        obj.task.cancelAll();
        obj.trigger('foo');
      });

      assert.notOk(obj.has('foo'), 'Object does not have the event listener');
      assert.notOk(taskCompleted, 'Task should not have completed');
    });

    test('waitForProperty works', async function (assert) {
      assert.expect(1);

      let values = [];
      const Obj = EmberObject.extend({
        a: 1,
        b: alias('a'),

        task: task(function* () {
          let result = yield waitForProperty(this, 'b', (v) => {
            values.push(v);
            return v == 3 ? 'done' : false;
          });
          values.push(`val=${result}`);
        }),
      });

      let obj = Obj.create();
      obj.task.perform();

      obj.set('a', 2);
      await settled();

      obj.set('a', 3);
      await settled();

      obj.set('a', 4);
      await settled();

      assert.deepEqual(values, [1, 2, 3, 'val=3']);
    });

    test('waitForProperty works with immediately truthy predicates', async function (assert) {
      assert.expect(1);

      const Obj = EmberObject.extend({
        a: 1,

        task: task(function* () {
          yield waitForProperty(this, 'a', (v) => v === 1);
          assert.ok(true);
        }),
      });

      let obj = Obj.create();
      obj.task.perform();

      await settled();
    });

    test("waitForProperty's default predicate checks for truthiness", async function (assert) {
      assert.expect(2);

      const Obj = EmberObject.extend({
        a: 0,

        task: task(function* () {
          yield waitForProperty(this, 'a');
        }),
      });

      let obj = Obj.create();
      obj.task.perform();

      obj.set('a', false);
      await settled();

      obj.set('a', null);
      await settled();
      assert.ok(obj.task.isRunning);

      obj.set('a', 'hey');
      await settled();
      assert.notOk(obj.task.isRunning);
    });

    test('passing a non-function value to waitForProperty will cause it to wait until the property equals that value', async function (assert) {
      assert.expect(4);

      let state = 'null';
      const Obj = EmberObject.extend({
        a: 1,

        task: task(function* () {
          state = 'waiting for a===3';
          yield waitForProperty(this, 'a', 3);
          state = 'waiting for a===null';
          yield waitForProperty(this, 'a', null);
        }),
      });

      let obj = Obj.create();
      obj.task.perform();

      obj.set('a', 1);
      await settled();

      obj.set('a', 2);
      await settled();
      assert.strictEqual(state, 'waiting for a===3');

      obj.set('a', 3);
      await settled();
      assert.strictEqual(state, 'waiting for a===null');

      obj.set('a', 0);
      await settled();
      obj.set('a', false);
      await settled();
      assert.strictEqual(state, 'waiting for a===null');

      obj.set('a', null);
      await settled();
      assert.ok(obj.task.isIdle);
    });

    test('exposes a Promise interface that works with promise helpers', function (assert) {
      assert.expect(4);

      let obj = EventedObject.create();
      let ev = null;
      run(() =>
        waitForEvent(obj, 'foo').then((v) => {
          ev = v;
        }),
      );
      assert.strictEqual(ev, null);
      run(obj, 'trigger', 'foo', 123);
      assert.strictEqual(ev, 123);

      ev = null;
      run(() =>
        race([waitForEvent(obj, 'foo'), waitForEvent(obj, 'bar')]).then((v) => {
          ev = v;
        }),
      );
      assert.strictEqual(ev, null);
      run(obj, 'trigger', 'bar', 456);
      assert.strictEqual(ev, 456);
    });

    test('waitForProperty works on an ES class', async function (assert) {
      assert.expect(1);

      let values = [];
      class Obj {
        a = 1;

        // eslint-disable-next-line ember/no-computed-properties-in-native-classes
        @computed('a')
        get b() {
          return this.a;
        }

        @task *task() {
          let result = yield waitForProperty(this, 'b', (v) => {
            values.push(v);
            return v == 3 ? 'done' : false;
          });
          values.push(`val=${result}`);
        }
      }

      let obj = new Obj();
      obj.task.perform();

      set(obj, 'a', 2);
      await settled();

      set(obj, 'a', 3);
      await settled();

      set(obj, 'a', 4);
      await settled();

      assert.deepEqual(values, [1, 2, 3, 'val=3']);
    });
  },
);
