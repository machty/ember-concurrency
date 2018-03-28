import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { task, waitForQueue, waitForEvent, waitForProperty, race } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

const EventedObject = EmberObject.extend(Evented);

module('Unit: test waitForQueue and waitForEvent and waitForProperty', function() {
  test('waitForQueue works', function(assert) {
    assert.expect(2);

    let taskCompleted = false;
    const Obj = EmberObject.extend({
      task: task(function*() {
        yield waitForQueue('afterRender');
        taskCompleted = true;
      })
    });

    run(() => {
      let obj = Obj.create();
      obj.get('task').perform();
      assert.notOk(taskCompleted, 'Task should not have completed');
    });

    assert.ok(taskCompleted, 'Task should have completed');
  });

  test('cancelling waitForQueue works', function(assert) {
    assert.expect(2);

    let taskCompleted = false;
    const Obj = EmberObject.extend({
      task: task(function*() {
        yield waitForQueue('afterRender');
        taskCompleted = true;
      })
    });

    run(() => {
      let obj = Obj.create();
      obj.get('task').perform();
      assert.notOk(taskCompleted, 'Task should not have completed');
      obj.get('task').cancelAll();
    });

    assert.notOk(taskCompleted, 'Task should not have completed');
  });

  test('waitForEvent works (`Ember.Evented` interface)', function(assert) {
    assert.expect(4);
    let taskCompleted = false;
    const Obj = EventedObject.extend({
      task: task(function*() {
        let value = yield waitForEvent(this, 'foo');
        assert.equal(value, 123);
        taskCompleted = true;
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(() => {
      assert.notOk(taskCompleted, 'Task should not have completed');
      assert.ok(obj.has('foo'), 'Object has the event listener');
      obj.trigger('foo', 123);
    });

    assert.ok(taskCompleted, 'Task should have completed');
  });

  test('canceling waitForEvent works (`Ember.Evented` interface)', function(assert) {
    assert.expect(4);
    let taskCompleted = false;
    const Obj = EventedObject.extend({
      task: task(function*() {
        yield waitForEvent(this, 'foo');
        taskCompleted = true;
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(() => {
      assert.notOk(taskCompleted, 'Task should not have completed');
      assert.ok(obj.has('foo'), 'Object has the event listener');
      obj.get('task').cancelAll();
      obj.trigger('foo');
    });

    assert.notOk(obj.has('foo'), 'Object does not have the event listener');
    assert.notOk(taskCompleted, 'Task should not have completed');
  });

  test('waitForEvent works (DOM `EventTarget` interface)', function(assert) {
    assert.expect(3);

    const element = document.createElement('button');
    let taskCompleted = false;
    let obj;

    const Obj = EventedObject.extend({
      task: task(function*() {
        let { detail } = yield waitForEvent(element, 'foo');
        assert.equal(detail, 123);
        taskCompleted = true;
      })
    });

    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(() => {
      assert.notOk(taskCompleted, 'Task should not have completed');
      element.dispatchEvent(new CustomEvent('foo', { detail: 123 }));
    });

    assert.ok(taskCompleted, 'Task should have completed');
  });

  test('canceling waitForEvent works (DOM `EventTarget` interface)', function(assert) {
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
      task: task(function*() {
        yield waitForEvent(element, 'foo');
        taskCompleted = true;
      })
    });

    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(() => {
      assert.notOk(taskCompleted, 'Task should not have completed');
      obj.get('task').cancelAll();
      element.dispatchEvent(new CustomEvent('foo'));
    });

    assert.ok(removeEventListenerCalled, '`removeEventListener` was called');
    assert.notOk(taskCompleted, 'Task should not have completed');
  });

  test('waitForProperty works', function(assert) {
    assert.expect(1);

    let values = [];
    const Obj = EmberObject.extend({
      a: 1,
      b: alias('a'),

      task: task(function*() {
        let result = yield waitForProperty(this, 'b', v => {
          values.push(v);
          return v == 3 ? 'done' : false;
        });
        values.push(`val=${result}`);
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(obj, 'set', 'a', 2);
    run(obj, 'set', 'a', 3);
    run(obj, 'set', 'a', 4);

    assert.deepEqual(values, [1, 2, 3, 'val=3']);
  });

  test('waitForProperty works with immediately truthy predicates', function(assert) {
    assert.expect(1);

    const Obj = EmberObject.extend({
      a: 1,

      task: task(function*() {
        yield waitForProperty(this, 'a', v => v === 1);
        assert.ok(true);
      })
    });

    run(() => {
      let obj = Obj.create();
      obj.get('task').perform();
    });
  });

  test("waitForProperty's default predicate checks for truthiness", function(assert) {
    assert.expect(2);

    const Obj = EmberObject.extend({
      a: 0,

      task: task(function*() {
        yield waitForProperty(this, 'a');
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(obj, 'set', 'a', false);
    run(obj, 'set', 'a', null);
    assert.ok(obj.get('task.isRunning'));
    run(obj, 'set', 'a', 'hey');
    assert.ok(!obj.get('task.isRunning'));
  });

  test("passing a non-function value to waitForProperty will cause it to wait until the property equals that value", function(assert) {
    assert.expect(4);

    let state = 'null';
    const Obj = EmberObject.extend({
      a: 1,

      task: task(function*() {
        state = 'waiting for a===3';
        yield waitForProperty(this, 'a', 3);
        state = 'waiting for a===null';
        yield waitForProperty(this, 'a', null);
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('task').perform();
    });

    run(obj, 'set', 'a', 1);
    run(obj, 'set', 'a', 2);
    assert.equal(state, 'waiting for a===3');
    run(obj, 'set', 'a', 3);
    assert.equal(state, 'waiting for a===null');
    run(obj, 'set', 'a', 0);
    run(obj, 'set', 'a', false);
    assert.equal(state, 'waiting for a===null');
    run(obj, 'set', 'a', null);
    assert.ok(obj.get('task.isIdle'));
  });

  test("exposes a Promise interface that works with promise helpers", function(assert) {
    assert.expect(4);

    let obj = EventedObject.create();
    let ev = null;
    run(() => waitForEvent(obj, 'foo').then(v => { ev = v; }));
    assert.equal(ev, null);
    run(obj, 'trigger', 'foo', 123);
    assert.equal(ev, 123);

    ev = null;
    run(() =>
      race([
        waitForEvent(obj, 'foo'),
        waitForEvent(obj, 'bar'),
      ]).then(v => { ev = v; })
    )
    assert.equal(ev, null);
    run(obj, 'trigger', 'bar', 456);
    assert.equal(ev, 456);
  });
});
