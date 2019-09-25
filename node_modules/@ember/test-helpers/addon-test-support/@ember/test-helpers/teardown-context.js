import { guidFor } from '@ember/object/internals';
import { run } from '@ember/runloop';
import { _teardownAJAXHooks } from './settled';
import { unsetContext, CLEANUP } from './setup-context';
import { nextTickPromise, runDestroyablesFor } from './-utils';
import settled from './settled';
import Ember from 'ember';
/**
  Used by test framework addons to tear down the provided context after testing is completed.

  Responsible for:

  - un-setting the "global testing context" (`unsetContext`)
  - destroy the contexts owner object
  - remove AJAX listeners

  @public
  @param {Object} context the context to setup
  @param {Object} [options] options used to override defaults
  @param {boolean} [options.waitForSettled=true] should the teardown wait for `settled()`ness
  @returns {Promise<void>} resolves when settled
*/
export default function teardownContext(context, options) {
    let waitForSettled = true;
    if (options !== undefined && 'waitForSettled' in options) {
        waitForSettled = options.waitForSettled;
    }
    return nextTickPromise()
        .then(() => {
        let { owner } = context;
        _teardownAJAXHooks();
        run(owner, 'destroy');
        Ember.testing = false;
        unsetContext();
        if (waitForSettled) {
            return settled();
        }
        return nextTickPromise();
    })
        .finally(() => {
        let contextGuid = guidFor(context);
        runDestroyablesFor(CLEANUP, contextGuid);
        if (waitForSettled) {
            return settled();
        }
        return nextTickPromise();
    });
}
