import Ember from 'ember';
import { defer } from 'rsvp';
import { Environment } from "./external/environment";
import { assert } from '@ember/debug';
import { join, schedule } from '@ember/runloop';

export class EmberEnvironment extends Environment {
  assert(...args) {
    assert(...args);
  }

  async(callback) {
    join(() => schedule('actions', null, callback));
  }

  reportUncaughtRejection(error) {
    setTimeout(function() {
      if (Ember.onerror) {
        Ember.onerror(error);
      } else {
        throw error;
      }
    }, 1);
  }

  defer() {
    return defer();
  }

  globalDebuggingEnabled() {
    return Ember.ENV.DEBUG_TASKS;
  }
}
