import { module } from "qunit";
import { run } from "@ember/runloop";
import { setOwner } from "@ember/application";
import {
  task,
  restartableTask,
  dropTask,
  keepLatestTask,
  enqueueTask,
} from "ember-concurrency-decorators";
import { decoratorTest } from '../helpers/helpers';

module("Unit | legacy interop with e-c-decorators", function () {
  decoratorTest("Basic decorators functionality", function (assert) {
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

    assert.equal(subject.doStuff.last.value, 123);
    assert.equal(subject.a.last.value, 456);
    assert.equal(subject.b.last.value, 789);
    assert.equal(subject.c.last.value, 12);
    assert.equal(subject.d.last.value, 34);
  });

  decoratorTest("Encapsulated tasks", function (assert) {
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
    assert.equal(subject.encapsulated.last.value, 56);
  });
});
