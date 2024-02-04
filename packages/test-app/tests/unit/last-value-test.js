import { module, test } from 'qunit';
import EmberObject from '@ember/object';
import { task, lastValue } from 'ember-concurrency';

module('Unit | lastValue', function () {
  test('without a default value', async function (assert) {
    class ObjectWithTask extends EmberObject {
      @task task = function* () {
        return yield 'foo';
      };

      @lastValue('task') value;
    }

    const instance = ObjectWithTask.create();
    assert.strictEqual(
      instance.value,
      undefined,
      'it returns nothing if the task has not been performed'
    );

    await instance.task.perform();

    assert.strictEqual(
      instance.value,
      'foo',
      'returning the last successful value'
    );
  });

  test('with a default value', async function (assert) {
    class ObjectWithTaskDefaultValue extends EmberObject {
      @task task = function* () {
        return yield 'foo';
      };

      @lastValue('task') value = 'default value';
    }

    const instance = ObjectWithTaskDefaultValue.create();

    assert.strictEqual(
      instance.value,
      'default value',
      'it returns the default value if the task has not been performed'
    );

    await instance.task.perform();

    assert.strictEqual(
      instance.value,
      'foo',
      'returning the last successful value'
    );
  });
});
