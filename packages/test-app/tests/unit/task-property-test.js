import { setOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { settled } from '@ember/test-helpers';
import { forever, task, TaskProperty } from 'ember-concurrency';
import { module, test } from 'qunit';

let taskRunCounter = 0;
function taskCounterWrapper(taskProperty) {
  let originalTaskFn = taskProperty.taskFn;

  taskProperty.taskFn = function* (...args) {
    taskRunCounter += 1;
    try {
      return yield* originalTaskFn.apply(this, args);
    } finally {
      // eslint-disable-next-line require-atomic-updates
      taskRunCounter -= 1;
    }
  };

  return taskProperty;
}

module('Unit: task property', function () {
  test('`TaskProperty`s can be extended with custom functionality / decoration', async function (assert) {
    assert.expect(4);

    let Obj = EmberObject.extend({
      doStuff: taskCounterWrapper(
        task(function* () {
          yield forever;
        })
      ),
    });

    let obj;

    assert.strictEqual(taskRunCounter, 0);

    obj = Obj.create();
    obj.doStuff.perform();
    assert.strictEqual(taskRunCounter, 1);

    obj.doStuff.perform();
    assert.strictEqual(taskRunCounter, 2);

    await settled();

    obj.doStuff.cancelAll();
    assert.strictEqual(taskRunCounter, 0);
  });

  test('`TaskProperty` extends can be turned on via decorators', async function (assert) {
    assert.expect(4);

    try {
      TaskProperty.prototype.countable = function () {
        return taskCounterWrapper(this);
      };

      class TestSubject {
        @task({ countable: true }) *doStuff() {
          yield forever;
        }
      }

      assert.strictEqual(taskRunCounter, 0);

      let obj = new TestSubject();
      setOwner(obj, this.owner);

      obj.doStuff.perform();
      assert.strictEqual(taskRunCounter, 1);

      obj.doStuff.perform();
      assert.strictEqual(taskRunCounter, 2);

      obj.doStuff.cancelAll();

      await settled();

      assert.strictEqual(taskRunCounter, 0);
    } finally {
      delete TaskProperty.prototype.countable;
    }
  });
});
