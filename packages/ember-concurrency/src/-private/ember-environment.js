import { defer } from 'rsvp';
import { Environment } from './external/environment';
import { assert } from '@ember/debug';
import { join, next, schedule } from '@ember/runloop';
import { getOnerror } from '@ember/-internals/error-handling';

export class EmberEnvironment extends Environment {
  assert(...args) {
    assert(...args);
  }

  async(callback) {
    join(() => schedule('actions', callback));
  }

  reportUncaughtRejection(error) {
    next(null, function () {
      const onError = getOnerror();
      if (onError) {
        onError(error);
      } else {
        throw error;
      }
    });
  }

  defer() {
    return defer();
  }

  globalDebuggingEnabled() {
    // TODO figure out how to reinstate. In the meantime people can use `{ debug: true }` on tasks of interest.
    // return Ember.ENV.DEBUG_TASKS;
    return false;
  }
}

export const EMBER_ENVIRONMENT = new EmberEnvironment();
