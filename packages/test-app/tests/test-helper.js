import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { setApplication } from '@ember/test-helpers';
import { QUnitAdapter, start } from 'ember-qunit';
import QUnit from 'qunit';
import { setup as setupQUnitDom } from 'qunit-dom';

setupQUnitDom(QUnit.assert);

QUnit.config.testTimeout = 5000;

function noop() {}

QUnitAdapter.reopen({
  exception(e) {
    // our tests depend on Ember.run bubbling errors thrown within the run loop.
    throw e;
  },

  asyncStart: function asyncStart() {
    if (this.qunit.config.current._isTaskTest) {
      this.doneCallbacks.push({ test: this.qunit.config.current, done: noop });
    } else {
      this._super();
    }
  },
});

setApplication(Application.create(config.APP));

start();
