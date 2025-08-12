import { lastValue, task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit | lastValue', function () {
  test('without a default value', async function (assert) {
    class ObjectWithTask {
      task = task(async () => {
        return await 'foo';
      });

      @lastValue('task') value: any;
    }

    const instance = new ObjectWithTask();
    assert.strictEqual(
      instance.value,
      undefined,
      'it returns nothing if the task has not been performed',
    );

    await instance.task.perform();

    assert.strictEqual(
      instance.value,
      'foo',
      'returning the last successful value',
    );
  });

  test('with a default value', async function (assert) {
    class ObjectWithTaskDefaultValue {
      task = task(async () => {
        return await 'foo';
      });

      @lastValue('task') value = 'default value';
    }

    const instance = new ObjectWithTaskDefaultValue();

    assert.strictEqual(
      instance.value,
      'default value',
      'it returns the default value if the task has not been performed',
    );

    await instance.task.perform();

    assert.strictEqual(
      instance.value,
      'foo',
      'returning the last successful value',
    );
  });
});
