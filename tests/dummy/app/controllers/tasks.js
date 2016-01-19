import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  taskGroup0: task(),
  taskGroup1: task(),
});

