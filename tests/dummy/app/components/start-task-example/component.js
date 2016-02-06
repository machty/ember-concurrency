import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  init() {
    this._super();
    this.set('messages', Ember.A());
  },

  messages: null,

// BEGIN-SNIPPET start-task-example
  myTask: task(function * (msg) {
    let m = {
      text: `myTask invoked with the following: ${msg || "init"}... `
    };
    this.messages.pushObject(m);
    yield timeout(500);
    Ember.set(m, 'text', m.text + "Done");
  }).on('init', 'foo'),

  actions: {
    performTask(msg) {
      // This demonstrates how you can .get() a reference
      // to a task and then run it with .perform(), but
      // ideally you should just invoke myTask.perform
      // directly from the template.
      this.get('myTask').perform(msg);
    },
    triggerFoo(msg) {
      this.trigger('foo', msg);
    }
  }
// END-SNIPPET
});

