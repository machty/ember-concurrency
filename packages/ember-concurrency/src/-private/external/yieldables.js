export const cancelableSymbol = '__ec_cancel__';
export const yieldableSymbol = '__ec_yieldable__';
export const YIELDABLE_CONTINUE = 'next';
export const YIELDABLE_THROW = 'throw';
export const YIELDABLE_RETURN = 'return';
export const YIELDABLE_CANCEL = 'cancel';

/**
 * @class YieldableState
 * @hideconstructor
 */
class YieldableState {
  constructor(taskInstance, resumeIndex) {
    this._taskInstance = taskInstance;
    this._resumeIndex = resumeIndex;
  }

  /**
   * Return yielded TaskInstance. Useful for introspection on instance state.
   * @method getTaskInstance
   * @memberof YieldableState
   * @public
   * @instance
   */
  getTaskInstance() {
    return this._taskInstance;
  }

  /**
   * Cancel the yielded TaskInstance.
   * @method cancel
   * @memberof YieldableState
   * @public
   * @instance
   */
  cancel() {
    let taskInstance = this._taskInstance;
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_CANCEL
    );
  }

  /**
   * Cause the TaskInstance to return from its yield with an optional value,
   * and continue executing.
   * @method next
   * @memberof YieldableState
   * @param value
   * @public
   * @instance
   */
  next(value) {
    let taskInstance = this._taskInstance;
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_CONTINUE,
      value
    );
  }

  /**
   * Short-circuit TaskInstance execution and have it return with an optional
   * value.
   * @method return
   * @memberof YieldableState
   * @param value
   * @public
   * @instance
   */
  return(value) {
    let taskInstance = this._taskInstance;
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_RETURN,
      value
    );
  }

  /**
   * Raise a given error within the given task instance and halt execution
   * @method throw
   * @memberof YieldableState
   * @param error
   * @public
   * @instance
   */
  throw(error) {
    let taskInstance = this._taskInstance;
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_THROW,
      error
    );
  }
}

/**
 * Yieldables are a primitive for building safe, cancelation-aware ways to
 * instrument and introspect the runtime of a task. Many Yieldables are built-in
 * to ember-concurrency today, such as `timeout`, `animationFrame`, and
 * `rawTimeout`.
 *
 * For example, if I wanted to implement a yieldable for `requestIdleCallback`,
 * I could do the following:
 *
 * ```javascript
 * import Component from '@glimmer/component';
 * import { task, Yieldable } from 'ember-concurrency';
 *
 * class IdleCallbackYieldable extends Yieldable {
 *   onYield(state) {
 *     let callbackId = requestIdleCallback(() => state.next());
 *
 *     return () => cancelIdleCallback(callbackId);
 *   }
 * }
 *
 * const idleCallback = () => new IdleCallbackYieldable();
 *
 * class MyComponent extends Component {
 *   &#64;task *backgroundTask() {
 *     while (1) {
 *       yield idleCallback();
 *
 *       const data = this.complicatedNumberCrunching();
 *       yield this.sendData(data);
 *     }
 *   }
 * }
 * ```
 *
 * In general, `Yieldable` instances **should** be reusable across calls, and thus
 * care should be taken to ensure that teardown is provided and state not
 * intended to be shared across calls stay inside `onYield`.
 *
 * `Yieldable` also provides automatic Promise-casting.
 *
 * <style>
 *   .ignore-this--this-is-here-to-hide-constructor,
 *   #Yieldable { display: none }
 * </style>
 *
 * @class Yieldable
 */
export class Yieldable {
  constructor() {
    this[yieldableSymbol] = this[yieldableSymbol].bind(this);
  }

  /**
   * Defines what happens when the task encounters `yield myYieldable` and returns
   * a disposer function that handles any cleanup.
   *
   * The state parameter is provided by the runtime, and provides operations for
   * interacting with the yielding task instance and advancing, returning,
   * throwing, or canceling its execution.
   *
   * @method onYield
   * @memberof Yieldable
   * @param {YieldableState} state
   * @instance
   * @public
   */
  onYield() {}

  _deferable() {
    let def = { resolve: undefined, reject: undefined };

    def.promise = new Promise((resolve, reject) => {
      def.resolve = resolve;
      def.reject = reject;
    });

    return def;
  }

  _toPromise() {
    let def = this._deferable();

    let thinInstance = {
      proceed(_index, resumeType, value) {
        if (
          resumeType == YIELDABLE_CONTINUE ||
          resumeType == YIELDABLE_RETURN
        ) {
          def.resolve(value);
        } else {
          def.reject(value);
        }
      },
    };

    let maybeDisposer = this[yieldableSymbol](thinInstance, 0);
    def.promise[cancelableSymbol] = maybeDisposer;

    return def.promise;
  }

  /**
   * Returns a promise that resolves with the value yielded back to or returned
   * to the yielded task, or rejects with either the exception thrown from the
   * Yieldable, or an error with a `.name` property with value `"TaskCancelation"`.
   *
   * @method then
   * @memberof Yieldable
   * @instance
   * @return {Promise}
   */
  then(...args) {
    return this._toPromise().then(...args);
  }

  /**
   * @method catch
   * @memberof Yieldable
   * @instance
   * @return {Promise}
   */
  catch(...args) {
    return this._toPromise().catch(...args);
  }

  /**
   * @method finally
   * @memberof Yieldable
   * @instance
   * @return {Promise}
   */
  finally(...args) {
    return this._toPromise().finally(...args);
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    let state = new YieldableState(taskInstance, resumeIndex);

    return this.onYield(state);
  }
}

class AnimationFrameYieldable extends Yieldable {
  onYield(state) {
    let timerId = requestAnimationFrame(() => state.next());

    return () => cancelAnimationFrame(timerId);
  }
}

class ForeverYieldable extends Yieldable {
  onYield() {}
}

class RawTimeoutYieldable extends Yieldable {
  constructor(ms) {
    super();
    this.ms = ms;
  }

  onYield(state) {
    let timerId = setTimeout(() => state.next(), this.ms);

    return () => clearTimeout(timerId);
  }
}

/**
 * Yielding `animationFrame()` will pause a task until after the next animation
 * frame using the native `requestAnimationFrame()` browser API.
 *
 * The task below, when performed, will print the time since the last loop run
 * for every animation frame.
 *
 * ```js
 * export default class MyComponent extends Component {
 *   &#64;task *myTask() {
 *     let lastNow = performance.now();
 *     while (true) {
 *       yield animationFrame();
 *
 *       let now = performance.now();
 *       let dt = now - lastNow;
 *       lastNow = now;
 *
 *       console.log(dt);
 *     }
 *   }
 * }
 * ```
 */
export function animationFrame() {
  return new AnimationFrameYieldable();
}

/**
 *
 * Yielding `forever` will pause a task indefinitely until
 * it is cancelled (i.e. via host object destruction, the restartable modifier,
 * or manual cancellation).
 *
 * This is often useful in cases involving animation: if you're
 * using Liquid Fire, or some other animation scheme, sometimes you'll
 * notice buttons visibly reverting to their inactive states during
 * a route transition. By yielding `forever` in a Component task that drives a
 * button's active state, you can keep a task indefinitely running
 * until the animation runs to completion.
 *
 * NOTE: Liquid Fire also includes a useful `waitUntilIdle()` method
 * on the `liquid-fire-transitions` service that you can use in a lot
 * of these cases, but it won't cover cases of asynchrony that are
 * unrelated to animation, in which case `forever` might be better suited
 * to your needs.
 *
 * ```js
 * import { task, forever } from 'ember-concurrency';
 * export default class MyComponent extends Component {
 *   &#64;service myService;
 *   &#64;task *myTask() {
 *     yield this.myService.doSomethingThatCausesATransition();
 *     yield forever;
 *   }
 * }
 * ```
 */
export const forever = new ForeverYieldable();

/**
 *
 * Yielding `rawTimeout(ms)` will pause a task for the duration
 * of time passed in, in milliseconds.
 *
 * The timeout will use the native `setTimeout()` browser API,
 * instead of the Ember runloop, which means that test helpers
 * will *not* wait for it to complete.
 *
 * The task below, when performed, will print a message to the
 * console every second.
 *
 * ```js
 * export default class MyComponent extends Component {
 *   &#64;task *myTask() {
 *     while (true) {
 *       console.log("Hello!");
 *       yield rawTimeout(1000);
 *     }
 *   }
 * }
 * ```
 *
 * @param {number} ms - the amount of time to sleep before resuming
 *   the task, in milliseconds
 */
export function rawTimeout(ms) {
  return new RawTimeoutYieldable(ms);
}
