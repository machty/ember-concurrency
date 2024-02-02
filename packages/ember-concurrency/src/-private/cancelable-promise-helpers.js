import { assert } from '@ember/debug';
import RSVP, { Promise } from 'rsvp';
import { TaskInstance } from './task-instance';
import { cancelableSymbol, Yieldable } from './external/yieldables';

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
 * [Check out the "Awaiting Multiple Child Tasks example"](/docs/examples/joining-tasks)
 */
export const all = taskAwareVariantOf(RSVP.Promise, 'all', identity);

/**
 * A cancelation-aware variant of [RSVP.allSettled](https://api.emberjs.com/ember/release/functions/rsvp/allSettled).
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
 * [Check out the "Awaiting Multiple Child Tasks example"](/docs/examples/joining-tasks)
 */
export const race = taskAwareVariantOf(Promise, 'race', identity);

/**
 * A cancelation-aware variant of [RSVP.hash](https://api.emberjs.com/ember/release/functions/rsvp/hash).
 * The normal version of a `RSVP.hash` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `hash()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `hash()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `hash` will be canceled
 * - if any of the items rejects/cancels, all other cancelable items
 *   (e.g. {@linkcode TaskInstance}s) will be canceled
 */
export const hash = taskAwareVariantOf(RSVP, 'hash', getValues);

/**
 * A cancelation-aware variant of [RSVP.hashSettled](https://api.emberjs.com/ember/release/functions/rsvp/hashSettled).
 * The normal version of a `RSVP.hashSettled` just returns a regular, uncancelable
 * Promise. The `ember-concurrency` variant of `hashSettled()` has the following
 * additional behavior:
 *
 * - if the task that `yield`ed `hashSettled()` is canceled, any of the
 *   {@linkcode TaskInstance}s passed in to `hashSettled` will be canceled
 */
export const hashSettled = taskAwareVariantOf(RSVP, 'hashSettled', getValues);

function identity(obj) {
  return obj;
}

function getValues(obj) {
  return Object.keys(obj).map((k) => obj[k]);
}

function castForPromiseHelper(castable) {
  if (castable) {
    if (castable instanceof TaskInstance) {
      // Mark TaskInstances, including those that performed synchronously and
      // have finished already, as having their errors handled, as if they had
      // been then'd, which this is emulating.
      castable.executor.asyncErrorsHandled = true;
    } else if (castable instanceof Yieldable) {
      // Cast to promise
      return castable._toPromise();
    }
  }

  return castable;
}

function castAwaitables(arrOrHash, callback) {
  if (Array.isArray(arrOrHash)) {
    return arrOrHash.map(callback);
  } else if (typeof arrOrHash === 'object' && arrOrHash !== null) {
    let obj = {};
    Object.keys(arrOrHash).forEach((key) => {
      obj[key] = callback(arrOrHash[key]);
    });
    return obj;
  } else {
    // :shruggie:
    return arrOrHash;
  }
}

function taskAwareVariantOf(obj, method, getItems) {
  return function (awaitable) {
    let awaitables = castAwaitables(awaitable, castForPromiseHelper);

    let items = getItems(awaitables);
    assert(`'${method}' expects an array.`, Array.isArray(items));

    let defer = RSVP.defer();

    obj[method](awaitables).then(defer.resolve, defer.reject);

    let hasCancelled = false;
    let cancelAll = () => {
      if (hasCancelled) {
        return;
      }
      hasCancelled = true;
      items.forEach((it) => {
        if (it) {
          if (it instanceof TaskInstance) {
            it.cancel();
          } else if (typeof it[cancelableSymbol] === 'function') {
            it[cancelableSymbol]();
          }
        }
      });
    };

    let promise = defer.promise.finally(cancelAll);
    promise[cancelableSymbol] = cancelAll;
    return promise;
  };
}
