import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';
import RSVP from 'rsvp';

module('Unit: EncapsulatedTask', function () {
  test('encapsulated tasks can be specified via a pojos with perform methods', function (assert) {
    assert.expect(2);

    let defer: any;

    class TestObj {
      myTask = task({
        async *perform(...args: any[]) {
          assert.deepEqual(args, [1, 2, 3]);
          defer = RSVP.defer();
          await defer.promise;
          return 123;
        },
      });
    }

    let obj: TestObj;
    run(() => {
      obj = new TestObj();
      obj.myTask.perform(1, 2, 3).then((v: any) => {
        assert.strictEqual(v, 123);
      });
    });
    run(defer, 'resolve');
  });

  test('encapsulated tasks can have their state accessed', async function (assert) {
    assert.expect(2);

    let defer: any;

    class TestObj {
      myTask = task({
        someProp: false,

        async *perform() {
          defer = RSVP.defer();
          await defer.promise;
          (this as any).set('someProp', true);
        },
      });
    }

    let obj = new TestObj();
    const taskInstance = obj.myTask.perform(1, 2, 3);
    assert.false((taskInstance as any).someProp);

    defer.resolve();
    await taskInstance;
    assert.true((taskInstance as any).someProp);
  });

  test('encapsulated tasks can access host context', async function (assert) {
    assert.expect(1);

    let defer: any;

    class TestObj {
      mySecretValue = 'pickle';

      myTask = task({
        someProp: false,

        async *perform() {
          defer = RSVP.defer();
          await defer.promise;
          return (this as any).context.mySecretValue;
        },
      });
    }

    let obj = new TestObj();
    const taskInstance = obj.myTask.perform();

    defer.resolve();
    const value = await taskInstance;
    assert.strictEqual(value, 'pickle');
  });

  test('encapsulated tasks can access task instance context', async function (assert) {
    assert.expect(2);

    let defer: any;

    class TestObj {
      myTask = task({
        amIRunning: reads('isRunning'),

        async *perform() {
          defer = RSVP.defer();
          await defer.promise;
          return 'blah';
        },
      });
    }

    let obj = new TestObj();
    const taskInstance = obj.myTask.perform();
    assert.true((taskInstance as any).amIRunning);

    defer.resolve();
    await taskInstance;
    assert.false((taskInstance as any).amIRunning);
  });

  test('encapsulated tasks work with native ES classes and decorators', function (assert) {
    assert.expect(2);

    let defer: any;

    class FakeGlimmerComponent {
      @task myTask = {
        async *perform(...args: any[]) {
          assert.deepEqual(args, [1, 2, 3]);
          defer = RSVP.defer();
          await defer.promise;
          return 123;
        },
      };
    }

    let obj: FakeGlimmerComponent;
    run(() => {
      obj = new FakeGlimmerComponent();
      (obj as any).myTask.perform(1, 2, 3).then((v: any) => {
        assert.strictEqual(v, 123);
      });
    });
    run(defer, 'resolve');
  });

  test('native ES class encapsulated tasks can modify their state', async function (assert) {
    assert.expect(4);

    let defer: any;

    class FakeComponent {
      @task myTask = {
        someProp: 0,

        doubled: computed('someProp', function () {
          return (this as any).someProp * 2;
        }),

        async *perform() {
          defer = RSVP.defer();
          let whatProp = (this as any).someProp;
          await defer.promise;
          // eslint-disable-next-line ember/classic-decorator-no-classic-methods
          (this as any).set('someProp', whatProp + 1);
        },
      };
    }

    let obj = new FakeComponent();
    const taskInstance = (obj as any).myTask.perform(1, 2, 3);
    assert.strictEqual((taskInstance as any).someProp, 0);
    assert.strictEqual((taskInstance as any).doubled, 0);

    defer.resolve();
    await taskInstance;
    assert.strictEqual((taskInstance as any).someProp, 1);
    assert.strictEqual((taskInstance as any).doubled, 2);
  });
});
