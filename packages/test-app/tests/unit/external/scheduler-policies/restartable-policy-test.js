import { module, test } from 'qunit';
import RestartablePolicy from 'ember-concurrency/-private/external/scheduler/policies/restartable-policy';
import { typesFor } from './helpers';

module('Unit: Restartable policy', function () {
  test('maxConcurrency 1 cancels the earliest running instance', function (assert) {
    let policy = new RestartablePolicy(1);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['CANCELLED', 'STARTED']);
    assert.deepEqual(typesFor(policy, 1, 2), [
      'CANCELLED',
      'CANCELLED',
      'STARTED',
    ]);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'CANCELLED',
      'CANCELLED',
      'CANCELLED',
      'STARTED',
    ]);
  });

  test('maxConcurrency 2 keeps the first two running', function (assert) {
    let policy = new RestartablePolicy(2);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['STARTED', 'STARTED']);
    assert.deepEqual(typesFor(policy, 1, 2), [
      'CANCELLED',
      'STARTED',
      'STARTED',
    ]);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'CANCELLED',
      'CANCELLED',
      'STARTED',
      'STARTED',
    ]);
  });
});
