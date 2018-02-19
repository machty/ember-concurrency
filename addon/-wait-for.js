import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';
import { get } from '@ember/object';

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
    let unbind = () => {};
    let fn = (event) => {
      unbind();
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, event);
    };

    if (typeof this.object.addEventListener === 'function') {
      // assume that we're dealing with a DOM `EventTarget`.
      this.object.addEventListener(this.eventName, fn);

      // unfortunately this is required, because IE 11 does not support the
      // `once` option: https://caniuse.com/#feat=once-event-listener
      unbind = () => {
        this.object.removeEventListener(this.eventName, fn);
      };

      return unbind;
    } else {
      // assume that we're dealing with either `Ember.Evented` or a compatible
      // interface, like jQuery.
      this.object.one(this.eventName, fn);

      return () => {
        this.object.off(this.eventName, fn);
      };
    }
  }
}

class WaitForPropertyYieldable {
  constructor(object, key, predicateCallback) {
    this.object = object;
    this.key = key;
    this.predicateCallback = predicateCallback || Boolean;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let observerFn = () => {
      let value = get(this.object, this.key);
      let predicateValue = this.predicateCallback(value);
      if (predicateValue) {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, predicateValue);
        return true;
      }
    };

    if (!observerFn()) {
      this.object.addObserver(this.key, null, observerFn);
      return () => {
        this.object.removeObserver(this.key, null, observerFn);
      };
    }
  }
}

/**
 * Use `waitForQueue` to pause the task until a certain run loop queue is reached.
 *
 * ```js
 * import { task, waitForQueue } from 'ember-concurrency';
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
 * import { task, waitForEvent } from 'ember-concurrency';
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
  assert(`${object} must include Ember.Evented (or support \`.one()\` and \`.off()\`) or DOM EventTarget (or support \`addEventListener\` and  \`removeEventListener\`) to be able to use \`waitForEvent\``, isEventedObject(object));
  return new WaitForEventYieldable(object, eventName);
}

/**
 * Use `waitForProperty` to pause the task until a property on an object
 * changes to some expected value. This can be used for a variety of use
 * cases, including synchronizing with another task by waiting for it
 * to become idle, or change state in some other way. If you omit the
 * callback, `waitForProperty` will resume execution when the observed
 * property becomes truthy. If you provide a callback, it'll be called
 * immediately with the observed property's current value, and multiple
 * times thereafter whenever the property changes, until you return
 * a truthy value from the callback, or the current task is canceled.
 *
 * ```js
 * import { task, waitForProperty } from 'ember-concurrency';
 * export default Component.extend({
 *   foo: 0,
 *
 *   myTask: task(function * () {
 *     console.log("Waiting for `foo` to become 5");
 *
 *     yield waitForProperty(this, 'foo', v => v === 5);
 *
 *     // somewhere else: this.set('foo', 5)
 *
 *     console.log("`foo` is 5!");
 *   })
 * });
 * ```
 *
 * @param {object} an object (most likely an Ember Object)
 * @param {string} the property name that is observed for changes
 * @param {function} the callback that should return when the task should continue
 *                   executing
 */
export function waitForProperty(object, key, predicateCallback) {
  return new WaitForPropertyYieldable(object, key, predicateCallback);
}
