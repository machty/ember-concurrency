import { module, test } from 'qunit';
import KeepLatestPolicy from 'ember-concurrency/-private/external/scheduler/policies/keep-latest-policy';
import { typesFor } from './helpers';

module('Unit: KeepLatest policy', function () {
  test('maxConcurrency 1 keeps the first one running, cancels all in between', function (assert) {
    let policy = new KeepLatestPolicy(1);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['STARTED', 'QUEUED']);
    assert.deepEqual(typesFor(policy, 1, 2), [
      'STARTED',
      'CANCELLED',
      'QUEUED',
    ]);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'STARTED',
      'CANCELLED',
      'CANCELLED',
      'QUEUED',
    ]);
  });

  test('maxConcurrency 2 keeps the first two running, cancels all in between', function (assert) {
    let policy = new KeepLatestPolicy(2);
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 2, 1), ['STARTED', 'STARTED', 'QUEUED']);
    assert.deepEqual(typesFor(policy, 2, 1), ['STARTED', 'STARTED', 'QUEUED']);
    assert.deepEqual(typesFor(policy, 2, 2), [
      'STARTED',
      'STARTED',
      'CANCELLED',
      'QUEUED',
    ]);
    assert.deepEqual(typesFor(policy, 2, 3), [
      'STARTED',
      'STARTED',
      'CANCELLED',
      'CANCELLED',
      'QUEUED',
    ]);
  });
});
