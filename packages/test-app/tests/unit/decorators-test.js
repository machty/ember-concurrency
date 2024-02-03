import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { setOwner } from '@ember/application';
import {
  task,
  restartableTask,
  dropTask,
  keepLatestTask,
  enqueueTask,
} from 'ember-concurrency';
import { settled } from '@ember/test-helpers';

module('Unit | decorators', function () {
  test('Basic decorators functionality', function (assert) {
    assert.expect(5);

    class TestSubject {
      @task doStuff = function* () {
        yield;
        return 123;
      };

      @restartableTask
      a = function* () {
        yield;
        return 456;
      };

      @keepLatestTask
      b = function* () {
        yield;
        return 789;
      };

      @dropTask
      c = function* () {
        yield;
        return 12;
      };

      @enqueueTask
      d = function* () {
        yield;
        return 34;
      };
    }

    let subject;
    run(() => {
      subject = new TestSubject();

      setOwner(subject, this.owner);

      subject.doStuff.perform();
      subject.a.perform();
      subject.b.perform();
      subject.c.perform();
      subject.d.perform();
    });

    assert.strictEqual(subject.doStuff.last.value, 123);
    assert.strictEqual(subject.a.last.value, 456);
    assert.strictEqual(subject.b.last.value, 789);
    assert.strictEqual(subject.c.last.value, 12);
    assert.strictEqual(subject.d.last.value, 34);
  });

  test('Encapsulated tasks', function (assert) {
    assert.expect(1);

    class TestSubject {
      @task encapsulated = {
        privateState: 56,
        *perform() {
          yield;
          return this.privateState;
        },
      };
    }

    let subject;
    run(() => {
      subject = new TestSubject();
      setOwner(subject, this.owner);
      subject.encapsulated.perform();
    });
    assert.strictEqual(subject.encapsulated.last.value, 56);
  });

  test(
    '`observes` re-performs the task every time the observed property changes in a coalesced manner',
    async function (assert) {
      assert.expect(2);

      let values = [];
      class Obj extends EmberObject {
        foo = 0;

        @task({ observes: 'foo' })
        *observingTask() {
          values.push(this.foo);
        }
      }

      let obj = Obj.create();
      await settled();

      obj.set('foo', 1);
      obj.set('foo', 2);
      obj.set('foo', 3);
      await settled();

      assert.deepEqual(values, [3]);
      values = [];

      obj.set('foo', 4);
      obj.set('foo', 5);
      obj.set('foo', 6);
      await settled();

      assert.deepEqual(values, [6]);
    }
  );
});
