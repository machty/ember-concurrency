import { defer } from 'rsvp';
import Evented, { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';
import sinon from 'sinon';

function assertEventFired(assert, event, stub, ...args) {
  assert.ok(
    stub.calledOnceWith(...args),
    `expected '${event}' event callback to have been called`
  );
}

function assertEventNotFired(assert, event, stub) {
  assert.notOk(
    stub.called,
    `expected '${event}' event callback not to have been called`
  );
}

module('Unit: task events', function() {
  test("tasks fire task instance lifecycle events on the host object (task succeeds)", function(assert) {
    assert.expect(7);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    let Obj = EmberObject.extend(Evented, {
      doThings: task(function* (deferred) {
        yield deferred.promise;
      }).evented(),

      startedListener: on('doThings:started', startedStub),
      succeededListener: on('doThings:succeeded', succeededStub),
      canceledListener: on('doThings:canceled', canceledStub),
      erroredListener: on('doThings:errored', erroredStub)
    });

    let deferred, obj, taskInstance;

    run(() => {
      deferred = defer();
      obj = Obj.create();
      taskInstance = obj.get('doThings').perform(deferred);
    });

    assertEventFired(assert, 'started', startedStub, taskInstance);
    assertEventNotFired(assert, 'succeeded', succeededStub);
    assertEventNotFired(assert, 'canceled', canceledStub);
    assertEventNotFired(assert, 'errored', erroredStub);

    run(deferred, 'resolve', 123);

    assertEventFired(assert, 'succeeded', succeededStub, taskInstance);
    assertEventNotFired(assert, 'canceled', canceledStub);
    assertEventNotFired(assert, 'errored', erroredStub);
  });

  test("tasks fire task instance lifecycle events on the host object (task errors)", function(assert) {
    assert.expect(8);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    let Obj = EmberObject.extend(Evented, {
      doThings: task(function* (deferred) {
        yield deferred.promise;
      }).evented(),

      startedListener: on('doThings:started', startedStub),
      succeededListener: on('doThings:succeeded', succeededStub),
      canceledListener: on('doThings:canceled', canceledStub),
      erroredListener: on('doThings:errored', erroredStub)
    });

    let deferred, obj, taskInstance;

    let error = new Error("someone unplugged the network");

    run(() => {
      deferred = defer();
      obj = Obj.create();
      taskInstance = obj.get('doThings').perform(deferred);
      taskInstance.catch((e) => {
        assert.equal(e.message, "someone unplugged the network");
      });
    });

    assertEventFired(assert, 'started', startedStub, taskInstance);
    assertEventNotFired(assert, 'succeeded', succeededStub);
    assertEventNotFired(assert, 'canceled', canceledStub);
    assertEventNotFired(assert, 'errored', erroredStub);

    run(deferred, 'reject', error);

    assertEventFired(assert, 'errored', erroredStub, taskInstance, error);
    assertEventNotFired(assert, 'succeeded', succeededStub);
    assertEventNotFired(assert, 'canceled', canceledStub);
  });

  test("tasks fire task instance lifecycle events on the host object (task canceled)", function(assert) {
    assert.expect(7);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    let Obj = EmberObject.extend(Evented, {
      doThings: task(function* (deferred) {
        yield deferred.promise;
      }).evented(),

      startedListener: on('doThings:started', startedStub),
      succeededListener: on('doThings:succeeded', succeededStub),
      canceledListener: on('doThings:canceled', canceledStub),
      erroredListener: on('doThings:errored', erroredStub)
    });

    let deferred, obj, taskInstance;

    run(() => {
      deferred = defer();
      obj = Obj.create();
      taskInstance = obj.get('doThings').perform(deferred);
    });

    assertEventFired(assert, 'started', startedStub, taskInstance);
    assertEventNotFired(assert, 'succeeded', succeededStub);
    assertEventNotFired(assert, 'canceled', canceledStub);
    assertEventNotFired(assert, 'errored', erroredStub);

    run(taskInstance, 'cancel', 'I just felt like it');

    assertEventFired(assert, 'canceled', canceledStub, taskInstance,
      "TaskInstance 'doThings' was canceled because I just felt like it. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help"
    );
    assertEventNotFired(assert, 'errored', erroredStub);
    assertEventNotFired(assert, 'succeeded', succeededStub);
  });
});
