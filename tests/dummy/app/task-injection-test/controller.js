import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  users: null,

  myTask: task({
    fun: Ember.inject.service(),
    perform: function * () {
      let value = yield this.get('subtask').perform();
      return `${this.get('fun.foo')}-${value}`;
    },

    subtask: task({
      fun: Ember.inject.service(),
      wat: 2,
      perform: function * () {
        return this.get('fun.foo') * this.wat;
      },
    }),
  }),
});

