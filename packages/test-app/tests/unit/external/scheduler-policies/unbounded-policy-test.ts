import UnboundedPolicy from 'ember-concurrency/-private/external/scheduler/policies/unbounded-policy';
import { module, test } from 'qunit';
import { typesFor } from './helpers';

module('Unit: Unbounded policy', function () {
  test('always requests that the instance be started', function (assert) {
    let policy = new UnboundedPolicy();
    assert.deepEqual(typesFor(policy, 0, 1), ['STARTED']);
    assert.deepEqual(typesFor(policy, 1, 1), ['STARTED', 'STARTED']);
    assert.deepEqual(typesFor(policy, 1, 2), ['STARTED', 'STARTED', 'STARTED']);
    assert.deepEqual(typesFor(policy, 1, 3), [
      'STARTED',
      'STARTED',
      'STARTED',
      'STARTED',
    ]);
  });
});
