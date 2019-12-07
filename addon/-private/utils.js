import ComputedProperty from '@ember/object/computed';
import { later, cancel } from '@ember/runloop';
import Ember from 'ember';
import {
  Yieldable,
  yieldableSymbol,
  YIELDABLE_CONTINUE,
  cancelableSymbol
} from "./external/yieldables";

export function isEventedObject(c) {
  return (c && (
    (typeof c.one === 'function' && typeof c.off === 'function') ||
    (typeof c.addEventListener === 'function' && typeof c.removeEventListener === 'function')
  ));
}

export let INVOKE = "__invoke_symbol__";

let locations = [
  '@ember/-internals/glimmer/index',
  '@ember/-internals/glimmer',
  'ember-glimmer',
  'ember-glimmer/helpers/action',
  'ember-routing-htmlbars/keywords/closure-action',
  'ember-routing/keywords/closure-action'
];

for (let i = 0; i < locations.length; i++) {
  if (locations[i] in Ember.__loader.registry) {
    INVOKE = Ember.__loader.require(locations[i])['INVOKE'];
    break;
  }
}

export const _ComputedProperty = ComputedProperty;

class TimeoutYieldable extends Yieldable {
  constructor(ms) {
    super();
    this.ms = ms;
    this.timerId = null;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    this.timerId = later(() => {
      taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, taskInstance._result);
    }, this.ms);
  }

  [cancelableSymbol]() {
    cancel(this.timerId);
    this.timerId = null;
  }
}

/**
 *
 * Yielding `timeout(ms)` will pause a task for the duration
 * of time passed in, in milliseconds.
 *
 * This timeout will be scheduled on the Ember runloop, which
 * means that test helpers will wait for it to complete before
 * continuing with the test. See `rawTimeout()` if you need
 * different behavior.
 *
 * The task below, when performed, will print a message to the
 * console every second.
 *
 * ```js
 * export default Component.extend({
 *   myTask: task(function * () {
 *     while (true) {
 *       console.log("Hello!");
 *       yield timeout(1000);
 *     }
 *   })
 * });
 * ```
 *
 * @param {number} ms - the amount of time to sleep before resuming
 *   the task, in milliseconds
 */
export function timeout(ms) {
  return new TimeoutYieldable(ms);
}

export function deprecatePrivateModule(moduleName) {
  // eslint-disable-next-line no-console
  console.warn(`an Ember addon is importing a private ember-concurrency module '${moduleName}' that has moved`);
}
