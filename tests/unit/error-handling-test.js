import { run } from '@ember/runloop';
import { defer } from 'rsvp';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task error handling', function() {
  test("explicitly canceling parent task: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }),

      child: task(function * () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.get('parent').cancelAll();
    });
  });

  test("parent task canceled by restartable policy: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }).restartable(),

      child: task(function * () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.get('parent').perform();
    });
  });

  test("parent task perform attempt canceled by drop policy: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }).drop(),

      child: task(function * () {
        childDefer = defer();
        try {
          yield childDefer.promise;
        } catch(e) {
          assert.ok(false);
        }
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform(1);
    });
    assert.ok(childDefer);

    run(() => {
      obj.get('parent').perform(2);
    });

    run(() => {
      obj.get('parent').cancelAll();
    });
  });
});