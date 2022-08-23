import Controller from '@ember/controller';
import { restartableTask, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET error-vs-cancelation
export default class ErrorVsCancelationController extends Controller {
  numCompletions = 0;
  numErrors = 0;
  numFinallys = 0;

  myTask = restartableTask(this, async (doError) => {
    try {
      await timeout(1000);
      if (doError) {
        throw new Error('Boom');
      }
    } catch (e) {
      this.incrementProperty('numErrors');
    } finally {
      this.incrementProperty('numFinallys');
    }
    this.incrementProperty('numCompletions');
  });
}
// END-SNIPPET
