import RSVP, { Promise } from 'rsvp';
import TaskInstance from './-task-instance';
import { yieldableSymbol } from './utils';

const asyncAll = taskAwareVariantOf(Promise, 'all', identity);

function * resolver(value) {
  return value;
}

/**
 * A cancelation-aware variant of [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
 * The normal version of a `Promise.all` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `all()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `all()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `all` will be canceled
 * - if any of the {@linkcode TaskInstance}s (or regular promises) passed in reject (or
 *   are canceled), all of the other unfinished `TaskInstance`s will
 *   be automatically canceled.
 *
 * [Check out the "Awaiting Multiple Child Tasks example"](/#/docs/examples/joining-tasks)
 */
export const all = (things) => {
  if (things.length === 0) {
    return things;
  }

  for (let i = 0; i < things.length; ++i) {
    let t = things[i];
    if(!(t && t[yieldableSymbol])) {
      return asyncAll(things);
    }
  }

  let isAsync = false;
  let taskInstances = things.map(thing => {
    let ti = TaskInstance.create({
      // TODO: consider simpler iterator than full on generator fn?
      fn: resolver,
      args: [thing],
    })._start();

    if (ti._completionState !== 1) {
      isAsync = true;
    }
    return ti;
  });

  if (isAsync) {
    return asyncAll(taskInstances);
  } else {
    return taskInstances.map(ti => ti.value);
  }
};

/**
 * A cancelation-aware variant of [RSVP.allSettled](http://emberjs.com/api/classes/RSVP.html#method_allSettled).
 * The normal version of a `RSVP.allSettled` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `allSettled()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `allSettled()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `allSettled` will be canceled
 */
export const allSettled = taskAwareVariantOf(RSVP, 'allSettled', identity);

/**
 * A cancelation-aware variant of [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
 * The normal version of a `Promise.race` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `race()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `race()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `race` will be canceled
 * - once any of the tasks/promises passed in complete (either success, failure,
 *   or cancelation), any of the {@linkcode TaskInstance}s passed in will be canceled
 *
 * [Check out the "Awaiting Multiple Child Tasks example"](/#/docs/examples/joining-tasks)
 */
export const race = taskAwareVariantOf(Promise, 'race', identity);

/**
 * A cancelation-aware variant of [RSVP.hash](http://emberjs.com/api/classes/RSVP.html#hash).
 * The normal version of a `RSVP.hash` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `hash()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `hash()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `allSettled` will be canceled
 * - if any of the items rejects/cancels, all other cancelable items
 *   (e.g. {@linkcode TaskInstance}s) will be canceled
 */
export const hash = taskAwareVariantOf(RSVP, 'hash', getValues);

function identity(obj) {
  return obj;
}

function getValues(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

function taskAwareVariantOf(obj, method, getItems) {
  return function(thing) {
    let items = getItems(thing);
    let defer = RSVP.defer();

    obj[method](thing).then(defer.resolve, defer.reject);

    let hasCancelled = false;
    let cancelAll = () => {
      if (hasCancelled) { return; }
      hasCancelled = true;
      items.forEach(it => {
        if (it) {
          if (it instanceof TaskInstance) {
            it.cancel();
          } else if (typeof it.__ec_cancel__ === 'function') {
            it.__ec_cancel__();
          }
        }
      });
    };

    let promise = defer.promise.finally(cancelAll);
    promise.__ec_cancel__ = cancelAll;
    return promise;
  };
}
