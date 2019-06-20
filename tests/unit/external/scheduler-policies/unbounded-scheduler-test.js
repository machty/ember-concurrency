
import { module, test } from 'qunit';
import UnboundedPolicy from 'ember-concurrency/-private/external/scheduler/policies/unbounded-policy';
import { testScheduler } from './helpers';

module('Unit: SchedulerPolicy: Unbounded', function() {
  test("always requests that the instance be started", function(assert) {
    assert.expect(20);
    let policy = new UnboundedPolicy();
    [
      [1, 0],
      [3, 3],
    ].forEach(args => {
      testScheduler(policy, args).forEach(({ type }) => assert.equal(type, "STARTED"));
    });
  });
});
