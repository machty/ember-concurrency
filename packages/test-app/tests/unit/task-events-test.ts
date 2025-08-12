import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';
import { defer } from 'rsvp';
import sinon from 'sinon';

function assertEventFired(
  assert: any,
  event: string,
  stub: any,
  ...args: any[]
): void {
  assert.ok(
    stub.calledOnceWith(...args),
    `expected '${event}' event callback to have been called`,
  );
}

function assertEventNotFired(assert: any, event: string, stub: any): void {
  assert.notOk(
    stub.called,
    `expected '${event}' event callback not to have been called`,
  );
}

// Create a base class that implements Evented
class EventedClass {
  // Implement minimal Evented interface
  trigger(eventName: string, ...args: any[]): void {
    const listeners = (this as any)._eventedListeners?.[eventName] || [];
    listeners.forEach((listener: any) => listener(...args));
  }

  on(eventName: string, handler: Function): void {
    (this as any)._eventedListeners = (this as any)._eventedListeners || {};
    (this as any)._eventedListeners[eventName] =
      (this as any)._eventedListeners[eventName] || [];
    (this as any)._eventedListeners[eventName].push(handler);
  }
}

module('Unit: task events', function () {
  test('tasks fire task instance lifecycle events on the host object (task succeeds)', function (assert) {
    assert.expect(7);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    class TestObj extends EventedClass {
      doThings = task(async (deferred: any) => {
        await deferred.promise;
      }).evented();

      startedListener = on('doThings:started', startedStub);
      succeededListener = on('doThings:succeeded', succeededStub);
      canceledListener = on('doThings:canceled', canceledStub);
      erroredListener = on('doThings:errored', erroredStub);

      constructor() {
        super();
        // Manually set up event listeners since we're not using EmberObject
        this.on('doThings:started', startedStub);
        this.on('doThings:succeeded', succeededStub);
        this.on('doThings:canceled', canceledStub);
        this.on('doThings:errored', erroredStub);
      }
    }

    let deferred: any, obj: TestObj, taskInstance: any;

    run(() => {
      deferred = defer();
      obj = new TestObj();
      taskInstance = obj.doThings.perform(deferred);
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

  test('tasks fire task instance lifecycle events on the host object (task errors)', function (assert) {
    assert.expect(8);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    class TestObj extends EventedClass {
      doThings = task(async (deferred: any) => {
        await deferred.promise;
      }).evented();

      startedListener = on('doThings:started', startedStub);
      succeededListener = on('doThings:succeeded', succeededStub);
      canceledListener = on('doThings:canceled', canceledStub);
      erroredListener = on('doThings:errored', erroredStub);

      constructor() {
        super();
        // Manually set up event listeners since we're not using EmberObject
        this.on('doThings:started', startedStub);
        this.on('doThings:succeeded', succeededStub);
        this.on('doThings:canceled', canceledStub);
        this.on('doThings:errored', erroredStub);
      }
    }

    let deferred: any, obj: TestObj, taskInstance: any;

    let error = new Error('someone unplugged the network');

    run(() => {
      deferred = defer();
      obj = new TestObj();
      taskInstance = obj.doThings.perform(deferred);
      taskInstance.catch((e: any) => {
        assert.strictEqual(e.message, 'someone unplugged the network');
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

  test('tasks fire task instance lifecycle events on the host object (task canceled)', function (assert) {
    assert.expect(7);

    const startedStub = sinon.stub();
    const succeededStub = sinon.stub();
    const canceledStub = sinon.stub();
    const erroredStub = sinon.stub();

    class TestObj extends EventedClass {
      doThings = task(async (deferred: any) => {
        await deferred.promise;
      }).evented();

      startedListener = on('doThings:started', startedStub);
      succeededListener = on('doThings:succeeded', succeededStub);
      canceledListener = on('doThings:canceled', canceledStub);
      erroredListener = on('doThings:errored', erroredStub);

      constructor() {
        super();
        // Manually set up event listeners since we're not using EmberObject
        this.on('doThings:started', startedStub);
        this.on('doThings:succeeded', succeededStub);
        this.on('doThings:canceled', canceledStub);
        this.on('doThings:errored', erroredStub);
      }
    }

    let deferred: any, obj: TestObj, taskInstance: any;

    run(() => {
      deferred = defer();
      obj = new TestObj();
      taskInstance = obj.doThings.perform(deferred);
    });

    assertEventFired(assert, 'started', startedStub, taskInstance);
    assertEventNotFired(assert, 'succeeded', succeededStub);
    assertEventNotFired(assert, 'canceled', canceledStub);
    assertEventNotFired(assert, 'errored', erroredStub);

    run(taskInstance, 'cancel', 'I just felt like it');

    assertEventFired(
      assert,
      'canceled',
      canceledStub,
      taskInstance,
      "TaskInstance 'doThings' was canceled because I just felt like it. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help",
    );
    assertEventNotFired(assert, 'errored', erroredStub);
    assertEventNotFired(assert, 'succeeded', succeededStub);
  });
});
