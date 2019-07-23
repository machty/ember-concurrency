import { later, cancel } from '@ember/runloop';
import { Promise, defer } from 'rsvp';
import ComputedProperty from '@ember/object/computed';
import Ember from 'ember';

export function isEventedObject(c) {
  return (c && (
    (typeof c.one === 'function' && typeof c.off === 'function') ||
    (typeof c.addEventListener === 'function' && typeof c.removeEventListener === 'function')
  ));
}

export function Arguments(args, defer) {
  this.args = args;
  this.defer = defer;
}

Arguments.prototype.resolve = function(value) {
  if (this.defer) {
    this.defer.resolve(value);
  }
};


export let objectAssign = Object.assign || function objectAssign(target) {
  'use strict';
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  target = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];
    if (source != null) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }
  return target;
};

export function _cleanupOnDestroy(owner, object, cleanupMethodName, ...args) {
  // TODO: find a non-mutate-y, non-hacky way of doing this.

  if (!owner.willDestroy)
  {
    // we're running in non Ember object (possibly in a test mock)
    return;
  }

  if (!owner.willDestroy.__ember_processes_destroyers__) {
    let oldWillDestroy = owner.willDestroy;
    let disposers = [];

    owner.willDestroy = function() {
      for (let i = 0, l = disposers.length; i < l; i ++) {
        disposers[i]();
      }
      oldWillDestroy.apply(owner, arguments);
    };
    owner.willDestroy.__ember_processes_destroyers__ = disposers;
  }

  owner.willDestroy.__ember_processes_destroyers__.push(() => {
    object[cleanupMethodName](...args);
  });
}

export let INVOKE = "__invoke_symbol__";

let locations = [
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

// TODO: Symbol polyfill?
export const yieldableSymbol = "__ec_yieldable__";
export const YIELDABLE_CONTINUE = "next";
export const YIELDABLE_THROW = "throw";
export const YIELDABLE_RETURN = "return";
export const YIELDABLE_CANCEL = "cancel";

export const _ComputedProperty = ComputedProperty;

/**
 *
 * Yielding `timeout(ms)` will pause a task for the duration
 * of time passed in, in milliseconds.
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
  let timerId;
  let promise = new Promise(r => {
    timerId = later(r, ms);
  });
  promise.__ec_cancel__ = () => {
    cancel(timerId);
  };
  return promise;
}

/**
 *
 * Yielding `forever` will pause a task indefinitely until
 * it is cancelled (i.e. via host object destruction, .restartable(),
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
 *
 * export default Component.extend({
 *   myService: service(),
 *   myTask: task(function * () {
 *     yield this.myService.doSomethingThatCausesATransition();
 *     yield forever;
 *   })
 * });
 * ```
 */
export const forever = {
  [yieldableSymbol]() {}
};

export function RawValue(value) {
  this.value = value;
}

export function raw(value) {
  return new RawValue(value);
}

export function rawTimeout(ms) {
  return {
    [yieldableSymbol](taskInstance, resumeIndex) {
      let timerId = setTimeout(() => {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, this._result);
      }, ms);
      return () => {
        clearTimeout(timerId);
      };
    }
  };
}

export function yieldableToPromise(yieldable) {
  let def = defer();

  def.promise.__ec_cancel__ = yieldable[yieldableSymbol]({
    proceed(_index, resumeType, value) {
      if (resumeType == YIELDABLE_CONTINUE || resumeType == YIELDABLE_RETURN) {
        def.resolve(value);
      } else {
        def.reject(value);
      }
    }
  }, 0);

  return def.promise;
}
