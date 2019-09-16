import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';
import { get } from '@ember/object';

import { isEventedObject, yieldableToPromise } from './utils';

import {
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  YIELDABLE_THROW
} from './utils';

class WaitFor {
  then(...args) {
    return yieldableToPromise(this).then(...args);
  }
}

class WaitForQueueYieldable extends WaitFor {
  constructor(queueName) {
    super();
    this.queueName = queueName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    try {
      schedule(this.queueName, () => {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
      });
    } catch(error) {
      taskInstance.proceed(resumeIndex, YIELDABLE_THROW, error);
    }
  }
}

class WaitForEventYieldable extends WaitFor {
  constructor(object, eventName) {
    super();
    this.object = object;
    this.eventName = eventName;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let unbind = () => {};
    let didFinish = false;
    let fn = (event) => {
      didFinish = true;
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
        if (!didFinish) {
          this.object.off(this.eventName, fn);
        }
      };
    }
  }
}

class WaitForPropertyYieldable extends WaitFor {
  constructor(object, key, predicateCallback = Boolean) {
    super();
    this.object = object;
    this.key = key;

    if (typeof predicateCallback === 'function') {
      this.predicateCallback = predicateCallback;
    } else {
      this.predicateCallback = (v) => v === predicateCallback;
    }
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let observerFn = () => {
      let value = get(this.object, this.key);
      let predicateValue = this.predicateCallback(value);
      if (predicateValue) {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, value);
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
 * You can also pass in a non-Function value in place of the callback,
 * in which case the task will continue executing when the property's
 * value becomes the value that you passed in.
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
 *     // alternatively: yield waitForProperty(this, 'foo', 5);
 *
 *     // somewhere else: this.set('foo', 5)
 *
 *     console.log("`foo` is 5!");
 *
 *     // wait for another task to be idle before running:
 *     yield waitForProperty(this, 'otherTask.isIdle');
 *     console.log("otherTask is idle!");
 *   })
 * });
 * ```
 *
 * @param {object} object an object (most likely an Ember Object)
 * @param {string} key the property name that is observed for changes
 * @param {function} callbackOrValue a Function that should return a truthy value
 *                                   when the task should continue executing, or
 *                                   a non-Function value that the watched property
 *                                   needs to equal before the task will continue running
 */
export function waitForProperty(object, key, predicateCallback) {
  return new WaitForPropertyYieldable(object, key, predicateCallback);
}
