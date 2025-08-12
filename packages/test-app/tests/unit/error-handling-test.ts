import { run } from '@ember/runloop';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';
import { defer } from 'rsvp';

module('Unit: task error handling', function () {
  test('explicitly canceling parent task: no errors', function (assert) {
    assert.expect(1);

    let childDefer: any;

    class TestObject {
      parent = task(async () => {
        await this.child.perform();
      });

      child = task(async () => {
        childDefer = defer();
        await childDefer.promise;
      });
    }

    let obj = new TestObject();
    run(() => {
      obj.parent.perform();
    });
    assert.ok(childDefer);
    run(() => {
      (obj.parent as any).cancelAll();
    });
  });

  test('synchronous errors can be caught asynchronously', function (assert) {
    assert.expect(1);

    class TestObject {
      throwError = task(async () => {
        throw new Error('This error should be caught');
      });
    }

    run(() => {
      let obj = new TestObject();

      obj.throwError.perform().catch((e: any) => {
        assert.strictEqual(
          e.message,
          'This error should be caught',
          'The thrown error was caught',
        );
      });
    });
  });

  test('parent task canceled by restartable policy: no errors', function (assert) {
    assert.expect(1);

    let childDefer: any;

    class TestObject {
      parent = task({ restartable: true }, async () => {
        await this.child.perform();
      });

      child = task(async () => {
        childDefer = defer();
        await childDefer.promise;
      });
    }

    let obj = new TestObject();
    run(() => {
      obj.parent.perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.parent.perform();
    });
  });

  test('parent task perform attempt canceled by drop policy: no errors', function (assert) {
    assert.expect(1);

    let childDefer: any;

    class TestObject {
      parent = task({ drop: true }, async () => {
        await this.child.perform();
      });

      child = task(async () => {
        childDefer = defer();
        try {
          await childDefer.promise;
        } catch (e) {
          assert.ok(false);
        }
      });
    }

    let obj = new TestObject();
    run(() => {
      obj.parent.perform(1);
    });
    assert.ok(childDefer);

    run(() => {
      obj.parent.perform(2);
    });

    run(() => {
      (obj.parent as any).cancelAll();
    });
  });
});
