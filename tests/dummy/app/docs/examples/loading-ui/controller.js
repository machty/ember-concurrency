import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET loading-ui-controller
export default Controller.extend({
  askQuestion: task(function * () {
    yield timeout(1000);
    this.set('result', Math.random());
  }).drop(),

  result: null,
});
// END-SNIPPET

