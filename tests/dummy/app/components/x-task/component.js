import Ember from 'ember';
import { task, sleep } from 'ember-processes';

export default Ember.Component.extend({
  task: task(function * () {
    let i = 0;
    while(i++ < 6) {
      this.set('value', i);
      yield sleep(150);
    }
  }),

  group: null,

  concurrencyGroup: Ember.computed.oneWay('group'),

  value: 0,
});

