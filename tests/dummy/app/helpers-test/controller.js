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
    let expected = "Set value option";
    if (value !== expected) {
      throw new Error(`value !== ${expected}`);
    }
  }),

  returnValue: task(function * () {
    return 10;
  }),

  maybeNullTask: null,
  someTask: task(function * () {
    this.set('status', 'someTask');
  }),

  actions: {
    setupTask() {
      this.set('maybeNullTask', this.get('someTask'));
    }
  }
});

