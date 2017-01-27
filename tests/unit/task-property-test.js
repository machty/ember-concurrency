import Ember from 'ember';
import { task, interval } from 'ember-concurrency';
import { TaskProperty } from 'ember-concurrency/-task-property';
import { module, test } from 'qunit';

module('Unit: task property', {
  beforeEach() {
    this.taskRunCounter = 0;
    let testContext = this;

    TaskProperty.prototype.withCounter = function() {
      if (Ember.testing) {
        let originalTaskFn = this.taskFn;

        this.taskFn = function * (...args) {
          testContext.taskRunCounter += 1;
          try {
            return yield * originalTaskFn.apply(this, args);
          } finally {
            testContext.taskRunCounter -= 1;
          }
        };
      }

      return this;
    }
  },

  afterEach() {
    delete TaskProperty.prototype.withCounter;
  }
});

test("custom modifier works", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    }).withCounter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.resolvePromise();
  });

  assert.equal(this.taskRunCounter, 0);
});

test("custom modifier works with concurrent tasks", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromises = this.resolvePromises || [];
        this.resolvePromises.push(resolve);
      });
    }).withCounter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 2);

  Ember.run(() => {
    obj.resolvePromises[0]();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.resolvePromises[1]();
  });

  assert.equal(this.taskRunCounter, 0);
});

test("withCounter() decorator works with restartable()", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    }).restartable().withCounter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.resolvePromise();
  });

  assert.equal(this.taskRunCounter, 0);
});

test("withCounter() decorator works with enqueue()", function(assert) {
  let Obj = Ember.Object.extend({
    doStuff: task(function * () {
      return yield new Ember.RSVP.Promise((resolve) => {
        this.resolvePromises = this.resolvePromises || [];
        this.resolvePromises.push(resolve);
      });
    }).enqueue().withCounter(),
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.get('doStuff').perform();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.resolvePromises[0]();
  });

  assert.equal(this.taskRunCounter, 1);

  Ember.run(() => {
    obj.resolvePromises[1]();
  });

  assert.equal(this.taskRunCounter, 0);
});
