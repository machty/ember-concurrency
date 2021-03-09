export const cancelableSymbol = "__ec_cancel__";
export const instanceSymbol = "__ec_instance__";
export const yieldableSymbol = "__ec_yieldable__";
export const YIELDABLE_CONTINUE = "next";
export const YIELDABLE_THROW = "throw";
export const YIELDABLE_RETURN = "return";
export const YIELDABLE_CANCEL = "cancel";

export class Yieldable {
  constructor() {
    this[yieldableSymbol] = this[yieldableSymbol].bind(this);
    this[cancelableSymbol] = this[cancelableSymbol].bind(this);
    this._resumeIndex = null;
  }

  onYield() {}
  onDispose() {}

  cancel() {
    let taskInstance = this[instanceSymbol];
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_CANCEL
    );
  }

  next(value) {
    let taskInstance = this[instanceSymbol];
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_CONTINUE,
      value
    );
  }

  return(value) {
    let taskInstance = this[instanceSymbol];
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_RETURN,
      value
    );
  }

  throw(error) {
    let taskInstance = this[instanceSymbol];
    taskInstance.proceed.call(
      taskInstance,
      this._resumeIndex,
      YIELDABLE_THROW,
      error
    );
  }

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
        if (resumeType == YIELDABLE_CONTINUE || resumeType == YIELDABLE_RETURN) {
          def.resolve(value);
        } else {
          def.reject(value);
        }
      }
    };

    let maybeDisposer = this[yieldableSymbol](thinInstance, 0);
    def.promise[cancelableSymbol] = maybeDisposer || this[cancelableSymbol];

    return def.promise;
  }

  then(...args) {
    return this._toPromise().then(...args);
  }

  catch(...args) {
    return this._toPromise().catch(...args);
  }

  finally(...args) {
    return this._toPromise().finally(...args);
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    this[instanceSymbol] = taskInstance;
    this._resumeIndex = resumeIndex;
    this.onYield(taskInstance);
  }

  [cancelableSymbol]() {
    this.onDispose();
    this[instanceSymbol] = null;
  }
}

class AnimationFrameYieldable extends Yieldable {
  constructor() {
    super();
    this.timerId = null;
  }

  onYield() {
    this.timerId = requestAnimationFrame(() => this.next());
  }

  onDispose() {
    cancelAnimationFrame(this.timerId);
    this.timerId = null;
  }
}

class ForeverYieldable extends Yieldable {
  [yieldableSymbol]() {
    // Singleton. Don't want to keep a taskInstance reference.
  }
}

class RawTimeoutYieldable extends Yieldable {
  constructor(ms) {
    super();
    this.ms = ms;
    this.timerId = null;
  }

  onYield() {
    this.timerId = setTimeout(() => this.next(), this.ms);
  }

  onDispose() {
    clearTimeout(this.timerId);
    this.timerId = null;
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
