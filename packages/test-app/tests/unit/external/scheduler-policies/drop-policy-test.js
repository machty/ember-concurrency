import { module, test } from 'qunit';
import DropPolicy from 'ember-concurrency/-private/external/scheduler/policies/drop-policy';
import { typesFor } from './helpers';

module('Unit: Drop policy', function () {
  test('maxConcurrency 1 cancels the earliest running instance', function (assert) {
    let policy = new DropPolicy(1);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['STARTED', 'CANCELLED']);
    assert.deepEqual(typesFor(policy, 1, 2), [
      'STARTED',
      'CANCELLED',
      'CANCELLED',
    ]);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'STARTED',
      'CANCELLED',
      'CANCELLED',
      'CANCELLED',
    ]);
  });

  test('maxConcurrency 2 keeps the first two running', function (assert) {
    let policy = new DropPolicy(2);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['STARTED', 'STARTED']);
    assert.deepEqual(typesFor(policy, 1, 2), [
      'STARTED',
      'STARTED',
      'CANCELLED',
    ]);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'STARTED',
      'STARTED',
      'CANCELLED',
      'CANCELLED',
    ]);
  });
});
