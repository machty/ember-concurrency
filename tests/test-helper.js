import QUnit from 'qunit';
import resolver from './helpers/resolver';
import {
  setResolver,
  QUnitAdapter
} from 'ember-qunit';

function noop() {}

QUnitAdapter.reopen({
  exception(e) {
    // our tests depend on Ember.run bubbling errors thrown within the run loop.
    throw e;
  },

  asyncStart: function asyncStart() {
    if (QUnit.config.current._isTaskTest) {
      this.doneCallbacks.push(noop);
    } else {
      this._super();
    }
  },
});

setResolver(resolver);
