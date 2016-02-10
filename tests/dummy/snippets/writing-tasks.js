import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  myTask: task(function * () {
    alert("hello!");
  })
});

