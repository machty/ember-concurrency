import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task states', function() {
  test("isIdle basic", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      myTask: task(function * () { })
    });

    let obj;
    run(() => {
      obj = Obj.create();
      assert.equal(obj.get('myTask.isIdle'), true);
      obj.get('myTask').perform();
      assert.equal(obj.get('myTask.isIdle'), false);
    });
    assert.equal(obj.get('myTask.isIdle'), true);
  });

  test("isIdle is false when task is blocked on a yield", function(assert) {
    assert.expect(3);

    let defers = [];
    let Obj = EmberObject.extend({
      myTask: task(function * () {
        let defer = RSVP.defer();
        defers.push(defer);
        yield defer.promise;
      })
    });

    let obj;
    run(() => {
      obj = Obj.create();
    });

    run(() => {
      let t = obj.get('myTask');
      assert.equal(t.get('isIdle'), true);
      t.perform();
    });

    run(() => {
      let t = obj.get('myTask');
      assert.equal(t.get('isIdle'), false);
      assert.equal(t.get('concurrency'), 1);
      t.perform();
    });
  });

  test(".lastPerformed is set when task.perform is called", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      myTask: task(function * () { })
    });

    run(() => {
      let obj = Obj.create();
      let myTask = obj.get('myTask');
      assert.equal(myTask.get('lastPerformed'), null);
      let taskInstance0 = myTask.perform();
      assert.equal(myTask.get('lastPerformed'), taskInstance0);
      let taskInstance1 = myTask.perform();
      assert.equal(myTask.get('lastPerformed'), taskInstance1);
    });
  });

  test("a dropped .lastPerformed shows up as canceled", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      myTask: task(function * () { yield timeout(10); }).drop(),
    });

    let myTask, taskInstance1;
    run(() => {
      let obj = Obj.create();
      myTask = obj.get('myTask');
      myTask.perform();
      taskInstance1 = myTask.perform();
      assert.equal(myTask.get('lastPerformed'), taskInstance1);
    });
    assert.equal(taskInstance1.get('error.name'), "TaskCancelation");
    assert.equal(myTask.get('lastPerformed.error.name'), "TaskCancelation");
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
      assert.equal(myTask.get('last'), null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
    });

    assert.equal(myTask.get('last'), taskInstance0);
    run(defer, 'resolve');
    assert.equal(myTask.get('last'), taskInstance1);
    run(defer, 'resolve');
    assert.equal(myTask.get('last'), taskInstance1);
  });

  test(".lastSuccessful is set when a task instance returns a value", function(assert) {
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
      assert.equal(myTask.get('lastSuccessful'), null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.equal(myTask.get('lastSuccessful'), null);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastSuccessful'), taskInstance0);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastSuccessful'), taskInstance1);
    try {
      run(defer, 'reject', 'i am error');
      assert.ok(false);
    } catch(e) {
      assert.equal(myTask.get('lastSuccessful'), taskInstance1, "still is taskInstance1 because taskInstance2 failed");
    }
  });

  test(".lastComplete is set when a task instance returns/cancels/errors", function(assert) {
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
      assert.equal(myTask.get('lastComplete'), null);
      taskInstance0 = myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.get('lastComplete'), null);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastComplete'), taskInstance0);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.get('lastComplete'), taskInstance1);
    try {
      run(defer, 'reject', 'i am error');
      assert.ok(false);
    } catch(e) {
      assert.equal(myTask.get('lastComplete'), taskInstance2);
    }
  });

  test(".lastErrored is set when a task instance errors (but not cancels)", function(assert) {
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
      assert.equal(myTask.get('lastErrored'), null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.get('lastErrored'), null);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastErrored'), null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.get('lastErrored'), null);
    try {
      run(defer, 'reject', 'i am error');
      assert.ok(false);
    } catch(e) {
      assert.equal(myTask.get('lastErrored'), taskInstance2);
    }
  });

  test(".lastCanceled is set when a task instance cancels (but not errors)", function(assert) {
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
      assert.equal(myTask.get('lastCanceled'), null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      myTask.perform();
    });

    assert.equal(myTask.get('lastCanceled'), null);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastCanceled'), null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.get('lastCanceled'), taskInstance1);
    try {
      run(defer, 'reject', 'i am error');
      assert.ok(false);
    } catch(e) {
      assert.equal(myTask.get('lastCanceled'), taskInstance1, "still taskInstance1");
    }
  });

  test(".lastIncomplete is set when a task instance errors or cancels", function(assert) {
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
      assert.equal(myTask.get('lastIncomplete'), null);
      myTask.perform();
      taskInstance1 = myTask.perform();
      taskInstance2 = myTask.perform();
    });

    assert.equal(myTask.get('lastIncomplete'), null);
    run(defer, 'resolve');
    assert.equal(myTask.get('lastIncomplete'), null);
    run(taskInstance1, 'cancel');
    assert.equal(myTask.get('lastIncomplete'), taskInstance1);
    try {
      run(defer, 'reject', 'i am error');
      assert.ok(false);
    } catch(e) {
      assert.equal(myTask.get('lastIncomplete'), taskInstance2);
    }
  });
});