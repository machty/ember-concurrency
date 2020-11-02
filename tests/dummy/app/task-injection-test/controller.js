import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  users: null,

  myTask: task({
    fun: service(),
    *perform(suffix) {
      let value = yield this.subtask.perform(suffix);
      return `${this.get('fun.foo')}-${value}`;
    },

    subtask: task({
      fun: service(),
      wat: 2,
      *perform(suffix) {
        if (suffix) {
          return suffix;
        } else {
          return this.get('fun.foo') * this.wat;
        }
      },
    }),
  }),
});
