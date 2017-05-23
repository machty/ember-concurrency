import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: enqueueWithPriority');

test("The `enqueueWithPriority` modifier allows you to control the order that tasks are performed in", function(assert) {
  let performedTasks = [];
  let Obj = Ember.Object.extend({
    doStuff: task(function * (name, priority) {
      performedTasks.push(name);
    }).enqueueWithPriority(function(a, b) {
      let [nameA, priorityA] = a.args;
      let [nameB, priorityB] = b.args;
      return priorityB - priorityA;
    })
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.get('doStuff').perform('a', 1);
    obj.get('doStuff').perform('b', 2);
    obj.get('doStuff').perform('c', 3);
    obj.get('doStuff').perform('d', 4);
    obj.get('doStuff').perform('e', 5);
    obj.get('doStuff').perform('f', 6);
  });

  Ember.run(() => {
    assert.deepEqual(performedTasks, ['a', 'f', 'e', 'd', 'c', 'b'], 'Tasks have been sorted as expected');
  });
});

test("The `enqueueWithPriority` modifier allows you to control the order that tasks are performed in (2)", function(assert) {
  let performedTasks = [];
  let Obj = Ember.Object.extend({
    doStuff: task(function * (name, priority) {
      performedTasks.push(name);
    }).enqueueWithPriority(function(a, b) {
      let [nameA, priorityA] = a.args;
      let [nameB, priorityB] = b.args;
      return priorityB - priorityA;
    })
  });

  Ember.run(() => {
    let obj = Obj.create();
    obj.get('doStuff').perform('f', 6);
    obj.get('doStuff').perform('b', 2);
    obj.get('doStuff').perform('c', 3);
    obj.get('doStuff').perform('a', 1);
    obj.get('doStuff').perform('d', 4);
    obj.get('doStuff').perform('e', 5);
  });

  Ember.run(() => {
    assert.deepEqual(performedTasks, ['f', 'e', 'd', 'c', 'b', 'a'], 'Tasks have been sorted as expected');
  });
});

test("The `enqueueWithPriority` modifier behaves as expected across runloops", function(assert) {
  let performedTasks = [];
  let Obj = Ember.Object.extend({
    doStuff: task(function * (name, priority) {
      performedTasks.push(name);
    }).enqueueWithPriority(function(a, b) {
      let [nameA, priorityA] = a.args;
      let [nameB, priorityB] = b.args;
      return priorityB - priorityA;
    })
  });

  let obj;

  Ember.run(() => {
    obj = Obj.create();
    obj.get('doStuff').perform('f', 6);
    obj.get('doStuff').perform('b', 2);
    obj.get('doStuff').perform('c', 3);
  });

  Ember.run(() => {
    obj.get('doStuff').perform('a', 1);
    obj.get('doStuff').perform('d', 4);
    obj.get('doStuff').perform('e', 5);
  });

  Ember.run(() => {
    assert.deepEqual(performedTasks, ['f', 'c', 'b', 'a', 'e', 'd'], 'Tasks have been sorted as expected');
  });
});

