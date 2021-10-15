import Ember from 'ember';
import { defer } from 'rsvp';
import { Environment } from './external/environment';
import { assert } from '@ember/debug';
import { join, next, schedule } from '@ember/runloop';

export class EmberEnvironment extends Environment {
  assert(...args) {
    assert(...args);
  }

  async(callback) {
    join(() => schedule('actions', callback));
  }

  reportUncaughtRejection(error) {
    next(null, function () {
      if (Ember.onerror) {
        Ember.onerror(error);
      } else {
        throw error;
      }
    });
  }

  defer() {
    return defer();
  }

  globalDebuggingEnabled() {
    return Ember.ENV.DEBUG_TASKS;
  }
}

export const EMBER_ENVIRONMENT = new EmberEnvironment();
