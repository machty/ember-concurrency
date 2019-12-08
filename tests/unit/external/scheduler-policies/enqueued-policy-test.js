import { module, test } from "qunit";
import EnqueuedPolicy from "ember-concurrency/-private/external/scheduler/policies/enqueued-policy";
import { typesFor } from "./helpers";

module("Unit: Enqueued policy", function() {
  test("maxConcurrency 1 cancels the earliest running instance", function(assert) {
    let policy = new EnqueuedPolicy(1);
    assert.deepEqual(typesFor(policy, 0, 1), ["STARTED"]);
    assert.deepEqual(typesFor(policy, 1, 1), ["STARTED", "QUEUED"]);
    assert.deepEqual(typesFor(policy, 1, 2), ["STARTED", "QUEUED", "QUEUED"]);
    assert.deepEqual(typesFor(policy, 1, 3), ["STARTED", "QUEUED", "QUEUED", "QUEUED"]);
  });

  test("maxConcurrency 2 keeps the first two running", function(assert) {
    let policy = new EnqueuedPolicy(2);
    assert.deepEqual(typesFor(policy, 0, 1), ["STARTED"]);
    assert.deepEqual(typesFor(policy, 1, 1), ["STARTED", "STARTED"]);
    assert.deepEqual(typesFor(policy, 1, 2), ["STARTED", "STARTED", "QUEUED"]);
    assert.deepEqual(typesFor(policy, 1, 3), ["STARTED", "STARTED", "QUEUED", "QUEUED"]);
  });
});
