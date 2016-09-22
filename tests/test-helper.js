import resolver from './helpers/resolver';
import {
  setResolver,
  QUnitAdapter
} from 'ember-qunit';

QUnitAdapter.reopen({
  exception(e) {
    // our tests depend on Ember.run bubbling errors thrown within the run loop.
    throw e;
  }
});

setResolver(resolver);
