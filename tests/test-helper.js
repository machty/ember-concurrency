import resolver from './helpers/resolver';
import {
  setResolver,
  QUnitAdapter
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

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

start();

setResolver(resolver);
