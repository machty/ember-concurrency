import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  status: null,
  myTask: task(function * (...args) {
    try {
      this.set('status', args.join('-'));
      yield Ember.RSVP.defer().promise;
    } finally {
      this.set('status', 'canceled');
    }
  }),

  valueTask: task(function * (value) {
    QUnit.equal(value, "Set value option");
  }),

  returnValue: task(function * () {
    return 10;
  }),
});

