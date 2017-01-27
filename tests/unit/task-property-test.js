import Ember from 'ember';
import { task, interval } from 'ember-concurrency';
import { TaskProperty } from 'ember-concurrency/-task-property';
import { module, test } from 'qunit';

module('Unit: task property', {
  beforeEach() {
    let taskRunCounter = 0;
    this.waiter = () => taskRunCounter === 0;

    Ember.Test.registerWaiter(this.waiter);

    TaskProperty.prototype.withTestWaiter = function() {
      if (Ember.testing) {
        let originalTaskFn = this.taskFn;

        this.taskFn = function * (...args) {
          taskRunCounter += 1;
          try {
            return yield * originalTaskFn.apply(this, args);
          } finally {
            taskRunCounter -= 1;
          }
        };
      }

      return this;
    }
  },

  afterEach() {
    Ember.Test.unregisterWaiter(this.waiter);
    delete TaskProperty.prototype.withTestWaiter;
  }
});

function checkWaiters() {
  // pre-2.8 the Ember.Test.checkWaiters() API didn't exist, but the
  // Ember.test.waiters intimate API did.
  if (Ember.Test.checkWaiters) {
    return Ember.Test.checkWaiters();
  } else {
    return !!Ember.A(Ember.Test.waiters).find(([context, fn]) => !fn.call(context));
  }
}

test("waiters are settled without withTestWaiter() decorator", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => null);
    }),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.notOk(checkWaiters());
});

test("withTestWaiter() decorator works", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    }).withTestWaiter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while task is running");

  Ember.run(() => {
    obj.resolvePromise();
  });

  assert.notOk(checkWaiters(), "waiters are settled after task completes");
});

test("withTestWaiter() decorator works with concurrent tasks", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromises = this.resolvePromises || [];
        this.resolvePromises.push(resolve);
      });
    }).withTestWaiter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while task is running");

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while two concurrent tasks are running");

  Ember.run(() => {
    obj.resolvePromises[0]();
  });

  assert.ok(checkWaiters(), "waiters are not settled after only one task completes");

  Ember.run(() => {
    obj.resolvePromises[1]();
  });

  assert.notOk(checkWaiters(), "waiters are settled after both tasks complete");
});

test("withTestWaiter() decorator works with restartable()", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    }).restartable().withTestWaiter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while task is running");

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled after restarting task");

  Ember.run(() => {
    obj.resolvePromise();
  });

  assert.notOk(checkWaiters(), "waiters are settled after task completes");
});

test("withTestWaiter() decorator works with enqueue()", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromises = this.resolvePromises || [];
        this.resolvePromises.push(resolve);
      });
    }).enqueue().withTestWaiter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while task is running");

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.ok(checkWaiters(), "waiters are not settled while task is queued");

  Ember.run(() => {
    obj.resolvePromises[0]();
  });

  assert.ok(checkWaiters(), "waiters are not settled after only one task completes");

  Ember.run(() => {
    obj.resolvePromises[1]();
  });

  assert.notOk(checkWaiters(), "waiters are settled after both tasks complete");
});
