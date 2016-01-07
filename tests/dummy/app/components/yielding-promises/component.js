import Ember from 'ember';
import { process } from 'ember-processes';

let delay = (ms) => {
  return new Ember.RSVP.Promise(r => {
    Ember.run.later(r, ms);
  });
};

export default Ember.Component.extend({
  status: "Ready",

  numInvocations: 0,

  promiseHandler: process(function * (promise) {
    try {
      this.set('status', "Resolving a promise...");
      let value = yield promise;
      this.set('status', `OK, promise resolved with ${value}`);
    } catch(e) {
      this.set('status', `Oh no, it rejected with a value of ${e}`);
    } finally {
      this.incrementProperty('numInvocations');
    }
  }),

  actions: {
    doFulfillPromise() {
      let promise = delay(1000).then(() => "HOORAY");
      this.get('promiseHandler').start(promise);
    },
    doRejectPromise() {
      let promise = delay(1000).then(() => Ember.RSVP.Promise.reject("ERROR"));
      this.get('promiseHandler').start(promise);
    },
  },
});

