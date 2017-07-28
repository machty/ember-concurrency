import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  status: null,

// BEGIN-SNIPPET task-function-syntax-4
  myTask: task(function * () {
    this.set('status', `Thinking...`);
    try {
      yield timeout(1000).then(() => {
        throw "Ahhhhh!!!!";
      });
      this.set('status', `This does not get used!`);
    } catch(e) {
      this.set('status', `Caught value: ${e}`);
    }
  }),
// END-SNIPPET
});

