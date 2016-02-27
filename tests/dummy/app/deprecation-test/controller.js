import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  myTask: task(function * () { }),
});

