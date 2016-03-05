import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  users: null,
  myTask: task(function * () {
    this.set('users', null);
    let users = yield this.store.query('user', {});
    this.set('users', users);
  }),
});

