import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET error-vs-cancelation
export default Controller.extend({
  numCompletions: 0,
  numErrors: 0,
  numFinallys: 0,

  myTask: task(function * (doError) {
    try {
      yield timeout(1000);
      if (doError) {
        throw new Error("Boom");
      }
    } catch(e) {
      this.incrementProperty('numErrors');
    } finally {
      this.incrementProperty('numFinallys');
    }
    this.incrementProperty('numCompletions');
  }).restartable(),
});
// END-SNIPPET

