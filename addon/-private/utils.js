import { later, cancel } from '@ember/runloop';
import { Promise } from 'rsvp';
import ComputedProperty from '@ember/object/computed';
import Ember from 'ember';
import { set, setProperties } from '@ember/object';

export function isEventedObject(c) {
  return (c && (
    (typeof c.one === 'function' && typeof c.off === 'function') ||
    (typeof c.addEventListener === 'function' && typeof c.removeEventListener === 'function')
  ));
}

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

export function deprecatePrivateModule(moduleName) {
  // eslint-disable-next-line no-console
  console.warn(`an Ember addon is importing a private ember-concurrency module '${moduleName}' that has moved`);
}

export function setTaskableState(taskable, state) {
  setProperties(taskable, state);
  let isRunning = taskable.numRunning > 0;
  let derivedState = {
    performCount: taskable.performCount + (state.numPerformedInc || 0),
    isRunning,
    isQueued: taskable.numQueued > 0,
    isIdle: !isRunning,
    state: isRunning ? "running" : "idle",
  };
  setProperties(taskable, derivedState);
}
