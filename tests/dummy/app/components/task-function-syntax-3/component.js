import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  status: null,

// BEGIN-SNIPPET task-function-syntax-3
  myTask: task(function * () {
    this.set('status', `Thinking...`);
    let promise = timeout(1000).then(() => 123);
    let resolvedValue = yield promise;
    this.set('status', `The value is ${resolvedValue}`);
  }),
// END-SNIPPET
});

