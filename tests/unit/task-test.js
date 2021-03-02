/* eslint-disable no-console */
import { defer } from 'rsvp';
import { A } from '@ember/array';
import Evented from '@ember/object/evented';
import { run, later } from '@ember/runloop';
import EmberObject, { computed } from '@ember/object';
import { settled } from '@ember/test-helpers';
import Ember from 'ember';
import { task, timeout, forever } from 'ember-concurrency';
import { module, test } from 'qunit';
import { destroy } from '@ember/destroyable';
import sinon from 'sinon'
import { decoratorTest } from '../helpers/helpers';

const originalLog = console.log;
const originalWarn = console.warn;

module('Unit: task', function(hooks) {
  hooks.afterEach(function() {
    console.log = originalLog;
    console.warn = originalWarn;
    Ember.ENV.DEBUG_TASKS = false;
  });

  test("task init", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
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

    run(() => {
      Obj.create();
    });
  });

  test("task Evented event", function(assert) {
    assert.expect(1);

    let arr = [];
    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * (a,b,c) {
        arr.push(a,b,c);
      }).on('foo'),
    });

    run(() => {
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
    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * (a,b,c) {
        arr.push(a,b,c);
      }).on('foo'),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.trigger('foo', 1, 2, 3);
    });
    run(obj, 'destroy');
    run(obj, 'trigger', 9, 9, 9);
    assert.deepEqual(arr, [1,2,3]);
  });

  test("task discontinues after destruction when blocked on async values", function(assert) {
    let start = assert.async();
    assert.expect(1);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        assert.ok(true);
        yield timeout(1000);
        assert.ok(false);
        yield timeout(1000);
      }).on('init'),
    });

    let obj;
    run(() => {
      obj = Obj.create();
    });

    later(() => {
      destroy(obj);
      start();
    });
  });

  test("tasks can be paused indefinitely by yielding `forever`", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield forever;
      }).on('init'),
    });

    let obj = run(() => Obj.create());
    assert.ok(obj.get('doStuff.isRunning'));
    run(() => destroy(obj));
    assert.ok(!obj.get('doStuff.isRunning'));
  });

  test("task.cancelAll cancels all running task instances", async function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield timeout(1);
        assert.ok(false, "should not get here");
      }),
    });

    let obj = Obj.create();
    let taskObj = obj.get('doStuff');
    let instances = A([ taskObj.perform(), taskObj.perform(), taskObj.perform() ]);
    await taskObj.cancelAll();

    assert.deepEqual(instances.mapBy('isCanceled'), [true, true, true]);
    assert.equal(instances[0].cancelReason, "TaskInstance 'doStuff' was canceled because .cancelAll() was explicitly called on the Task. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help");
  });

  test("task.cancelAll normally preserves the last derived state", async function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield timeout(1);
        return 1;
      }),
    });

    let obj = Obj.create();
    let taskObj = obj.get('doStuff');
    await taskObj.perform();

    assert.equal(taskObj.lastSuccessful.value, 1);

    taskObj.perform();
    await taskObj.cancelAll();

    assert.equal(taskObj.lastSuccessful.value, 1);
  });

  test("task.cancelAll({ resetState: true }) resets derived state", async function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield timeout(1);
        return 1;
      }),
    });

    let obj = Obj.create();
    let taskObj = obj.get('doStuff');
    await taskObj.perform();

    assert.equal(taskObj.lastSuccessful.value, 1);

    taskObj.perform();
    await taskObj.cancelAll({ resetState: true });

    assert.ok(!taskObj.lastSuccessful, 'expected there to be no last successful value');
  });

  test("cancelation due to task modifier supplies useful message", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield timeout(1);
      }).restartable(),
    });

    let instances;
    run(() => {
      let obj = Obj.create();
      let task = obj.get('doStuff');
      instances = A([ task.perform(), task.perform(), task.perform() ]);
    });

    assert.deepEqual(instances.mapBy('isCanceled'), [true, true, false]);
    assert.equal(instances[0].cancelReason, "TaskInstance 'doStuff' was canceled because it belongs to a 'restartable' Task that was .perform()ed again. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help");
  });

  test("tasks can call cancelAll() on themselves", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        this.doStuff.cancelAll();
        return 123;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('doStuff').perform();
    });

    assert.ok(obj.get('doStuff.last.isCanceled'));
  });

  test("task().cancelOn", function(assert) {
    assert.expect(0);

    let Obj = EmberObject.extend(Evented, {
      doStuff: task(function * () {
        yield timeout(10);
        assert.ok(false, "should not get here");
      }).on('init').cancelOn('foo'),
    });

    run(() => {
      Obj.create().trigger('foo');
    });
  });

  test(".observes re-performs the task every time the observed property changes in a coalesced manner", async function(assert) {
    assert.expect(2);

    let values = [];
    let Obj = EmberObject.extend({
      foo: 0,

      observingTask: task(function * () {
        values.push(this.foo);
      }).observes('foo'),
    });

    let obj = Obj.create();
    await settled();

    obj.set('foo', 1);
    obj.set('foo', 2);
    obj.set('foo', 3);
    await settled();

    assert.deepEqual(values, [3]);
    values = [];

    obj.set('foo', 4);
    obj.set('foo', 5);
    obj.set('foo', 6);
    await settled();

    assert.deepEqual(values, [6]);
  });

  test(".observes coalesces even with multiple properties", async function(assert) {
    assert.expect(2);

    let values = [];
    let Obj = EmberObject.extend({
      foo: 0,
      bar: 0,

      observingTask: task(function * () {
        values.push(this.foo);
        values.push(this.bar);
      }).observes('foo', 'bar'),
    });

    let obj = Obj.create();

    obj.set('foo', 1);
    obj.set('foo', 2);
    obj.set('bar', 1);
    obj.set('bar', 2);
    await settled();

    assert.deepEqual(values, [2,2]);
    values = [];

    obj.set('foo', 3);
    obj.set('foo', 4);
    obj.set('bar', 3);
    obj.set('bar', 4);
    await settled();

    assert.deepEqual(values, [4,4]);
  });


  test(".observes has the same lazy/live semantics as normal Ember.observer(...).on('init')", async function(assert) {
    assert.expect(2);

    let values = [];
    let Obj = EmberObject.extend({
      foo: 0,
      bar: computed('foo', function() {
        return this.foo;
      }),

      observingTask: task(function * () {
        values.push(this.bar);
      }).observes('bar').on('init'),
    });

    let obj = Obj.create();

    obj.set('foo', 1);
    obj.set('foo', 2);
    await settled();

    assert.deepEqual(values, [0,2]);
    values = [];

    obj.set('foo', 3);
    obj.set('foo', 4);
    await settled();

    assert.deepEqual(values, [4]);
  });

  test("performing a task on a destroyed object returns an immediately-canceled taskInstance", function(assert) {
    assert.expect(2);

    let Obj = EmberObject.extend({
      myTask: task(function * () {
        throw new Error("shouldn't get here");
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      destroy(obj);
      assert.equal(obj.get('myTask').perform().isDropped, true);
    });

    run(() => {
      assert.equal(obj.get('myTask').perform().isDropped, true);
    });
  });

  test("handles prototype-less object args", function(assert) {
    assert.expect(0);

    let Obj = EmberObject.extend({
      doStuff: task(function * () {})
    });

    run(() => {
      Obj.create().get('doStuff').perform(Object.create(null));
    });
  });

  test("updates derived state synchronously", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      doStuff: task(function * () {
        assert.ok(this.get('doStuff.isRunning'), "Expected to see self running");
      })
    });

    run(() => {
      Obj.create().get('doStuff').perform();
    });
  });

  test("call stack stays within reasonable bounds", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      a: task(function * () {
        yield this.b.perform();

        // Not sure how to test this in an automated fashion;
        // when we tweak scheduler logic, we can check that stack
        // traces are within reasonable bounds by uncommenting
        // the line below. (I'd use Error.stack but Chrome truncates
        // the stack to only a few frames).
        // debugger;
      }),
      b: task(function * () {
        yield this.c.perform();
      }),
      c: task(function * () {
        yield this.d.perform();
      }),
      d: task(function * () { }),
    });

    run(() => {
      let obj = Obj.create();
      obj.get('a').perform();
    });
    assert.ok(true);
  });

  test(".debug() enables basic debugging", function(assert) {
    assert.expect(1);

    let logs = [];
    console.log = (...args) => {
      logs.push(args);
    };

    let Obj = EmberObject.extend({
      a: task(function * () {
        yield defer().promise;
      }).debug()
    });

    run(() => {
      let obj = Obj.create();
      obj.get('a').perform();
      destroy(obj);
    });

    assert.deepEqual(logs, [
      [
        "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help"
      ]
    ]);
  });

  test("Ember.ENV.DEBUG_TASKS=true enables basic debugging", function(assert) {
    assert.expect(1);

    Ember.ENV.DEBUG_TASKS = true;

    let logs = [];
    console.log = (...args) => {
      logs.push(args);
    };

    let Obj = EmberObject.extend({
      a: task(function * () {
        yield defer().promise;
      }),
    });

    run(() => {
      let obj = Obj.create();
      obj.get('a').perform();
      destroy(obj);
    });

    assert.deepEqual(logs, [
      [
        "TaskInstance 'a' was canceled because the object it lives on was destroyed or unrendered. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help"
      ]
    ]);
  });

  test(".unlinked().perform() detaches a child task from its parent to avoid parent->child cancelation", function(assert) {
    assert.expect(4);

    let Obj = EmberObject.extend({
      a: task(function * () {
        yield this.b.unlinked().perform();
      }),
      b: task(function * () {
        yield defer().promise;
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('a').perform();

      assert.ok(obj.get('a.isRunning'));
      assert.ok(obj.get('b.isRunning'));

      obj.get('a').cancelAll();
    });

    assert.ok(!obj.get('a.isRunning'));
    assert.ok(obj.get('b.isRunning'));
  });

  test(".linked() throws an error if called outside of a task", function(assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      a: task(function * () { }),
    });

    run(() => {
      try {
        Obj.create().get('a').linked();
      } catch(e) {
        assert.equal(e.message, "You can only call .linked() from within a task.");
      }
    });
  });

  test(".linked() warns when not immediately yielded", function(assert) {
    assert.expect(1);

    let warnings = [];
    console.warn = (...args) => {
      warnings.push(args);
    };

    let Obj = EmberObject.extend({
      a: task(function * () {
        this.b.linked().perform();
      }),
      b: task(function * () { }),
    });

    run(() => {
      Obj.create().get('a').perform();
    });

    assert.deepEqual(warnings, [
      [
        "You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency)."
      ]
    ]);
  });

  test("ES5 getter syntax works", function(assert) {
    let Obj = EmberObject.extend({
      es5getterSyntaxSupported: computed(function() {
        return "yes";
      }),
      task: task(function * () {
        assert.ok(true);
      }),
    });

    run(() => {
      let obj = Obj.create();
      if (obj.es5getterSyntaxSupported === 'yes') {
        assert.expect(1);
        obj.task.perform();
      } else {
        assert.expect(0);
      }
    });
  });

  decoratorTest("ES classes: syntax with decorators works", function(assert) {
    const done = assert.async(2);

    class FakeGlimmerComponent {
      @task *task() {
        assert.ok(this instanceof FakeGlimmerComponent);
        yield timeout(1);
        assert.ok(true);
        done();
      }
    }

    run(() => {
      let obj = new FakeGlimmerComponent();
      obj.task.perform();
    });

    later(done, 1);
  });

  decoratorTest("ES classes: performing a task on a destroyed object returns an immediately-canceled taskInstance", function(assert) {
    assert.expect(2);

    class Obj {
      @task *task() {
        throw new Error("shouldn't get here");
      }
    }

    let obj;
    run(() => {
      obj = new Obj();
      destroy(obj);
      assert.equal(obj.task.perform().isDropped, true);
    });

    run(() => {
      assert.equal(obj.task.perform().isDropped, true);
    });
  });

  decoratorTest("ES classes: task discontinues after destruction when blocked on async values", function(assert) {
    let start = assert.async();
    assert.expect(1);

    class Obj {
      @task *doStuff() {
        assert.ok(true);
        yield timeout(1000);
        assert.ok(false);
        yield timeout(1000);
      }

      constructor() {
        this.doStuff.perform();
      }
    }

    let obj;
    run(() => {
      obj = new Obj();
    });

    later(() => {
      destroy(obj);
      start();
    });
  });

  decoratorTest("sinon stub promise that fails", async function (assert) {
    assert.expect(1);

    class Obj {
      async sinonPromise() {
        console.log('Do some work')
      }

      @task *doStuff() {
        yield this.sinonPromise()
      }

      async tryDoStuff() {
        try {
          await this.doStuff.perform()
        } catch (error) {
          console.log(error);
        }
      }
    }

    const obj = new Obj();
    sinon.stub(obj, 'sinonPromise').rejects('An error')
    await obj.tryDoStuff()
    assert.ok(true)
  })

  decoratorTest("sinon stub promise that passes", async function (assert) {
    assert.expect(1);

    class Obj {
      async sinonPromise() {
        console.log('Do some work')
      }

      @task *doStuff() {
        yield this.sinonPromise()
      }

      async tryDoStuff() {
        return this.doStuff.perform().catch((error) => {
          console.log(error);
        })
      }
    }

    const obj = new Obj();
    sinon.stub(obj, 'sinonPromise').rejects('An error')
    await obj.tryDoStuff()
    assert.ok(true)
  })
});
