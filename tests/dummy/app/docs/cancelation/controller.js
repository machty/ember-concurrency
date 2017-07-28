import Controller from '@ember/controller';
import { defer } from 'rsvp';
import { task } from 'ember-concurrency';

// BEGIN-SNIPPET cancelation
const WAIT_HERE_FOREVER = defer().promise;
export default Controller.extend({
  count: 0,
  mostRecent: null,

  myTask: task(function * () {
    try {
      this.incrementProperty('count');
      yield WAIT_HERE_FOREVER;
    } finally {
      // finally blocks always get called,
      // even when the task is being canceled
      this.decrementProperty('count');
    }
  }),

  actions: {
    performTask() {
      let task = this.get('myTask');
      let taskInstance = task.perform();
      this.set('mostRecent', taskInstance);
    },

    cancelAll() {
      this.get('myTask').cancelAll();
    },

    cancelMostRecent() {
      this.get('mostRecent').cancel();
    },
  }
});
// END-SNIPPET

