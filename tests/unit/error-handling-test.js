import Ember from 'ember';
import { task } from 'ember-concurrency';

module('Unit: task error handling');

test("explicitly canceling parent task: no errors", function(assert) {
  assert.expect(1);

  let childDefer;
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      yield this.get('child').perform();
    }),

    child: task(function * () {
      childDefer = Ember.RSVP.defer();
      yield childDefer.promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });
  assert.ok(childDefer);
  Ember.run(() => {
    obj.get('parent').cancelAll();
  });
});

test("parent task canceled by restartable policy: no errors", function(assert) {
  assert.expect(1);

  let childDefer;
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      yield this.get('child').perform();
    }).restartable(),

    child: task(function * () {
      childDefer = Ember.RSVP.defer();
      yield childDefer.promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });
  assert.ok(childDefer);
  Ember.run(() => {
    obj.get('parent').perform();
  });
});

test("parent task perform attempt canceled by drop policy: no errors", function(assert) {
  assert.expect(5);

  let childCancelationCount = 0;
  let childDefer;
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      yield this.get('child').perform();
    }).drop(),

    child: task(function * () {
      childDefer = Ember.RSVP.defer();
      try {
        yield childDefer.promise;
      } catch(e) {
        assert.equal(e.name, 'TaskCancelation');
        childCancelationCount++;
      }
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform(1);
  });
  assert.ok(childDefer);
  assert.equal(childCancelationCount, 0);

  Ember.run(() => {
    obj.get('parent').perform(2);
  });
  assert.equal(childCancelationCount, 0);

  Ember.run(() => {
    obj.get('parent').cancelAll();
  });
  assert.equal(childCancelationCount, 1);
});




