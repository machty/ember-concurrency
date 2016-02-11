import Ember from 'ember';
import { task } from 'ember-concurrency';

module('Unit: task states');

test("isIdle is true if the task fn never yields", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    myTask: task(function * () { })
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    assert.equal(obj.get('myTask.isIdle'), true);
    obj.get('myTask').perform();
    assert.equal(obj.get('myTask.isIdle'), true);
  });
});

test("isIdle is false when task is blocked on a yield", function(assert) {
  assert.expect(7);

  let defers = [];
  let Obj = Ember.Object.extend({
    myTask: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      yield defer.promise;
    })
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });

  Ember.run(() => {
    let t = obj.get('myTask');
    assert.equal(t.get('isIdle'), true);
    t.perform();
  });

  Ember.run(() => {
    let t = obj.get('myTask');
    assert.equal(t.get('isIdle'), false);
    assert.equal(t.get('concurrency'), 1);
    t.perform();
  });

  Ember.run(() => {
    let t = obj.get('myTask');
    assert.equal(t.get('isIdle'), false);
    assert.equal(t.get('concurrency'), 2);
    defers.forEach(d => d.resolve());
  });

  Ember.run(() => {
    let t = obj.get('myTask');
    assert.equal(t.get('isIdle'), true);
    assert.equal(t.get('concurrency'), 0);
  });
});

//test("isIdle returns to true even on errors", function(assert) {
// TODO: test me...
//});



