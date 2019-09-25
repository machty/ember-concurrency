/* globals Promise */
import RSVP from 'rsvp';
import hasEmberVersion from './has-ember-version';
export class _Promise extends RSVP.Promise {
}
const ORIGINAL_RSVP_ASYNC = RSVP.configure('async');
/*
  Long ago in a galaxy far far away, Ember forced RSVP.Promise to "resolve" on the Ember.run loop.
  At the time, this was meant to help ease pain with folks receiving the dreaded "auto-run" assertion
  during their tests, and to help ensure that promise resolution was coelesced to avoid "thrashing"
  of the DOM. Unfortunately, the result of this configuration is that code like the following behaves
  differently if using native `Promise` vs `RSVP.Promise`:

  ```js
  console.log('first');
  Ember.run(() => Promise.resolve().then(() => console.log('second')));
  console.log('third');
  ```

  When `Promise` is the native promise that will log `'first', 'third', 'second'`, but when `Promise`
  is an `RSVP.Promise` that will log `'first', 'second', 'third'`. The fact that `RSVP.Promise`s can
  be **forced** to flush synchronously is very scary!

  Now, lets talk about why we are configuring `RSVP`'s `async` below...

  ---

  The following _should_ always be guaranteed:

  ```js
  await settled();

  isSettled() === true
  ```

  Unfortunately, without the custom `RSVP` `async` configuration we cannot ensure that `isSettled()` will
  be truthy. This is due to the fact that Ember has configured `RSVP` to resolve all promises in the run
  loop. What that means practically is this:

  1. all checks within `waitUntil` (used by `settled()` internally) are completed and we are "settled"
  2. `waitUntil` resolves the promise that it returned (to signify that the world is "settled")
  3. resolving the promise (since it is an `RSVP.Promise` and Ember has configured RSVP.Promise) creates
    a new Ember.run loop in order to resolve
  4. the presence of that new run loop means that we are no longer "settled"
  5. `isSettled()` returns false 😭😭😭😭😭😭😭😭😭

  This custom `RSVP.configure('async`, ...)` below provides a way to prevent the promises that are returned
  from `settled` from causing this "loop" and instead "just use normal Promise semantics".

  😩😫🙀
*/
RSVP.configure('async', (callback, promise) => {
    if (promise instanceof _Promise) {
        // @ts-ignore - avoid erroring about useless `Promise !== RSVP.Promise` comparison
        // (this handles when folks have polyfilled via Promise = Ember.RSVP.Promise)
        if (typeof Promise !== 'undefined' && Promise !== RSVP.Promise) {
            // use real native promise semantics whenever possible
            Promise.resolve().then(() => callback(promise));
        }
        else {
            // fallback to using RSVP's natural `asap` (**not** the fake
            // one configured by Ember...)
            RSVP.asap(callback, promise);
        }
    }
    else {
        // fall back to the normal Ember behavior
        ORIGINAL_RSVP_ASYNC(callback, promise);
    }
});
export const nextTick = typeof Promise === 'undefined' ? setTimeout : (cb) => Promise.resolve().then(cb);
export const futureTick = setTimeout;
/**
 @private
 @returns {Promise<void>} Promise which can not be forced to be ran synchronously
*/
export function nextTickPromise() {
    // Ember 3.4 removed the auto-run assertion, in 3.4+ we can (and should) avoid the "psuedo promisey" run loop configuration
    // for our `nextTickPromise` implementation. This allows us to have real microtask based next tick timing...
    if (hasEmberVersion(3, 4)) {
        return _Promise.resolve();
    }
    else {
        // on older Ember's fallback to RSVP.Promise + a setTimeout
        return new RSVP.Promise(resolve => {
            nextTick(resolve);
        });
    }
}
/**
 Retrieves an array of destroyables from the specified property on the object
 provided, iterates that array invoking each function, then deleting the
 property (clearing the array).

 @private
 @param {Object} object an object to search for the destroyable array within
 @param {string} property the property on the object that contains the destroyable array
*/
export function runDestroyablesFor(object, property) {
    let destroyables = object[property];
    if (!destroyables) {
        return;
    }
    for (let i = 0; i < destroyables.length; i++) {
        destroyables[i]();
    }
    delete object[property];
}
/**
 Returns whether the passed in string consists only of numeric characters.

 @private
 @param {string} n input string
 @returns {boolean} whether the input string consists only of numeric characters
 */
export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
}
