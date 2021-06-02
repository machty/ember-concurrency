import { setProperties } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import { gte } from 'ember-compatibility-helpers';
import { EMBER_ENVIRONMENT } from './ember-environment';
import { Yieldable } from './external/yieldables';

export const USE_TRACKED = gte('3.16.0');
export const assignProperties = USE_TRACKED ? Object.assign : setProperties;

export function isEventedObject(c) {
  return (
    c &&
    ((typeof c.one === 'function' && typeof c.off === 'function') ||
      (typeof c.on === 'function' && typeof c.off === 'function') ||
      (typeof c.addEventListener === 'function' &&
        typeof c.removeEventListener === 'function'))
  );
}

export class EmberYieldable extends Yieldable {
  _deferable() {
    return EMBER_ENVIRONMENT.defer();
  }
}

class TimeoutYieldable extends EmberYieldable {
  constructor(ms) {
    super();
    this.ms = ms;
  }

  onYield(state) {
    let timerId = later(() => state.next(), this.ms);

    return () => cancel(timerId);
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
 * export default class MyComponent extends Component {
 *   &#64;task *myTask() {
 *     while (true) {
 *       console.log("Hello!");
 *       yield timeout(1000);
 *     }
 *   }
 * }
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
  console.warn(
    `an Ember addon is importing a private ember-concurrency module '${moduleName}' that has moved`
  );
}
