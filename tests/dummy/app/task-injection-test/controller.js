import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  users: null,

  myTask: task({
    fun: service(),
    *perform() {
      let value = yield this.get('subtask').perform();
      return `${this.get('fun.foo')}-${value}`;
    },

    subtask: task({
      fun: service(),
      wat: 2,
      *perform() {
        return this.get('fun.foo') * this.wat;
      },
    }),
  }),
});
