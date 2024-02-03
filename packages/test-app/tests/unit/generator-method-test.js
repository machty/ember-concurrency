import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import {
  task,
  restartableTask,
  dropTask,
  keepLatestTask,
  enqueueTask,
} from 'ember-concurrency';

module('Unit | generator method', function () {
  test('Basic decorators functionality', function (assert) {
    assert.expect(5);

    class TestSubject {
      @task
      *doStuff() {
        yield;
        return 123;
      }

      @restartableTask
      *a() {
        yield;
        return 456;
      }

      @keepLatestTask
      *b() {
        yield;
        return 789;
      }

      @dropTask
      *c() {
        yield;
        return 12;
      }

      @enqueueTask
      *d() {
        yield;
        return 34;
      }
    }

    let subject;
    run(() => {
      subject = new TestSubject();
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
});
