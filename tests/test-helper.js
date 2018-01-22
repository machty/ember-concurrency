import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { QUnitAdapter, start } from 'ember-qunit';
import QUnit from 'qunit';

QUnit.config.testTimeout = 5000;

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
