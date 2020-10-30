import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task, forever } from 'ember-concurrency';
import { module, test } from 'qunit';
import { makeAsyncError } from '../helpers/helpers';

module('Unit: task states', function(hooks) {
  let asyncError = makeAsyncError(hooks);

  test("state basic", function(assert) {
    assert.expect(11);

    let Obj = EmberObject.extend({
      myTask: task(function * () {})
    });

    let obj;
    run(() => {
      obj = Obj.create();
      assert.equal(obj.myTask.isIdle, true);
      assert.equal(obj.myTask.isRunning, false);
      assert.equal(obj.myTask.state, 'idle');
      assert.equal(obj.myTask.performCount, 0);
      obj.myTask.perform();
      assert.equal(obj.myTask.isIdle, false);
      assert.equal(obj.myTask.isRunning, true);
      assert.equal(obj.myTask.state, 'running');
      assert.equal(obj.myTask.performCount, 1);
    });
    assert.equal(obj.myTask.isIdle, true);
    assert.equal(obj.myTask.isRunning, false);
    assert.equal(obj.myTask.state, 'idle');
  });

  test("state when task is blocked on a yield", function(assert) {
    assert.expect(15);

    let Obj = EmberObject.extend({
      myTask: task(function * () {
        yield forever;
      })
    });

    let obj, t;
    run(() => {
      obj = Obj.create();
      t = obj.myTask;
    });

    run(() => {
      assert.equal(t.isIdle, true);
      assert.equal(t.isRunning, false);
      assert.equal(t.isQueued, false);
      assert.equal(t.state, 'idle');
      assert.equal(t.performCount, 0);
      t.perform();
    });

    run(() => {
      let t = obj.get('myTask');
      assert.equal(t.isIdle, false);
      assert.equal(t.isRunning, true);
      assert.equal(t.state, 'running');
      assert.equal(t.numRunning, 1);
      assert.equal(t.performCount, 1);
      t.perform();
    });

    assert.equal(t.isIdle, false);
    assert.equal(t.isRunning, true);
    assert.equal(t.state, 'running');
    assert.equal(t.numRunning, 2);
    assert.equal(t.performCount, 2);

    t.cancelAll();
  });

  test(".lastPerformed is set when task.perform is called", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      myTask: task(function * () { })
    });

    run(() => {
      let obj = Obj.create();
      let myTask = obj.get('myTask');
      assert.equal(myTask.lastPerformed, null);
      let taskInstance0 = myTask.perform();
      assert.equal(myTask.lastPerformed, taskInstance0);
      let taskInstance1 = myTask.perform();
      assert.equal(myTask.lastPerformed, taskInstance1);
    });
  });

  test(".performCount exposes the number of times a task has been performed", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      doStuff: task(function * () { })
    });

    run(() => {
      let obj = Obj.create();
      let doStuff = obj.get('doStuff');
      assert.equal(doStuff.performCount, 0);
      doStuff.perform();
      assert.equal(doStuff.performCount, 1);
      doStuff.perform();
      doStuff.perform();
      assert.equal(doStuff.performCount, 3);
    });
  });

  test("a dropped .lastPerformed shows up as canceled", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      myTask: task(function * () { yield forever; }).drop(),
    });

    let myTask, taskInstance1;
    run(() => {
      let obj = Obj.create();
      myTask = obj.get('myTask');
      myTask.perform();
      taskInstance1 = myTask.perform();
      assert.equal(myTask.lastPerformed, taskInstance1);
    });
    assert.equal(taskInstance1.error.name, "TaskCancelation");
    assert.equal(myTask.lastPerformed.error.name, "TaskCancelation");
  });

  test(".last is set when a task starts", function(assert) {
    assert.expect(4);

    let defer, taskInstance0, taskInstance1;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.last, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
    });

    assert.equal(myTask.last, taskInstance0);
    run(defer, 'resolve');
    assert.equal(myTask.last, taskInstance1);
    run(defer, 'resolve');
    assert.equal(myTask.last, taskInstance1);
  });

  test(".lastSuccessful is set when a task instance returns a value", async function(assert) {
    assert.expect(5);

    let defer, taskInstance0, taskInstance1;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        return yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.lastSuccessful, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.equal(myTask.lastSuccessful, null);
    run(defer, 'resolve');
    assert.equal(myTask.lastSuccessful, taskInstance0);
    run(defer, 'resolve');
    assert.equal(myTask.lastSuccessful, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.equal(myTask.lastSuccessful, taskInstance1, "still is taskInstance1 because taskInstance2 failed");
    await asyncError();
  });

  test(".lastComplete is set when a task instance returns/cancels/errors", async function(assert) {
    assert.expect(5);

    let defer, taskInstance0, taskInstance1, taskInstance2;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        return yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.lastComplete, null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.lastComplete, null);
    run(defer, 'resolve');
    assert.equal(myTask.lastComplete, taskInstance0);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.lastComplete, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.equal(myTask.lastComplete, taskInstance2);
    await asyncError();
  });

  test(".lastErrored is set when a task instance errors (but not cancels)", async function(assert) {
    assert.expect(5);

    let defer, taskInstance1, taskInstance2;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        return yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.lastErrored, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.lastErrored, null);
    run(defer, 'resolve');
    assert.equal(myTask.lastErrored, null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.lastErrored, null);
    run(defer, 'reject', 'i am error');
    assert.equal(myTask.lastErrored, taskInstance2);
    await asyncError();
  });

  test(".lastCanceled is set when a task instance cancels (but not errors)", async function(assert) {
    assert.expect(5);

    let defer, taskInstance1;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        return yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.lastCanceled, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.equal(myTask.lastCanceled, null);
    run(defer, 'resolve');
    assert.equal(myTask.lastCanceled, null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.lastCanceled, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.equal(myTask.lastCanceled, taskInstance1, "still taskInstance1");
    await asyncError();
  });

  test(".lastIncomplete is set when a task instance errors or cancels", async function(assert) {
    assert.expect(5);

    let defer, taskInstance1, taskInstance2;
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        defer = RSVP.defer();
        return yield defer.promise;
      }).enqueue()
    });

    let obj, myTask;
    run(() => {
      obj = Obj.create();
      myTask = obj.get('myTask');
      assert.equal(myTask.lastIncomplete, null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.lastIncomplete, null);
    run(defer, 'resolve');
    assert.equal(myTask.lastIncomplete, null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.lastIncomplete, taskInstance1);
    run(defer, 'reject', 'i am error');
    assert.equal(myTask.lastIncomplete, taskInstance2);
    await asyncError();
  });
});
