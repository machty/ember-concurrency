import { run } from '@ember/runloop';
import { defer } from 'rsvp';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task error handling', function () {
  test('explicitly canceling parent task: no errors', function (assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function* () {
        yield this.child.perform();
      }),

      child: task(function* () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.parent.cancelAll();
    });
  });

  test('synchronous errors can be caught asynchronously', function (assert) {
    assert.expect(1);

    let Obj = EmberObject.extend({
      throwError: task(function* () {
        throw new Error('This error should be caught');
      }),
    });

    run(() => {
      let obj = Obj.create();

      obj.throwError.perform().catch((e) => {
        assert.strictEqual(
          e.message,
          'This error should be caught',
          'The thrown error was caught'
        );
      });
    });
  });

  test('parent task canceled by restartable policy: no errors', function (assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function* () {
        yield this.child.perform();
      }).restartable(),

      child: task(function* () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.parent.perform();
    });
  });

  test('parent task perform attempt canceled by drop policy: no errors', function (assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function* () {
        yield this.child.perform();
      }).drop(),

      child: task(function* () {
        childDefer = defer();
        try {
          yield childDefer.promise;
        } catch (e) {
          assert.ok(false);
        }
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.parent.perform(1);
    });
    assert.ok(childDefer);

    run(() => {
      obj.parent.perform(2);
    });

    run(() => {
      obj.parent.cancelAll();
    });
  });
});
