import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start, QUnitAdapter } from 'ember-qunit';

function noop() {}

QUnitAdapter.reopen({
  exception(e) {
    // our tests depend on Ember.run bubbling errors thrown within the run loop.
    throw e;
  },

  asyncStart: function asyncStart() {
    if (window.QUnit.config.current._isTaskTest) {
      this.doneCallbacks.push(noop);
    } else {
      this._super();
    }
  },
});

setApplication(Application.create(config.APP));

start();
