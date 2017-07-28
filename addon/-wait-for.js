import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';

import { isEventedObject } from './utils';

import {
  yieldableSymbol,
  YIELDABLE_CONTINUE
} from './utils';

class WaitForQueueYieldable {
  constructor(queueName) {
    this.queueName = queueName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    schedule(this.queueName, () => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
    });
  }
}

class WaitForEventYieldable {
  constructor(object, eventName) {
    this.object = object;
    this.eventName = eventName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let fn = (event) => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, event);
    };
    this.object.one(this.eventName, fn);
    return () => {
      this.object.off(this.eventName, fn);
    };
  }
}

/**
 * Use `waitForQueue` to pause the task until a certain run loop queue is reached.
 *
 * ```js
 * import { task, timeout, waitForQueue } from 'ember-concurrency';
 * export default Component.extend({
 *   myTask: task(function * () {
 *     yield waitForQueue('afterRender');
 *     console.log("now we're in the afterRender queue");
 *   })
 * });
 * ```
 *
 * @param {string} queueName the name of the Ember run loop queue
 */
export function waitForQueue(queueName) {
  return new WaitForQueueYieldable(queueName);
}

/**
 * Use `waitForEvent` to pause the task until an event is fired. The event
 * can either be a jQuery event or an Ember.Evented event (or any event system
 * where the object supports `.on()` `.one()` and `.off()`).
 *
 * ```js
 * import { task, timeout, waitForEvent } from 'ember-concurrency';
 * export default Component.extend({
 *   myTask: task(function * () {
 *     console.log("Please click anywhere..");
 *     let clickEvent = yield waitForEvent($('body'), 'click');
 *     console.log("Got event", clickEvent);
 *
 *     let emberEvent = yield waitForEvent(this, 'foo');
 *     console.log("Got foo event", emberEvent);
 *
 *     // somewhere else: component.trigger('foo', { value: 123 });
 *   })
 * });
 * ```
 *
 * @param {object} object the Ember Object or jQuery selector (with ,on(), .one(), and .off())
 *                 that the event fires from
 * @param {function} eventName the name of the event to wait for
 */
export function waitForEvent(object, eventName) {
  assert(`${object} must include Ember.Evented (or support \`.on()\`, \`.one()\`, and \`.off()\`) to be able to use \`waitForEvent\``, isEventedObject(object));
  return new WaitForEventYieldable(object, eventName);
}

